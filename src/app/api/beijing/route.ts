import { NextResponse } from "next/server";

type CompanionIn = { name?: unknown; position?: unknown; room?: unknown; roommate?: unknown };

type Payload = {
  name?: string;
  organization?: string;
  position?: string;
  phone?: string;
  email?: string;
  arrival?: string;
  flightDetail?: string;
  room?: string;
  roommate?: string;
  message?: string;
  question?: string;
  topics?: string;
  interests?: string;
  consent?: string;
  session?: string;
  source?: string;
  companions?: unknown;
};

const REQUIRED: (keyof Payload)[] = ["name", "organization", "position", "phone"];
const MAX_COMPANIONS = 9;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/**
 * 베이징 탐방 참가 신청 — 초청 코드 없이 받는다(10/30). 여권 사본은 받지 않는다(11/2).
 * 11/5: 대표 신청자가 동행 참가자(이름·직책·객실)를 같은 신청서에 적는다. 시트에는 사람마다 한 행,
 * Party 열에 「대표 · N명」/「동행 · 대표 ○○○ (N명)」 표식. Apps Script는 그대로.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  for (const key of REQUIRED) {
    if (!body[key] || typeof body[key] !== "string" || !(body[key] as string).trim()) {
      return NextResponse.json(
        { error: `필수 항목이 비어 있습니다: ${key}` },
        { status: 400 }
      );
    }
  }

  // 이메일은 받지 않는다(10/30). 옛 폼이 보내면 형식만 확인해 그대로 시트 열에 둔다
  const email = clean(body.email, 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
  }
  if (body.consent !== "Y") {
    return NextResponse.json({ error: "개인정보 수집·이용에 동의해 주셔야 접수할 수 있습니다." }, { status: 400 });
  }
  const room = clean(body.room, 60);
  if (!room) {
    return NextResponse.json({ error: "숙소 객실 타입을 골라 주세요." }, { status: 400 });
  }

  // 동행 참가자(선택). 이름·직책·객실은 모두 있어야 한다
  const companionsRaw = Array.isArray(body.companions) ? body.companions : [];
  if (companionsRaw.length > MAX_COMPANIONS) {
    return NextResponse.json({ error: `동행은 한 신청서에 ${MAX_COMPANIONS}명까지 적을 수 있습니다.` }, { status: 400 });
  }
  const companions = companionsRaw.map((c) => {
    const o = (c && typeof c === "object" ? c : {}) as CompanionIn;
    return {
      name: clean(o.name, 100),
      position: clean(o.position, 100),
      room: clean(o.room, 60),
      roommate: clean(o.roommate, 200),
    };
  });
  for (const c of companions) {
    if (!c.name || !c.position || !c.room) {
      return NextResponse.json({ error: "동행 참가자의 이름·직책·객실을 모두 채워 주세요." }, { status: 400 });
    }
  }

  // 베이징 전용 시트 웹훅. 미설정 시 설명회(인천) 시트로 폴백 — 구 스크립트면 인천 탭 Session 컬럼에 요약이 남는다.
  const sheetsUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_BEIJING ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const name = clean(body.name, 100);
  const organization = clean(body.organization, 200);
  const phone = clean(body.phone, 30);
  const arrival = clean(body.arrival, 80);
  const flightDetail = clean(body.flightDetail, 200);
  const roommate = clean(body.roommate, 200);
  const message = clean(body.message, 1000);
  const question = clean(body.question, 1000);
  const topics = clean(body.topics, 500);
  const interests = clean(body.interests, 400);
  const source = clean(body.source, 200);
  const sessionLabel = clean(body.session, 100) || "베이징 탐방 11/24–27";
  const total = 1 + companions.length;

  if (!sheetsUrl) {
    console.warn("[beijing] No webhook URL configured. Received but not stored.", body);
    return NextResponse.json({ ok: true, stored: false, rows: total });
  }

  const timestamp = new Date().toISOString();
  const base = {
    type: "beijing",
    timestamp,
    organization,
    phone,
    email: "",
    arrival,
    flightDetail,
    consent: "Y",
    // 여권 사본은 받지 않음(11/2) — Apps Script v2.1은 비어 있으면 Passport 열을 빈 칸으로 둔다
    source,
  };
  // 호환용: 인천 시트(v3)로 폴백될 때 Session 컬럼에 요약이 남도록
  const summary = (parts: string[]) => [sessionLabel, ...parts].filter(Boolean).join(" | ");

  const rows: Record<string, string>[] = [
    {
      ...base,
      name,
      position: clean(body.position, 100),
      email,
      party: total > 1 ? `대표 · ${total}명` : "",
      room,
      roommate,
      message,
      question,
      topics,
      interests,
      session: summary([
        total > 1 ? `인원=${total}명` : "",
        arrival ? `항공=${arrival}` : "",
        `숙소=${room}`,
        interests ? `관심=${interests}` : "",
        message ? `요청=${message.slice(0, 300)}` : "",
      ]),
    },
    ...companions.map((c) => ({
      ...base,
      name: c.name,
      position: c.position,
      party: `동행 · 대표 ${name} (${total}명)`,
      room: c.room,
      roommate: c.roommate,
      message: "",
      question: "",
      topics: "",
      interests: "",
      session: summary([`동행(대표 ${name})`, arrival ? `항공=${arrival}` : "", `숙소=${c.room}`]),
    })),
  ];

  // 사람마다 한 행. 순서대로 보내 행 순서를 지킨다
  for (let i = 0; i < rows.length; i++) {
    try {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows[i]),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("[beijing] Google Sheets webhook failed", res.status, text, `row ${i + 1}/${rows.length}`);
        return NextResponse.json(
          {
            error:
              i === 0
                ? "신청 데이터 저장에 실패했습니다. 잠시 후 다시 시도해주세요."
                : "대표 신청은 접수됐지만 동행 정보 저장에 실패했습니다. 다시 제출하지 말고, 담당자가 연락드릴 때 동행 정보를 알려 주세요.",
          },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("[beijing] Webhook fetch error", err, `row ${i + 1}/${rows.length}`);
      return NextResponse.json(
        {
          error:
            i === 0
              ? "신청 데이터 저장 중 네트워크 오류가 발생했습니다."
              : "대표 신청은 접수됐지만 동행 정보 저장 중 오류가 났습니다. 다시 제출하지 말고, 담당자가 연락드릴 때 동행 정보를 알려 주세요.",
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true, stored: true, rows: rows.length });
}

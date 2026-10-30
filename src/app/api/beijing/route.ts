import { NextResponse } from "next/server";
import { matchCode } from "@/lib/beijingInvite";

type Payload = {
  code?: string;
  name?: string;
  organization?: string;
  position?: string;
  phone?: string;
  email?: string;
  passportMethod?: string;
  passportImage?: string;
  passportName?: string;
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
};

const REQUIRED: (keyof Payload)[] = ["name", "organization", "position", "phone"];
const PASSPORT_METHODS = ["지금 직접 제출", "담당 매니저에게 제출"] as const;
const DATA_URL = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** 베이징 탐방 참가 신청 — 신청서의 초청 코드가 맞아야만 받는다. 참가자 각자 신청(인원수 항목 없음) */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  if (!matchCode(clean(body.code, 64))) {
    return NextResponse.json(
      { error: "초청 코드가 올바르지 않습니다. 안내받으신 코드를 다시 확인해 주세요." },
      { status: 401 }
    );
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

  // 여권 사본: 제출 방식은 필수. 직접 제출이면 브라우저에서 줄인 JPEG data URL(최대 약 3MB)이 있어야 한다
  const passportMethod = clean(body.passportMethod, 30);
  if (!(PASSPORT_METHODS as readonly string[]).includes(passportMethod)) {
    return NextResponse.json({ error: "여권 사본 제출 방식을 골라 주세요." }, { status: 400 });
  }
  let passportImage = "";
  let passportMime = "";
  if (passportMethod === PASSPORT_METHODS[0]) {
    const m = typeof body.passportImage === "string" ? DATA_URL.exec(body.passportImage) : null;
    if (!m) {
      return NextResponse.json({ error: "여권 사본을 올려 주세요. 지금 어려우시면 담당 매니저에게 제출을 골라 주세요." }, { status: 400 });
    }
    if (m[2].length > 4_000_000) {
      return NextResponse.json({ error: "여권 이미지는 JPG·PNG 사진으로 3MB 이하만 올릴 수 있습니다." }, { status: 400 });
    }
    passportMime = m[1];
    passportImage = m[2];
  }

  // 베이징 전용 시트 웹훅. 미설정 시 설명회(인천) 시트로 폴백 — 구 스크립트면 인천 탭 Session 컬럼에 요약이 남는다.
  const sheetsUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_BEIJING ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const arrival = clean(body.arrival, 80);
  const flightDetail = clean(body.flightDetail, 200);
  const roommate = clean(body.roommate, 200);
  const message = clean(body.message, 1000);
  const question = clean(body.question, 1000);
  const topics = clean(body.topics, 500);
  const interests = clean(body.interests, 400);

  if (!sheetsUrl) {
    console.warn("[beijing] No webhook URL configured. Received but not stored.", { ...body, passportImage: passportImage ? `[${passportImage.length} chars]` : "" });
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "beijing",
        timestamp: new Date().toISOString(),
        name: clean(body.name, 100),
        organization: clean(body.organization, 200),
        position: clean(body.position, 100),
        phone: clean(body.phone, 30),
        email,
        party: "",
        arrival,
        flightDetail,
        room,
        roommate,
        message,
        question,
        topics,
        interests,
        consent: "Y",
        passportMethod,
        passportImage,
        passportMime,
        passportName: clean(body.passportName, 200),
        source: clean(body.source, 200),
        // 호환용: 인천 시트(v3)로 폴백될 때 Session 컬럼에 요약이 남도록
        session: [
          clean(body.session, 100) || "베이징 탐방 11/24–27",
          arrival ? `항공=${arrival}` : "",
          room ? `숙소=${room}` : "",
          `여권=${passportMethod}`,
          interests ? `관심=${interests}` : "",
          message ? `요청=${message.slice(0, 300)}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[beijing] Google Sheets webhook failed", res.status, text);
      return NextResponse.json(
        { error: "신청 데이터 저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[beijing] Webhook fetch error", err);
    return NextResponse.json(
      { error: "신청 데이터 저장 중 네트워크 오류가 발생했습니다." },
      { status: 502 }
    );
  }
}

import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  organization?: string;
  position?: string;
  phone?: string;
  email?: string;
  interest?: string;
  rooms?: string;
  message?: string;
  source?: string;
};

const REQUIRED: (keyof Payload)[] = ["name", "organization", "position", "phone", "interest"];

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  for (const key of REQUIRED) {
    if (!body[key] || typeof body[key] !== "string" || !body[key]!.trim()) {
      return NextResponse.json(
        { error: `필수 항목이 비어 있습니다: ${key}` },
        { status: 400 }
      );
    }
  }

  const email = clean(body.email, 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
  }

  // 학원전자 상담 전용 시트 웹훅. 미설정 시 설명회(인천) 시트 웹훅으로 폴백(구 스크립트면 인천 탭 Session 컬럼에 요약이 남음)
  const sheetsUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_HAKWONJEONJA ??
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ??
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!sheetsUrl) {
    console.warn("[consult] No webhook URL configured. Received but not stored.", body);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "consult",
        timestamp: new Date().toISOString(),
        name: clean(body.name, 100),
        organization: clean(body.organization, 200),
        position: clean(body.position, 100),
        phone: clean(body.phone, 30),
        email,
        interest: clean(body.interest, 100),
        rooms: clean(body.rooms, 50),
        message: clean(body.message, 1000),
        source: clean(body.source, 200),
        // 호환용: 시트 스크립트가 아직 v3(상담 분기 없음)이면 인천 탭 Session 컬럼에 요약이 남도록
        session: [
          `관심=${clean(body.interest, 100)}`,
          body.rooms ? `강의실=${clean(body.rooms, 50)}` : "",
          body.message ? `문의=${clean(body.message, 300)}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[consult] Google Sheets webhook failed", res.status, text);
      return NextResponse.json(
        { error: "신청 데이터 저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[consult] Webhook fetch error", err);
    return NextResponse.json(
      { error: "신청 데이터 저장 중 네트워크 오류가 발생했습니다." },
      { status: 502 }
    );
  }
}

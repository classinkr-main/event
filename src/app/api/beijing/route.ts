import { NextResponse } from "next/server";
import { matchCode } from "@/lib/beijingInvite";

type Payload = {
  code?: string;
  name?: string;
  organization?: string;
  position?: string;
  phone?: string;
  email?: string;
  party?: string;
  arrival?: string;
  message?: string;
  interests?: string;
  session?: string;
  source?: string;
};

const REQUIRED: (keyof Payload)[] = ["name", "organization", "position", "phone", "email"];

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** 베이징 탐방 참가 신청 — 신청서의 초청 코드가 맞아야만 받는다 */
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
    if (!body[key] || typeof body[key] !== "string" || !body[key]!.trim()) {
      return NextResponse.json(
        { error: `필수 항목이 비어 있습니다: ${key}` },
        { status: 400 }
      );
    }
  }

  const email = clean(body.email, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
  }

  // 베이징 전용 시트 웹훅. 미설정 시 설명회(인천) 시트로 폴백 — 구 스크립트면 인천 탭 Session 컬럼에 요약이 남는다.
  const sheetsUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_BEIJING ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const party = clean(body.party, 30);
  const arrival = clean(body.arrival, 50);
  const message = clean(body.message, 1000);
  const interests = clean(body.interests, 400);

  if (!sheetsUrl) {
    console.warn("[beijing] No webhook URL configured. Received but not stored.", body);
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
        party,
        arrival,
        message,
        interests,
        source: clean(body.source, 200),
        // 호환용: 인천 시트(v3)로 폴백될 때 Session 컬럼에 요약이 남도록
        session: [
          clean(body.session, 100) || "베이징 탐방 11/24–27",
          party ? `인원=${party}` : "",
          arrival ? `도착=${arrival}` : "",
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

import { NextResponse, after } from "next/server";

type Payload = {
  name?: string;
  organization?: string;
  position?: string;
  phone?: string;
  email?: string;
  dinner?: string;
  session?: string;
  source?: string;
};

const REQUIRED: (keyof Payload)[] = [
  "name",
  "organization",
  "position",
  "phone",
  "email",
];

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청 형식입니다." },
      { status: 400 }
    );
  }

  // 송도(10/29) 신청 페이지는 QR·모바일 유입이라 이메일을 선택 항목으로 받는다
  const source = body.source ?? "";
  const isSongdo = source.startsWith("songdo");

  for (const key of REQUIRED) {
    if (key === "email" && isSongdo) continue;
    if (!body[key] || typeof body[key] !== "string" || !body[key]!.trim()) {
      return NextResponse.json(
        { error: `필수 항목이 비어 있습니다: ${key}` },
        { status: 400 }
      );
    }
  }

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: "이메일 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  // 설명회 신청(인천·서울·송도)은 같은 웹훅으로 — Apps Script가 source를 보고 탭을 분기
  const isMeets =
    source.startsWith("0709-10incheon") ||
    source.startsWith("seoul-mokdong") ||
    isSongdo;
  const sheetsUrl = isMeets
    ? process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ??
      process.env.GOOGLE_SHEETS_WEBHOOK_URL
    : process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!sheetsUrl) {
    console.warn(
      "[register] No webhook URL configured for this submission. Received but not stored.",
      body
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  const row = {
    timestamp: new Date().toISOString(),
    name: body.name,
    organization: body.organization,
    position: body.position,
    phone: body.phone,
    email: body.email,
    dinner: body.dinner ?? "",
    session: body.session ?? "",
    source: body.source ?? "",
  };

  // 시트 저장(Apps Script)은 2~4초 걸려 신청 완료 화면이 늦게 떴음 → 응답은 바로 보내고 저장은 응답 뒤에 마저 한다
  after(() => sendToSheets(sheetsUrl, row));

  return NextResponse.json({ ok: true });
}

// Apps Script 는 저장을 마친 뒤 302(결과 주소)로 답한다 → 따라가지 않고 그 응답으로 성공 판단.
// 실패하면 2번 더 시도하고, 끝내 실패하면 신청 내용을 오류 로그에 남겨 시트에 손으로 옮길 수 있게 한다.
async function sendToSheets(url: string, row: Record<string, string | undefined>) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
        redirect: "manual",
      });
      if (res.status < 400) return;
      console.error("[register] Google Sheets webhook failed", attempt, res.status, await res.text());
    } catch (err) {
      console.error("[register] Webhook fetch error", attempt, err);
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 1500));
  }
  console.error("[register] 시트 저장 최종 실패 — 이 신청을 시트에 직접 옮길 것", JSON.stringify(row));
}

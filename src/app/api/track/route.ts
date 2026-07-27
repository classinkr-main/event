import { NextResponse } from "next/server";

type Payload = {
  channel?: string;
  referrer?: string;
  device?: string;
  firstVisit?: boolean;
  path?: string;
  userAgent?: string;
};

const BOT_PATTERN =
  /bot|crawler|spider|crawling|facebookexternalhit|kakaotalk-scrap|slackbot|discordbot|telegrambot|whatsapp|preview|headless|lighthouse|pingdom|uptime/i;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ua = body.userAgent ?? request.headers.get("user-agent") ?? "";
  if (BOT_PATTERN.test(ua)) {
    return NextResponse.json({ ok: true, stored: false });
  }

  // 방문 로그는 설명회 시트(Visits 탭)로 — Path 컬럼으로 페이지 구분
  const sheetsUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ??
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!sheetsUrl) {
    console.warn("[track] No webhook URL configured. Visit not stored.", body);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "visit",
        timestamp: new Date().toISOString(),
        channel: (body.channel ?? "unknown").slice(0, 100),
        referrer: (body.referrer ?? "").slice(0, 300),
        device: body.device === "mobile" ? "mobile" : "desktop",
        firstVisit: body.firstVisit ? "Y" : "N",
        path: (body.path ?? "").slice(0, 300),
        userAgent: ua.slice(0, 300),
      }),
    });

    if (!res.ok) {
      console.error("[track] Sheets webhook failed", res.status);
    }
  } catch (err) {
    console.error("[track] Webhook fetch error", err);
  }

  // 트래킹은 실패해도 클라이언트에 에러를 돌려주지 않는다
  return NextResponse.json({ ok: true });
}

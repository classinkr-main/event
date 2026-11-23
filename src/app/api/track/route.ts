import { NextResponse } from "next/server";
import { channelLabel } from "@/lib/inflow";
import { pageLabelOf } from "@/lib/pages";

type Payload = {
  channel?: string;
  referrer?: string;
  device?: string;
  firstVisit?: boolean;
  path?: string;
  userAgent?: string;
};

const BOT_PATTERN =
  /bot|crawler|spider|crawling|facebookexternalhit|facebookcatalog|meta-externalagent|kakaotalk-scrap|slackbot|discordbot|telegrambot|whatsapp|preview|headless|lighthouse|pingdom|uptime/i;

/** 한국 시각 「2026-11-22 08:08」 */
const kst = (d: Date) => new Date(d.getTime() + 9 * 3600_000).toISOString().slice(0, 16).replace("T", " ");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // 봇 거르기 — 본문 UA 와 요청 헤더 UA 를 **둘 다** 본다. 예전엔 본문 UA 가 빈 글자면(`??`) 헤더를 안 봐서
  // 2026-11-13 광고 검수 시각에 UA 없는 페이스북 fbclid 방문 13건(3분)이 그대로 쌓였다. 본문 UA 가 비면 사람 브라우저가 아니다.
  const ua = (body.userAgent ?? "").trim();
  const headerUa = (request.headers.get("user-agent") ?? "").trim();
  if (!ua || BOT_PATTERN.test(ua) || BOT_PATTERN.test(headerUa)) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const now = new Date();
  const channel = (body.channel ?? "unknown").slice(0, 100);
  const path = (body.path ?? "").slice(0, 300);

  // 방문 로그는 설명회 시트로 — 새 판 Apps Script 는 「방문」 탭(왼쪽: 시각·페이지·유입·기기·첫 방문), 옛 판은 Visits 탭(옛 칸 이름)
  const sheetsUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ??
    process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const sheetsSend = sheetsUrl
    ? fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "visit",
          timestamp: now.toISOString(),
          channel,
          referrer: (body.referrer ?? "").slice(0, 300),
          device: body.device === "mobile" ? "mobile" : "desktop",
          firstVisit: body.firstVisit ? "Y" : "N",
          path,
          userAgent: ua.slice(0, 300),
          kst: kst(now),
          page_label: pageLabelOf(path),
          channel_label: channelLabel(channel),
        }),
      }).then((res) => {
        if (!res.ok) console.error("[track] Sheets webhook failed", res.status);
      })
    : Promise.resolve(
        console.warn("[track] No sheets webhook URL configured.", body),
      );

  // Compass CRM(page_visits)에도 병렬 적재 — 광고/QR 유입 구분은 CRM이 bucket으로 분류(채널 키: src/lib/inflow.ts)
  const compassUrl = process.env.COMPASS_VISIT_URL;
  const compassToken = process.env.COMPASS_VISIT_TOKEN;
  const page = path.split("?")[0].replace(/^\//, "") || "unknown";
  const compassSend =
    compassUrl && compassToken
      ? fetch(compassUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-visit-token": compassToken,
          },
          body: JSON.stringify({
            page,
            channel,
            referrer: body.referrer,
            device: body.device,
            firstVisit: body.firstVisit,
            userAgent: ua,
          }),
        }).then((res) => {
          if (!res.ok) console.error("[track] Compass webhook failed", res.status);
        })
      : Promise.resolve();

  try {
    await Promise.all([sheetsSend, compassSend]);
  } catch (err) {
    console.error("[track] Webhook fetch error", err);
  }

  // 트래킹은 실패해도 클라이언트에 에러를 돌려주지 않는다
  return NextResponse.json({ ok: true });
}

import { NextResponse, after } from "next/server";
import { channelLabel, type Inflow, type Utm } from "@/lib/inflow";
import { pageLabelOf } from "@/lib/pages";

type Payload = {
  name?: string;
  organization?: string;
  position?: string;
  phone?: string;
  email?: string;
  dinner?: string;
  session?: string;
  source?: string;
  inflow?: Partial<Inflow>;
};

// 이메일 선택 + 설명회 시트로 보내는 신청 페이지 source 접두어(src/components/songdo/seminars.ts 의 slug)
const SEMINAR_SOURCES = ["songdo", "dongtan"];

const REQUIRED: (keyof Payload)[] = [
  "name",
  "organization",
  "position",
  "phone",
  "email",
];

const s = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** 브라우저가 보낸 utm — 글자만 받는다 */
function cleanUtm(v: unknown): Utm | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const g = (k: string) => s(o[k], 200) || null;
  const utm = { source: g("source"), medium: g("medium"), campaign: g("campaign"), content: g("content"), term: g("term") };
  return Object.values(utm).some(Boolean) ? utm : null;
}

/** 한국 시각 「2026-11-22 08:08」 — 시트 왼쪽 첫 칸(사람이 읽는 시각) */
const kst = (d: Date) => new Date(d.getTime() + 9 * 3600_000).toISOString().slice(0, 16).replace("T", " ");

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

  // 설명회 신청 페이지(송도 10/29·동탄 11/30 …)는 QR·모바일 유입이라 이메일을 선택 항목으로 받는다
  const source = body.source ?? "";
  const isSeminarQr = SEMINAR_SOURCES.some((p) => source.startsWith(p));

  for (const key of REQUIRED) {
    if (key === "email" && isSeminarQr) continue;
    const v = body[key];
    if (!v || typeof v !== "string" || !v.trim()) {
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

  // 설명회 신청(인천·서울·송도·동탄)은 같은 웹훅으로 — Apps Script 가 「신청」 탭에 쌓는다(docs/apps-script/seminar-sheet.gs)
  const isMeets =
    source.startsWith("0709-10incheon") ||
    source.startsWith("seoul-mokdong") ||
    isSeminarQr;
  const sheetsUrl = isMeets
    ? process.env.GOOGLE_SHEETS_WEBHOOK_URL_INCHEON ??
      process.env.GOOGLE_SHEETS_WEBHOOK_URL
    : process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const now = new Date();
  const page = source.split("/")[0];
  // source 꼬리(`dongtan-1130/ig-ad`)와 inflow.channel 은 같은 값 — inflow 가 없으면(옛 화면 캐시) 꼬리를 쓴다
  const channel = s(body.inflow?.channel, 60) || source.split("/")[1] || "";
  const utm = cleanUtm(body.inflow?.utm);
  const signupId = crypto.randomUUID();

  const signup = {
    signup_id: signupId,
    page,
    page_label: pageLabelOf(page),
    channel: channel || null,
    channel_label: channel ? channelLabel(channel) : null,
    session: s(body.session, 120),
    name: s(body.name, 120),
    org: s(body.organization, 200),
    position: s(body.position, 120),
    phone: s(body.phone, 40),
    email: s(body.email, 254),
    utm,
  };

  /*
   * 시트로 보내는 한 줄. 옛 칸 이름(timestamp·name·organization …·source)과 새 칸(type "signup" · kst · page_label …)을 같이 싣는다 —
   * Apps Script 새 판(docs/apps-script/seminar-sheet.gs)은 새 칸으로 「신청」 탭에, 아직 안 바꾼 옛 판은 옛 칸으로 첫 탭에 쓴다(배포 순서와 상관없이 안 빠진다).
   */
  const row: Record<string, string | undefined> = {
    type: "signup",
    timestamp: now.toISOString(),
    name: body.name,
    organization: body.organization,
    position: body.position,
    phone: body.phone,
    email: body.email,
    dinner: body.dinner ?? "",
    session: body.session ?? "",
    source,
    kst: kst(now),
    page_label: signup.page_label,
    channel_label: signup.channel_label ?? "",
    signup_id: signupId,
    utm_source: utm?.source ?? "",
    utm_medium: utm?.medium ?? "",
    utm_campaign: utm?.campaign ?? "",
    utm_content: utm?.content ?? "",
    utm_term: utm?.term ?? "",
    landing: s(body.inflow?.landing, 300),
    compass: "",
  };

  // 시트·Compass 저장은 2~4초 걸려 신청 완료 화면이 늦게 떴음 → 응답은 바로 보내고 저장은 응답 뒤에 마저 한다.
  // Compass 먼저 — 결과(들어감·실패)를 시트 「Compass」 칸에 같이 적는다
  after(async () => {
    row.compass = isMeets ? await sendToCompass(signup) : "대상 아님";
    if (sheetsUrl) await sendToSheets(sheetsUrl, row);
    else console.warn("[register] No sheet webhook URL configured. Compass:", row.compass);
  });

  return NextResponse.json({ ok: true });
}

/**
 * Compass(mkt.classin.co.kr) 신청 웹훅 — 신청이 콜 목록에 바로 리드로 들어간다(Compass ADR-0102).
 * 주소는 COMPASS_SIGNUP_URL, 없으면 방문 웹훅 주소(COMPASS_VISIT_URL)의 page-visit 을 event-signup 으로 바꾼 것.
 * 토큰은 COMPASS_SIGNUP_TOKEN(Compass EVENT_SIGNUP_TOKEN 과 같은 값) — 없으면 보내지 않고 시트에 「꺼짐」.
 * 같은 signup_id 로 다시 보내면 Compass 는 seen 으로 답한다 — 재시도해도 리드가 두 건 되지 않는다.
 * 돌려주는 글자가 시트 「Compass」 칸에 그대로 들어간다.
 */
async function sendToCompass(signup: Record<string, unknown>): Promise<string> {
  const token = process.env.COMPASS_SIGNUP_TOKEN;
  const url =
    process.env.COMPASS_SIGNUP_URL ||
    (process.env.COMPASS_VISIT_URL ? process.env.COMPASS_VISIT_URL.replace(/page-visit\/?$/, "event-signup") : "");
  if (!token || !url) return "꺼짐";
  let last = "실패";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(signup),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const j = (await res.json().catch(() => ({}))) as { outcome?: string; leadId?: number };
        if (j.outcome === "created") return `들어감 · 새 리드 #${j.leadId}`;
        if (j.outcome === "reinflow") return `들어감 · 재유입 #${j.leadId}`;
        if (j.outcome === "seen") return "들어감 · 이미 받음";
        return "들어감";
      }
      last = `실패 ${res.status}`;
      // 401·400 은 다시 보내도 같다
      if (res.status === 401 || res.status === 400) break;
    } catch (err) {
      last = err instanceof Error && err.name === "TimeoutError" ? "실패 시간 초과" : "실패 연결";
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 1500));
  }
  console.error("[register] Compass 전달 실패", last, signup.signup_id);
  return last;
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

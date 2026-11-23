/**
 * 유입 판별 — 방문 기록(/api/track)과 신청(/api/register)이 같이 쓴다.
 *
 * 처음 들어온 순간의 유입을 세션에 한 번 담아 두고(같은 탭에서 다른 화면으로 옮겨도 그대로), 신청할 때 그 값을 같이 보낸다.
 * 채널 키는 Compass(mkt.classin.co.kr)도 읽는다 — /api/webhook/page-visit 의 bucket(`qr`·`qr-direct` → QR, `-ad` 로 끝나면 광고)과
 * 신청 리드의 유입 경로. 키를 바꾸면 Compass ADR-0102 구현 메모도 같이 고친다.
 *
 * 판별 순서:
 *  1. utm_source — 링크에 직접 붙인 값(가장 정확). 메타 광고는 utm_medium=paid 로 광고/일반을 가른다.
 *     전단지·포스터 QR 은 `?utm_source=qr` 를 붙여 인쇄한다(docs/GOOGLE_SHEETS_SETUP.md 「QR 링크」).
 *  2. 인앱 브라우저(카카오톡·인스타·페이스북·네이버 앱)
 *  3. referrer 호스트
 *  4. referrer 없음 → `qr-direct`(태그 없는 옛 QR·주소 직접 입력·북마크가 섞인다 — 「QR·직접 접속」)
 */

export type Utm = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
};

export type Inflow = {
  /** 정리된 채널 키 — ig-ad · fb-ad · meta-ad · instagram · facebook · qr · qr-direct · kakao · naver · google · 그 밖 호스트·utm_source */
  channel: string;
  /** 링크의 utm_* 원문(없으면 null) — 광고 id(utm_content)·캠페인 id 가 여기 있다 */
  utm: Utm | null;
  /** 처음 들어온 주소(경로 + 쿼리, 300자) */
  landing: string;
};

/** 채널 키 → 사람이 읽는 말. 시트 왼쪽 「유입」 칸과 Compass 유입 경로에 그대로 나간다 */
const CHANNEL_LABELS: Record<string, string> = {
  "ig-ad": "인스타 광고",
  "fb-ad": "페이스북 광고",
  "meta-ad": "메타 광고",
  instagram: "인스타그램",
  facebook: "페이스북",
  threads: "스레드",
  qr: "전단지 QR",
  "qr-direct": "QR·직접 접속",
  kakao: "카카오톡",
  naver: "네이버",
  google: "구글",
  daum: "다음",
  youtube: "유튜브",
  email: "이메일",
  sms: "문자",
};

export function channelLabel(channel: string | null | undefined): string {
  if (!channel) return "알 수 없음";
  return CHANNEL_LABELS[channel] ?? channel;
}

const META_SOURCES: Record<string, string> = {
  ig: "ig",
  instagram: "ig",
  fb: "fb",
  facebook: "fb",
  meta: "meta",
  an: "meta", // Audience Network
  msg: "meta", // Messenger
  threads: "meta",
};
const PAID_MEDIUM = /paid|cpc|ppc|^ads?$|display/i;

/** utm_source(+ medium) → 채널 키 */
export function channelFromUtm(source: string, medium: string | null): string {
  const s = source.trim().toLowerCase();
  if (/^(qr|flyer|poster|leaflet|전단지?)$/.test(s)) return "qr";
  const meta = META_SOURCES[s];
  if (meta) {
    if (medium && PAID_MEDIUM.test(medium)) return `${meta}-ad`;
    if (meta === "ig") return "instagram";
    if (meta === "fb") return "facebook";
    return s === "threads" ? "threads" : "meta-ad";
  }
  if (/^kakao/.test(s)) return "kakao";
  if (/^naver/.test(s)) return "naver";
  if (/^google/.test(s)) return "google";
  if (/^(email|newsletter|mail)$/.test(s)) return "email";
  if (/^(sms|lms|mms|text)$/.test(s)) return "sms";
  return s.slice(0, 60);
}

/** 인앱 브라우저·referrer → 채널 키(utm 없을 때) */
export function channelFromContext(ua: string, referrer: string): string {
  if (/KAKAOTALK/i.test(ua)) return "kakao";
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return "facebook";
  if (/NAVER\(inapp/i.test(ua)) return "naver";
  if (!referrer) return "qr-direct";
  let host = "";
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "unknown";
  }
  if (/(^|\.)instagram\.com$/.test(host)) return "instagram";
  if (/(^|\.)facebook\.com$|(^|\.)fb\.com$/.test(host)) return "facebook";
  if (/(^|\.)threads\.(net|com)$/.test(host)) return "threads";
  if (/(^|\.)naver\.com$/.test(host)) return "naver";
  if (/(^|\.)daum\.net$/.test(host)) return "daum";
  if (/(^|\.)kakao\.com$/.test(host)) return "kakao";
  if (/(^|\.)google\./.test(host)) return "google";
  if (/(^|\.)youtube\.com$/.test(host)) return "youtube";
  return host.replace(/^www\./, "").slice(0, 60);
}

function readUtm(params: URLSearchParams): Utm | null {
  const g = (k: string) => (params.get(k) ?? "").trim().slice(0, 200) || null;
  const utm = { source: g("utm_source"), medium: g("utm_medium"), campaign: g("utm_campaign"), content: g("utm_content"), term: g("utm_term") };
  return Object.values(utm).some(Boolean) ? utm : null;
}

export function detectInflow(): Inflow {
  const params = new URLSearchParams(window.location.search);
  const utm = readUtm(params);
  const channel = utm?.source ? channelFromUtm(utm.source, utm.medium) : channelFromContext(navigator.userAgent, document.referrer);
  return { channel, utm, landing: (window.location.pathname + window.location.search).slice(0, 300) };
}

const INFLOW_KEY = "seminar-inflow-v2";

/** 이 탭에서 처음 들어온 유입 — 세션 저장소에 한 번 담는다(막힌 브라우저면 지금 값) */
export function getStoredInflow(): Inflow {
  try {
    const stored = sessionStorage.getItem(INFLOW_KEY);
    if (stored) {
      const v = JSON.parse(stored) as Inflow;
      if (v && typeof v.channel === "string") return v;
    }
    const inflow = detectInflow();
    sessionStorage.setItem(INFLOW_KEY, JSON.stringify(inflow));
    return inflow;
  } catch {
    return detectInflow();
  }
}

/** 채널 키만 — 베이징 신청서처럼 source 꼬리에 붙이는 곳 */
export function getStoredChannel(): string {
  return getStoredInflow().channel;
}

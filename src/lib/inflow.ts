const CHANNEL_KEY = "incheon-inflow-channel";

/**
 * 유입 채널 판별 우선순위:
 * 1. utm_source 쿼리 파라미터 (링크에 직접 태깅한 경우 — 가장 정확)
 * 2. 인스타그램 인앱 브라우저 UA
 * 3. 인스타그램 referrer (외부 브라우저로 열린 경우)
 * 4. referrer 없음 → 인쇄된 QR은 UTM 없이 배포되어 direct로 들어오므로 QR 추정
 * 5. 그 외 referrer 호스트명
 */
export function detectChannel(): string {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source");
  if (utm) return utm;

  if (/instagram/i.test(navigator.userAgent)) return "instagram";

  const ref = document.referrer;
  if (/instagram\.com/i.test(ref)) return "instagram";
  if (!ref) return "qr-direct";

  try {
    return new URL(ref).hostname;
  } catch {
    return "unknown";
  }
}

export function getStoredChannel(): string {
  try {
    const stored = sessionStorage.getItem(CHANNEL_KEY);
    if (stored) return stored;
    const channel = detectChannel();
    sessionStorage.setItem(CHANNEL_KEY, channel);
    return channel;
  } catch {
    return detectChannel();
  }
}

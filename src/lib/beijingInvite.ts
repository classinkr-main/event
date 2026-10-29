/**
 * 베이징 초청 페이지(/beijing) 초청 코드 — 서버 전용.
 * - 페이지는 누구나 열리고, 참가 신청(POST /api/beijing)에서만 코드를 확인한다.
 * - 코드는 env BEIJING_INVITE_CODES(쉼표 구분)로 바꿀 수 있고, 없으면 DEFAULT_CODES.
 * - 입력은 대소문자·공백·하이픈 등 기호를 무시한다 ("베이징 1124" → "베이징1124").
 */
const DEFAULT_CODES = ["베이징1124"];

export function normalizeCode(input: string): string {
  return input
    .normalize("NFC")
    .toUpperCase()
    .replace(/[^\p{L}\p{N}]/gu, "");
}

export function inviteCodes(): string[] {
  const raw = process.env.BEIJING_INVITE_CODES;
  const list = raw && raw.trim() ? raw.split(",") : DEFAULT_CODES;
  return list.map(normalizeCode).filter(Boolean);
}

/** 입력 코드가 유효하면 정규화된 코드를, 아니면 null */
export function matchCode(input: string): string | null {
  const n = normalizeCode(input);
  if (!n) return null;
  return inviteCodes().find((c) => c === n) ?? null;
}

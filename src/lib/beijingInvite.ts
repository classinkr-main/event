import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 베이징 초청 페이지(/beijing) 초청 코드 — 서버 전용.
 * - 코드는 env BEIJING_INVITE_CODES(쉼표 구분)로 바꿀 수 있고, 없으면 DEFAULT_CODES.
 * - 입력은 대소문자·공백·하이픈을 무시한다 ("beijing-1124" → "BEIJING1124").
 * - 통과하면 코드별 HMAC 토큰을 쿠키에 심는다. 코드를 바꾸면 기존 쿠키는 자동 무효.
 */
export const INVITE_COOKIE = "bj_invite";
export const INVITE_COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60일

const DEFAULT_CODES = ["BEIJING1124"];

export function normalizeCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function inviteCodes(): string[] {
  const raw = process.env.BEIJING_INVITE_CODES;
  const list = raw && raw.trim() ? raw.split(",") : DEFAULT_CODES;
  return list.map(normalizeCode).filter(Boolean);
}

function secret(): string {
  return process.env.BEIJING_INVITE_SECRET || "classin-meets-beijing-2026";
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function tokenFor(code: string): string {
  return createHmac("sha256", secret()).update(normalizeCode(code)).digest("hex");
}

/** 입력 코드가 유효하면 정규화된 코드를, 아니면 null */
export function matchCode(input: string): string | null {
  const n = normalizeCode(input);
  if (!n) return null;
  return inviteCodes().find((c) => safeEqual(c, n)) ?? null;
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  return inviteCodes().some((c) => safeEqual(tokenFor(c), token));
}

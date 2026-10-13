import { NextResponse } from "next/server";
import {
  INVITE_COOKIE,
  INVITE_COOKIE_MAX_AGE,
  matchCode,
  tokenFor,
} from "@/lib/beijingInvite";

/** 초청 코드 확인 → 통과 시 HttpOnly 쿠키 발급 */
export async function POST(request: Request) {
  let body: { code?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code.slice(0, 64) : "";
  const matched = matchCode(code);
  if (!matched) {
    return NextResponse.json(
      { error: "초청 코드가 올바르지 않습니다. 안내받으신 코드를 다시 확인해 주세요." },
      { status: 401 }
    );
  }

  // https(운영)에서만 Secure — 로컬 LAN(http) 검증 때도 쿠키가 저장되도록
  const proto =
    request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "");
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: INVITE_COOKIE,
    value: tokenFor(matched),
    httpOnly: true,
    sameSite: "lax",
    secure: proto === "https",
    path: "/",
    maxAge: INVITE_COOKIE_MAX_AGE,
  });
  return res;
}

/** 초청장 닫기(쿠키 삭제) */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: INVITE_COOKIE, value: "", path: "/", maxAge: 0 });
  return res;
}

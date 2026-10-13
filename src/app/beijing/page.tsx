import type { Metadata } from "next";
import { cookies } from "next/headers";
import { INVITE_COOKIE, isValidToken } from "@/lib/beijingInvite";
import BjPage from "@/components/beijing/BjPage";
import BjGate from "@/components/beijing/BjGate";

export const metadata: Metadata = {
  title: "ClassIn Meets · 베이징 — 초청 안내",
  description:
    "AI 시대, 학원의 다음 모습을 직접 보는 3일. 2026년 11월 24일(화)–27일(금), 중국 베이징. 초청받으신 분께만 공개되는 안내 페이지입니다.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "ClassIn Meets · 베이징 초청",
    description:
      "AI 시대, 학원의 다음 모습을 직접 보는 3일. 11월 24일–27일, 베이징. 초청 코드를 입력하면 일정과 신청 안내를 볼 수 있습니다.",
    locale: "ko_KR",
    type: "website",
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const [sp, store] = await Promise.all([searchParams, cookies()]);
  const unlocked = isValidToken(store.get(INVITE_COOKIE)?.value);

  if (!unlocked) {
    // 초청 링크에 ?code=... 가 붙어 있으면 게이트가 자동으로 확인한다
    const prefill = typeof sp.code === "string" ? sp.code : undefined;
    return <BjGate prefill={prefill} />;
  }

  return <BjPage source="beijing" />;
}

import type { Metadata } from "next";
import BjPage from "@/components/beijing/BjPage";

export const metadata: Metadata = {
  title: "ClassIn Meets Beijing — 초청 안내",
  description:
    "AI 시대, 학원의 다음 모습을 직접 보는 3일. 2026년 11월 24일(화)–27일(금), 중국 베이징. 초청받으신 분은 초청 코드로 참가 신청하실 수 있습니다.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "ClassIn Meets Beijing",
    description:
      "AI 시대, 학원의 다음 모습을 직접 보는 3일. 11월 24일–27일, 베이징. 초청받으신 분은 초청 코드로 참가 신청하실 수 있습니다.",
    locale: "ko_KR",
    type: "website",
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  // 초청 링크에 ?code=... 가 붙어 있으면 신청서의 초청 코드 칸에 미리 채운다
  const prefillCode = typeof sp.code === "string" ? sp.code : undefined;
  return <BjPage source="beijing" prefillCode={prefillCode} />;
}

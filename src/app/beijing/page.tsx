import type { Metadata } from "next";
import BjPage from "@/components/beijing/BjPage";

export const metadata: Metadata = {
  title: "ClassIn Meets Beijing — 초청 안내",
  description:
    "AI 시대, 학원의 다음 모습을 직접 보는 3일. 2026년 11월 24일(화)–27일(금), 중국 베이징. 초청받으신 분은 이 페이지에서 참가 신청하실 수 있습니다.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "ClassIn Meets Beijing",
    description:
      "AI 시대, 학원의 다음 모습을 직접 보는 3일. 11월 24일–27일, 베이징. 초청받으신 분은 이 페이지에서 참가 신청하실 수 있습니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <BjPage source="beijing" />;
}

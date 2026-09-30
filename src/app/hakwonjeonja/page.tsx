import type { Metadata } from "next";
import HjPage from "@/components/hakwonjeonja/HjPage";

export const metadata: Metadata = {
  title: "학원전자 × ClassIn 공동구매 — 스마트교실 상담 신청",
  description:
    "전자칠판 다음은, 스마트교실입니다. 학원전자 회원사 공동구매 특별 혜택 — 첫 2주 무료 이용, 구독료·충전금 10% 혜택, 86″ 스마트교실 패키지. 우리 학원에 맞는 구성을 상담받으세요.",
  openGraph: {
    title: "학원전자 × ClassIn 공동구매 — 스마트교실 상담 신청",
    description:
      "일단 2주, 써보고 결정하세요. 학원전자 회원사 공동구매 특별 혜택과 스마트교실 도입 상담.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <HjPage source="hakwonjeonja" />;
}

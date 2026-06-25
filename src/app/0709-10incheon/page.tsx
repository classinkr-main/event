import type { Metadata } from "next";
import IncheonPage from "@/components/incheon/IncheonPage";

export const metadata: Metadata = {
  title: "Classin Meets · 송도 · 청라 — 학원장 설명회",
  description:
    "AI 시대, 학원의 새로운 성장 전략. 2026년 7월 9일 송도 · 7월 10일 청라에서 진행되는 인천 지역 학원장 대상 Classin 설명회.",
  openGraph: {
    title: "Classin Meets · 송도 · 청라",
    description:
      "AI 시대, 학원의 새로운 성장 전략. 인천 송도·청라 지역 학원장 설명회 — 7월 9일·10일.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <IncheonPage source="0709-10incheon" />;
}

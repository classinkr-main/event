import type { Metadata } from "next";
import SeoulPage from "@/components/seoul/SeoulPage";

export const metadata: Metadata = {
  title: "Classin Meets · 서울 목동 — 학원장 설명회",
  description:
    "AI 시대, 학원의 새로운 성장 전략. 2026년 8월 20일 (목) 클래스인코리아(목동)에서 진행되는 서울 지역 학원장 대상 Classin 설명회.",
  openGraph: {
    title: "Classin Meets · 서울 목동",
    description:
      "AI 시대, 학원의 새로운 성장 전략. 서울 목동 학원장 설명회 — 8월 20일 (목), 클래스인코리아.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <SeoulPage source="seoul-mokdong" />;
}

import type { Metadata } from "next";
import SeoulPage from "@/components/seoul/SeoulPage";

export const metadata: Metadata = {
  title: "Classin Meets · 서울 목동 — 학원장 세미나",
  description:
    "AI 시대, 학원의 새로운 성장 전략. 2026년 8월 19일 (수) 오전 11시, 거산학원(목동)에서 진행되는 학원 원장 대상 Classin Meets 서울 세미나.",
  openGraph: {
    title: "Classin Meets · 서울 목동",
    description:
      "AI 시대, 학원의 새로운 성장 전략. 서울 목동 학원장 세미나 — 8월 19일 (수) 오전 11시, 거산학원.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <SeoulPage source="seoul-mokdong" />;
}

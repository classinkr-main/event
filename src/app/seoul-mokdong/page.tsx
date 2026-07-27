import type { Metadata } from "next";
import SeoulPage from "@/components/seoul/SeoulPage";

export const metadata: Metadata = {
  title: "Classin Meets · 서울 목동 — 학원장 설명회",
  description:
    "AI 시대, 학원의 새로운 성장 전략. 서울 목동에서 진행되는 학원장 대상 Classin 설명회 — 사전 신청 접수 중.",
  openGraph: {
    title: "Classin Meets · 서울 목동",
    description:
      "AI 시대, 학원의 새로운 성장 전략. 서울 목동 학원장 설명회 — 사전 신청 접수 중.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <SeoulPage source="seoul-mokdong" />;
}

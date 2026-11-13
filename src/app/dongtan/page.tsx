import type { Metadata } from "next";
import SongdoPage from "@/components/songdo/SongdoPage";
import { DONGTAN } from "@/components/songdo/seminars";

export const metadata: Metadata = {
  title: "ClassIn Meets Dongtan — 11.30 동탄 오프라인 설명회 참가 신청",
  description:
    "원장님 없는 학원에서, 학원 평판이 정해집니다. 2026년 11월 30일 (월) 오전 11시, 더바른수학 고등관(경기 화성시 동탄구)에서 열리는 학원 원장님 대상 무료 오프라인 설명회 참가 신청.",
  openGraph: {
    title: "ClassIn Meets Dongtan — 11.30 동탄 오프라인 설명회",
    description:
      "원장님 없는 학원에서, 학원 평판이 정해집니다. 11월 30일 (월) 11시, 더바른수학 고등관 · 무료 참석.",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://meets.classin.co.kr/dongtan/og.jpg",
        width: 1200,
        height: 630,
        alt: "11.30 동탄 오프라인 설명회",
      },
    ],
  },
};

export default function Page() {
  return <SongdoPage source="dongtan-1130" ev={DONGTAN} />;
}

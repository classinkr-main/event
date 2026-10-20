import type { Metadata } from "next";
import SongdoPage from "@/components/songdo/SongdoPage";

export const metadata: Metadata = {
  title: "ClassIn Meets Songdo — 10.29 송도 오프라인 설명회 참가 신청",
  description:
    "원장님 없는 학원에서, 학원 평판이 정해집니다. 2026년 10월 29일 (목) 오전 11시, 엔에스 수능관학원(인천 연수구)에서 열리는 학원 원장님 대상 무료 오프라인 설명회 참가 신청.",
  openGraph: {
    title: "ClassIn Meets Songdo — 10.29 송도 오프라인 설명회",
    description:
      "원장님 없는 학원에서, 학원 평판이 정해집니다. 10월 29일 (목) 11시, 엔에스 수능관학원 · 무료 참석.",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://meets.classin.co.kr/songdo/og.jpg",
        width: 1200,
        height: 630,
        alt: "10.29 송도 오프라인 설명회",
      },
    ],
  },
};

export default function Page() {
  return <SongdoPage source="songdo-1029" />;
}

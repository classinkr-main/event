import { Noto_Serif_KR } from "next/font/google";

/** 초청장 세리프. main.theme-bj .serif 가 이 변수를 쓴다 */
export const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

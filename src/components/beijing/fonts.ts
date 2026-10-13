import { Hahmlet, IBM_Plex_Mono } from "next/font/google";

/** 디스플레이 세리프(함렛)와 티켓 데이터용 모노. main.theme-bj .serif / .mono 가 이 변수를 쓴다 */
export const display = Hahmlet({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVars = `${display.variable} ${mono.variable}`;

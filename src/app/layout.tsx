import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026 ASIA AI EDUCATION IN BUSAN",
  description:
    "VIP Invitation — 2026년 5월 29일, 부산 과사람 WP타워. 한·중·일·베 4개국 대표 기관이 함께하는 아시아 AI 교육 리더 컨퍼런스. Classin × WP과사람 교육기업 공동 주최.",
  openGraph: {
    title: "2026 ASIA AI EDUCATION IN BUSAN",
    description:
      "한·중·일·베 4개국 교육 리더가 한자리에. 2026년 5월 29일, 부산 과사람 WP타워.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      <body className="relative min-h-full flex flex-col antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

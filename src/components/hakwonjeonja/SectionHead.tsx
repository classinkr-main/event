import type { ReactNode } from "react";
import Reveal from "./fx/Reveal";

/** 설명회 랜딩과 같은 문법: 영문 소제목(흰 50%) + 큰 헤드라인 + 리드 */
export default function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Reveal className="text-center mb-10 sm:mb-16">
      <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-3 sm:mb-4">
        {eyebrow}
      </p>
      <h2 className="text-[2rem] sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

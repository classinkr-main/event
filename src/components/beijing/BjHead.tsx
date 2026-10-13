import type { ReactNode } from "react";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";

/** 섹션 머리 — 세리프 문장 하나와 리드. 라벨·번호 없음 */
export default function BjHead({ title, lead }: { title: ReactNode; lead?: ReactNode }) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <h2 className="serif text-[2rem] sm:text-5xl md:text-[3.2rem] font-bold leading-[1.15]">{title}</h2>
      {lead && <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-[var(--snow-2)] leading-relaxed max-w-2xl">{lead}</p>}
    </Reveal>
  );
}

import type { ReactNode } from "react";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";

/** 섹션 머리 — 번호·영문 라벨 · 세리프 헤드라인 · 리드 */
export default function BjHead({
  no,
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  no: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-10 sm:mb-14 ${align === "center" ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 mono text-[10px] sm:text-[11px] text-[var(--ink-2)] ${align === "center" ? "justify-center" : ""}`}>
        <span className="text-[var(--bj-red)]">{no}</span>
        <span className="w-6 h-px bg-[var(--bj-line-2)]" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="serif mt-4 sm:mt-5 text-[2rem] sm:text-5xl md:text-[3.4rem] font-semibold leading-[1.1] tracking-tight">
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 sm:mt-5 text-[15px] sm:text-lg text-[var(--ink-2)] leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

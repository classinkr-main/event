import type { ReactNode } from "react";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";

/** 2단 섹션 — 왼쪽 큰 제목(고정), 오른쪽 내용 */
export default function Split({
  id,
  title,
  lead,
  children,
  band = false,
  wide = false,
}: {
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  band?: boolean;
  wide?: boolean;
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-24 md:py-28 ${band ? "bg-[var(--band)]" : ""}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`grid gap-10 lg:gap-16 ${wide ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"}`}>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <h2 className="text-[2rem] sm:text-5xl md:text-[3.25rem] font-medium leading-[1.12] tracking-tight">{title}</h2>
              {lead && <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-[var(--ink-2)] leading-relaxed max-w-md">{lead}</p>}
            </Reveal>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

import CountUp from "@/components/hakwonjeonja/fx/CountUp";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import { STATS } from "./data";

/** 숫자 띠 — 만나는 기관들의 규모 */
export default function BjStats() {
  return (
    <section className="relative py-10 sm:py-14 border-y border-[var(--bj-line)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="flex items-baseline gap-1">
                  <CountUp value={s.value} className="serif text-4xl sm:text-5xl md:text-6xl font-semibold tabular-nums" />
                  <span className="text-base sm:text-lg text-[var(--ink-2)]">{s.suffix}</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

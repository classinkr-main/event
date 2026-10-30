import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import InterestMark from "./InterestMark";
import PassportStamp from "./gfx/PassportStamp";
import Split from "./Split";
import { DAYS, STAMPS } from "./data";

const WEEKDAY: Record<string, string> = { 화: "화요일", 수: "수요일", 목: "목요일", 금: "금요일" };
const HANZI = ["第一日", "第二日", "第三日", "第四日"];

/** 일정 한눈에 — 날짜별 표 */
export default function BjAgenda() {
  return (
    <Split
      id="journey"
      title="일정 한눈에"
      lead="본사 초안 기준입니다. 세부 일정은 확정되는 대로 개별 안내드립니다."
      wide
    >
      <div className="border-t border-[var(--line-2)]">
        {DAYS.map((d) => {
          const st = STAMPS[d.n - 1];
          return (
            <Reveal key={d.n}>
              <div className="py-7 sm:py-9 border-b border-[var(--line-2)] grid md:grid-cols-[12rem_1fr] gap-4 md:gap-8">
                <div className="relative">
                  <div className="text-sm text-[var(--ink-3)]"><span className="zh-serif text-[var(--accent)] font-bold mr-2">{HANZI[d.n - 1]}</span>{d.n}일차</div>
                  <div className="mt-1 text-2xl sm:text-3xl font-medium tracking-tight">
                    11월 {d.date.split(".")[1]}일 <span className="text-[var(--ink-2)] font-normal">{WEEKDAY[d.weekday]}</span>
                  </div>
                  <div className="mt-2 text-[15px] font-medium">{d.label}</div>
                  {d.theme && <div className="text-sm text-[var(--ink-2)]">{d.theme}</div>}
                  <PassportStamp {...st} delay={100} className="hidden md:block w-20 h-auto absolute -top-2 right-0" />
                </div>
                <ul>
                  {d.stops.map((s) => (
                    <li key={s.time + s.title} className="flex items-start gap-4 sm:gap-5 py-2.5 border-t border-[var(--line)] first:border-t-0 md:first:border-t">
                      <span className="shrink-0 w-12 sm:w-16 pt-0.5 text-sm text-[var(--ink-3)] tabular-nums">{s.time}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] sm:text-[17px] font-medium leading-snug">{s.title}</div>
                        {s.sub && <div className="text-sm text-[var(--ink-2)] mt-0.5 leading-relaxed">{s.sub}</div>}
                      </div>
                      {s.id && <InterestMark id={s.id} compact />}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Split>
  );
}

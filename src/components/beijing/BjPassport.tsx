import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import BjHead from "./BjHead";
import InterestMark from "./InterestMark";
import PassportStamp from "./gfx/PassportStamp";
import { DAYS, STAMPS } from "./data";

/** 일정 — 여권 펼침면. 날짜마다 입국 스탬프가 찍히고 아래에 세부 일정 */
export default function BjPassport() {
  const pages = [DAYS.slice(0, 2), DAYS.slice(2)];
  return (
    <section id="journey" className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <BjHead
          title="여권에 찍힐 나흘"
          lead="도착부터 귀국까지의 일정입니다. ClassIn 본사 초안 기준이라 세부 일정과 연사는 최종안에 따라 바뀔 수 있고, 확정되는 대로 신청하신 분께 개별 안내드립니다."
        />
        <div className="paper grid md:grid-cols-2">
          {pages.map((page, pi) => (
            <div
              key={pi}
              className={`relative p-6 sm:p-10 ${pi === 0 ? "border-b md:border-b-0 md:border-r border-[var(--paper-line-2)]" : ""}`}
            >
              {pi === 0 ? (
                <div className="hidden md:block absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-[rgba(18,20,26,0.14)] to-transparent pointer-events-none" aria-hidden />
              ) : (
                <div className="hidden md:block absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[rgba(18,20,26,0.14)] to-transparent pointer-events-none" aria-hidden />
              )}
              <div className="flex items-center justify-between mono text-[10px] text-[var(--ink-3)]">
                <span>{pi === 0 ? "ENTRIES / 입국" : "VISITS / 방문"}</span>
                <span>{pi === 0 ? "04" : "05"}</span>
              </div>

              <div className="mt-6 space-y-12 sm:space-y-14">
                {page.map((d) => {
                  const st = STAMPS[d.n - 1];
                  return (
                    <Reveal key={d.n}>
                      <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
                        <div>
                          <div className="mono text-[10px] text-[var(--ink-3)]">DAY {d.n}</div>
                          <div className="serif text-4xl sm:text-5xl font-bold leading-none mt-1 tabular-nums">
                            {d.date} <span className="text-xl font-semibold text-[var(--ink-2)]">{d.weekday}</span>
                          </div>
                          <div className="mt-2.5 font-semibold text-[15px]">{d.label}</div>
                          {d.theme && <div className="text-sm text-[var(--ink-2)]">{d.theme}</div>}
                        </div>
                        <PassportStamp {...st} delay={150} className="w-28 sm:w-40 h-auto -mt-3 -mr-2" />
                      </div>
                      <ul className="mt-5 border-t border-[var(--paper-line)]">
                        {d.stops.map((s) => (
                          <li key={s.time + s.title} className="py-3 border-b border-[var(--paper-line)] flex items-start gap-3 sm:gap-4">
                            <span className="mono shrink-0 w-12 sm:w-14 pt-1 text-[11px] text-[var(--ink-3)]">{s.time}</span>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-[15px] sm:text-base leading-snug">{s.title}</div>
                              {s.sub && <div className="text-xs sm:text-[13px] text-[var(--ink-2)] mt-0.5 leading-relaxed">{s.sub}</div>}
                            </div>
                            {s.id && <InterestMark id={s.id} compact />}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

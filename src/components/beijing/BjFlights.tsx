import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Barcode from "./gfx/Barcode";
import PlaneLine from "./gfx/PlaneLine";
import Split from "./Split";
import TicketField from "./TicketField";
import { FLIGHTS } from "./data";

/** 항공편 — 가는 편·돌아오는 편을 종이 탑승권(본권 + 절취 스텁)으로. 자기 부담 안내 */
export default function BjFlights() {
  return (
    <Split id="flights" title="항공편" lead={FLIGHTS.note} wide>
      <div className="on-page flex flex-col gap-6 sm:gap-8">
        {FLIGHTS.legs.map((f, i) => (
          <Reveal key={f.no} delay={i * 80}>
            <article className="paper grid grid-cols-1 md:grid-cols-[1.9fr_1fr]" aria-label={`${f.label} ${f.no} ${f.from.code}→${f.to.code}`}>
              {/* 본권 */}
              <div className="flex flex-col min-w-0">
                <div className="bj-meander-fill flex items-center justify-between gap-3 bg-[var(--ink)] text-[var(--paper)] px-5 sm:px-7 py-3">
                  <span className="font-bold tracking-tight text-sm sm:text-base">
                    {f.label} <span className="font-normal opacity-80">· {f.date}</span>
                  </span>
                  <span className="mono text-[10px] sm:text-[11px] opacity-85 shrink-0">BOARDING PASS</span>
                </div>
                <div className="p-5 sm:p-7 flex flex-col gap-5 flex-1">
                  <div className="grid grid-cols-[auto_1fr_auto] items-end gap-3 sm:gap-6">
                    <div>
                      <div className="mono text-[10px] text-[var(--ink-3)]">FROM</div>
                      <div className="serif mt-0.5 text-4xl sm:text-5xl font-bold leading-none">{f.from.code}</div>
                      <div className="mt-1.5 text-xs sm:text-sm text-[var(--ink-2)]">{f.from.name}</div>
                      <div className="mt-2.5 text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums leading-none">{f.dep}</div>
                    </div>
                    <div className="min-w-0 self-center pb-5 sm:pb-7">
                      <PlaneLine className="w-full h-auto text-[var(--ink)]" />
                      <div className="mono mt-1.5 text-center text-[10px] text-[var(--ink-3)] whitespace-nowrap">{f.dur}</div>
                    </div>
                    <div className="text-right">
                      <div className="mono text-[10px] text-[var(--ink-3)]">TO</div>
                      <div className="serif mt-0.5 text-4xl sm:text-5xl font-bold leading-none">{f.to.code}</div>
                      <div className="mt-1.5 text-xs sm:text-sm text-[var(--ink-2)] whitespace-nowrap">{f.to.name}</div>
                      <div className="mt-2.5 text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums leading-none">{f.arr}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-3 border-t border-[var(--paper-line)] pt-4">
                    <TicketField k="FLIGHT" v={f.no} />
                    <TicketField k="AIRLINE" v={f.airline} />
                    <TicketField k="DATE" v={f.dateEn} right />
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[12px] text-[var(--ink-3)]">출발·도착은 현지 시각</span>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bj-btn bj-btn-ink !px-4 !py-2 text-[13px]"
                    >
                      스카이스캐너에서 보기 ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* 스텁 — 절취선 */}
              <div className="relative flex flex-col border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[var(--paper-line-2)]">
                <span className="notch hidden md:block -top-[11px] left-0 -translate-x-1/2" aria-hidden />
                <span className="notch hidden md:block -bottom-[11px] left-0 -translate-x-1/2" aria-hidden />
                <span className="notch md:hidden top-0 -left-[11px] -translate-y-1/2" aria-hidden />
                <span className="notch md:hidden top-0 -right-[11px] -translate-y-1/2" aria-hidden />
                <div className="bj-meander-fill flex items-center justify-between bg-[var(--ink)] text-[var(--paper)] px-5 sm:px-7 py-3">
                  <span className="mono text-[10px]">STUB</span>
                  <span className="mono text-[10px]">{f.no}</span>
                </div>
                <div className="p-5 sm:p-7 flex flex-col gap-5 flex-1">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <TicketField k="FROM" v={f.from.code} big />
                    <TicketField k="TO" v={f.to.code} big right />
                    <TicketField k="DATE" v={f.dateEn} />
                    <TicketField k="DEP" v={f.dep} right />
                  </div>
                  <div className="mt-auto">
                    <Barcode seed={`flight-${f.no}-${f.dateCode}`} height={36} className="h-9 w-full text-[var(--ink)]" />
                    <div className="mono mt-1 text-[10px] text-[var(--ink-3)]">2026 {f.dateCode} {f.no}</div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-5 text-[13px] text-[var(--ink-3)] leading-relaxed">
          다른 항공편을 이용하셔도 됩니다. 신청서에 편명과 도착 시각을 적어 주시면 현지 이동을 맞춰 드립니다.
        </p>
      </Reveal>
    </Split>
  );
}

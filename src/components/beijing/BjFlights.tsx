import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import FlightArc from "./gfx/FlightArc";
import Split from "./Split";
import { FLIGHTS } from "./data";

/** 항공편 — 가는 편·돌아오는 편, 자기 부담 안내 */
export default function BjFlights() {
  return (
    <Split id="flights" title="항공편" lead={FLIGHTS.note}>
      <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
        {FLIGHTS.legs.map((f, i) => (
          <Reveal key={f.no} delay={i * 60} className="h-full">
            <div className="glass rounded-3xl p-5 sm:p-6 h-full flex flex-col">
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--ink-3)]">
                <span className="font-medium text-[var(--ink-2)]">{f.label}</span>
                <span>{f.date}</span>
              </div>
              <div className="mt-1 text-sm text-[var(--ink-2)]">
                {f.airline} <span className="mono text-[var(--ink-3)]">{f.no}</span>
              </div>
              <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
                <div>
                  <div className="text-3xl sm:text-[2.25rem] font-medium tracking-tight tabular-nums leading-none">{f.dep}</div>
                  <div className="mt-1.5 text-sm">
                    <span className="font-semibold">{f.from.code}</span> <span className="text-[var(--ink-2)]">{f.from.name}</span>
                  </div>
                </div>
                <FlightArc className="w-full h-auto text-[var(--ink-2)]" id={`arc-${f.no}`} />
                <div className="text-right">
                  <div className="text-3xl sm:text-[2.25rem] font-medium tracking-tight tabular-nums leading-none">{f.arr}</div>
                  <div className="mt-1.5 text-sm">
                    <span className="font-semibold">{f.to.code}</span> <span className="text-[var(--ink-2)]">{f.to.name}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-[var(--ink-3)]">{f.dur} · 현지 시각</div>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bj-btn bj-btn-line mt-auto self-start !px-4 !py-2 text-[13px] mt-5"
              >
                스카이스캐너에서 보기 ↗
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-4 text-[13px] text-[var(--ink-3)] leading-relaxed">
          다른 항공편을 이용하셔도 됩니다. 신청서에 편명과 도착 시각을 적어 주시면 현지 이동을 맞춰 드립니다.
        </p>
      </Reveal>
    </Split>
  );
}

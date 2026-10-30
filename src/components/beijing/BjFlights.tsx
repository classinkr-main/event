import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import FlapText from "./gfx/FlapText";
import Split from "./Split";
import { FLIGHTS } from "./data";

/** 항공편 — 공항 출발 안내판처럼 플랩 글자 줄로. 카드 상자 없이 줄과 글자만. 자기 부담 안내 */
export default function BjFlights() {
  return (
    <Split id="flights" title="항공편" lead={FLIGHTS.note} wide>
      <Reveal>
        <div className="flap-board">
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line-2)] pb-3">
            <span className="mono text-[11px] sm:text-xs tracking-[0.22em] text-[var(--ink)]">DEPARTURES</span>
            <span className="mono text-[11px] sm:text-xs text-[var(--ink-3)]">NOV 2026 · ICN / PEK</span>
          </div>

          {/* 열 머리 — 플랩 줄과 같은 열 폭 */}
          <div className="flap-cols mt-4 mono text-[10px] tracking-[0.14em] text-[var(--ink-3)]">
            <span>DEP</span>
            <span>FLIGHT</span>
            <span className="flap-sm">FROM</span>
            <span>TO</span>
          </div>

          {FLIGHTS.legs.map((f) => (
            <div key={f.no} className="mt-3 border-t border-[var(--line)] pt-4 pb-4">
              <div className="flap-cols">
                <FlapText text={f.dep} />
                <FlapText text={f.no} />
                <FlapText text={f.from.code} className="flap-sm" />
                <FlapText text={f.to.code} />
              </div>
              <p className="mt-3 text-[13px] sm:text-[15px] leading-relaxed text-[var(--ink-2)]">
                <span className="font-medium text-[var(--ink)]">{f.label}</span>
                <span className="mx-1.5 text-[var(--ink-3)]">·</span>
                {f.date}
                <span className="mx-1.5 text-[var(--ink-3)]">·</span>
                {f.airline}
                <span className="mx-1.5 text-[var(--ink-3)]">·</span>
                {f.from.name} {f.dep} → {f.to.name} {f.arr} 도착
                <span className="mx-1.5 text-[var(--ink-3)]">·</span>
                {f.dur}
                <span className="mx-1.5 text-[var(--ink-3)]">·</span>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-[var(--ink)] underline underline-offset-4 decoration-[var(--line-2)] hover:decoration-[var(--gold)] transition-colors"
                >
                  스카이스캐너에서 보기 ↗
                </a>
              </p>
            </div>
          ))}
          <div className="border-t border-[var(--line-2)]" aria-hidden />
        </div>

        <p className="mt-4 text-[13px] text-[var(--ink-3)] leading-relaxed">
          시각은 현지 기준입니다. 다른 항공편을 이용하셔도 되며, 신청서에 편명과 도착 시각을 적어 주시면 현지 이동을 맞춰 드립니다.
        </p>
      </Reveal>
    </Split>
  );
}

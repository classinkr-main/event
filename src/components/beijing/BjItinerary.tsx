"use client";

import { useEffect, useRef } from "react";
import BjHead from "./BjHead";
import InterestMark from "./InterestMark";
import { DAYS } from "./data";

/** 4일 일정 — 스크롤하면 경로선이 그려지고 지나간 지점이 켜진다. 항목에 관심 표시 가능 */
export default function BjItinerary() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;
    const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-node]"));
    let raf = 0;
    const update = () => {
      const r = wrap.getBoundingClientRect();
      const anchor = window.innerHeight * 0.62;
      const h = Math.max(0, Math.min(r.height, anchor - r.top));
      fill.style.height = `${h}px`;
      for (const n of nodes) {
        const nr = n.getBoundingClientRect();
        n.classList.toggle("on", nr.top + nr.height / 2 - r.top <= h);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="itinerary" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <BjHead
          no="02"
          eyebrow="ITINERARY · 4 DAYS"
          title="11월 24일부터 27일까지."
          lead="첫날 저녁 도착해 대회, 본사, 현장을 하루씩 보고 넷째 날 오후에 귀국합니다. 관심 가는 일정에 표시해 두면 참가 신청서에 함께 담깁니다."
        />

        <div ref={wrapRef} className="relative">
          {/* 경로선 */}
          <div className="absolute left-[11px] md:left-[calc(13rem+11px)] top-0 bottom-0 w-px bg-[var(--bj-line)]" aria-hidden>
            <div ref={fillRef} className="bj-route-fill w-px bg-[var(--bj-red)]" style={{ height: 0 }} />
          </div>

          <ol className="space-y-14 sm:space-y-20">
            {DAYS.map((d) => (
              <li key={d.n} className="relative md:grid md:grid-cols-[13rem_1fr] md:gap-0">
                {/* 날짜(데스크톱 왼쪽, 모바일 위) */}
                <div className="md:sticky md:top-24 md:self-start pl-9 md:pl-0 md:pr-10 mb-6 md:mb-0">
                  <div className="mono text-[10px] text-[var(--ink-3)]">DAY {d.n}</div>
                  <div className="serif mt-1 text-4xl sm:text-5xl md:text-[2.75rem] font-semibold leading-none tabular-nums whitespace-nowrap">
                    {d.date}
                    <span className="text-lg sm:text-xl md:text-lg text-[var(--ink-2)] font-normal ml-2">({d.weekday})</span>
                  </div>
                  <div className="mt-2 text-sm sm:text-base font-semibold text-[var(--ink)]">{d.label}</div>
                  {d.theme && <div className="mt-0.5 text-xs sm:text-sm text-[var(--ink-2)]">{d.theme}</div>}
                </div>

                {/* 노드 */}
                <span
                  data-node
                  className="bj-node absolute left-[6px] md:left-[calc(13rem+6px)] top-1 w-[11px] h-[11px] bg-[#07080b] border border-[var(--bj-line-2)]"
                  aria-hidden
                />

                <ul className="pl-9 md:pl-12 divide-y divide-[var(--bj-line)] border-t border-b border-[var(--bj-line)]">
                  {d.stops.map((s) => (
                    <li key={s.time + s.title} className="py-4 sm:py-5 flex items-start gap-4 sm:gap-6">
                      <span className="mono shrink-0 w-14 sm:w-16 pt-1 text-[11px] text-[var(--ink-3)] tabular-nums">{s.time}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-base sm:text-xl font-semibold leading-snug">{s.title}</div>
                        {s.sub && <div className="mt-1 text-sm sm:text-[15px] text-[var(--ink-2)] leading-relaxed">{s.sub}</div>}
                      </div>
                      {s.id && <InterestMark id={s.id} />}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 sm:mt-14 pl-9 md:pl-[calc(13rem+3rem)] text-xs sm:text-sm text-[var(--ink-3)] leading-relaxed max-w-2xl">
          ClassIn 본사 초안 기준입니다. 세부 일정과 연사는 최종안에 따라 바뀔 수 있으며, 확정되는 대로 신청하신 분께 개별 안내드립니다.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Corners from "./Corners";
import { EVENT } from "./data";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** 히어로 — 패럴랙스 스카이라인 + 실시간 D-day + 베이징 시각 */
export default function BjHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const t0 = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(t);
    };
  }, []);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        el.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const target = new Date(EVENT.start).getTime();
  let dd = "--", hh = "--", mm = "--", ss = "--", bj = "--:--:--";
  if (now) {
    const diff = Math.max(0, target - now.getTime());
    dd = String(Math.floor(diff / 86400000));
    hh = pad(Math.floor((diff % 86400000) / 3600000));
    mm = pad(Math.floor((diff % 3600000) / 60000));
    ss = pad(Math.floor((diff % 60000) / 1000));
    bj = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Shanghai",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  }

  return (
    <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('/beijing-skyline.jpg')", transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080b]/35 via-[#07080b]/55 to-[#07080b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080b]/80 via-[#07080b]/20 to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
          <div className="reveal">
            <div className="flex items-center gap-3 mono text-[10px] sm:text-[11px] text-[var(--ink-2)]">
              <span className="w-8 h-px bg-[var(--bj-red)]" />
              招待 · INVITATION · 학원 원장님 베이징 탐방
            </div>

            <h1 className="serif mt-6 sm:mt-8 text-[2.6rem] sm:text-6xl md:text-7xl xl:text-[5.4rem] leading-[1.04] font-semibold tracking-tight">
              AI 시대, 학원의
              <br />
              다음 모습을
              <br />
              직접 보는 <span className="text-[var(--bj-red)]">3일</span>
            </h1>

            <div className="mt-7 sm:mt-9 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-2xl sm:text-4xl font-bold tracking-tight">ClassIn Meets</span>
              <span className="serif text-2xl sm:text-4xl italic text-[var(--ink-2)]">Beijing</span>
            </div>

            <dl className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 border-t border-[var(--bj-line)] pt-5 max-w-3xl">
              <div>
                <dt className="mono text-[10px] text-[var(--ink-3)]">DATE</dt>
                <dd className="mt-1.5 text-sm sm:text-base font-semibold">
                  11월 24일 (화) 저녁 도착
                  <span className="block text-[var(--ink-2)] font-normal">27일 (금) 귀국 · 3박 4일</span>
                </dd>
              </div>
              <div>
                <dt className="mono text-[10px] text-[var(--ink-3)]">PLACE</dt>
                <dd className="mt-1.5 text-sm sm:text-base font-semibold">
                  중국 베이징
                  <span className="block text-[var(--ink-2)] font-normal">GET 대회장 · ClassIn 본사 · 현지 학원 · 대학</span>
                </dd>
              </div>
              <div>
                <dt className="mono text-[10px] text-[var(--ink-3)]">FOR</dt>
                <dd className="mt-1.5 text-sm sm:text-base font-semibold">
                  초청받으신 학원 원장님
                  <span className="block text-[var(--ink-2)] font-normal">항공·숙박 세부 안내는 개별 연락</span>
                </dd>
              </div>
            </dl>

            <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row gap-3">
              <a href="#register" className="bj-btn bj-btn-solid text-sm sm:text-base">
                참가 신청
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#itinerary" className="bj-btn bj-btn-ghost text-sm sm:text-base">
                3일 일정 보기
              </a>
            </div>
          </div>

          {/* 카운트다운 + 베이징 시각 */}
          <div className="relative w-full lg:w-[300px] p-6 sm:p-7 border border-[var(--bj-line)] bg-[#07080b]/55 backdrop-blur-sm reveal">
            <Corners />
            <div className="mono text-[10px] text-[var(--ink-3)]">DEPARTURE IN</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="serif text-6xl sm:text-7xl font-semibold leading-none tabular-nums" suppressHydrationWarning>
                {dd}
              </span>
              <span className="text-sm text-[var(--ink-2)]">일</span>
            </div>
            <div className="mono mt-3 text-lg sm:text-xl tabular-nums text-[var(--ink)]" suppressHydrationWarning>
              {hh}:{mm}:{ss}
            </div>
            <div className="mt-5 pt-4 border-t border-[var(--bj-line)] flex items-center justify-between">
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">BEIJING NOW</div>
                <div className="mono mt-1 text-sm tabular-nums" suppressHydrationWarning>
                  {bj}
                </div>
              </div>
              <div className="text-right">
                <div className="mono text-[10px] text-[var(--ink-3)]">TIME DIFF</div>
                <div className="mt-1 text-sm">서울 −1h</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 sm:right-8 mono text-[10px] text-[var(--ink-3)] rotate-90 origin-bottom-right hidden sm:block">
        SCROLL ↓
      </div>
    </section>
  );
}

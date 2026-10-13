"use client";

import { useEffect, useRef, useState } from "react";
import FlightArc from "./gfx/FlightArc";
import { EVENT } from "./data";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** 히어로 — 패럴랙스 스카이라인 + 수하물 태그(비행 경로·D-day·베이징 시각) */
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
  let dd = "--", hh = "--", mm = "--", ss = "--", bj = "--:--";
  if (now) {
    const diff = Math.max(0, target - now.getTime());
    dd = String(Math.floor(diff / 86400000));
    hh = pad(Math.floor((diff % 86400000) / 3600000));
    mm = pad(Math.floor((diff % 3600000) / 60000));
    ss = pad(Math.floor((diff % 60000) / 1000));
    bj = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
  }

  return (
    <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('/beijing-skyline.jpg')", transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d12]/30 via-[#0b0d12]/55 to-[#0b0d12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d12]/85 via-[#0b0d12]/25 to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-14 sm:pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-end">
        <div className="reveal">
          <h1 className="serif text-[2.9rem] sm:text-6xl md:text-7xl xl:text-[5.4rem] font-bold leading-[1.06]">
            원장님을
            <br />
            베이징으로
            <br />
            초대합니다.
          </h1>
          <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-[var(--snow-2)] leading-relaxed max-w-xl">
            AI 시대, 학원의 다음 모습을 직접 보는 3일.
            <br />
            2026년 11월 24일 화요일 저녁 도착, 27일 금요일 귀국.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#register" className="bj-btn bj-btn-snow text-sm sm:text-base">
              참가 신청하기
            </a>
            <a href="#letter" className="bj-btn bj-btn-line text-sm sm:text-base">
              초청의 글 읽기
            </a>
          </div>
        </div>

        {/* 수하물 태그 */}
        <div className="reveal lg:justify-self-end w-full max-w-sm">
          <div className="paper paper-2 rotate-[1.5deg] relative pl-12 pr-6 py-6 sm:py-7">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--night)] shadow-[0_0_0_5px_#d6cdbb,inset_0_2px_3px_rgba(0,0,0,0.6)]" aria-hidden />
            <div className="flex items-center justify-between mono text-[10px] text-[var(--ink-3)]">
              <span>BAGGAGE TAG</span>
              <span>CM 1124</span>
            </div>
            <FlightArc className="w-full h-auto text-[var(--ink)] mt-2" id="hero-arc" />
            <div className="mt-1 grid grid-cols-2 gap-4 border-t border-[var(--paper-line)] pt-4">
              <div>
                <div className="text-xs text-[var(--ink-2)]">출발까지</div>
                <div className="serif text-5xl font-bold leading-none mt-1 tabular-nums" suppressHydrationWarning>
                  {dd}
                  <span className="text-xl font-semibold ml-1">일</span>
                </div>
                <div className="mono text-sm mt-1.5 tabular-nums text-[var(--ink-2)]" suppressHydrationWarning>
                  {hh}:{mm}:{ss}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[var(--ink-2)]">베이징 현재 시각</div>
                <div className="mono text-3xl font-semibold mt-1 tabular-nums" suppressHydrationWarning>
                  {bj}
                </div>
                <div className="text-xs text-[var(--ink-2)] mt-1.5">서울보다 1시간 늦음</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

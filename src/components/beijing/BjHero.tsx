"use client";

import { useEffect, useState } from "react";
import { EVENT } from "./data";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** 히어로 — 사진 위에 제목·D-day·베이징 시각·일정 메타를 한 덩어리로 */
export default function BjHero() {
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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-[center_28%]" style={{ backgroundImage: "url('/beijing-day.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d12]/45 via-[#0b0d12]/55 to-[#0b0d12] sm:from-[#0b0d12]/40 sm:via-[#0b0d12]/30" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-[#0b0d12]/75 via-[#0b0d12]/20 to-transparent" />
        <span className="bj-wm zh-brush right-[2%] top-[6%] text-[38vw] lg:text-[20vw] !opacity-[0.14] !text-white" aria-hidden>北京</span>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-10 sm:pb-14">
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-8 lg:gap-14 items-end">
          <div className="reveal">
            <div className="flex items-center gap-3 text-[#ffb3a0]">
              <span className="zh-serif text-base sm:text-lg font-bold tracking-[0.3em]">邀请函</span>
              <span className="w-10 h-px bg-current" />
              <span className="text-sm sm:text-base">초청장</span>
            </div>
            <h1 className="serif mt-4 sm:mt-5 text-[3rem] sm:text-6xl md:text-7xl xl:text-[5.6rem] font-semibold leading-[1.02] tracking-tight">
              ClassIn Meets
              <br />
              <span className="text-gradient">Beijing</span>
            </h1>
            <p className="mt-4 sm:mt-5 text-xl sm:text-2xl font-light tracking-tight">원장님을 베이징으로 초대합니다</p>
            <p className="mt-1.5 text-sm sm:text-base text-white/65">AI 시대, 학원의 다음 모습을 직접 보는 3일</p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-end gap-x-10 gap-y-4">
              <div>
                <div className="text-xs text-white/60">출발까지</div>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="serif text-5xl sm:text-6xl font-semibold leading-none tabular-nums" suppressHydrationWarning>{dd}</span>
                  <span className="text-lg">일</span>
                  <span className="mono text-sm text-white/70 tabular-nums ml-1" suppressHydrationWarning>{hh}:{mm}:{ss}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/60">베이징 현재 <span className="zh-serif ml-1">北京</span></div>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="mono text-3xl sm:text-4xl font-medium tabular-nums leading-none" suppressHydrationWarning>{bj}</span>
                  <span className="text-xs text-white/60">서울보다 1시간 늦음</span>
                </div>
              </div>
            </div>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#register" className="bj-btn bj-btn-snow text-[15px]">
                참가 신청하기
              </a>
              <a href="#letter" className="bj-btn bj-btn-line text-[15px] !border-white/30">
                초청의 글
              </a>
            </div>
          </div>

          <dl className="reveal border-t border-white/25 text-sm sm:text-[15px]">
            <div className="flex gap-4 py-4 border-b border-white/15">
              <dt className="w-10 shrink-0 text-white/55">일정</dt>
              <dd className="font-medium">
                11월 24일 (화) 저녁 도착
                <span className="block text-white/70 font-normal">27일 (금) 귀국 · 3박 4일</span>
              </dd>
            </div>
            <div className="flex gap-4 py-4 border-b border-white/15">
              <dt className="w-10 shrink-0 text-white/55">장소</dt>
              <dd className="font-medium">
                베이징
                <span className="block text-white/70 font-normal">GET 대회장 · ClassIn 본사 · 현지 학원과 대학</span>
              </dd>
            </div>
            <div className="flex gap-4 py-4 border-b border-white/25">
              <dt className="w-10 shrink-0 text-white/55">대상</dt>
              <dd className="font-medium">초청받으신 학원 원장님</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bj-meander h-5 opacity-50" aria-hidden />
    </section>
  );
}

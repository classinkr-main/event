"use client";

import { useEffect, useState } from "react";
import { EVENT } from "./data";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** 히어로 — 큰 가는 제목 + 오른쪽 메타, 아래 큰 낮 사진(출발 D-day·베이징 시각 칩) */
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
    <section id="top" className="relative pt-28 sm:pt-36 pb-10 sm:pb-16 overflow-hidden">
      <span className="bj-wm zh-brush -right-[2%] -top-[2%] text-[46vw] lg:text-[28vw]" aria-hidden>北京</span>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-8 lg:gap-16 items-end">
          <div className="reveal">
            <div className="flex items-center gap-3 text-[var(--accent)]">
              <span className="zh-serif text-base sm:text-lg font-bold tracking-[0.3em]">邀请函</span>
              <span className="w-10 h-px bg-[var(--accent)]" />
              <span className="text-sm sm:text-base">초청장</span>
            </div>
            <h1 className="serif mt-5 sm:mt-6 text-[3rem] sm:text-6xl md:text-7xl xl:text-[6rem] font-semibold leading-[1.02] tracking-tight">
              ClassIn Meets
              <br />
              <span className="text-gradient">Beijing</span>
            </h1>
            <p className="mt-5 sm:mt-7 text-xl sm:text-3xl font-light tracking-tight">원장님을 베이징으로 초대합니다</p>
            <p className="mt-3 text-base sm:text-lg text-[var(--ink-2)]">AI 시대, 학원의 다음 모습을 직접 보는 3일</p>
          </div>
          <dl className="reveal glass rounded-3xl p-5 sm:p-6 grid grid-cols-1 gap-y-4 text-sm sm:text-[15px]">
            <div className="flex gap-4">
              <dt className="w-10 shrink-0 text-[var(--ink-3)]">일정</dt>
              <dd className="font-medium">11월 24일 (화) 저녁 도착 ~ 27일 (금) 귀국</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-10 shrink-0 text-[var(--ink-3)]">장소</dt>
              <dd className="font-medium">
                베이징 <span className="zh-serif text-[var(--ink-2)] font-normal">北京</span>
                <span className="block text-[var(--ink-2)] font-normal">GET 대회장 · ClassIn 본사 · 현지 학원과 대학</span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-10 shrink-0 text-[var(--ink-3)]">대상</dt>
              <dd className="font-medium">초청받으신 학원 원장님</dd>
            </div>
          </dl>
        </div>

        <div className="reveal mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#register" className="bj-btn bj-btn-snow text-[15px]">
            참가 신청하기
          </a>
          <a href="#letter" className="bj-btn bj-btn-line text-[15px]">
            초청의 글
          </a>
        </div>

        <div className="reveal mt-12 sm:mt-16 bj-meander h-6 opacity-70" aria-hidden />
        <div className="reveal bj-photo !rounded-3xl mt-3 aspect-[4/3] sm:aspect-[2.2/1]">
          <div className="bg bg-cover bg-center" style={{ backgroundImage: "url('/beijing-day.jpg')" }} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute left-4 right-4 sm:left-7 sm:right-7 bottom-4 sm:bottom-6 flex flex-wrap items-end justify-between gap-3 text-white">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-baseline gap-2 rounded-full bg-black/55 text-white px-4 py-2 text-sm backdrop-blur">
                출발까지 <span className="font-semibold tabular-nums" suppressHydrationWarning>{dd}일</span>
                <span className="mono text-xs text-white/70 tabular-nums" suppressHydrationWarning>{hh}:{mm}:{ss}</span>
              </span>
              <span className="inline-flex items-baseline gap-2 rounded-full bg-black/55 text-white px-4 py-2 text-sm backdrop-blur">
                베이징 현재 <span className="font-semibold tabular-nums" suppressHydrationWarning>{bj}</span>
                <span className="text-xs text-white/70">서울보다 1시간 늦음</span>
              </span>
            </div>
            <span className="text-xs text-white/80"><span className="zh-serif mr-1.5">北京</span>베이징 CBD, 서우두공항으로 접근하는 항공기</span>
          </div>
        </div>
      </div>
    </section>
  );
}

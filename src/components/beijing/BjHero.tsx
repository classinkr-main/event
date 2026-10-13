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
    <section id="top" className="relative pt-28 sm:pt-36 pb-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-8 lg:gap-16 items-end">
          <h1 className="reveal text-[2.75rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-light leading-[1.04] tracking-tight">
            원장님을
            <br />
            베이징으로 초대합니다
          </h1>
          <dl className="reveal grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-4 text-sm sm:text-[15px] lg:pb-3">
            <div>
              <dt className="text-[var(--ink-3)]">일정</dt>
              <dd className="mt-1 font-medium">
                2026년 11월 24일 화요일 저녁 도착
                <br />
                27일 금요일 귀국
              </dd>
            </div>
            <div>
              <dt className="text-[var(--ink-3)]">장소</dt>
              <dd className="mt-1 font-medium">
                중국 베이징
                <br />
                GET 대회장, ClassIn 본사, 현지 학원과 대학
              </dd>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <dt className="text-[var(--ink-3)]">대상</dt>
              <dd className="mt-1 font-medium">초청받으신 학원 원장님</dd>
            </div>
          </dl>
        </div>

        <p className="reveal mt-8 sm:mt-10 text-lg sm:text-2xl text-[var(--ink-2)] max-w-2xl leading-relaxed">
          AI 시대, 학원의 다음 모습을 직접 보는 3일. GET 대회와 ClassIn 본사, 베이징의 학원과 대학을 사흘 동안 둘러봅니다.
        </p>
        <div className="reveal mt-7 flex flex-col sm:flex-row gap-3">
          <a href="#register" className="bj-btn bj-btn-green text-[15px]">
            참가 신청하기
          </a>
          <a href="#letter" className="bj-btn bj-btn-line text-[15px]">
            초청의 글 읽기
          </a>
        </div>

        <div className="reveal bj-photo mt-12 sm:mt-16 aspect-[4/3] sm:aspect-[2.2/1]">
          <div className="bg bg-cover bg-center" style={{ backgroundImage: "url('/beijing-day.jpg')" }} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute left-4 right-4 sm:left-7 sm:right-7 bottom-4 sm:bottom-6 flex flex-wrap items-end justify-between gap-3 text-white">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-baseline gap-2 rounded-full bg-white/92 text-[var(--ink)] px-4 py-2 text-sm backdrop-blur">
                출발까지 <span className="font-semibold tabular-nums" suppressHydrationWarning>{dd}일</span>
                <span className="mono text-xs text-[var(--ink-2)] tabular-nums" suppressHydrationWarning>{hh}:{mm}:{ss}</span>
              </span>
              <span className="inline-flex items-baseline gap-2 rounded-full bg-white/92 text-[var(--ink)] px-4 py-2 text-sm backdrop-blur">
                베이징 현재 <span className="font-semibold tabular-nums" suppressHydrationWarning>{bj}</span>
                <span className="text-xs text-[var(--ink-2)]">서울보다 1시간 늦음</span>
              </span>
            </div>
            <span className="text-xs text-white/80">베이징 CBD, 서우두공항으로 접근하는 항공기</span>
          </div>
        </div>
      </div>
    </section>
  );
}

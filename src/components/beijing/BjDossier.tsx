"use client";

import { useEffect, useState } from "react";
import BjHead from "./BjHead";
import Corners from "./Corners";
import { ORGS } from "./data";

/** 기관·연사 도시에 — 왼쪽 목록을 고르면 오른쪽 패널이 바뀐다 (↑↓ 키 지원) */
export default function BjDossier() {
  const [i, setI] = useState(0);
  const org = ORGS[i];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const sec = document.getElementById("dossier");
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.4) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setI((v) => (v + 1) % ORGS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setI((v) => (v - 1 + ORGS.length) % ORGS.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="dossier" className="relative py-20 sm:py-28 md:py-36 border-t border-[var(--bj-line)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <BjHead
          no="04"
          eyebrow="DOSSIER · WHO YOU’LL MEET"
          title="만나는 기관 · 연사"
          lead="세션과 방문에서 만나는 여섯 곳. 이름을 고르면 상세 소개가 바뀝니다."
        />

        {/* 공식 무대 */}
        <div className="relative border border-[var(--bj-line)] p-6 sm:p-8 mb-6 sm:mb-8 grid md:grid-cols-[14rem_1fr] gap-4 md:gap-10">
          <Corners />
          <div>
            <div className="mono text-[10px] text-[var(--bj-red)]">OFFICIAL STAGE</div>
            <h3 className="serif mt-2 text-2xl sm:text-3xl font-semibold">GET 교육기술 대회</h3>
            <div className="mt-1 text-xs sm:text-sm text-[var(--ink-3)]">이번 방문의 공식 무대 · 11/25 (수)</div>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink-2)]">
            중국 교육기술 분야의 연례 대표 행사입니다. AI 수업, 스마트 하드웨어, 온·오프라인 혼합 수업, 교육 디지털 전환을 다루며 교육기관·기술 기업·유통 파트너가 한자리에 모입니다. ClassIn은 이번 대회에서 「AI 신교육」 특별 세션을 열고 전시에도 참여합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[22rem_1fr] border border-[var(--bj-line)]">
          {/* 목록: 데스크톱 세로 / 모바일 가로 스크롤 */}
          <div className="lg:border-r border-b lg:border-b-0 border-[var(--bj-line)] flex lg:flex-col overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ORGS.map((o, idx) => {
              const on = idx === i;
              return (
                <button
                  key={o.name}
                  type="button"
                  onClick={() => setI(idx)}
                  className={`relative shrink-0 lg:shrink text-left flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 border-r lg:border-r-0 lg:border-b border-[var(--bj-line)] last:border-r-0 lg:last:border-b-0 transition-colors ${
                    on ? "bg-[rgba(242,237,227,0.05)]" : "hover:bg-[rgba(242,237,227,0.03)]"
                  }`}
                  aria-pressed={on}
                >
                  {on && <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--bj-red)] hidden lg:block" />}
                  {on && <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--bj-red)] lg:hidden" />}
                  <span className={`serif w-9 h-9 lg:w-11 lg:h-11 shrink-0 flex items-center justify-center text-lg lg:text-xl font-semibold border ${on ? "border-[var(--bj-red)] text-[var(--bj-red)]" : "border-[var(--bj-line-2)] text-[var(--ink-2)]"}`}>
                    {o.glyph}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm lg:text-base font-semibold whitespace-nowrap ${on ? "text-[var(--ink)]" : "text-[var(--ink-2)]"}`}>{o.name}</span>
                    <span className="mono block text-[10px] text-[var(--ink-3)] whitespace-nowrap mt-0.5">{o.when}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* 상세 */}
          <div key={org.name} className="bj-fade-up p-6 sm:p-8 md:p-10 min-h-[420px]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="mono text-[10px] text-[var(--bj-red)]">{org.when}</div>
                <h3 className="serif mt-2 text-3xl sm:text-4xl font-semibold leading-tight">{org.name}</h3>
                {org.cn && <div className="mt-1 text-sm text-[var(--ink-3)]">{org.cn}</div>}
              </div>
              <span className="serif hidden sm:flex w-16 h-16 shrink-0 items-center justify-center text-3xl font-semibold border border-[var(--bj-line-2)] text-[var(--ink-2)]">
                {org.glyph}
              </span>
            </div>
            <p className="mt-5 text-[15px] sm:text-lg leading-relaxed text-[var(--ink)]">{org.summary}</p>
            <dl className="mt-7 border-t border-[var(--bj-line)]">
              {org.rows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 py-3.5 border-b border-[var(--bj-line)]">
                  <dt className="mono text-[11px] text-[var(--ink-3)] pt-0.5">{label}</dt>
                  <dd className="text-sm sm:text-[15px] leading-relaxed text-[var(--ink-2)]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex items-center justify-between">
              <span className="mono text-[10px] text-[var(--ink-3)]">
                {String(i + 1).padStart(2, "0")} / {String(ORGS.length).padStart(2, "0")} · ↑↓ 키로 이동
              </span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setI((v) => (v - 1 + ORGS.length) % ORGS.length)} className="bj-btn bj-btn-ghost !px-3 !py-2 text-xs" aria-label="이전">
                  ←
                </button>
                <button type="button" onClick={() => setI((v) => (v + 1) % ORGS.length)} className="bj-btn bj-btn-ghost !px-3 !py-2 text-xs" aria-label="다음">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 relative border border-[var(--bj-line)] p-6 sm:p-8 grid md:grid-cols-[14rem_1fr] gap-4 md:gap-10">
          <Corners />
          <div>
            <div className="mono text-[10px] text-[var(--ink-3)]">11/27 (금) 오전 방문</div>
            <h3 className="serif mt-2 text-2xl sm:text-3xl font-semibold">베이징 협력 대학</h3>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink-2)]">
            ClassIn과 협력 중인 베이징 소재 대학. 산학 협력과 인재 양성을 주제로 교류합니다. 학교명은 최종안에서 확정됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

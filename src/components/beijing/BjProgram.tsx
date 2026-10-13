import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import BjHead from "./BjHead";
import InterestMark from "./InterestMark";
import Seal from "./gfx/Seal";
import { TALKS } from "./data";

/** 11/25 특별 세션 — 인쇄된 프로그램 */
export default function BjProgram() {
  return (
    <section id="program" className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <BjHead
          title={
            <>
              11월 25일 오후,
              <br />
              ClassIn「AI 신교육」특별 세션
            </>
          }
          lead="GET 대회 안에서 ClassIn이 여는 세션입니다. 한국과 중국 학원 네 곳이 AI로 수업과 모집, 운영을 바꾼 이야기를 차례로 발표합니다."
        />
        <Reveal>
          <div className="paper p-7 sm:p-12">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[var(--ink)] pb-4">
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">PROGRAMME</div>
                <div className="serif text-2xl sm:text-3xl font-bold mt-1">AI 신교육 특별 세션</div>
              </div>
              <div className="text-right text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                GET 2026, 11월 25일 수요일 오후
                <br />
                베이징 신윈난 크라운플라자 호텔
              </div>
            </div>
            <ol>
              {TALKS.map((t) => (
                <li key={t.id} className="grid grid-cols-[2.6rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto] gap-3 sm:gap-6 py-6 border-b border-[var(--paper-line)] items-start">
                  <span className="serif text-3xl sm:text-5xl font-bold text-[var(--seal)] leading-none">{t.no}</span>
                  <div className="min-w-0">
                    <h3 className="serif text-lg sm:text-2xl font-semibold leading-snug">{t.title}</h3>
                    <div className="mt-1.5 text-sm text-[var(--ink-2)] flex flex-wrap items-center gap-2">
                      <span>{t.speaker}</span>
                      {t.note && <span className="mono text-[10px] border border-[var(--paper-line-2)] px-1.5 py-0.5">{t.note}</span>}
                    </div>
                  </div>
                  <InterestMark id={t.id} compact />
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-xs text-[var(--ink-3)]">발표 순서와 제목은 현장 사정에 따라 바뀔 수 있습니다.</span>
              <Seal glyph="會" size={46} className="shrink-0" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import BjHead from "./BjHead";
import InterestMark from "./InterestMark";
import { TALKS } from "./data";

/** 11/25 특별 세션 — 큰 번호의 편집 행 */
export default function BjSession() {
  return (
    <section id="session" className="relative py-20 sm:py-28 md:py-36 border-t border-[var(--bj-line)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <BjHead
          no="03"
          eyebrow="SPECIAL SESSION · 11.25 (수) 오후"
          title={
            <>
              ClassIn <span className="text-[var(--bj-red)]">「AI 신교육」</span>
              <br className="hidden sm:block" /> 특별 세션
            </>
          }
          lead="GET 대회 안에서 ClassIn이 여는 세션입니다. 한국과 중국 학원 네 곳이 AI로 수업과 모집, 운영을 바꾼 이야기를 차례로 발표합니다."
        />

        <Reveal>
          <ol className="border-t border-[var(--bj-line)]">
            {TALKS.map((t) => (
              <li key={t.id} className="group grid grid-cols-[3.2rem_1fr_auto] sm:grid-cols-[7rem_1fr_auto] items-start gap-4 sm:gap-8 py-7 sm:py-9 border-b border-[var(--bj-line)] hover:bg-[rgba(242,237,227,0.025)] transition-colors -mx-3 px-3">
                <span className="serif text-4xl sm:text-7xl font-semibold leading-none text-[var(--ink-3)] group-hover:text-[var(--bj-red)] transition-colors tabular-nums">
                  {t.no}
                </span>
                <div className="min-w-0">
                  <h3 className="serif text-xl sm:text-3xl md:text-[2.1rem] font-semibold leading-snug">{t.title}</h3>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-sm sm:text-base text-[var(--ink-2)]">{t.speaker}</span>
                    {t.note && <span className="mono text-[10px] border border-[var(--bj-line-2)] px-2 py-0.5 text-[var(--ink-3)]">{t.note}</span>}
                  </div>
                </div>
                <div className="pt-1">
                  <InterestMark id={t.id} compact />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

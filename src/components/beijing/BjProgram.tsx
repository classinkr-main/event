import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import InterestMark from "./InterestMark";
import Split from "./Split";
import { TALKS } from "./data";

/** 11/25 특별 세션 프로그램 */
export default function BjProgram() {
  return (
    <Split
      id="program"
      title={
        <>
          11월 25일 오후,
          <br />
          특별 세션
        </>
      }
      lead="GET 대회 안에서 ClassIn이 여는 「AI 신교육」 세션입니다. 한국과 중국 학원 네 곳이 AI로 수업과 모집, 운영을 바꾼 이야기를 차례로 발표합니다. 베이징 신윈난 크라운플라자 호텔."
      band
    >
      <ol className="border-t border-[var(--line-2)]">
        {TALKS.map((t, i) => (
          <Reveal key={t.id} delay={i * 40}>
            <li className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 py-6 sm:py-7 border-b border-[var(--line)] items-start">
              <span className="text-sm sm:text-base text-[var(--ink-3)] tabular-nums pt-1">{t.no}</span>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-2xl font-medium leading-snug tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-2)] flex flex-wrap items-center gap-2">
                  <span>{t.speaker}</span>
                  {t.note && <span className="text-xs border border-[var(--line-2)] rounded-full px-2 py-0.5 text-[var(--ink-3)]">{t.note}</span>}
                </p>
              </div>
              <div className="col-start-2 sm:col-start-3 pt-0.5">
                <InterestMark id={t.id} compact />
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Split>
  );
}

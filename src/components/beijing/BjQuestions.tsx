import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import InterestMark from "./InterestMark";
import Split from "./Split";
import { QUESTIONS } from "./data";

/** 현장에서 확인할 질문 — 번호 매긴 목록 */
export default function BjQuestions() {
  return (
    <Split
      id="questions"
      title={
        <>
          현장에서 확인하고 올
          <br />
          여섯 가지 질문
        </>
      }
      lead="이번 여정에서 만나는 사람과 숫자로 만든 질문입니다. 관심 가는 항목에 표시해 두면 참가 신청서에 함께 담깁니다."
      band
    >
      <ol className="border-t border-[var(--line-2)]">
        {QUESTIONS.map((q, i) => (
          <Reveal key={q.no} delay={i * 40}>
            <li className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 py-6 sm:py-7 border-b border-[var(--line)] items-start">
              <span className="text-sm sm:text-base text-[var(--ink-3)] tabular-nums pt-1">{q.no}</span>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-medium leading-snug tracking-tight">{q.q}</p>
                <p className="mt-2 text-sm text-[var(--ink-2)]">
                  {q.where} <span className="text-[var(--ink-3)] mx-1.5">|</span> {q.who}
                </p>
              </div>
              <div className="col-start-2 sm:col-start-3 pt-0.5">
                <InterestMark id={q.id} />
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Split>
  );
}

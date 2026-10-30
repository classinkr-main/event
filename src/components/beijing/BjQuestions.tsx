import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import InterestMark from "./InterestMark";
import Split from "./Split";
import { QUESTIONS } from "./data";

/** 현장에서 확인할 질문 — 상자 없이 번호와 가로줄로 나눈 목록 */
export default function BjQuestions() {
  return (
    <Split
      id="questions"
      title={
        <>
          현장에서 확인할
          <br />
          여섯 가지 질문
        </>
      }
      lead="관심 가는 항목에 표시해 두면 신청서에 함께 담깁니다."
    >
      <ol className="border-t border-[var(--line-2)]">
        {QUESTIONS.map((q, i) => (
          <Reveal key={q.no} delay={i * 40}>
            <li className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 py-5 sm:py-6 border-b border-[var(--line)] last:border-[var(--line-2)] items-start">
              <span className="text-gradient text-xl sm:text-2xl font-semibold tabular-nums">{q.no}</span>
              <div className="min-w-0">
                <p className="text-lg sm:text-[22px] font-medium leading-snug tracking-tight">{q.q}</p>
                <p className="mt-2 text-sm text-[var(--ink-2)]">
                  {q.who} <span className="text-[var(--ink-3)] mx-1.5">·</span> <span className="text-[var(--ink-3)]">{q.where}</span>
                </p>
              </div>
              <div className="col-start-2 sm:col-start-3 pt-0.5">
                <InterestMark id={q.id} compact />
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Split>
  );
}

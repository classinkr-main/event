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
          현장에서 확인할
          <br />
          여섯 가지 질문
        </>
      }
      lead="관심 가는 항목에 표시해 두면 신청서에 함께 담깁니다."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {QUESTIONS.map((q, i) => (
          <Reveal key={q.no} delay={(i % 2) * 60} className="h-full">
            <div className="glass rounded-2xl p-5 sm:p-6 h-full flex flex-col hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-gradient text-2xl font-semibold tabular-nums">{q.no}</span>
                <span className="text-xs text-[var(--ink-3)]">{q.where}</span>
              </div>
              <p className="mt-4 text-lg sm:text-xl font-medium leading-snug tracking-tight flex-1">{q.q}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-sm text-[var(--ink-2)]">{q.who}</span>
                <InterestMark id={q.id} compact />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Split>
  );
}

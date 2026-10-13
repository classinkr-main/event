import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import BjHead from "./BjHead";
import InterestMark from "./InterestMark";
import { QUESTIONS } from "./data";

/** 현장에서 확인할 질문 — 인덱스 카드 */
export default function BjQuestions() {
  return (
    <section id="questions" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <BjHead
          title="현장에서 확인하고 올 여섯 가지 질문"
          lead="이번 여정에서 만나는 사람과 숫자로 만든 질문입니다. 관심 가는 항목에 표시해 두면 참가 신청서에 함께 담깁니다."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {QUESTIONS.map((q, i) => (
            <Reveal key={q.no} delay={(i % 3) * 80} className="h-full">
              <div
                className={`paper h-full p-6 sm:p-7 flex flex-col transition-transform duration-500 ${
                  i % 2 ? "lg:rotate-1" : "lg:-rotate-1"
                } lg:hover:rotate-0`}
              >
                <div className="flex items-center justify-between">
                  <span className="serif text-3xl font-bold text-[var(--seal)] leading-none">{q.no}</span>
                  <span className="mono text-[10px] text-[var(--ink-3)]">{q.where}</span>
                </div>
                <p className="serif mt-5 text-xl sm:text-[1.35rem] font-semibold leading-snug flex-1">{q.q}</p>
                <div className="mt-6 pt-4 border-t border-[var(--paper-line)] flex items-end justify-between gap-3">
                  <span className="text-xs sm:text-[13px] text-[var(--ink-2)] leading-snug">{q.who}</span>
                  <InterestMark id={q.id} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

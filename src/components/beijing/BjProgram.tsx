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
      lead="GET 대회 안에서 ClassIn이 여는 「AI 신교육」 세션. 한국·중국 학원 4곳이 발표합니다."
      band
    >
      <ol className="glass rounded-3xl px-5 sm:px-7">
        {TALKS.map((t, i) => (
          <Reveal key={t.id} delay={i * 40}>
            <li className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 py-5 sm:py-6 border-b border-[var(--line)] last:border-b-0 items-start">
              <span className="text-gradient text-xl sm:text-2xl font-semibold tabular-nums">{t.no}</span>
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

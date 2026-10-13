import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import FlipCard from "./FlipCard";
import Seal from "./gfx/Seal";
import Split from "./Split";
import { ORGS } from "./data";

/** 기관·연사 명함 */
export default function BjCards() {
  return (
    <Split id="people" title="만나는 사람들" lead="명함을 누르면 소개가 나옵니다." wide>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {ORGS.map((o, i) => (
          <Reveal key={o.name} delay={(i % 3) * 60}>
            <FlipCard org={o} />
          </Reveal>
        ))}
      </div>
      <div className="mt-4 sm:mt-5 grid md:grid-cols-2 gap-4 sm:gap-5">
        <Reveal>
          <div className="glass rounded-3xl p-6 h-full flex gap-5">
            <Seal glyph="會" size={52} className="shrink-0" />
            <div>
              <div className="text-xl font-medium tracking-tight">GET 교육기술 대회</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">이번 방문의 공식 무대, 11월 25일 수요일</div>
              <p className="mt-3 text-[13px] sm:text-sm leading-relaxed text-[var(--ink-2)]">
                중국 교육기술 연례 대표 행사. AI 수업, 스마트 하드웨어, 교육 디지털 전환을 다룹니다. ClassIn은 특별 세션과 전시로 참여합니다.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="glass rounded-3xl p-6 h-full flex gap-5">
            <Seal glyph="大" size={52} className="shrink-0" />
            <div>
              <div className="text-xl font-medium tracking-tight">베이징 협력 대학</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">11월 27일 금요일 오전 방문</div>
              <p className="mt-3 text-[13px] sm:text-sm leading-relaxed text-[var(--ink-2)]">
                ClassIn 협력 대학. 산학 협력과 인재 양성을 주제로 교류합니다. 학교명은 최종안에서 확정됩니다.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Split>
  );
}

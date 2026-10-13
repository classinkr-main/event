import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import BjHead from "./BjHead";
import FlipCard from "./FlipCard";
import Seal from "./gfx/Seal";
import { ORGS } from "./data";

/** 기관·연사 명함 */
export default function BjCards() {
  return (
    <section id="people" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <BjHead title="만나는 사람들의 명함" lead="앞면은 명함, 뒷면은 소개입니다. 눌러서 뒤집어 보세요." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ORGS.map((o, i) => (
            <Reveal key={o.name} delay={(i % 3) * 80}>
              <FlipCard org={o} />
            </Reveal>
          ))}
        </div>

        <div className="mt-5 sm:mt-6 grid md:grid-cols-[1.4fr_1fr] gap-5 sm:gap-6">
          <Reveal>
            <div className="paper p-6 sm:p-8 h-full flex flex-col sm:flex-row gap-5 sm:gap-8">
              <Seal glyph="會" size={64} className="shrink-0" />
              <div>
                <div className="serif text-2xl font-bold">GET 교육기술 대회</div>
                <div className="text-xs text-[var(--ink-2)] mt-1">이번 방문의 공식 무대, 11월 25일 수요일</div>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--ink-2)]">
                  중국 교육기술 분야의 연례 대표 행사입니다. AI 수업, 스마트 하드웨어, 온·오프라인 혼합 수업, 교육 디지털 전환을 다루며 교육기관과 기술 기업, 유통 파트너가 한자리에 모입니다. ClassIn은 이번 대회에서 「AI 신교육」 특별 세션을 열고 전시에도 참여합니다.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="paper p-6 sm:p-8 h-full flex flex-col sm:flex-row gap-5 sm:gap-8">
              <Seal glyph="大" size={64} className="shrink-0" />
              <div>
                <div className="serif text-2xl font-bold">베이징 협력 대학</div>
                <div className="text-xs text-[var(--ink-2)] mt-1">11월 27일 금요일 오전 방문</div>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--ink-2)]">
                  ClassIn과 협력 중인 베이징 소재 대학입니다. 산학 협력과 인재 양성을 주제로 교류합니다. 학교명은 최종안에서 확정됩니다.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

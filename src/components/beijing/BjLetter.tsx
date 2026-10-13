import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Seal from "./gfx/Seal";

/** 초청의 글 — 편지지 */
export default function BjLetter() {
  return (
    <section id="letter" className="relative py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="paper p-8 sm:p-14">
            <div className="flex items-end justify-between border-b border-[var(--paper-line-2)] pb-4">
              <div>
                <div className="font-bold tracking-tight text-lg">
                  ClassIn <span className="serif font-medium">Korea</span>
                </div>
                <div className="text-xs text-[var(--ink-2)] mt-0.5">서울 양천구 목동동로 233-1, 806호</div>
              </div>
              <div className="mono text-xs text-[var(--ink-2)]">2026. 10.</div>
            </div>

            <h2 className="serif mt-10 text-3xl sm:text-4xl font-bold">원장님께.</h2>
            <div className="serif mt-7 space-y-5 text-[17px] sm:text-[19px] leading-[1.95]">
              <p>올해 11월, 베이징에서 사흘을 함께 보내고자 초청의 글을 드립니다.</p>
              <p>
                중국 교육기술 연례 행사인 GET 대회에서 ClassIn이 여는 「AI 신교육」 세션을 함께 보고, ClassIn 본사에서 CTO에게 AI 시대 제품 로드맵을 직접 듣습니다. 1:1 맞춤 지도로 이름난 베이징 학원 쉐팡교육과 ClassIn 협력 대학도 찾아갑니다.
              </p>
              <p>
                온라인 수학 수업의 수강 완료율을 업계 평균의 1.6배까지 끌어올린 학원, 수강생 0명에서 1만 명으로 키운 AI 강좌, 본사 조직을 AI로 대체한 학원까지. 한국 학원의 다음 모습을 미리 보고 돌아오는 자리가 될 것입니다.
              </p>
              <p>항공과 숙박, 현지 이동 등 세부 사항은 신청해 주시면 담당자가 개별 안내드리겠습니다. 함께해 주시면 감사하겠습니다.</p>
            </div>

            <div className="mt-12 flex items-end justify-between">
              <div>
                <div className="serif text-lg">ClassIn Korea 드림</div>
                <div className="text-xs text-[var(--ink-2)] mt-1">02-6958-8566</div>
              </div>
              <Seal glyph="招" size={88} className="-rotate-6 -mb-2" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Seal from "./gfx/Seal";
import Split from "./Split";

/** 초청의 글 — 왼쪽 제목, 오른쪽 큰 본문(세리프) */
export default function BjLetter() {
  return (
    <Split id="letter" title="초청의 글">
      <Reveal>
        <div className="glass-strong rounded-3xl p-7 sm:p-10 md:p-12">
          <div className="serif text-[18px] sm:text-[22px] md:text-[24px] leading-[1.75] space-y-5">
            <p>원장님께</p>
            <p>올해 11월, 베이징에서 사흘을 함께 보내고자 합니다.</p>
            <p>중국 학원들은 지난 몇 년 사이 AI로 수업과 운영을 크게 바꿨습니다. 그 변화를 만든 사람들을 현장에서 직접 만나는 자리입니다.</p>
            <p className="text-[var(--ink-2)]">GET 대회의 ClassIn 세션, 본사 CTO의 제품 로드맵, 베이징 학원과 대학 방문을 준비했습니다. 각 현장의 대표를 직접 만나 궁금한 점을 물으실 수 있습니다.</p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <Seal glyph="招" size={56} className="-rotate-6" />
            <div>
              <div className="font-semibold">ClassIn Korea 드림</div>
              <div className="text-sm text-[var(--ink-2)]">2026년 10월 <span className="zh-serif ml-1">邀请函</span></div>
            </div>
          </div>
        </div>
      </Reveal>
    </Split>
  );
}

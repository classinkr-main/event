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
            <p>원장님께. 올해 11월, 베이징에서 사흘을 함께 보내고자 합니다.</p>
            <p>GET 대회에서 ClassIn의 「AI 신교육」 세션을 보고, 본사에서 CTO의 제품 로드맵을 듣고, 베이징의 학원과 대학을 찾아갑니다.</p>
            <p className="text-[var(--ink-2)]">수강 완료율 73%의 온라인 수학 학원, 0명에서 1만 명으로 큰 AI 강좌, 본사 없이 돌아가는 학원. 한국 학원의 다음 모습을 미리 보고 오시길 바랍니다.</p>
            <p className="text-[var(--ink-2)]">항공·숙박 등 세부 사항은 신청 후 개별 안내드립니다.</p>
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

import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Seal from "./gfx/Seal";
import Split from "./Split";

/** 초청의 글 — 왼쪽 제목, 오른쪽 큰 본문(세리프) */
export default function BjLetter() {
  return (
    <Split id="letter" title="초청의 글">
      <Reveal>
        <div className="serif text-[19px] sm:text-[23px] md:text-[26px] leading-[1.75] text-[var(--ink)] space-y-6">
          <p>원장님께. 올해 11월, 베이징에서 사흘을 함께 보내고자 초청의 글을 드립니다.</p>
          <p>
            중국 교육기술 연례 행사인 GET 대회에서 ClassIn이 여는 「AI 신교육」 세션을 함께 보고, ClassIn 본사에서 CTO에게 AI 시대 제품 로드맵을 직접 듣습니다. 1:1 맞춤 지도로 이름난 베이징 학원 쉐팡교육과 ClassIn 협력 대학도 찾아갑니다.
          </p>
          <p className="text-[var(--ink-2)]">
            온라인 수학 수업의 수강 완료율을 업계 평균의 1.6배까지 끌어올린 학원, 수강생 0명에서 1만 명으로 키운 AI 강좌, 본사 조직을 AI로 대체한 학원까지. 한국 학원의 다음 모습을 미리 보고 돌아오는 자리가 될 것입니다.
          </p>
          <p className="text-[var(--ink-2)]">항공과 숙박, 현지 이동 등 세부 사항은 신청해 주시면 담당자가 개별 안내드리겠습니다. 함께해 주시면 감사하겠습니다.</p>
        </div>
        <div className="mt-10 flex items-center gap-5">
          <Seal glyph="招" size={64} className="-rotate-6" />
          <div>
            <div className="font-semibold">ClassIn Korea 드림</div>
            <div className="text-sm text-[var(--ink-2)] mt-0.5">2026년 10월, 서울 목동에서</div>
          </div>
        </div>
      </Reveal>
    </Split>
  );
}

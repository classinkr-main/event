import SectionHead from "@/components/hakwonjeonja/SectionHead";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";

const talks = [
  {
    no: "01",
    title: "AI가 바꾸는 미래 교실: BYOD와 AI 수업 분석",
    speaker: "한국 정율사관 창업자",
    note: "세부 주제 협의 중",
  },
  {
    no: "02",
    title: "학원은 ‘뉴미디어 모집’ 전쟁을 어떻게 이기는가",
    speaker: "유명 교육 크리에이터",
  },
  {
    no: "03",
    title: "국제 교육의 디지털 전환, 현장 사례",
    speaker: "신동방 국제교육",
  },
  {
    no: "04",
    title: "지역 학원의 전자칠판 돌파 전략: 상호작용과 입소문",
    speaker: "충칭 훠광교육",
  },
];

export default function BjSession() {
  return (
    <section id="session" className="relative py-20 sm:py-32 md:py-40">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="SPECIAL SESSION · 11 / 25 (수) 오후"
          title={
            <>
              ClassIn <span className="text-gradient">「AI 신교육」</span> 특별 세션
            </>
          }
          lead="GET 대회 안에서 ClassIn이 여는 세션입니다. 한국과 중국 학원 네 곳이 AI로 수업과 모집, 운영을 바꾼 이야기를 차례로 발표합니다."
        />

        <Reveal>
          <div className="glass-strong rounded-2xl sm:rounded-3xl divide-y divide-white/8 overflow-hidden">
            {talks.map((t) => (
              <div
                key={t.no}
                className="flex items-start gap-5 sm:gap-8 p-6 sm:p-8 hover:bg-white/[0.05] transition-colors"
              >
                <div className="shrink-0 text-3xl sm:text-5xl font-bold tracking-tight text-gradient leading-none pt-0.5 tabular-nums">
                  {t.no}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl sm:text-3xl font-bold tracking-tight leading-snug">
                    {t.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-base sm:text-lg text-white/65">{t.speaker}</span>
                    {t.note && (
                      <span className="text-[11px] sm:text-xs tracking-[0.15em] rounded-full border border-white/15 px-2.5 py-1 text-white/50">
                        {t.note}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

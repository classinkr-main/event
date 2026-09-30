import SectionHead from "./SectionHead";
import Reveal from "./fx/Reveal";
import Tilt3D from "./fx/Tilt3D";
import CountUp from "./fx/CountUp";

const results = [
  {
    who: "목동 S 학원 · 수학",
    prefix: "",
    value: 2,
    unit: "배",
    title: "같은 교실, 같은 강사,\n정원은 두 배",
    detail: "현장 40명 + 온라인 40명\n월 순증 이익 1,160만원",
  },
  {
    who: "C 학원 · 소규모",
    prefix: "+",
    value: 360,
    unit: "만원/월",
    title: "조교 없이\n심야 특강 매출",
    detail: "90명 × 월 4만원\n숙제·시험 채점 100% 자동",
  },
  {
    who: "L 학원 · 10개 지점",
    prefix: "",
    value: 41,
    unit: "개 강의실",
    title: "강사가 떠나도\n수업은 남음",
    detail: "중앙연구소 1곳이 교안 제작·배분\nAI가 전 수업 진단",
  },
  {
    who: "부산 K 학원 · 3개 센터",
    prefix: "",
    value: 500,
    unit: "만 → 0",
    title: "차량은 멈추고,\n수익은 남음",
    detail: "3개 센터 동시 실시간 강의\n차량 운행비 월 500만원 절감",
  },
];

export default function HjResults() {
  return (
    <section id="results" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="RESULTS"
          title={
            <>
              도입한 학원은
              <br />
              이렇게 달라졌습니다.
            </>
          }
          lead="2025~2026년 ClassIn을 도입한 학원들의 실제 변화입니다."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {results.map((r, i) => (
            <Reveal key={r.who} delay={i * 100} className="h-full">
              <Tilt3D
                max={6}
                className="glass h-full rounded-2xl sm:rounded-3xl p-6 lg:p-5 xl:p-7 text-center hover:bg-white/[0.06]"
              >
                <div className="text-xs sm:text-sm tracking-[0.1em] text-white/50">
                  {r.who}
                </div>
                <div className="mt-4 sm:mt-5 leading-none whitespace-nowrap">
                  <CountUp
                    value={r.value}
                    prefix={r.prefix}
                    className="text-5xl lg:text-[3rem] xl:text-6xl font-bold tracking-tight text-white"
                  />
                  <span className="ml-1 text-base sm:text-lg font-semibold text-[var(--accent-from)]">
                    {r.unit}
                  </span>
                </div>
                <div className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold leading-snug whitespace-pre-line">
                  {r.title}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 text-xs sm:text-sm text-white/50 leading-relaxed whitespace-pre-line">
                  {r.detail}
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-white/35">
          학원명은 이니셜로 표기했습니다.
        </p>
      </div>
    </section>
  );
}

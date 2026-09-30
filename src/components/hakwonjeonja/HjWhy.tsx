import SectionHead from "./SectionHead";
import Reveal from "./fx/Reveal";
import Tilt3D from "./fx/Tilt3D";

const steps = [
  { tag: "수업", title: "전자칠판 + AI 카메라", sub: "평소 수업 그대로 진행" },
  { tag: "데이터", title: "기록이 자동으로 쌓임", sub: "판서 · 영상 · 과제 · 성적" },
  { tag: "운영", title: "ClassIn 한 화면에서", sub: "보강 · 리포트 · 관리" },
];

const changes = [
  { tag: "결석", before: "보강은 따로 시간을 내야", after: "다시보기로 보강" },
  { tag: "강사 이탈", before: "자료도 함께 나감", after: "교안·녹화본은 학원에" },
  { tag: "학부모 상담", before: "보여줄 근거가 없음", after: "학습 과정 리포트" },
  { tag: "채점", before: "여전히 조교 손으로", after: "숙제·시험 자동 채점" },
];

export default function HjWhy() {
  return (
    <section id="why" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="WHY SMART CLASSROOM"
          title={
            <>
              칠판이 바뀌어도,
              <br />
              수업은 그 시간에만 남습니다.
            </>
          }
          lead="스마트교실은 기기가 아니라 하나의 흐름입니다. 수업이 끝나도 기록이 남고, 그 기록이 학원 운영으로 이어집니다."
        />

        <Reveal className="[perspective:1400px]">
          <Tilt3D max={3} glare className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10">
            <img
              src="/hakwonjeonja/structure.png"
              alt="전자칠판, AI 카메라, 디스플레이가 연결된 스마트교실 구조"
              width={1087}
              height={353}
              loading="lazy"
              className="w-full h-auto"
            />
          </Tilt3D>
        </Reveal>

        <div className="mt-6 sm:mt-8 grid sm:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.tag} delay={i * 100} className="h-full">
              <Tilt3D max={5} className="glass h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 hover:bg-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs tracking-[0.25em] rounded-full border border-white/15 px-3 py-1.5 text-white/70">
                    {`0${i + 1}`}
                  </span>
                  <span className="text-xs sm:text-sm text-white/50">{s.tag}</span>
                </div>
                <div className="mt-4 text-xl sm:text-2xl font-bold tracking-tight">{s.title}</div>
                <div className="mt-1.5 text-sm sm:text-base text-white/55">{s.sub}</div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 sm:mt-16">
          <div className="flex items-center gap-4 mb-5 sm:mb-6">
            <p className="text-sm sm:text-base text-white/50 tracking-[0.2em] shrink-0">
              그래서 달라지는 것
            </p>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-white/10 sm:gap-4">
            {changes.map((c) => (
              <div key={c.tag} className="py-4 sm:py-0 sm:px-1">
                <div className="text-xs sm:text-sm font-semibold text-white/80">{c.tag}</div>
                <div className="mt-2 text-sm text-white/40 line-through decoration-white/25">{c.before}</div>
                <div className="mt-1 flex items-center gap-2 text-base sm:text-lg font-semibold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--accent-from)]">
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c.after}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

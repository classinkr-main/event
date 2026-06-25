type Part = {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  variant?: "default" | "special";
};

const program: Part[] = [
  {
    tag: "Part 1",
    title: "AI 튜토리얼",
    subtitle: "수업 자동화 시작해보기",
    description:
      "복잡한 도구 없이도 시작할 수 있는, 학원 현장에서 바로 쓰는 AI 활용법. 출석·과제·피드백까지 단계별 자동화 시연.",
  },
  {
    tag: "Part 2",
    title: "학원 마케팅 전략",
    subtitle: "학원 성장의 新공식",
    description:
      "AI 시대의 학부모는 다르게 검색하고 다르게 선택합니다. 등록률을 높이는 신규 채널·콘텐츠·상담 전환 공식.",
  },
  {
    tag: "Part 3",
    title: "AI 전환 교실 사례",
    subtitle: "도입부터 정착까지",
    description:
      "실제 도입한 학원장님들의 솔직한 이야기. 무엇이 바뀌었고, 어떤 저항이 있었으며, 어떻게 정착시켰는지.",
  },
  {
    tag: "Special",
    title: "현장 전문가 1:1 컨설팅",
    subtitle: "원장님 학원만을 위한 맞춤 진단",
    description:
      "세션 후 별도 시간 — Classin 전문가가 학원 규모·과목·지역 특성에 맞춘 도입 로드맵을 1:1로 함께 설계합니다.",
    variant: "special",
  },
];

export default function IncheonProgram() {
  return (
    <section id="program" className="relative py-20 sm:py-32 md:py-40">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-3 sm:mb-4">
            PROGRAM
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            세 가지 핵심, 그리고 한 번의 만남.
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/60 max-w-2xl mx-auto">
            AI 도입을 고민하시는 학원장님들이 가장 많이 묻는 세 가지 주제를 한 자리에 모았습니다.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {program.map((p) => {
            const isSpecial = p.variant === "special";
            return (
              <div
                key={p.tag}
                className={`${
                  isSpecial ? "glass-strong" : "glass"
                } rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/[0.06] transition-all`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                  <div className="shrink-0 sm:w-32 mb-4 sm:mb-0">
                    <div
                      className={`inline-block text-[11px] sm:text-xs tracking-[0.25em] px-3 py-1.5 rounded-full ${
                        isSpecial
                          ? "bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white"
                          : "border border-white/15 text-white/70"
                      }`}
                    >
                      {p.tag.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <div className="mt-1 text-sm sm:text-base text-white/60">
                      {p.subtitle}
                    </div>
                    <p className="mt-3 sm:mt-4 text-[13px] sm:text-[15px] leading-relaxed text-white/70">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

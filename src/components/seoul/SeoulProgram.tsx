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
    title: "수학에 심장을 달다",
    subtitle: "이정환 대표",
    description: "클래스인으로 완성하는 새로운 수업 모델.",
  },
  {
    tag: "Part 2",
    title: "쿼드러닝",
    subtitle: "배철웅 대표",
    description: "시간의 한계를 넘어서는 수익 확장 전략.",
  },
  {
    tag: "Part 3",
    title: "클래스인",
    subtitle: "박 한 팀장",
    description: "학원 운영을 바꾼 클래스인 도입 사례.",
  },
  {
    tag: "Special",
    title: "현직 전문가 1:1 컨설팅 제공",
    subtitle: "원장님 학원만을 위한 맞춤 진단",
    description:
      "세미나 현장에서 현직 전문가가 원장님 학원 상황에 맞춘 1:1 컨설팅을 제공합니다.",
    variant: "special",
  },
];

export default function SeoulProgram() {
  return (
    <section id="program" className="snap-section relative py-20 sm:py-32 md:py-40">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-3 sm:mb-4">
            PROGRAM
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            세 가지 핵심, 그리고 한 번의 만남.
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/60 max-w-2xl mx-auto">
            학원 성장의 답을 먼저 찾은 세 분의 이야기를 한 자리에 모았습니다.
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
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <div className="mt-1 text-base sm:text-lg text-white/60">
                      {p.subtitle}
                    </div>
                    <p className="mt-3 sm:mt-4 text-[15px] sm:text-lg leading-relaxed text-white/70">
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

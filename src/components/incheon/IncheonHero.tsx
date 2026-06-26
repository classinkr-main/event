export default function IncheonHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/songdo-skyline.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060f]/55 via-[#02060f]/75 to-[#02060f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060f]/95 via-[#02060f]/40 to-transparent" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="reveal max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
            <span className="h-px w-8 sm:w-10 bg-gradient-to-r from-transparent to-white/60" />
            <span className="text-[10px] sm:text-sm tracking-[0.4em] text-white/70 font-medium">
              CLASSIN MEETS · INVITATION
            </span>
          </div>

          <h1 className="font-bold tracking-tight leading-[1.05]">
            <span className="block text-[2.75rem] sm:text-7xl md:text-8xl text-white">
              INCHEON
            </span>
            <span className="block text-[2.75rem] sm:text-7xl md:text-8xl text-gradient">
              인천
            </span>
            <span className="block mt-3 text-xl sm:text-3xl md:text-4xl text-white/80 tracking-[0.15em] sm:tracking-[0.2em] font-light">
              AI 시대, 학원의 새로운 성장 전략
            </span>
          </h1>

          <p className="mt-8 sm:mt-10 max-w-xl text-[15px] sm:text-lg leading-relaxed text-white/70">
            AI는 더 이상 먼 미래의 이야기가 아닙니다.
            <br className="hidden sm:inline" />{" "}
            수업 자동화부터 마케팅, 교실 전환까지—
            <br className="hidden sm:inline" />{" "}
            인천 청라·송도 학원장님들을 위한
            <br className="hidden sm:inline" />{" "}
            현장 중심의 실전 설명회를 준비했습니다.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href="#register"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all hover:scale-[1.02]"
            >
              참가 신청하기
            </a>
            <a
              href="#program"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/40 hover:bg-white/5 transition-all"
            >
              프로그램 보기
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] sm:text-xs tracking-[0.3em] float-slow">
        SCROLL
      </div>
    </section>
  );
}

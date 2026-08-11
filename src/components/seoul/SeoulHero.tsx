export default function SeoulHero() {
  return (
    <section className="snap-section relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/seoul-skyline.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060f]/55 via-[#02060f]/75 to-[#02060f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060f]/95 via-[#02060f]/40 to-transparent" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="reveal max-w-3xl">
          <div className="inline-flex items-center gap-2.5 mb-7 sm:mb-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)]" />
            <span className="text-xs sm:text-sm text-white/80 font-medium">
              학원 원장님 대상 · 오프라인 세미나
            </span>
          </div>

          <p className="text-lg sm:text-2xl md:text-3xl text-white/80 font-light tracking-tight mb-3 sm:mb-4">
            AI 시대, 학원의 새로운 성장 전략
          </p>

          <h1 className="font-bold tracking-tight leading-[1.02]">
            <span className="block text-[3.25rem] sm:text-8xl md:text-9xl">
              <span className="text-white">Classin</span>{" "}
              <span className="text-gradient">Meets</span>
            </span>
          </h1>

          <div className="mt-6 sm:mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-5 sm:px-6 py-2 sm:py-2.5">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white">
              SEOUL SEMINAR
            </span>
          </div>

          <div className="mt-8 sm:mt-10 space-y-2.5 text-base sm:text-xl text-white/80">
            <div className="flex items-baseline gap-3">
              <span className="shrink-0 text-xs sm:text-sm tracking-[0.2em] text-white/45 w-14">
                일 정
              </span>
              <span className="font-semibold text-white">
                8월 19일 (수){" "}
                <span className="font-normal text-white/70">
                  오전 11시 – 오후 1시
                </span>
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="shrink-0 text-xs sm:text-sm tracking-[0.2em] text-white/45 w-14">
                장 소
              </span>
              <span className="font-semibold text-white">
                거산학원{" "}
                <span className="font-normal text-white/70">
                  (수학에 심장을 달다) · 서울 양천구 오목로 285, 4층
                </span>
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="shrink-0 text-xs sm:text-sm tracking-[0.2em] text-white/45 w-14">
                대 상
              </span>
              <span className="font-semibold text-white">
                학원 원장 및 관계자
              </span>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href="#register"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm sm:text-base hover:bg-white/90 transition-all hover:scale-[1.02]"
            >
              참가 신청하기
            </a>
            <a
              href="#program"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm sm:text-base hover:border-white/40 hover:bg-white/5 transition-all"
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

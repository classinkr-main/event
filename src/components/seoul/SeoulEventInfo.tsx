export default function SeoulEventInfo() {
  return (
    <section id="event" className="snap-section relative py-20 sm:py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12 sm:mb-20">
          <p className="text-sm tracking-[0.3em] text-white/50 mb-4">
            EVENT OVERVIEW
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            서울 목동에서 만납니다.
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/60 max-w-2xl mx-auto">
            8월 19일 수요일 오전 11시, 거산학원에서 진행됩니다.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-6 sm:p-10 hover:bg-white/[0.06] transition-all">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="shrink-0 rounded-2xl border border-white/15 px-3.5 sm:px-4 py-2.5 sm:py-3 text-center min-w-[68px] sm:min-w-[80px]">
                <div className="text-lg sm:text-2xl font-bold tracking-[0.2em]">
                  목 동
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] sm:text-xs tracking-[0.25em] text-white/40 mb-1.5">
                  MOKDONG
                </div>
                <div className="text-xl sm:text-3xl font-semibold leading-snug">
                  8월 19일 (수)
                </div>
                <div className="mt-1 text-sm sm:text-base text-white/50">
                  오전 11시 – 오후 1시
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-start gap-3 text-white/80">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0 text-white/50">
                  <path
                    d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13zM12 12a3 3 0 100-6 3 3 0 000 6z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="text-lg sm:text-2xl font-semibold">
                    거산학원 <span className="text-white/50 text-base sm:text-lg font-normal">(수학에 심장을 달다)</span>
                  </div>
                  <div className="mt-1.5 text-sm sm:text-base text-white/60">
                    서울 양천구 오목로 285, 4층
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 max-w-2xl mx-auto glass-strong rounded-2xl px-5 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2 text-white/80">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-from)]">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" fill="currentColor" />
            </svg>
            <span className="text-sm font-medium">참가 안내</span>
          </div>
          <p className="text-sm sm:text-base text-white/60">
            학원 원장 및 관계자를 위한 오프라인 세미나입니다. 현장에서 현직 전문가 1:1 컨설팅이 제공됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

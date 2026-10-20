const MAP_URL = "https://map.naver.com/p/search/" + encodeURIComponent("엔에스 수능관학원");

export default function SongdoEventInfo() {
  return (
    <section id="event" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-3 sm:mb-4">
            EVENT OVERVIEW
          </p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold">
            송도에서 만납니다.
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/60 max-w-2xl mx-auto">
            10월 29일 목요일 오전 11시, 클래스인을 실제로 도입한 엔에스 수능관학원에서 진행됩니다.
          </p>
        </div>

        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 sm:p-10">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="shrink-0 rounded-2xl border border-[var(--accent-from)]/40 bg-[var(--accent-from)]/10 px-3.5 sm:px-4 py-2.5 sm:py-3 text-center min-w-[68px] sm:min-w-[80px]">
              <div className="font-display text-lg sm:text-2xl font-bold text-[var(--accent-from)]">
                10.29
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] sm:text-xs tracking-[0.25em] text-white/40 mb-1.5">
                SONGDO · INCHEON
              </div>
              <div className="font-display text-xl sm:text-3xl font-bold leading-snug">
                2026년 10월 29일 (목)
              </div>
              <div className="mt-1 text-sm sm:text-base text-white/50">
                오전 11시 – 오후 1시 · 무료 참석
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-white/10 space-y-5">
            <div className="flex items-start gap-3 text-white/80">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0 text-[var(--accent-from)]">
                <path
                  d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13zM12 12a3 3 0 100-6 3 3 0 000 6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-semibold">엔에스 수능관학원</div>
                <div className="mt-1.5 text-sm sm:text-base text-white/60">
                  인천 연수구 해돋이로 160-14 5층 504호
                </div>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--accent-from)] hover:underline underline-offset-4"
                >
                  네이버 지도에서 보기
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-white/80">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0 text-[var(--accent-from)]">
                <path
                  d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="text-base sm:text-lg font-semibold">
                  <a href="tel:010-5911-8522" className="hover:underline underline-offset-4">
                    010-5911-8522
                  </a>{" "}
                  <span className="text-white/50 font-normal text-sm sm:text-base">(클래스인 신희성)</span>
                </div>
                <div className="mt-1 text-sm text-white/50">참석·일정 관련 문의</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Session = {
  badge: string;
  region: string;
  date: string;
  weekday: string;
  venue: string;
  venueDetail: string;
};

const sessions: Session[] = [
  {
    badge: "청 라",
    region: "Cheongna",
    date: "7월 9일 (수)",
    weekday: "2026",
    venue: "청라 캐슬학원",
    venueDetail: "인천 서구 청라에메랄드로 94",
  },
  {
    badge: "송 도",
    region: "Songdo",
    date: "7월 10일 (목)",
    weekday: "2026",
    venue: "송도 엔에스과학수학학원",
    venueDetail: "인천 연수구 신송로 154",
  },
];

export default function IncheonEventInfo() {
  return (
    <section id="event" className="relative py-20 sm:py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12 sm:mb-20">
          <p className="text-sm tracking-[0.3em] text-white/50 mb-4">
            EVENT OVERVIEW
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            이틀 동안, 두 지역에서.
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/60 max-w-2xl mx-auto">
            가까운 날짜와 지역으로 편하게 선택해 참여해 주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {sessions.map((s) => (
            <div
              key={s.region}
              className="glass rounded-3xl p-6 sm:p-10 hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="shrink-0 rounded-2xl border border-white/15 px-3.5 sm:px-4 py-2.5 sm:py-3 text-center min-w-[68px] sm:min-w-[80px]">
                  <div className="text-lg sm:text-2xl font-bold tracking-[0.2em]">
                    {s.badge}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs tracking-[0.25em] text-white/40 mb-1.5">
                    {s.region.toUpperCase()}
                  </div>
                  <div className="text-lg sm:text-2xl font-semibold leading-snug">
                    {s.date}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-white/50">
                    {s.weekday}
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-start gap-2.5 text-white/80">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-white/50">
                    <path
                      d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13zM12 12a3 3 0 100-6 3 3 0 000 6z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <div className="text-sm sm:text-base">{s.venue}</div>
                    <div className="mt-1 text-[11px] sm:text-xs text-white/40">
                      {s.venueDetail}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-10 max-w-4xl mx-auto glass-strong rounded-2xl px-5 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2 text-white/80">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-from)]">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" fill="currentColor" />
            </svg>
            <span className="text-sm font-medium">참가 안내</span>
          </div>
          <p className="text-sm text-white/60">
            인천 청라·송도 지역 학원장 및 운영진을 위한 초청 설명회입니다. 세부 시간은 신청자에게 개별 안내됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

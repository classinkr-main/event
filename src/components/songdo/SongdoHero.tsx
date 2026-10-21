const rows = [
  { label: "일 시", main: "2026.10.29 (목)", sub: "오전 11시 – 오후 1시" },
  { label: "장 소", main: "엔에스 수능관학원", sub: "인천 연수구 해돋이로 160-14 5층 504호" },
  { label: "대 상", main: "학원 원장님 및 관계자", sub: "무료 참석 · 실제 도입 학원 현장", nowrap: true },
];

/**
 * 히어로 사진 = 부산 1차 설명회(2026.05.08) 준혁님 발표 장면. 슬라이드 쪽은 글씨가 제목 뒤로 읽히지 않게 흐리게 처리한 사본.
 * 가로 화면(PC·태블릿 가로) = 사진을 배경 전체에, 준혁님은 오른쪽 빈자리 / 세로 화면(휴대폰·태블릿 세로) = 위쪽에 준혁님 사진, 아래에 글
 */
export default function SongdoHero() {
  return (
    <section className="relative overflow-hidden landscape:min-h-[100svh] landscape:flex landscape:items-center">
      <div aria-hidden className="absolute inset-0 portrait:hidden">
        <div
          className="absolute inset-0 bg-cover bg-[70%_42%]"
          style={{ backgroundImage: "url('/songdo/hero-junhyuk.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050807]/60 via-[#050807]/15 to-[#050807]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,7,0.92)_0%,rgba(5,8,7,0.78)_40%,rgba(5,8,7,0.35)_60%,rgba(5,8,7,0)_76%)]" />
      </div>
      <div aria-hidden className="relative landscape:hidden h-[42svh] min-h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-[50%_12%]"
          style={{ backgroundImage: "url('/songdo/hero-junhyuk-m.jpg')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.55)_0%,rgba(5,8,7,0)_28%,rgba(5,8,7,0)_60%,#050807_100%)]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 portrait:-mt-10 portrait:pb-14 landscape:py-32">
        <div className="reveal max-w-3xl">
          <div className="inline-flex items-center rounded-md grad-fill px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
            <span className="font-display text-sm sm:text-lg font-bold text-[#07140c]">
              10.29 송도 오프라인 설명회
            </span>
          </div>

          <h1 className="font-display mt-5 sm:mt-7 text-[2.5rem] leading-[1.14] sm:text-6xl md:text-7xl [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
            <span className="block text-white">원장님 없는 학원에서,</span>
            <span className="block text-gradient">학원 평판이 정해집니다.</span>
          </h1>

          <p className="mt-5 sm:mt-7 text-base sm:text-xl text-white/75 leading-relaxed max-w-xl">
            그래서 봐야 할 2가지,<br className="hidden sm:block" /> 10월 29일 <span className="whitespace-nowrap">송도 오프라인 설명회에서</span> 직접 확인하세요.
          </p>

          <div className="mt-8 sm:mt-10 space-y-2.5 text-base sm:text-lg text-white/80">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline gap-3">
                <span className="shrink-0 text-xs sm:text-sm tracking-[0.2em] text-[var(--accent-text)]/80 w-12 sm:w-14">
                  {r.label}
                </span>
                <span className="font-semibold text-white">
                  <span className="whitespace-nowrap">{r.main}</span>{" "}
                  <span className={"font-normal text-white/65" + (r.nowrap ? " whitespace-nowrap" : "")}>{r.sub}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9 sm:mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href="#register"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full grad-fill font-bold text-sm sm:text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.99]"
            >
              무료 참석 신청하기
            </a>
            <a
              href="#points"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm sm:text-base hover:border-white/40 hover:bg-white/5 active:scale-[0.99] transition-all"
            >
              확인하실 2가지 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

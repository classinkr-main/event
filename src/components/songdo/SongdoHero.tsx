export default function SongdoHero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-6 sm:pb-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center reveal">
        <p className="text-base sm:text-xl font-semibold text-[var(--accent-from)]">
          10.29 송도 오프라인 설명회
        </p>
        <h1 className="font-display mt-3 sm:mt-4 text-[2.6rem] leading-[1.08] sm:text-6xl md:text-[5.25rem] text-[var(--ink)]">
          원장님 없는 학원에서,
          <br />
          <span className="text-[var(--accent-from)]">학원 평판이 정해집니다.</span>
        </h1>
        <p className="mt-5 sm:mt-7 text-lg sm:text-2xl text-[var(--ink-2)] leading-relaxed max-w-2xl mx-auto">
          그래서 봐야 할 2가지, 10월 29일 송도 오프라인 설명회에서 직접 확인하세요.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
          <a href="#register" className="btn bg-[var(--accent-from)] text-[#07140c] px-7 py-3.5 text-base sm:text-lg">
            무료 참석 신청하기
          </a>
          <a href="#points" className="link text-base sm:text-lg">
            확인하실 주제 보기 ›
          </a>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 max-w-6xl mx-auto px-6">
        <div className="relative rounded-[28px] overflow-hidden aspect-[16/10] sm:aspect-[21/10]">
          <div
            className="absolute inset-0 bg-cover bg-[50%_35%]"
            style={{ backgroundImage: "url('/songdo/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute left-5 bottom-5 sm:left-8 sm:bottom-7 text-sm sm:text-base text-white/80">
            클래스인 스마트교실 시연 현장
          </div>
        </div>
      </div>
    </section>
  );
}

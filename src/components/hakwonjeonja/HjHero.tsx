import Tilt3D from "./fx/Tilt3D";

const highlights = ["첫 2주 무료", "회원사 10% 혜택", "86″ 패키지 특별 할인"];

export default function HjHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* 배경: 은은한 초록 글로우 + 아주 옅은 원근 바닥 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[130vw] max-w-[1200px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(47,212,122,0.16),rgba(47,212,122,0.04)_40%,transparent_68%)] blur-2xl" />
        <div className="hero-grid hidden sm:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050807]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-20 sm:pt-36 sm:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2.5 mb-6 sm:mb-8 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)]" />
              <span className="text-xs sm:text-sm text-white/80 font-medium">
                학원전자 회원사 · 공동구매 특별 혜택
              </span>
            </div>

            <p className="text-base sm:text-2xl md:text-3xl text-white/80 font-light tracking-tight mb-3 sm:mb-4">
              교실 + 온라인, 하나의 수업
            </p>

            <h1 className="font-bold tracking-tight leading-[1.06]">
              <span className="block text-[2.5rem] sm:text-6xl md:text-7xl">
                전자칠판 다음은,
              </span>
              <span className="block text-[2.5rem] sm:text-6xl md:text-7xl">
                <span className="text-gradient">스마트교실</span>입니다
              </span>
            </h1>

            <p className="mt-5 sm:mt-8 text-lg sm:text-2xl text-white/75 leading-snug max-w-xl font-medium">
              교실 학생과 온라인 학생이 한 수업을 실시간으로.
              <br />
              녹화·보강·채점은 ClassIn이 합니다.
            </p>

            <div className="mt-6 sm:mt-9 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm text-white/80"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-from)]">
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-8 sm:mt-11 flex flex-col sm:flex-row gap-3">
              <a
                href="#consult"
                className="press inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm sm:text-base hover:bg-white/90 hover:scale-[1.02]"
              >
                상담 신청하기
              </a>
              <a
                href="#offer"
                className="press inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm sm:text-base hover:border-white/40 hover:bg-white/5"
              >
                공구 혜택 보기
              </a>
            </div>
          </div>

          {/* 3D 스마트보드: 마우스 틸트(데스크톱) + 부유 회전 + 바닥 반사 + 하이브리드 수업 플로팅 카드 */}
          <div className="reveal relative mx-auto w-full max-w-[320px] sm:max-w-[440px] lg:max-w-none [perspective:1400px]">
            {/* LIVE: 교실 + 온라인 동시 수강 */}
            <div className="float-card absolute z-20 left-[-5%] sm:left-[-9%] top-[-5%] sm:top-[-3%]">
              <div className="rounded-2xl border border-white/15 bg-[#0b1410]/95 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-white/85">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-red-500 opacity-70 animate-ping" />
                    <span className="relative w-2 h-2 rounded-full bg-red-500" />
                  </span>
                  LIVE · 실시간 하이브리드 수업
                </div>
                <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["김", "이", "박", "최"].map((n, i) => (
                      <span
                        key={n}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#0b1410] text-[9px] sm:text-[10px] font-bold text-[#050807] flex items-center justify-center ${
                          ["bg-[#8ee8b5]", "bg-[#c8f27a]", "bg-[#7dd3fc]", "bg-[#fcd34d]"][i]
                        }`}
                      >
                        {n}
                      </span>
                    ))}
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#0b1410] bg-white/15 text-[9px] sm:text-[10px] font-semibold text-white/80 flex items-center justify-center">
                      +8
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-sm text-white/75 whitespace-nowrap">
                    교실 18명 <span className="text-white/40">+</span> 온라인 12명
                  </span>
                </div>
              </div>
            </div>
            {/* 자동 녹화 → 다시보기 */}
            <div className="float-card-2 absolute z-20 right-[-4%] sm:right-[-7%] bottom-[16%] sm:bottom-[18%]">
              <div className="rounded-2xl border border-white/15 bg-[#0b1410]/95 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-white/85">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-from)]" />
                  자동 녹화 중
                </div>
                <div className="mt-1 text-[11px] sm:text-sm text-white/65 whitespace-nowrap">
                  판서·영상이 다시보기로 저장
                </div>
              </div>
            </div>
            <div className="floor-shadow absolute inset-x-[12%] bottom-[4%] h-[16%] rounded-[50%] bg-[var(--accent-from)]/25 blur-3xl" />
            <Tilt3D max={9} glare={false} className="w-full">
              <div className="float-3d">
                <img
                  src="/hakwonjeonja/board.png"
                  alt="ClassIn AI 스마트보드 86인치 전자칠판"
                  width={900}
                  height={910}
                  fetchPriority="high"
                  className="reflect-below relative w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
                />
              </div>
            </Tilt3D>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] sm:text-xs tracking-[0.3em] float-slow">
        SCROLL
      </div>
    </section>
  );
}

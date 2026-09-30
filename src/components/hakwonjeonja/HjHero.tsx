import Tilt3D from "./fx/Tilt3D";

const highlights = ["첫 2주 무료", "구독료·충전금 10% 혜택", "86″ 패키지 최대 80만원 인하"];

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
              수업이 기록으로 남는 교실
            </p>

            <h1 className="font-bold tracking-tight leading-[1.06]">
              <span className="block text-[2.5rem] sm:text-6xl md:text-7xl">
                전자칠판 다음은,
              </span>
              <span className="block text-[2.5rem] sm:text-6xl md:text-7xl">
                <span className="text-gradient">스마트교실</span>입니다
              </span>
            </h1>

            <p className="mt-5 sm:mt-8 text-[15px] sm:text-xl text-white/65 leading-relaxed max-w-xl">
              판서·영상·과제·성적이 자동으로 쌓여 보강과 리포트, 채점까지 이어집니다.
              학원전자 회원사는 함께 구매해 더 낮은 가격으로, 첫 2주는 무료로 시작합니다.
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

          {/* 3D 스마트보드: 마우스 틸트(데스크톱) + 부유 회전 + 바닥 반사 */}
          <div className="reveal relative mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:max-w-none [perspective:1400px]">
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

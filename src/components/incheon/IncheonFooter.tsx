export default function IncheonFooter() {
  return (
    <footer className="relative border-t border-white/5 py-10 sm:py-16 pb-28 sm:pb-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm tracking-[0.3em] text-white/40 mb-2">
              CLASSIN MEETS · SONGDO · CHEONGNA
            </div>
            <div className="text-sm sm:text-base font-medium text-white/80">
              송도·청라 지역 학원장 설명회
            </div>
          </div>
          <div className="text-[11px] sm:text-xs text-white/40 text-center sm:text-right leading-relaxed">
            © 2026 Classin. All rights reserved.
            <br />
            본 페이지는 인천 송도·청라 지역 학원장 대상 설명회 안내입니다.
          </div>
        </div>
      </div>
    </footer>
  );
}

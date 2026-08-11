export default function SeoulFooter() {
  return (
    <footer className="relative border-t border-white/5 py-10 sm:py-16 pb-28 sm:pb-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm tracking-[0.3em] text-white/40 mb-2">
              CLASSIN MEETS · SEOUL · MOKDONG
            </div>
            <div className="text-sm sm:text-base font-medium text-white/80">
              학원 원장님 대상 오프라인 세미나
            </div>
            <div className="mt-2 text-[11px] sm:text-xs text-white/40 leading-relaxed">
              02-6958-8566 · 서울 양천구 목동동로 233-1 806호 · www.classin.co.kr
            </div>
          </div>
          <div className="text-[11px] sm:text-xs text-white/40 text-center sm:text-right leading-relaxed">
            © 2026 Classin. All rights reserved.
            <br />
            본 페이지는 학원 원장님 대상 세미나 안내입니다.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function BjFooter() {
  return (
    <footer className="relative border-t border-white/5 py-10 sm:py-16 pb-28 sm:pb-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm tracking-[0.3em] text-white/40 mb-2">
              CLASSIN MEETS · BEIJING · 2026. 11. 24 – 27
            </div>
            <div className="text-sm sm:text-base font-medium text-white/80">
              초청 학원 원장님 대상 베이징 탐방
            </div>
            <div className="mt-2 text-[11px] sm:text-xs text-white/40 leading-relaxed">
              ClassIn Korea · 02-6958-8566 · 서울 양천구 목동동로 233-1 806호 · www.classin.co.kr
            </div>
          </div>
          <div className="text-[11px] sm:text-xs text-white/40 text-center sm:text-right leading-relaxed">
            © 2026 ClassIn. All rights reserved.
            <br />
            ClassIn 본사 초안 기준이며 세부 일정·연사는 최종안에 따라 바뀔 수 있습니다.
            <br />
            <span className="text-white/25">Photo: Morio, Wikimedia Commons (CC BY-SA 4.0)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

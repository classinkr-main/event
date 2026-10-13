export default function BjFooter() {
  return (
    <footer className="relative border-t border-[var(--bj-line)] py-10 sm:py-14 pb-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end">
        <div>
          <div className="mono text-[10px] text-[var(--ink-3)]">CLASSIN MEETS · BEIJING · 2026. 11. 24 – 27</div>
          <div className="serif mt-2 text-lg sm:text-xl">초청 학원 원장님 대상 베이징 탐방</div>
          <div className="mt-2 text-[11px] sm:text-xs text-[var(--ink-3)] leading-relaxed">
            ClassIn Korea · 02-6958-8566 · 서울 양천구 목동동로 233-1 806호 · www.classin.co.kr
          </div>
        </div>
        <div className="text-[11px] sm:text-xs text-[var(--ink-3)] sm:text-right leading-relaxed">
          © 2026 ClassIn. All rights reserved.
          <br />
          ClassIn 본사 초안 기준이며 세부 일정·연사는 최종안에 따라 바뀔 수 있습니다.
          <br />
          <span className="opacity-60">Photo: Morio, Wikimedia Commons (CC BY-SA 4.0)</span>
        </div>
      </div>
    </footer>
  );
}

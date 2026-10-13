export default function BjFooter() {
  return (
    <footer className="relative border-t border-[var(--night-line)] py-10 sm:py-14 pb-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end text-[12px] sm:text-[13px] leading-relaxed text-[var(--snow-3)]">
        <div>
          <div className="font-bold tracking-tight text-base text-[var(--snow)]">
            ClassIn <span className="serif font-medium">Meets</span> Beijing
          </div>
          <div className="mt-2">ClassIn Korea, 02-6958-8566, 서울 양천구 목동동로 233-1 806호, www.classin.co.kr</div>
        </div>
        <div className="sm:text-right">
          © 2026 ClassIn. ClassIn 본사 초안 기준이며 세부 일정과 연사는 최종안에 따라 바뀔 수 있습니다.
          <br />
          <span className="opacity-70">Photo: Morio, Wikimedia Commons (CC BY-SA 4.0)</span>
        </div>
      </div>
    </footer>
  );
}

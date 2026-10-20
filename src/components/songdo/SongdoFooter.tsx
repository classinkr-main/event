export default function SongdoFooter() {
  return (
    <footer className="relative border-t border-white/10 py-10 sm:py-12 pb-28 sm:pb-12">
      <div className="max-w-6xl mx-auto px-6 text-sm text-[var(--ink-3)] leading-relaxed">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[var(--ink-2)] font-semibold">ClassIn Meets Songdo</span> · 학원 원장님 대상 오프라인 설명회
          </div>
          <div>02-6958-8566 · 서울 양천구 목동동로 233-1 806호 · www.classin.co.kr</div>
        </div>
        <div className="mt-3">© 2026 ClassIn. All rights reserved.</div>
      </div>
    </footer>
  );
}

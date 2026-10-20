const points = [
  {
    n: "밤 시간 매출",
    q: "비어 있는 밤 시간, 매출로 바꿀 수 있을까요?",
    d: "학원 문을 닫은 뒤에도 반을 하나 더 여는 방법",
  },
  {
    n: "수업 품질 관리",
    q: "우리 학원 선생님들, 수업 잘하고 있을까요?",
    d: "원장님이 교실에 들어가지 않아도 반마다 수업의 질을 아는 방법",
  },
];

export default function SongdoPoints() {
  return (
    <section id="points" className="relative py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="flex items-center gap-4 text-xs sm:text-sm tracking-[0.18em] text-[var(--accent-from)] font-bold">
          <span>오프라인 설명회에서 직접 확인하실 두 가지 주제</span>
          <span className="flex-1 h-px bg-gradient-to-r from-[var(--accent-from)]/60 to-transparent" />
        </div>

        <ul className="mt-2 divide-y divide-white/10">
          {points.map((p) => (
            <li key={p.n} className="py-7 sm:py-9">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-block text-sm sm:text-base font-bold text-[#07140c] grad-fill rounded-full px-3 py-1">
                  {p.n}
                </span>
                <span className="shrink-0 mt-1 text-[11px] sm:text-xs font-bold tracking-wide text-[#8fe3ae] border border-[var(--accent-from)]/45 rounded px-2 py-1">
                  현장 공개
                </span>
              </div>
              <h3 className="font-display mt-4 text-2xl sm:text-4xl font-bold leading-snug text-white">{p.q}</h3>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg text-white/60">{p.d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 panel-cta px-6 py-5 sm:px-8 sm:py-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-base sm:text-lg font-bold">10월 29일 (목),</span>
          <span className="font-display text-lg sm:text-2xl font-bold">
            송도 오프라인 설명회에서 답을 확인하세요.
          </span>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-sm sm:text-base text-white/70">
          <p>
            지난 7월 송도 1차 설명회 참석 학원{" "}
            <b className="text-white font-bold">10곳 중 7곳</b>이 현장에서 도입을 확약했습니다.
          </p>
          <span className="self-start sm:self-auto shrink-0 text-xs sm:text-sm font-bold text-[var(--accent-from)] border border-[var(--accent-from)] rounded px-3 py-1.5">
            설명회 참석자 한정 프로모션 혜택
          </span>
        </div>
      </div>
    </section>
  );
}

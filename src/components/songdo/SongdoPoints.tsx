const topics = [
  { tag: "밤 시간 매출", q: "비어 있는 밤 시간, 매출로 바꿀 수 있을까요?", d: "학원 문을 닫은 뒤에도 반을 하나 더 여는 방법" },
  { tag: "수업 품질 관리", q: "우리 학원 선생님들, 수업 잘하고 있을까요?", d: "원장님이 교실에 들어가지 않아도 반마다 수업의 질을 아는 방법" },
];

export default function SongdoPoints() {
  return (
    <section id="points" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.1] text-[var(--ink)]">
            설명회에서 직접 확인하세요.
          </h2>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-[var(--ink-2)]">두 가지 주제, 답은 현장에서 공개합니다.</p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {topics.map((t) => (
            <div key={t.tag} className="tile p-7 sm:p-10">
              <div className="text-sm sm:text-base font-semibold text-[var(--accent-from)]">{t.tag}</div>
              <h3 className="font-display mt-4 sm:mt-5 text-2xl sm:text-[2.1rem] leading-[1.25] text-[var(--ink)]">{t.q}</h3>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[var(--ink-2)] leading-relaxed">{t.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 sm:mt-5 tile p-7 sm:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="font-display text-5xl sm:text-6xl text-[var(--ink)] shrink-0">
            10곳 중 <span className="text-[var(--accent-from)]">7곳</span>
          </div>
          <div>
            <p className="text-lg sm:text-xl text-[var(--ink)]">지난 7월 송도 1차 설명회 참석 학원 10곳 중 7곳이 현장에서 도입을 확약했습니다.</p>
            <p className="mt-2 text-base sm:text-lg text-[var(--ink-2)]">설명회 참석자 한정 프로모션 혜택이 현장에서 안내됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

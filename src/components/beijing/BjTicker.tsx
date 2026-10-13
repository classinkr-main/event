const items = [
  "GET 2026 교육기술 대회",
  "ClassIn 베이징 본사",
  "쉐팡교육 学方",
  "샹량교육 向量教育",
  "신동방 국제교육 新东方",
  "충칭 훠광교육 火光教育",
  "리루이 李睿",
  "베이징 협력 대학",
  "한국 정율사관",
];

/** 흐르는 띠 — 만나는 곳들을 한 줄로 */
export default function BjTicker() {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-[var(--bj-line)] py-3.5 overflow-hidden" aria-hidden>
      <div className="bj-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 whitespace-nowrap">
            <span className="serif text-sm sm:text-base text-[var(--ink-2)]">{t}</span>
            <span className="w-1.5 h-1.5 bg-[var(--bj-red)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

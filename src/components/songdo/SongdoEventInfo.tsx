const MAP_URL = "https://map.naver.com/p/search/" + encodeURIComponent("엔에스 수능관학원");

const items = [
  { label: "일시", main: "2026.10.29 (목)", sub: "오전 11시 – 오후 1시 · 무료 참석" },
  { label: "장소", main: "엔에스 수능관학원", sub: "인천 연수구 해돋이로 160-14 5층 504호", link: { href: MAP_URL, text: "네이버 지도에서 보기 ›", external: true } },
  { label: "문의", main: "010-5911-8522", sub: "클래스인 신희성", link: { href: "tel:010-5911-8522", text: "전화 걸기 ›", external: false } },
];

export default function SongdoEventInfo() {
  return (
    <section id="event" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.1] text-[var(--ink)]">송도에서 만납니다.</h2>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-[var(--ink-2)]">
            클래스인을 실제로 도입한 학원 현장에서 진행됩니다.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it) => (
            <div key={it.label} className="tile p-7 sm:p-9">
              <div className="text-sm sm:text-base font-semibold text-[var(--accent-from)]">{it.label}</div>
              <div className="font-display mt-3 text-2xl sm:text-[1.75rem] leading-snug text-[var(--ink)]">{it.main}</div>
              <div className="mt-2 text-base sm:text-lg text-[var(--ink-2)] leading-relaxed">{it.sub}</div>
              {it.link && (
                <a
                  href={it.link.href}
                  className="link mt-4 inline-block text-base"
                  {...(it.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {it.link.text}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import SectionHead from "@/components/hakwonjeonja/SectionHead";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";

const items = [
  {
    when: "11 / 25 (수)",
    title: "GET 대회",
    sub: "중국 교육기술 연례 행사",
    desc: "메인 포럼과 ClassIn「AI 신교육」특별 세션, 전시 부스까지 하루를 통째로 봅니다.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 11a7 7 0 0014 0M12 18v3M8.5 21h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    when: "11 / 26 (목)",
    title: "ClassIn 본사",
    sub: "AI 제품 방향, 직접 대화",
    desc: "CTO가 말하는 AI 시대 제품 로드맵. 두 창업자의 사례 발표와 초청 만찬이 이어집니다.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 9h4a1 1 0 011 1v11M4 21h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 8h2M7.5 12h2M7.5 16h2M11 8h1M11 12h1M11 16h1M18 13h.5M18 17h.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    when: "11 / 26 – 27",
    title: "현지 방문",
    sub: "베이징 학원 · 대학",
    desc: "1:1 맞춤 지도로 이름난 베이징 학원 쉐팡교육, 그리고 ClassIn 협력 대학을 찾아갑니다.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M2.5 9.5L12 4l9.5 5.5L12 15 2.5 9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6 12v4.5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5V12M21.5 9.5V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function BjGlance() {
  return (
    <section id="glance" className="relative py-20 sm:py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="AT A GLANCE"
          title={
            <>
              3일, <span className="text-gradient">세 개의 장면.</span>
            </>
          }
          lead="GET 대회, ClassIn 본사, 베이징 현장. 한국·중국 학원들이 AI로 수업과 운영을 어떻게 바꾸고 있는지 하루씩 봅니다."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90} className="h-full">
              <div className="glass rounded-3xl p-6 sm:p-8 h-full hover:bg-white/[0.06] transition-all">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center text-[var(--accent-from)]">
                    {it.icon}
                  </div>
                  <span className="text-[11px] sm:text-xs tracking-[0.2em] text-white/50">
                    {it.when}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight">{it.title}</h3>
                <p className="mt-1 text-base sm:text-lg text-white/60">{it.sub}</p>
                <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-white/70">
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

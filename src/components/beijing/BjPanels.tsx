import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import BjHead from "./BjHead";

const panels = [
  {
    no: "01",
    when: "11.25 (수)",
    title: "GET 대회",
    sub: "중국 교육기술 연례 행사",
    desc: "메인 포럼, ClassIn 부스 점심, 오후 「AI 신교육」 특별 세션, 저녁 교류 만찬까지 하루를 통째로 봅니다.",
  },
  {
    no: "02",
    when: "11.26 (목)",
    title: "ClassIn 본사",
    sub: "AI 제품 방향, 직접 대화",
    desc: "CTO가 말하는 AI 시대 제품 로드맵. 샹량교육 창업자와 리루이의 사례 발표, 초청 만찬이 이어집니다.",
  },
  {
    no: "03",
    when: "11.26 – 27",
    title: "현지 방문",
    sub: "베이징 학원 · 대학",
    desc: "1:1 맞춤 지도로 이름난 쉐팡교육, 그리고 ClassIn 협력 대학을 찾아갑니다.",
  },
];

/** 한눈에 보기 — 마우스를 올리면 넓어지는 세 패널 */
export default function BjPanels() {
  return (
    <section id="glance" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <BjHead
          no="01"
          eyebrow="AT A GLANCE"
          title={
            <>
              3일, <span className="text-[var(--bj-red)]">세 개의 장면.</span>
            </>
          }
          lead="GET 대회, ClassIn 본사, 베이징 현장. 한국·중국 학원들이 AI로 수업과 운영을 어떻게 바꾸고 있는지 하루씩 봅니다."
        />

        <Reveal>
          <div className="bj-panels flex flex-col md:flex-row border border-[var(--bj-line)] divide-y md:divide-y-0 md:divide-x divide-[var(--bj-line)]">
            {panels.map((p) => (
              <div key={p.no} className="bj-panel group relative flex-1 min-w-0 p-6 sm:p-8 md:p-9 md:min-h-[380px] flex flex-col justify-between hover:bg-[rgba(242,237,227,0.03)]">
                <div className="flex items-start justify-between gap-4">
                  <span className="serif text-5xl sm:text-6xl font-semibold leading-none text-[var(--ink-3)] group-hover:text-[var(--bj-red)] transition-colors">
                    {p.no}
                  </span>
                  <span className="mono text-[10px] text-[var(--ink-3)] pt-2">{p.when}</span>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="serif text-2xl sm:text-3xl font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[var(--ink-2)]">{p.sub}</p>
                  <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[var(--ink-2)] md:max-h-0 md:opacity-0 md:overflow-hidden md:group-hover:max-h-40 md:group-hover:opacity-100 transition-all duration-500">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

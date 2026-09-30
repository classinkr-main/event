import SectionHead from "./SectionHead";
import Reveal from "./fx/Reveal";
import Tilt3D from "./fx/Tilt3D";

const parts = [
  { img: "/hakwonjeonja/board.png", title: "ClassIn AI 스마트보드", sub: "86″ 전자칠판", fit: "contain" },
  { img: "/hakwonjeonja/cam.png", title: "AI 카메라", sub: "수업 자동 녹화", fit: "contain" },
  { img: "/hakwonjeonja/sw.jpg", title: "ClassIn 소프트웨어", sub: "녹화 · 과제 · 성적 · LMS", fit: "cover" },
];

const installs = [
  { img: "/hakwonjeonja/inst1.jpg", caption: "고등학교 교실" },
  { img: "/hakwonjeonja/inst2.jpg", caption: "대학 강의실" },
  { img: "/hakwonjeonja/inst3.jpg", caption: "학원 강의실 · 2대 구성" },
];

const uses = [
  { img: "/hakwonjeonja/use1.jpg", caption: "수학 학원 판서 수업" },
  { img: "/hakwonjeonja/use2.jpg", caption: "대형 강의실 2대 수업" },
  { img: "/hakwonjeonja/use3.jpg", caption: "앱 화면 활용 수업" },
];

function PhotoRow({ label, items }: { label: string; items: { img: string; caption: string }[] }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4 sm:mb-5">
        <p className="text-sm sm:text-base text-white/50 tracking-[0.2em] shrink-0">{label}</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {items.map((it, i) => (
          <Reveal key={it.img} delay={i * 100}>
            <figure className="group">
              <Tilt3D max={6} className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]">
                <img
                  src={it.img}
                  alt={it.caption}
                  width={900}
                  height={559}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </Tilt3D>
              <figcaption className="mt-2 text-center text-xs sm:text-sm text-white/55">
                {it.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function HjSetup() {
  return (
    <section id="setup" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="SETUP & CASES"
          title={
            <>
              구성은 이렇게,
              <br />
              교실은 이미 쓰고 있습니다.
            </>
          }
          lead="스마트보드 + AI 카메라 + ClassIn, 한 세트로 설치됩니다."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-stretch">
          {parts.map((p, i) => (
            <Reveal key={p.title} delay={i * 110} className="relative h-full">
              {i > 0 && (
                <span className="absolute z-20 left-1/2 -top-[22px] -translate-x-1/2 sm:left-[-22px] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 w-7 h-7 rounded-full bg-[#050807] border border-white/10 flex items-center justify-center text-white/70 text-base font-bold">
                  +
                </span>
              )}
              <Tilt3D max={8} className="glass h-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center hover:bg-white/[0.06]">
                <div className="h-36 sm:h-44 flex items-center justify-center rounded-xl overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className={p.fit === "cover" ? "w-full h-full object-cover rounded-xl" : "max-h-full w-auto object-contain"}
                  />
                </div>
                <div className="mt-4 text-lg sm:text-xl font-bold tracking-tight">{p.title}</div>
                <div className="mt-1 text-sm text-white/50">{p.sub}</div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-12">
          <PhotoRow label="설치 사례" items={installs} />
          <PhotoRow label="활용 사례" items={uses} />
        </div>
      </div>
    </section>
  );
}

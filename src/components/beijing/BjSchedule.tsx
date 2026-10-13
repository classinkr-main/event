import SectionHead from "@/components/hakwonjeonja/SectionHead";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";

type Item = { time: string; title: string; sub?: string; href?: string };
type Day = {
  date: string;
  weekday: string;
  label: string;
  tag?: string;
  items: Item[];
};

const days: Day[] = [
  {
    date: "11 / 24",
    weekday: "화",
    label: "도착",
    items: [
      {
        time: "저녁 ~",
        title: "베이징 순차 도착, 호텔 체크인",
        sub: "11/25 (수) 오후 1시 전까지 도착하시면 됩니다",
      },
    ],
  },
  {
    date: "11 / 25",
    weekday: "수",
    label: "GET 대회",
    tag: "GET 대회",
    items: [
      {
        time: "오전",
        title: "GET 대회 메인 포럼",
        sub: "베이징 신윈난 크라운플라자 호텔 (北京新云南皇冠假日酒店)",
      },
      { time: "점심", title: "ClassIn 부스 점심" },
      {
        time: "오후",
        title: "ClassIn「AI 신교육」특별 세션",
        sub: "한국·중국 학원 4곳 발표 · 아래 특별 세션 참조",
        href: "#session",
      },
      { time: "저녁", title: "교류 만찬" },
    ],
  },
  {
    date: "11 / 26",
    weekday: "목",
    label: "방문 · 본사",
    tag: "ClassIn 본사",
    items: [
      {
        time: "오전",
        title: "쉐팡교육(学方) 방문",
        sub: "베이징 개인 맞춤형 학원",
      },
      {
        time: "14:00",
        title: "ClassIn CTO · AI 시대 제품 로드맵",
        sub: "ClassIn 베이징 본사",
      },
      {
        time: "15:00",
        title: "AI 슈퍼 강좌로 수강생 0명에서 1만 명까지",
        sub: "샹량교육(向量教育)",
      },
      {
        time: "16:00",
        title: "AI는 어떻게 학원의 ‘본사’를 없앴나",
        sub: "리루이(李睿)",
      },
      { time: "19:00", title: "초청 만찬" },
    ],
  },
  {
    date: "11 / 27",
    weekday: "금",
    label: "대학 · 귀국",
    items: [
      {
        time: "오전",
        title: "베이징 협력 대학 방문",
        sub: "산학 협력 · 인재 양성 교류 (학교명은 최종안에서 확정)",
      },
      { time: "오후", title: "귀국" },
    ],
  },
];

export default function BjSchedule() {
  return (
    <section id="schedule" className="relative py-20 sm:py-32 md:py-40">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="ITINERARY"
          title="11월 24일부터 27일까지."
          lead="첫날 저녁 도착해 대회, 본사, 현장을 하루씩 보고 넷째 날 오후에 귀국합니다."
        />

        <div className="space-y-4 sm:space-y-5">
          {days.map((d, i) => (
            <Reveal key={d.date} delay={i * 70}>
              <div
                className={`${
                  d.tag ? "glass-strong" : "glass"
                } rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/[0.06] transition-all`}
              >
                <div className="flex flex-col sm:flex-row sm:gap-10">
                  <div className="shrink-0 sm:w-40 mb-5 sm:mb-0">
                    <div className="flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1">
                      <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                        {d.date}
                      </div>
                      <div className="text-sm sm:text-base text-white/50">({d.weekday})</div>
                    </div>
                    <div className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-white/85">
                      {d.label}
                    </div>
                    {d.tag && (
                      <span className="mt-3 inline-block text-[10px] sm:text-[11px] tracking-[0.22em] px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white">
                        {d.tag.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <ol className="flex-1 min-w-0 divide-y divide-white/5">
                    {d.items.map((it) => {
                      const body = (
                        <>
                          <span className="shrink-0 w-14 sm:w-16 pt-0.5 text-xs sm:text-sm tracking-[0.12em] text-white/45 tabular-nums">
                            {it.time}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-base sm:text-xl font-semibold leading-snug">
                              {it.title}
                            </span>
                            {it.sub && (
                              <span className="mt-1 block text-sm sm:text-base text-white/55 leading-relaxed">
                                {it.sub}
                              </span>
                            )}
                          </span>
                        </>
                      );
                      return (
                        <li key={it.time + it.title} className="py-3.5 first:pt-0 last:pb-0">
                          {it.href ? (
                            <a
                              href={it.href}
                              className="group flex items-start gap-3 sm:gap-4 rounded-xl -mx-2 px-2 py-1 hover:bg-white/[0.05] transition-colors"
                            >
                              {body}
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="mt-1.5 shrink-0 text-white/35 group-hover:text-white group-hover:translate-y-0.5 transition-all"
                                aria-hidden
                              >
                                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          ) : (
                            <div className="flex items-start gap-3 sm:gap-4 px-0 py-1">{body}</div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-6 sm:mt-10">
          <div className="max-w-2xl mx-auto glass rounded-2xl px-5 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-2 text-white/80 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-from)]" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 8v4.5l3 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-medium">일정 안내</span>
            </div>
            <p className="text-sm sm:text-base text-white/60">
              ClassIn 본사 초안 기준입니다. 세부 일정과 연사는 최종안에 따라 바뀔 수 있으며, 확정되는 대로 신청하신 분께 개별 안내드립니다.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

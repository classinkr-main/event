import SectionHead from "@/components/hakwonjeonja/SectionHead";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";

type Person = {
  glyph: string;
  name: string;
  cn?: string;
  when: string;
  summary: string;
  rows: [string, string][];
};

const people: Person[] = [
  {
    glyph: "정",
    name: "한국 정율사관",
    when: "11/25 세션 1 발표",
    summary: "한국 학원. 2023년 ClassIn 도입 후 전 캠퍼스 스마트교실 전환, SBS 보도",
    rows: [
      ["개요", "한국 학원, 설립 약 20년"],
      ["전환", "2023년 ClassIn 도입 후 전 캠퍼스 스마트교실로 전환"],
      ["특징", "BYOD 수업에 AI 수업 분석을 더해 운영"],
      ["평가", "한국 학원가에서 영향력이 크며 SBS 특집 보도"],
      ["발표", "한국의 스마트 수업 현장, 상호작용 수업, AI 보조 수업 사례를 GET 대회에서 공유"],
    ],
  },
  {
    glyph: "新",
    name: "신동방 국제교육",
    cn: "新东方国际教育",
    when: "11/25 세션 3 발표",
    summary: "중국 최대 교육그룹 신동방의 국제교육 부문. 47개 도시 운영",
    rows: [
      ["개요", "중국 최대 교육그룹 신동방의 핵심 사업부. 1993년 베이징 신동방 해외시험부에서 출발, 2020년 11월 국제교육 부문으로 개편"],
      ["규모", "유아부터 성인까지 전 연령 국제교육, 47개 도시 운영"],
      ["과정", "유학 시험(IELTS·TOEFL·SAT/ACT), 국제학교 입시, AP·A-Level·IB 등 국제 교과, 대학 예비과정"],
    ],
  },
  {
    glyph: "火",
    name: "충칭 훠광교육",
    cn: "火光教育 · 火光课堂",
    when: "11/25 세션 4 발표",
    summary: "2020년 설립 충칭 지역 1위권 이과 학원. 누적 수강생 14만 명+",
    rows: [
      ["개요", "2020년 6월 설립, 충칭 지역 대표 심화 학원. 2025년 말까지 누적 수강생 14만 명+"],
      ["대상", "충칭 지역 초·중·고 이과(수학·물리·화학) 심화"],
      ["과정", "K12 이과 전 과정, A3~A7 수준별 반 편성"],
      ["성과", "중학교 진학 합격률 90%+, 명문 고교 합격률 75%+, 최근 3년 경시반 우수"],
      ["발표", "「지역 학원의 전자칠판 돌파 전략: 상호작용과 입소문」. 지역 학원이 BYOD와 AI 수업으로 성장한 이야기"],
    ],
  },
  {
    glyph: "學",
    name: "쉐팡교육",
    cn: "学方",
    when: "11/26 오전 방문",
    summary: "2010년 설립 베이징 학원. 초·중·고 전 과목, 1:1 맞춤 지도와 소수 정예반. 전임 교사 100명+",
    rows: [
      ["개요", "2010년 설립, 베이징 토종 학원 브랜드. 누적 수강생 수만 명"],
      ["대상", "초·중·고 전 과목 내신 심화와 보충. 중·고 입시 막판 대비, 1:1 맞춤 지도로 이름이 높음"],
      ["캠퍼스", "베이징 하이뎬·차오양·시청·창핑·둥청 등 핵심 지역. 온라인·오프라인 동시 수업"],
      ["과정", "1:1 맞춤 지도(방문 과외·종일반), 소수 정예반과 대형반, 입시 막판 대비·학년 전환 과정"],
      ["강사진", "전임 100명+, 협력 강사 300명+. 90% 이상 중국 명문대 출신, 일부는 입시 출제·채점 경력"],
      ["수업 방식", "입학 진단 → 취약점 분석 → 맞춤 계획. 「설명 → 연습 → 시험」 3단계와 학습 리포트·정기 테스트로 끝까지 관리"],
    ],
  },
  {
    glyph: "向",
    name: "샹량교육 · 다멍유+쓰웨이",
    cn: "向量教育 · 大萌优+思维",
    when: "11/26 15:00 발표",
    summary: "초등 수학 사고력 브랜드. 온라인 라이브 수업을 ClassIn으로 운영, 수강 완료율 약 73%(업계 평균 약 45%)",
    rows: [
      ["개요", "선전 소재, 초등(1~6학년) 수학 사고력 전문 브랜드"],
      ["창업자", "왕멍(王萌). 중국 최대 학원그룹 TAL 산하 쉐얼쓰(学而思)의 초등 수학 책임자 출신, 이 분야 15년+"],
      ["과정", "초등 수학을 12단계로 나눠 「교과 다지기 → 사고력 확장 → 경시 맛보기」 3층 구조. 반년 과정 약 25회"],
      ["수업", "온라인 라이브 + 오프라인 교재 병행. 온라인 수업을 ClassIn으로 안정적으로 운영"],
      ["관리", "주강사 + 조교팀 + 전담 담임(월 1회 학부모 회의) 「3교사 체제」"],
      ["성과", "더우인(중국판 틱톡) 수강 완료율 약 73%(업계 평균 약 45%). 2026년 6월 상표 등록, 「과정 + 교재 + 브랜드」 자산화"],
      ["발표", "「AI 슈퍼 강좌로 수강생 0명에서 1만 명까지」"],
    ],
  },
  {
    glyph: "李",
    name: "리루이",
    cn: "李睿",
    when: "11/26 16:00 발표",
    summary: "중국 최대 학원그룹 TAL(好未来) 교육상품 설계 총괄 출신. 지금은 AI 교육 창업",
    rows: [
      ["학력", "칭화대 법학 학사·석사"],
      ["경력", "TAL(쉐얼쓰) 교육상품 설계 총괄. 2010년 고화질 녹화 온라인 강의, 2015년 「라이브 2교사 대형반」 등 업계를 바꾼 두 세대 상품을 주도"],
      ["저서", "『产品之核(상품의 핵심)』, 중국 지식 콘텐츠 앱 ‘더다오(得到)’ 강좌 운영"],
      ["현재", "AI+교육 창업. 중국 유명 신년 강연 ‘시간의 친구’ 2026 사례로 선정"],
      ["발표", "「AI는 어떻게 학원의 ‘본사’를 없앴나」. AI로 학원 조직을 다시 짜는 이야기"],
    ],
  },
];

function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BjPeople() {
  return (
    <section id="people" className="relative py-20 sm:py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="WHO YOU’LL MEET"
          title="만나는 기관 · 연사"
          lead="세션과 방문에서 만나는 여섯 곳. 카드를 열면 기관과 연사 소개를 자세히 볼 수 있습니다."
        />

        <Reveal>
          <div className="glass-strong rounded-3xl p-6 sm:p-8 md:p-10 mb-4 sm:mb-5">
            <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-10">
              <div className="shrink-0">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-3.5 py-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-white">
                    OFFICIAL STAGE
                  </span>
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">GET 교육기술 대회</h3>
                <p className="mt-1 text-sm sm:text-base text-white/50">이번 방문의 공식 무대 · 11/25 (수)</p>
              </div>
              <p className="text-[15px] sm:text-lg leading-relaxed text-white/75 md:pt-1">
                중국 교육기술 분야의 연례 대표 행사입니다. AI 수업, 스마트 하드웨어, 온·오프라인 혼합 수업, 교육 디지털 전환을 다루며 교육기관·기술 기업·유통 파트너가 한자리에 모입니다. ClassIn은 이번 대회에서 「AI 신교육」 특별 세션을 열고 전시에도 참여합니다.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 90}>
              <details className="group glass rounded-3xl hover:bg-white/[0.06] transition-colors open:bg-white/[0.06]">
                <summary className="list-none cursor-pointer select-none p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-[1.5px] bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)]">
                      <div className="w-full h-full rounded-[14px] bg-[#0a1020] flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-white leading-none">{p.glyph}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">{p.name}</h3>
                          {p.cn && <div className="mt-0.5 text-sm text-white/45">{p.cn}</div>}
                        </div>
                        <Chevron />
                      </div>
                      <span className="mt-2.5 inline-block text-[10px] sm:text-[11px] tracking-[0.2em] rounded-full border border-white/15 px-2.5 py-1 text-white/60">
                        {p.when}
                      </span>
                      <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-white/70">{p.summary}</p>
                    </div>
                  </div>
                </summary>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <dl className="rounded-2xl border border-white/10 bg-white/[0.03] divide-y divide-white/5 overflow-hidden">
                    {p.rows.map(([label, value]) => (
                      <div key={label} className="flex items-start gap-4 px-4 sm:px-5 py-3">
                        <dt className="w-16 sm:w-20 shrink-0 text-xs sm:text-sm text-white/45 pt-0.5">{label}</dt>
                        <dd className="flex-1 text-sm sm:text-[15px] leading-relaxed text-white/85">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            </Reveal>
          ))}

          <Reveal delay={60}>
            <div className="glass rounded-3xl p-6 sm:p-8 h-full hover:bg-white/[0.06] transition-colors">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white/80 leading-none">大</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">베이징 협력 대학</h3>
                  <span className="mt-2.5 inline-block text-[10px] sm:text-[11px] tracking-[0.2em] rounded-full border border-white/15 px-2.5 py-1 text-white/60">
                    11/27 오전 방문
                  </span>
                  <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-white/70">
                    ClassIn과 협력 중인 베이징 소재 대학. 산학 협력과 인재 양성을 주제로 교류합니다. 학교명은 최종안에서 확정됩니다.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

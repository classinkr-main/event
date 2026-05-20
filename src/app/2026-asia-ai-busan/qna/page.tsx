import QnAForm from "./QnAForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "사전 질문 — 2026 Asia AI Education Forum Busan",
  description:
    "현장 Q&A와 발표 이후 네트워킹의 출발점이 될 사전 질문을 6명의 연사에게 미리 남겨주세요.",
};

export type Speaker = {
  slug: string;
  photo: string | null;
  initial: string;
  topic: string;
  topicSub?: string;
  nameMain: string;
  nameAux: string;
  role: string;
  pickValue: string;
};

export const SPEAKERS: Speaker[] = [
  {
    slug: "cho",
    photo: "/speakers/cho.png",
    initial: "조",
    topic: "AI 시대 교육기업의 경영전략",
    nameMain: "조규성",
    nameAux: "Cho Kyuseong",
    role: "과사람 교육기업 이사장",
    pickValue: "조규성 (과사람 교육기업)",
  },
  {
    slug: "kwak",
    photo: "/speakers/kwak.png",
    initial: "곽",
    topic: "학생이 설명할 때, 배움이 완성된다",
    topicSub: "AI · BYOD 시대, 교사는 메타인지를 깨우는 설계자가 된다",
    nameMain: "곽정율",
    nameAux: "Kwak Jungyoul",
    role: "정율사관학원 대표",
    pickValue: "곽정율 (정율사관학원)",
  },
  {
    slug: "he-qian",
    photo: "/speakers/cto.png",
    initial: "贺",
    topic: "기술은 어떻게 ‘전도·수업·해혹’을 재구성하는가",
    topicSub: "교육의 본질 × 구조적 모순 × 시스템적 해답",
    nameMain: "贺骞",
    nameAux: "허첸 · He Qian",
    role: "ClassIn CTO",
    pickValue: "허첸 He Qian (ClassIn)",
  },
  {
    slug: "xiong",
    photo: "/speakers/xiong.png",
    initial: "熊",
    topic: "교육 + 운영의 더블 루프 전략",
    topicSub: "표준화된 교무연구와 교사 육성 시스템으로 지속 성장 구조를 만들다",
    nameMain: "熊克中",
    nameAux: "웅극중 · Xiong Kezhong",
    role: "션전 블루스카이교육 부교장",
    pickValue: "웅극중 (션전 블루스카이교육)",
  },
  {
    slug: "zuo",
    photo: null,
    initial: "左",
    topic: "선도 교육기관의 실전 성장 전략",
    topicSub: "캠퍼스 표준화 운영과 스타 강사진 육성 가이드",
    nameMain: "左佑",
    nameAux: "저우유 · Zuo You",
    role: "항저우 A+ 심화교육 창립자",
    pickValue: "저우유 (항저우 A+ 심화교육)",
  },
  {
    slug: "ando",
    photo: "/speakers/ando.png",
    initial: "安",
    topic: "일본 사교육 시장의 현황과 다각화 발전 전략",
    topicSub: "AI 시대, 교육의 새로운 가능성",
    nameMain: "安藤 大作",
    nameAux: "안도 다이사쿠 · Ando Daisaku",
    role: "전국학습학원협회 회장 · 안도주쿠 대표이사",
    pickValue: "안도 다이사쿠 (전국학습학원협회)",
  },
];

export default function QnAPage() {
  return (
    <main className="relative">
      {/* Top bar — back link + eyebrow */}
      <div className="border-b border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 sm:h-16 flex items-center justify-between gap-4">
          <a
            href="/2026-asia-ai-busan"
            className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <span className="text-base leading-none group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            이벤트 페이지로
          </a>
          <span className="hidden sm:inline-block text-[11px] tracking-[0.3em] text-white/40 uppercase font-medium">
            Pre-stage · Busan 2026
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-12">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-4 sm:mb-5">
            PRE-STAGE QUESTIONS
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            연사에게 직접 듣는{" "}
            <span className="text-gradient">솔루션</span>
          </h1>
          <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
            현장 Q&amp;A 및 네트워킹을 위한 사전 설문
          </p>
        </div>
      </section>

      {/* Speaker lineup */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-8 sm:mb-12 text-center">
            SPEAKER LINEUP
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 sm:gap-y-12">
            {SPEAKERS.map((s) => (
              <SpeakerCard key={s.slug} speaker={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="relative py-12 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <QnAForm speakers={SPEAKERS} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex gap-5 sm:gap-6">
      <div className="relative w-20 sm:w-24 flex-shrink-0 aspect-[4/5]">
        {speaker.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={speaker.photo}
            alt={speaker.nameMain}
            className="w-full h-full object-contain object-bottom drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl text-white/45 font-semibold">
            {speaker.initial}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
          {speaker.topic}
        </h3>
        {speaker.topicSub && (
          <p className="mt-2 text-[13px] sm:text-sm text-white/65 leading-relaxed">
            {speaker.topicSub}
          </p>
        )}
        <div className="w-10 h-px bg-gradient-to-r from-[var(--accent-from)] to-transparent my-3 sm:my-4" />
        <div className="text-sm sm:text-[15px] font-semibold text-white">
          {speaker.nameMain}
          <span className="ml-2 text-[12px] sm:text-xs text-white/55 font-normal">
            {speaker.nameAux}
          </span>
        </div>
        <div className="text-[12px] sm:text-[13px] text-white/55 mt-1">
          {speaker.role}
        </div>
      </div>
    </div>
  );
}

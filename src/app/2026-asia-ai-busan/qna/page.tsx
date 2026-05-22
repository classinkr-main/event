import QnAForm from "./QnAForm";
import "./qna.css";

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
    nameAux: "Cho Kyu Seong",
    role: "WP 과사람 교육기업 이사장",
    pickValue: "조규성 (WP 과사람 교육기업)",
  },
  {
    slug: "kwak",
    photo: "/speakers/kwak.png",
    initial: "곽",
    topic: "학생이 설명할 때, 배움이 완성된다",
    topicSub: "AI · BYOD 시대, 교사는 메타인지를 깨우는 설계자가 된다",
    nameMain: "곽정율",
    nameAux: "Kwak Jung Youl",
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
    role: "클래스인 공동창업자 & 최고 기술 관리자",
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
    role: "션전 스카이에듀 부교장",
    pickValue: "웅극중 (션전 스카이에듀)",
  },
  {
    slug: "zuo",
    photo: "/speakers/zuo.png",
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
    role: "전국학습학원협회 회장",
    pickValue: "안도 다이사쿠 (전국학습학원협회)",
  },
];

export default function QnAPage() {
  return (
    <main className="qna-page">
      <div className="qna-wrap">
        <div className="qna-markmark">
          <span className="qna-brand">ClassIn</span>
          <span className="qna-sep">/</span>
          <span>Asia AI Education Forum</span>
        </div>

        <div className="qna-eyebrow">Pre-stage · Busan 2026</div>
        <h1 className="qna-title">연사에게 직접 듣는 솔루션</h1>
        <p className="qna-subtitle">현장 Q&amp;A 및 네트워킹을 위한 사전 설문</p>
        <div className="qna-meta">2026 · BUSAN · ASIA AI EDUCATION FORUM</div>

        <section className="qna-lineup" aria-label="연사 라인업">
          <div className="qna-lineup-label">Speaker Lineup</div>
          <div className="qna-speakers">
            {SPEAKERS.map((s) => (
              <SpeakerCard key={s.slug} speaker={s} />
            ))}
          </div>
        </section>

        <QnAForm speakers={SPEAKERS} />

        <footer className="qna-footer">
          <span>© 2026 ClassIn · Asia AI Education Forum</span>
          <a href="/2026-asia-ai-busan">← 이벤트 페이지로</a>
        </footer>
      </div>
    </main>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="qna-speaker">
      <div className="qna-photo">
        {speaker.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={speaker.photo} alt={speaker.nameMain} />
        )}
        {!speaker.photo && (
          <span className="qna-initials">{speaker.initial}</span>
        )}
      </div>
      <div className="qna-info">
        <h3 className="qna-topic-kr">{speaker.topic}</h3>
        {speaker.topicSub && (
          <div className="qna-topic-sub">{speaker.topicSub}</div>
        )}
        <div className="qna-divider" />
        <div className="qna-name">
          {speaker.nameMain}
          <span className="qna-aux">{speaker.nameAux}</span>
        </div>
        <div className="qna-role">{speaker.role}</div>
      </div>
    </div>
  );
}

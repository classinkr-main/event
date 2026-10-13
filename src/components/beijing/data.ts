/** /beijing 콘텐츠 원본 — ClassIn 본사 초안 PDF(2026-10-01) 기준. 세부 일정·연사는 최종안에 따라 바뀔 수 있음 */

export const EVENT = {
  start: "2026-11-24T00:00:00+09:00",
  dateLine: "2026. 11. 24 (화) – 11. 27 (금)",
  city: "중국 베이징",
};

export type Stop = {
  id?: string; // 관심 표시 가능한 항목만
  time: string;
  title: string;
  sub?: string;
};
export type Day = {
  n: number;
  date: string;
  weekday: string;
  label: string;
  theme?: string;
  stops: Stop[];
};

export const DAYS: Day[] = [
  {
    n: 1,
    date: "11.24",
    weekday: "화",
    label: "도착",
    stops: [
      { time: "저녁 ~", title: "베이징 순차 도착, 호텔 체크인", sub: "11/25 오후 1시 전까지 도착" },
    ],
  },
  {
    n: 2,
    date: "11.25",
    weekday: "수",
    label: "GET 대회",
    theme: "중국 교육기술 연례 행사",
    stops: [
      { id: "d2-forum", time: "오전", title: "GET 대회 메인 포럼", sub: "신윈난 크라운플라자 호텔" },
      { time: "점심", title: "ClassIn 부스 점심" },
      { id: "d2-session", time: "오후", title: "ClassIn「AI 신교육」특별 세션", sub: "한국·중국 학원 4곳 발표" },
      { time: "저녁", title: "교류 만찬" },
    ],
  },
  {
    n: 3,
    date: "11.26",
    weekday: "목",
    label: "방문 · 본사",
    theme: "AI 제품 방향, 직접 대화",
    stops: [
      { id: "d3-xuefang", time: "오전", title: "쉐팡교육(学方) 방문", sub: "베이징 개인 맞춤형 학원" },
      { id: "d3-cto", time: "14:00", title: "ClassIn CTO · AI 시대 제품 로드맵", sub: "ClassIn 베이징 본사" },
      { id: "d3-xiangliang", time: "15:00", title: "AI 슈퍼 강좌로 수강생 0명에서 1만 명까지", sub: "샹량교육(向量教育)" },
      { id: "d3-lirui", time: "16:00", title: "AI는 어떻게 학원의 ‘본사’를 없앴나", sub: "리루이(李睿)" },
      { time: "19:00", title: "초청 만찬" },
    ],
  },
  {
    n: 4,
    date: "11.27",
    weekday: "금",
    label: "대학 · 귀국",
    stops: [
      { id: "d4-univ", time: "오전", title: "베이징 협력 대학 방문", sub: "학교명은 최종안에서 확정" },
      { time: "오후", title: "귀국" },
    ],
  },
];

export const TALKS = [
  { id: "s1", no: "01", title: "AI가 바꾸는 미래 교실: BYOD와 AI 수업 분석", speaker: "한국 정율사관 창업자", note: "세부 주제 협의 중" },
  { id: "s2", no: "02", title: "학원은 ‘뉴미디어 모집’ 전쟁을 어떻게 이기는가", speaker: "유명 교육 크리에이터" },
  { id: "s3", no: "03", title: "국제 교육의 디지털 전환, 현장 사례", speaker: "신동방 국제교육" },
  { id: "s4", no: "04", title: "지역 학원의 전자칠판 돌파 전략: 상호작용과 입소문", speaker: "충칭 훠광교육" },
];

export type Org = {
  glyph: string;
  name: string;
  cn?: string;
  when: string;
  summary: string;
  rows: [string, string][];
};

export const ORGS: Org[] = [
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

/** 관심 표시 id → 신청서 칩 라벨 */
export const INTEREST_LABELS: Record<string, string> = {
  "d2-forum": "11/25 GET 메인 포럼",
  "d2-session": "11/25 AI 신교육 특별 세션",
  "d3-xuefang": "11/26 쉐팡교육 방문",
  "d3-cto": "11/26 CTO 제품 로드맵",
  "d3-xiangliang": "11/26 샹량교육 발표",
  "d3-lirui": "11/26 리루이 발표",
  "d4-univ": "11/27 협력 대학 방문",
  s1: "세션 1 · 정율사관",
  s2: "세션 2 · 뉴미디어 모집",
  s3: "세션 3 · 신동방 국제교육",
  s4: "세션 4 · 훠광교육",
};

export const STATS = [
  { value: 47, suffix: "개 도시", label: "신동방 국제교육 운영 범위" },
  { value: 140000, suffix: "명+", label: "훠광교육 누적 수강생" },
  { value: 73, suffix: "%", label: "샹량교육 온라인 수강 완료율 (업계 평균 약 45%)" },
  { value: 100, suffix: "명+", label: "쉐팡교육 전임 교사" },
];

/** 여권 스탬프(일정 4일) */
export const STAMPS: { shape: "round" | "rect"; color: "blue" | "red" | "green"; top: string; center: string; bottom: string; rot: number }[] = [
  { shape: "round", color: "blue", top: "BEIJING CAPITAL · PEK", center: "24 NOV 2026", bottom: "ARRIVAL", rot: -9 },
  { shape: "rect", color: "red", top: "GET 2026 · 教育科技大会", center: "25 NOV 2026", bottom: "CLASSIN SESSION", rot: 6 },
  { shape: "round", color: "green", top: "CLASSIN HEADQUARTERS", center: "26 NOV 2026", bottom: "VISIT · 学方", rot: -5 },
  { shape: "rect", color: "blue", top: "BEIJING CAPITAL · PEK", center: "27 NOV 2026", bottom: "DEPARTURE", rot: 8 },
];

/** 이번 여정에서 만나는 사람과 숫자로 만든 질문 */
export const QUESTIONS: { no: string; q: string; where: string; who: string; id: string }[] = [
  { no: "01", q: "AI 수업 분석은 학원 운영을 얼마나 바꿨나", where: "11.25 세션", who: "한국 정율사관", id: "s1" },
  { no: "02", q: "수강 완료율 73%는 어떻게 나왔나", where: "11.26 본사", who: "샹량교육", id: "d3-xiangliang" },
  { no: "03", q: "본사 없는 학원, 가능한가", where: "11.26 본사", who: "리루이", id: "d3-lirui" },
  { no: "04", q: "지역 학원이 14만 명을 모은 방법", where: "11.25 세션", who: "충칭 훠광교육", id: "s4" },
  { no: "05", q: "1:1 맞춤 학원은 현장에서 어떻게 움직이나", where: "11.26 방문", who: "쉐팡교육", id: "d3-xuefang" },
  { no: "06", q: "ClassIn 제품은 어디로 가나", where: "11.26 본사", who: "ClassIn CTO", id: "d3-cto" },
];

/** 여행 메모 */
export const NOTES: [string, string][] = [
  ["시차", "서울보다 1시간 늦습니다."],
  ["날씨", "영하 3도에서 영상 8도, 건조합니다. 두꺼운 외투를 챙기세요."],
  ["여권", "유효기간 6개월 이상을 확인해 주세요."],
  ["결제", "알리페이·위챗페이가 보편적입니다."],
  ["안내", "비자·항공·숙박·현지 이동은 신청 후 개별 안내드립니다."],
];

import { Fragment } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./fx/Reveal";
import Tilt3D from "./fx/Tilt3D";

type Plan = {
  code: string;
  name: string;
  desc: string;
  features: string[];
  badge: string;
  pricePrefix?: string;
  priceMain: string;
  priceUnit: string;
  priceStrike?: string;
  priceNote: string;
};

const plans: Plan[] = [
  {
    code: "A",
    name: "월 구독형",
    desc: "강사 1인 단위 구독. 꾸준한 수업 운영에 적합합니다.",
    features: ["강사 1인 기준", "학생 최대 50명", "수업시간 무제한"],
    badge: "월 구독료 10% 할인",
    priceMain: "134,100원",
    priceUnit: "/ 계정 · 월",
    priceStrike: "정가 149,000원",
    priceNote: "ClassIn Standard 이용권 기준",
  },
  {
    code: "B",
    name: "충전형",
    desc: "학원 단위 충전. 수업 규모에 맞게 자유롭게 씁니다.",
    features: ["전 강사 전 기능 이용 가능", "충전금 사용 기간 무제한", "수업시간 · 학생수 자유롭게 사용"],
    badge: "충전금 10% 추가 제공",
    pricePrefix: "100만원 충전 시",
    priceMain: "110만원",
    priceUnit: "사용",
    priceNote: "충전 금액의 10%를 더 드립니다",
  },
];

type PkgIcon = "board" | "pc" | "camera" | "truck" | "calendar" | "coins";

const HARDWARE: { icon: PkgIcon; name: string; sub: string }[] = [
  { icon: "board", name: "86″ AI 스마트보드", sub: "ClassIn 전자칠판" },
  { icon: "pc", name: "PC", sub: "보드 구동용" },
  { icon: "camera", name: "AI 카메라", sub: "수업 자동 녹화" },
  { icon: "truck", name: "설치 · 배송", sub: "현장 설치 포함" },
];

const ICONS: Record<PkgIcon, React.ReactNode> = {
  board: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  pc: (
    <>
      <rect x="4" y="3" width="10" height="18" rx="2" />
      <path d="M8 7h2M8 11h2M18 8v8" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="M16 11l5-3v8l-5-3z" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="7" rx="7" ry="3" />
      <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </>
  ),
};

function PkgItem({ icon, name, sub }: { icon: PkgIcon; name: string; sub: string }) {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--accent-from)]"
      >
        {ICONS[icon]}
      </svg>
      <div className="mt-3 text-[15px] sm:text-lg font-bold tracking-tight leading-tight">{name}</div>
      <div className="mt-1 text-xs sm:text-sm text-white/50">{sub}</div>
    </div>
  );
}

function Check() {
  return (
    <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-from)] flex items-center justify-center">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M5 12l5 5L20 7" stroke="#050807" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function HjOffer() {
  return (
    <section id="offer" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="MEMBER OFFER"
          title={
            <>
              일단 2주,
              <br />
              <span className="text-gradient">써보고 결정</span>하세요.
            </>
          }
          lead="학원전자 회원사 전용 혜택. 2주 동안 실제 수업에서 써보고 결정하세요."
        />

        {/* 공동 혜택 배너 */}
        <Reveal>
        <Tilt3D max={3} className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="shrink-0 inline-flex items-center self-start rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-3.5 py-1.5 text-xs sm:text-sm font-semibold tracking-[0.15em] text-[#050807]">
            공동 혜택
          </div>
          <div className="flex-1">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">
              첫 <span className="text-gradient">2주 무료</span> 이용
            </div>
            <p className="mt-1.5 text-sm sm:text-base text-white/60">
              2주 후 우리 학원과 맞지 않으면 취소할 수 있습니다.
            </p>
          </div>
        </Tilt3D>
        </Reveal>

        {/* 요금제 A / B */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4 mb-5 sm:mb-6">
          <p className="text-base sm:text-lg text-white/75 font-medium shrink-0">
            우리 학원에 맞는 ClassIn 요금제를 선택하세요.
          </p>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {plans.map((p, i) => (
            <Reveal key={p.code} delay={i * 120} className="h-full">
            <Tilt3D
              max={5}
              className="glass h-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/[0.05] text-white font-bold text-lg flex items-center justify-center">
                  {p.code}
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight">{p.name}</span>
              </div>
              <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">{p.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm sm:text-base text-white/85">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 sm:mt-7 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-white/55">학원전자 공구 혜택</span>
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-3 py-1 text-xs sm:text-sm font-bold text-[#050807] whitespace-nowrap">
                    {p.badge}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {p.pricePrefix && <span className="text-sm sm:text-base text-white/60">{p.pricePrefix}</span>}
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight">{p.priceMain}</span>
                  <span className="text-sm sm:text-base text-white/60">{p.priceUnit}</span>
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-white/45">
                  {p.priceStrike && <span className="line-through decoration-white/40 mr-2">{p.priceStrike}</span>}
                  {p.priceNote}
                </div>
              </div>
            </Tilt3D>
            </Reveal>
          ))}
        </div>

        {/* C 스마트교실 패키지 */}
        <Reveal className="mt-4 sm:mt-5">
        <Tilt3D max={3} className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/[0.05] text-white font-bold text-lg flex items-center justify-center">
              C
            </span>
            <div>
              <div className="text-[10px] sm:text-xs tracking-[0.2em] text-white/45">
                SOFTWARE + HARDWARE
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight">스마트교실 패키지</div>
            </div>
          </div>

          {/* 구성품: 박스 없이 아이콘·이름을 + 로 잇는 열린 구성 */}
          <div className="mt-6 sm:mt-8">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="text-[11px] sm:text-xs tracking-[0.2em] text-white/45 shrink-0">하드웨어 · 기본 포함</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-y-7 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-y-0 items-start">
              {HARDWARE.map((it, i) => (
                <Fragment key={it.name}>
                  {i > 0 && (
                    <span className="hidden lg:flex items-center justify-center px-2 pt-3 text-2xl font-light text-[var(--accent-from)]/70">
                      +
                    </span>
                  )}
                  <PkgItem icon={it.icon} name={it.name} sub={it.sub} />
                </Fragment>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-8 sm:mt-10 mb-5 sm:mb-6">
              <span className="text-[11px] sm:text-xs tracking-[0.2em] text-white/45 shrink-0">소프트웨어 · 둘 중 하나 선택</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-start">
              <PkgItem icon="calendar" name="ClassIn 구독 1년" sub="강사 단위 월 구독형 (A)" />
              <span className="flex flex-col items-center justify-center gap-2 pt-3 px-2 sm:px-3 text-[11px] sm:text-xs tracking-[0.25em] text-white/45">
                <span className="h-6 w-px bg-white/15" />
                또는
                <span className="h-6 w-px bg-white/15" />
              </span>
              <PkgItem icon="coins" name="충전금 100만원" sub="학원 단위 충전형 (B)" />
            </div>
          </div>

          {/* 가격: 정가 취소선 + 특별 혜택 할인 + 문의 유도 (구체 할인가는 비공개) */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
              <div>
                <div className="text-[11px] sm:text-xs tracking-[0.15em] text-white/45">정가 · 세트 1대</div>
                <div className="mt-1 leading-none text-white/55">
                  <span className="strike-anim">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight">830</span>
                    <span className="ml-1 text-sm sm:text-base font-semibold">만원</span>
                  </span>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/40">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-4 py-2 text-sm sm:text-base font-bold text-[#050807]">
                학원전자 특별 혜택 할인
              </div>
            </div>
            <p className="flex-1 text-sm sm:text-base text-white/60 leading-relaxed">
              할인가는 상담으로 안내드립니다. 지금 문의해 주세요.
            </p>
            <a
              href="#consult"
              className="press shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 hover:bg-white/5"
            >
              할인가 문의하기
            </a>
          </div>
        </Tilt3D>
        </Reveal>

        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-white/40">
          공동구매 신청·문의는 학원전자 사무국, 도입 상담은 아래 신청서로.
        </p>
      </div>
    </section>
  );
}

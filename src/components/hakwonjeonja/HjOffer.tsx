import SectionHead from "./SectionHead";
import Reveal from "./fx/Reveal";
import Tilt3D from "./fx/Tilt3D";

type Plan = {
  code: string;
  name: string;
  desc: string;
  features: string[];
  benefitLabel: string;
  benefitBig: string;
  benefitSuffix: string;
  benefitNote?: string;
};

const plans: Plan[] = [
  {
    code: "A",
    name: "월 구독형",
    desc: "강사 1인 단위 구독. 꾸준한 수업 운영에 적합합니다.",
    features: ["강사 1인 기준", "학생 최대 50명", "수업시간 무제한"],
    benefitLabel: "월 구독료",
    benefitBig: "10%",
    benefitSuffix: "할인",
    benefitNote: "ClassIn Standard 134,100원 / 계정·월 (정가 149,000원)",
  },
  {
    code: "B",
    name: "충전형",
    desc: "학원 단위 충전. 수업 규모에 맞게 자유롭게 씁니다.",
    features: ["전 강사 전 기능 이용 가능", "충전금 사용 기간 무제한", "수업시간 · 학생수 자유롭게 사용"],
    benefitLabel: "충전금",
    benefitBig: "10%",
    benefitSuffix: "추가 제공",
  },
];

const tiers = [
  { label: "정가", price: "830", note: "기준", hot: false },
  { label: "10대 기준", price: "780", note: "50만원 인하", hot: false },
  { label: "20대 기준", price: "750", note: "80만원 인하", hot: true },
];

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
              <div className="mt-6 sm:mt-7 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 flex items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-white/70 leading-snug">
                  학원전자
                  <br />
                  공구 혜택
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-white/60">{p.benefitLabel}</div>
                  <div className="leading-none">
                    <span className="text-3xl sm:text-4xl font-black text-gradient">{p.benefitBig}</span>
                    <span className="ml-1.5 text-sm sm:text-base font-bold text-white">{p.benefitSuffix}</span>
                  </div>
                </div>
              </div>
              {p.benefitNote && (
                <p className="mt-3 text-[11px] sm:text-xs text-white/40 text-right">{p.benefitNote}</p>
              )}
            </Tilt3D>
            </Reveal>
          ))}
        </div>

        {/* C 스마트교실 패키지 */}
        <Reveal className="mt-4 sm:mt-5">
        <Tilt3D max={3} className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
            <div className="flex items-center gap-3 shrink-0">
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
            <div className="flex-1 text-sm sm:text-base text-white/75 leading-relaxed lg:border-l lg:border-white/10 lg:pl-8">
              86″ ClassIn AI 스마트보드 + PC + AI 카메라 + 설치·배송
              <br />
              ClassIn 구독 1년 또는 충전금 100만원 선택
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4 sm:mb-5">
              <div>
                <div className="text-xs sm:text-sm tracking-[0.15em] text-white/50">회원사 공동구매</div>
                <div className="mt-1 text-xl sm:text-2xl font-bold tracking-tight">
                  회원사가 모일수록, <span className="text-gradient">내려갑니다</span>
                </div>
              </div>
              <div className="text-[11px] sm:text-xs text-white/40">
                회원사 합산 수량 기준 세트당 가격 · 부가세 별도
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/10 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
              {tiers.map((t) => (
                <div
                  key={t.label}
                  className={`px-3 py-5 sm:py-6 text-center ${t.hot ? "bg-white/[0.05]" : ""}`}
                >
                  <div className={`text-[11px] sm:text-sm tracking-[0.1em] ${t.hot ? "text-[var(--accent-from)]" : "text-white/55"}`}>
                    {t.label}
                  </div>
                  <div className="mt-2 leading-none">
                    <span className={`text-3xl sm:text-5xl font-black tracking-tight ${t.hot ? "text-gradient" : "text-white"}`}>
                      {t.price}
                    </span>
                    <span className="ml-1 text-xs sm:text-base font-bold text-white/80">만원</span>
                  </div>
                  <div className="mt-2 text-[11px] sm:text-sm text-white/45">{t.note}</div>
                </div>
              ))}
            </div>
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

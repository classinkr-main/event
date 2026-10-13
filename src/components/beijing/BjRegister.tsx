import BjRegisterForm from "./BjRegisterForm";

export default function BjRegister({ source }: { source?: string }) {
  return (
    <section id="register" className="relative py-20 sm:py-32 md:py-40">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-3 sm:mb-4">
            REGISTRATION
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            참가 신청
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/60 leading-relaxed">
            11월 24일 (화) 저녁, 베이징에서 뵙겠습니다.
            <br className="hidden sm:block" />
            신청하시면 항공·숙박 등 세부 사항을 담당자가 개별 안내드립니다.
          </p>
        </div>

        <BjRegisterForm source={source} />
      </div>
    </section>
  );
}

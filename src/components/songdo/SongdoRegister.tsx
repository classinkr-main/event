import SongdoRegisterForm from "./SongdoRegisterForm";

export default function SongdoRegister({ source }: { source?: string }) {
  return (
    <section id="register" className="relative py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.1] text-[var(--ink)]">무료 참석 신청.</h2>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-[var(--ink-2)] leading-relaxed">
            10월 29일 (목) 오전 11시, 엔에스 수능관학원에서 뵙겠습니다.
          </p>
        </div>
        <div className="mt-10 sm:mt-14">
          <SongdoRegisterForm source={source} />
        </div>
      </div>
    </section>
  );
}

import SongdoRegisterForm from "./SongdoRegisterForm";
import type { Seminar } from "./seminars";

export default function SongdoRegister({ source, ev }: { source?: string; ev: Seminar }) {
  return (
    <section id="register" className="relative py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-3 sm:mb-4">
            REGISTRATION
          </p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold">
            무료 참석 신청
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/60 leading-relaxed">
            {ev.dateKo} ({ev.dow}) {ev.startTime},<br className="hidden sm:block" /> <span className="whitespace-nowrap">{ev.venue}</span>에서 뵙겠습니다.
          </p>
        </div>

        <SongdoRegisterForm source={source} ev={ev} />
      </div>
    </section>
  );
}

import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import BjRegisterForm from "./BjRegisterForm";

export default function BjRegister({ source }: { source?: string }) {
  return (
    <section id="register" className="relative py-16 sm:py-24 md:py-28 bg-[var(--band)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal className="mb-10 sm:mb-12 max-w-2xl">
          <h2 className="text-[2rem] sm:text-5xl md:text-[3.25rem] font-medium leading-[1.12] tracking-tight">참가 신청</h2>
          <p className="mt-4 text-[15px] sm:text-lg text-[var(--ink-2)] leading-relaxed">
            탑승권을 채워 제출해 주세요. 항공과 숙박 등 세부 사항은 접수 후 담당자가 개별 안내드립니다.
          </p>
        </Reveal>
        <Reveal>
          <BjRegisterForm source={source} />
        </Reveal>
      </div>
    </section>
  );
}

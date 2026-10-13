import BjHead from "./BjHead";
import BjRegisterForm from "./BjRegisterForm";

export default function BjRegister({ source }: { source?: string }) {
  return (
    <section id="register" className="relative py-20 sm:py-28 md:py-36 border-t border-[var(--bj-line)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <BjHead
          no="05"
          eyebrow="REGISTRATION"
          title="참가 신청"
          lead="11월 24일 (화) 저녁, 베이징에서 뵙겠습니다. 신청하시면 항공·숙박 등 세부 사항을 담당자가 개별 안내드립니다."
        />
        <BjRegisterForm source={source} />
      </div>
    </section>
  );
}

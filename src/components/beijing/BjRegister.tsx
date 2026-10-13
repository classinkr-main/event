import BjHead from "./BjHead";
import BjRegisterForm from "./BjRegisterForm";

export default function BjRegister({ source }: { source?: string }) {
  return (
    <section id="register" className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <BjHead
          title="참가 신청"
          lead="아래 탑승권을 채워 제출해 주세요. 항공과 숙박 등 세부 사항은 접수 후 담당자가 개별 안내드립니다."
        />
        <BjRegisterForm source={source} />
      </div>
    </section>
  );
}

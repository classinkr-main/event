import SectionHead from "./SectionHead";
import HjConsultForm from "./HjConsultForm";

export default function HjConsult({ source }: { source?: string }) {
  return (
    <section id="consult" className="relative py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="CONSULTATION"
          title="상담 신청"
          lead={
            <>
              우리 학원 규모에 맞는 구성과 공구 혜택을 안내드립니다.
              <br className="hidden sm:block" />
              신청해 주시면 담당자가 순차적으로 연락드립니다.
            </>
          }
        />
        <HjConsultForm source={source} />
      </div>
    </section>
  );
}

import Reveal from "@/components/hakwonjeonja/fx/Reveal";

/** 사진 띠 — 천단 */
export default function BjPhotoBand() {
  return (
    <section className="relative py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="bj-photo aspect-[4/3] sm:aspect-[2.6/1]">
            <div className="bg bg-cover bg-[center_35%]" style={{ backgroundImage: "url('/beijing-tiantan.jpg')" }} />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute left-5 sm:left-8 bottom-5 sm:bottom-7 text-white">
              <div className="text-xl sm:text-3xl font-medium tracking-tight">11월의 베이징</div>
              <div className="text-sm text-white/85 mt-1">맑고 건조한 늦가을, 영하 3도에서 영상 8도 안팎</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Split from "./Split";
import { GET_RECAP } from "./data";

/** 지난 GET(2025) 현장 사진 — 넘기기 없이 격자로 */
export default function BjGetRecap() {
  return (
    <Split
      id="get-recap"
      title={
        <>
          지난 GET
          <br />
          현장
        </>
      }
      lead="2025년 GET 대회 모습입니다."
      wide
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {GET_RECAP.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 50}>
            <div className="relative aspect-[3/2] rounded-xl sm:rounded-2xl overflow-hidden bg-white/5">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        ))}
      </div>
    </Split>
  );
}

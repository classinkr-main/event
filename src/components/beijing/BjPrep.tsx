import Image from "next/image";
import Reveal from "@/components/fx/Reveal";
import Split from "./Split";
import { PAY_GUIDES, VPN_GUIDE } from "./data";

/** 현지 결제(위챗페이 · 알리페이)와 VPN 준비 */
export default function BjPrep() {
  return (
    <Split
      id="prep"
      title="현지 결제와 VPN"
      lead="중국에서는 대부분 알리페이나 위챗페이로 결제합니다. 현금이나 실물 카드만으로는 결제가 어려울 수 있으니, 출발 전에 둘 중 하나를 준비해 주세요."
    >
      <Reveal>
        <div className="border-t border-[var(--line-2)]">
          {PAY_GUIDES.map((g) => (
            <div key={g.name} className="py-6 sm:py-8 border-b border-[var(--line)]">
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-tight">{g.name}</h3>
              <p className="mt-1.5 text-[13px] text-[var(--ink-3)] leading-relaxed">{g.pre}</p>
              <div className="mt-5 grid gap-3">
                {g.shots.map((row) => (
                  <div key={row[0].src} className={`grid gap-3 ${row.length > 1 ? "grid-cols-2" : ""}`}>
                    {row.map((im) => (
                      <Image
                        key={im.src}
                        src={im.src}
                        alt={im.alt}
                        width={im.w}
                        height={im.h}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="w-full h-auto rounded-2xl"
                      />
                    ))}
                  </div>
                ))}
              </div>
              <ol className="mt-5">
                {g.steps.map((s, i) => (
                  <li key={s} className="grid grid-cols-[2rem_1fr] gap-2 py-2.5 border-t border-[var(--line)] first:border-t-0">
                    <span className="text-sm tabular-nums text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] sm:text-base text-[var(--ink-2)] leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div className="py-6 sm:py-8 border-b border-[var(--line-2)]">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-tight">VPN</h3>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--ink-2)] leading-relaxed">{VPN_GUIDE.body}</p>
            <dl className="mt-4">
              {VPN_GUIDE.apps.map(([name, tag]) => (
                <div key={name} className="flex items-center justify-between gap-3 py-2.5 border-t border-[var(--line)]">
                  <dt className="font-medium">{name}</dt>
                  <dd className="shrink-0 text-xs text-[var(--ink-2)]">{tag}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 pt-3 border-t border-[var(--line)] text-[13px] text-[var(--ink-3)] leading-relaxed">{VPN_GUIDE.note}</p>
          </div>
        </div>
        <p className="mt-4 text-[13px] text-[var(--ink-3)] leading-relaxed">앱 버전에 따라 메뉴 이름이나 위치가 조금 다를 수 있습니다. 화면 출처: 위챗페이 공식 안내, 카카오페이.</p>
      </Reveal>
    </Split>
  );
}

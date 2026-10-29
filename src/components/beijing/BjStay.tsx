import Image from "next/image";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Seal from "./gfx/Seal";
import Split from "./Split";
import { HOTEL } from "./data";

/** 숙소 — 호텔 한 곳, 객실 타입별 요금 */
export default function BjStay() {
  return (
    <Split id="stay" title="숙소" lead={`숙소는 ${HOTEL.name}입니다. 객실 타입과 요금을 미리 확인해 주세요.`}>
      <Reveal>
        <div className="glass rounded-3xl p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <Seal glyph="宿" size={48} className="shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-[var(--ink-3)]">HOTEL · 11.24 – 11.27</div>
              <div className="mt-1 text-xl sm:text-2xl font-medium tracking-tight leading-tight">{HOTEL.name}</div>
              <div className="mt-1.5 flex items-center gap-2 text-xs">
                <span className="text-[#e3b04b] tracking-[0.12em]" aria-hidden>{"★".repeat(HOTEL.stars)}</span>
                <span className="text-[var(--ink-2)]">{HOTEL.stars}성급</span>
              </div>
              <div className="mt-1 text-xs text-[var(--ink-3)] leading-relaxed">
                <span>{HOTEL.en}</span>
                <span className="hidden sm:inline"> · </span>
                <span className="zh-serif block sm:inline">{HOTEL.cn}</span>
              </div>
              <div className="mt-2 text-sm text-[var(--ink-2)] leading-relaxed">
                {HOTEL.address} <span className="zh-serif text-[var(--ink-3)]">({HOTEL.addressCn})</span>
              </div>
            </div>
          </div>

          <div className="relative mt-5 sm:mt-6 aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden">
            <Image src="/beijing-hotel.jpg" alt="크라운 플라자 베이징 중관춘 야경" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>

          <div className="mt-3 sm:mt-4 grid sm:grid-cols-2 gap-3 sm:gap-4">
            {HOTEL.rooms.map((r) => (
              <div key={r.type} className="rounded-2xl border border-[var(--line)] bg-white/[0.03] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">
                    {r.type} <span className="text-xs text-[var(--ink-3)] ml-1">{r.en}</span>
                  </div>
                  <span className="shrink-0 text-xs text-[var(--ink-2)] px-2.5 py-1 rounded-full border border-[var(--line-2)]">{r.breakfast}</span>
                </div>
                <div className="mt-3 text-2xl sm:text-[1.75rem] font-medium tracking-tight tabular-nums leading-none">
                  {r.cny}
                  <span className="ml-1 text-sm font-normal text-[var(--ink-2)]">위안</span>
                </div>
                <div className="mt-1.5 text-sm text-[var(--ink-2)]">약 {r.krw} · 1박</div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[13px] text-[var(--ink-3)] leading-relaxed">{HOTEL.rateNote}</p>

          <a
            href={HOTEL.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bj-btn bj-btn-line mt-5 text-[14px] !px-5 !py-2.5"
          >
            트립닷컴에서 호텔 보기 ↗
          </a>
        </div>
      </Reveal>
    </Split>
  );
}

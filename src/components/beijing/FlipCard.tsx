"use client";

import { useState } from "react";
import Seal from "./gfx/Seal";
import type { Org } from "./data";

/** 명함 — 앞면 인장·이름, 뒷면 소개. 눌러서 뒤집기 */
export default function FlipCard({ org }: { org: Org }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flip h-[320px] ${open ? "is-open" : ""}`}>
      <div className="flip-inner h-full">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flip-face absolute inset-0 text-left p-6 flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--line)] hover:border-[var(--line-2)] transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <Seal glyph={org.glyph} size={52} />
            <span className="text-xs text-[var(--ink-3)] text-right pt-1">{org.when}</span>
          </div>
          <div className="mt-auto">
            <div className="text-xl sm:text-2xl font-medium tracking-tight leading-tight">{org.name}</div>
            {org.cn && <div className="text-xs text-[var(--ink-3)] mt-1">{org.cn}</div>}
            <p className="mt-3 text-[13px] text-[var(--ink-2)] leading-relaxed line-clamp-3">{org.summary}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--line)] text-xs text-[var(--green)] font-medium">소개 보기</div>
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flip-face flip-back text-left p-6 overflow-y-auto rounded-2xl bg-[#f3f1ec] text-[#17181c]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium">{org.name}</span>
            <span className="text-xs text-[#17181c]/55">앞면으로</span>
          </div>
          <dl className="mt-3">
            {org.rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[3.6rem_1fr] gap-3 py-2 border-b border-[#17181c]/10">
                <dt className="text-[11px] text-[#17181c]/55 pt-0.5">{k}</dt>
                <dd className="text-[12.5px] leading-relaxed text-[#17181c]/85">{v}</dd>
              </div>
            ))}
          </dl>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Seal from "./gfx/Seal";
import type { Org } from "./data";

/** 명함 — 앞면 인장·이름, 뒷면 소개. 눌러서 뒤집기 */
export default function FlipCard({ org }: { org: Org }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flip h-[340px] ${open ? "is-open" : ""}`}>
      <div className="flip-inner h-full">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flip-face paper absolute inset-0 text-left p-6 sm:p-7 flex flex-col"
        >
          <div className="flex items-start justify-between gap-3">
            <Seal glyph={org.glyph} size={60} />
            <span className="mono text-[10px] text-[var(--ink-3)] text-right pt-1">{org.when}</span>
          </div>
          <div className="mt-auto">
            <div className="serif text-2xl font-bold leading-tight">{org.name}</div>
            {org.cn && <div className="mono text-[11px] text-[var(--ink-3)] mt-1">{org.cn}</div>}
            <p className="mt-3 text-[13px] text-[var(--ink-2)] leading-relaxed line-clamp-3">{org.summary}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--paper-line)] text-[11px] text-[var(--ink-3)]">뒤집어 보기</div>
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flip-face flip-back paper paper-dark text-left p-6 sm:p-7 overflow-y-auto"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="serif font-bold text-lg">{org.name}</span>
            <span className="text-[11px] text-[var(--snow-3)]">앞면으로</span>
          </div>
          <dl className="mt-3">
            {org.rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[3.8rem_1fr] gap-3 py-2 border-b border-[var(--night-line)]">
                <dt className="mono text-[10px] text-[var(--snow-3)] pt-0.5">{k}</dt>
                <dd className="text-[12.5px] leading-relaxed text-[var(--snow-2)]">{v}</dd>
              </div>
            ))}
          </dl>
        </button>
      </div>
    </div>
  );
}

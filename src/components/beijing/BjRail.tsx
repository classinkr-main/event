"use client";

import { useEffect, useState } from "react";

const marks = [
  { id: "top", label: "초청" },
  { id: "glance", label: "한눈에" },
  { id: "itinerary", label: "일정" },
  { id: "session", label: "세션" },
  { id: "dossier", label: "기관" },
  { id: "register", label: "신청" },
];

/** 왼쪽 고정 레일 — 현재 섹션 표시 + 점프 (lg 이상) */
export default function BjRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = marks
      .map((m) => document.getElementById(m.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="섹션 이동" className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-5">
      {marks.map((m, i) => {
        const on = active === m.id;
        return (
          <a key={m.id} href={`#${m.id}`} className="group flex items-center gap-3">
            <span
              className={`block w-px transition-all duration-300 ${on ? "h-8 bg-[var(--bj-red)]" : "h-4 bg-[var(--bj-line-2)] group-hover:bg-[var(--ink)]"}`}
            />
            <span
              className={`mono text-[10px] transition-colors ${on ? "text-[var(--ink)]" : "text-[var(--ink-3)] group-hover:text-[var(--ink-2)]"}`}
            >
              {String(i).padStart(2, "0")} {m.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

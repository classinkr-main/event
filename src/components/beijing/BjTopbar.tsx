"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#glance", label: "한눈에" },
  { href: "#itinerary", label: "일정" },
  { href: "#session", label: "특별 세션" },
  { href: "#dossier", label: "기관 · 연사" },
  { href: "#register", label: "참가 신청" },
];

export default function BjTopbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-[#07080b]/80 backdrop-blur-md border-b border-[var(--bj-line)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-6">
        <a
          href="https://www.classin.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="ClassIn 홈페이지로 이동"
        >
          <span className="text-base font-bold tracking-tight">ClassIn</span>
          <span className="hidden sm:inline mono text-[10px] text-[var(--ink-3)] border-l border-[var(--bj-line)] pl-3">
            MEETS · BEIJING
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-[13px] text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <span className="mono inline-flex items-center gap-2 text-[10px] text-[var(--ink-2)] border border-[var(--bj-line-2)] px-2.5 py-1">
          <span className="w-1.5 h-1.5 bg-[var(--bj-red)]" />
          INVITED
        </span>
      </div>
      <div className="absolute left-0 bottom-0 h-px bg-[var(--bj-red)] transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
    </header>
  );
}

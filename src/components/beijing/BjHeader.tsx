"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#glance", label: "한눈에 보기" },
  { href: "#schedule", label: "일정" },
  { href: "#session", label: "특별 세션" },
  { href: "#people", label: "기관 · 연사" },
  { href: "#register", label: "참가 신청" },
];

export default function BjHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#02060f]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 sm:h-16 flex items-center justify-between gap-6">
        <a
          href="https://www.classin.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity shrink-0"
          aria-label="ClassIn 홈페이지로 이동"
        >
          <span className="text-base sm:text-lg font-bold tracking-tight">ClassIn</span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] sm:text-[11px] tracking-[0.2em] text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)]" />
            INVITED
          </span>
        </div>
      </div>
    </header>
  );
}

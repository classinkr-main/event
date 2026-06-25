"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#event", label: "설명회 안내" },
  { href: "#program", label: "프로그램" },
  { href: "#register", label: "참가 신청" },
];

export default function IncheonHeader() {
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
          href="https://classin.ai.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity shrink-0"
          aria-label="Classin 메인 사이트로 이동"
        >
          <span className="text-base sm:text-lg font-bold tracking-tight">
            Classin
          </span>
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
      </div>
    </header>
  );
}

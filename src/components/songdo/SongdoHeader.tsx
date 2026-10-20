"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#points", label: "확인하실 주제" },
  { href: "#event", label: "일시 · 장소" },
  { href: "#register", label: "참가 신청" },
];

export default function SongdoHeader() {
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
          ? "backdrop-blur-xl bg-black/70 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 sm:h-16 flex items-center justify-between gap-6">
        <a
          href="https://classin.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity shrink-0"
          aria-label="ClassIn 홈페이지로 이동"
        >
          <span className="text-base sm:text-lg font-bold tracking-tight">ClassIn</span>
          <span className="hidden sm:inline text-xs tracking-[0.2em] text-white/45">
            MEETS SONGDO
          </span>
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

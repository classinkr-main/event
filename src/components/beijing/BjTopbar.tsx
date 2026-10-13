"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#letter", label: "초청의 글" },
  { href: "#questions", label: "질문" },
  { href: "#journey", label: "일정" },
  { href: "#program", label: "세션" },
  { href: "#people", label: "사람들" },
];

export default function BjTopbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${scrolled ? "bg-[rgba(14,15,18,0.82)] backdrop-blur-md border-b border-[var(--line)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-6">
        <a href="https://www.classin.co.kr" target="_blank" rel="noopener noreferrer" className="font-bold tracking-tight text-base hover:opacity-80 transition-opacity" aria-label="ClassIn 홈페이지로 이동">
          ClassIn <span className="serif font-medium">Meets</span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-[13px] text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#register" className="bj-btn bj-btn-ink !px-4 !py-2 text-[13px]">
          참가 신청
        </a>
      </div>
    </header>
  );
}

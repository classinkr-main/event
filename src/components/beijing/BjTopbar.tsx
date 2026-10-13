"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#letter", label: "초청의 글" },
  { href: "#questions", label: "질문" },
  { href: "#journey", label: "여권" },
  { href: "#program", label: "프로그램" },
  { href: "#people", label: "명함" },
  { href: "#register", label: "신청" },
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
    <header className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${scrolled ? "bg-[#0b0d12]/85 backdrop-blur-md border-b border-[var(--night-line)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-6">
        <a href="https://www.classin.co.kr" target="_blank" rel="noopener noreferrer" className="font-bold tracking-tight text-base hover:opacity-80 transition-opacity" aria-label="ClassIn 홈페이지로 이동">
          ClassIn <span className="serif font-medium">Meets</span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-[13px] text-[var(--snow-2)] hover:text-[var(--snow)] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#register" className="md:hidden text-[13px] text-[var(--snow-2)]">
          신청
        </a>
      </div>
      <div className="absolute left-0 bottom-0 h-px bg-[var(--seal)] transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
    </header>
  );
}

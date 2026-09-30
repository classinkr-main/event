"use client";

import { useEffect, useState } from "react";
import HjBrand from "./HjLogo";

const navItems = [
  { href: "#why", label: "스마트교실" },
  { href: "#setup", label: "구성·사례" },
  { href: "#results", label: "도입 결과" },
  { href: "#offer", label: "공구 혜택" },
  { href: "#consult", label: "상담 신청" },
];

export default function HjHeader() {
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
          ? "backdrop-blur-xl bg-[#050807]/75 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 sm:h-16 flex items-center justify-between gap-6">
        <a
          href="https://classin.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity shrink-0"
          aria-label="ClassIn 홈페이지로 이동"
        >
          <HjBrand />
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

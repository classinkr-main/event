"use client";

import { useEffect, useState } from "react";

export default function HjFloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consultInView = false;

    const update = () => {
      const pastHero = window.scrollY > 600;
      setVisible(pastHero && !consultInView);
    };

    const target = document.getElementById("consult");
    let observer: IntersectionObserver | null = null;
    if (target) {
      observer = new IntersectionObserver(
        ([entry]) => {
          consultInView = entry.isIntersecting;
          update();
        },
        { threshold: 0.15 }
      );
      observer.observe(target);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 z-50 px-3 sm:px-4 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-2xl mx-auto glass-strong rounded-full pl-5 pr-2 py-2 flex items-center justify-between gap-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z"
                stroke="#050807"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.2em] text-white/50">
              학원전자 회원사 공동구매
            </div>
            <div className="text-sm sm:text-base font-semibold text-white truncate">
              첫 2주 무료 · 상담 신청 받는 중
            </div>
          </div>
        </div>
        <a
          href="#consult"
          className="press shrink-0 inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 hover:scale-[1.02]"
        >
          상담 신청
        </a>
      </div>
    </div>
  );
}

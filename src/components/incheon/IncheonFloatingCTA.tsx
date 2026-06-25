"use client";

import { useEffect, useState } from "react";

export default function IncheonFloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let registerInView = false;

    const update = () => {
      const pastHero = window.scrollY > 600;
      setVisible(pastHero && !registerInView);
    };

    const target = document.getElementById("register");
    let observer: IntersectionObserver | null = null;
    if (target) {
      observer = new IntersectionObserver(
        ([entry]) => {
          registerInView = entry.isIntersecting;
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
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="max-w-2xl mx-auto glass-strong rounded-full pl-5 pr-2 py-2 flex items-center justify-between gap-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.2em] text-white/50">
              송도 7/9 · 청라 7/10
            </div>
            <div className="text-sm sm:text-base font-semibold text-white truncate">
              학원장 설명회 신청 받는 중
            </div>
          </div>
        </div>
        <a
          href="#register"
          className="shrink-0 inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all hover:scale-[1.02]"
        >
          신청하기
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function SongdoFloatingCTA() {
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-2xl mx-auto rounded-full bg-[#1d1d1f]/90 backdrop-blur-xl border border-white/10 pl-5 pr-2 py-2 flex items-center justify-between gap-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.2em] text-[var(--accent-from)]/80">
            송도 10/29 (목) 11AM
          </div>
          <div className="text-sm sm:text-base font-semibold text-white truncate">
            원장님 설명회 무료 참석 신청 받는 중
          </div>
        </div>
        <a
          href="#register"
          className="btn shrink-0 px-5 sm:px-6 py-3 bg-[var(--accent-from)] text-[#07140c] text-sm"
        >
          신청하기
        </a>
      </div>
    </div>
  );
}

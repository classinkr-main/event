"use client";

import { useEffect, useState } from "react";
import { useInterests } from "./interests";

export default function BjFloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { list } = useInterests();

  useEffect(() => {
    let registerInView = false;
    const update = () => setVisible(window.scrollY > 600 && !registerInView);
    const target = document.getElementById("register");
    let observer: IntersectionObserver | null = null;
    if (target) {
      observer = new IntersectionObserver(
        ([entry]) => {
          registerInView = entry.isIntersecting;
          update();
        },
        { threshold: 0.12 }
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
      className={`fixed inset-x-0 z-50 px-3 sm:px-4 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-2xl mx-auto bg-[#0b0d13]/92 backdrop-blur-md border border-[var(--bj-line-2)] pl-4 sm:pl-5 pr-2 py-2 flex items-center justify-between gap-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
        <div className="min-w-0">
          <div className="mono text-[10px] text-[var(--ink-3)]">BEIJING · 11.24 – 27</div>
          <div className="text-sm sm:text-base font-semibold truncate">
            초청 참가 신청 받는 중
            {list.length > 0 && <span className="ml-2 text-[var(--bj-red)] mono text-xs">관심 {list.length}</span>}
          </div>
        </div>
        <a href="#register" className="bj-btn bj-btn-solid !px-5 !py-3 text-sm shrink-0">
          신청하기
        </a>
      </div>
    </div>
  );
}

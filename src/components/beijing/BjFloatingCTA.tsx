"use client";

import { useEffect, useState } from "react";
import { useInterests } from "./interests";

export default function BjFloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { list } = useInterests();
  useEffect(() => {
    let registerInView = false;
    const update = () => setVisible(window.scrollY > 700 && !registerInView);
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
      <div className="max-w-xl mx-auto bg-[var(--card)] border border-[var(--line-2)] rounded-2xl pl-5 pr-2 py-2 flex items-center justify-between gap-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
        <div className="min-w-0">
          <div className="text-sm sm:text-[15px] font-medium truncate">참가 신청 받는 중</div>
          <div className="text-[11px] text-[var(--ink-2)]">
            11월 24일부터 27일까지, 베이징
            {list.length > 0 && <span className="ml-2 text-[var(--green)] font-semibold">관심 {list.length}건</span>}
          </div>
        </div>
        <a href="#register" className="bj-btn bj-btn-green !px-5 !py-3 text-sm shrink-0">
          신청하기
        </a>
      </div>
    </div>
  );
}

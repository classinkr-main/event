"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 뷰포트에 들어오면 아래에서 살짝 기울어진 채 떠오르는 3D 리빌. delay(ms)로 스태거.
 * IntersectionObserver + 스크롤 시 사각형 검사 폴백(빠른 스크롤·IO 지연 대비).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    let io: IntersectionObserver | null = null;
    const show = () => {
      if (done) return;
      done = true;
      el.classList.add("in");
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) show();
    };

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) show();
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      io.observe(el);
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-3d ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

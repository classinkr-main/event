"use client";

import { useEffect, useRef } from "react";

/** 화면에 들어오면 0에서 value까지 올라가는 숫자. SSR/JS 미동작 시에는 최종값을 그대로 보여준다. */
export default function CountUp({
  value,
  prefix = "",
  duration = 1400,
  className = "",
}: {
  value: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const fmt = (n: number) => `${prefix}${n.toLocaleString("ko-KR")}`;
    el.textContent = fmt(0);
    let raf = 0;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      io.disconnect();
      window.removeEventListener("scroll", check);
      const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) run();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
      cancelAnimationFrame(raf);
      el.textContent = fmt(value);
    };
  }, [value, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("ko-KR")}
    </span>
  );
}

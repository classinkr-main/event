"use client";

import { useEffect, useRef, useState } from "react";

const ALPHABET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:";

/**
 * 공항 출발 안내판의 스플릿 플랩 글자 한 묶음.
 * 뷰포트에 들어오면 왼쪽 칸부터 글자가 돌다가 차례로 자리를 잡는다(한 번만, 모션 줄임 설정이면 바로 표시).
 */
export default function FlapText({ text, className = "" }: { text: string; className?: string }) {
  const target = text.toUpperCase();
  const [chars, setChars] = useState<string[]>(() => target.split(""));
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    // 칸마다 멈출 틱: 왼쪽부터 순서대로, 약간의 난수. 빈칸은 바로 멈춘다
    const stops = target.split("").map((c, i) => (c === " " ? 0 : 5 + i * 2 + Math.floor(Math.random() * 4)));
    const last = Math.max(...stops);
    let tick = 0;
    const id = window.setInterval(() => {
      tick += 1;
      setChars(target.split("").map((c, i) => (tick >= stops[i] ? c : ALPHABET[Math.floor(Math.random() * ALPHABET.length)])));
      if (tick >= last) window.clearInterval(id);
    }, 60);
    return () => window.clearInterval(id);
  }, [live, target]);

  return (
    <span ref={ref} className={`flap-row ${className}`} aria-label={text}>
      {chars.map((c, i) => (
        <span key={i} className={`flap${c === " " ? " flap-blank" : ""}`} aria-hidden>
          {c}
        </span>
      ))}
    </span>
  );
}

"use client";

import { useEffect } from "react";

/** 초청 링크 `?code=…#register`로 열린 뒤 전체 이동하면 브라우저가 앵커로 안 내려가는 경우 보정 */
export default function BjHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const t = window.setTimeout(() => {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}

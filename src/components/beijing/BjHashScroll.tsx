"use client";

import { useEffect } from "react";

/** `#register` 같은 앵커 링크로 열렸을 때 브라우저가 앵커로 안 내려가는 경우 보정 */
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

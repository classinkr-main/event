"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * 마우스 위치를 따라 기울어지는 3D 카드. 터치 기기에서는 틸트 대신 정지(또는 float 클래스로 부유).
 * 카드 자체가 이 요소이므로 className에 배경·라운드 클래스를 그대로 넘긴다(글레어가 radius를 상속).
 */
export default function Tilt3D({
  children,
  max = 8,
  glare = true,
  className = "",
  style,
}: {
  children: ReactNode;
  max?: number;
  glare?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - py) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    el.classList.add("is-tilting");
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.classList.remove("is-tilting");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt3d ${className}`}
      style={style}
    >
      {children}
      {glare && <span aria-hidden className="tilt3d-glare" />}
    </div>
  );
}

"use client";

import { useInterests } from "./interests";

/** 관심 일정 토글 — 신청서에 함께 담긴다 */
export default function InterestMark({ id, compact = false }: { id: string; compact?: boolean }) {
  const { has, toggle } = useInterests();
  const on = has(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={on}
      className={`bj-mark ${on ? "on" : ""} shrink-0`}
      title={on ? "관심 일정에서 빼기" : "관심 일정으로 표시"}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} aria-hidden>
        <path d="M6 3h12v18l-6-4-6 4V3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {!compact && (on ? "관심" : "관심 표시")}
    </button>
  );
}

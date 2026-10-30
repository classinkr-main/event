/** 출발지 ↔ 도착지 사이 직선 항로. 점선이 흐르고 가운데 비행기(SMIL 없이 CSS 점선 애니메이션만) */
export default function PlaneLine({ className = "" }: { className?: string }) {
  const plane = "M0,-4 L18,0 L0,4 L-9,2 L-18,8 L-22,8 L-16,1.2 L-22,0 L-16,-1.2 L-22,-8 L-18,-8 L-9,-2 Z";
  return (
    <svg viewBox="0 0 240 28" className={className} aria-hidden>
      <circle cx="5" cy="14" r="3.2" fill="currentColor" />
      <circle cx="5" cy="14" r="7" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <line x1="14" y1="14" x2="92" y2="14" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
      <line x1="14" y1="14" x2="92" y2="14" stroke="currentColor" strokeWidth="1.6" className="bj-arc" />
      <line x1="148" y1="14" x2="226" y2="14" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
      <line x1="148" y1="14" x2="226" y2="14" stroke="currentColor" strokeWidth="1.6" className="bj-arc" />
      <g transform="translate(120 14) scale(0.9)">
        <path d={plane} fill="currentColor" />
      </g>
      <circle cx="235" cy="14" r="3.2" fill="currentColor" />
      <circle cx="235" cy="14" r="7" fill="none" stroke="currentColor" strokeOpacity="0.3" />
    </svg>
  );
}

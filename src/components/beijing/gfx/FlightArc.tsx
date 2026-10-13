/** ICN → PEK 비행 경로. 점선이 흐르고 비행기가 경로를 따라 움직인다(SMIL) */
export default function FlightArc({ className = "", id = "bj-arc" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 600 230" className={className} aria-hidden>
      <defs>
        <path id={id} d="M40 190 Q300 0 560 190" />
      </defs>
      <use href={`#${id}`} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
      <use href={`#${id}`} fill="none" stroke="currentColor" strokeWidth="1.6" className="bj-arc" />
      <circle cx="40" cy="190" r="4.5" fill="currentColor" />
      <circle cx="40" cy="190" r="10" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="560" cy="190" r="4.5" fill="currentColor" />
      <circle cx="560" cy="190" r="10" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <g>
        <path
          d="M0,-4 L18,0 L0,4 L-9,2 L-18,8 L-22,8 L-16,1.2 L-22,0 L-16,-1.2 L-22,-8 L-18,-8 L-9,-2 Z"
          fill="currentColor"
        />
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.55 1">
          <mpath href={`#${id}`} />
        </animateMotion>
      </g>
      <text x="40" y="218" textAnchor="middle" fontSize="13" fontWeight="600" letterSpacing="2" fill="currentColor" className="mono">ICN</text>
      <text x="560" y="218" textAnchor="middle" fontSize="13" fontWeight="600" letterSpacing="2" fill="currentColor" className="mono">PEK</text>
    </svg>
  );
}

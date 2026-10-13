/** 붉은 인장 — 거친 가장자리(변위 필터) + 흰 테 + 글자 */
export default function Seal({ glyph, size = 56, className = "" }: { glyph: string; size?: number; className?: string }) {
  const id = `seal-${(glyph.codePointAt(0) ?? 0).toString(16)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        <rect x="5" y="5" width="90" height="90" fill="var(--seal)" />
        <rect x="12" y="12" width="76" height="76" fill="none" stroke="var(--paper)" strokeWidth="2.5" opacity="0.92" />
      </g>
      <text
        x="50"
        y="53"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="50"
        fontWeight="700"
        fill="var(--paper)"
        style={{ fontFamily: "var(--font-display), 'Hahmlet', serif" }}
      >
        {glyph}
      </text>
    </svg>
  );
}

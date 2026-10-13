type Props = {
  shape: "round" | "rect";
  color: "blue" | "red" | "green";
  top: string;
  center: string;
  bottom: string;
  rot?: number;
  delay?: number;
  className?: string;
};

/** 여권 입국 스탬프. 부모 Reveal 이 .in 이 되면 찍힌다 */
export default function PassportStamp({ shape, color, top, center, bottom, rot = -8, delay = 0, className = "" }: Props) {
  const stroke = color === "red" ? "var(--seal)" : color === "green" ? "var(--stamp-green)" : "var(--stamp-blue)";
  const id = `st-${center.replace(/\W/g, "")}-${shape}`;
  return (
    <svg
      viewBox="0 0 200 200"
      className={`stamp-anim ${className}`}
      style={{ ["--rot" as string]: `${rot}deg`, animationDelay: `${delay}ms`, color: stroke }}
      aria-hidden
    >
      <defs>
        <path id={`${id}-top`} d="M28 100 A72 72 0 0 1 172 100" />
        <path id={`${id}-bot`} d="M172 100 A72 72 0 0 1 28 100" />
        <filter id={`${id}-r`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>
      </defs>
      <g filter={`url(#${id}-r)`} fill="none" stroke="currentColor">
        {shape === "round" ? (
          <>
            <circle cx="100" cy="100" r="93" strokeWidth="3.2" />
            <circle cx="100" cy="100" r="85" strokeWidth="1.1" />
            <circle cx="100" cy="100" r="55" strokeWidth="1.1" />
          </>
        ) : (
          <>
            <rect x="8" y="32" width="184" height="136" strokeWidth="3.2" />
            <rect x="15" y="39" width="170" height="122" strokeWidth="1.1" />
            <line x1="15" y1="70" x2="185" y2="70" strokeWidth="1.1" />
            <line x1="15" y1="130" x2="185" y2="130" strokeWidth="1.1" />
          </>
        )}
      </g>
      <g fill="currentColor" className="mono" fontWeight="600">
        {shape === "round" ? (
          <>
            <text fontSize="12.5" letterSpacing="2.4">
              <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">{top}</textPath>
            </text>
            <text fontSize="12.5" letterSpacing="2.4">
              <textPath href={`#${id}-bot`} startOffset="50%" textAnchor="middle">{bottom}</textPath>
            </text>
            <text x="100" y="97" textAnchor="middle" fontSize="19" fontWeight="700" letterSpacing="1">{center}</text>
            <text x="100" y="116" textAnchor="middle" fontSize="9.5" letterSpacing="2.2">CLASSIN MEETS</text>
          </>
        ) : (
          <>
            <text x="100" y="58" textAnchor="middle" fontSize="12.5" letterSpacing="2.4">{top}</text>
            <text x="100" y="107" textAnchor="middle" fontSize="22" fontWeight="700" letterSpacing="1">{center}</text>
            <text x="100" y="151" textAnchor="middle" fontSize="12.5" letterSpacing="2.4">{bottom}</text>
          </>
        )}
      </g>
    </svg>
  );
}

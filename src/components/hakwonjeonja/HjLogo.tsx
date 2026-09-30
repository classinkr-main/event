/** 학원전자 마크(네모 안 ㅎ·ㅈ) — 공식 파일이 없어 참조 이미지의 마크를 벡터로 재현 */
export function HakwonjeonjaMark({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-label="학원전자"
      role="img"
    >
      <rect x="1.5" y="1.5" width="37" height="37" rx="3" stroke="currentColor" strokeWidth="2.2" />
      <text
        x="20"
        y="17.5"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="800"
        fontSize="17"
        fill="currentColor"
      >
        ㅎ
      </text>
      <text
        x="20"
        y="34"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="800"
        fontSize="17"
        fill="currentColor"
      >
        ㅈ
      </text>
    </svg>
  );
}

/** 헤더·푸터용 공동 브랜드 라인: ClassIn × [학원전자 마크] 학원전자 */
export default function HjBrand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`${compact ? "text-sm" : "text-base sm:text-lg"} font-bold tracking-tight`}>ClassIn</span>
      <span className="text-white/35 text-xs">×</span>
      <HakwonjeonjaMark size={compact ? 18 : 22} className="text-white/85" />
      <span className={`${compact ? "text-xs" : "text-xs sm:text-sm"} text-white/70 font-medium`}>학원전자</span>
    </span>
  );
}

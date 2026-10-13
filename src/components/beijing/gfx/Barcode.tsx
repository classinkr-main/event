/** 시드 기반 의사난수 바코드(Code 128 느낌). 컨테이너 폭에 맞춰 늘어난다 */
export default function Barcode({ seed, height = 40, className = "" }: { seed: string; height?: number; className?: string }) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const rnd = () => {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    return (h >>> 16) & 0x7fff;
  };
  const total = 120;
  const bars: { x: number; w: number }[] = [{ x: 0, w: 1.6 }, { x: 2.4, w: 0.8 }];
  let x = 4.2;
  while (x < total - 6) {
    const w = 0.7 + (rnd() % 3) * 0.75;
    bars.push({ x, w });
    x += w + 0.7 + (rnd() % 3) * 0.7;
  }
  bars.push({ x: total - 3.6, w: 0.8 }, { x: total - 1.8, w: 1.8 });
  return (
    <svg viewBox={`0 0 ${total} ${height}`} preserveAspectRatio="none" className={className} aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={height} fill="currentColor" />
      ))}
    </svg>
  );
}

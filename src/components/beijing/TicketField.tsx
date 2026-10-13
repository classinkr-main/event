/** 탑승권 칸: 작은 라벨 + 값 */
export default function TicketField({ k, v, big = false, right = false }: { k: string; v: string; big?: boolean; right?: boolean }) {
  return (
    <div className={right ? "text-right" : ""}>
      <div className="mono text-[10px] text-[var(--ink-3)]">{k}</div>
      <div className={`mt-0.5 font-bold ${big ? "serif text-3xl sm:text-4xl leading-none" : "text-sm sm:text-[15px]"}`}>{v}</div>
    </div>
  );
}

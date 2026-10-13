/** 네 귀퉁이 브래킷 — 부모는 position: relative */
export default function Corners({ className = "" }: { className?: string }) {
  return (
    <>
      <span className={`bj-corner tl ${className}`} aria-hidden />
      <span className={`bj-corner tr ${className}`} aria-hidden />
      <span className={`bj-corner bl ${className}`} aria-hidden />
      <span className={`bj-corner br ${className}`} aria-hidden />
    </>
  );
}

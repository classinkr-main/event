import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import { NOTES } from "./data";

/** 떠나기 전 메모 */
export default function BjNotes() {
  return (
    <section id="notes" className="relative py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="paper paper-2 p-7 sm:p-10 -rotate-[0.6deg]">
            <h2 className="serif text-2xl sm:text-3xl font-bold">떠나기 전 메모</h2>
            <dl className="mt-5">
              {NOTES.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[3.5rem_1fr] gap-4 py-3 border-b border-[var(--paper-line)]">
                  <dt className="font-semibold text-sm pt-0.5">{k}</dt>
                  <dd className="text-sm sm:text-[15px] text-[var(--ink-2)] leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

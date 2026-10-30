import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Split from "./Split";
import { NOTES } from "./data";

/** 떠나기 전 메모 */
export default function BjNotes() {
  return (
    <Split id="notes" title="떠나기 전 메모">
      <Reveal>
        <dl className="border-t border-[var(--line-2)]">
          {NOTES.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[4rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 py-4 sm:py-5 border-b border-[var(--line)] last:border-[var(--line-2)]">
              <dt className="font-medium">{k}</dt>
              <dd className="text-[15px] sm:text-base text-[var(--ink-2)] leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Split>
  );
}

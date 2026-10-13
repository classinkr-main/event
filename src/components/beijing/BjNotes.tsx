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
            <div key={k} className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 py-5 border-b border-[var(--line)]">
              <dt className="font-medium">{k}</dt>
              <dd className="text-[15px] sm:text-lg text-[var(--ink-2)] leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Split>
  );
}

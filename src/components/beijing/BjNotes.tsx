import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Split from "./Split";
import { NOTES } from "./data";

/** 떠나기 전 메모 */
export default function BjNotes() {
  return (
    <Split id="notes" title="떠나기 전 메모">
      <Reveal>
        <dl className="glass rounded-3xl px-5 sm:px-7">
          {NOTES.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[4rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 py-4 border-b border-[var(--line)] last:border-b-0">
              <dt className="font-medium">{k}</dt>
              <dd className="text-[15px] sm:text-base text-[var(--ink-2)] leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Split>
  );
}

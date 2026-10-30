import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import Seal from "./gfx/Seal";
import Split from "./Split";
import { ORGS, type Org } from "./data";

const PRIORITY = ["발표", "성과", "규모", "강사진", "현재", "전환", "특징"];
function pick(rows: Org["rows"]): Org["rows"] {
  const out: Org["rows"] = [];
  for (const label of PRIORITY) {
    const r = rows.find((x) => x[0] === label);
    if (r) out.push(r);
    if (out.length === 2) break;
  }
  return out;
}

/** 기관·연사 — 누르지 않아도 바로 보이는 명함 */
export default function BjCards() {
  return (
    <Split id="people" title="만나는 사람들" lead="세션과 방문에서 만나는 여섯 곳." wide>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 sm:gap-y-10">
        {ORGS.map((o, i) => (
          <Reveal key={o.name} delay={(i % 3) * 60} className="h-full">
            <div className="border-t border-[var(--line-2)] pt-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <Seal glyph={o.glyph} size={48} />
                <span className="text-xs text-[var(--ink-3)] text-right pt-1">{o.when}</span>
              </div>
              <div className="mt-4 text-xl font-medium tracking-tight leading-tight">{o.name}</div>
              {o.cn && <div className="text-xs text-[var(--ink-3)] mt-0.5">{o.cn}</div>}
              <p className="mt-3 text-[13px] text-[var(--ink-2)] leading-relaxed">{o.summary}</p>
              <dl className="mt-4 pt-3 border-t border-[var(--line)] space-y-2">
                {pick(o.rows).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[2.6rem_1fr] gap-2">
                    <dt className="text-[11px] text-[var(--ink-3)] pt-0.5">{k}</dt>
                    <dd className="text-[12.5px] leading-relaxed text-[var(--ink-2)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-x-8 gap-y-8">
        <Reveal>
          <div className="border-t border-[var(--line-2)] pt-5 h-full flex gap-4">
            <Seal glyph="會" size={48} className="shrink-0" />
            <div>
              <div className="text-xl font-medium tracking-tight">GET 교육기술 대회</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">이번 방문의 공식 무대, 11월 25일</div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-2)]">중국 교육기술 연례 대표 행사. ClassIn은 특별 세션과 전시로 참여합니다.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="border-t border-[var(--line-2)] pt-5 h-full flex gap-4">
            <Seal glyph="大" size={48} className="shrink-0" />
            <div>
              <div className="text-xl font-medium tracking-tight">베이징 협력 대학</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">11월 27일 오전 방문</div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-2)]">산학 협력과 인재 양성을 주제로 교류합니다. 학교명은 최종안에서 확정됩니다.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Split>
  );
}

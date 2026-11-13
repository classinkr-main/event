import Image from "next/image";
import Reveal from "@/components/hakwonjeonja/fx/Reveal";
import InterestMark from "./InterestMark";
import Split from "./Split";
import { DINNER, FORUM, GET_EVENT, GET_RECAP, KEYNOTE, TALKS } from "./data";

function Avatar({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative shrink-0 rounded-full overflow-hidden bg-white/10 ring-1 ring-white/15 ${className}`}>
      <Image src={src} alt={alt} fill sizes="80px" className="object-cover" />
    </div>
  );
}

function Label({ ko, zh }: { ko: string; zh: string }) {
  return (
    <div className="text-xs text-[var(--ink-3)] flex items-center gap-2">
      <span className="zh-serif text-[var(--accent)] font-bold">{zh}</span>
      <span>{ko}</span>
    </div>
  );
}

/** 11/25 GET 대회 — 메인 포럼 발표, ClassIn 분과 포럼(共潮生), 본사 교류 만찬 */
export default function BjProgram() {
  return (
    <Split
      id="program"
      title={
        <>
          11월 25일,
          <br />
          GET 대회
        </>
      }
      lead="오전 메인 포럼에 이어 오후엔 ClassIn이 여는 분과 포럼, 저녁엔 ClassIn 본사에서 교류 만찬이 이어집니다."
      band
    >
      <Reveal>
        <div className="border-t border-[var(--line-2)] pt-5">
          <div className="text-sm text-[var(--ink-2)]">{GET_EVENT.name}</div>
          <div className="mt-0.5 text-xs text-[var(--ink-3)]">
            {GET_EVENT.dates} · {GET_EVENT.venue} <span className="whitespace-nowrap">({GET_EVENT.venueCn})</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
            {GET_RECAP.map((p) => (
              <div key={p.src} className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-white/5">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--ink-3)]">2025년 GET 대회</p>
        </div>
      </Reveal>

      {/* 메인 포럼 */}
      <Reveal>
        <div className="mt-10 sm:mt-12">
          <Label zh="主会场" ko="메인 포럼" />
          <div className="mt-3 grid grid-cols-[3.5rem_1fr] sm:grid-cols-[4.5rem_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 py-5 border-y border-[var(--line-2)] items-start">
            <Avatar src={KEYNOTE.photo} alt={KEYNOTE.name} className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem]" />
            <div className="min-w-0">
              <h3 className="text-lg sm:text-2xl font-medium leading-snug tracking-tight">{KEYNOTE.title}</h3>
              <p className="mt-2 text-sm">
                <span className="font-medium">{KEYNOTE.name}</span> <span className="text-xs text-[var(--ink-3)]">{KEYNOTE.cn}</span>
              </p>
              <p className="text-[13px] text-[var(--ink-2)] leading-relaxed">{KEYNOTE.roles.join(" · ")}</p>
            </div>
            <div className="col-start-2 sm:col-start-3 pt-0.5">
              <InterestMark id={KEYNOTE.id} compact />
            </div>
          </div>
        </div>
      </Reveal>

      {/* 분과 포럼 */}
      <Reveal>
        <div className="mt-12 sm:mt-14 flex items-end justify-between gap-4">
          <div>
            <Label zh="分论坛" ko={`분과 포럼 · ${FORUM.time}`} />
            <div className="mt-2 flex items-baseline gap-3 flex-wrap">
              <span className="zh-serif text-2xl sm:text-3xl font-bold">{FORUM.cn}</span>
              <span className="text-[15px] sm:text-lg font-medium">{FORUM.name}</span>
            </div>
          </div>
          <InterestMark id="d2-session" compact />
        </div>
      </Reveal>
      <ol className="mt-4 border-t border-[var(--line-2)]">
        {TALKS.map((t, i) => (
          <Reveal key={t.name} delay={i * 30}>
            <li className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 py-5 sm:py-6 border-b border-[var(--line)] items-start">
              <Avatar src={t.photo} alt={t.name} className="w-12 h-12 sm:w-16 sm:h-16" />
              <div className="min-w-0">
                <div className="mono text-xs text-[var(--accent)] tabular-nums">
                  {t.start}–{t.end}
                </div>
                <h3 className="mt-1 text-[17px] sm:text-xl font-medium leading-snug tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm">
                  <span className="font-medium">{t.name}</span> <span className="text-xs text-[var(--ink-3)]">{t.cn}</span>
                </p>
                <ul className="text-[13px] text-[var(--ink-2)] leading-relaxed">
                  {t.roles.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              {t.id && (
                <div className="col-start-2 sm:col-start-3 pt-0.5">
                  <InterestMark id={t.id} compact />
                </div>
              )}
            </li>
          </Reveal>
        ))}
      </ol>

      {/* 교류 만찬 */}
      <Reveal>
        <div className="mt-12 sm:mt-14">
          <Label zh="晚宴" ko="교류 만찬" />
          <div className="mt-3 py-5 border-y border-[var(--line-2)]">
            <div className="mono text-xs text-[var(--accent)] tabular-nums">{DINNER.time}</div>
            <h3 className="mt-1 text-lg sm:text-2xl font-medium leading-snug tracking-tight">{DINNER.place}에서 함께하는 저녁</h3>
            <p className="mt-1 text-sm text-[var(--ink-2)]">{DINNER.placeSub}</p>
            <ul className="mt-3 pt-3 border-t border-[var(--line)] space-y-1 text-[13px] sm:text-sm text-[var(--ink-2)] leading-relaxed">
              {DINNER.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-[var(--accent)]" aria-hidden>
                    ·
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Split>
  );
}

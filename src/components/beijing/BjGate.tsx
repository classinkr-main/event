"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BjVisitTracker from "./BjVisitTracker";
import Barcode from "./gfx/Barcode";
import FlightArc from "./gfx/FlightArc";
import TicketField from "./TicketField";
import { fontVars } from "./fonts";

type Status = "idle" | "checking" | "admitted" | "error";
const VERIFIED_FLAG = "bj-gate-verified";

/** 초청 코드 게이트 = 종이 탑승권. 통과하면 ADMITTED 스탬프 후 전체 이동, 서버가 쿠키를 보고 본문을 렌더 */
export default function BjGate({ prefill }: { prefill?: string }) {
  const [code, setCode] = useState(prefill ?? "");
  const [status, setStatus] = useState<Status>(prefill ? "checking" : "idle");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);

  useEffect(() => {
    if (prefill) return;
    let flagged = false;
    try {
      flagged = !!sessionStorage.getItem(VERIFIED_FLAG);
      if (flagged) sessionStorage.removeItem(VERIFIED_FLAG);
    } catch {
      // 무시
    }
    if (!flagged) return;
    const t = window.setTimeout(() => {
      setError("코드는 확인됐지만 페이지를 열지 못했습니다. 브라우저 쿠키 설정을 확인한 뒤 다시 입력해 주세요.");
      setStatus("error");
    }, 0);
    return () => window.clearTimeout(t);
  }, [prefill]);

  const verify = useCallback(async (value: string) => {
    setStatus("checking");
    setError("");
    try {
      const res = await fetch("/api/beijing/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: value }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "확인 중 문제가 발생했습니다.");
      }
      setStatus("admitted");
      try {
        sessionStorage.setItem(VERIFIED_FLAG, "1");
      } catch {
        // 무시
      }
      window.setTimeout(() => {
        window.location.replace(window.location.pathname + window.location.hash);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
      setStatus("error");
      setShake((n) => n + 1);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (prefill && !autoRan.current) {
      autoRan.current = true;
      void verify(prefill);
    }
  }, [prefill, verify]);

  useEffect(() => {
    const el = passRef.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1400px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    };
    const reset = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "checking" || status === "admitted") return;
    if (!code.trim()) {
      setError("초청 코드를 입력해 주세요.");
      setStatus("error");
      setShake((n) => n + 1);
      return;
    }
    void verify(code);
  }

  const busy = status === "checking" || status === "admitted";

  return (
    <main className={`theme-bj ${fontVars} relative min-h-[100svh] flex items-center justify-center overflow-hidden`}>
      <BjVisitTracker path="/beijing/gate" />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/beijing-skyline.jpg')" }} />
        <div className="absolute inset-0 bg-[#0b0d12]/78" />
        <div className="absolute inset-0 bj-lattice" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0d12]/30 to-[#0b0d12]" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div ref={passRef} className="transition-transform duration-300 ease-out" style={{ transformStyle: "preserve-3d" }}>
          <div className="paper grid grid-cols-1 md:grid-cols-[1.75fr_1fr]">
            {/* 본권 */}
            <div className="relative">
              <div className="flex items-center justify-between bg-[var(--ink)] text-[var(--paper)] px-6 sm:px-9 py-3">
                <span className="font-bold tracking-tight text-base sm:text-lg">
                  ClassIn <span className="serif font-medium">Meets</span>
                </span>
                <span className="mono text-[10px] sm:text-[11px] opacity-85">BOARDING PASS / 탑승권</span>
              </div>

              <div className="p-6 sm:p-9">
                <div className="grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <div className="mono text-[10px] text-[var(--ink-3)]">PASSENGER / 탑승객</div>
                    <div className="serif mt-1 text-2xl sm:text-3xl font-bold">초청받으신 원장님</div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-[10px] text-[var(--ink-3)]">CLASS</div>
                    <div className="mt-1 font-bold text-sm sm:text-base">초청</div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-7 grid grid-cols-[auto_1fr_auto] items-end gap-3 sm:gap-6">
                  <div>
                    <div className="mono text-[10px] text-[var(--ink-3)]">FROM</div>
                    <div className="serif text-4xl sm:text-5xl font-bold leading-none mt-1">ICN</div>
                    <div className="text-xs text-[var(--ink-2)] mt-1.5">서울 인천</div>
                  </div>
                  <FlightArc className="w-full h-auto text-[var(--ink)] -mb-2" id="gate-arc" />
                  <div className="text-right">
                    <div className="mono text-[10px] text-[var(--ink-3)]">TO</div>
                    <div className="serif text-4xl sm:text-5xl font-bold leading-none mt-1">PEK</div>
                    <div className="text-xs text-[var(--ink-2)] mt-1.5">베이징 서우두</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-y-4 gap-x-4 border-t border-[var(--paper-line)] pt-4">
                  <TicketField k="FLIGHT" v="CM 1124" />
                  <TicketField k="DATE" v="24 NOV 2026" />
                  <TicketField k="BOARDING" v="저녁 도착" />
                  <TicketField k="GATE" v="GET 2026" />
                  <TicketField k="RETURN" v="27 NOV" />
                </div>

                <Barcode seed="classin-meets-beijing-2026" height={44} className="mt-6 h-11 w-full text-[var(--ink)]" />
                <div className="mono mt-1.5 text-[10px] text-[var(--ink-3)] flex justify-between">
                  <span>CM1124 ICNPEK 24NOV</span>
                  <span>ETKT 2026 1124</span>
                </div>

                {status === "admitted" && (
                  <div className="absolute right-6 sm:right-10 top-16 sm:top-20">
                    <span className="bj-stamp text-xl sm:text-3xl">Admitted</span>
                  </div>
                )}
              </div>
            </div>

            {/* 스텁 */}
            <div className="relative border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[var(--paper-line-2)]">
              <span className="notch hidden md:block -top-[11px] left-0 -translate-x-1/2" aria-hidden />
              <span className="notch hidden md:block -bottom-[11px] left-0 -translate-x-1/2" aria-hidden />
              <span className="notch md:hidden top-0 -left-[11px] -translate-y-1/2" aria-hidden />
              <span className="notch md:hidden top-0 -right-[11px] -translate-y-1/2" aria-hidden />

              <div className="flex items-center justify-between bg-[var(--ink)] text-[var(--paper)] px-5 sm:px-7 py-3">
                <span className="mono text-[10px]">STUB</span>
                <span className="mono text-[10px]">CM 1124</span>
              </div>

              <div className="p-5 sm:p-7 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <TicketField k="FROM" v="ICN" big />
                  <TicketField k="TO" v="PEK" big right />
                  <TicketField k="DATE" v="24 NOV" />
                  <TicketField k="GATE" v="GET" right />
                </div>

                <form onSubmit={onSubmit} key={shake}>
                  <label htmlFor="invite-code" className="mono block text-[10px] text-[var(--ink-3)]">
                    INVITATION CODE / 초청 코드
                  </label>
                  <div className={shake ? "bj-shake" : ""}>
                    <input
                      ref={inputRef}
                      id="invite-code"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      autoComplete="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      placeholder="코드를 입력하세요"
                      disabled={busy}
                      className="field mono !text-lg uppercase !tracking-[0.16em] font-semibold placeholder:!tracking-normal placeholder:normal-case placeholder:font-normal placeholder:text-sm disabled:opacity-60"
                    />
                  </div>
                  {status === "error" && error && <p className="mt-2.5 text-xs text-[var(--seal)] leading-relaxed">{error}</p>}
                  <button type="submit" disabled={busy} className="bj-btn bj-btn-seal mt-5 w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "checking" ? "확인 중..." : status === "admitted" ? "입장합니다" : "초청장 열기"}
                  </button>
                </form>

                <div>
                  <Barcode seed="stub-1124-pek" height={36} className="h-9 w-full text-[var(--ink)]" />
                  <div className="mono mt-1 text-[10px] text-[var(--ink-3)]">2026 1124 PEK</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--snow-3)] leading-relaxed">
          초청받으신 원장님께만 공개되는 페이지입니다. 코드를 받지 못하셨다면 ClassIn Korea 02-6958-8566으로 연락해 주세요.
        </p>
      </div>
    </main>
  );
}

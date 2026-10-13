"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BjVisitTracker from "./BjVisitTracker";
import Corners from "./Corners";
import { serif } from "./fonts";

type Status = "idle" | "checking" | "admitted" | "error";

/** 코드 확인 직후 전체 이동했는데도 게이트가 다시 보이면(쿠키 미저장) 안내하기 위한 표식 */
const VERIFIED_FLAG = "bj-gate-verified";

/** 초청 코드 게이트 = 탑승권. 통과하면 ADMITTED 스탬프 후 전체 이동, 서버가 쿠키를 보고 본문을 렌더 */
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
      // 스탬프를 보여준 뒤 쿠키가 실린 상태로 전체 이동(?code= 는 떼고 #앵커는 유지)
      window.setTimeout(() => {
        window.location.replace(window.location.pathname + window.location.hash);
      }, 950);
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

  // 마우스 따라 살짝 기우는 탑승권
  useEffect(() => {
    const el = passRef.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
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
    <main className={`theme-bj ${serif.variable} relative min-h-[100svh] flex items-center justify-center overflow-hidden`}>
      <BjVisitTracker path="/beijing/gate" />

      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/beijing-skyline.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#07080b]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080b]/20 via-[#07080b]/55 to-[#07080b]" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <p className="mono text-[10px] sm:text-[11px] text-[var(--ink-3)] text-center mb-5">
          CLASSIN MEETS · BEIJING · INVITATION
        </p>

        <div
          ref={passRef}
          className="relative transition-transform duration-300 ease-out will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative grid grid-cols-1 md:grid-cols-[1.6fr_1fr] bg-[#0b0d13]/92 backdrop-blur-md border border-[var(--bj-line)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <Corners />

            {/* 좌: 탑승권 본문 */}
            <div className="relative p-7 sm:p-10 md:p-12">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">BOARDING PASS</div>
                  <div className="mt-1.5 text-sm text-[var(--ink-2)]">학원 원장님 초청 · 베이징 탐방</div>
                </div>
                <div className="text-right">
                  <div className="mono text-[10px] text-[var(--ink-3)]">DATE</div>
                  <div className="mt-1.5 text-sm font-semibold">24 – 27 NOV 2026</div>
                </div>
              </div>

              <h1 className="serif mt-8 sm:mt-10 text-[2.1rem] sm:text-5xl md:text-[3.4rem] leading-[1.08] font-semibold">
                AI 시대, 학원의
                <br />
                다음 모습을 직접 보는 <span className="text-[var(--bj-red)]">3일</span>
              </h1>

              <div className="mt-8 sm:mt-10 flex items-end gap-4 sm:gap-6">
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">FROM</div>
                  <div className="serif text-3xl sm:text-4xl font-semibold leading-none mt-1">ICN</div>
                  <div className="text-xs text-[var(--ink-2)] mt-1">서울</div>
                </div>
                <div className="flex-1 relative h-6 mb-5">
                  <div className="absolute inset-x-0 top-1/2 bj-perf-h" />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute left-1/2 -translate-x-1/2 -top-0.5 text-[var(--ink)]"
                    aria-hidden
                  >
                    <path d="M2 16l20-8-6 10-4-3-5 2 2-5-7-4z" fill="currentColor" opacity="0.9" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="mono text-[10px] text-[var(--ink-3)]">TO</div>
                  <div className="serif text-3xl sm:text-4xl font-semibold leading-none mt-1">PEK</div>
                  <div className="text-xs text-[var(--ink-2)] mt-1">베이징</div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[var(--bj-line)] pt-5">
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">GATE</div>
                  <div className="mt-1 text-sm font-semibold">GET 2026</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">VISIT</div>
                  <div className="mt-1 text-sm font-semibold">ClassIn 본사</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">CLASS</div>
                  <div className="mt-1 text-sm font-semibold">초청</div>
                </div>
              </div>

              {status === "admitted" && (
                <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-10">
                  <span className="bj-stamp text-lg sm:text-2xl">Admitted</span>
                </div>
              )}
            </div>

            {/* 우: 스텁 = 코드 입력 (절취선은 스텁 안쪽 가장자리에 절대 배치) */}
            <div className="relative p-7 sm:p-10 md:pl-12 flex flex-col justify-between">
              <div className="hidden md:block absolute inset-y-4 left-0 bj-perf-v" aria-hidden />
              <span className="hidden md:block absolute -top-[9px] left-0 -translate-x-1/2 w-[18px] h-[18px] rounded-full bg-[#07080b]" aria-hidden />
              <span className="hidden md:block absolute -bottom-[9px] left-0 -translate-x-1/2 w-[18px] h-[18px] rounded-full bg-[#07080b]" aria-hidden />
              <div className="md:hidden absolute top-0 left-6 right-6 bj-perf-h" aria-hidden />
              <span className="md:hidden absolute top-0 -left-[9px] -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-[#07080b]" aria-hidden />
              <span className="md:hidden absolute top-0 -right-[9px] -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-[#07080b]" aria-hidden />
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">INVITATION CODE</div>
                <form onSubmit={onSubmit} className="mt-3" key={shake}>
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
                      placeholder="코드 입력"
                      disabled={busy}
                      className="field mono !text-lg sm:!text-xl uppercase !tracking-[0.18em] font-semibold placeholder:!tracking-normal placeholder:normal-case placeholder:font-normal placeholder:text-base disabled:opacity-60"
                    />
                  </div>
                  {status === "error" && error && (
                    <p className="mt-3 text-xs sm:text-sm text-[#ffb3a0] leading-relaxed">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={busy}
                    className="bj-btn bj-btn-red mt-6 w-full text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "checking" ? "확인 중..." : status === "admitted" ? "입장합니다" : "초청장 열기"}
                    {!busy && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-8">
                <div className="bj-barcode h-10 w-full" aria-hidden />
                <div className="mono mt-2 text-[10px] text-[var(--ink-3)] flex justify-between">
                  <span>CLASSIN</span>
                  <span>2026 · 1124 · PEK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] sm:text-xs text-[var(--ink-3)] leading-relaxed">
          본 행사는 초청받으신 원장님께만 공개됩니다. 코드를 받지 못하셨다면 ClassIn Korea 02-6958-8566
        </p>
      </div>
    </main>
  );
}

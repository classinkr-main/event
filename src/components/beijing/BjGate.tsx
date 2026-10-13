"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BjVisitTracker from "./BjVisitTracker";

type Status = "idle" | "checking" | "error";

/** 코드 확인 직후 전체 이동했는데도 게이트가 다시 보이면(쿠키 미저장) 안내하기 위한 표식 */
const VERIFIED_FLAG = "bj-gate-verified";

/** 초청 코드 게이트 — 통과하면 서버가 쿠키를 보고 본문을 렌더한다 */
export default function BjGate({ prefill }: { prefill?: string }) {
  const [code, setCode] = useState(prefill ?? "");
  const [status, setStatus] = useState<Status>(prefill ? "checking" : "idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const autoRan = useRef(false);

  useEffect(() => {
    if (prefill) return;
    let flagged = false;
    try {
      flagged = !!sessionStorage.getItem(VERIFIED_FLAG);
      if (flagged) sessionStorage.removeItem(VERIFIED_FLAG);
    } catch {
      // 스토리지 차단 환경은 무시
    }
    if (!flagged) return;
    // 하이드레이션 직후 한 틱 뒤에 안내(동기 setState 회피)
    const t = window.setTimeout(() => {
      setError(
        "코드는 확인됐지만 페이지를 열지 못했습니다. 브라우저 쿠키 설정을 확인한 뒤 다시 입력해 주세요."
      );
      setStatus("error");
    }, 0);
    return () => window.clearTimeout(t);
  }, [prefill]);

  const verify = useCallback(
    async (value: string) => {
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
        // 쿠키가 실린 상태로 서버가 본문을 렌더하도록 전체 이동(?code= 는 떼고 #앵커는 유지)
        try {
          sessionStorage.setItem(VERIFIED_FLAG, "1");
        } catch {
          // 무시
        }
        window.location.replace(window.location.pathname + window.location.hash);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
        setStatus("error");
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    []
  );

  useEffect(() => {
    if (prefill && !autoRan.current) {
      autoRan.current = true;
      void verify(prefill);
    }
  }, [prefill, verify]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!code.trim()) {
      setError("초청 코드를 입력해 주세요.");
      setStatus("error");
      return;
    }
    void verify(code);
  }

  return (
    <main className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <BjVisitTracker path="/beijing/gate" />

      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/beijing-skyline.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#02060f]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060f]/30 via-[#02060f]/60 to-[#02060f]" />
      </div>

      <div className="relative w-full max-w-lg mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <div className="reveal glass-strong rounded-3xl p-7 sm:p-10 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] text-white/50">
            CLASSIN MEETS · BEIJING
          </p>
          <h1 className="mt-5 font-bold tracking-tight leading-none">
            <span className="block text-4xl sm:text-5xl">
              <span className="text-white">ClassIn</span>{" "}
              <span className="text-gradient">Meets</span>
            </span>
          </h1>
          <div className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-4 py-1.5">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-white">
              INVITATION
            </span>
          </div>

          <p className="mt-6 text-base sm:text-lg text-white/80 font-light">
            AI 시대, 학원의 다음 모습을 직접 보는 3일
          </p>
          <p className="mt-1.5 text-sm text-white/50">
            2026. 11. 24 (화) – 11. 27 (금) · 중국 베이징
          </p>

          <form onSubmit={onSubmit} className="mt-8 sm:mt-10 text-left">
            <label
              htmlFor="invite-code"
              className="block text-sm text-white/70 mb-2 font-medium"
            >
              초청 코드
            </label>
            <input
              ref={inputRef}
              id="invite-code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="안내받으신 코드를 입력하세요"
              disabled={status === "checking"}
              className="field text-center uppercase tracking-[0.3em] font-semibold placeholder:tracking-normal placeholder:normal-case placeholder:font-normal disabled:opacity-60"
            />
            {status === "error" && error && (
              <p className="mt-3 text-sm text-orange-200">{error}</p>
            )}
            <button
              type="submit"
              disabled={status === "checking"}
              className="press mt-5 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "checking" ? "확인 중..." : "초청장 열기"}
            </button>
          </form>

          <p className="mt-7 text-xs text-white/40 leading-relaxed">
            본 행사는 초청받으신 원장님께만 공개됩니다.
            <br />
            코드를 받지 못하셨다면 ClassIn Korea(02-6958-8566)로 문의해 주세요.
          </p>
        </div>
      </div>
    </main>
  );
}

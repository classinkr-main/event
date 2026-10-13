"use client";

import { useState } from "react";
import { getStoredChannel } from "@/lib/inflow";
import { formatKoreanPhone } from "@/lib/phone";

type Status = "idle" | "submitting" | "success" | "error";

type SubmittedData = {
  name: string;
  organization: string;
  position: string;
  phone: string;
  email: string;
  party: string;
  arrival: string;
  message: string;
};

const PARTY_OPTIONS = ["1명 (본인)", "2명", "3명 이상"];
const ARRIVAL_OPTIONS = ["11/24 (화) 저녁", "11/25 (수) 오전", "미정"];

export default function BjRegisterForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [arrival, setArrival] = useState(ARRIVAL_OPTIONS[2]);
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    if (payload.source) payload.source = `${payload.source}/${getStoredChannel()}`;

    try {
      const res = await fetch("/api/beijing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "신청 처리 중 문제가 발생했습니다.");
      }
      setSubmitted(payload as unknown as SubmittedData);
      setStatus("success");
      form.reset();
      setPhone("");
      setArrival(ARRIVAL_OPTIONS[2]);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "알 수 없는 오류");
      setStatus("error");
    }
  }

  if (status === "success") {
    const summary: { label: string; value: string }[] = submitted
      ? [
          { label: "이름", value: submitted.name },
          { label: "소속", value: submitted.organization },
          { label: "직책", value: submitted.position },
          { label: "연락처", value: submitted.phone },
          { label: "이메일", value: submitted.email },
          { label: "참가 인원", value: submitted.party || "-" },
          { label: "도착 예정", value: submitted.arrival || "-" },
          ...(submitted.message ? [{ label: "요청사항", value: submitted.message }] : []),
        ]
      : [];

    return (
      <div className="glass-strong rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-center">
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center mb-5 sm:mb-6">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">신청이 접수되었습니다</h3>
        <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">
          항공·숙박과 세부 일정 안내를 위해
          <br />
          담당자가 순차적으로 개별 연락드릴 예정입니다.
        </p>

        {summary.length > 0 && (
          <div className="mt-8 sm:mt-10 text-left">
            <div className="text-xs tracking-[0.25em] text-white/40 mb-3 sm:mb-4 text-center">
              입력하신 정보를 확인해주세요
            </div>
            <dl className="rounded-2xl border border-white/10 bg-white/[0.03] divide-y divide-white/5 overflow-hidden">
              {summary.map((item) => (
                <div key={item.label} className="flex items-start gap-4 px-4 sm:px-5 py-3">
                  <dt className="w-20 sm:w-24 shrink-0 text-xs sm:text-sm text-white/50">{item.label}</dt>
                  <dd className="flex-1 text-sm sm:text-base text-white/90 break-all whitespace-pre-line">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <p className="mt-8 sm:mt-10 text-base sm:text-lg font-medium text-white/80">
          베이징에서 뵙겠습니다.
        </p>

        <button
          onClick={() => {
            setStatus("idle");
            setSubmitted(null);
          }}
          className="mt-6 text-xs sm:text-sm text-white/40 hover:text-white underline underline-offset-4 transition-colors"
        >
          새 신청서 작성
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-10">
      {source && <input type="hidden" name="source" value={source} />}
      <input type="hidden" name="session" value="ClassIn Meets 베이징 · 11/24–27" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="이름" name="name" placeholder="홍길동" required />
        <Field label="학원명 / 기관" name="organization" placeholder="○○학원" required />
        <Field label="직책" name="position" placeholder="원장/대표 등" required />
        <div>
          <label htmlFor="phone" className="block text-sm text-white/70 mb-2 font-medium">
            연락처<span className="text-[var(--accent-from)] ml-1">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="010-0000-0000"
            required
            value={phone}
            onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
            className="field"
            maxLength={13}
          />
        </div>
        <div className="sm:col-span-2">
          <Field label="이메일" name="email" type="email" placeholder="name@example.com" required />
        </div>

        <div>
          <label htmlFor="party" className="block text-sm text-white/70 mb-2 font-medium">
            참가 인원
          </label>
          <select id="party" name="party" className="field" defaultValue={PARTY_OPTIONS[0]}>
            {PARTY_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-sm text-white/70 mb-2 font-medium">도착 예정</span>
          <div className="flex flex-wrap gap-2">
            {ARRIVAL_OPTIONS.map((o) => {
              const active = arrival === o;
              return (
                <label
                  key={o}
                  className={`press cursor-pointer select-none rounded-full border px-3.5 py-2 text-sm transition-colors ${
                    active
                      ? "border-transparent bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white"
                      : "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="arrival"
                    value={o}
                    checked={active}
                    onChange={() => setArrival(o)}
                    className="sr-only"
                  />
                  {o}
                </label>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm text-white/70 mb-2 font-medium">
            요청사항 <span className="text-white/40 font-normal">(선택)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="항공·숙박·식사 관련 요청이나 궁금한 점을 적어 주세요."
            className="field min-h-[110px] resize-y leading-relaxed"
            maxLength={1000}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 flex items-center justify-between gap-3">
            <div>
              <div className="text-base sm:text-lg font-semibold text-white/90">중국 베이징 · 3박 4일</div>
              <div className="mt-0.5 text-sm text-white/50">GET 대회 · ClassIn 본사 · 현지 학원 · 대학</div>
            </div>
            <span className="shrink-0 text-xs tracking-[0.2em] rounded-full border border-white/15 px-3 py-1.5 text-white/60">
              11/24 – 27
            </span>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="mt-6 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="press mt-8 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
      >
        {status === "submitting" ? "신청 중..." : "참가 신청 제출하기"}
      </button>

      <p className="mt-5 text-xs text-white/40 text-center leading-relaxed">
        제출하신 정보는 본 행사 운영(항공·숙박·현지 일정 안내) 목적으로만 사용되며, 행사 종료 후 안전하게 폐기됩니다.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-white/70 mb-2 font-medium">
        {label}
        {required && <span className="text-[var(--accent-from)] ml-1">*</span>}
      </label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} className="field" />
    </div>
  );
}

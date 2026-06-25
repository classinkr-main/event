"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type SubmittedData = {
  name: string;
  organization: string;
  position: string;
  phone: string;
  email: string;
  session: string;
};

function formatKoreanPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (digits.startsWith("02")) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function IncheonRegisterForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "신청 처리 중 문제가 발생했습니다.");
      }
      setSubmitted(payload as SubmittedData);
      setStatus("success");
      form.reset();
      setPhone("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      setErrorMsg(msg);
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
          { label: "참가 일정", value: submitted.session || "-" },
        ]
      : [];

    return (
      <div className="glass-strong rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-center">
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center mb-5 sm:mb-6">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          신청이 완료되었습니다
        </h3>
        <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">
          상세 장소·시간 안내를 위해
          <br />
          담당자가 순차적으로 전화 연락드릴 예정입니다.
        </p>

        {summary.length > 0 && (
          <div className="mt-8 sm:mt-10 text-left">
            <div className="text-xs tracking-[0.25em] text-white/40 mb-3 sm:mb-4 text-center">
              입력하신 정보를 확인해주세요
            </div>
            <dl className="rounded-2xl border border-white/10 bg-white/[0.03] divide-y divide-white/5 overflow-hidden">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 px-4 sm:px-5 py-3"
                >
                  <dt className="w-20 sm:w-24 shrink-0 text-xs sm:text-sm text-white/50">
                    {item.label}
                  </dt>
                  <dd className="flex-1 text-sm sm:text-base text-white/90 break-all">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <p className="mt-8 sm:mt-10 text-base sm:text-lg font-medium text-white/80">
          현장에서 뵙겠습니다.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="이름" name="name" placeholder="홍길동" required />
        <Field label="학원명" name="organization" placeholder="○○학원" required />
        <Field label="직책" name="position" placeholder="원장/부원장 등" required />
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

        <div className="sm:col-span-2">
          <label className="block text-sm text-white/70 mb-2 font-medium">
            참가 일정 선택<span className="text-[var(--accent-from)] ml-1">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RadioCard
              name="session"
              value="송도 · 7월 9일 (수)"
              label="송도"
              sub="7월 9일 (수)"
              defaultChecked
            />
            <RadioCard
              name="session"
              value="청라 · 7월 10일 (목)"
              label="청라"
              sub="7월 10일 (목)"
            />
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
        className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
      >
        {status === "submitting" ? "신청 중..." : "신청 제출하기"}
      </button>

      <p className="mt-5 text-xs text-white/40 text-center leading-relaxed">
        제출하신 정보는 본 설명회 운영 목적으로만 사용되며, 행사 종료 후 안전하게 폐기됩니다.
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
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="field"
      />
    </div>
  );
}

function RadioCard({
  name,
  value,
  label,
  sub,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  sub?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="relative cursor-pointer group">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-center transition-all peer-checked:border-[var(--accent-from)] peer-checked:bg-[var(--accent-from)]/10 group-hover:bg-white/[0.06]">
        <div className="text-base font-semibold text-white/80 peer-checked:text-white">
          {label}
        </div>
        {sub && (
          <div className="mt-0.5 text-xs text-white/50">{sub}</div>
        )}
      </div>
    </label>
  );
}

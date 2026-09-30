"use client";

import { useState } from "react";
import { getStoredChannel } from "@/lib/inflow";

type Status = "idle" | "submitting" | "success" | "error";

type SubmittedData = {
  name: string;
  organization: string;
  position: string;
  phone: string;
  email: string;
  interest: string;
  rooms: string;
  message: string;
};

const INTERESTS = [
  { value: "A 월 구독형", title: "A · 월 구독형", sub: "강사 단위 구독" },
  { value: "B 충전형", title: "B · 충전형", sub: "기관 단위 충전" },
  { value: "C 스마트교실 패키지", title: "C · 스마트교실 패키지", sub: "86″ 보드 + AI 카메라" },
  { value: "미정", title: "아직 잘 모르겠어요", sub: "상담으로 정할게요" },
];

const ROOMS = ["1개", "2~5개", "6~10개", "11개 이상"];

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

export default function HjConsultForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    if (typeof payload.source === "string" && payload.source) {
      payload.source = `${payload.source}/${getStoredChannel()}`;
    }

    try {
      const res = await fetch("/api/consult", {
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
      setErrorMsg(err instanceof Error ? err.message : "알 수 없는 오류");
      setStatus("error");
    }
  }

  if (status === "success") {
    const summary = submitted
      ? [
          { label: "이름", value: submitted.name },
          { label: "학원명", value: submitted.organization },
          { label: "직책", value: submitted.position },
          { label: "연락처", value: submitted.phone },
          { label: "이메일", value: submitted.email || "-" },
          { label: "관심 상품", value: submitted.interest },
          { label: "강의실 수", value: submitted.rooms || "-" },
          { label: "문의 내용", value: submitted.message || "-" },
        ]
      : [];

    return (
      <div className="glass-strong rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-center">
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center mb-5 sm:mb-6">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="#050807" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          상담 신청이 완료되었습니다
        </h3>
        <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">
          담당자가 내용을 확인한 뒤
          <br />
          남겨주신 연락처로 순차적으로 연락드리겠습니다.
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

        <button
          onClick={() => {
            setStatus("idle");
            setSubmitted(null);
          }}
          className="mt-8 text-xs sm:text-sm text-white/40 hover:text-white underline underline-offset-4 transition-colors"
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
        <Field label="이메일" name="email" type="email" placeholder="name@example.com" />
        <div>
          <label htmlFor="rooms" className="block text-sm text-white/70 mb-2 font-medium">
            강의실 수
          </label>
          <select id="rooms" name="rooms" className="field" defaultValue="">
            <option value="" disabled>
              선택
            </option>
            {ROOMS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="block text-sm text-white/70 mb-2 font-medium">
            관심 상품<span className="text-[var(--accent-from)] ml-1">*</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {INTERESTS.map((it, i) => (
              <label key={it.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  value={it.value}
                  required={i === 0}
                  className="peer sr-only"
                />
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:py-3.5 flex sm:block items-baseline gap-2 transition-all active:scale-[0.99] hover:bg-white/[0.07] peer-checked:border-[var(--accent-from)] peer-checked:bg-[var(--accent-from)]/10 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent-from)]/40">
                  <div className="text-sm sm:text-base font-semibold text-white/90">{it.title}</div>
                  <div className="mt-0.5 text-xs sm:text-sm text-white/50">{it.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm text-white/70 mb-2 font-medium">
            문의 내용
          </label>
          <textarea
            id="message"
            name="message"
            className="field"
            placeholder="궁금한 점이나 현재 교실 환경(전자칠판 보유 여부, 강사 수 등)을 적어주시면 상담이 빨라집니다."
            maxLength={1000}
          />
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
        className="press mt-8 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
      >
        {status === "submitting" ? "신청 중..." : "상담 신청하기"}
      </button>

      <p className="mt-5 text-xs text-white/40 text-center leading-relaxed">
        제출하신 정보는 상담 및 공동구매 안내 목적으로만 사용되며, 목적 달성 후 안전하게 폐기됩니다.
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

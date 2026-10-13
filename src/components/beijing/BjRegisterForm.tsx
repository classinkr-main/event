"use client";

import { useState } from "react";
import { getStoredChannel } from "@/lib/inflow";
import { formatKoreanPhone } from "@/lib/phone";
import Barcode from "./gfx/Barcode";
import FlightArc from "./gfx/FlightArc";
import TicketField from "./TicketField";
import { INTEREST_LABELS } from "./data";
import { useInterests } from "./interests";

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
  interests: string;
};

const PARTY_OPTIONS = ["1명 (본인)", "2명", "3명 이상"];
const ARRIVAL_OPTIONS = ["11/24 (화) 저녁", "11/25 (수) 오전", "미정"];

/** 참가 신청 = 종이 탑승권. 본권에 입력, 스텁에 관심 일정. 접수되면 이름이 인쇄된 탑승권 + 스탬프 */
export default function BjRegisterForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [arrival, setArrival] = useState(ARRIVAL_OPTIONS[2]);
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);
  const { list: interests, remove, clear } = useInterests();
  const interestLabels = interests.map((id) => INTEREST_LABELS[id] ?? id);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (payload.source) payload.source = `${payload.source}/${getStoredChannel()}`;
    payload.interests = interestLabels.join(", ");
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
      clear();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "알 수 없는 오류");
      setStatus("error");
    }
  }

  const strip = (label: string, right: string) => (
    <div className="bj-meander-fill flex items-center justify-between bg-[var(--ink)] text-[var(--paper)] px-5 sm:px-8 py-3">
      <span className="font-bold tracking-tight text-sm sm:text-base">
        ClassIn <span className="serif font-medium">Meets</span> Beijing
      </span>
      <span className="mono text-[10px] sm:text-[11px] opacity-85">
        {label} {right}
      </span>
    </div>
  );

  if (status === "success" && submitted) {
    return (
      <div className="paper grid grid-cols-1 md:grid-cols-[1.75fr_1fr]">
        <div className="relative">
          {strip("BOARDING PASS /", "접수 완료")}
          <div className="p-6 sm:p-9">
            <div className="grid grid-cols-[1fr_auto] gap-6">
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">PASSENGER / 탑승객</div>
                <div className="serif mt-1 text-2xl sm:text-3xl font-bold">
                  {submitted.name} <span className="text-base sm:text-lg font-semibold text-[var(--ink-2)]">{submitted.position}</span>
                </div>
                <div className="text-sm text-[var(--ink-2)] mt-1">{submitted.organization}</div>
              </div>
              <div className="text-right">
                <div className="mono text-[10px] text-[var(--ink-3)]">PARTY</div>
                <div className="mt-1 font-bold text-sm sm:text-base">{submitted.party || "-"}</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-end gap-3 sm:gap-6">
              <TicketField k="FROM" v="ICN" big />
              <FlightArc className="w-full h-auto text-[var(--ink)] -mb-2" id="done-arc" />
              <TicketField k="TO" v="PEK" big right />
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-4 border-t border-[var(--paper-line)] pt-4">
              <TicketField k="DATE" v="24 – 27 NOV 2026" />
              <TicketField k="ARRIVAL" v={submitted.arrival || "-"} />
              <TicketField k="PHONE" v={submitted.phone} />
              <TicketField k="EMAIL" v={submitted.email} />
            </div>
            {(submitted.interests || submitted.message) && (
              <dl className="mt-5 border-t border-[var(--paper-line)] pt-4 space-y-2 text-sm">
                {submitted.interests && (
                  <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                    <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">INTERESTS</dt>
                    <dd className="text-[var(--ink)]">{submitted.interests}</dd>
                  </div>
                )}
                {submitted.message && (
                  <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                    <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">NOTE</dt>
                    <dd className="text-[var(--ink)] whitespace-pre-line">{submitted.message}</dd>
                  </div>
                )}
              </dl>
            )}
            <Barcode seed={`${submitted.name}-${submitted.phone}`} height={44} className="mt-6 h-11 w-full text-[var(--ink)]" />
            <div className="mono mt-1.5 text-[10px] text-[var(--ink-3)]">CM1124 ICNPEK 24NOV</div>
            <div className="absolute right-8 sm:right-14 top-[38%]">
              <span className="bj-stamp text-lg sm:text-2xl">접수 완료</span>
            </div>
          </div>
        </div>
        <div className="relative border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[var(--paper-line-2)]">
          <span className="notch hidden md:block -top-[11px] left-0 -translate-x-1/2" aria-hidden />
          <span className="notch hidden md:block -bottom-[11px] left-0 -translate-x-1/2" aria-hidden />
          <span className="notch md:hidden top-0 -left-[11px] -translate-y-1/2" aria-hidden />
          <span className="notch md:hidden top-0 -right-[11px] -translate-y-1/2" aria-hidden />
          <div className="bj-meander-fill flex items-center justify-between bg-[var(--ink)] text-[var(--paper)] px-5 sm:px-7 py-3">
            <span className="mono text-[10px]">STUB</span>
            <span className="mono text-[10px]">CM 1124</span>
          </div>
          <div className="p-5 sm:p-7 flex flex-col gap-6 h-full">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <TicketField k="FROM" v="ICN" big />
              <TicketField k="TO" v="PEK" big right />
              <TicketField k="DATE" v="24 NOV" />
              <TicketField k="GATE" v="GET" right />
            </div>
            <p className="text-sm leading-relaxed text-[var(--ink-2)]">
              접수되었습니다. 항공과 숙박, 세부 일정 안내를 위해 담당자가 순차적으로 개별 연락드립니다.
            </p>
            <div className="mt-auto">
              <Barcode seed={`stub-${submitted.phone}`} height={36} className="h-9 w-full text-[var(--ink)]" />
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setSubmitted(null);
                }}
                className="mt-4 text-xs text-[var(--ink-3)] hover:text-[var(--ink)] underline underline-offset-4"
              >
                새 신청서 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="paper grid grid-cols-1 md:grid-cols-[1.75fr_1fr]">
      {source && <input type="hidden" name="source" value={source} />}
      <input type="hidden" name="session" value="ClassIn Meets 베이징 · 11/24–27" />

      {/* 본권: 입력 */}
      <div className="relative">
        {strip("BOARDING PASS /", "참가 신청서")}
        <div className="p-6 sm:p-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <Field label="PASSENGER / 이름" name="name" placeholder="홍길동" required />
            <Field label="ORGANIZATION / 학원명 · 기관" name="organization" placeholder="○○학원" required />
            <Field label="TITLE / 직책" name="position" placeholder="원장, 대표 등" required />
            <div>
              <Label htmlFor="phone" required>PHONE / 연락처</Label>
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
              <Field label="EMAIL / 이메일" name="email" type="email" placeholder="name@example.com" required />
            </div>
            <div>
              <Label htmlFor="party">PARTY / 참가 인원</Label>
              <select id="party" name="party" className="field" defaultValue={PARTY_OPTIONS[0]}>
                {PARTY_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>ARRIVAL / 도착 예정</Label>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {ARRIVAL_OPTIONS.map((o) => {
                  const on = arrival === o;
                  return (
                    <label
                      key={o}
                      className={`cursor-pointer select-none border px-3 py-1.5 text-xs sm:text-[13px] transition-colors ${
                        on ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-semibold" : "border-[var(--paper-line-2)] text-[var(--ink-2)] hover:border-[var(--ink)]"
                      }`}
                    >
                      <input type="radio" name="arrival" value={o} checked={on} onChange={() => setArrival(o)} className="sr-only" />
                      {o}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">
                NOTE / 요청사항 <span className="font-normal normal-case">(선택)</span>
              </Label>
              <textarea id="message" name="message" rows={2} placeholder="항공, 숙박, 식사 관련 요청이나 궁금한 점" className="field min-h-[64px]" maxLength={1000} />
            </div>
          </div>

          {status === "error" && (
            <div className="mt-6 border border-[var(--seal)] bg-[rgba(200,50,43,0.06)] px-4 py-3 text-sm text-[var(--seal)] rounded-lg">{errorMsg}</div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <button type="submit" disabled={status === "submitting"} className="bj-btn bj-btn-accent text-base sm:min-w-[240px] disabled:opacity-50 disabled:cursor-not-allowed">
              {status === "submitting" ? "접수 중..." : "참가 신청 제출"}
            </button>
            <p className="text-[11px] sm:text-xs text-[var(--ink-3)] leading-relaxed">
              제출하신 정보는 본 행사 운영(항공, 숙박, 현지 일정 안내) 목적으로만 사용되며 행사 종료 후 안전하게 폐기됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 스텁: 관심 일정 */}
      <div className="relative border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[var(--paper-line-2)]">
        <span className="notch hidden md:block -top-[11px] left-0 -translate-x-1/2" aria-hidden />
        <span className="notch hidden md:block -bottom-[11px] left-0 -translate-x-1/2" aria-hidden />
        <span className="notch md:hidden top-0 -left-[11px] -translate-y-1/2" aria-hidden />
        <span className="notch md:hidden top-0 -right-[11px] -translate-y-1/2" aria-hidden />
        <div className="bj-meander-fill flex items-center justify-between bg-[var(--ink)] text-[var(--paper)] px-5 sm:px-7 py-3">
          <span className="mono text-[10px]">STUB</span>
          <span className="mono text-[10px]">CM 1124</span>
        </div>
        <div className="p-5 sm:p-7 flex flex-col gap-6 h-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <TicketField k="FROM" v="ICN" big />
            <TicketField k="TO" v="PEK" big right />
            <TicketField k="DATE" v="24 – 27 NOV" />
            <TicketField k="GATE" v="GET" right />
          </div>
          <div>
            <div className="mono text-[10px] text-[var(--ink-3)]">INTERESTS / 관심 일정</div>
            {interestLabels.length === 0 ? (
              <p className="mt-2 text-[13px] text-[var(--ink-2)] leading-relaxed">
                아직 표시한 일정이 없습니다. <a href="#questions" className="underline underline-offset-4">질문</a>,{" "}
                <a href="#journey" className="underline underline-offset-4">여권</a>,{" "}
                <a href="#program" className="underline underline-offset-4">프로그램</a>에서 관심 표시를 누르면 여기에 담겨 함께 접수됩니다.
              </p>
            ) : (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {interests.map((id) => (
                  <li key={id}>
                    <button type="button" onClick={() => remove(id)} className="bj-mark on" title="빼기">
                      {INTEREST_LABELS[id] ?? id}
                      <span aria-hidden>×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-auto">
            <Barcode seed="register-stub-1124" height={36} className="h-9 w-full text-[var(--ink)]" />
            <div className="mono mt-1 text-[10px] text-[var(--ink-3)]">2026 1124 PEK</div>
          </div>
        </div>
      </div>
    </form>
  );
}

function Label({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mono block text-[10px] text-[var(--ink-3)] mb-0.5">
      {children}
      {required && <span className="text-[var(--accent)] ml-1">*</span>}
    </label>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <Label htmlFor={name} required={required}>{label}</Label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} className="field" />
    </div>
  );
}

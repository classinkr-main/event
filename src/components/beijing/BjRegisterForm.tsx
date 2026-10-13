"use client";

import { useState } from "react";
import { getStoredChannel } from "@/lib/inflow";
import { formatKoreanPhone } from "@/lib/phone";
import Corners from "./Corners";
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

/** 참가 신청 = 티켓. 본문(입력) + 스텁(관심 일정·바코드). 접수되면 스탬프 */
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
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
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

  if (status === "success" && submitted) {
    const rows: [string, string][] = [
      ["이름", submitted.name],
      ["소속", submitted.organization],
      ["직책", submitted.position],
      ["연락처", submitted.phone],
      ["이메일", submitted.email],
      ["참가 인원", submitted.party || "-"],
      ["도착 예정", submitted.arrival || "-"],
      ...(submitted.interests ? ([["관심 일정", submitted.interests]] as [string, string][]) : []),
      ...(submitted.message ? ([["요청사항", submitted.message]] as [string, string][]) : []),
    ];
    return (
      <div className="relative border border-[var(--bj-line)] bg-[#0b0d13]/80">
        <Corners />
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
          <div className="relative p-7 sm:p-10 md:p-12">
            <div className="mono text-[10px] text-[var(--ink-3)]">ADMIT ONE · CLASSIN MEETS BEIJING</div>
            <h3 className="serif mt-4 text-3xl sm:text-4xl font-semibold">신청이 접수되었습니다</h3>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-2)] leading-relaxed">
              항공·숙박과 세부 일정 안내를 위해 담당자가 순차적으로 개별 연락드립니다.
            </p>
            <dl className="mt-8 border-t border-[var(--bj-line)]">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-4 py-3 border-b border-[var(--bj-line)]">
                  <dt className="mono text-[11px] text-[var(--ink-3)] pt-0.5">{k}</dt>
                  <dd className="text-sm sm:text-[15px] text-[var(--ink)] break-all whitespace-pre-line">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="absolute right-6 sm:right-10 top-6 sm:top-10">
              <span className="bj-stamp text-base sm:text-xl">접수 완료</span>
            </div>
          </div>
          <div className="relative p-7 sm:p-10 border-t md:border-t-0 md:border-l border-dashed border-[var(--bj-line-2)] flex flex-col justify-between">
            <div>
              <div className="mono text-[10px] text-[var(--ink-3)]">PASSENGER</div>
              <div className="serif mt-1 text-2xl font-semibold">{submitted.name}</div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">FROM</div>
                  <div className="serif text-3xl font-semibold mt-1">ICN</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">TO</div>
                  <div className="serif text-3xl font-semibold mt-1">PEK</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">DATE</div>
                  <div className="text-sm font-semibold mt-1">24 – 27 NOV</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-[var(--ink-3)]">PARTY</div>
                  <div className="text-sm font-semibold mt-1">{submitted.party || "-"}</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="bj-barcode h-10 w-full" aria-hidden />
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setSubmitted(null);
                }}
                className="mt-5 text-xs text-[var(--ink-3)] hover:text-[var(--ink)] underline underline-offset-4 transition-colors"
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
    <form onSubmit={handleSubmit} className="relative border border-[var(--bj-line)] bg-[#0b0d13]/80">
      <Corners />
      {source && <input type="hidden" name="source" value={source} />}
      <input type="hidden" name="session" value="ClassIn Meets 베이징 · 11/24–27" />

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
        {/* 본문 */}
        <div className="p-7 sm:p-10 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
            <Field label="이름" name="name" placeholder="홍길동" required />
            <Field label="학원명 / 기관" name="organization" placeholder="○○학원" required />
            <Field label="직책" name="position" placeholder="원장 / 대표 등" required />
            <div>
              <Label htmlFor="phone" required>연락처</Label>
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
              <Label htmlFor="party">참가 인원</Label>
              <select id="party" name="party" className="field" defaultValue={PARTY_OPTIONS[0]}>
                {PARTY_OPTIONS.map((o) => (
                  <option key={o} value={o} className="bg-[#0b0d13]">
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>도착 예정</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {ARRIVAL_OPTIONS.map((o) => {
                  const on = arrival === o;
                  return (
                    <label
                      key={o}
                      className={`cursor-pointer select-none border px-3 py-2 text-xs sm:text-sm transition-colors ${
                        on ? "border-[var(--bj-red)] bg-[rgba(255,79,46,0.12)] text-[var(--ink)]" : "border-[var(--bj-line-2)] text-[var(--ink-2)] hover:border-[var(--ink)]"
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
                요청사항 <span className="text-[var(--ink-3)] font-normal">(선택)</span>
              </Label>
              <textarea
                id="message"
                name="message"
                rows={2}
                placeholder="항공·숙박·식사 관련 요청이나 궁금한 점"
                className="field min-h-[72px]"
                maxLength={1000}
              />
            </div>
          </div>

          {status === "error" && (
            <div className="mt-6 border border-[rgba(255,79,46,0.5)] bg-[rgba(255,79,46,0.08)] px-4 py-3 text-sm text-[#ffb3a0]">{errorMsg}</div>
          )}

          <button type="submit" disabled={status === "submitting"} className="bj-btn bj-btn-red mt-9 w-full sm:w-auto sm:min-w-[260px] text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {status === "submitting" ? "접수 중..." : "참가 신청 제출"}
            {status !== "submitting" && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <p className="mt-4 text-[11px] sm:text-xs text-[var(--ink-3)] leading-relaxed">
            제출하신 정보는 본 행사 운영(항공·숙박·현지 일정 안내) 목적으로만 사용되며, 행사 종료 후 안전하게 폐기됩니다.
          </p>
        </div>

        {/* 스텁 */}
        <div className="relative p-7 sm:p-10 border-t md:border-t-0 md:border-l border-dashed border-[var(--bj-line-2)] flex flex-col justify-between">
          <div>
            <div className="mono text-[10px] text-[var(--ink-3)]">INTERESTS · 관심 일정</div>
            {interestLabels.length === 0 ? (
              <p className="mt-3 text-sm text-[var(--ink-2)] leading-relaxed">
                아직 표시한 일정이 없습니다. <a href="#itinerary" className="underline underline-offset-4 hover:text-[var(--ink)]">일정</a>이나{" "}
                <a href="#session" className="underline underline-offset-4 hover:text-[var(--ink)]">세션</a>에서 「관심 표시」를 누르면 여기에 담겨 함께 접수됩니다.
              </p>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {interests.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => remove(id)}
                      className="bj-mark on"
                      title="빼기"
                    >
                      {INTEREST_LABELS[id] ?? id}
                      <span aria-hidden>×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">FROM</div>
                <div className="serif text-3xl font-semibold mt-1">ICN</div>
              </div>
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">TO</div>
                <div className="serif text-3xl font-semibold mt-1">PEK</div>
              </div>
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">DATE</div>
                <div className="text-sm font-semibold mt-1">24 – 27 NOV 2026</div>
              </div>
              <div>
                <div className="mono text-[10px] text-[var(--ink-3)]">GATE</div>
                <div className="text-sm font-semibold mt-1">GET 2026</div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="bj-barcode h-10 w-full" aria-hidden />
            <div className="mono mt-2 text-[10px] text-[var(--ink-3)] flex justify-between">
              <span>CLASSIN MEETS</span>
              <span>BEIJING · 1124</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function Label({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mono block text-[10px] text-[var(--ink-3)] mb-1">
      {children}
      {required && <span className="text-[var(--bj-red)] ml-1">*</span>}
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

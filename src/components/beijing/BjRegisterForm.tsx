"use client";

import { useState } from "react";
import { getStoredChannel } from "@/lib/inflow";
import { formatKoreanPhone } from "@/lib/phone";
import Barcode from "./gfx/Barcode";
import FlightArc from "./gfx/FlightArc";
import TicketField from "./TicketField";
import { FORM_OPTIONS, INTEREST_LABELS } from "./data";
import { useInterests } from "./interests";

type Status = "idle" | "submitting" | "success" | "error";

type SubmittedData = {
  name: string;
  organization: string;
  position: string;
  phone: string;
  email?: string;
  passportMethod: string;
  passportName: string;
  arrival: string;
  flightDetail: string;
  room: string;
  roommate: string;
  message: string;
  question: string;
  topics: string;
  interests: string;
};

const FLIGHT_OPTIONS = FORM_OPTIONS.flight;
const ROOM_OPTIONS = FORM_OPTIONS.room;
const TOPIC_OPTIONS = FORM_OPTIONS.topics;
const PASSPORT_METHODS = FORM_OPTIONS.passportMethod;
const DIRECT = PASSPORT_METHODS[0];
const PASSPORT_MAX_SIDE = 1600;
const PASSPORT_MAX_CHARS = 2_500_000; // 약 1.8MB

/** 여권 사진을 브라우저에서 줄여 JPEG data URL로. 휴대폰 원본(수 MB)을 그대로 보내지 않기 위해 */
async function fileToJpegDataUrl(file: File): Promise<string> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("여권 이미지를 읽지 못했습니다. JPG 또는 PNG 사진으로 올려 주세요.");
  }
  const scale = Math.min(1, PASSPORT_MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("이미지 처리를 지원하지 않는 브라우저입니다.");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();
  let out = canvas.toDataURL("image/jpeg", 0.85);
  for (const q of [0.7, 0.55]) {
    if (out.length <= PASSPORT_MAX_CHARS) break;
    out = canvas.toDataURL("image/jpeg", q);
  }
  return out;
}

export default function BjRegisterForm({ source, prefillCode }: { source?: string; prefillCode?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("");
  const [passport, setPassport] = useState<File | null>(null);
  const [arrival, setArrival] = useState(FLIGHT_OPTIONS[0]);
  const [room, setRoom] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);
  const { list: interests, remove, clear } = useInterests();
  const interestLabels = interests.map((id) => INTEREST_LABELS[id] ?? id);

  const toggleTopic = (t: string) => setTopics((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  function resetForm(form: HTMLFormElement) {
    form.reset();
    setPhone("");
    setMethod("");
    setPassport(null);
    setArrival(FLIGHT_OPTIONS[0]);
    setRoom("");
    setTopics([]);
    clear();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string") payload[k] = v;
    });
    if (typeof payload.source === "string" && payload.source) payload.source = `${payload.source}/${getStoredChannel()}`;
    payload.interests = interestLabels.join(", ");
    payload.topics = topics.join(", ");
    payload.consent = fd.get("consent") ? "Y" : "";

    payload.passportMethod = method;
    try {
      if (method === DIRECT) {
        if (!passport) throw new Error("여권 사본을 올려 주세요. 지금 어려우시면 「담당 매니저에게 제출」을 골라 주세요.");
        payload.passportImage = await fileToJpegDataUrl(passport);
        payload.passportName = passport.name;
      }
      const res = await fetch("/api/beijing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "신청 처리 중 문제가 발생했습니다.");
      }
      setSubmitted({ ...(payload as unknown as SubmittedData), passportName: method === DIRECT ? passport?.name ?? "" : "" });
      setStatus("success");
      resetForm(form);
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

  const chip = (on: boolean) =>
    `cursor-pointer select-none border px-3 py-1.5 text-xs sm:text-[13px] transition-colors ${
      on ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-semibold" : "border-[var(--paper-line-2)] text-[var(--ink-2)] hover:border-[var(--ink)]"
    }`;

  const fileClass =
    "field !py-2 file:mr-3 file:border file:border-[var(--paper-line-2)] file:bg-transparent file:px-3 file:py-1 file:text-xs file:text-[var(--ink)]";

  if (status === "success" && submitted) {
    return (
      <div className="paper grid grid-cols-1 md:grid-cols-[1.75fr_1fr]">
        <div className="relative">
          {strip("BOARDING PASS /", "접수 완료")}
          <div className="p-6 sm:p-9">
            <div>
              <div className="mono text-[10px] text-[var(--ink-3)]">PASSENGER / 탑승객</div>
              <div className="serif mt-1 text-2xl sm:text-3xl font-bold">
                {submitted.name} <span className="text-base sm:text-lg font-semibold text-[var(--ink-2)]">{submitted.position}</span>
              </div>
              <div className="text-sm text-[var(--ink-2)] mt-1">{submitted.organization}</div>
            </div>
            <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-end gap-3 sm:gap-6">
              <TicketField k="FROM" v="ICN" big />
              <FlightArc className="w-full h-auto text-[var(--ink)] -mb-2" id="done-arc" />
              <TicketField k="TO" v="PEK" big right />
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-4 border-t border-[var(--paper-line)] pt-4">
              <TicketField k="DATE" v="24 – 27 NOV 2026" />
              <TicketField k="FLIGHT" v={submitted.arrival ? submitted.arrival.split(" (")[0] : "-"} />
              <TicketField k="ROOM" v={submitted.room ? submitted.room.split(" (")[0] : "-"} />
              <TicketField k="PHONE" v={submitted.phone} />
            </div>
            <dl className="mt-5 border-t border-[var(--paper-line)] pt-4 space-y-2 text-sm">
              <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">PASSPORT</dt>
                <dd className="text-[var(--ink)]">
                  {submitted.passportName ? "접수됨" : "담당 매니저에게 제출 · 접수 후 안내드리는 방법으로 보내 주세요"}
                </dd>
              </div>
              {submitted.email && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">EMAIL</dt>
                  <dd className="text-[var(--ink)]">{submitted.email}</dd>
                </div>
              )}
              {submitted.flightDetail && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">FLIGHT</dt>
                  <dd className="text-[var(--ink)]">{submitted.flightDetail}</dd>
                </div>
              )}
              {submitted.roommate && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">ROOM</dt>
                  <dd className="text-[var(--ink)]">{submitted.roommate}</dd>
                </div>
              )}
              {submitted.interests && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">INTERESTS</dt>
                  <dd className="text-[var(--ink)]">{submitted.interests}</dd>
                </div>
              )}
              {submitted.topics && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">TOPICS</dt>
                  <dd className="text-[var(--ink)]">{submitted.topics}</dd>
                </div>
              )}
              {submitted.question && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">QUESTION</dt>
                  <dd className="text-[var(--ink)] whitespace-pre-line">{submitted.question}</dd>
                </div>
              )}
              {submitted.message && (
                <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt className="mono text-[10px] text-[var(--ink-3)] pt-1">NOTE</dt>
                  <dd className="text-[var(--ink)] whitespace-pre-line">{submitted.message}</dd>
                </div>
              )}
            </dl>
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
              접수되었습니다. 숙소 예약과 세부 일정 안내를 위해 담당자가 순차적으로 개별 연락드립니다.
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
            <div className="sm:col-span-2">
              <Label htmlFor="code" required>INVITE CODE / 초청 코드</Label>
              <input
                id="code"
                name="code"
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="초청장과 함께 받으신 코드"
                required
                defaultValue={prefillCode ?? ""}
                className="field"
                maxLength={64}
              />
            </div>
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
              <Label required>PASSPORT / 여권 사본</Label>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {PASSPORT_METHODS.map((o) => {
                  const on = method === o;
                  return (
                    <label key={o} className={chip(on)}>
                      <input type="radio" name="passportMethod" value={o} checked={on} onChange={() => setMethod(o)} className="sr-only" required />
                      {o}
                    </label>
                  );
                })}
              </div>
              {method === DIRECT && (
                <input
                  id="passport"
                  name="passport"
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setPassport(e.target.files?.[0] ?? null)}
                  className={`${fileClass} mt-3`}
                  aria-label="여권 사본 파일"
                />
              )}
              <p className="mt-1.5 text-[11px] text-[var(--ink-3)] leading-relaxed">
                숙소 예약에 여권 사진면이 필요합니다. 지금 올리기 어려우시면 「담당 매니저에게 제출」을 고르시고 접수 후 안내드리는 방법으로 보내 주세요. 예약이 끝나면 바로 폐기합니다.
              </p>
            </div>

            <div className="sm:col-span-2">
              <Label>FLIGHT / 항공편 <span className="font-normal normal-case">(항공은 자기 부담)</span></Label>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {FLIGHT_OPTIONS.map((o) => {
                  const on = arrival === o;
                  return (
                    <label key={o} className={chip(on)}>
                      <input type="radio" name="arrival" value={o} checked={on} onChange={() => setArrival(o)} className="sr-only" />
                      {o}
                    </label>
                  );
                })}
              </div>
              {arrival === FLIGHT_OPTIONS[1] && (
                <input
                  name="flightDetail"
                  type="text"
                  placeholder="편명과 도착 시각 (예: 11/24 OZ335 · 15:10 도착)"
                  className="field mt-3"
                  maxLength={200}
                />
              )}
            </div>

            <div className="sm:col-span-2">
              <Label required>ROOM / 숙소 <span className="font-normal normal-case">(크라운 플라자 베이징 중관춘 · 숙박은 자기 부담)</span></Label>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {ROOM_OPTIONS.map((o) => {
                  const on = room === o;
                  return (
                    <label key={o} className={chip(on)}>
                      <input type="radio" name="room" value={o} checked={on} onChange={() => setRoom(o)} className="sr-only" required />
                      {o}
                    </label>
                  );
                })}
              </div>
              {room === ROOM_OPTIONS[1] && (
                <input
                  name="roommate"
                  type="text"
                  placeholder="함께 쓰실 분 (예: ○○학원 홍길동)"
                  className="field mt-3"
                  maxLength={200}
                />
              )}
            </div>

            <div className="sm:col-span-2">
              <Label>TOPICS / 듣고 싶은 주제 <span className="font-normal normal-case">(선택, 복수 가능)</span></Label>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {TOPIC_OPTIONS.map((t) => {
                  const on = topics.includes(t);
                  return (
                    <label key={t} className={chip(on)}>
                      <input type="checkbox" checked={on} onChange={() => toggleTopic(t)} className="sr-only" />
                      {t}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="question">
                QUESTION / 방문 기관에 전달할 질문 <span className="font-normal normal-case">(선택)</span>
              </Label>
              <textarea id="question" name="question" rows={2} placeholder="현장에서 꼭 확인하고 싶은 내용. 특정 기관이면 [기관명 / 질문]으로 적어 주세요" className="field min-h-[64px]" maxLength={1000} />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="message">
                NOTE / 요청사항 <span className="font-normal normal-case">(선택)</span>
              </Label>
              <textarea id="message" name="message" rows={2} placeholder="항공, 숙박, 식사 관련 요청이나 궁금한 점" className="field min-h-[64px]" maxLength={1000} />
            </div>

            <div className="sm:col-span-2 border-t border-[var(--paper-line)] pt-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="consent" value="Y" required className="mt-1 h-4 w-4 accent-[var(--accent)]" />
                <span className="text-[13px] leading-relaxed">
                  <span className="font-semibold">개인정보 수집·이용에 동의합니다.</span>
                  <span className="text-[var(--accent)] ml-1">*</span>
                  <span className="block mt-1 text-[12px] text-[var(--ink-2)]">{FORM_OPTIONS.consent}</span>
                </span>
              </label>
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
              항공편과 숙박은 자기 부담이며, 예약 방법은 접수 후 개별 안내드립니다.
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

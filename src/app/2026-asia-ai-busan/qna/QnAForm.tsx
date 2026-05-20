"use client";

import { useState } from "react";
import type { Speaker } from "./page";

type Status = "idle" | "submitting" | "success" | "error";

const TOPICS: { tag: string; body: string }[] = [
  {
    tag: "AI/경영",
    body: "AI 시대 속 우리 학원만의 차별화된 경영·생존 전략을 연사들과 논의하고 싶습니다.",
  },
  {
    tag: "수업/교수법",
    body: "학생들의 메타인지를 깨우는 실제 수업 설계와 교사 교육 노하우를 공유받고 싶습니다.",
  },
  {
    tag: "에듀테크",
    body: "에듀테크(ClassIn 등) 툴을 도입해 학원 시스템을 혁신한 실제 성공/실패 사례를 깊이 있게 듣고 싶습니다.",
  },
  {
    tag: "시스템/확장",
    body: "강사 개인기에 의존하지 않는 ‘교무연구 표준화’ 및 ‘캠퍼스 확장 매뉴얼’ 구축 경험담을 나누고 싶습니다.",
  },
  {
    tag: "글로벌 벤치마킹",
    body: "중국, 일본 등 해외 선도 학원들의 위기 극복 및 성장 전략 중 한국 시장에 바로 적용할 점을 토론하고 싶습니다.",
  },
];

export default function QnAForm({ speakers }: { speakers: Speaker[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [targetSpeaker, setTargetSpeaker] = useState("");
  const [question, setQuestion] = useState("");

  function toggleTopic(tag: string) {
    setTopics((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) return setErrorMsg("성함을 입력해주세요.");
    if (!org.trim()) return setErrorMsg("기관명을 입력해주세요.");
    if (topics.length === 0)
      return setErrorMsg("주제를 하나 이상 선택해주세요.");
    if (!targetSpeaker) return setErrorMsg("질문할 연사를 선택해주세요.");
    if (!question.trim()) return setErrorMsg("질문을 입력해주세요.");

    setStatus("submitting");
    try {
      const res = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          org: org.trim(),
          topics: topics.join(", "),
          targetSpeaker,
          question: question.trim(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "제출 중 문제가 발생했습니다.");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "알 수 없는 오류");
      setStatus("error");
    }
  }

  function resetForAnother() {
    setTargetSpeaker("");
    setQuestion("");
    setStatus("idle");
    setErrorMsg("");
    setTimeout(() => {
      document.getElementById("speaker-picker")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }

  if (status === "success") {
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
          질문이 잘 접수되었습니다
        </h3>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/65 leading-relaxed">
          대표님의 질문은 운영팀이 검토 후 연사에게 전달드립니다.
          <br />
          2026년 부산에서 뵙겠습니다.
        </p>
        <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={resetForAnother}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white text-sm font-medium hover:border-white/35 hover:bg-white/5 transition-all"
          >
            다른 연사에게도 질문 남기기
          </button>
          <a
            href="/2026-asia-ai-busan"
            className="text-xs sm:text-sm text-white/45 hover:text-white/80 underline underline-offset-4 transition-colors"
          >
            이벤트 페이지로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-10"
      noValidate
    >
      {/* Section 1 — Identity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <Label htmlFor="qna-name">
            성함 <Req />
          </Label>
          <input
            id="qna-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={60}
            required
            className="field"
          />
        </div>
        <div>
          <Label htmlFor="qna-org">
            기관명 <Req />
          </Label>
          <input
            id="qna-org"
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            autoComplete="organization"
            maxLength={120}
            required
            className="field"
          />
        </div>
      </div>

      {/* Section 2 — Topics */}
      <div className="mt-9 sm:mt-12">
        <Label>
          이번 세션의 연사들과 가장 깊이 있게 논의하고 싶은 주제는 무엇인가요?{" "}
          <Req />
        </Label>
        <Help>
          현장 및 발표 이후에 함께 다룰 우선순위를 정하는 데 사용됩니다. (복수
          선택 가능)
        </Help>
        <div className="mt-4 space-y-2.5">
          {TOPICS.map((t) => {
            const checked = topics.includes(t.tag);
            return (
              <label
                key={t.tag}
                className={`flex gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                  checked
                    ? "border-[var(--accent-from)] bg-[var(--accent-from)]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleTopic(t.tag)}
                  className="mt-1 flex-shrink-0 accent-[var(--accent-from)]"
                />
                <div className="flex-1">
                  <div className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent-from)]">
                    [{t.tag}]
                  </div>
                  <div
                    className={`mt-1 text-[14px] sm:text-[15px] leading-relaxed ${
                      checked ? "text-white" : "text-white/75"
                    }`}
                  >
                    {t.body}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 3 — Speaker + Question */}
      <div className="mt-9 sm:mt-12" id="speaker-picker">
        <Label>
          연사에게 질문 <Req />
        </Label>
        <Help>
          한 명의 연사를 선택하고, 미리 던지고 싶은 질문이나 우리 학원의 고민을
          자유롭게 적어주세요. 현장 Q&amp;A 시간에 대표님의 질문이 직접 다뤄질
          예정이며, 발표 이후 연사와의 네트워킹 출발점이 됩니다.
        </Help>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {speakers.map((s) => {
            const checked = targetSpeaker === s.pickValue;
            return (
              <label
                key={s.slug}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border cursor-pointer transition-all ${
                  checked
                    ? "border-[var(--accent-from)] bg-[var(--accent-from)]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <input
                  type="radio"
                  name="targetSpeaker"
                  value={s.pickValue}
                  checked={checked}
                  onChange={(e) => setTargetSpeaker(e.target.value)}
                  className="flex-shrink-0 accent-[var(--accent-from)]"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] sm:text-[15px] font-semibold text-white truncate">
                    {s.nameMain} <span className="text-white/55 font-normal text-[12px] sm:text-[13px]">{s.nameAux.split(" · ")[0]}</span>
                  </div>
                  <div className="text-[12px] sm:text-[13px] text-white/55 truncate">
                    {s.role}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl bg-white/[0.03] border-l-2 border-white/20 px-4 py-3 text-[13px] sm:text-sm text-white/65 leading-relaxed">
          <span className="text-white/85 font-medium">[예시]</span> 저희 학원도
          BYOD 수업을 시도 중인데, 학생들이 패드로 딴짓을 하거나 교사들이 통제를
          어려워합니다. 설계자로서의 교사는 이 선을 어떻게 제어해야 하나요?
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={3000}
          required
          placeholder="질문 또는 우리 학원의 고민을 자유롭게 작성해주세요."
          className="field mt-4 min-h-[200px] resize-y leading-relaxed"
        />
      </div>

      {(status === "error" || errorMsg) && errorMsg && (
        <div className="mt-6 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
      >
        {status === "submitting" ? "제출 중..." : "사전 질문 제출"}
      </button>

      <p className="mt-5 text-xs text-white/40 text-center leading-relaxed">
        제출 후 ‘다른 연사에게도 질문 남기기’ 버튼을 누르면 추가로 더 남길 수
        있습니다.
      </p>
    </form>
  );
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[15px] sm:text-base text-white/85 mb-2 font-semibold tracking-tight"
    >
      {children}
    </label>
  );
}

function Help({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] sm:text-sm text-white/55 leading-relaxed">
      {children}
    </p>
  );
}

function Req() {
  return <span className="text-[var(--accent-from)] ml-0.5">*</span>;
}

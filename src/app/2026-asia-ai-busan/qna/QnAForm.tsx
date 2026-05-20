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
      document.getElementById("qna-speaker-picker")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }

  if (status === "success") {
    return (
      <div className="qna-success-card">
        <div className="qna-ok-eyebrow">Submitted</div>
        <div className="qna-ok-title">질문이 잘 접수되었습니다</div>
        <div className="qna-ok-body">
          대표님의 질문은 운영팀이 검토 후 연사에게 전달드립니다.
          <br />
          2026년 부산에서 뵙겠습니다.
        </div>
        <div className="qna-ok-actions">
          <button
            type="button"
            className="qna-ghost"
            onClick={resetForAnother}
          >
            다른 연사에게도 질문 남기기
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="qna-form" onSubmit={handleSubmit} noValidate>
      <div className="qna-field">
        <label className="qna-field-label" htmlFor="qna-name">
          성함<span className="qna-req">*</span>
        </label>
        <input
          id="qna-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          maxLength={60}
          required
        />
      </div>

      <div className="qna-field">
        <label className="qna-field-label" htmlFor="qna-org">
          기관명<span className="qna-req">*</span>
        </label>
        <input
          id="qna-org"
          type="text"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          autoComplete="organization"
          maxLength={120}
          required
        />
      </div>

      <div className="qna-field">
        <span className="qna-field-label">
          이번 세션의 연사들과 가장 깊이 있게 논의하고 싶은 주제는 무엇인가요?
          <span className="qna-req">*</span>
        </span>
        <span className="qna-field-help">
          현장 및 발표 이후에 함께 다룰 우선순위를 정하는 데 사용됩니다. (복수
          선택 가능)
        </span>
        <div className="qna-topics" role="group" aria-label="주제 선택">
          {TOPICS.map((t) => {
            const checked = topics.includes(t.tag);
            return (
              <label
                key={t.tag}
                className={`qna-topic${checked ? " qna-checked" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleTopic(t.tag)}
                />
                <span className="qna-topic-text">
                  <span className="qna-topic-tag">[{t.tag}]</span>
                  <span className="qna-topic-body">{t.body}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="qna-field" id="qna-speaker-picker">
        <label className="qna-field-label" htmlFor="qna-question">
          연사에게 질문<span className="qna-req">*</span>
        </label>
        <span className="qna-field-help">
          한 명의 연사를 선택하고, 미리 던지고 싶은 질문이나 우리 학원의 고민을
          자유롭게 적어주세요. 현장 Q&amp;A 시간에 대표님의 질문이 직접 다뤄질
          예정이며, 발표 이후 연사와의 네트워킹 출발점이 됩니다.
        </span>
        <div
          className="qna-picks"
          role="radiogroup"
          aria-label="질문할 연사 선택"
        >
          {speakers.map((s) => {
            const checked = targetSpeaker === s.pickValue;
            return (
              <label
                key={s.slug}
                className={`qna-pick${checked ? " qna-checked" : ""}`}
              >
                <input
                  type="radio"
                  name="targetSpeaker"
                  value={s.pickValue}
                  checked={checked}
                  onChange={(e) => setTargetSpeaker(e.target.value)}
                />
                <span className="qna-pick-text">
                  <span className="qna-pick-name">
                    {s.nameMain}
                    <span
                      style={{
                        color: "var(--qna-text-mute)",
                        fontWeight: 400,
                        marginLeft: 8,
                        fontSize: 13,
                      }}
                    >
                      {s.nameAux.split(" · ")[0]}
                    </span>
                  </span>
                  <span className="qna-pick-org">{s.role}</span>
                </span>
              </label>
            );
          })}
        </div>
        <span className="qna-field-help qna-example">
          [예시] 저희 학원도 BYOD 수업을 시도 중인데, 학생들이 패드로 딴짓을
          하거나 교사들이 통제를 어려워합니다. 설계자로서의 교사는 이 선을
          어떻게 제어해야 하나요?
        </span>
        <textarea
          id="qna-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          maxLength={3000}
          placeholder="질문 또는 우리 학원의 고민을 자유롭게 작성해주세요."
        />
      </div>

      <div className="qna-actions">
        {errorMsg && <div className="qna-status qna-err">{errorMsg}</div>}
        <button
          type="submit"
          className="qna-submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "제출 중..." : "사전 질문 제출"}
        </button>
        <p
          style={{
            fontSize: 13,
            color: "var(--qna-text-mute)",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          제출 후 ‘다른 연사에게도 질문 남기기’ 버튼을 누르면 추가로 더 남길 수
          있습니다.
        </p>
      </div>
    </form>
  );
}

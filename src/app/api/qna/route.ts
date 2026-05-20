import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  org?: string;
  topics?: string;
  targetSpeaker?: string;
  question?: string;
};

const REQUIRED: (keyof Payload)[] = [
  "name",
  "org",
  "topics",
  "targetSpeaker",
  "question",
];

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청 형식입니다." },
      { status: 400 }
    );
  }

  for (const key of REQUIRED) {
    if (!body[key] || typeof body[key] !== "string" || !body[key]!.trim()) {
      return NextResponse.json(
        { error: `필수 항목이 비어 있습니다: ${key}` },
        { status: 400 }
      );
    }
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_QNA_WEBHOOK_URL;
  if (!sheetsUrl) {
    console.warn(
      "[qna] GOOGLE_SHEETS_QNA_WEBHOOK_URL not set. Submission received but not stored.",
      body
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: body.name,
        org: body.org,
        topics: body.topics,
        targetSpeaker: body.targetSpeaker,
        question: body.question,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[qna] Google Sheets webhook failed", res.status, text);
      return NextResponse.json(
        { error: "질문 저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[qna] Webhook fetch error", err);
    return NextResponse.json(
      { error: "질문 저장 중 네트워크 오류가 발생했습니다." },
      { status: 502 }
    );
  }
}

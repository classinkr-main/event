import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  organization?: string;
  position?: string;
  phone?: string;
  email?: string;
  dinner?: string;
  session?: string;
  source?: string;
};

const REQUIRED: (keyof Payload)[] = [
  "name",
  "organization",
  "position",
  "phone",
  "email",
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

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: "이메일 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!sheetsUrl) {
    console.warn(
      "[register] GOOGLE_SHEETS_WEBHOOK_URL not set. Submission was received but not stored.",
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
        organization: body.organization,
        position: body.position,
        phone: body.phone,
        email: body.email,
        dinner: body.dinner ?? "",
        session: body.session ?? "",
        source: body.source ?? "",
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[register] Google Sheets webhook failed", res.status, text);
      return NextResponse.json(
        { error: "신청 데이터 저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[register] Webhook fetch error", err);
    return NextResponse.json(
      { error: "신청 데이터 저장 중 네트워크 오류가 발생했습니다." },
      { status: 502 }
    );
  }
}

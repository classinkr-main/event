# 구글 시트 연동 가이드

신청 폼이 제출되면 구글 시트 한 줄로 자동 저장되도록 설정하는 절차입니다. 한 번만 세팅해두면 됩니다.

## 1단계 — 구글 시트 만들기

1. [sheets.google.com](https://sheets.google.com) 접속
2. **빈 스프레드시트** 새로 만들기 → 이름은 자유 (예: `2026 ASIA AI EDUCATION 신청자`)
3. **첫 번째 행**에 헤더 입력:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Name | Organization | Position | Phone | Email | Dinner | Source |

> `Source`는 유입 경로 식별자입니다. 현재는 `han` / `wp` 두 값이 들어오며, 기본 경로(`/2026-asia-ai-busan`)에서 들어온 신청은 빈 값입니다.

## 2단계 — Apps Script 작성

1. 시트 상단 메뉴: **확장 프로그램 → Apps Script**
2. 기본 코드 모두 지우고, 아래 붙여넣기:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp,
    data.name,
    data.organization,
    data.position,
    data.phone,
    data.email,
    data.dinner,
    data.source || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **저장 버튼**(💾 아이콘) 누르고 프로젝트 이름 아무거나 입력

## 3단계 — 웹 앱으로 배포

1. Apps Script 우측 상단 **배포 → 새 배포**
2. **유형 선택**(톱니바퀴 아이콘) → **웹 앱**
3. 설정:
   - **설명**: 아무거나 (예: `event register`)
   - **다음 사용자로 실행**: `나`
   - **액세스 권한이 있는 사용자**: `모든 사용자`
4. **배포** 클릭
5. 권한 요청 팝업 → 본인 구글 계정 선택 → "고급 → 안전하지 않은 페이지로 이동" → 허용
6. 완료되면 **웹 앱 URL**이 나옴 (예: `https://script.google.com/macros/s/AKfy.../exec`)
7. **이 URL을 복사**해두기

## 4단계 — Next.js에 URL 연결

프로젝트 루트에 `.env.local` 파일 만들고:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
```

> ⚠️ `.env.local`은 절대 깃에 커밋하면 안 됩니다 (`.gitignore`에 이미 포함돼 있음).

## 5단계 — Vercel에 환경변수 등록

배포한 사이트도 똑같이 알려줘야 작동합니다.

1. Vercel 프로젝트 페이지 → **Settings → Environment Variables**
2. `GOOGLE_SHEETS_WEBHOOK_URL` 키로 같은 URL 추가
3. **Save** → 다음 배포부터 적용됨

## 동작 확인

`npm run dev` 띄워놓고 폼을 한 번 제출하면 구글 시트에 새 행이 추가돼야 합니다. 안 되면:
- Apps Script 페이지에서 **실행 → 로그 보기**로 에러 확인
- 터미널에서 `npm run dev` 로그 확인 (`[register]` 접두사)

## 코드 수정 후 재배포

Apps Script 코드를 바꿨으면:
- **배포 → 배포 관리 → ✏️ 편집 → 버전 → 새 버전** 선택 후 다시 배포
- URL은 같으니까 `.env.local`은 안 바꿔도 됨

---

# 인천(0709-10incheon) 방문 트래킹 추가 — 2026-07-03

인천 페이지는 방문(페이지뷰)도 같은 스프레드시트의 **Visits 탭**에 기록됩니다. QR 스캔 수·인스타 유입 수를 여기서 집계합니다.

## 인천 시트의 Apps Script를 아래로 교체

**인천 전용 시트**(`GOOGLE_SHEETS_WEBHOOK_URL_INCHEON`에 연결된 시트)의 Apps Script를 통째로 교체:

```javascript
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  if (data.type === "visit") {
    let sheet = ss.getSheetByName("Visits");
    if (!sheet) {
      sheet = ss.insertSheet("Visits");
      sheet.appendRow([
        "Timestamp", "Channel", "Referrer", "Device",
        "FirstVisit", "Path", "UserAgent",
      ]);
    }
    sheet.appendRow([
      data.timestamp,
      data.channel,
      data.referrer,
      data.device,
      data.firstVisit,
      data.path,
      data.userAgent,
    ]);
  } else {
    // 인천 신청자 시트 컬럼: Timestamp, Name, Organization, Position,
    // Phone, Email, Session, Source (부산과 달리 Dinner 대신 Session)
    const sheet = ss.getSheets()[0];
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.organization,
      data.position,
      data.phone,
      data.email,
      data.session || "",
      data.source || "",
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

교체 후 **배포 → 배포 관리 → ✏️ 편집 → 버전: 새 버전 → 배포** (URL은 그대로).

> ⚠️ **순서 중요**: Apps Script를 먼저 교체·재배포한 뒤에 사이트를 배포(git push)해야 합니다. 순서가 바뀌면 방문 로그가 신청자 시트에 깨진 행으로 들어갑니다.

## Channel 값 해석

| Channel | 의미 |
|---|---|
| `qr-direct` | referrer 없이 진입 — 인쇄된 QR 스캔으로 추정 (주소 직접 입력 포함) |
| `instagram` | 인스타그램 인앱 브라우저 UA 또는 instagram.com referrer |
| `utm_source` 값 | 링크에 `?utm_source=...`를 붙인 경우 그 값이 그대로 기록 (가장 정확) |
| 그 외 호스트명 | 다른 사이트에서 링크 타고 온 경우 |

- **FirstVisit = Y** 행만 세면 순 방문자(같은 브라우저 재방문 제외), 전체 행은 세션 수입니다.
- 신청자 시트의 Source 열에는 `0709-10incheon/qr-direct` 형태로 유입 채널이 붙어서, 채널별 신청 전환도 확인 가능합니다.

## 인스타에 걸 때 권장 링크

인스타 프로필/게시물에는 아래처럼 utm을 붙여 쓰면 추정 없이 정확하게 잡힙니다:

```
https://meets.classin.co.kr/0709-10incheon?utm_source=instagram
```

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

# 서울 목동(seoul-mokdong) 추가 — 2026-07-27

서울 목동 설명회(8/20 목, 클래스인코리아)는 **인천 시트를 그대로 공유**합니다. 새 시트·새 env 변수 없음:
- 신청: `/api/register`가 source `seoul-mokdong`도 `GOOGLE_SHEETS_WEBHOOK_URL_INCHEON`으로 전송 → 아래 스크립트가 **"서울 목동" 탭**(없으면 자동 생성)에 기록
- 방문: `/api/track`은 페이지 구분 없이 같은 웹훅 → Visits 탭, Path 컬럼(`/seoul-mokdong`)으로 구분

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
    // 신청자 컬럼: Timestamp, Name, Organization, Position,
    // Phone, Email, Session, Source (부산과 달리 Dinner 대신 Session)
    // source가 seoul-mokdong이면 "서울 목동" 탭, 아니면 첫 번째 탭(인천)
    let sheet;
    if ((data.source || "").indexOf("seoul-mokdong") === 0) {
      sheet = ss.getSheetByName("서울 목동");
      if (!sheet) {
        sheet = ss.insertSheet("서울 목동");
        sheet.appendRow([
          "Timestamp", "Name", "Organization", "Position",
          "Phone", "Email", "Session", "Source",
        ]);
      }
    } else {
      sheet = ss.getSheets()[0];
    }
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

---

# 학원전자 공동구매 상담(hakwonjeonja) 추가 — 2026-09-30

`/hakwonjeonja` 상담 신청 페이지는 **전용 스프레드시트**를 씁니다(사용자 결정, 인천 시트와 분리):
- 시트: "[MKT] 학원전자 공구 상담 신청 리드" `1fLoAh4gCtOc6cEhKf0AsEX-9g6JEdP6FNM9hDdGUPok` (heesung.shin@classin.com 소유, 컨테이너 바인딩 Apps Script 프로젝트 `1PqEBxpJSyYquQlKSVhLuR_PDC4ufsQan5HmNabZK4TPTdBz6fHuixqdv`, 웹 앱 배포 v1 2026-09-30, 실행 계정 heesung.shin, 액세스 Anyone)
- env: `GOOGLE_SHEETS_WEBHOOK_URL_HAKWONJEONJA` (Vercel production/preview + .env.local). 미설정 시 `GOOGLE_SHEETS_WEBHOOK_URL_INCHEON`으로 폴백.
- 상담 신청: `/api/consult`가 `type: "consult"`로 전송 → 첫 탭에 기록(헤더 자동 생성). 방문: `/api/track`은 여전히 인천 시트 Visits 탭(Path `/hakwonjeonja`).

## 웹 신청서 정리 (2026-10-30)
- 저녁 사용자 "입장 코드 빼자" → **초청 코드 완전 삭제**: 신청서 INVITE CODE 칸, API `matchCode` 검사(401), `?code=` 미리 채움(page.tsx searchParams), `src/lib/beijingInvite.ts` 삭제. env `BEIJING_INVITE_CODES`는 더 이상 안 읽음(Vercel에도 없음). 구글폼은 10/29에 이미 코드 문항을 뺐으니 양쪽 모두 코드 없음. 아래 「초청 코드」 절은 이력용.
- 사용자 지시 3건: 「이메일은 안 받아도 됨」 → EMAIL 칸 삭제(API도 필수 해제, Email 열은 빈 값으로 유지). 「인원수 빼, 각자 적게」 → PARTY 선택 삭제(참가자 각자 신청, Party 열은 빈 값). 「여권 필수 + 직접 제출/담당 매니저에게 제출 선택」 → `passportMethod` 라디오 필수(「지금 직접 제출」이면 파일 칸이 나타나고 필수, 「담당 매니저에게 제출」이면 파일 없이 접수).
- API `/api/beijing`: `passportMethod`가 두 값 중 하나가 아니면 400, 직접 제출인데 `passportImage`가 없으면 400. 웹훅에는 `passportMethod`를 같이 보냄 → Apps Script v2.1에서 Passport 열 = Drive 링크 또는 제출 방식 문구(한 줄 수정, 아래 코드 반영). 동의문에서 「이메일」 삭제.
- 항공편 섹션은 공항 출발 안내판(스플릿 플랩) 디자인으로 교체(`BjFlights.tsx`, `gfx/FlapText.tsx`), 시트와 무관.
- ✅ 구글폼도 같게(사용자 "구글폼도 마찬가지"): 스크립트에 `updateBeijingFormV3()`(아래, 다시 실행해도 안전) 추가 후 heesung 계정으로 실행 완료(16:42). 「이메일」「참가 인원」 문항 삭제, 동의문에서 이메일 삭제, 「여권 사본」 섹션 안내문 갱신, 섹션 바로 뒤에 **「여권 사본 제출 방식」 객관식 필수**(지금 직접 제출 / 담당 매니저에게 제출) 추가, 파일 업로드 문항은 선택 유지(폼은 조건부 필수 불가) + 도움말. 결과 순서: 참석자 정보(동의·성함·기관·직책·연락처) → 항공편·숙소(항공편·편명·객실·동행·여권 사본 헤더·**제출 방식**·예시 이미지·업로드) → 사전 질문. 응답 탭의 옛 이메일·참가 인원 열은 응답이 없으면 지워도 됨.

```javascript
/** 10/30: 웹 신청서와 같게 — 「이메일」「참가 인원」 문항 삭제, 「여권 사본 제출 방식」(필수) 추가, 동의문·여권 안내문 갱신. 다시 실행해도 안전 */
function updateBeijingFormV3() {
  const form = FormApp.openById("17Q-z7aUbbUXTYdiKuQuJlcY_G7fMH05noj3Jdk0gTxk");
  const T = (it) => it.getTitle().trim();
  form.getItems().forEach((it) => {
    if (T(it) === "이메일" || T(it) === "참가 인원") form.deleteItem(it);
  });
  form.getItems(FormApp.ItemType.CHECKBOX).forEach((it) => {
    if (T(it) === "개인정보 수집·이용 동의") it.setHelpText(it.getHelpText().replace("연락처, 이메일, 소속", "연락처, 소속"));
  });
  form.getItems(FormApp.ItemType.SECTION_HEADER).forEach((it) => {
    if (T(it) === "여권 사본") {
      it.setHelpText("숙소 예약에 여권 사진면이 필요합니다. 지금 올리기 어려우시면 「담당 매니저에게 제출」을 고르시고 접수 후 안내드리는 방법으로 보내 주세요. 예약이 끝나면 바로 폐기합니다.");
    }
  });
  const title = "여권 사본 제출 방식";
  const found = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).find((it) => T(it) === title);
  const mc = found ? found.asMultipleChoiceItem() : form.addMultipleChoiceItem();
  mc.setTitle(title)
    .setHelpText("「지금 직접 제출」을 고르셨으면 바로 아래 업로드 칸에 여권 사진면을 올려 주세요.")
    .setChoiceValues(["지금 직접 제출", "담당 매니저에게 제출"])
    .setRequired(true);
  const items = form.getItems();
  const header = items.find((it) => it.getType() === FormApp.ItemType.SECTION_HEADER && T(it) === "여권 사본");
  const cur = items.find((it) => T(it) === title);
  if (header && cur && cur.getIndex() !== header.getIndex() + 1) form.moveItem(cur.getIndex(), header.getIndex() + 1);
  form.getItems(FormApp.ItemType.FILE_UPLOAD).forEach((it) => {
    it.setHelpText("「지금 직접 제출」을 고르신 분만 올려 주세요. 여권 사진면 이미지 1장(10MB 이하).");
  });
  Logger.log(form.getItems().map((it) => it.getIndex() + " " + it.getType() + " " + T(it)).join("\n"));
}
```
- 로컬 테스트 교훈: `GOOGLE_SHEETS_WEBHOOK_URL_BEIJING`만 비우면 `_INCHEON`으로 폴백해 **인천 시트에 실제 행이 들어감**. 로컬 dev는 `GOOGLE_SHEETS_WEBHOOK_URL*` 네 변수를 모두 빈 값으로 띄울 것(10/30 테스트 행 2건 인천 탭에서 삭제함).

## 신청 항목 확장 + 구글폼 (2026-10-29 저녁)
- 콜라보 요청(동료 메시지): 항공편(가는 11/24 CA126 17:50→18:55, 오는 11/27 OZ336 17:30→20:25) 안내, 천단 사진 제거, 항공·숙박 자기 부담 표기, 옛 광저우 구글폼(1iOpzjhhAF88WJgChTgk8E5uHXOWvAFUw6VUZZNZKgxI) 질문 참고해 항목 보강, 구글폼 신청서 별도 생성.
- 웹 신청서 추가 항목: 항공편 선택(`arrival`: 안내 항공편/다른 항공편/미정 + `flightDetail`), 숙소 객실(`room` 필수: 더블/트윈/직접 예약 + `roommate`), 여권 사본(`passportImage` JPEG data URL, 브라우저에서 긴 변 1600px로 축소, 선택), 듣고 싶은 주제(`topics`), 기관 질문(`question`), 개인정보 동의(`consent`=Y 필수). 서버는 동의·객실 없으면 400, 이미지는 jpeg/png/webp data URL 4M자 이하만.
- 시트 "참가 신청" 헤더 L~R 추가: Room, Roommate, FlightDetail, Passport(드라이브 링크), Topics, Question, Consent. 여권 파일은 드라이브 폴더 "[MKT] ClassIn Meets 베이징 탐방 여권 사본" `1jXCmVf8L-JosQSgA0ZbOL6-HWlI6H_M4`(classinkr 소유, heesung 편집자).
- Apps Script v2(아래): `savePassport_`로 Drive 저장, `createBeijingForm()`을 한 번 실행하면 구글폼 "ClassIn Meets Beijing 참가 신청"을 만들고 응답을 이 시트에 연결(새 탭 생성). **파일 업로드 항목은 FormApp으로 못 만들어 폼 편집 화면에서 "여권 사본" 섹션 아래에 직접 추가**해야 함. 초청 코드는 정규식 검증(`베이징1124`, 공백·하이픈 허용).
- ✅ 2026-10-29 18:25 heesung.shin 계정으로 권한 승인 → `createBeijingForm` 실행(구글폼 편집 `17Q-z7aUbbUXTYdiKuQuJlcY_G7fMH05noj3Jdk0gTxk`, 응답 링크 `https://docs.google.com/forms/d/e/1FAIpQLSf_FkLFSGg8zlqmSJYHBcHjV5S9AamC8ddJTCRDIaW9Xot5gw/viewform`, 응답 탭 「설문지 응답 시트1」이 맨 앞에 생김) → **새 웹 앱 배포(버전 3, 실행 계정 heesung.shin@classin.com, 모든 사용자)** URL `https://script.google.com/macros/s/AKfycbzo54oImJOm5yYEDQpPJlGAij8uzOBiVNA3f18gfFR38mzFiwZsXqJg0HgDkaSPjuE5/exec` → env `GOOGLE_SHEETS_WEBHOOK_URL_BEIJING`(Vercel production + .env.local) 교체. 옛 classinkr 배포(버전 2)는 그대로 두되 더 이상 안 씀.
- ✅ 18:30 구글폼 편집 화면에서 「여권 사본」 섹션 아래에 **파일 업로드 문항 「여권 사진면 업로드」(선택, 1개, 10MB)** 수동 추가. 파일 업로드 문항이 있으면 응답자는 구글 로그인이 필요함(viewform이 비로그인엔 401). 운영 E2E(웹 → Vercel → 새 웹훅 → 시트 18열 + Drive 여권 파일) 확인 후 테스트 행 3건·Visits 테스트 탭·여권 테스트 파일 3개 정리(스크립트의 `cleanupTestPassports`로 휴지통 이동). 시트 탭 순서: 「설문지 응답 시트1」(구글폼) → 「참가 신청」(웹).
- ✅ 21:00 구글폼 개편(스크립트 함수 `updateBeijingFormLayout`, 다시 실행해도 안전): **초청 코드 문항 삭제**(응답 시트 B열도 삭제, 웹 신청서는 코드 유지), 안내문 줄바꿈(설명·동의·항공편·객실·여권), **페이지 4개**(① 안내 ② 참석자 정보 ③ 항공편 · 숙소 ④ 교육 기관 방문 사전 질문), 「여권 사본」 아래에 옛 광저우 폼과 같은 **여권 사진면 예시 이미지**(외교부 견본 홍길순) 추가. 아래 v2 코드의 `createBeijingForm`은 최초 생성용이라 초청 코드 문항이 남아 있음(재실행 금지).

## 전용 시트 Apps Script (v2, 2026-10-29)

```javascript
// 클래스인_베이징_탐방_신청 — v2 (2026-10-29): 룸타입·동행·항공편 상세·여권 사본(Drive)·주제·질문·동의 추가 + 구글폼 생성 함수
const HEADERS = [
  "Timestamp", "Name", "Organization", "Position", "Phone", "Email",
  "Party", "Arrival", "Message", "Interests", "Source",
  "Room", "Roommate", "FlightDetail", "Passport", "Topics", "Question", "Consent",
];
const REG_SHEET_NAME = "참가 신청";
const SHEET_ID = "1eMhW7X_zF93jZ2pitPtHyYCf8aENKP4eJRw7MxMer78";
const PASSPORT_FOLDER_ID = "1jXCmVf8L-JosQSgA0ZbOL6-HWlI6H_M4"; // [MKT] ClassIn Meets 베이징 탐방 여권 사본

function savePassport_(data) {
  if (!data.passportImage) return "";
  try {
    const mime = data.passportMime || "image/jpeg";
    const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
    const stamp = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyyMMdd-HHmm");
    const name = [data.name || "이름없음", data.organization || "", stamp].filter(String).join("_") + "_여권." + ext;
    const blob = Utilities.newBlob(Utilities.base64Decode(data.passportImage), mime, name);
    return DriveApp.getFolderById(PASSPORT_FOLDER_ID).createFile(blob).getUrl();
  } catch (err) {
    return "저장 실패: " + err;
  }
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  if (data.type === "visit") {
    let sheet = ss.getSheetByName("Visits");
    if (!sheet) {
      sheet = ss.insertSheet("Visits");
      sheet.appendRow(["Timestamp", "Channel", "Referrer", "Device", "FirstVisit", "Path", "UserAgent"]);
    }
    sheet.appendRow([data.timestamp, data.channel, data.referrer, data.device, data.firstVisit, data.path, data.userAgent]);
  } else {
    // 구글폼 응답 탭이 맨 앞에 끼어들 수 있으므로 이름으로 찾는다
    const sheet = ss.getSheetByName(REG_SHEET_NAME) || ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    } else if (sheet.getLastColumn() < HEADERS.length) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }
    // v2.1(10/30): 직접 제출이면 Drive 링크, 아니면 웹 신청서의 제출 방식 문구("담당 매니저에게 제출")
    const passportUrl = savePassport_(data) || data.passportMethod || "";
    sheet.appendRow([
      data.timestamp, data.name, data.organization, data.position, data.phone,
      data.email || "", data.party || "", data.arrival || "", data.message || "",
      data.interests || "", data.source || "",
      data.room || "", data.roommate || "", data.flightDetail || "", passportUrl,
      data.topics || "", data.question || "", data.consent || "",
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** 한 번만 실행: 구글폼 신청서를 만들고 응답을 이 시트에 연결한다. 파일 업로드 항목은 스크립트로 못 만들어 편집 화면에서 직접 추가 */
function createBeijingForm() {
  const CONSENT = "ClassIn Korea는 본 행사 운영을 위해 성명, 직책, 연락처, 이메일, 소속 기관명, 여권 사본, 숙소·항공 선호 정보를 수집합니다. 행사 운영, 숙소 예약, 기관 방문 사전 조율에만 쓰고 행사 종료 후 즉시 폐기합니다. 동의하지 않으시면 참가 신청이 제한될 수 있습니다.";
  const form = FormApp.create("ClassIn Meets Beijing 참가 신청");
  form.setDescription(
    "AI 시대, 학원의 다음 모습을 직접 보는 3일. 2026년 11월 24일(화)–27일(금), 중국 베이징.\n" +
    "GET 교육기술 대회 · ClassIn 본사 · 베이징 학원과 대학 방문.\n\n" +
    "항공편과 숙박은 자기 부담입니다. 예약 방법은 접수 후 개별 안내드립니다.\n" +
    "안내 페이지: https://meets.classin.co.kr/beijing\n" +
    "작성에 5분쯤 걸리며, 여권 사진면 이미지를 준비해 주세요."
  );
  form.setConfirmationMessage("접수되었습니다. 숙소 예약과 세부 일정은 담당자가 개별 연락드립니다.");
  form.setAllowResponseEdits(false);
  form.setProgressBar(false);

  const code = form.addTextItem().setTitle("초청 코드").setHelpText("초청장과 함께 받으신 코드를 입력해 주세요.").setRequired(true);
  code.setValidation(
    FormApp.createTextValidation()
      .setHelpText("초청 코드가 올바르지 않습니다. 안내받으신 코드를 다시 확인해 주세요.")
      .requireTextMatchesPattern("^\\s*베이징\\s*[-_]?\\s*1124\\s*$")
      .build()
  );
  form.addCheckboxItem().setTitle("개인정보 수집·이용 동의").setHelpText(CONSENT).setChoiceValues(["위 개인정보 수집·이용에 동의합니다."]).setRequired(true);
  form.addTextItem().setTitle("성함").setRequired(true);
  form.addTextItem().setTitle("소속 기관(학원)명").setRequired(true);
  form.addTextItem().setTitle("직책").setHelpText("예: 원장, 대표").setRequired(true);
  form.addTextItem().setTitle("연락처").setHelpText("예: 010-1234-5678").setRequired(true);
  const email = form.addTextItem().setTitle("이메일").setRequired(true);
  email.setValidation(FormApp.createTextValidation().setHelpText("이메일 형식을 확인해 주세요.").requireTextIsEmail().build());
  form.addMultipleChoiceItem().setTitle("참가 인원").setChoiceValues(["1명 (본인)", "2명", "3명 이상"]).setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle("항공편")
    .setHelpText("항공은 자기 부담입니다. 안내 항공편 — 가는 편 11/24(화) 중국국제항공 CA126 인천 17:50 → 베이징 18:55 · 돌아오는 편 11/27(금) 아시아나항공 OZ336 베이징 17:30 → 인천 20:25")
    .setChoiceValues(["안내 항공편 이용 (11/24 CA126 · 11/27 OZ336)", "다른 항공편 이용", "미정"])
    .setRequired(true);
  form.addTextItem().setTitle("다른 항공편이면 편명과 도착 시각").setHelpText("예: 11/24 OZ335 · 15:10 도착");
  form.addMultipleChoiceItem()
    .setTitle("숙소 객실 타입")
    .setHelpText("크라운 플라자 베이징 중관춘(5성급). 1박 기준 더블 950위안(약 19만 원, 조식 1인) · 트윈 1,050위안(약 21만 원, 조식 2인). 숙박비는 자기 부담이며 예약·결제 방법은 접수 후 안내드립니다.")
    .setChoiceValues(["더블 (950위안 · 조식 1인)", "트윈 (1,050위안 · 조식 2인)", "숙소 직접 예약"])
    .setRequired(true);
  form.addTextItem().setTitle("트윈이면 함께 쓰실 분").setHelpText("예: ○○학원 홍길동");
  form.addSectionHeaderItem().setTitle("여권 사본").setHelpText("숙소 예약에 필요합니다. 아래 업로드 칸에 여권 사진면을 올려 주세요. 예약이 끝나면 바로 폐기합니다.");
  form.addCheckboxItem().setTitle("관심 있는 일정").setChoiceValues([
    "11/25 GET 메인 포럼", "11/25 AI 신교육 특별 세션", "11/26 쉐팡교육 방문", "11/26 CTO 제품 로드맵",
    "11/26 샹량교육 발표", "11/26 리루이 발표", "11/27 협력 대학 방문",
  ]);
  form.addCheckboxItem().setTitle("듣고 싶은 주제").setChoiceValues([
    "AI 수업 운영 방식과 실제 활용 사례", "강사 관리와 수업 품질 표준화", "하이브리드 수업 구조와 기준",
    "AI·디지털 도구 도입 시 선택 기준", "학생·학부모 커뮤니케이션 방식", "한국 학원이 참고할 중국 교육 기관의 특징",
    "마케팅·홍보 방안", "학원 규모 확장과 시스템화",
  ]).showOtherOption(true);
  form.addParagraphTextItem().setTitle("방문 기관에 전달할 질문").setHelpText("현장에서 꼭 확인하고 싶은 내용. 특정 기관이면 [기관명 / 질문] 형식으로 적어 주세요.");
  form.addParagraphTextItem().setTitle("요청사항").setHelpText("항공, 숙박, 식사 관련 요청이나 궁금한 점");

  form.setDestination(FormApp.DestinationType.SPREADSHEET, SHEET_ID);
  Logger.log("EDIT " + form.getEditUrl());
  Logger.log("VIEW " + form.getPublishedUrl());
  return form.getPublishedUrl();
}
```

## 전용 시트 Apps Script (v1, 참고)

```javascript
const HEADERS = [
  "Timestamp", "Name", "Organization", "Position", "Phone", "Email",
  "Interest", "Rooms", "Message", "Source",
];

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  if (data.type === "visit") {
    let sheet = ss.getSheetByName("Visits");
    if (!sheet) {
      sheet = ss.insertSheet("Visits");
      sheet.appendRow(["Timestamp", "Channel", "Referrer", "Device", "FirstVisit", "Path", "UserAgent"]);
    }
    sheet.appendRow([data.timestamp, data.channel, data.referrer, data.device, data.firstVisit, data.path, data.userAgent]);
  } else {
    const sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      data.timestamp, data.name, data.organization, data.position, data.phone,
      data.email || "", data.interest || "", data.rooms || "", data.message || "", data.source || "",
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> (참고) 아래 "인천 시트 v4" 스크립트는 인천 프로젝트에 **코드만 저장되고 배포되지 않았습니다**(분리 결정으로 불필요). 인천 라이브 배포는 여전히 버전 3입니다.

### (폐기) 인천 시트 공유안

컬럼: Timestamp, Name, Organization, Position, Phone, Email, Interest(관심 상품 A/B/C/미정), Rooms(강의실 수), Message(문의 내용), Source

## 인천 시트의 Apps Script를 아래로 교체 (버전 4)

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
  } else if (data.type === "consult") {
    // 학원전자 공동구매 상담 신청 (/hakwonjeonja)
    let sheet = ss.getSheetByName("학원전자 상담");
    if (!sheet) {
      sheet = ss.insertSheet("학원전자 상담");
      sheet.appendRow([
        "Timestamp", "Name", "Organization", "Position", "Phone", "Email",
        "Interest", "Rooms", "Message", "Source",
      ]);
    }
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.organization,
      data.position,
      data.phone,
      data.email || "",
      data.interest || "",
      data.rooms || "",
      data.message || "",
      data.source || "",
    ]);
  } else {
    // 신청자 컬럼: Timestamp, Name, Organization, Position,
    // Phone, Email, Session, Source (부산과 달리 Dinner 대신 Session)
    // source가 seoul-mokdong이면 "서울 목동" 탭, 아니면 첫 번째 탭(인천)
    let sheet;
    if ((data.source || "").indexOf("seoul-mokdong") === 0) {
      sheet = ss.getSheetByName("서울 목동");
      if (!sheet) {
        sheet = ss.insertSheet("서울 목동");
        sheet.appendRow([
          "Timestamp", "Name", "Organization", "Position",
          "Phone", "Email", "Session", "Source",
        ]);
      }
    } else {
      sheet = ss.getSheets()[0];
    }
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

> ⚠️ 순서: Apps Script 먼저 교체·재배포 → 그 다음 사이트 배포. 순서가 바뀌면 상담 신청이 인천 탭에 섞여 들어갑니다.

> 참고(2026-09-30): `/api/consult`는 호환용으로 `session` 필드에 `관심=… | 강의실=… | 문의=…` 요약도 함께 보냅니다. 스크립트가 아직 v3(상담 분기 없음)이면 상담 신청이 **인천 탭**(첫 탭)에 들어가되 Session 컬럼에 이 요약이 남고 Source가 `hakwonjeonja/…`로 찍히므로 데이터는 잃지 않습니다. v4 배포 후에는 "학원전자 상담" 탭으로 정상 분기됩니다.

# 베이징 초청 탐방(beijing) 추가 — 2026-10-13

`/beijing`은 누구나 열리는 안내 페이지이고, 참가 신청도 **초청 코드 없이** 접수됩니다(2026-10-30부터). 2026-10-29까지는 페이지 입장 자체를 코드 게이트로 막았고, 10/29 저녁~10/30 낮에는 신청 시 코드 확인이었음.

## 초청 코드 (이력 — 2026-10-30 저녁 삭제, 아래는 옛 동작)
- env `BEIJING_INVITE_CODES` — 쉼표로 여러 개. 대소문자·공백·하이픈 등 기호는 무시(`베이징 1124` = `베이징1124`). 비우면 기본값 `베이징1124`. Vercel production에도 같은 값 등록(2026-10-29 교체).
- 흐름: 신청서 맨 위 「INVITE CODE / 초청 코드」 칸 → `POST /api/beijing {code, ...}` → 코드가 틀리면 401(폼에 오류 표시, 입력값 유지), 맞으면 시트 저장. 쿠키·게이트 API(`/api/beijing/invite`)는 삭제됨.
- 초청 링크에 `?code=베이징1124`를 붙이면 신청서의 코드 칸이 미리 채워집니다. 예: `https://meets.classin.co.kr/beijing?code=베이징1124#register`
- 일정·세션에서 「관심 표시」한 항목은 `interests`(쉼표 구분 라벨)로 함께 저장됩니다.

## 시트
- **전용 시트** "[MKT] ClassIn Meets 베이징 탐방 참가 신청" `1eMhW7X_zF93jZ2pitPtHyYCf8aENKP4eJRw7MxMer78` (classinkr@classin.com 소유, heesung.shin@classin.com 편집자, 첫 탭 "참가 신청"에 헤더 11열(Interests 포함) 입력·고정 완료, 2026-10-13 생성)
- 컨테이너 바인딩 Apps Script "클래스인_베이징_탐방_신청" `1Rgz89rq8FP8zHv0yqfpdFvlLtYcI52CE5D4AwN4YiNDATmte1WOw2NxS` — 아래 v1 코드(Interests 포함) 저장 후 **웹 앱 배포 완료(버전 2, 2026-10-13 13:38, 실행 계정 classinkr@classin.com, 액세스 모든 사용자)**. 배포 URL은 env `GOOGLE_SHEETS_WEBHOOK_URL_BEIJING`(Vercel production + .env.local)에 등록. 코드 수정 시 "배포 관리 → 수정 → 새 버전"으로 같은 URL 유지.
- env `GOOGLE_SHEETS_WEBHOOK_URL_BEIJING`. 미설정이면 인천 시트 웹훅으로 폴백 → 인천 탭에 들어가되 Source `beijing/…`, Session 컬럼에 `인원=…|도착=…|요청=…` 요약이 남아 데이터는 잃지 않음.
- 방문 로그는 기존대로 인천 시트 Visits 탭 + Compass(Path `/beijing/gate` = 코드 입력 화면, `/beijing` = 열람).

## 전용 시트 Apps Script (v1)

```javascript
const HEADERS = [
  "Timestamp", "Name", "Organization", "Position", "Phone", "Email",
  "Party", "Arrival", "Message", "Interests", "Source",
];

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  if (data.type === "visit") {
    let sheet = ss.getSheetByName("Visits");
    if (!sheet) {
      sheet = ss.insertSheet("Visits");
      sheet.appendRow(["Timestamp", "Channel", "Referrer", "Device", "FirstVisit", "Path", "UserAgent"]);
    }
    sheet.appendRow([data.timestamp, data.channel, data.referrer, data.device, data.firstVisit, data.path, data.userAgent]);
  } else {
    const sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      data.timestamp, data.name, data.organization, data.position, data.phone,
      data.email || "", data.party || "", data.arrival || "", data.message || "",
      data.interests || "", data.source || "",
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 송도 설명회 신청 페이지 (added 2026-10-20, route `/songdo`)

- Live: `https://meets.classin.co.kr/songdo` — 10/29 송도 설명회 A5 전단지 QR 랜딩(UTM 없음 → 채널 `qr-direct`).
- 신청: `/api/register`가 source `songdo-1029`도 `GOOGLE_SHEETS_WEBHOOK_URL_INCHEON`으로 전송. **이메일은 선택 항목**(QR·모바일 유입이라 입력 최소화) — 서버도 source가 `songdo`로 시작하면 email 필수 검사를 건너뜀.
- 방문: `/api/track` → Visits 탭 Path `/songdo` + Compass page_visits(page `songdo`).
- Apps Script 분기: 아래처럼 `songdo` 분기를 넣으면 **"송도 10/29" 탭**에 쌓임. 분기가 없는 스크립트 버전이면 첫 탭(인천)에 들어가되 Source `songdo-1029/…`, Session `송도 · 10월 29일 (목) 11:00`로 구분됨.

```js
    } else if ((data.source || "").indexOf("songdo") === 0) {
      sheet = ss.getSheetByName("송도 10/29");
      if (!sheet) {
        sheet = ss.insertSheet("송도 10/29");
        sheet.appendRow([
          "Timestamp", "Name", "Organization", "Position",
          "Phone", "Email", "Session", "Source",
        ]);
      }
```

### 2026-10-20 보기 탭 「송도 10/29 신청」 (Apps Script 재배포 없이 분리)
- Apps Script 편집기에는 위 `songdo` 분기(→ "송도 10/29" 탭)가 **저장만** 돼 있고 재배포는 안 됨(활성 배포 'Untitled' = 버전 3, 7/27). 재배포는 **배포 → 배포 관리 → ✏️ → 버전: 새 버전 → 배포**(클릭 3번) — 자동화 도구의 운영 배포 차단 정책 때문에 사람이 눌러야 함.
- 대신 시트에 **보기 탭 「송도 10/29 신청」**(sheetId 2086702545, A2 QUERY)을 만들어 첫 탭(청라, 송도)과 "송도 10/29" 탭(있으면) 양쪽에서 Source가 `songdo`로 시작하는 행만 최신순으로 모아 보여줌. 재배포 전·후 모두 이 탭 하나로 송도 신청을 보면 됨. 이 탭엔 직접 입력하지 말 것(수식 탭).
- ✅ 2026-10-20 사용자가 classinkr@classin.com 으로 재배포 완료(새 버전). 운영 테스트로 `songdo-1029` 신청이 첫 탭이 아닌 **"송도 10/29" 탭**(자동 생성, sheetId 318068285)에 들어가는 것 확인 후 테스트 행 삭제. 보기 탭 「송도 10/29 신청」은 이 탭도 합쳐 보여줌.

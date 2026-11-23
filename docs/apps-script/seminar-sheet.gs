/**
 * 설명회 시트 Apps Script — 「[MKT] 설명회 신청 페이지 유입 리드」 (v5, 2026-11-23)
 *
 * 웹앱 하나가 두 가지를 받는다(event 저장소 /api/register · /api/track 이 GOOGLE_SHEETS_WEBHOOK_URL_INCHEON 으로 보낸다):
 *   - 신청(type "signup" — 옛 판은 type 없음) → 「신청」 탭 한 줄
 *   - 방문(type "visit")                       → 「방문」 탭 한 줄
 * 탭 이름이 페이지마다 갈리지 않는다 — 새 설명회를 열어도 이 스크립트를 고치거나 다시 배포할 일이 없다.
 * 왼쪽 칸은 사람이 읽는 것(시각·페이지·유입·사람), 오른쪽 칸은 원문(UTM·신청 ID·Source)이다. 필터는 「페이지」 칸으로 건다.
 * 옛 탭(청라, 송도 · 송도 10/29 · 서울 목동 · Visits)은 그대로 둔다 — 이 판부터 새 줄은 안 들어간다.
 *
 * 이 파일이 정본이다 — 편집기에 붙여 넣고 배포 → 배포 관리 → ✏️ → 버전: 새 버전 → 배포(웹앱 주소는 그대로).
 */

var SIGNUP_TAB = "신청";
var VISIT_TAB = "방문";
var SIGNUP_HEADERS = [
  "신청 시각", "페이지", "유입", "이름", "학원", "직책", "전화", "이메일", "일정", "Compass",
  "신청 ID", "utm_source", "utm_medium", "utm_campaign", "utm_content (광고 ID)", "utm_term", "첫 주소", "Source",
];
var VISIT_HEADERS = ["방문 시각", "페이지", "유입", "기기", "첫 방문", "채널 키", "Referrer", "Path", "UserAgent"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.type === "visit") writeVisit_(data);
    else writeSignup_(data);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function tab_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name, 0);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

/** 옛 판 event 서버(kst 없음)가 보내도 쓴다 — 시각은 timestamp 를 한국 시각으로 */
function kst_(data) {
  if (data.kst) return data.kst;
  var d = data.timestamp ? new Date(data.timestamp) : new Date();
  return Utilities.formatDate(d, "Asia/Seoul", "yyyy-MM-dd HH:mm");
}

function writeSignup_(data) {
  var sheet = tab_(SIGNUP_TAB, SIGNUP_HEADERS);
  var source = data.source || "";
  sheet.appendRow([
    kst_(data),
    data.page_label || source.split("/")[0],
    data.channel_label || source.split("/")[1] || "",
    data.name || "",
    data.organization || "",
    data.position || "",
    // 전화는 글자로(앞 0 이 숫자로 바뀌지 않게)
    data.phone ? "'" + data.phone : "",
    data.email || "",
    data.session || "",
    data.compass || "",
    data.signup_id || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || "",
    data.landing || "",
    source,
  ]);
}

function writeVisit_(data) {
  var sheet = tab_(VISIT_TAB, VISIT_HEADERS);
  sheet.appendRow([
    kst_(data),
    data.page_label || (data.path || "").split("?")[0],
    data.channel_label || data.channel || "",
    data.device === "mobile" ? "모바일" : "PC",
    data.firstVisit === "Y" ? "처음" : "다시",
    data.channel || "",
    data.referrer || "",
    data.path || "",
    data.userAgent || "",
  ]);
}

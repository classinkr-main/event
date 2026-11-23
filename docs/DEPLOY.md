# Vercel 배포 가이드

GitHub에 올린 코드를 Vercel에 연결해서 실제 인터넷 주소(URL)로 띄우는 절차입니다. 5분 정도 걸려요.

## 0단계 — 준비물

- ✅ GitHub에 코드 푸시 완료
- ✅ 구글 시트 + Apps Script 웹 앱 URL (안 했으면 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) 먼저)

## 1단계 — Vercel 가입

1. [vercel.com](https://vercel.com) 접속
2. **Sign Up** → **Continue with GitHub** 선택 (가장 편함)
3. GitHub 권한 승인

> 무료 플랜(Hobby)으로 충분합니다. 결제 정보 안 묻습니다.

## 2단계 — 저장소 연결

1. 가입 후 대시보드에서 **Add New... → Project**
2. **Import Git Repository** 화면에서 `event-busan_0529` 찾기
   - 안 보이면 **Adjust GitHub App Permissions**에서 이 저장소 접근 허용
3. **Import** 클릭

## 3단계 — 환경변수 추가

배포 화면에서 **Environment Variables** 섹션 펼치기:

| Key | Value |
|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | Apps Script 배포 URL (`https://script.google.com/macros/s/.../exec`) |
| `GOOGLE_SHEETS_WEBHOOK_URL_INCHEON` | 설명회 시트 Apps Script 웹앱 URL — 신청 「신청」 탭 · 방문 「방문」 탭(`docs/apps-script/seminar-sheet.gs`) |
| `COMPASS_VISIT_URL` · `COMPASS_VISIT_TOKEN` | Compass 방문 웹훅(`https://mkt.classin.co.kr/api/webhook/page-visit`) · Compass `VISIT_INGEST_TOKEN` 과 같은 값 |
| `COMPASS_SIGNUP_TOKEN` | Compass 신청 웹훅 토큰 — Compass `EVENT_SIGNUP_TOKEN` 과 같은 값. 없으면 신청이 Compass 로 안 가고 시트 「Compass」 칸에 「꺼짐」 |
| `COMPASS_SIGNUP_URL` (선택) | 기본은 `COMPASS_VISIT_URL` 의 `page-visit` → `event-signup` |

> 이거 빼먹으면 폼 제출은 되는데 시트에 저장이 안 됩니다.

## 4단계 — 배포

**Deploy** 버튼 클릭. 1-2분 후 완료되면 Vercel이 다음과 같은 URL을 줍니다:

```
https://event-busan-0529.vercel.app
```

> 정확한 주소는 프로젝트명에 따라 조금씩 달라요. 대시보드에서 확인 가능.

## 5단계 — 동작 확인

1. URL 접속 → 페이지 정상 렌더링 확인
2. 폼 제출 테스트 → 구글 시트에 새 행 추가 확인
3. 모바일에서도 접속 (반응형 확인)

## 이후 코드 수정 시

GitHub `main` 브랜치에 푸시할 때마다 **Vercel이 자동으로 재배포**합니다. 따로 클릭 안 해도 됩니다.

```bash
# 코드 수정 후
git add .
git commit -m "수정 내용"
git push
# → Vercel 자동 빌드 → 1-2분 후 반영
```

## 커스텀 도메인 (선택)

회사 도메인(`event.classin.com` 같은 거) 연결하고 싶으면:

1. Vercel 프로젝트 → **Settings → Domains**
2. 원하는 도메인 입력 → **Add**
3. Vercel이 알려주는 DNS 레코드를 도메인 관리 페이지(가비아/Cloudflare 등)에 추가
4. 몇 분 후 자동 인증 + HTTPS 적용

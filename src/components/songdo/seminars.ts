/**
 * 학원 원장님 대상 오프라인 설명회(ClassIn Meets) 신청 페이지 — 지역마다 바뀌는 값.
 * 송도(10/29) 페이지 틀에서 시작(송도 페이지는 2026-11-13 정리). 새 지역은 여기에 한 묶음 추가 + src/app/<slug>/page.tsx 만 만들면 된다.
 * 신청 저장: /api/register 의 SEMINAR_SOURCES 에 source 접두어(slug)도 넣을 것.
 */
export type Seminar = {
  slug: string; // 주소·방문 기록 키 (/songdo)
  city: string; // 송도
  cityEn: string; // SONGDO
  region: string; // SONGDO · INCHEON
  md: string; // 10.29
  dateKo: string; // 10월 29일
  dow: string; // 목
  time: string; // 오전 11시 – 오후 1시 (끝 시간 없으면 "오전 11시")
  startTime: string; // 오전 11시
  session: string; // 시트 Session 칸
  badge: string; // 신청서 장소 칸 오른쪽 작은 표
  venue: string; // 엔에스 수능관학원
  road: string; // 인천 연수구 해돋이로 160-14
  floor: string; // 5층 504호
  mapQuery: string; // 네이버 지도 검색어
  proofLead: string; // 굵은 숫자 앞 문장
  proofNum: string; // 굵게 보이는 실적(10곳 중 7곳)
  heroImg: string;
  heroImgM: string;
  heroSize?: string; // 가로 화면 배경 크기(없으면 cover)
  heroPos?: string; // 가로 화면 배경 위치(없으면 70% 42%)
};

/** 동탄(11/30) — 끝 시간은 표기하지 않음, 히어로는 사람 없는 빈 교실(11/13 결정, 전단지와 같은 사진). 칠판이 오른쪽에 오게 화면 폭의 135%로 깔고 왼쪽 맞춤 */
export const DONGTAN: Seminar = {
  slug: "dongtan",
  city: "동탄",
  cityEn: "DONGTAN",
  region: "DONGTAN · HWASEONG",
  md: "11.30",
  dateKo: "11월 30일",
  dow: "월",
  time: "오전 11시",
  startTime: "오전 11시",
  session: "동탄 · 11월 30일 (월) 11:00",
  badge: "11/30 (월) 11AM",
  venue: "더바른수학 고등관",
  road: "경기 화성시 동탄구 동탄솔빛로 58",
  floor: "3층",
  mapQuery: "경기 화성시 동탄구 동탄솔빛로 58",
  proofLead: "직전 10월 송도 설명회 참석자",
  proofNum: "10명 중 8명",
  heroImg: "/dongtan/hero-room.jpg",
  heroImgM: "/dongtan/hero-room-m.jpg",
  heroSize: "135% auto",
  heroPos: "0% 42%",
};

const DOW_LONG: Record<string, string> = { 월: "월요일", 화: "화요일", 수: "수요일", 목: "목요일", 금: "금요일", 토: "토요일", 일: "일요일" };
export const dowLong = (ev: Seminar) => DOW_LONG[ev.dow] ?? ev.dow;
export const addr = (ev: Seminar) => `${ev.road} ${ev.floor}`;

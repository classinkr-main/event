import { DONGTAN, type Seminar } from "@/components/songdo/seminars";

/**
 * 페이지 이름 — 시트 왼쪽 「페이지」 칸과 Compass 신청 리드의 유입 경로(「동탄 11/30」)에 나간다.
 * 새 설명회 페이지를 열면 SEMINARS 에 그 묶음을 더한다(빠지면 경로·source 키가 그대로 찍힌다).
 */
export const SEMINARS: Seminar[] = [DONGTAN];

/** "동탄 11/30" */
export const seminarLabel = (ev: Seminar) => `${ev.city} ${ev.md.replace(".", "/").replace(/^0/, "")}`;

/** 주소 경로·source 키 → 사람이 읽는 페이지 이름. `/dongtan` · `dongtan-1130` · `dongtan-1130/ig` 모두 「동탄 11/30」 */
export function pageLabelOf(pathOrSource: string): string {
  const key = pathOrSource.split("?")[0].replace(/^\//, "").split("/")[0];
  const ev = SEMINARS.find((s) => key === s.slug || key.startsWith(`${s.slug}-`));
  if (ev) return seminarLabel(ev);
  if (key === "beijing") return pathOrSource.includes("/gate") ? "베이징 탐방 (코드 입력)" : "베이징 탐방";
  return key || "알 수 없음";
}

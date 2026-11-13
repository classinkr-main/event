import { redirect } from "next/navigation";

// 루트 주소는 클래스인 홈페이지로 보낸다(지난 행사 페이지는 2026-11-13 정리 — 지금 열려 있는 건 /dongtan · /beijing)
export default function RootPage() {
  redirect("https://classin.co.kr");
}

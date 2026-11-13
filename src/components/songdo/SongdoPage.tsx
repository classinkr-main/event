import BackToTop from "@/components/BackToTop";
import SongdoHeader from "./SongdoHeader";
import SongdoHero from "./SongdoHero";
import SongdoPoints from "./SongdoPoints";
import SongdoEventInfo from "./SongdoEventInfo";
import SongdoRegister from "./SongdoRegister";
import SongdoFooter from "./SongdoFooter";
import SongdoFloatingCTA from "./SongdoFloatingCTA";
import SongdoVisitTracker from "./SongdoVisitTracker";
import { SONGDO, type Seminar } from "./seminars";

/** 설명회 참가 신청 페이지(송도 10/29에서 시작, 지역 값은 seminars.ts) — 전단지 QR 랜딩. 전단지(광고C)와 같은 다크+그린 톤 */
export default function SongdoPage({ source, ev = SONGDO }: { source?: string; ev?: Seminar }) {
  return (
    <main className="theme-green theme-songdo">
      <SongdoVisitTracker slug={ev.slug} />
      <SongdoHeader ev={ev} />
      <SongdoHero ev={ev} />
      <SongdoPoints ev={ev} />
      <SongdoEventInfo ev={ev} />
      <SongdoRegister source={source} ev={ev} />
      <SongdoFooter ev={ev} />
      <SongdoFloatingCTA ev={ev} />
      <BackToTop />
    </main>
  );
}

import BackToTop from "@/components/BackToTop";
import SongdoHeader from "./SongdoHeader";
import SongdoHero from "./SongdoHero";
import SongdoPoints from "./SongdoPoints";
import SongdoEventInfo from "./SongdoEventInfo";
import SongdoRegister from "./SongdoRegister";
import SongdoFooter from "./SongdoFooter";
import SongdoFloatingCTA from "./SongdoFloatingCTA";
import SongdoVisitTracker from "./SongdoVisitTracker";

/** 송도 설명회(2026-10-29) 참가 신청 페이지 — 전단지 QR 랜딩. 전단지(광고C)와 같은 다크+그린 톤 */
export default function SongdoPage({ source }: { source?: string }) {
  return (
    <main className="theme-green">
      <SongdoVisitTracker />
      <SongdoHeader />
      <SongdoHero />
      <SongdoPoints />
      <SongdoEventInfo />
      <SongdoRegister source={source} />
      <SongdoFooter />
      <SongdoFloatingCTA />
      <BackToTop />
    </main>
  );
}

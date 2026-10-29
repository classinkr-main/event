import BackToTop from "@/components/BackToTop";
import BjTopbar from "./BjTopbar";
import BjHero from "./BjHero";
import BjLetter from "./BjLetter";
import BjQuestions from "./BjQuestions";
import BjAgenda from "./BjAgenda";
import BjProgram from "./BjProgram";
import BjCards from "./BjCards";
import BjPhotoBand from "./BjPhotoBand";
import BjStay from "./BjStay";
import BjNotes from "./BjNotes";
import BjRegister from "./BjRegister";
import BjFooter from "./BjFooter";
import BjFloatingCTA from "./BjFloatingCTA";
import BjVisitTracker from "./BjVisitTracker";
import BjHashScroll from "./BjHashScroll";
import { fontVars } from "./fonts";
import ZhFonts from "./ZhFonts";

export default function BjPage({ source }: { source?: string }) {
  return (
    <main className={`theme-bj ${fontVars}`}>
      <ZhFonts />
      <BjVisitTracker path="/beijing" clearGateFlag />
      <BjHashScroll />
      <BjTopbar />
      <BjHero />
      <BjLetter />
      <BjQuestions />
      <BjAgenda />
      <BjProgram />
      <BjCards />
      <BjPhotoBand />
      <BjStay />
      <BjNotes />
      <BjRegister source={source} />
      <BjFooter />
      <BjFloatingCTA />
      <BackToTop />
    </main>
  );
}

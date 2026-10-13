import BackToTop from "@/components/BackToTop";
import BjTopbar from "./BjTopbar";
import BjHero from "./BjHero";
import BjLetter from "./BjLetter";
import BjQuestions from "./BjQuestions";
import BjPassport from "./BjPassport";
import BjProgram from "./BjProgram";
import BjCards from "./BjCards";
import BjNotes from "./BjNotes";
import BjRegister from "./BjRegister";
import BjFooter from "./BjFooter";
import BjFloatingCTA from "./BjFloatingCTA";
import BjVisitTracker from "./BjVisitTracker";
import BjHashScroll from "./BjHashScroll";
import { fontVars } from "./fonts";

export default function BjPage({ source }: { source?: string }) {
  return (
    <main className={`theme-bj ${fontVars} bj-lattice`}>
      <BjVisitTracker path="/beijing" clearGateFlag />
      <BjHashScroll />
      <BjTopbar />
      <BjHero />
      <BjLetter />
      <BjQuestions />
      <BjPassport />
      <BjProgram />
      <BjCards />
      <BjNotes />
      <BjRegister source={source} />
      <BjFooter />
      <BjFloatingCTA />
      <BackToTop />
    </main>
  );
}

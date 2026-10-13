import BackToTop from "@/components/BackToTop";
import BjTopbar from "./BjTopbar";
import BjRail from "./BjRail";
import BjHero from "./BjHero";
import BjTicker from "./BjTicker";
import BjPanels from "./BjPanels";
import BjStats from "./BjStats";
import BjItinerary from "./BjItinerary";
import BjSession from "./BjSession";
import BjDossier from "./BjDossier";
import BjRegister from "./BjRegister";
import BjFooter from "./BjFooter";
import BjFloatingCTA from "./BjFloatingCTA";
import BjVisitTracker from "./BjVisitTracker";
import BjHashScroll from "./BjHashScroll";
import { serif } from "./fonts";

export default function BjPage({ source }: { source?: string }) {
  return (
    <main className={`theme-bj ${serif.variable}`}>
      <BjVisitTracker path="/beijing" clearGateFlag />
      <BjHashScroll />
      <BjTopbar />
      <BjRail />
      <BjHero />
      <BjTicker />
      <BjPanels />
      <BjStats />
      <BjItinerary />
      <BjSession />
      <BjDossier />
      <BjRegister source={source} />
      <BjFooter />
      <BjFloatingCTA />
      <BackToTop />
    </main>
  );
}

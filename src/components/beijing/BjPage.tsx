import BackToTop from "@/components/BackToTop";
import BjHeader from "./BjHeader";
import BjHero from "./BjHero";
import BjGlance from "./BjGlance";
import BjSchedule from "./BjSchedule";
import BjSession from "./BjSession";
import BjPeople from "./BjPeople";
import BjRegister from "./BjRegister";
import BjFooter from "./BjFooter";
import BjFloatingCTA from "./BjFloatingCTA";
import BjVisitTracker from "./BjVisitTracker";
import BjHashScroll from "./BjHashScroll";

export default function BjPage({ source }: { source?: string }) {
  return (
    <main>
      <BjVisitTracker path="/beijing" clearGateFlag />
      <BjHashScroll />
      <BjHeader />
      <BjHero />
      <BjGlance />
      <BjSchedule />
      <BjSession />
      <BjPeople />
      <BjRegister source={source} />
      <BjFooter />
      <BjFloatingCTA />
      <BackToTop />
    </main>
  );
}

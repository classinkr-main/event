import BackToTop from "@/components/BackToTop";
import HjHeader from "./HjHeader";
import HjHero from "./HjHero";
import HjWhy from "./HjWhy";
import HjSetup from "./HjSetup";
import HjResults from "./HjResults";
import HjOffer from "./HjOffer";
import HjConsult from "./HjConsult";
import HjFooter from "./HjFooter";
import HjFloatingCTA from "./HjFloatingCTA";
import HjVisitTracker from "./HjVisitTracker";

export default function HjPage({ source }: { source?: string }) {
  return (
    <main className="theme-green">
      <HjVisitTracker />
      <HjHeader />
      <HjHero />
      <HjWhy />
      <HjSetup />
      <HjResults />
      <HjOffer />
      <HjConsult source={source} />
      <HjFooter />
      <HjFloatingCTA />
      <BackToTop />
    </main>
  );
}

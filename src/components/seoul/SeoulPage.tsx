import BackToTop from "@/components/BackToTop";
import SeoulHeader from "./SeoulHeader";
import SeoulHero from "./SeoulHero";
import SeoulEventInfo from "./SeoulEventInfo";
import SeoulProgram from "./SeoulProgram";
import SeoulRegister from "./SeoulRegister";
import SeoulFooter from "./SeoulFooter";
import SeoulFloatingCTA from "./SeoulFloatingCTA";
import SeoulVisitTracker from "./SeoulVisitTracker";

export default function SeoulPage({ source }: { source?: string }) {
  return (
    <main>
      <SeoulVisitTracker />
      <SeoulHeader />
      <SeoulHero />
      <SeoulEventInfo />
      <SeoulProgram />
      <SeoulRegister source={source} />
      <SeoulFooter />
      <SeoulFloatingCTA />
      <BackToTop />
    </main>
  );
}

import BackToTop from "@/components/BackToTop";
import IncheonHeader from "./IncheonHeader";
import IncheonHero from "./IncheonHero";
import IncheonEventInfo from "./IncheonEventInfo";
import IncheonProgram from "./IncheonProgram";
import IncheonRegister from "./IncheonRegister";
import IncheonFooter from "./IncheonFooter";
import IncheonFloatingCTA from "./IncheonFloatingCTA";

export default function IncheonPage({ source }: { source?: string }) {
  return (
    <main>
      <IncheonHeader />
      <IncheonHero />
      <IncheonEventInfo />
      <IncheonProgram />
      <IncheonRegister source={source} />
      <IncheonFooter />
      <IncheonFloatingCTA />
      <BackToTop />
    </main>
  );
}

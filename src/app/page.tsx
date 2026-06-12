import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageEffects from "@/components/PageEffects";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import OutcomeStrip from "@/components/sections/OutcomeStrip";
import Why from "@/components/sections/Why";
import Comparison from "@/components/sections/Comparison";
import Saas from "@/components/sections/Saas";
import Stories from "@/components/sections/Stories";
import MidCta from "@/components/sections/MidCta";
import Program from "@/components/sections/Program";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <OutcomeStrip />
        <Why />
        <Comparison />
        <Saas />
        <Stories />
        <MidCta />
        <Program />
      </main>
      <SiteFooter />
      <PageEffects />
    </>
  );
}

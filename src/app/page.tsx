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
import Deliverables from "@/components/sections/Deliverables";
import NarrowDown from "@/components/sections/NarrowDown";
import Price from "@/components/sections/Price";
import NextStep from "@/components/sections/NextStep";
import Security from "@/components/sections/Security";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

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
        <Deliverables />
        <NarrowDown />
        <Price />
        <NextStep />
        <Security />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <PageEffects />
    </>
  );
}

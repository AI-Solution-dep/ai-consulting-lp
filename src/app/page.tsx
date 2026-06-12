import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageEffects from "@/components/PageEffects";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import OutcomeStrip from "@/components/sections/OutcomeStrip";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <OutcomeStrip />
      </main>
      <SiteFooter />
      <PageEffects />
    </>
  );
}

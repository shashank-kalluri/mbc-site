import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Speakers from "@/components/Speakers";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import { faqItems } from "@/data/faq";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown eventDate="2026-11-20T10:00:00" />
      <Speakers />
      <Sponsors />
      <FAQ items={faqItems} />
      <SpeedInsights />
    </>
  );
}

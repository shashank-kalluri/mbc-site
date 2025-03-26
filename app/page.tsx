import Image from "next/image";
import Hero from "@/components/Hero.tsx";
import Content from "@/components/Content.tsx";
import Countdown from "@/components/Countdown.tsx";
import FAQ from "@/components/FAQ.tsx";
import Speakers from "@/components/Speakers.tsx";
import TwitterBoard from "@/components/TwitterBoard.tsx";

import { faqItems } from "@/data/faq";

export default function Home() {
  const eventDate = "2025-12-06T10:00:00";

  return (
    <div>
      <Hero />
      <Content />
      <Countdown eventDate={eventDate}></Countdown>
      <Speakers />
      <TwitterBoard />
      <FAQ items={faqItems} />
    </div>
  );
}

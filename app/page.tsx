import Hero from "@/components/Hero";
import ContentRight from "@/components/ContentRight";
import ContentLeft from "@/components/ContentLeft";
import Countdown from "@/components/Countdown";
import FAQ from "@/components/FAQ";
import Speakers from "@/components/Speakers";
import TwitterBoard from "@/components/TwitterBoard";

import { faqItems } from "@/data/faq";

export default function Home() {
  const eventDate = "2025-12-06T10:00:00";

  return (
    <div>
      <Hero />
      <ContentRight />
      <Countdown eventDate={eventDate}></Countdown>
      <ContentLeft />
      <Speakers />
      <TwitterBoard />
      <FAQ items={faqItems} />
    </div>
  );
}

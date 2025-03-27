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
      <section id="about">
        <Hero />
      </section>
      <section id="sponsors">
        <ContentRight />
      </section>
      <section id="universities">
        <ContentLeft />
      </section>
      <section id="agenda">
        <Countdown eventDate={eventDate}></Countdown>
      </section>
      <section id="speakers">
        <Speakers />
      </section>
      <section id="tickets">
        <TwitterBoard />
      </section>
      <section id="faq">
        <FAQ items={faqItems} />
      </section>
    </div>
  );
}

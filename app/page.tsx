import Hero from "@/components/Hero";
import ContentMap from "@/components/ContentMap";
import Countdown from "@/components/Countdown";
import FAQ from "@/components/FAQ";
// import Speakers from "@/components/Speakers";
import TweetBoard from "@/components/TweetBoard";
import { faqItems } from "@/data/faq";
import Sponsors from "@/components/Sponsors";
import ImageCloud from "@/components/ImageCloud";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  const eventDate = "2025-12-05T10:00:00";

  return (
    <>
      <div>
        <section id="">
          <Hero />
        </section>
        <section id="">
          <ImageCloud />
        </section>
        <section id="">
          <Countdown eventDate={eventDate}></Countdown>
        </section>
        <section id="universities">
          <ContentMap />
        </section>
        <section id="sponsors">
          <Sponsors />
        </section>
        {/* <section id="speakers">
        <Speakers />
      </section> */}
        <section id="">
          <TweetBoard />
        </section>
        <section id="faq">
          <FAQ items={faqItems} />
        </section>
      </div>
      <SpeedInsights />
    </>
  );
}

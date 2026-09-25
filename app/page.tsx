import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import SocialProof from "@/components/SocialProof";
import Videos from "@/components/Videos";
import Speakers from "@/components/Speakers";
import Sponsors from "@/components/Sponsors";
import TweetBoard from "@/components/TweetBoard";
import FAQ from "@/components/FAQ";
import { faqItems } from "@/data/faq";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "University Blockchain Conference 2026",
  alternateName: ["UBC 2026", "Midwest Blockchain Conference"],
  description:
    "The annual gathering of university blockchain clubs, students, founders and researchers.",
  startDate: "2026-11-20T09:00:00-06:00",
  endDate: "2026-11-21T18:00:00-06:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph.png`,
  location: {
    "@type": "Place",
    name: "The University of Texas at Austin",
    address: {
      "@type": "PostalAddress",
      streetAddress: "110 Inner Campus Drive",
      addressLocality: "Austin",
      addressRegion: "TX",
      postalCode: "78712",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    url: "https://luma.com/n4ad0k9m",
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Hero />
      <SocialProof />
      <Countdown eventDate="2026-11-20T09:00:00" />
      <Speakers />
      <Sponsors />
      <Videos />
      <TweetBoard />
      <FAQ items={faqItems} />
      <SpeedInsights />
    </>
  );
}

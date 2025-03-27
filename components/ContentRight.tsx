import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import the Image component

const ContentRight = () => {
  return (
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
      {/* GIF Side */}
      <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
        <Image
          src="/MBC_Anim_v2_2.gif" // Path to your GIF file
          alt="Animated Content" // Important for accessibility
          fill
          unoptimized
          style={{ objectFit: "cover" }} // Updated to use style prop
        />
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 px-6 md:px-10 lg:px-16 mt-8 md:mt-0 flex flex-col items-start justify-center">
        <h2 className="text-3xl font-mono font-bold italic md:text-6xl tracking-tight text-foreground mb-4">
          Access the Inaccessible
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          200+ students representing over a dozen Universities, 30+ companies
          pioneering the on-chain future, and over 50+ speakers delivering talks
          and workshops across 9 tracks.
        </p>
        <div className="flex flex-wrap sm:flex-row gap-4">
          <Button variant="default">Apply to Speak</Button>
          <Button variant="secondary">Become a Sponsor</Button>
          <Button variant="outline">Agenda</Button>
        </div>
      </div>
    </section>
  );
};

export default ContentRight;

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ContentRight = () => {
  return (
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
      {/* GIF Side */}
      <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
        <Image
          src="/MBC_Anim_v2_2.gif"
          alt="Animated Content"
          fill
          unoptimized
          style={{ objectFit: "cover" }}
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
          <Button asChild variant="default">
            <a href="#">Apply to Speak</a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href="https://app.deform.cc/form/af29bbbf-ad01-44f1-b006-400937bd4166"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Sponsor
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#">Agenda</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentRight;

"use client";

import React from "react";
import Image from "next/image";
import { sponsors } from "@/data/sponsors";
// import { Button } from "./ui/button";

const marqueeItemStyle =
  "sponsor-item min-w-[160px] flex items-center justify-center p-2 rounded-xl hover:shadow-lg transition";
const logoSize =
  "w-40 h-24 grayscale hover:grayscale-0 transition duration-300";

const Sponsors = () => {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      {/* Title and Subtext */}
      <div className="w-full max-w-4xl text-center mb-12 px-4 mx-auto">
        <h2 className="text-5xl font-mono font-bold italic md:text-6xl tracking-tight text-foreground mb-4">
          Past Sponsors
        </h2>
        {/* <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default">Become a Sponsor</Button>
          <Button variant="secondary">Learn More</Button>
        </div> */}
      </div>
      {/* Desktop grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 rounded-xl hover:shadow-lg transition"
          >
            <div className={`relative ${logoSize} overflow-hidden`}>
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </a>
        ))}
      </div>

      {/* Mobile marquee */}
      <div className="sm:hidden relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="marquee-wrapper">
          <div className="marquee-track">
            {sponsors.concat(sponsors).map((sponsor, index) => (
              <a
                key={sponsor.name + index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={marqueeItemStyle}
              >
                <div className={`relative ${logoSize} overflow-hidden`}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Global style for has-hover */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-wrapper {
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          gap: 1rem;
          white-space: nowrap;
          animation: marquee 10s linear infinite;
        }

        .marquee-wrapper:has(.sponsor-item:hover) .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Sponsors;

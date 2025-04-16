"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { sponsors } from "@/data/sponsors";

const marqueeItemStyle =
  "sponsor-item min-w-[160px] mx-6 flex items-center justify-center p-2 rounded-xl hover:shadow-lg transition";
const logoSize =
  "w-40 h-24 grayscale hover:grayscale-0 transition duration-300";

const Sponsors = () => {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      {/* Title */}
      <div className="w-full max-w-4xl text-center mb-12 px-4 mx-auto">
        <h2 className="text-5xl font-mono font-bold italic md:text-6xl tracking-tight text-foreground mb-4">
          Past Sponsors
        </h2>
      </div>

      {/* Marquee with Tailwind theme-based gradient */}
      <div className="relative">
        <Marquee
          pauseOnHover
          speed={100}
          gradient={true}
          gradientColor={"#0a0a0a"}
          gradientWidth={200}
        >
          {sponsors.map((sponsor, index) => (
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
        </Marquee>
      </div>
    </section>
  );
};

export default Sponsors;

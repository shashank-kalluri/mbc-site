"use client";

import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Button } from "@/components/ui/button";

interface University {
  name: string;
  coordinates: [number, number];
  logo: string;
}

const universities: University[] = [
  {
    name: "Stanford University",
    coordinates: [-122.1703, 37.4275],
    logo: "/university_logos/stanford.png",
  },
  {
    name: "University of Michigan",
    coordinates: [-83.7409, 42.278],
    logo: "/university_logos/umich.png",
  },
  {
    name: "UC Berkeley",
    coordinates: [-122.259, 37.8719],
    logo: "/university_logos/berkeley.png",
  },
];

const ContentLeft = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark as client-side after mount
  }, []);

  return (
    <section className="relative w-full flex flex-col md:flex-row-reverse items-center justify-between py-16 md:py-24">
      {/* Map Side */}
      <div className="relative w-full md:w-1/2 rounded-lg overflow-hidden">
        {isClient && (
          <ComposableMap
            projection="geoAlbersUsa"
            width={800}
            height={500}
            className="w-full h-auto"
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#DDD"
                    stroke="#555"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {universities.map((uni, index) => (
              <Marker key={index} coordinates={uni.coordinates}>
                <g>
                  <image
                    href={uni.logo}
                    width={20}
                    height={20}
                    className="shadow-md z-50 transition-transform duration-300 hover:scale-150"
                    transform="translate(-10, -10)" // Center image within marker
                  />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        )}
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 px-6 md:px-10 lg:px-16 mt-8 md:mt-0 flex flex-col items-start justify-center">
        <h2 className="text-5xl font-mono font-bold italic md:text-6xl tracking-tight text-foreground mb-4">
          A Coalition of Universities
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Partnered with 12 Universities and counting, MBC expands the
          blockchain industry past the coasts, connecting opportunity with
          potential.
        </p>
        <div className="flex flex-wrap sm:flex-row gap-4">
          <Button variant="default">Learn More</Button>
          <Button variant="secondary">Become a Sponsor</Button>
        </div>
      </div>
    </section>
  );
};

export default ContentLeft;

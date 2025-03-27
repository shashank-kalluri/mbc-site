"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Button } from "@/components/ui/button";

type Landmark = {
  name: string;
  coordinates: [number, number];
  description: string;
};

const ContentLeft = () => {
  const [tooltip, setTooltip] = useState<Landmark | null>(null);

  const landmarks: Landmark[] = [
    {
      name: "Statue of Liberty",
      coordinates: [-74.0445, 40.6892],
      description: "Located in New York Harbor",
    },
    {
      name: "Grand Canyon",
      coordinates: [-112.1401, 36.1069],
      description: "Located in Arizona",
    },
    {
      name: "Mount Rushmore",
      coordinates: [-103.4591, 43.8791],
      description: "Located in South Dakota",
    },
    {
      name: "Yellowstone National Park",
      coordinates: [-110.5885, 44.428],
      description: "Located in Wyoming",
    },
  ];

  return (
    <section className="relative w-full flex flex-col md:flex-row-reverse items-center justify-between py-16 md:py-24">
      {/* Map Side */}
      <div className="relative w-full md:w-1/2 rounded-lg overflow-hidden">
        <ComposableMap projection="geoAlbersUsa" width={800} height={500}>
          <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#DDD"
                  stroke="#555"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>
          {landmarks.map((landmark, index) => (
            <Marker
              key={index}
              coordinates={landmark.coordinates}
              onMouseEnter={() => setTooltip(landmark)}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle r={5} fill="red" />
            </Marker>
          ))}
        </ComposableMap>
        {tooltip && (
          <div
            className="absolute bg-white p-4 rounded shadow-lg"
            style={{ top: "20%", left: "10%" }}
          >
            <h3 className="font-bold">{(tooltip as { name: string }).name}</h3>
            <p>{(tooltip as { description: string }).description}</p>
          </div>
        )}
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 px-6 md:px-10 lg:px-16 mt-8 md:mt-0 flex flex-col items-start justify-center">
        <h2 className="text-3xl font-mono font-bold italic md:text-6xl tracking-tight text-foreground mb-4">
          A Coalition of Universities
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Partnered with 12 Universities and counting, MBC expands the
          blockchain industry pasts the coasts, connecting opportunity with
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

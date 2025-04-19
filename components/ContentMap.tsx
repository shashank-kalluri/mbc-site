"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Button } from "@/components/ui/button";
import universitiesData from "@/data/universities";

interface University {
  name: string;
  coordinates: [number, number];
  logo: string;
}

const ContentMap = () => {
  const [isClient, setIsClient] = useState(false);
  const [visibleMarkers, setVisibleMarkers] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const universities = universitiesData as University[]; // Type cast the imported data

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          universities.forEach((_, index) => {
            setTimeout(() => {
              setVisibleMarkers((prev) => [...prev, index]);
            }, Math.random() * 5000); // Randomized waiting time
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [universities]); // Add universities to the dependency array in case it changes

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col md:flex-row-reverse items-center justify-between py-16 md:py-24"
    >
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
                <g
                  className={`transition-opacity duration-700 ease-out transform scale-50 opacity-0 ${
                    visibleMarkers.includes(index)
                      ? "opacity-100 scale-100"
                      : ""
                  }`}
                >
                  <image
                    href={uni.logo}
                    width={30}
                    height={30}
                    className="shadow-md z-50 transition-transform duration-300 hover:scale-150"
                    transform="translate(-15, -15)"
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
          Partnered with {universities.length} Universities and counting, MBC
          expands the blockchain industry past the coasts, connecting
          opportunity with potential.
        </p>
        <div className="flex flex-wrap sm:flex-row gap-4">
          <Button variant="default">Learn More</Button>
          <Button asChild variant="secondary">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScL6pHyyGNPQwTFgD0bYT9tekTCJ-gngCnknKEj2KpXDMAAKw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Sponsor
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentMap;

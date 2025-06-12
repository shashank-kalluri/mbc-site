// ContentMap.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import universitiesData from "@/data/universities";

interface University {
  name: string;
  coordinates: [number, number];
  logo: string;
  link: string;
}

const ContentMap = () => {
  const [isClient, setIsClient] = useState(false);
  const [visibleMarkers, setVisibleMarkers] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const randomDelays = useRef<number[]>([]);
  const universities = universitiesData as University[];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (randomDelays.current.length === 0) {
      randomDelays.current = universities.map(() => Math.random() * 5000);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          universities.forEach((_, index) => {
            setTimeout(() => {
              setVisibleMarkers((prev) => [...prev, index]);
            }, randomDelays.current[index]);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [universities]);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden"
    >
      {/* Fullscreen Map */}
      {isClient && (
        <ComposableMap
          projection="geoAlbersUsa"
          width={800}
          height={500}
          className="absolute top-0 left-0 w-full h-full"
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
              <a
                href={uni.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-opacity duration-700 ease-out transform scale-50 opacity-0 ${
                  visibleMarkers.includes(index) ? "opacity-100 scale-100" : ""
                }`}
              >
                <image
                  href={uni.logo}
                  width={30}
                  height={30}
                  className="shadow-md z-50 transition-transform duration-300 hover:scale-150"
                  transform="translate(-15, -15)"
                />
              </a>
            </Marker>
          ))}
        </ComposableMap>
      )}
    </section>
  );
};

export default ContentMap;

// ContentMap.tsx
"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoAlbersUsa } from "d3-geo";
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

  const width = 800;
  const height = 500;

  const projection = useMemo(
    () =>
      geoAlbersUsa()
        .translate([width / 2, height / 2])
        .scale(1000),
    [width, height]
  );

  const isInRange = (coords: [number, number]) => {
    const p = projection(coords as [number, number]);
    return (
      Array.isArray(p) &&
      p.length === 2 &&
      Number.isFinite(p[0]) &&
      Number.isFinite(p[1])
    );
  };

  useEffect(() => setIsClient(true), []);

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
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [universities]);

  return (
    <section
      ref={sectionRef}
      id="universities"
      className="relative w-full bg-[#F4F3EF]"
    >
      {/* Section header */}
      <div className="max-w-screen-xl mx-auto px-6 pt-16 pb-4">
        <p className="text-[#EC8644] text-xs font-semibold uppercase tracking-widest mb-2">
          Represented Schools
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#293C4B] tracking-tight">
          Universities Attending
        </h2>
        <p className="mt-2 text-[#9CADB7] text-sm sm:text-base max-w-prose">
          Students and clubs from across North America and beyond.
        </p>
      </div>

      {/* Map */}
      <div className="relative w-full h-[60vw] max-h-[560px] min-h-[320px] overflow-hidden">
        {isClient && (
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{ scale: 1000 }}
            width={width}
            height={height}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E8E7E3"
                    stroke="#9CADB7"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#DDD9D3" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {universities.map((uni, index) =>
              isInRange(uni.coordinates) ? (
                <Marker key={index} coordinates={uni.coordinates}>
                  <g
                    onClick={() =>
                      window.open(uni.link, "_blank", "noopener,noreferrer")
                    }
                    style={{ cursor: "pointer" }}
                    className={`transition-all duration-700 ease-out ${
                      visibleMarkers.includes(index)
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-50"
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
              ) : null
            )}
          </ComposableMap>
        )}
      </div>
    </section>
  );
};

export default ContentMap;

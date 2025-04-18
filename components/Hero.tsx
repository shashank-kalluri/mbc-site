"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Autoplay was prevented. This might happen on some browsers.
        console.error("Autoplay prevented:", error);
        // Optionally, display a play button for the user.
      });
    }
  }, []);

  return (
    <section className="relative h-[calc(100vh-theme(spacing.16))] md:h-screen overflow-hidden flex items-center justify-center bg-background">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make text readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-background/60 dark:bg-background/80 z-10"></div>

      {/* Content Stack */}
      <div className="relative z-20 text-center px-6 md:px-12 lg:px-24">
        {/* Big Logo */}
        <div className="mb-8">
          <Image
            src="/MBC Logo-07-white.png"
            alt="MBC 2025"
            width={400}
            height={100}
            className="mx-auto object-contain"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center space-x-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScL6pHyyGNPQwTFgD0bYT9tekTCJ-gngCnknKEj2KpXDMAAKw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-semibold rounded-md py-3 px-6 hover:bg-primary/80 transition-colors text-sm md:text-base"
            >
              Become a Sponsor
            </a>
            <button className="bg-secondary text-secondary-foreground font-semibold rounded-md py-3 px-6 hover:bg-secondary/80 transition-colors text-sm md:text-base">
              Get Tickets
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay prevented:", error);
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
        <source
          src="https://cdn.jsdelivr.net/gh/shashank-kalluri/mbc-site/public/video.mp4?t=1"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make text readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-background/60 dark:bg-background/80 z-10" />

      {/* Content Stack */}
      <div className="relative z-20 text-center px-6 md:px-12 lg:px-24">
        {/* Big Logo */}
        <div className="mb-8">
          <img
            src={`https://cdn.jsdelivr.net/gh/shashank-kalluri/mbc-site/public/images/strikeoutanimation.gif?t=${Date.now()}`}
            alt="MBC 2025 Animation"
            className="mx-auto max-w-full h-auto"
            style={{ width: "100%", maxWidth: "600px" }}
          />
        </div>

        {/* Date & Location */}
        <p className="text-muted-foreground text-sm md:text-base font-medium mb-6">
          <span className="block md:inline">December 5–6, 2025</span>
          <span className="hidden md:inline"> · </span>
          <a
            href="https://maps.google.com/?q=701+Tappan+Ave,+Ann+Arbor,+MI+48109"
            target="_blank"
            rel="noopener noreferrer"
            className="block md:inline text-maize hover:text-maize/80 transition-colors no-underline"
          >
            University of Michigan Ross School of Business, Ann Arbor
          </a>
        </p>

        {/* Buttons */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Tickets */}
            <a
              href="https://lu.ma/x6apzbr8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-semibold rounded-full py-3 px-10 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              Get Tickets →
            </a>

            {/* Programs */}
            <Link
              href="/programs"
              className="bg-secondary text-secondary-foreground font-semibold rounded-full py-3 px-10 text-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Build at MBC
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-background backdrop-blur-sm z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;

"use client";

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
        <source
          src="https://cdn.jsdelivr.net/gh/shashank-kalluri/mbc-site/public/video.mp4?t=1"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make text readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-background/60 dark:bg-background/80 z-10"></div>

      {/* Content Stack */}
      <div className="relative z-20 text-center px-6 md:px-12 lg:px-24">
        {/* Big Logo */}
        <div className="mb-8">
          <img
            src={`https://cdn.jsdelivr.net/gh/shashank-kalluri/mbc-site/public/strikeoutanimation.gif?t=${Date.now()}`}
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
            University of Michigan, Ann Arbor
          </a>
        </p>

        {/* Text Content */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <a
              href="https://app.deform.cc/form/af29bbbf-ad01-44f1-b006-400937bd4166"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-semibold rounded-md py-3 px-6 hover:bg-primary/80 transition-colors text-sm md:text-base"
            >
              Become a Sponsor
            </a>
            <a
              href="https://lu.ma/x6apzbr8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground font-semibold rounded-md py-3 px-6 hover:bg-secondary/80 transition-colors text-sm md:text-base"
            >
              Tickets
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-background backdrop-blur-sm z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;

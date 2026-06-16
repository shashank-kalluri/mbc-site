"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const VIDEO_SRC =
  "https://cdn.jsdelivr.net/gh/shashank-kalluri/mbc-site@7000a75/public/video.mp4";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#1A2A36] flex flex-col justify-between overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,42,54,0.15) 0%, rgba(26,42,54,0.45) 35%, rgba(26,42,54,0.72) 70%, rgba(26,42,54,1) 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-8">
        {/* Logo */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* Vignette to lift the logo off a busy video frame */}
          <div
            className="absolute -inset-x-10 -inset-y-16 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 65% at center, rgba(8,13,17,0.65) 0%, rgba(8,13,17,0) 75%)",
            }}
          />
          <Image
            src="/university_blockchain_conference_logo.svg"
            alt="University Blockchain Conference"
            width={2048}
            height={608}
            className="w-full max-w-[clamp(340px,95vw,1300px)] h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            priority
          />
        </motion.div>

        {/* Date, location, CTAs */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
        >
          <p className="text-white/80 text-base sm:text-lg font-semibold tracking-[0.12em] uppercase">
            Nov 20–21, 2026 &nbsp;·&nbsp; UT Austin, Texas
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://luma.com/n4ad0k9m"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EC8644] text-white text-base font-semibold px-7 py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/20"
            >
              Get Tickets →
            </a>
            <a
              href="#about"
              className="text-white/70 text-base font-medium border border-white/20 px-7 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

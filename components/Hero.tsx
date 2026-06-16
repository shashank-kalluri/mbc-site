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
  "https://cdn.jsdelivr.net/gh/shashank-kalluri/mbc-site@a205534/public/video.mp4";

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
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center gap-3 mb-8 sm:mb-12"
        >
          <span className="block w-8 h-[2px] bg-[#EC8644]" />
          <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
            University Blockchain Conference
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Image
            src="/navlogo.png"
            alt="University Blockchain Conference"
            width={1200}
            height={400}
            className="w-full max-w-[clamp(340px,95vw,1300px)] h-auto"
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
          <p className="text-white/40 text-sm font-medium tracking-[0.12em] uppercase">
            Nov 20–21, 2026 &nbsp;·&nbsp; UT Austin, Texas
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://lu.ma/x6apzbr8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EC8644] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/20"
            >
              Get Tickets →
            </a>
            <span className="text-white/30 text-sm font-medium border border-white/10 px-6 py-2.5 rounded-full cursor-not-allowed">
              Learn More
            </span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

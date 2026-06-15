"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#1A2A36] flex flex-col justify-between overflow-hidden">
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

        {/* The three-word typographic statement */}
        <div className="overflow-hidden">
          {(
            [
              { word: "UNIVERSITY", color: "text-white" },
              { word: "BLOCKCHAIN", color: "text-[#EC8644]" },
              { word: "CONFERENCE", color: "text-white" },
            ] as const
          ).map(({ word, color }, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className={`block font-[var(--font-zuume)] font-black leading-[0.85] tracking-[-0.01em] ${color}`}
                style={{ fontSize: "clamp(46px, 13.2vw, 210px)" }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Date, location, CTAs */}
        <motion.div
          custom={4}
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

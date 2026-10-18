"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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

const VIDEO_SRC =
  "https://cdn.jsdelivr.net/gh/shashank-kalluri/mbc-site@7000a75/public/video.mp4";

/** Cycled inside the Programs button so "Programs" reads as these events. */
const PROGRAM_WORDS = ["Hackathon", "Research", "Founder Stage"];

function ProgramsButton() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % PROGRAM_WORDS.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <Link
      href="/programs"
      aria-label="Programs: Hackathon, Research Competition, and Founder Stage"
      className="group shrink-0 whitespace-nowrap inline-flex items-center gap-2.5 bg-white text-[#293C4B] text-sm sm:text-base font-semibold pl-5 sm:pl-7 pr-1.5 py-1.5 rounded-full shadow-lg shadow-black/25 hover:bg-[#F4F3EF] transition-colors"
    >
      Programs
      <span
        aria-hidden
        className="inline-flex items-center gap-1 h-7 sm:h-9 px-3 sm:px-3.5 rounded-full bg-[#EC8644] text-white text-xs sm:text-sm"
      >
        {/* Words share one grid cell; invisible copies hold the longest one's
            width so the pill never resizes as they slide through. */}
        <span className="relative inline-grid justify-items-center overflow-hidden">
          {PROGRAM_WORDS.map((w) => (
            <span key={w} className="invisible col-start-1 row-start-1">
              {w}
            </span>
          ))}
          <AnimatePresence initial={false}>
            <motion.span
              key={PROGRAM_WORDS[i]}
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="col-start-1 row-start-1"
            >
              {PROGRAM_WORDS[i]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}

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
          <h1 className="m-0">
            <span className="sr-only">
              University Blockchain Conference 2026 — November 20–21, 2026 at UT
              Austin
            </span>
            <Image
              src="/university_blockchain_conference_logo.svg"
              alt="University Blockchain Conference"
              width={2048}
              height={608}
              className="w-full max-w-[clamp(340px,95vw,1300px)] h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
              priority
            />
          </h1>
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
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://luma.com/n4ad0k9m"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/20"
            >
              Get Tickets →
            </a>
            <ProgramsButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

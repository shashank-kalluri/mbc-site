"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Caveat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const handwriting = Caveat({ subsets: ["latin"], weight: ["700"], display: "swap" });

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

const NOTE = "hackathon, research comp & more!";

/** The Programs button, with a scribbled note and arrow pointing at it so
 *  visitors know it leads to the hackathon and competitions. */
function ProgramsButton() {
  const reduce = useReducedMotion();
  const draw = {
    initial: { pathLength: reduce ? 1 : 0 },
    animate: { pathLength: 1 },
    transition: { delay: 1.1, duration: 0.9, ease: "easeInOut" as const },
  };
  const tip = { ...draw, transition: { ...draw.transition, delay: 1.9, duration: 0.25 } };
  const note = {
    initial: { opacity: 0, y: reduce ? 0 : 6 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.8, duration: 0.5 },
  };
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <div className="relative">
      <Link
        href="/programs"
        className="shrink-0 whitespace-nowrap inline-block bg-white text-[#293C4B] text-sm sm:text-base font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-lg shadow-black/25 hover:bg-[#F4F3EF] transition-colors"
      >
        Programs
      </Link>

      {/* Desktop: note up and to the right, arrow curling down into the button */}
      <div
        aria-hidden
        className="hidden sm:block absolute left-full top-1/2 -translate-y-[78%] ml-1 pointer-events-none text-[#EC8644]"
      >
        <svg viewBox="0 0 120 70" className="w-[104px] h-[60px]">
          <motion.path {...draw} {...stroke} d="M 114 10 C 92 2, 66 18, 78 32 C 88 44, 98 24, 76 26 C 52 28, 30 48, 8 52" />
          <motion.path {...tip} {...stroke} d="M 8 52 L 21 43 M 8 52 L 22 59" />
        </svg>
        <motion.span
          {...note}
          className={`${handwriting.className} absolute left-[100px] -top-5 w-40 text-[22px] leading-[0.95] -rotate-6 text-white`}
        >
          {NOTE}
        </motion.span>
      </div>

      {/* Mobile: note below, arrow curling up into the button */}
      <div
        aria-hidden
        className="sm:hidden absolute top-full left-1/2 mt-1 pointer-events-none text-[#EC8644]"
      >
        <svg viewBox="0 0 60 60" className="w-12 h-12">
          <motion.path {...draw} {...stroke} d="M 52 54 C 32 56, 14 46, 20 32 C 24 22, 34 26, 28 34 C 22 40, 10 28, 10 8" />
          <motion.path {...tip} {...stroke} d="M 10 8 L 3 19 M 10 8 L 18 17" />
        </svg>
        <motion.span
          {...note}
          className={`${handwriting.className} absolute left-10 top-7 w-[6.5rem] text-[19px] leading-[0.95] -rotate-3 text-white`}
        >
          {NOTE}
        </motion.span>
      </div>
    </div>
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

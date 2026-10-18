"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";

/** Shared "scrapbook" pieces for the program and resource pages: tilted
 *  photos, a spinning round sticker, and the orange marquee band. */

export function Polaroid({
  src,
  caption,
  tilt,
  className = "",
}: {
  src: string;
  caption: string;
  tilt: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      initial={{ rotate: tilt }}
      whileHover={reduce ? undefined : { rotate: 0, scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`relative bg-white p-2.5 sm:p-3 pb-10 sm:pb-11 rounded-md shadow-[0_18px_40px_-18px_rgba(10,18,24,0.55)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#1A2A36]">
        <Image src={src} alt={caption} fill sizes="240px" className="object-cover" />
      </div>
      <figcaption className="absolute left-0 right-0 bottom-2.5 sm:bottom-3 text-center whitespace-nowrap font-[var(--font-zuume)] font-bold text-[#293C4B] text-sm sm:text-lg tracking-tight">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

/** Round sticker with a headline number, its rim text slowly spinning. Each
 *  rim letter is placed at its own angle so the ring always closes evenly,
 *  whatever font the browser ends up using. `rim` should end with a separator
 *  so the seam where it wraps around looks like every other gap. */
export function Sticker({
  rim,
  value,
  label,
}: {
  rim: string;
  value: string;
  label: string;
}) {
  const reduce = useReducedMotion();
  const chars = [...rim];
  return (
    <div className="relative w-28 h-28 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rotate-[-10deg]">
      <div className="absolute inset-0 rounded-full bg-[#EC8644] shadow-2xl shadow-black/30" />
      <motion.svg
        viewBox="0 0 160 160"
        className="absolute inset-0 w-full h-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        aria-hidden
      >
        {chars.map((c, i) => (
          <text
            key={i}
            x={80}
            y={22}
            textAnchor="middle"
            transform={`rotate(${(i * 360) / chars.length} 80 80)`}
            className="fill-white font-bold"
            style={{ fontSize: 13 }}
          >
            {c}
          </text>
        ))}
      </motion.svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="font-[var(--font-zuume)] font-black text-[19px] sm:text-[27px] lg:text-[38px] tracking-tight leading-none">
          {value}
        </span>
        <span className="text-[7px] sm:text-[9px] lg:text-[11px] font-semibold tracking-[0.2em] uppercase mt-0.5 sm:mt-1 text-white/85">
          {label}
        </span>
      </div>
    </div>
  );
}

/** Slightly tilted orange band of scrolling words. */
export function Ticker({
  items,
  className = "",
  tilt = "-rotate-2",
}: {
  items: string[];
  className?: string;
  tilt?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative -mx-4 ${className}`}>
      <div className={`${tilt} bg-[#EC8644] py-3.5 shadow-xl shadow-[#EC8644]/20`}>
        <Marquee autoFill speed={45} play={!reduce}>
          {items.map((t) => (
            <span
              key={t}
              className="flex items-center font-[var(--font-zuume)] font-black text-white text-xl sm:text-2xl uppercase tracking-tight"
            >
              {t}
              <span className="mx-6 text-[#1A2A36]/50" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

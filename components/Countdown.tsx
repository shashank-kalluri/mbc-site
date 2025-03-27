"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RotatingText = ({
  words,
  speed = 2000,
}: {
  words: string[];
  speed?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, speed);

    return () => clearInterval(interval);
  }, [words, speed]);

  const variants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100%" },
  };

  return (
    <div
      className="inline-flex items-center overflow-hidden"
      style={{ lineHeight: "1.05", verticalAlign: "middle" }} // Ensure proper alignment
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="font-semibold text-primary inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately to avoid delay

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-4xl sm:text-6xl font-mono font-bold text-maize">
      {`${timeLeft.days.toString().padStart(2, "0")}:${timeLeft.hours
        .toString()
        .padStart(2, "0")}:${timeLeft.minutes
        .toString()
        .padStart(2, "0")}:${timeLeft.seconds.toString().padStart(2, "0")}`}
    </div>
  );
}; // Fixing the implicit 'any' type error by adding a type annotation

interface CountdownProps {
  eventDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ eventDate }) => {
  const rotatingWords = ["launching", "hacking", "building"];

  return (
    <section className="py-10 flex flex-col items-center justify-center px-4">
      <div className="mb-4 italic font-mono text-5xl text-center sm:text-6xl text-muted-foreground">
        We&apos;re <RotatingText words={rotatingWords} speed={1500} /> in
      </div>
      <CountdownTimer targetDate={eventDate} />
      <div className="mt-4 text-center text-base sm:text-lg text-muted-foreground">
        Get tickets and join us this winter!
      </div>
    </section>
  );
};

export default Countdown;

"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface CountdownProps {
  eventDate: string;
}

export default function Countdown({ eventDate }: CountdownProps) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const dist = new Date(eventDate).getTime() - Date.now();
      if (dist <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(dist / 86400000),
        hours: Math.floor((dist % 86400000) / 3600000),
        minutes: Math.floor((dist % 3600000) / 60000),
        seconds: Math.floor((dist % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [eventDate]);

  const units = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Mins" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <section className="bg-[#1A2A36] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-6 h-[2px] bg-[#EC8644]/50" />
          <span className="text-white/40 text-xs font-medium tracking-[0.22em] uppercase">
            Launching In
          </span>
        </div>

        {/* Numbers */}
        <div className="flex items-end gap-0">
          {units.map(({ value, label }, i) => (
            <div key={label} className="flex items-end">
              <div className="flex flex-col">
                <span
                  className="font-[var(--font-zuume)] font-black text-[#EC8644] leading-none tabular-nums"
                  style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
                >
                  {mounted ? pad(value) : "00"}
                </span>
                <span className="text-white/30 text-xs font-medium uppercase tracking-[0.18em] mt-1.5 pl-1">
                  {label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span
                  className="font-[var(--font-zuume)] font-black text-white/10 leading-none mx-1 sm:mx-2"
                  style={{
                    fontSize: "clamp(48px, 9vw, 140px)",
                    lineHeight: 1,
                    paddingBottom: "1.4rem",
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 border-t border-white/8 pt-8">
          <a
            href="https://luma.com/n4ad0k9m"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#EC8644] text-white text-sm font-bold px-7 py-3 rounded-full hover:bg-[#D4703A] transition-colors self-start shadow-lg shadow-[#EC8644]/25"
          >
            Secure Your Spot →
          </a>
          <p className="text-white/70 text-base font-semibold tracking-wide">
            November 20–21, 2026 · Doors open 9:00 AM · UT Austin
          </p>
        </div>
      </div>
    </section>
  );
}

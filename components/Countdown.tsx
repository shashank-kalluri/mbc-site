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
    <section className="bg-[#EC8644] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-6 h-[2px] bg-white/40" />
          <span className="text-white/60 text-xs font-medium tracking-[0.22em] uppercase">
            Launching In
          </span>
        </div>

        {/* Numbers */}
        <div className="flex items-end gap-0 flex-wrap">
          {units.map(({ value, label }, i) => (
            <div key={label} className="flex items-end">
              <div className="flex flex-col">
                <span
                  className="font-[var(--font-zuume)] font-black text-white leading-none tabular-nums"
                  style={{ fontSize: "clamp(64px, 13vw, 200px)" }}
                >
                  {mounted ? pad(value) : "00"}
                </span>
                <span className="text-white/50 text-xs font-medium uppercase tracking-[0.18em] mt-1.5 pl-1">
                  {label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span
                  className="font-[var(--font-zuume)] font-black text-white/25 leading-none mx-1 sm:mx-2"
                  style={{
                    fontSize: "clamp(64px, 13vw, 200px)",
                    lineHeight: 1,
                    paddingBottom: "1.6rem",
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 border-t border-white/20 pt-8">
          <a
            href="https://lu.ma/x6apzbr8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-[#EC8644] text-sm font-bold px-7 py-3 rounded-full hover:bg-[#F4F3EF] transition-colors self-start"
          >
            Secure Your Spot →
          </a>
          <p className="text-white/60 text-sm">
            November 20–21, 2026 · Doors open 10:00 AM · UT Austin
          </p>
        </div>
      </div>
    </section>
  );
}

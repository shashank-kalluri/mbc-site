"use client";

import { useState } from "react";
import Image from "next/image";

/** `widescreen` episodes have letterboxed YouTube thumbnails, so they're
 *  scaled up to crop the bars. */
const episodes = [
  { id: "ZPfEsIBZUS4", episode: "Episode 01", widescreen: true },
  { id: "7z48yaaV-xs", episode: "Episode 02", widescreen: true },
  { id: "ifz_9FkFwrw", episode: "Episode 03", widescreen: false },
];

type Episode = (typeof episodes)[number];

function Thumb({ ep, sizes }: { ep: Episode; sizes: string }) {
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${ep.id}/maxresdefault.jpg`);
  return (
    <Image
      src={src}
      alt={ep.episode}
      fill
      sizes={sizes}
      className={`object-cover ${ep.widescreen ? "scale-[1.35]" : ""}`}
      unoptimized
      onError={() => setSrc(`https://img.youtube.com/vi/${ep.id}/hqdefault.jpg`)}
    />
  );
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** The UBC Sitcom as a little TV: one big screen and an episode guide. */
export default function Sitcom() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ep = episodes[current];

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 sm:gap-5">
      {/* Screen */}
      <div className="rounded-3xl bg-white p-2.5 sm:p-3 shadow-[0_24px_60px_-30px_rgba(26,42,54,0.45)]">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
          {playing ? (
            <iframe
              key={ep.id}
              src={`https://www.youtube.com/embed/${ep.id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={`The UBC Sitcom, ${ep.episode}`}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full text-left"
              aria-label={`Play ${ep.episode}`}
            >
              <Thumb key={ep.id} ep={ep} sizes="(max-width: 1024px) 100vw, 900px" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/10 group-hover:via-black/20 transition-colors" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EC8644] text-white grid place-items-center shadow-2xl shadow-black/40 transition-transform duration-200 group-hover:scale-110">
                  <PlayIcon className="w-7 h-7 sm:w-8 sm:h-8 ml-1" />
                </span>
              </div>
              <div className="hidden sm:block absolute left-6 top-5">
                <div>
                  <p className="text-[#EC8644] text-[11px] font-semibold tracking-[0.2em] uppercase">
                    Now showing
                  </p>
                  <p className="font-[var(--font-zuume)] font-black text-white text-2xl sm:text-4xl tracking-tight leading-none mt-1">
                    {ep.episode}
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Episode guide */}
      <div className="rounded-3xl bg-white p-4 sm:p-5 flex flex-col">
        <p className="text-[#9CADB7] text-[11px] font-semibold tracking-[0.2em] uppercase px-1 mb-3">
          Episode guide
        </p>
        <ul className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
          {episodes.map((e, i) => {
            const active = i === current;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCurrent(i);
                    setPlaying(true);
                  }}
                  aria-current={active}
                  className={`w-full flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3 rounded-2xl p-1.5 lg:p-2 text-left transition-colors ${
                    active ? "bg-[#F4F3EF] ring-1 ring-[#EC8644]/70" : "hover:bg-[#F4F3EF]"
                  }`}
                >
                  <span className="relative block w-full lg:w-28 aspect-video rounded-xl overflow-hidden shrink-0 bg-black">
                    <Thumb ep={e} sizes="160px" />
                    {active && (
                      <span className="absolute inset-0 grid place-items-center bg-black/35">
                        <PlayIcon className="w-5 h-5 text-white" />
                      </span>
                    )}
                  </span>
                  <span className="px-1 lg:px-0 pb-1 lg:pb-0">
                    <span className={`block font-[var(--font-zuume)] font-black text-base sm:text-xl tracking-tight leading-none ${active ? "text-[#EC8644]" : "text-[#293C4B]"}`}>
                      {e.episode.replace("Episode ", "Ep. ")}
                    </span>
                    <span className="hidden lg:block text-[#9CADB7] text-xs mt-1">
                      {active && playing ? "Now playing" : "Watch"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <a
          href={`https://www.youtube.com/watch?v=${ep.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex mt-auto pt-5 px-1 items-center gap-2 text-[#5A6B78] text-xs font-semibold hover:text-[#EC8644] transition-colors"
        >
          Watch on YouTube →
        </a>
      </div>
    </div>
  );
}

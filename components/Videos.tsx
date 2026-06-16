"use client";

import { useState } from "react";
import Image from "next/image";

const episodes = [
  { id: "ZPfEsIBZUS4", episode: "Episode 01", title: "", comingSoon: false, widescreen: true },
  { id: "7z48yaaV-xs", episode: "Episode 02", title: "", comingSoon: false, widescreen: true },
  { id: "ifz_9FkFwrw", episode: "Episode 03", title: "", comingSoon: false, widescreen: false },
];

function EpisodeCard({ id, episode, title, comingSoon, widescreen }: typeof episodes[number]) {
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);

  if (comingSoon) {
    return (
      <div className="flex flex-col gap-3">
        <div
          className="relative w-full rounded-2xl overflow-hidden bg-[#293C4B]/8 border border-[#293C4B]/10"
          style={{ paddingTop: "56.25%" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#293C4B]/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#293C4B]/25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
            <span className="text-[#293C4B]/30 text-sm font-medium">Coming Soon</span>
          </div>
        </div>
        <div>
          <p className="text-[#EC8644] text-xs font-medium uppercase tracking-widest">{episode}</p>
          <p className="text-[#293C4B] text-sm font-medium mt-0.5">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-lg shadow-black/20 cursor-pointer group"
        style={{ paddingTop: "56.25%" }}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={title}
          />
        ) : (
          <>
            <Image
              src={thumbSrc}
              alt={episode}
              fill
              className={`object-cover transition-transform duration-0 ${widescreen ? "scale-[1.35]" : ""}`}
              unoptimized
              onError={() => setThumbSrc(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)}
            />
            {/* dark scrim */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-105">
                <svg className="w-6 h-6 text-[#293C4B] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <p className="text-[#EC8644] text-xs font-medium uppercase tracking-widest">{episode}</p>
        <p className="text-[#293C4B] text-sm font-medium mt-0.5">{title}</p>
      </div>
    </div>
  );
}

export default function Videos() {
  return (
    <section className="bg-[#F4F3EF] py-16 sm:py-20">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-6 h-[2px] bg-[#EC8644]" />
          <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
            Original Series
          </span>
        </div>
        <div className="flex items-end justify-between mb-10 gap-6">
          <h2
            className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            The UBC Sitcom
          </h2>
        </div>

        {/* Episodes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {episodes.map((ep) => (
            <EpisodeCard key={ep.episode} {...ep} />
          ))}
        </div>
      </div>
    </section>
  );
}

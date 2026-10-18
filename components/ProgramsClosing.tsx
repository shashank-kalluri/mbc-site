"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Ticker } from "@/components/Scrapbook";

const TICKER = ["Build", "Research", "Pitch", "Win", "Nov 20–21", "UT Austin"];

const PHOTOS = [
  { src: "/photos/panel.jpg", caption: "Panels", tilt: "-rotate-6", place: "left-0 top-6" },
  { src: "/photos/swapping-contacts.jpg", caption: "New friends", tilt: "rotate-3", place: "left-[30%] top-0 z-10" },
  { src: "/photos/main-stage.jpg", caption: "Main stage", tilt: "-rotate-2", place: "right-0 top-10" },
];

/** Tilted ticker and a "here for the talks?" card under the program grid. */
export default function ProgramsClosing() {
  return (
    <>
      <Ticker items={TICKER} tilt="rotate-[-1.5deg]" className="mt-20 sm:mt-28" />

      <section className="pt-20 sm:pt-28 pb-20 sm:pb-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-6 h-[2px] bg-[#EC8644]" />
                <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                  Not competing?
                </span>
              </div>
              <h2
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                style={{ fontSize: "clamp(34px, 4.5vw, 60px)" }}
              >
                Come for the talks.
                <br />
                <span className="text-[#EC8644]">Stay for the people.</span>
              </h2>
              <p className="text-[#5A6B78] text-base sm:text-lg leading-relaxed max-w-md mt-5">
                Two days of keynotes, panels, and the finals of every program, with 1,000+
                students from 100+ schools in the room.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <a
                  href="https://luma.com/n4ad0k9m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25"
                >
                  Get tickets <ArrowUpRight size={17} />
                </a>
                <Link
                  href="/#speakers"
                  className="inline-flex items-center gap-1.5 text-[#293C4B] text-sm sm:text-base font-semibold px-5 py-2.5 sm:py-3 rounded-full border border-[#293C4B]/15 hover:border-[#293C4B]/35 transition-colors"
                >
                  See the speakers
                </Link>
              </div>
            </div>

            <div className="relative h-[250px] sm:h-[340px] lg:h-[380px]">
              {PHOTOS.map((p) => (
                <figure
                  key={p.src}
                  className={`absolute ${p.place} ${p.tilt} w-[46%] bg-white p-2 sm:p-3 pb-8 sm:pb-11 rounded-md shadow-[0_18px_40px_-18px_rgba(10,18,24,0.55)] hover:rotate-0 hover:-translate-y-1.5 hover:z-20 transition-transform duration-300`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 45vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="absolute bottom-1.5 sm:bottom-2.5 inset-x-0 text-center text-[#293C4B] text-xs sm:text-base font-semibold whitespace-nowrap">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGlobe, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { getSpeakers } from "@/lib/api/speakers";

type Speaker = {
  id: number | string;
  name: string;
  title?: string | null;
  company?: string | null;
  image_url?: string | null;
  linkedin_url?: string | null;
  x_url?: string | null;
  company_url?: string | null;
  featured?: boolean | null;
};

function SpeakerCard({ s }: { s: Speaker }) {
  const links = [
    { href: s.company_url, label: `${s.company || "Company"} website`, Icon: FaGlobe },
    { href: s.x_url, label: `${s.name} on X`, Icon: FaXTwitter },
    { href: s.linkedin_url, label: `${s.name} on LinkedIn`, Icon: FaLinkedinIn },
  ].filter((l) => l.href);

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-[#243040]">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={s.image_url || "/speakers/placeholder.png"}
          alt={s.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500 ease-out"
        />
        {/* Gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        {/* Orange left bar — visible on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#EC8644] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
        {/* Text overlaid */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-base sm:text-lg leading-tight font-[var(--font-zuume)] tracking-tight">
            {s.name}
          </h3>
          <p className="text-white/55 text-xs mt-0.5 line-clamp-1 font-medium">
            {[s.title, s.company].filter(Boolean).join(" · ")}
          </p>
          {links.length > 0 && (
            <div className="flex items-center gap-1 mt-2 -ml-1.5">
              {links.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="p-1.5 rounded-md text-white/60 hover:text-[#EC8644] hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/** Trailing tile signalling the lineup isn't final. placeholder.png is a white
 *  silhouette on transparency, so it sits on the same dark card as a real photo. */
function MoreSpeakersCard() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[#2C3B4B]">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/speakers/placeholder.png"
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover opacity-25 scale-[0.78] -translate-y-[8%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#EC8644]" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-base sm:text-lg leading-tight font-[var(--font-zuume)] tracking-tight">
            &hellip; and more!
          </h3>
          <p className="text-white/55 text-xs mt-0.5 line-clamp-1 font-medium">
            Full 2026 lineup announced soon
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpeakers()
      .then((data) => {
        const all = (data ?? []) as Speaker[];
        const featured = all.filter((s) => s.featured);
        setSpeakers(featured.length >= 3 ? featured : all.slice(0, 11));
      })
      .catch(() => setSpeakers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="speakers" className="bg-[#F4F3EF] py-16 sm:py-24">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-[2px] bg-[#EC8644]" />
              <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                2026 Lineup
              </span>
            </div>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              Our Speakers
            </h2>
            <p className="text-[#9CADB7] text-sm mt-3">Featured speakers for UBC 2026.</p>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-[#9CADB7] text-sm">Loading speakers…</p>
        ) : speakers.length === 0 ? (
          <p className="text-[#9CADB7] text-sm">Speaker lineup announced soon.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {speakers.map((s) => (
              <SpeakerCard key={s.id} s={s} />
            ))}
            <MoreSpeakersCard />
          </div>
        )}
      </div>
    </section>
  );
}

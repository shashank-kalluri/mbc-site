"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronDown, FaGlobe, FaLinkedinIn, FaPenNib, FaXTwitter } from "react-icons/fa6";
import { getSpeakers } from "@/lib/api/speakers";

type Speaker = {
  id: number | string;
  slug?: string | null;
  name: string;
  title?: string | null;
  company?: string | null;
  image_url?: string | null;
  linkedin_url?: string | null;
  x_url?: string | null;
  company_url?: string | null;
  featured?: boolean | null;
};

/** Headliners shown first, in this order. Everyone else follows alphabetically,
 *  with photos ahead of placeholders. */
const TOP_SPEAKERS = [
  "keith-grossman",
  "richard-widmann",
  "vibhu-norby",
  "scott-aaronson",
  "alok-vasudev",
  "nemil-dalal",
  "lucas-bruder",
  "ariel-wengroff",
  "dan-guido",
  "joe-kelly",
  "dan-held",
  "catrina-wang",
];

/** Links the speakers table has no column for, keyed by slug. */
const EXTRA_LINKS: Record<string, { href: string; label: string; Icon: typeof FaGlobe }[]> = {
  "scott-aaronson": [
    { href: "https://www.scottaaronson.com/", label: "Scott Aaronson's website", Icon: FaGlobe },
    { href: "https://scottaaronson.blog/", label: "Scott Aaronson's blog", Icon: FaPenNib },
  ],
  "cory-levy": [{ href: "https://corylevy.com/", label: "Cory Levy's website", Icon: FaGlobe }],
  "henry-zhang": [{ href: "https://henrylzhang.com/", label: "Henry Zhang's website", Icon: FaGlobe }],
};

/** Speakers shown before "See all". 24 fills whole rows at 3, 4 and 6 columns. */
const INITIAL_COUNT = 24;
const PHOTO_SIZES = "(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 200px";

function rank(s: Speaker) {
  const i = TOP_SPEAKERS.indexOf(s.slug ?? "");
  if (i !== -1) return i;
  return TOP_SPEAKERS.length + (s.image_url ? 0 : 1);
}

function SpeakerCard({ s }: { s: Speaker }) {
  const links = [
    { href: s.company_url, label: `${s.company || "Company"} website`, Icon: FaGlobe },
    { href: s.x_url, label: `${s.name} on X`, Icon: FaXTwitter },
    { href: s.linkedin_url, label: `${s.name} on LinkedIn`, Icon: FaLinkedinIn },
    ...(EXTRA_LINKS[s.slug ?? ""] ?? []),
  ].filter((l) => l.href);

  return (
    <article className="group">
      {/* Photo. The navy backing shows behind placeholder.png, a white silhouette on transparency. */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#2C3B4B] ring-1 ring-[#293C4B]/10">
        <Image
          src={s.image_url || "/speakers/placeholder.png"}
          alt={s.name}
          fill
          sizes={PHOTO_SIZES}
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#EC8644] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
      <h3 className="mt-3 text-[#293C4B] text-sm font-semibold leading-snug">{s.name}</h3>
      <p className="mt-0.5 text-[#6B7F8C] text-xs leading-snug line-clamp-2">
        {[s.title, s.company].filter(Boolean).join(" · ")}
      </p>
      {links.length > 0 && (
        <div className="flex items-center gap-0.5 mt-1.5 -ml-1">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="p-1 rounded text-[#9CADB7] hover:text-[#EC8644] transition-colors"
            >
              <Icon className="w-3 h-3" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

/** Trailing tile signalling the lineup isn't final. */
function MoreSpeakersCard() {
  return (
    <article>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#2C3B4B]">
        <Image
          src="/speakers/placeholder.png"
          alt=""
          fill
          sizes={PHOTO_SIZES}
          className="object-cover opacity-25 scale-[0.78] translate-y-[6%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#EC8644]" />
      </div>
      <h3 className="mt-3 text-[#293C4B] text-sm font-semibold leading-snug">&hellip; and many more!</h3>
      <p className="mt-0.5 text-[#6B7F8C] text-xs leading-snug">
        More founders, investors, builders and speakers are joining the lineup.
      </p>
    </article>
  );
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const hasMore = speakers.length > INITIAL_COUNT;
  const visible = showAll ? speakers : speakers.slice(0, INITIAL_COUNT);

  function toggleShowAll() {
    // Collapsing from the bottom of a long grid would strand the reader below the section.
    if (showAll) document.getElementById("speakers")?.scrollIntoView({ behavior: "smooth" });
    setShowAll(!showAll);
  }

  useEffect(() => {
    getSpeakers()
      .then((data) => {
        const all = (data ?? []) as Speaker[];
        const featured = all.filter((s) => s.featured);
        // Array sort is stable, so ties keep the alphabetical order from the query.
        setSpeakers(featured.length >= 3 ? [...featured].sort((a, b) => rank(a) - rank(b)) : all.slice(0, 11));
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
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8">
              {visible.map((s) => (
                <SpeakerCard key={s.id} s={s} />
              ))}
              {(!hasMore || showAll) && <MoreSpeakersCard />}
            </div>
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={toggleShowAll}
                  aria-expanded={showAll}
                  className="inline-flex items-center gap-2 rounded-full border border-[#293C4B]/20 bg-white px-6 py-2.5 text-sm font-semibold text-[#293C4B] hover:border-[#EC8644] hover:text-[#EC8644] transition-colors"
                >
                  {showAll ? "Show fewer speakers" : `See all ${speakers.length} speakers`}
                  <FaChevronDown className={`w-3 h-3 transition-transform ${showAll ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Speaker as Speaker } from "@/lib/supabase";
import { getSpeakers } from "@/lib/api/speakers";

// Normalized type for the UI
type NormalizedSpeaker = Speaker & {
  tags: string[]; // always an array in the UI
  featured?: boolean | null; // optional, matches your DB column
};

// ——————————————————————————————————————————————————————
// Helpers
// ——————————————————————————————————————————————————————
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function normalizeTags(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map(String).filter(Boolean);
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(String).filter(Boolean);
      }
    } catch {
      return [raw].filter(Boolean);
    }
  }
  if (typeof raw === "object") {
    return Object.values(raw as Record<string, unknown>)
      .map(String)
      .filter(Boolean);
  }

  return [];
}

function SocialIcon({ type }: { type: "x" | "linkedin" }) {
  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-4">
        <path
          fill="currentColor"
          d="M18.3 2H21l-6.5 7.4L22 22h-6.9l-5.4-7.1L3.6 22H1l7.1-8.1L2 2h6.9l5 6.6L18.3 2Zm-1.2 18h1.9L7.9 4H6L17.1 20Z"
        />
      </svg>
    );
  }
  // linkedin
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.8v2h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6V23h-4v-6.5c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V23h-4V8.5z"
      />
    </svg>
  );
}

// ——————————————————————————————————————————————————————
// Card Component
// ——————————————————————————————————————————————————————
function SpeakerCard({ s }: { s: NormalizedSpeaker }) {
  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
        "shadow-sm hover:shadow-md transition-shadow",
        "focus-within:ring-2 focus-within:ring-maize/60"
      )}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-neutral-900 aspect-[3/4] sm:aspect-[4/5]">
        <Image
          src={s.image_url || "/speakers/placeholder.jpg"}
          alt={s.name}
          fill
          priority={Boolean(s.featured)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient wash for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        {/* Quick actions */}
        {(s.linkedin_url || s.x_url) && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {s.linkedin_url && (
              <a
                href={s.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur hover:bg-white/20"
                aria-label={`${s.name} LinkedIn`}
              >
                <SocialIcon type="linkedin" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {s.x_url && (
              <a
                href={s.x_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur hover:bg-white/20"
                aria-label={`${s.name} on X`}
              >
                <SocialIcon type="x" />
                <span className="sr-only">X (Twitter)</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {s.tags?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] leading-none text-white/90"
            >
              {t}
            </span>
          ))}
          {s.featured && (
            <span className="inline-flex items-center rounded-full bg-maize/20 px-2.5 py-1 text-[11px] leading-none text-maize">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white">
          {s.name}
        </h3>
        <p className="mt-0.5 text-sm text-white/70">
          {[s.title, s.company].filter(Boolean).join(" · ")}
        </p>
      </div>
    </article>
  );
}

// ——————————————————————————————————————————————————————
// Controls (search + tag filter)
// ——————————————————————————————————————————————————————
function Controls({
  allTags,
  query,
  setQuery,
  activeTag,
  setActiveTag,
}: {
  allTags: string[];
  query: string;
  setQuery: (v: string) => void;
  activeTag: string | null;
  setActiveTag: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Search bar */}
      <div className="w-full sm:flex-1">
        <label className="sr-only" htmlFor="speaker-search">
          Search speakers
        </label>
        <input
          id="speaker-search"
          type="text"
          placeholder="Search by name, company, role…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-w-[200px] rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-maize/60"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 w-full sm:w-auto sm:flex-row">
        <button
          onClick={() => setActiveTag(null)}
          className={cx(
            "rounded-full px-3 py-1.5 text-xs",
            activeTag === null
              ? "bg-maize text-black"
              : "bg-white/5 text-white/90 hover:bg-white/10 border border-white/10"
          )}
        >
          All
        </button>

        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t === activeTag ? null : t)}
            className={cx(
              "rounded-full px-3 py-1.5 text-xs",
              activeTag === t
                ? "bg-maize text-black"
                : "bg-white/5 text-white/90 hover:bg-white/10 border border-white/10"
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// ——————————————————————————————————————————————————————
// Section (fetches from Supabase via API helper)
// ——————————————————————————————————————————————————————
export default function SpeakersSection({
  title = "Meet the Speakers",
  subtitle = "World-class builders, investors, and policymakers.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [speakers, setSpeakers] = useState<NormalizedSpeaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getSpeakers();

        if (!cancelled) {
          const normalized: NormalizedSpeaker[] = (data || []).map((s) => ({
            ...(s as Speaker),
            tags: normalizeTags((s as any).tags),
            featured: (s as any).featured ?? false,
          }));

          setSpeakers(normalized);
        }
      } catch (err) {
        console.error("Error loading speakers in component:", err);
        if (!cancelled) setSpeakers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(speakers.flatMap((s) => s.tags || []))).sort(),
    [speakers]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return speakers.filter((s) => {
      const matchQ = !q
        ? true
        : [s.name, s.title, s.company]
            .filter(Boolean)
            .some((v) => v!.toLowerCase().includes(q));
      const matchTag = activeTag ? s.tags?.includes(activeTag) : true;
      return matchQ && matchTag;
    });
  }, [speakers, query, activeTag]);

  return (
    <section
      id="speakers"
      className="w-full py-16 sm:py-20 bg-background text-white"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-prose">
              {subtitle}
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            See all programs
          </Link>
        </div>

        {/* Controls */}
        <div className="mt-6">
          <Controls
            allTags={allTags}
            query={query}
            setQuery={setQuery}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        </div>

        {/* Grid / Loading / Empty */}
        {loading && speakers.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/70">
            Loading speakers…
          </div>
        ) : (
          <>
            <div
              className={cx(
                "mt-8 grid gap-5",
                // 1 col on tiny, 2 cols on most phones, 3+ on larger screens
                "grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filtered.map((s) => (
                <div key={s.id} className="h-full">
                  <SpeakerCard s={s} />
                </div>
              ))}
            </div>

            {filtered.length === 0 && !loading && (
              <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/70">
                No speakers match your search.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

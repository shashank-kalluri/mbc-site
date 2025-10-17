"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

/* --- TYPES --- */
export type Partnership = {
  id: number;
  slug: string;
  name: string;
  website_url: string | null;
  logo_url: string;
  logo_url_dark?: string | null;
  tier: number; // 1=Presenting, 2=Ecosystem, 3=Scale, 4=Brand
  status: "active" | "pending" | "inactive";
  created_at: string;
  updated_at: string;
};

const byTierAscThenName = (a: Partnership, b: Partnership): number => {
  if (a.tier !== b.tier) return a.tier - b.tier; // 1,2,3,4
  return a.name.localeCompare(b.name);
};

/* --- PARTNER CARD --- */
const PartnerCard: React.FC<{
  partner: Partnership;
  size: "sm" | "md" | "lg";
}> = ({ partner, size }) => {
  const isPresenting = partner.tier === 1;
  const src = partner.logo_url_dark || partner.logo_url; // prefer dark variant

  const baseClasses =
    "group relative transition duration-300 hover:scale-[1.03] flex items-center justify-center p-3 rounded-2xl border border-transparent hover:border-foreground/10";
  const sizeClasses =
    size === "lg"
      ? "w-full max-w-[280px] h-full"
      : size === "md"
      ? "w-full max-w-[180px] h-full"
      : "w-full max-w-[140px] h-full";
  const cardClasses = `${baseClasses} ${sizeClasses}`;

  const CardContent = (
    <>
      <div className="relative mx-auto w-full aspect-[4/2.5]">
        <Image
          src={src}
          alt={partner.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-contain transition duration-300 ${
            isPresenting
              ? "p-1 grayscale-0"
              : "p-2 lg:p-1 grayscale group-hover:grayscale-0"
          }`}
          unoptimized
        />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-hover:ring-1 group-hover:ring-foreground/10" />

      {/* name (mobile only) */}
      <div className="mt-1 text-left text-[11px] text-foreground/60 lg:hidden">
        {partner.name}
      </div>
    </>
  );

  return partner.website_url ? (
    <Link
      href={partner.website_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      title={partner.name}
      className={cardClasses}
      style={{ display: "inline-block" }}
    >
      {CardContent}
    </Link>
  ) : (
    <div
      role="img"
      aria-label={partner.name}
      title={partner.name}
      className={cardClasses}
      style={{ display: "inline-block" }}
    >
      {CardContent}
    </div>
  );
};

/* --- MAIN VIEW --- */

const tierNames: Record<number, string> = {
  1: "Presenting",
  2: "Ecosystem",
  3: "Scale",
  4: "Brand",
};

const Sponsors: React.FC<{
  /** Optional: override merged (3+4) section title */
  mergedTitle?: string;
}> = ({ mergedTitle }) => {
  const [partners, setPartners] = useState<Partnership[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1) Fetch
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from("partnerships")
        .select(
          "id, slug, name, website_url, logo_url, logo_url_dark, tier, status, created_at, updated_at"
        )
        .eq("status", "active");

      if (fetchError) {
        setError(fetchError.message);
        setPartners(null);
      } else {
        setPartners((data as Partnership[]).sort(byTierAscThenName));
      }
      setIsLoading(false);
    })();
  }, []);

  // 2) Group + special merged (3 & 4)
  const { tier1Group, tier2Group, merged34 } = useMemo(() => {
    const map = new Map<number, Partnership[]>();
    (partners ?? []).forEach((p) => {
      const arr = map.get(p.tier) ?? [];
      arr.push(p);
      map.set(p.tier, arr);
    });

    const t1 = map.get(1);
    const t2 = map.get(2);
    const t3 = map.get(3) ?? [];
    const t4 = map.get(4) ?? [];

    // merged 3 & 4, keep stable order by tier then name
    const merged = [...t3, ...t4].sort(byTierAscThenName);

    return {
      tier1Group: t1 ? { tier: 1, items: t1 } : undefined,
      tier2Group: t2 ? { tier: 2, items: t2 } : undefined,
      merged34: merged.length ? merged : undefined,
    };
  }, [partners]);

  // 3) UI states
  if (isLoading) {
    return (
      <section className="py-10 text-center text-lg text-foreground/50">
        Loading partners...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 text-center text-lg text-red-500">
        Error loading partners: {error}
      </section>
    );
  }

  if (!partners || partners.length === 0) {
    return (
      <section className="py-10 text-center text-lg text-foreground/50">
        Check back soon for our official partners!
      </section>
    );
  }

  return (
    <section className="w-full py-10 md:py-24">
      {/* TweetBoard-style alignment container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Heading (left-aligned) */}
        <div className="flex flex-col mb-10 md:mb-16 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Amazing Partners
          </h2>
        </div>

        {/* Stack tiers with natural spacing */}
        <div className="space-y-12">
          {/* Tier 1 — Presenting (prominent grid) */}
          {tier1Group && (
            <div className="border-l border-white/10 pl-6 ml-4 sm:ml-6">
              <h3 className="text-left text-lg font-bold uppercase tracking-widest text-maize mb-6">
                {tierNames[1]}
              </h3>
              <div className="flex flex-wrap justify-start gap-x-8 gap-y-8">
                {tier1Group.items.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} size="lg" />
                ))}
              </div>
            </div>
          )}

          {/* Tier 2 — Ecosystem */}
          {tier2Group && (
            <div className="border-l border-white/10 pl-6 ml-4 sm:ml-6">
              <h3 className="text-left text-xl font-bold mb-6 text-foreground/80">
                {tierNames[2]}
              </h3>
              <div className="flex flex-wrap justify-start gap-x-6 gap-y-8">
                {tier2Group.items.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} size="md" />
                ))}
              </div>
            </div>
          )}

          {/* Merged — Scale & Brand */}
          {merged34 && (
            <div className="border-l border-white/10 pl-6 ml-4 sm:ml-6">
              <h3 className="text-left text-xl font-bold mb-4 text-foreground/80">
                {mergedTitle ?? "Scale & Brand"}
              </h3>
              <div className="flex flex-wrap justify-start gap-x-4 gap-y-6">
                {merged34.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} size="sm" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;

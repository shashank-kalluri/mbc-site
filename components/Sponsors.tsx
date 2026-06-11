"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export type Partnership = {
  id: number;
  slug: string;
  name: string;
  website_url: string | null;
  logo_url: string;
  tier: number;
  status: "active" | "pending" | "inactive";
  created_at: string;
  updated_at: string;
};

const byTierAscThenName = (a: Partnership, b: Partnership) =>
  a.tier !== b.tier ? a.tier - b.tier : a.name.localeCompare(b.name);

const tierConfig: Record<number, { label: string; logoH: number; opacity: string }> = {
  1: { label: "Presenting", logoH: 48, opacity: "opacity-90" },
  2: { label: "Ecosystem", logoH: 36, opacity: "opacity-70" },
  3: { label: "Scale & Brand", logoH: 28, opacity: "opacity-60" },
  4: { label: "Scale & Brand", logoH: 28, opacity: "opacity-60" },
};

function PartnerLogo({ p }: { p: Partnership }) {
  const cfg = tierConfig[p.tier] ?? tierConfig[3];
  const inner = (
    <div
      className={`relative transition-all duration-200 hover:opacity-100 ${cfg.opacity} group`}
      style={{ height: cfg.logoH }}
    >
      <Image
        src={p.logo_url}
        alt={p.name}
        width={160}
        height={cfg.logoH}
        className="object-contain h-full w-auto"
        unoptimized
      />
    </div>
  );
  return p.website_url ? (
    <a href={p.website_url} target="_blank" rel="noopener noreferrer" title={p.name}>
      {inner}
    </a>
  ) : (
    <div title={p.name}>{inner}</div>
  );
}

export default function Sponsors() {
  const [partners, setPartners] = useState<Partnership[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("partnerships")
      .select("id, slug, name, website_url, logo_url, tier, status, created_at, updated_at")
      .eq("status", "active")
      .then(({ data, error }) => {
        if (!error && data) {
          setPartners((data as Partnership[]).sort(byTierAscThenName));
        }
        setLoading(false);
      });
  }, []);

  const groups = useMemo(() => {
    if (!partners) return [];
    const map = new Map<number, Partnership[]>();
    partners.forEach((p) => {
      const arr = map.get(p.tier) ?? [];
      arr.push(p);
      map.set(p.tier, arr);
    });
    // Merge tiers 3+4
    const t3 = map.get(3) ?? [];
    const t4 = map.get(4) ?? [];
    const merged34 = [...t3, ...t4].sort(byTierAscThenName);

    const result: { tier: number; label: string; items: Partnership[] }[] = [];
    if (map.has(1)) result.push({ tier: 1, label: "Presenting", items: map.get(1)! });
    if (map.has(2)) result.push({ tier: 2, label: "Ecosystem", items: map.get(2)! });
    if (merged34.length) result.push({ tier: 3, label: "Scale & Brand", items: merged34 });
    return result;
  }, [partners]);

  return (
    <section id="sponsors" className="bg-white py-16 sm:py-24">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-[2px] bg-[#EC8644]" />
          <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
            2025 Partners
          </span>
        </div>
        <h2
          className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none mb-3"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          Past Sponsors
        </h2>
        <p className="text-[#9CADB7] text-sm mb-16">Proud supporters of UBC 2025. Interested in sponsoring UBC 2026? <a href="mailto:skalluri123@hotmail.com" className="text-[#EC8644] hover:underline">Get in touch.</a></p>

        {loading && (
          <p className="text-[#9CADB7] text-sm">Loading partners…</p>
        )}

        {!loading && groups.length === 0 && (
          <p className="text-[#9CADB7] text-sm">Partners announced soon.</p>
        )}

        {!loading && groups.length > 0 && (
          <div className="space-y-16">
            {groups.map(({ tier, label, items }) => (
              <div key={tier}>
                {/* Tier label */}
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                      tier === 1 ? "text-[#EC8644]" : "text-[#9CADB7]"
                    }`}
                  >
                    {label}
                  </span>
                  <div className="flex-1 h-px bg-[#293C4B]/8" />
                </div>
                {/* Logos */}
                <div
                  className={`flex flex-wrap items-center gap-x-10 gap-y-8 ${
                    tier === 1 ? "gap-x-14" : ""
                  }`}
                >
                  {items.map((p) => (
                    <PartnerLogo key={p.id} p={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

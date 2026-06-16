"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

function PartnerLogo({ p }: { p: Partnership }) {
  const inner = (
    <div className="relative transition-opacity duration-200 opacity-70 hover:opacity-100" style={{ height: 40 }}>
      <Image
        src={p.logo_url}
        alt={p.name}
        width={160}
        height={40}
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
      .lte("tier", 2)
      .order("tier", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setPartners(data as Partnership[]);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="sponsors"
      className="bg-[#F4F3EF] py-16 sm:py-24"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
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
        <p className="text-[#9CADB7] text-sm mb-16">
          Proud supporters of UBC 2025. Interested in sponsoring UBC 2026?{" "}
          <a href="mailto:uniblockchainconferences@gmail.com" className="text-[#EC8644] hover:underline">
            Get in touch.
          </a>
        </p>

        {loading && <p className="text-[#9CADB7] text-sm">Loading partners…</p>}

        {!loading && (!partners || partners.length === 0) && (
          <p className="text-[#9CADB7] text-sm">Partners announced soon.</p>
        )}

        {!loading && partners && partners.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
            {partners.map((p) => (
              <PartnerLogo key={p.id} p={p} />
            ))}
            <span className="text-[#9CADB7] text-sm font-medium">and more</span>
          </div>
        )}
      </div>
    </section>
  );
}

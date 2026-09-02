import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { programs, type ProgramMeta } from "@/data/programs";

export const metadata: Metadata = {
  title: "Programs · UBC 2026",
  description:
    "Competitions and stages at the University Blockchain Conference 2026 — November 20–21 at UT Austin.",
};

function CardBody({ program }: { program: ProgramMeta }) {
  const locked = program.status === "coming-soon";

  return (
    <>
      <Image
        src={program.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={
          locked
            ? "object-cover opacity-25 grayscale"
            : "object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 ease-out"
        }
      />
      <div
        className={`absolute inset-0 ${
          locked
            ? "bg-gradient-to-t from-[#1A2A36] via-[#1A2A36]/90 to-[#1A2A36]/60"
            : "bg-gradient-to-t from-[#1A2A36] via-[#1A2A36]/80 to-[#1A2A36]/20"
        }`}
      />
      <div className="relative">
        <div className="flex items-center gap-2.5 mb-3">
          {locked && <Lock size={13} className="text-white/35" />}
          <span
            className={`text-xs font-medium tracking-[0.22em] uppercase ${
              locked ? "text-white/35" : "text-[#EC8644]"
            }`}
          >
            {locked ? "Coming soon" : program.tagline}
          </span>
        </div>

        <h2
          className={`font-[var(--font-zuume)] font-black text-3xl sm:text-4xl tracking-tight leading-none ${
            locked ? "text-white/45" : "text-white"
          }`}
        >
          {program.name}
        </h2>

        <p
          className={`text-sm leading-relaxed mt-4 max-w-md ${
            locked ? "text-white/25" : "text-white/50"
          }`}
        >
          {program.description}
        </p>

        <div className="flex items-center justify-between gap-4 mt-7">
          {locked ? (
            <span className="text-white/30 text-sm font-semibold">Not open yet</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:text-[#EC8644] transition-colors">
              View program <ArrowUpRight size={16} />
            </span>
          )}
          <span
            className={`text-[11px] tracking-[0.16em] uppercase ${
              locked ? "text-white/20" : "text-white/30"
            }`}
          >
            {program.detail}
          </span>
        </div>
      </div>
    </>
  );
}

export default function ProgramsPage() {
  const cardBase =
    "group relative overflow-hidden rounded-3xl bg-[#1A2A36] min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-8 sm:p-12";

  return (
    <div className="bg-[#F4F3EF] min-h-screen">
      {/* Header */}
      <section className="bg-[#1A2A36]">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-14 sm:pt-40 sm:pb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-[2px] bg-[#EC8644]" />
            <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
              UBC 2026
            </span>
          </div>
          <h1
            className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(46px, 8vw, 110px)" }}
          >
            Programs
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mt-6">
            Competitions and stages running alongside the conference. Nov 20–21, 2026 at UT Austin.
          </p>
        </div>
      </section>

      {/* Program cards */}
      <section className="py-14 sm:py-20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid gap-4 md:grid-cols-2">
            {programs.map((p) =>
              p.status === "live" ? (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  className={`${cardBase} md:col-span-2`}
                >
                  <CardBody program={p} />
                </Link>
              ) : (
                <div
                  key={p.slug}
                  aria-disabled="true"
                  className={`${cardBase} cursor-not-allowed select-none`}
                >
                  <CardBody program={p} />
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

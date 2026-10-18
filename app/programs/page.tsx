import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { ArrowUpRight, Lock } from "lucide-react";
import ProgramsClosing from "@/components/ProgramsClosing";
import { programs, type ProgramMeta } from "@/data/programs";

const handwriting = Caveat({ subsets: ["latin"], weight: ["700"], display: "swap" });

export const metadata: Metadata = {
  alternates: { canonical: "/programs" },
  title: "Programs",
  description:
    "Competitions and stages at the University Blockchain Conference 2026 — November 20–21 at UT Austin.",
};

function ProgramCard({ program }: { program: ProgramMeta }) {
  const locked = program.status === "coming-soon";

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1A2A36]">
        <Image
          src={program.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={
            locked
              ? "object-cover opacity-30 grayscale"
              : "object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          }
        />
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase ${
            locked ? "bg-white/15 text-white/70 backdrop-blur-sm" : "bg-white text-[#293C4B] shadow-md"
          }`}
        >
          {locked && <Lock size={11} />}
          {locked ? "Coming soon" : program.detail}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-7">
        <p
          className={`text-[11px] font-medium tracking-[0.18em] uppercase ${
            locked ? "text-[#9CADB7]" : "text-[#EC8644]"
          }`}
        >
          {program.tagline}
        </p>
        <h2
          className={`font-[var(--font-zuume)] font-black text-3xl tracking-tight leading-none mt-2.5 ${
            locked ? "text-[#293C4B]/45" : "text-[#293C4B]"
          }`}
        >
          {program.name}
        </h2>
        <p
          className={`text-sm leading-relaxed mt-3 ${
            locked ? "text-[#9CADB7]" : "text-[#5A6B78]"
          }`}
        >
          {program.description}
        </p>
        <span
          className={`mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${
            locked ? "text-[#9CADB7]" : "text-[#293C4B] group-hover:text-[#EC8644] transition-colors"
          }`}
        >
          {locked ? "Not open yet" : <>View program <ArrowUpRight size={16} /></>}
        </span>
      </div>
    </>
  );

  const base = "group flex flex-col h-full bg-white rounded-3xl overflow-hidden";

  return locked ? (
    <div aria-disabled="true" className={`${base} cursor-not-allowed select-none`}>
      {body}
    </div>
  ) : (
    <Link
      href={`/programs/${program.slug}`}
      className={`${base} shadow-[0_24px_48px_-28px_rgba(26,42,54,0.45)] hover:-translate-y-1.5 hover:shadow-[0_32px_56px_-28px_rgba(26,42,54,0.55)] transition-all duration-300`}
    >
      {body}
    </Link>
  );
}

export default function ProgramsPage() {
  return (
    <div className="bg-[#F4F3EF] min-h-screen">
      {/* Header */}
      <section className="relative bg-[#1A2A36] overflow-hidden">
        <Image
          src="/photos/hackathon/pitch.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,42,54,0.7) 0%, rgba(26,42,54,0.85) 60%, #1A2A36 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 85% 15%, rgba(236,134,68,0.25) 0%, rgba(236,134,68,0) 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-28 sm:pt-40 sm:pb-32">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-[2px] bg-[#EC8644]" />
            <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
              UBC 2026
            </span>
          </div>
          <h1
            className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(46px, 7vw, 96px)" }}
          >
            Programs
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mt-5">
            Build, research, and pitch your way onto the stage at UBC 2026, Nov 20–21 at UT
            Austin.
          </p>

          {/* Scribbled note pointing down at the cards */}
          <div
            aria-hidden
            className="hidden md:block absolute right-10 lg:right-24 bottom-24 text-[#EC8644] pointer-events-none"
          >
            <span
              className={`${handwriting.className} block text-white text-[28px] leading-none -rotate-6 -translate-x-10`}
            >
              pick your path!
            </span>
            <svg viewBox="0 0 90 80" className="w-[90px] h-[80px] ml-14 -mt-1">
              <path
                d="M 10 6 C 40 2, 70 14, 56 30 C 46 42, 32 30, 46 24 C 66 16, 74 46, 62 72"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 62 72 L 54 60 M 62 72 L 72 62"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Program cards, pulled up over the header */}
      <section>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 -mt-16 sm:-mt-20 relative">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </div>
      </section>

      <ProgramsClosing />
    </div>
  );
}

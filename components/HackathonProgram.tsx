"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  Clock,
  GraduationCap,
  FlaskConical,
  CircuitBoard,
  Trophy,
  Users,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

type Prize = { label: string; amount?: string; description?: string };
type TimelineItem = { label: string; datetime: string; note?: string };

const LUMA_URL = "https://luma.com/college.xyz?k=c";

const PrizeRow: React.FC<Prize> = ({ label, amount, description }) => (
  <div className="flex items-start justify-between gap-4 py-2">
    <div className="text-foreground/90 font-medium">{label}</div>
    <div className="text-right">
      {amount && <div className="font-semibold">{amount}</div>}
      {description && (
        <div className="text-sm text-foreground/60">{description}</div>
      )}
    </div>
  </div>
);

const Timeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => (
  <ol className="relative ml-3 border-l border-foreground/10">
    {items.map((it, idx) => (
      <li key={idx} className="mb-6 ml-4">
        <span className="absolute -left-1.5 flex h-3 w-3 rounded-full bg-foreground/70" />
        <div className="text-sm text-foreground/60">{it.label}</div>
        <div className="font-medium">{it.datetime}</div>
        {it.note && <div className="text-sm text-foreground/60">{it.note}</div>}
      </li>
    ))}
  </ol>
);

export const HackathonProgram: React.FC = () => {
  const stats = [
    { label: "Tracks", value: "2 (Solana, Base)" },
    { label: "Finalists", value: "Top 10 (5 per track)" },
    { label: "Submit By", value: "Dec 5, 11:59 PM ET" },
    { label: "Finals", value: "Dec 6 (5 min + 2 min Q&A)" },
  ];

  const prizes: Prize[] = [
    { label: "Solana Track Prize Pool", amount: "$20,000" },
    { label: "Base (EVM) Track Prize Pool", amount: "$10,000" },
    { label: "Polymarket Bounty — Prediction Markets", amount: "$5,000" },
    { label: "Circle Bounty — USDC & Payments", amount: "$5,000" },
    { label: "Participation Prize", amount: "$50 / team" },
  ];

  const timeline: TimelineItem[] = [
    { label: "Kickoff", datetime: "Sun, Nov 30, 2025" },
    {
      label: "Submission Deadline",
      datetime: "Fri, Dec 5, 2025 — 11:59 PM ET",
    },
    { label: "In-Person Judging & Demos", datetime: "Sat, Dec 6, 2025" },
    {
      label: "Final Presentations",
      datetime: "Sat, Dec 6, 2025",
      note: "Top 10 teams (5/track). 5-min pitch + 2-min Q&A. Winners announced at closing ceremony.",
    },
  ];

  const eligibility = [
    "Teams of 1–4 (solo welcome).",
    "Projects primarily built during the hackathon window.",
    "Cross-chain projects may submit to both tracks if truly cross-chain.",
  ];

  const rules = [
    "Submit: title/team, ≤250-word description, ≤3-min demo video, public GitHub, technical summary, and contract address (if applicable).",
    "Include a working demo (web, mobile, frame, or CLI).",
    "AI tools allowed. You retain all IP.",
    "Follow code of conduct and venue instructions.",
  ];

  const faqs = [
    { q: "Pre-existing project?", a: "No. Build during the hackathon." },
    { q: "Team required?", a: "No. Solo builders are welcome." },
    { q: "AI usage?", a: "Yes, encouraged." },
    { q: "IP ownership?", a: "You own your code and IP." },
  ];

  const cta = [
    {
      label: "Sign Up for Hackathon",
      href: "https://forms.gle/rbGeRNvZG4sFfgB77",
    },
    {
      label: "Join Hackathon Telegram",
      href: "https://t.me/+ZOVY6KZGcHE1ZmFh",
    },
    {
      label: "Read Hackathon Guide",
      href: "https://docs.google.com/document/d/1Cc2vOxhOZMjJwDFm865w_u5Dax9q9Ay4fIWhNOsaYhw/edit?usp=sharing",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      {/* Left: Overview */}
      <div className="lg:col-span-2 space-y-8">
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              💻 MBC 2025 Hackathon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 leading-relaxed">
              Build something amazing on Solana or Base (EVM) and compete for
              tens of thousands of dollars in prizes! Plus optional ecosystem
              bounties. Submit by Dec 5 (11:59 PM ET). Top 10 teams demo live on
              Dec 6.
            </p>

            {/* Tracks */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-foreground/10 p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <CircuitBoard className="h-4 w-4" />
                  Solana
                </div>
                <p className="text-sm text-foreground/60 mt-1">
                  Deploy to devnet or mainnet and use at least one Solana tool
                  (Anchor, Seahorse, Web3.js/Kit/Gill, SPL/Token Extensions,
                  Metaplex, Jupiter, Solend, or Solana AgentKit/x402).
                </p>
              </div>

              <div className="rounded-xl border border-foreground/10 p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <FlaskConical className="h-4 w-4" />
                  Base (EVM)
                </div>
                <p className="text-sm text-foreground/60 mt-1">
                  Deploy on Base mainnet or Base Sepolia. Bonus for Base
                  SDK/OnchainKit/MiniKit, ERC-4337 AA, AgentKit/x402, or onchain
                  data APIs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prizes */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" /> Prizes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-foreground/10">
              {prizes.map((pr, i) => (
                <PrizeRow key={i} {...pr} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Judging */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" /> Judging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-foreground/80">
              <li>
                Solana — Innovation (30%), Impact (30%), Technical (20%), Design
                (15%), Presentation (15%).
              </li>
              <li>
                Base — Onchain Magic (30%), Delight (25%), Utility (20%),
                Technical (15%), Cultural Resonance (10%).
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Eligibility & Rules */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Eligibility & Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-sm font-semibold mb-2">Eligibility</div>
              <ul className="list-disc pl-5 text-sm text-foreground/70 space-y-1">
                {eligibility.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">Rules</div>
              <ul className="list-disc pl-5 text-sm text-foreground/70 space-y-1">
                {rules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-foreground/80">
              {faqs.map((f, i) => (
                <li key={i}>
                  <div className="font-medium">{f.q}</div>
                  <div className="text-sm text-foreground/70">{f.a}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Right: Sidebar */}
      <aside className="space-y-8">
        {/* Get Involved */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> Get Involved
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            {cta.map((c, i) => (
              <Button asChild key={i}>
                <Link href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.label}
                </Link>
              </Button>
            ))}

            {/* No submission CTA yet */}
            <Button
              disabled
              className="opacity-60 cursor-not-allowed"
              title="Submission link coming soon"
            >
              Submit (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        {/* At a Glance */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> At a Glance
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-foreground/10 p-3"
              >
                <div className="text-xs uppercase tracking-wide text-foreground/60">
                  {s.label}
                </div>
                <div className="font-semibold">{s.value}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" /> Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline items={timeline} />
          </CardContent>
        </Card>

        {/* Info Sessions */}
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" /> Info Sessions & Office Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm text-foreground/70">
              Join prep workshops, info sessions, and office hours throughout
              the week.
            </p>
            <Button asChild>
              <Link href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                Open Sessions Calendar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

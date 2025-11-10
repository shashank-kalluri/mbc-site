"use client";

import React from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  GraduationCap,
  FlaskConical,
  CircuitBoard,
  Trophy,
  Users,
  ShieldCheck,
  BookOpenText,
  MessageSquare,
} from "lucide-react";

/**
 * MBC Programs Page — minimal hero
 * Save as: app/programs/page.tsx
 */

// ---------------------------
// Types
// ---------------------------

type Prize = { label: string; amount?: string; description?: string };
type TimelineItem = { label: string; datetime: string; note?: string };

type Program = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  headline: string;
  blurb: string;
  cta: { label: string; href: string }[];
  stats: { label: string; value: string }[];
  tracks?: { name: string; description: string; icon: React.ReactNode }[];
  prizes?: Prize[];
  judging?: string[];
  timeline?: TimelineItem[];
  eligibility?: string[];
  rules?: string[];
  faqs?: { q: string; a: string }[];
};

// ---------------------------
// Content (sourced from docs)
// ---------------------------

const PROGRAMS: Program[] = [
  {
    id: "hackathon",
    name: "Hackathon",
    slug: "hackathon",
    emoji: "💻",
    headline: "One-week build, live finals at MBC.",
    blurb:
      "A focused build sprint with two tracks — Solana and Base (EVM) — plus ecosystem bounties. Submit by Dec 5 (11:59 PM ET). Top 10 teams demo live on Dec 6.",
    cta: [
      {
        label: "Read Hackathon Guide",
        href: "https://docs.google.com/document/d/1Cc2vOxhOZMjJwDFm865w_u5Dax9q9Ay4fIWhNOsaYhw/edit?usp=sharing",
      },
      { label: "Sponsor a Program", href: "/sponsor" },
    ],
    stats: [
      { label: "Tracks", value: "2 (Solana, Base)" },
      { label: "Finalists", value: "Top 10 (5 per track)" },
      { label: "Submission Due", value: "Dec 5, 11:59 PM ET" },
      { label: "Finals", value: "Dec 6 (5 min pitch + 2 min Q&A)" },
    ],
    tracks: [
      {
        name: "Solana",
        description:
          "Deploy to devnet or mainnet and use at least one Solana tool (e.g., Anchor, Seahorse, Web3.js, SPL, Metaplex, Jupiter, Solend, AgentKit/x402).",
        icon: <CircuitBoard className="h-4 w-4" />,
      },
      {
        name: "Base (EVM)",
        description:
          "Deploy on Base mainnet or Base Sepolia. Bonus for Base SDK/OnchainKit/MiniKit, ERC-4337 AA, AgentKit/x402, or onchain data APIs.",
        icon: <FlaskConical className="h-4 w-4" />,
      },
    ],
    prizes: [
      { label: "Solana Track Prize Pool", amount: "$20,000" },
      { label: "Base (EVM) Track Prize Pool", amount: "$10,000" },
      { label: "Polymarket Bounty — Prediction Markets", amount: "$5,000" },
      { label: "Circle Bounty — USDC & Payments", amount: "$5,000" },
      { label: "Participation Prize", amount: "$50 / team" },
    ],
    judging: [
      "Solana Track — Innovation (30%), Impact & Usefulness (30%), Technical Execution (20%), Design & UX (15%), Presentation (15%).",
      "Base Track — Onchain Magic (30%), Delight & Design (25%), Utility & Longevity (20%), Technical Execution (15%), Social & Cultural Resonance (10%).",
    ],
    timeline: [
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
    ],
    eligibility: [
      "Teams of 1–4 (solo welcome).",
      "Projects primarily built during the hackathon window.",
      "Cross-chain projects may submit to both tracks if truly cross-chain.",
    ],
    rules: [
      "Submit: Title & team, ≤250 word description, ≤3 min demo video, public GitHub, technical summary, (and contract address if applicable).",
      "Include a working demo (web, mobile, or CLI).",
      "AI tools are allowed. You retain all IP to your project.",
      "Respect the code of conduct and venue instructions.",
    ],
    faqs: [
      {
        q: "Can I work on a pre-existing project?",
        a: "No. Projects must be substantially built during the hackathon.",
      },
      { q: "Do I need a team?", a: "No. Solo builders are welcome." },
      {
        q: "Can I use AI tools?",
        a: "Yes, you are encouraged to use AI tools.",
      },
      {
        q: "Who owns my project?",
        a: "You retain all rights to your code and IP.",
      },
    ],
  },
  {
    id: "franklin-templeton",
    name: "Franklin Templeton Research Competition",
    slug: "franklin-templeton",
    emoji: "📈",
    headline: "Write a 3–5 page thesis, then pitch live at MBC.",
    blurb:
      "A two-round research competition (written report → live pitch) running Nov 13–Dec 6. Choose one of three tracks and build a concise, defensible investment thesis.",
    cta: [
      {
        label: "Read Competition Memo",
        href: "https://docs.google.com/document/d/1Sf026qP_UGUSTcpXpBj2GfskQ-gq_aXTwqYN0KQasIs/edit?usp=sharing",
      },
      {
        label: "Sign Up",
        href: "https://docs.google.com/forms/d/e/1FAIpQLScXTkcs2neukQp7u_1bMJanZ_lbH7-pPd215JLEZSgQDcroCA/viewform",
      },
    ],
    stats: [
      { label: "Tracks", value: "3" },
      { label: "Report Length", value: "3–5 pages" },
      { label: "Finals Pitch", value: "10 min total (5 + 5 Q&A)" },
      { label: "Prize Pool", value: "$12,500 + Ledgers" },
    ],
    tracks: [
      {
        name: "Long < $250M MC",
        description:
          "Select an asset under $250M market cap and argue a long thesis.",
        icon: <BookOpenText className="h-4 w-4" />,
      },
      {
        name: "Long > $250M MC",
        description:
          "Select an asset over $250M market cap and argue a long thesis.",
        icon: <BookOpenText className="h-4 w-4" />,
      },
      {
        name: "Short > $1B MC",
        description:
          "Select an asset over $1B market cap and argue a short thesis.",
        icon: <BookOpenText className="h-4 w-4" />,
      },
    ],
    prizes: [
      {
        label: "Track Winner — Long < $250M",
        amount: "$2,500",
        description: "+ 1 Ledger",
      },
      {
        label: "Track Winner — Long > $250M",
        amount: "$2,500",
        description: "+ 1 Ledger",
      },
      {
        label: "Track Winner — Short > $1B",
        amount: "$2,500",
        description: "+ 1 Ledger",
      },
      {
        label: "Top Team Across All Tracks",
        amount: "$2,500",
        description: "+ 1 Ledger per team member",
      },
      { label: "Bounty: Best Use of Artemis Data", amount: "$2,500" },
    ],
    judging: [
      "Round 1: Written report judged on thesis validity, thoroughness, and clarity (top 3 per track advance).",
      "Round 2: In-person pitch at MBC on Dec 6 (5-min pitch + 5-min judge Q&A). Must match written thesis.",
    ],
    timeline: [
      { label: "Sign-Up Opens", datetime: "Nov 9, 2025" },
      {
        label: "Competition Start / FT Kick-off Call",
        datetime: "Nov 13, 2025",
      },
      {
        label: "Messari + Artemis Demo Call(s)",
        datetime: "Nov 13–17, 2025",
        note: "TBA",
      },
      { label: "Written Report Deadline", datetime: "Nov 23, 2025 — 11:59 PM" },
      { label: "Judging (Written Reports)", datetime: "Nov 24 – Dec 1, 2025" },
      { label: "Finalists Notified", datetime: "Dec 1, 2025" },
      {
        label: "Live Pitch @ MBC",
        datetime: "Dec 6, 2025",
        note: "10 minutes total: 5-min pitch + 5-min Q&A",
      },
    ],
    eligibility: [
      "Teams of 1–4 students (3 recommended).",
      "Only MBC attendees can participate.",
      "Each university may submit multiple teams.",
    ],
    rules: [
      "Written report (3–5 pages; exclude title page, graphs/tables, references).",
      "Report structure: Title page; Executive summary (0.5–1p); Project overview (value prop, product, team, market, traction, token, catalysts, risks); Investment proposal (long/short, horizon, price target); Conclusion; References.",
      "Submit by Nov 23 via Google Form (shared to MBC Telegram).",
      "Final pitch must match the written thesis; create a slide deck for Dec 6.",
    ],
    faqs: [
      { q: "Team size?", a: "1–4 students; one report per team." },
      { q: "Who can compete?", a: "MBC attendees only." },
      {
        q: "What tools are recommended?",
        a: "Artemis toolkit; Messari & Artemis demo calls run Nov 13–17.",
      },
    ],
  },
];

// ---------------------------
// Small UI atoms
// ---------------------------

const SectionHeader: React.FC<{
  kicker?: string;
  title: string;
  subtitle?: string;
}> = ({ kicker, title, subtitle }) => (
  <div className="flex flex-col mb-8 md:mb-10">
    {kicker && (
      <span className="uppercase tracking-widest text-[11px] font-bold text-foreground/60">
        {kicker}
      </span>
    )}
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1">
      {title}
    </h1>
    {subtitle && (
      <p className="text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>
    )}
  </div>
);

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

// ---------------------------
//
// Main Page
//
// ---------------------------

export default function ProgramsPage() {
  return (
    <section className="w-full py-10 md:py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* MINIMAL HERO */}
        <SectionHeader
          kicker="MBC 2025"
          title="Programs"
          subtitle="Hands-on sprints that move you from watching to doing — whether you’re building at the Hackathon or publishing a thesis for the Franklin Templeton Research Competition."
        />

        <Separator className="my-8" />

        {/* PROGRAMS TABS (immediately after hero) */}
        <Tabs defaultValue={PROGRAMS[0].id} className="w-full">
          <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
            {PROGRAMS.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="rounded-full border px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                <span className="mr-2">{p.emoji}</span> {p.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {PROGRAMS.map((p) => (
            <TabsContent key={p.id} value={p.id} className="focus:outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Left: Overview */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="rounded-2xl border-foreground/10">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {p.emoji} {p.headline}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70 leading-relaxed">
                        {p.blurb}
                      </p>

                      {p.tracks && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {p.tracks.map((t, i) => (
                            <div
                              key={i}
                              className="rounded-xl border border-foreground/10 p-4"
                            >
                              <div className="flex items-center gap-2 font-semibold">
                                {t.icon}
                                {t.name}
                              </div>
                              <p className="text-sm text-foreground/60 mt-1">
                                {t.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {p.prizes && (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5" /> Prizes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="divide-y divide-foreground/10">
                          {p.prizes.map((pr, i) => (
                            <PrizeRow key={i} {...pr} />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {p.judging && (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" /> Judging Criteria
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                          {p.judging.map((j, i) => (
                            <li key={i}>{j}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {p.faqs && (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" /> FAQs
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {p.faqs.map((f, i) => (
                            <AccordionItem key={i} value={`faq-${i}`}>
                              <AccordionTrigger className="text-left">
                                {f.q}
                              </AccordionTrigger>
                              <AccordionContent className="text-foreground/70">
                                {f.a}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right: Sidebar */}
                <aside className="space-y-8">
                  {p.stats?.length ? (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" /> At a Glance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-3">
                        {p.stats.map((s, i) => (
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
                  ) : null}

                  {p.timeline && (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5" /> Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Timeline items={p.timeline} />
                      </CardContent>
                    </Card>
                  )}

                  {p.eligibility?.length || p.rules?.length ? (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5" /> Eligibility &
                          Rules
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {p.eligibility?.length ? (
                          <div>
                            <div className="text-sm font-semibold mb-2">
                              Eligibility
                            </div>
                            <ul className="list-disc pl-5 text-sm text-foreground/70 space-y-1">
                              {p.eligibility.map((e, i) => (
                                <li key={i}>{e}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {p.rules?.length ? (
                          <div>
                            <div className="text-sm font-semibold mb-2">
                              Rules
                            </div>
                            <ul className="list-disc pl-5 text-sm text-foreground/70 space-y-1">
                              {p.rules.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  ) : null}

                  {p.cta?.length ? (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" /> Get Involved
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3">
                        {p.cta.map((c, i) => (
                          <Button
                            asChild
                            key={i}
                            variant={i === 0 ? "default" : "secondary"}
                          >
                            <Link href={c.href}>{c.label}</Link>
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                  ) : null}
                </aside>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* FOOTER CTA */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-foreground/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircuitBoard className="h-5 w-5" /> Build at the Hackathon
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <p className="text-foreground/70">
                Pick Solana or Base, ship a working demo, and present live if
                you make finals.
              </p>
              <Button asChild>
                <Link href="https://docs.google.com/document/d/1Cc2vOxhOZMjJwDFm865w_u5Dax9q9Ay4fIWhNOsaYhw/edit?usp=sharing">
                  Read Guide
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-foreground/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenText className="h-5 w-5" /> Enter the FT Research
                Competition
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <p className="text-foreground/70">
                Submit a 3–5 page thesis by Nov 23, then pitch live at MBC on
                Dec 6 if selected.
              </p>
              <div className="flex gap-2">
                <Button asChild variant="secondary">
                  <Link href="https://docs.google.com/document/d/1Sf026qP_UGUSTcpXpBj2GfskQ-gq_aXTwqYN0KQasIs/edit?usp=sharing">
                    Read Memo
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="https://docs.google.com/forms/d/e/1FAIpQLScXTkcs2neukQp7u_1bMJanZ_lbH7-pPd215JLEZSgQDcroCA/viewform">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
 * MBC Programs Page — simplified & aligned to Hackathon Guide (Oct 7, 2025)
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
  submissionCta?: { label: string; href: string };
};

// ---------------------------
// Content (synced to Hackathon Guide 10/07/2025)
// ---------------------------

const PROGRAMS: Program[] = [
  {
    id: "hackathon",
    name: "Hackathon",
    slug: "hackathon",
    emoji: "💻",
    headline: "MBC 2025 Hackathon",
    blurb:
      "Build something amazing on Solana or Base (EVM) and competed for 10s of thousands of dollars in prizes! Plus optional ecosystem bounties. Submit by Dec 5 (11:59 PM ET). Top 10 teams demo live on Dec 6.",
    cta: [
      {
        label: "Read Hackathon Guide",
        href: "https://docs.google.com/document/d/1Cc2vOxhOZMjJwDFm865w_u5Dax9q9Ay4fIWhNOsaYhw/edit?usp=sharing",
      },
    ],
    stats: [
      { label: "Tracks", value: "2 (Solana, Base)" },
      { label: "Finalists", value: "Top 10 (5 per track)" },
      { label: "Submit By", value: "Dec 5, 11:59 PM ET" },
      { label: "Finals", value: "Dec 6 (5 min + 2 min Q&A)" },
    ],
    tracks: [
      {
        name: "Solana",
        description:
          "Deploy to devnet or mainnet and use at least one Solana tool (Anchor, Seahorse, Web3.js/Kit/Gill, SPL/Token Extensions, Metaplex, Jupiter, Solend, or Solana AgentKit/x402).",
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
      "Solana — Innovation (30%), Impact (30%), Technical (20%), Design (15%), Presentation (15%).",
      "Base — Onchain Magic (30%), Delight (25%), Utility (20%), Technical (15%), Cultural Resonance (10%).",
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
      "Submit: title/team, ≤250-word description, ≤3-min demo video, public GitHub, technical summary, and contract address (if applicable).",
      "Include a working demo (web, mobile, frame, or CLI).",
      "AI tools allowed. You retain all IP.",
      "Follow code of conduct and venue instructions.",
    ],
    faqs: [
      { q: "Pre-existing project?", a: "No. Build during the hackathon." },
      { q: "Team required?", a: "No. Solo builders are welcome." },
      { q: "AI usage?", a: "Yes, encouraged." },
      { q: "IP ownership?", a: "You own your code and IP." },
    ],
  },
  {
    id: "research-competition",
    name: "FT Pitch Competition",
    slug: "research-competition",
    emoji: "📈",
    headline: "Franklin Templeton Pitch Competition",
    blurb:
      "Work individually or in a team to submit a concise research thesis using the Messari and Artemis toolkit, then pitch in person at MBC. Sponsored by Franklin Templeton!",
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
    submissionCta: {
      label: "Submit Research Competition Project",
      href: "https://docs.google.com/forms/d/e/1FAIpQLScyMXni3mb6qA9XVkvbxTAwJwWN2gDAAzGfmbwGR7w4p7_8QQ/viewform?usp=header",
    },
    stats: [
      { label: "Tracks", value: "3" },
      { label: "Report", value: "3–5 pages" },
      { label: "Finals Pitch", value: "10 min (5 + 5)" },
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
        label: "Top Team (All Tracks)",
        amount: "$2,500",
        description: "+ 1 Ledger per team member",
      },
      { label: "Bounty: Best Use of Artemis Data", amount: "$2,500" },
    ],
    judging: [
      "Round 1 (Written): thesis validity, depth, and clarity. Top 3 per track advance.",
      "Round 2 (Live): 5-min pitch + 5-min judge Q&A. Pitch must match the written thesis.",
    ],
    timeline: [
      { label: "Sign-Up Opens", datetime: "Nov 9, 2025" },
      { label: "Start / FT Kick-off Call", datetime: "Nov 13, 2025" },
      {
        label: "Messari + Artemis Demo Calls",
        datetime: "Nov 13–17, 2025",
        note: "TBA",
      },
      { label: "Written Report Deadline", datetime: "Nov 23, 2025 — 11:59 PM" },
      { label: "Judging (Written Reports)", datetime: "Nov 24 – Dec 1, 2025" },
      { label: "Finalists Notified", datetime: "Dec 1, 2025" },
      {
        label: "Live Pitch @ MBC",
        datetime: "Dec 6, 2025",
        note: "10 minutes total",
      },
    ],
    eligibility: [
      "Teams of 1–4 students (3 recommended).",
      "Only MBC attendees can participate.",
      "Multiple teams per university allowed.",
    ],
    rules: [
      "Report length: 3–5 pages (exclude title page, figures/tables, references).",
      "Suggested structure: title page; executive summary (0.5–1p); project overview; investment proposal (long/short, horizon, target); conclusion; references.",
      "Submit via Google Form by Nov 23 (link in memo / MBC Telegram).",
      "Final pitch must match the written thesis; bring a slide deck.",
    ],
    faqs: [
      { q: "Team size?", a: "1–4 students; one report per team." },
      { q: "Eligibility?", a: "MBC attendees only." },
      {
        q: "Tools?",
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
// Main Page
// ---------------------------

export default function ProgramsPage() {
  const LUMA_URL = "https://luma.com/college.xyz?k=c"; // sessions: info sessions, office hours, etc.

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const DEFAULT_TAB = PROGRAMS[0].id;
  const allTabIds = [...PROGRAMS.map((p) => p.id), "sessions"];

  const programFromUrl = searchParams.get("program");
  const initialTab =
    programFromUrl && allTabIds.includes(programFromUrl)
      ? programFromUrl
      : DEFAULT_TAB;

  const [currentTab, setCurrentTab] = React.useState(initialTab);

  React.useEffect(() => {
    if (programFromUrl && allTabIds.includes(programFromUrl)) {
      setCurrentTab(programFromUrl);
    }
  }, [programFromUrl]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("program", value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <section className="w-full pt-24 md:pt-28 pb-10 md:pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* MINIMAL HERO */}
        <SectionHeader
          kicker="MBC 2025"
          title="Programs"
          subtitle="From the Hackathon to the Researchathon, The MBC 2025 programs can help you turn your ideas into impact. Real prizes, recognition, and a fast track to jobs in crypto, tech, and finance."
        />

        <Separator className="my-8" />

        {/* PROGRAMS TABS */}
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* SCROLL WRAPPER prevents page stretch */}
          <div className="relative mx-1 md:mx-0">
            <div className="overflow-x-auto overscroll-x-contain px-5 md:px-0 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-w-full">
              {/* TabsList lives inside fixed-width scroller */}
              <TabsList className="inline-flex min-w-max gap-2 p-1 rounded-xl border border-foreground/10 shadow-sm bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                {PROGRAMS.map((p) => (
                  <TabsTrigger
                    key={p.id}
                    value={p.id}
                    className="shrink-0 snap-start rounded-full border px-4 py-2 transition shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 bg-background/60 hover:bg-foreground/5 ring-1 ring-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:ring-foreground/20 data-[state=active]:shadow-md"
                  >
                    <span className="mr-2">{p.emoji}</span>
                    {p.name}
                  </TabsTrigger>
                ))}

                {/* Sessions tab (Luma) */}
                <TabsTrigger
                  value="sessions"
                  className="shrink-0 snap-start rounded-full border px-4 py-2 transition shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 bg-background/60 hover:bg-foreground/5 ring-1 ring-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:ring-foreground/20 data-[state=active]:shadow-md"
                >
                  <span className="mr-2">🗓️</span>
                  Sessions
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Program panes */}
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
                                {t.icon} {t.name}
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
                          <GraduationCap className="h-5 w-5" /> Judging
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

                  {(p.eligibility?.length || p.rules?.length) && (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5" /> Eligibility &
                          Rules
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {!!p.eligibility?.length && (
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
                        )}
                        {!!p.rules?.length && (
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
                        )}
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

                  {/* Sessions link card */}
                  <Card className="rounded-2xl border-foreground/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" /> Info Sessions &
                        Office Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      <p className="text-sm text-foreground/70">
                        Join prep workshops, info sessions, and office hours
                        throughout the week.
                      </p>
                      <Button asChild>
                        <Link
                          href={LUMA_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Sessions Calendar
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Get Involved (with highlighted submission button if present) */}
                  {!!p.cta?.length && (
                    <Card className="rounded-2xl border-foreground/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" /> Get Involved
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3">
                        {p.submissionCta && (
                          <>
                            <Button
                              asChild
                              size="lg"
                              className="w-full font-semibold shadow-md bg-maize text-black hover:bg-maize/90"
                            >
                              <Link
                                href={p.submissionCta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {p.submissionCta.label}
                              </Link>
                            </Button>
                            <p className="text-xs text-foreground/60 text-center">
                              Submit your final report before the deadline.
                            </p>
                            <Separator className="my-2" />
                          </>
                        )}

                        {p.cta.map((c, i) => (
                          <Button
                            asChild
                            key={i}
                            variant={
                              p.submissionCta
                                ? "secondary"
                                : i === 0
                                ? "default"
                                : "secondary"
                            }
                          >
                            <Link
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {c.label}
                            </Link>
                          </Button>
                        ))}

                        {!p.submissionCta && (
                          <Button
                            disabled
                            className="opacity-60 cursor-not-allowed"
                            title="Submission link coming soon"
                          >
                            Submit (Coming Soon)
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </aside>
              </div>
            </TabsContent>
          ))}

          {/* Sessions pane (Luma embed) */}
          <TabsContent value="sessions" className="focus:outline-none">
            <div className="mt-8 space-y-6">
              <Card className="rounded-2xl border-foreground/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    🗓️ Sessions Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Direct link fallback */}
                  <div className="mb-4">
                    <Button asChild>
                      <Link
                        href={LUMA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Luma
                      </Link>
                    </Button>
                  </div>

                  {/* Responsive iframe embed */}
                  <div className="w-full rounded-xl overflow-hidden border border-foreground/10">
                    <iframe
                      src="https://luma.com/embed/calendar/cal-HBogrD0yphRdekG/events"
                      title="MBC 2025 Sessions — Luma"
                      className="w-full h-[80vh]"
                      style={{
                        border: "1px solid #bfcbda88",
                        borderRadius: "8px",
                      }}
                      frameBorder={0}
                      allowFullScreen
                      aria-hidden="false"
                      tabIndex={0}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  Clock,
  GraduationCap,
  Trophy,
  Users,
  ShieldCheck,
  BookOpenText,
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

export const ResearchCompetitionProgram: React.FC = () => {
  const stats = [
    { label: "Tracks", value: "3" },
    { label: "Report", value: "3–5 pages" },
    { label: "Finals Pitch", value: "10 min (5 + 5)" },
    { label: "Prize Pool", value: "$12,500 + Ledgers" },
  ];

  const prizes: Prize[] = [
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
  ];

  const timeline: TimelineItem[] = [
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
  ];

  const eligibility = [
    "Teams of 1–4 students (3 recommended).",
    "Only MBC attendees can participate.",
    "Multiple teams per university allowed.",
  ];

  const rules = [
    "Report length: 3–5 pages (exclude title page, appendix, references).",
    "Suggested structure: title page; executive summary (0.5–1p); project overview; investment proposal (long/short, horizon, target); conclusion; references.",
    "Submit via Google Form by Nov 23 (link in memo / MBC Telegram).",
    "Final pitch must match the written thesis; bring a slide deck.",
  ];

  const faqs = [
    { q: "Team size?", a: "1–4 students; one report per team." },
    { q: "Eligibility?", a: "MBC attendees only." },
    {
      q: "Tools?",
      a: "Artemis toolkit; Messari & Artemis demo calls run Nov 13–17.",
    },
  ];

  const cta = [
    {
      label: "Read Competition Memo",
      href: "https://docs.google.com/document/d/1Sf026qP_UGUSTcpXpBj2GfskQ-gq_aXTwqYN0KQasIs/edit?usp=sharing",
    },
    {
      label: "Sign Up",
      href: "https://docs.google.com/forms/d/e/1FAIpQLScXTkcs2neukQp7u_1bMJanZ_lbH7-pPd215JLEZSgQDcroCA/viewform",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      {/* Left: Overview */}
      <div className="lg:col-span-2 space-y-8">
        <Card className="rounded-2xl border-foreground/10">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              📈 Franklin Templeton Pitch Competition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 leading-relaxed">
              Work individually or in a team to submit a concise research thesis
              using the Messari and Artemis toolkit, then pitch in person at
              MBC. Sponsored by Franklin Templeton!
            </p>

            {/* Tracks */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-foreground/10 p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <BookOpenText className="h-4 w-4" />
                  Long &lt; $250M MC
                </div>
                <p className="text-sm text-foreground/60 mt-1">
                  Select an asset under $250M market cap and argue a long
                  thesis.
                </p>
              </div>

              <div className="rounded-xl border border-foreground/10 p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <BookOpenText className="h-4 w-4" />
                  Long &gt; $250M MC
                </div>
                <p className="text-sm text-foreground/60 mt-1">
                  Select an asset over $250M market cap and argue a long thesis.
                </p>
              </div>

              <div className="rounded-xl border border-foreground/10 p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <BookOpenText className="h-4 w-4" />
                  Short &gt; $1B MC
                </div>
                <p className="text-sm text-foreground/60 mt-1">
                  Select an asset over $1B market cap and argue a short thesis.
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
                Round 1 (Written): thesis validity, depth, and clarity. Top 3
                per track advance.
              </li>
              <li>
                Round 2 (Live): 5-min pitch + 5-min judge Q&amp;A. Pitch must
                match the written thesis.
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
            {/* Other CTAs */}
            {cta.map((c, i) => {
              const isSignUp = c.label === "Sign Up";

              return isSignUp ? (
                <Button
                  key={i}
                  disabled
                  variant="secondary"
                  className="opacity-60 cursor-not-allowed"
                  title="Sign-ups closed"
                >
                  {c.label}
                </Button>
              ) : (
                <Button asChild key={i}>
                  <Link href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.label}
                  </Link>
                </Button>
              );
            })}

            <p className="text-xs text-foreground/50 text-center">
              Sign-up closed - please submit again next year.
            </p>
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

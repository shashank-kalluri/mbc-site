"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import { Polaroid, Sticker, Ticker } from "@/components/Scrapbook";
import {
  ArrowUpRight,
  FileText,
  Send,
  CalendarDays,
  Bot,
  Layers,
  Smartphone,
  Plus,
} from "lucide-react";

/** Full rules, track requirements, and resources live in the guide; this page
 *  only gives the shape of the event and points there. */
const GUIDE_URL =
  "https://docs.google.com/document/d/1QaySCo7u3VxMVNdk3C5Ab3ewc2E46AuLntti-Uzx5EY/edit?usp=sharing";
const SCHEDULE_URL =
  "https://docs.google.com/document/d/1eI8S0gBu6xI36DFqgqGZlO1qX6YYzFTEXBx9L5ve_zA/edit?usp=sharing";
const DEVPOST_URL = "https://ubc-hackathon-2026.devpost.com/";
const TELEGRAM_URL = "https://t.me/+Q0hy2P7nbIk2YWIx";

const LOGO_BASE =
  "https://xshoggmlvwtjesmqjrmu.supabase.co/storage/v1/object/public/images/partnership-logos";

const TRACKS: {
  Icon: typeof Bot;
  title: string;
  body: string;
  req: string;
  art: TrackArtKind;
  card: string;
  muted: string;
  chip: string;
  tilt: number;
}[] = [
  {
    Icon: Bot,
    title: "Agentic Payments & AI",
    body: "Give AI agents wallets, budgets, and guardrails so they can pay for APIs, data, and compute.",
    req: "Any chain",
    art: "agent",
    card: "bg-[#1A2A36] text-white",
    muted: "text-white/60",
    chip: "bg-white/10 text-white/80",
    tilt: 1.5,
  },
  {
    Icon: Layers,
    title: "DeFi & Onchain Apps",
    body: "New financial primitives (exchanges, lending, yield, payments) that compose with what already exists.",
    req: "Any chain",
    art: "defi",
    card: "bg-white text-[#293C4B]",
    muted: "text-[#5A6B78]",
    chip: "bg-[#F4F3EF] text-[#293C4B]",
    tilt: -1,
  },
  {
    Icon: Smartphone,
    title: "Consumer Apps",
    body: "Payments, social, gaming, and creator tools where the crypto is invisible and the app just works.",
    req: "Working frontend",
    art: "consumer",
    card: "bg-[#9CADB7] text-[#1A2A36]",
    muted: "text-[#1A2A36]/70",
    chip: "bg-white/40 text-[#1A2A36]",
    tilt: 1,
  },
];

/** The three headline sponsors, shown in the hero. `hero` evens out the
 *  logos' visual weight. */
const SPONSORS = [
  {
    name: "Solana Foundation",
    logo: `${LOGO_BASE}/solana.png`,
    w: 844,
    h: 144,
    hero: 30,
  },
  {
    name: "Circle",
    logo: `${LOGO_BASE}/circle.png`,
    w: 934,
    h: 240,
    hero: 26,
  },
  {
    name: "Gemini",
    logo: `${LOGO_BASE}/gemini.png`,
    w: 797,
    h: 173,
    hero: 22,
  },
];

const TICKER = [
  "Agentic payments",
  "DeFi",
  "Consumer apps",
  "$22,000+ in prizes",
  "Solana",
  "Circle",
  "Gemini",
  "ElevenLabs",
  "QuickNode",
  "Grok Bot",
  "Finals at UT Austin",
];

/** Official UBC 2026 Hackathon Winner. Display order is 2nd, 1st, 3rd so first
 *  place stands in the middle. Bar heights show rank, not payout, so the 3rd
 *  place bar stays tall enough for its label. */
const PODIUM = [
  { place: "2nd", amount: "$1,000", h: "h-[62.5%]", bg: "bg-[#293C4B]", text: "text-white" },
  { place: "1st", amount: "$2,500", h: "h-full", bg: "bg-[#EC8644]", text: "text-white" },
  { place: "3rd", amount: "$500", h: "h-[37.5%]", bg: "bg-[#9CADB7]", text: "text-[#1A2A36]" },
];

/** `label` is set beside the image, for sponsors whose logo is an icon only. */
type Logo = { src: string; w: number; h: number; height: number; label?: string };
type Prize = { name: string; prize: string; unit?: string; note: string; logo?: Logo };

/** Awarded separately in each of the three main tracks. */
const TRACK_WINNER: Prize = {
  name: "Track Winner",
  prize: "$2,000",
  unit: "per track",
  note: "Chosen by the UBC team in each track.",
};

/** Teams pick at most one of these, judged within their main track. */
const CHAIN_AWARDS: (Prize & { logo: Logo })[] = [
  {
    name: "Best use of Solana",
    logo: { src: `${LOGO_BASE}/solana.png`, w: 844, h: 144, height: 24 },
    prize: "$1,500",
    unit: "per track",
    note: "Chosen by Solana. For projects built on Solana (devnet is fine).",
  },
  {
    name: "Best use of Arc",
    logo: { src: `${LOGO_BASE}/circle.png`, w: 934, h: 240, height: 24 },
    prize: "$1,000",
    unit: "per track",
    note: "Chosen by Circle. For projects built on Arc, Circle's stablecoin-focused Layer-1 (testnet is fine).",
  },
];

/** Logos render white on the dark card. `height` evens out their visual weight. */
const BOUNTIES: Prize[] = [
  {
    name: "Gemini Prediction Markets",
    logo: { src: `${LOGO_BASE}/gemini.png`, w: 797, h: 173, height: 18 },
    prize: "$4,000",
    note: "1st $2,500 · 2nd $1,000 · 3rd $500, for projects built on Gemini's prediction market APIs.",
  },
  {
    name: "QuickNode Streams",
    logo: { src: "/sponsors/quicknode.svg", w: 87, h: 14, height: 16 },
    prize: "$500",
    note: "For projects that use QuickNode Streams as a core data source.",
  },
  {
    name: "ElevenLabs",
    logo: { src: "/sponsors/elevenlabs.svg", w: 116, h: 15, height: 14 },
    prize: "3 months",
    unit: "of Scale",
    note: "ElevenLabs Scale for each member, for projects where voice or audio is central.",
  },
  {
    name: "Grok Bot",
    logo: { src: "/sponsors/grok-bot.svg", w: 150, h: 150, height: 19, label: "Grok Bot" },
    prize: "Keyboard",
    unit: "per member",
    note: "A mechanical keyboard per member plus swag, for projects where Grok Bot does real work.",
  },
];

/** Participation perks. `limited` ones are capped at 300 participants. */
const PERKS: { logo: Logo; name: string; text: string; limited?: boolean }[] = [
  {
    name: "ElevenLabs",
    logo: { src: "/sponsors/elevenlabs.svg", w: 116, h: 15, height: 13 },
    text: "1 month of Creator",
  },
  {
    name: "QuickNode",
    logo: { src: "/sponsors/quicknode.svg", w: 87, h: 14, height: 15 },
    text: "A $49/mo plan",
    limited: true,
  },
  {
    name: "X",
    logo: { src: "/sponsors/x.svg", w: 24, h: 24, height: 17 },
    text: "X Premium (Cursor, Grok, X, and more)",
    limited: true,
  },
];

/** One project stacking prizes. `bar` is each prize's accent color. */
const STACK_EXAMPLE: { label: string; amount: number; bar: string }[] = [
  { label: "1st overall", amount: 2500, bar: "#EC8644" },
  { label: "DeFi Track Winner", amount: 2000, bar: "#293C4B" },
  { label: "Best use of Solana", amount: 1500, bar: "linear-gradient(180deg, #9945FF, #14F195)" },
  { label: "Gemini bounty, 1st", amount: 2500, bar: "#00DCFA" },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const WEEK = [
  { date: "Nov 8", title: "Kickoff call", note: "6 PM CST · tracks and Q&A with sponsors" },
  { date: "Nov 13", title: "Hacking starts", note: "12 PM CST · build from anywhere" },
  { date: "Nov 16–19", title: "Workshops", note: "Nightly office hours with sponsor engineers", link: true },
  { date: "Nov 20", title: "Submit", note: "12 PM CST on Devpost · finalists told by midnight" },
  { date: "Nov 21", title: "Finals at UBC", note: "Up to 13 teams pitch live in Austin" },
];

/** Photos from the MBC 2025 hackathon. */
const PHOTOS = {
  headsDown: { src: "/photos/hackathon/heads-down.jpg", caption: "Heads down" },
  pitch: { src: "/photos/hackathon/pitch.jpg", caption: "Pitch time" },
};

const HACKATHON_FAQ = [
  {
    question: "Can I work on a project I've already started?",
    answer: "No. Projects need to be substantially built during the hackathon week.",
  },
  {
    question: "Can I submit to more than one track?",
    answer:
      "Each project enters exactly one main track. After that, you can submit the same project to as many bounties as you like, as long as it meets each bounty's requirements. The one exception is the chain awards: teams may compete for Best use of Solana or Best use of Arc, not both.",
  },
  {
    question: "Do I need a team?",
    answer: "No. Teams of 1–4 are recommended, and solo builders are welcome.",
  },
  {
    question: "What do I submit?",
    answer:
      "Your project name, description, and team on Devpost, plus a public GitHub repo, a working demo or deployed app, a 2–3 minute demo video, and a README with your technical docs. Some tracks ask for extras, like a contract address.",
    link: { href: GUIDE_URL, label: "Track requirements in the guide" },
  },
  {
    question: "Do I need to be in Austin?",
    answer:
      "You can build from anywhere. Finalists pitch in person on Nov 21, and you have to be at the UBC closing ceremony to win any prize, including bounties.",
  },
  {
    question: "How are projects judged?",
    answer:
      "Projects are judged on technical execution, product and UX, innovation, impact and potential, and demo. Up to 13 teams pitch live for 5 minutes, plus 2 minutes of Q&A: 3 from each main track (the top contenders for Track Winner, Best use of Solana, and Best use of Arc), the top 3 overall contenders, and the 1st-place Gemini team.",
  },
  {
    question: "Can I use AI tools? Who owns my project?",
    answer: "Yes, AI tools are encouraged. You keep all rights to your code and IP.",
  },
  {
    question: "Where can I get help?",
    answer:
      "Ask in the Telegram, join the kickoff call on Nov 8, or drop into nightly office hours with sponsor engineers Nov 16–19.",
    link: { href: SCHEDULE_URL, label: "Workshop & office hours schedule" },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Reveal({
  children,
  i = 0,
  className,
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
}) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="block w-6 h-[2px] bg-[#EC8644]" />
      <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
        {children}
      </span>
    </div>
  );
}

type TrackArtKind = "agent" | "defi" | "consumer";

/** A small vignette per track, so each card shows what it's about. */
function TrackArt({ kind }: { kind: TrackArtKind }) {
  const reduce = useReducedMotion();
  const line = (i: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 4 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: 0.3 + i * 0.35, duration: 0.3 },
  });

  if (kind === "agent") {
    return (
      <div className="h-full rounded-2xl bg-black/30 border border-white/10 p-4 font-mono text-[11.5px] leading-[1.7]">
        <div className="flex gap-1.5 mb-2.5" aria-hidden>
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        <motion.p {...line(0)}>
          <span className="text-white/40">$</span> agent.fetch(&quot;/forecast&quot;)
        </motion.p>
        <motion.p {...line(1)} className="text-white/45">
          ← 402 payment required
        </motion.p>
        <motion.p {...line(2)} className="text-[#EC8644]">
          ✓ paid 0.01 USDC
        </motion.p>
        <motion.p {...line(3)} className="text-white/80">
          ← 200 OK
          <motion.span
            className="inline-block w-[7px] h-[13px] bg-white/70 ml-1.5 align-middle"
            animate={reduce ? undefined : { opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.p>
      </div>
    );
  }

  if (kind === "defi") {
    // Blocks step down and to the right, each one building on the last.
    const blocks = [
      { label: "Swap", dot: "bg-[#EC8644]", indent: "ml-0" },
      { label: "Lend", dot: "bg-[#293C4B]", indent: "ml-[18%]" },
      { label: "Yield", dot: "bg-[#9CADB7]", indent: "ml-[36%]" },
    ];
    return (
      <div className="h-full rounded-2xl bg-[#F4F3EF] overflow-hidden flex flex-col justify-center gap-2.5 px-4">
        {blocks.map((b, i) => (
          <motion.span
            key={b.label}
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.25, type: "spring", stiffness: 260, damping: 18 }}
            className={`self-start ${b.indent} inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-[13px] font-semibold shadow-[0_8px_18px_-10px_rgba(26,42,54,0.45)]`}
          >
            <span className={`w-2.5 h-2.5 rounded-[4px] ${b.dot}`} />
            {b.label}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full rounded-2xl bg-white/35 overflow-hidden flex items-end justify-center">
      {/* A phone peeking up from the bottom of the panel */}
      <div className="relative w-[7.5rem] h-[88%] rounded-t-[22px] border-[3px] border-b-0 border-[#1A2A36] bg-white px-3 pt-3">
        <span className="block mx-auto w-8 h-1 rounded-full bg-[#1A2A36]/20" />
        <div className="flex items-center gap-2 mt-3">
          <span className="w-6 h-6 rounded-full bg-[#EC8644] text-white text-[11px] font-bold flex items-center justify-center">
            M
          </span>
          <span className="text-[11px] font-semibold">@maya</span>
        </div>
        <p className="font-[var(--font-zuume)] font-black text-2xl tracking-tight mt-1.5">$5 🍕</p>
        <span className="mt-2 block rounded-full bg-[#1A2A36] text-white text-[11px] font-semibold text-center py-1.5">
          Pay
        </span>
      </div>
      <motion.span
        className="absolute right-5 top-4 text-xl"
        animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        🔥
      </motion.span>
      <motion.span
        className="absolute left-5 top-9 text-lg"
        animate={reduce ? undefined : { y: [0, -5, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        aria-hidden
      >
        ❤️
      </motion.span>
    </div>
  );
}

function PrizeRow({ p, dark = false }: { p: Prize; dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 ${
        dark ? "bg-white/[0.06] border border-white/10" : "bg-[#F4F3EF]"
      }`}
    >
      <div>
        {p.logo ? (
          <span className="flex items-center gap-2 mb-2">
            <Image
              src={p.logo.src}
              alt={p.logo.label ? "" : p.name}
              width={p.logo.w}
              height={p.logo.h}
              style={{ height: p.logo.height }}
              className={`w-auto ${dark ? "brightness-0 invert" : ""}`}
              unoptimized
            />
            {p.logo.label && (
              <span className={`text-[17px] font-medium tracking-tight leading-none ${dark ? "text-white" : "text-[#293C4B]"}`}>
                {p.logo.label}
              </span>
            )}
          </span>
        ) : (
          <p className={`font-semibold ${dark ? "text-white" : "text-[#293C4B]"}`}>{p.name}</p>
        )}
        <p className={`text-[13px] leading-snug mt-0.5 ${dark ? "text-white/50" : "text-[#5A6B78]"}`}>
          {p.note}
        </p>
      </div>
      <span className="shrink-0 text-right">
        <span
          className={`block font-[var(--font-zuume)] font-black text-[#EC8644] tracking-tight ${
            p.prize.startsWith("$") ? "text-2xl" : "text-lg"
          } sm:text-3xl`}
        >
          {p.prize}
        </span>
        {p.unit && (
          <span
            className={`block text-[10px] font-semibold tracking-[0.16em] uppercase ${
              dark ? "text-white/50" : "text-[#9CADB7]"
            }`}
          >
            {p.unit}
          </span>
        )}
      </span>
    </div>
  );
}

/** Divider with a plus sign, showing that the prizes on either side stack. */
function StackPlus() {
  return (
    <div className="flex items-center gap-3 my-5" aria-hidden>
      <span className="flex-1 h-px bg-[#293C4B]/10" />
      <span className="w-7 h-7 rounded-full bg-[#EC8644] text-white flex items-center justify-center">
        <Plus size={16} strokeWidth={3} />
      </span>
      <span className="flex-1 h-px bg-[#293C4B]/10" />
    </div>
  );
}

function CtaButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={DEVPOST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25"
      >
        Register on Devpost <ArrowUpRight size={17} />
      </a>
      <a
        href={GUIDE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-white text-[#293C4B] text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-black/20"
      >
        <FileText size={17} /> Read the guide
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/20 hover:border-white/60 transition-colors"
      >
        <Send size={16} /> Join the Telegram
      </a>
    </div>
  );
}

export default function HackathonProgram() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-[#F4F3EF] overflow-x-hidden">

      {/* ---------- Hero ---------- */}
      <section className="relative bg-[#1A2A36] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/atrium.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,42,54,0.7) 0%, rgba(26,42,54,0.8) 45%, rgba(26,42,54,0.96) 85%, #1A2A36 100%)",
            }}
          />
          {/* Faint dot grid, a nod to graph paper */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative z-20 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-32 sm:pt-44 sm:pb-36 lg:pb-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-[2px] bg-[#EC8644]" />
                  <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                    One week. Ship it.
                  </span>
                </div>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.88] max-w-4xl"
                style={{ fontSize: "clamp(52px, 9vw, 132px)" }}
              >
                UBC 2026
                <br />
                <span className="text-[#EC8644]">Hackathon</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mt-7"
              >
                Research, build, and pitch your wildest crypto idea to a panel of industry
                leaders. Seasoned dev or first hackathon, there&rsquo;s a place for you here.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mt-8">
                <CtaButtons />
              </motion.div>

              <motion.p
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-white/35 text-[11px] sm:text-xs tracking-[0.2em] uppercase mt-9"
              >
                Online Nov 13–20 · Finals Nov 21 at UT Austin
              </motion.p>

              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-8"
              >
                <p className="text-white/50 text-[11px] font-medium tracking-[0.2em] uppercase mb-4">
                  Presented by
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10">
                  {SPONSORS.map((sp) => (
                    <Image
                      key={sp.name}
                      src={sp.logo}
                      alt={sp.name}
                      width={sp.w}
                      height={sp.h}
                      // Logos shrink on phones so all three fit on one row
                      style={{ "--logo-h": `${sp.hero}px` } as React.CSSProperties}
                      className="w-auto h-[calc(var(--logo-h)*0.72)] sm:h-[var(--logo-h)] brightness-0 invert"
                      unoptimized
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140, damping: 12 }}
              className="absolute right-5 bottom-1 sm:right-10 sm:bottom-0 lg:static lg:mb-6"
            >
              <Sticker rim="ONE WEEK ✦ THREE TRACKS ✦ BIG PRIZES ✦ " value="$22,000+" label="in prizes" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Ticker ---------- */}
      <Ticker items={TICKER} className="z-10 -mt-7" />

      {/* ---------- Tracks ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>The tracks</Eyebrow>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <h2
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}
              >
                Pick one. Stack bounties.
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-relaxed max-w-sm">
                Every project enters exactly one main track. Bounties are open to any track
                that meets their requirements.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRACKS.map((t, i) => (
              <Reveal key={t.title} i={i} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -8, rotate: t.tilt }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`h-full rounded-3xl p-7 flex flex-col ${t.card}`}
                >
                  <div className="h-36 mb-6">
                    <TrackArt kind={t.art} />
                  </div>
                  <div className={`flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase mb-2.5 ${t.muted}`}>
                    <t.Icon size={14} strokeWidth={2.25} />
                    Track {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-[var(--font-zuume)] font-black text-2xl sm:text-[28px] tracking-tight leading-[0.95]">
                    {t.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mt-3 ${t.muted}`}>{t.body}</p>
                  <div className="mt-auto pt-6">
                    <span className={`inline-block text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full ${t.chip}`}>
                      {t.req}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Prizes ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Prizes</Eyebrow>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <h2
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}
              >
                How prizes work
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-relaxed max-w-lg">
                Enter one main track, then add one chain award and any bounties. Every team is
                also in the running for Official Winner.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-4">
            <Reveal className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 sm:p-10 flex flex-col">
                <Eyebrow>Every team</Eyebrow>
                <h3
                  className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                  style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
                >
                  Main prizes
                </h3>

                <div className="mt-8">
                  <p className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl tracking-tight leading-none">
                    Track prizes
                  </p>
                  <p className="text-[#5A6B78] text-[13px] leading-snug mt-1.5 mb-4">
                    Awarded separately in each of the three main tracks.
                  </p>
                  <PrizeRow p={TRACK_WINNER} />
                  <StackPlus />
                  <div>
                    <p className="text-[#9CADB7] text-[11px] font-semibold tracking-[0.16em] uppercase mb-3">
                      Chain award · optional, pick one
                    </p>
                    {/* Tiles share a height so the "or" badge sits in the gap,
                        whether they're side by side or stacked */}
                    <div className="relative grid sm:grid-cols-2 auto-rows-fr gap-3">
                      {CHAIN_AWARDS.map((c) => (
                        <div
                          key={c.name}
                          className="rounded-2xl border-2 border-[#293C4B]/10 p-5 flex flex-col"
                        >
                          <div className="h-7 flex items-center">
                            <Image
                              src={c.logo.src}
                              alt={c.name.replace("Best use of ", "")}
                              width={c.logo.w}
                              height={c.logo.h}
                              style={{ height: c.logo.height }}
                              className="w-auto"
                              unoptimized
                            />
                          </div>
                          <p className="text-[#293C4B] font-semibold mt-5">{c.name}</p>
                          <p className="font-[var(--font-zuume)] font-black text-[#EC8644] tracking-tight leading-none text-4xl sm:text-5xl mt-2">
                            {c.prize}
                          </p>
                          <p className="text-[#9CADB7] text-[10px] font-semibold tracking-[0.16em] uppercase mt-1.5">
                            {c.unit}
                          </p>
                          <p className="text-[#5A6B78] text-[13px] leading-snug mt-4">{c.note}</p>
                        </div>
                      ))}
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#293C4B] text-white text-[11px] font-semibold tracking-[0.12em] uppercase flex items-center justify-center ring-4 ring-white"
                      >
                        or
                      </span>
                    </div>
                  </div>
                </div>

                <span className="block h-px bg-[#293C4B]/10 my-8" />

                <p className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl tracking-tight leading-none">
                  Official UBC 2026 Hackathon Winner
                </p>
                <p className="text-[#5A6B78] text-[13px] leading-snug mt-1.5 mb-5 max-w-md">
                  Chosen by the UBC team from every submission, across all tracks. 1st place also
                  gets 3 months of ElevenLabs Pro per member.
                </p>
                <div className="flex-1 min-h-44 sm:min-h-52 flex items-end gap-2 sm:gap-3">
                  {PODIUM.map((p, i) => (
                    <motion.div
                      key={p.place}
                      initial={{ scaleY: reduce ? 1 : 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 120, damping: 14 }}
                      style={{ originY: 1 }}
                      className={`flex-1 rounded-t-2xl ${p.h} ${p.bg} ${p.text} flex flex-col items-center justify-start pt-3 sm:pt-4`}
                    >
                      <span className="font-[var(--font-zuume)] font-black text-2xl sm:text-3xl tracking-tight leading-none">
                        {p.amount}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase mt-1 opacity-75">
                        {p.place}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal i={1} className="h-full">
              <div className="h-full bg-[#1A2A36] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(236,134,68,0.22) 0%, rgba(236,134,68,0) 70%)",
                  }}
                />
                <div className="relative">
                  <Eyebrow>Optional</Eyebrow>
                  <h3
                    className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.95]"
                    style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
                  >
                    Sponsor bounties
                  </h3>
                  <p className="text-white/50 text-[15px] leading-relaxed mt-3 max-w-md">
                    Enter as many as you qualify for. Each is judged by the sponsor and a UBC team
                    representative.
                  </p>
                  <div className="mt-8 space-y-3">
                    {BOUNTIES.map((b) => (
                      <PrizeRow key={b.name} p={b} dark />
                    ))}
                  </div>

                  <p className="text-white/40 text-[11px] font-medium tracking-[0.18em] uppercase mt-10 mb-3">
                    For every complete submission
                  </p>
                  <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-5">
                    <p className="text-white font-semibold">Participation perks</p>
                    <p className="text-white/50 text-[13px] leading-snug mt-0.5">
                      Every team with a complete, working submission gets these.
                    </p>
                    <ul className="mt-4 border-t border-white/10 divide-y divide-white/10">
                      {PERKS.map((pk) => (
                        <li key={pk.name} className="flex items-center gap-4 py-3.5">
                          <span className="w-24 sm:w-28 shrink-0 flex items-center">
                            <Image
                              src={pk.logo.src}
                              alt={pk.name}
                              width={pk.logo.w}
                              height={pk.logo.h}
                              style={{ height: pk.logo.height }}
                              className="w-auto"
                              unoptimized
                            />
                          </span>
                          <span className="text-white/80 text-sm leading-snug">
                            {pk.text}
                            {pk.limited && <span className="text-[#EC8644]">*</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-white/40 text-[12px] leading-snug mt-1">
                      <span className="text-[#EC8644]">*</span> For up to 300 participants.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-4 rounded-3xl bg-[#9CADB7] text-[#1A2A36] p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="block w-6 h-[2px] bg-[#1A2A36]/50" />
                    <span className="text-[#1A2A36]/70 text-xs font-medium tracking-[0.22em] uppercase">
                      Prize pool
                    </span>
                  </div>
                  <h3
                    className="font-[var(--font-zuume)] font-black tracking-tight leading-[0.95]"
                    style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
                  >
                    All prizes stack
                  </h3>
                  <p className="text-[#1A2A36]/70 text-[15px] leading-relaxed mt-3 max-w-xl">
                    One project can win across categories and take home several prizes.
                  </p>
                </div>
                <div className="shrink-0 lg:text-right">
                  <p
                    className="font-[var(--font-zuume)] font-black tracking-tight leading-[0.85]"
                    style={{ fontSize: "clamp(56px, 6.5vw, 96px)" }}
                  >
                    $22,000<span className="text-white">+</span>
                  </p>
                  <p className="text-[#1A2A36]/70 text-[11px] font-semibold tracking-[0.18em] uppercase mt-4">
                    In cash prizes, plus sponsor perks
                  </p>
                </div>
              </div>

              <p className="text-[#1A2A36]/80 text-[13px] leading-snug mt-8 mb-3">
                <span className="font-semibold text-[#1A2A36]">Example:</span> a DeFi prediction
                market built on Solana with Gemini&rsquo;s API could win all four of these.
              </p>
              {/* Two-up grid on phones; one row joined by + and = on desktop */}
              <div className="grid grid-cols-2 gap-2 lg:flex lg:items-stretch lg:gap-3">
                {STACK_EXAMPLE.map((e, i) => (
                  <div key={e.label} className="contents">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="hidden lg:block self-center font-[var(--font-zuume)] font-black text-white text-2xl leading-none"
                      >
                        +
                      </span>
                    )}
                    <div className="relative flex-1 overflow-hidden rounded-xl bg-white/45 pl-5 pr-4 py-3">
                      <span className="absolute left-0 inset-y-0 w-1" style={{ background: e.bar }} />
                      <p className="text-[#1A2A36]/70 text-[12px] leading-snug">{e.label}</p>
                      <p className="font-[var(--font-zuume)] font-black text-2xl tracking-tight leading-none mt-1">
                        {usd(e.amount)}
                      </p>
                    </div>
                  </div>
                ))}
                <span
                  aria-hidden
                  className="hidden lg:block self-center font-[var(--font-zuume)] font-black text-white text-2xl leading-none"
                >
                  =
                </span>
                <div className="col-span-2 flex items-center justify-between gap-3 rounded-xl bg-[#EC8644] px-4 py-3 lg:flex-col lg:items-start lg:justify-center lg:gap-0 lg:min-w-40">
                  <p className="text-white/85 text-[12px] leading-snug">One team takes home</p>
                  <p className="font-[var(--font-zuume)] font-black text-white text-2xl tracking-tight leading-none lg:mt-1">
                    {usd(STACK_EXAMPLE.reduce((sum, e) => sum + e.amount, 0))}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- The week ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
            <Reveal>
              <Eyebrow>The week</Eyebrow>
              <h2
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}
              >
                Kickoff to closing ceremony
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-relaxed max-w-md mt-4">
                Build from anywhere for a week, then bring it to Austin. Here&rsquo;s how it
                looked at MBC &rsquo;25.
              </p>
            </Reveal>
            <Reveal i={1} className="flex gap-4 sm:gap-6 w-full max-w-md lg:w-[26rem] lg:shrink-0 lg:pr-4">
              <Polaroid {...PHOTOS.headsDown} tilt={-4} className="flex-1 max-w-56" />
              <Polaroid {...PHOTOS.pitch} tilt={3} className="flex-1 max-w-56 mt-6" />
            </Reveal>
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
            {/* Connector: vertical on mobile, horizontal on desktop */}
            <span
              aria-hidden
              className="absolute left-[9px] top-2 bottom-2 border-l-2 border-dashed border-[#293C4B]/15 lg:left-2 lg:right-2 lg:top-[9px] lg:bottom-auto lg:border-l-0 lg:border-t-2"
            />
            {WEEK.map((w, i) => {
              const last = i === WEEK.length - 1;
              return (
                <motion.li
                  key={w.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="relative pl-10 lg:pl-0 lg:pt-10"
                >
                  <span
                    className={`absolute left-0 top-0 w-5 h-5 rounded-full border-[3px] ${
                      last
                        ? "bg-[#EC8644] border-[#EC8644] shadow-[0_0_0_6px_rgba(236,134,68,0.18)]"
                        : "bg-[#F4F3EF] border-[#293C4B]"
                    }`}
                  />
                  <p
                    className={`font-[var(--font-zuume)] font-black text-3xl sm:text-4xl tracking-tight leading-none ${
                      last ? "text-[#EC8644]" : "text-[#293C4B]"
                    }`}
                  >
                    {w.date}
                  </p>
                  <p className="text-[#293C4B] font-semibold mt-2">{w.title}</p>
                  <p className="text-[#5A6B78] text-sm leading-relaxed mt-1">{w.note}</p>
                  {w.link && (
                    <a
                      href={SCHEDULE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-[#EC8644] text-sm font-semibold hover:underline underline-offset-4"
                    >
                      <CalendarDays size={15} /> Full schedule
                    </a>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      <FAQ items={HACKATHON_FAQ} />

      {/* ---------- CTA ---------- */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative bg-[#1A2A36] rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 90% at 85% 15%, rgba(236,134,68,0.2) 0%, rgba(236,134,68,0) 70%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative">
                <div>
                  <Eyebrow>Ready?</Eyebrow>
                  <h2
                    className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
                    style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
                  >
                    Let&rsquo;s hack<span className="text-[#EC8644]">.</span>
                  </h2>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl mt-5">
                    Pick your track, find a team (or go solo), and start building on Nov 13.
                    Questions? Ask in the Telegram or drop into office hours.
                  </p>
                  <div className="mt-9">
                    <CtaButtons />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

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
  Landmark,
  Bot,
  Layers,
  Smartphone,
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
  Icon: typeof Landmark;
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
    Icon: Landmark,
    title: "Tokenized Equities & RWAs",
    body: "Make stocks, treasuries, and real-world assets easier to issue, trade, use, or trust onchain.",
    req: "Solana or Arc",
    art: "rwa",
    card: "bg-[#EC8644] text-white",
    muted: "text-white/75",
    chip: "bg-white/20 text-white",
    tilt: -1.5,
  },
  {
    Icon: Bot,
    title: "Agentic Payments & AI",
    body: "Give AI agents wallets, budgets, and guardrails so they can pay for APIs, data, and compute.",
    req: "Solana or Arc",
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
    req: "Solana or Arc",
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

const TICKER = [
  "Tokenized RWAs",
  "Agentic payments",
  "DeFi",
  "Consumer apps",
  "$23,500+ in prizes",
  "Solana",
  "Circle",
  "Gemini",
  "ElevenLabs",
  "Finals at UT Austin",
];

/** Display order is 2nd, 1st, 3rd so first place stands in the middle. */
const PODIUM = [
  { place: "2nd", amount: "$1,375", h: "h-24 sm:h-28", bg: "bg-[#293C4B]", text: "text-white" },
  { place: "1st", amount: "$2,000", h: "h-36 sm:h-44", bg: "bg-[#EC8644]", text: "text-white" },
  { place: "3rd", amount: "$1,000", h: "h-16 sm:h-20", bg: "bg-[#9CADB7]", text: "text-[#1A2A36]" },
];

const BOUNTIES: { name: string; prize: string; unit?: string; note: string }[] = [
  { name: "Gemini", prize: "$5,000", note: "Prediction markets · $1,000 each to 5 teams" },
  { name: "Circle", prize: "$1,000", note: "Best build with stablecoins and Circle tools" },
  { name: "ElevenLabs", prize: "~$900", unit: "in credits", note: "Per member: 3 months of ElevenLabs Scale ($299/mo) for the best voice or audio build" },
  { name: "Everyone", prize: "$50", note: "Per team that submits, plus 1 month of ElevenLabs Creator" },
];

const WEEK = [
  { date: "Nov 8", title: "Kickoff call", note: "6 PM CST · tracks and Q&A with sponsors" },
  { date: "Nov 13", title: "Hacking starts", note: "12 PM CST · build from anywhere" },
  { date: "Nov 16–19", title: "Workshops", note: "Nightly office hours with sponsor engineers", link: true },
  { date: "Nov 20", title: "Submit", note: "12 PM CST on Devpost · finalists told by midnight" },
  { date: "Nov 21", title: "Finals at UBC", note: "Top 3 per track pitch live in Austin" },
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
      "Each project enters exactly one main track. After that, you can submit the same project to as many bounties as you like, as long as it meets each bounty's requirements.",
  },
  {
    question: "Do I need a team?",
    answer: "No. Teams of 1–4 are recommended, and solo builders are welcome.",
  },
  {
    question: "What do I submit?",
    answer:
      "Your project name, description, and team on Devpost, plus a GitHub repo, a 3–5 minute video pitch, and a README with your technical docs. Some tracks ask for extras, like a contract address.",
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
      "Judges look for technical rigor, real impact, strong UX, focused execution, a clear presentation, and a path to real users. The top 3 teams in each track pitch live for 5 minutes, plus 2 minutes of Q&A.",
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

type TrackArtKind = "rwa" | "agent" | "defi" | "consumer";

const SPARKS = [
  { sym: "TSLA", d: "M0 14 L8 11 L16 12 L24 7 L32 8 L40 3" },
  { sym: "GOLD", d: "M0 12 L8 13 L16 9 L24 10 L32 5 L40 4" },
  { sym: "T-BILL", d: "M0 13 L8 12 L16 10 L24 9 L32 7 L40 5" },
];

/** A small vignette per track, so each card shows what it's about. */
function TrackArt({ kind }: { kind: TrackArtKind }) {
  const reduce = useReducedMotion();
  const line = (i: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 4 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: 0.3 + i * 0.35, duration: 0.3 },
  });

  if (kind === "rwa") {
    return (
      <div className="h-full rounded-2xl bg-white/15 p-4 flex flex-col justify-between">
        {SPARKS.map((r, i) => (
          <div key={r.sym} className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="font-mono text-[12px] font-semibold w-14">{r.sym}</span>
            <svg viewBox="0 0 40 16" preserveAspectRatio="none" className="flex-1 min-w-0 h-5" aria-hidden>
              <motion.path
                d={r.d}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <span className="text-[11px] font-semibold">▲</span>
          </div>
        ))}
        <span className="self-start text-[10px] font-semibold tracking-[0.14em] uppercase bg-white text-[#EC8644] rounded-full px-2.5 py-1">
          Now onchain
        </span>
      </div>
    );
  }

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
    const blocks = [
      { label: "Swap", dot: "bg-[#EC8644]", x: "left-4", y: "top-4" },
      { label: "Lend", dot: "bg-[#293C4B]", x: "left-[30%]", y: "top-[2.6rem]" },
      { label: "Yield", dot: "bg-[#9CADB7]", x: "left-[54%]", y: "top-[5.2rem]" },
    ];
    return (
      <div className="relative h-full rounded-2xl bg-[#F4F3EF] overflow-hidden">
        {/* Connector the blocks snap along */}
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden>
          <path d="M 18 14 L 48 32 L 78 50" fill="none" stroke="#293C4B" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        </svg>
        {blocks.map((b, i) => (
          <motion.span
            key={b.label}
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.25, type: "spring", stiffness: 260, damping: 18 }}
            className={`absolute ${b.x} ${b.y} inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-[13px] font-semibold shadow-[0_8px_18px_-10px_rgba(26,42,54,0.45)]`}
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
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140, damping: 12 }}
              className="absolute right-5 bottom-1 sm:right-10 sm:bottom-0 lg:static lg:mb-6"
            >
              <Sticker rim="ONE WEEK ✦ FOUR TRACKS ✦ BIG PRIZES ✦ " value="$23.5K" label="in prizes" />
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="grid lg:grid-cols-2 gap-4">
            <Reveal className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 sm:p-10 flex flex-col">
                <Eyebrow>Prizes</Eyebrow>
                <p
                  className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none"
                  style={{ fontSize: "clamp(52px, 6vw, 92px)" }}
                >
                  $23,500<span className="text-[#EC8644]">+</span>
                </p>
                <p className="text-[#5A6B78] text-[15px] leading-relaxed mt-3 max-w-md">
                  $17,500 across the four main tracks from Solana and Circle, plus $6,000 in
                  bounties and perks.
                </p>

                <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mt-10 mb-4">
                  Every main track pays
                </p>
                <div className="mt-auto flex items-end gap-2 sm:gap-3">
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
                <div className="flex items-center gap-6 mt-6">
                  <span className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase">
                    Backed by
                  </span>
                  <Image
                    src={`${LOGO_BASE}/solana.png`}
                    alt="Solana"
                    width={120}
                    height={18}
                    style={{ height: 16 }}
                    className="w-auto"
                    unoptimized
                  />
                  <Image
                    src={`${LOGO_BASE}/circle.png`}
                    alt="Circle"
                    width={120}
                    height={24}
                    style={{ height: 22 }}
                    className="w-auto"
                    unoptimized
                  />
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
                  <Eyebrow>Bounties &amp; perks</Eyebrow>
                  <h3
                    className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.95] mb-8"
                    style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
                  >
                    Extra ways to win
                  </h3>
                  <ul className="space-y-3">
                    {BOUNTIES.map((b) => (
                      <li
                        key={b.name}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-4 hover:bg-white/[0.1] transition-colors"
                      >
                        <div>
                          <p className="text-white font-semibold">{b.name}</p>
                          <p className="text-white/50 text-[13px] leading-snug mt-0.5">{b.note}</p>
                        </div>
                        <span className="shrink-0 text-right">
                          <span className="block font-[var(--font-zuume)] font-black text-[#EC8644] text-2xl sm:text-3xl tracking-tight">
                            {b.prize}
                          </span>
                          {b.unit && (
                            <span className="block text-white/50 text-[10px] font-semibold tracking-[0.16em] uppercase">
                              {b.unit}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
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

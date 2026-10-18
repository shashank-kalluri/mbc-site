"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";
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

const TRACKS = [
  {
    Icon: Landmark,
    title: "Tokenized Equities & RWAs",
    body: "Make stocks, treasuries, and real-world assets easier to issue, trade, use, or trust onchain.",
    req: "Solana or Arc",
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

const BOUNTIES = [
  { name: "Gemini", prize: "$5,000", note: "Prediction markets · $1,000 each to 5 teams" },
  { name: "Circle", prize: "$1,000", note: "Best build with stablecoins and Circle tools" },
  { name: "ElevenLabs", prize: "3 mo. Scale", note: "Per member, for the best voice or audio build" },
  { name: "Everyone", prize: "$50", note: "Per team that submits, plus 1 month of ElevenLabs Creator" },
];

const WEEK = [
  { date: "Nov 8", title: "Kickoff call", note: "6 PM CST · tracks and Q&A with sponsors" },
  { date: "Nov 13", title: "Hacking starts", note: "12 PM CST · build from anywhere" },
  { date: "Nov 16–19", title: "Workshops", note: "Nightly office hours with sponsor engineers", link: true },
  { date: "Nov 20", title: "Submit", note: "12 PM CST on Devpost · finalists told by midnight" },
  { date: "Nov 21", title: "Finals at UBC", note: "Top 3 per track pitch live in Austin" },
];

const POLAROIDS = [
  { src: "/photos/hackathon/heads-down.jpg", caption: "Heads down", tilt: -3 },
  { src: "/photos/hackathon/pitch.jpg", caption: "Pitch time", tilt: 2 },
  { src: "/photos/hackathon/winners.jpg", caption: "Winners on stage", tilt: -1.5 },
  { src: "/photos/hackathon/big-check.jpg", caption: "Big check energy", tilt: 3 },
];

const RULES = [
  { title: "One main track", body: "Pick exactly one, then enter as many bounties as you like." },
  { title: "Teams of 1–4", body: "Solo builders are welcome too." },
  { title: "Fresh code", body: "Build it during the hackathon, not before." },
  { title: "Repo, video, README", body: "A GitHub repo, a 3–5 minute video pitch, and docs." },
  { title: "AI is encouraged", body: "Use what helps you ship. You keep your IP." },
  { title: "Be in Austin Nov 21", body: "You have to be at the closing ceremony to win." },
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

/** Round sticker with the prize pool, its rim text slowly spinning. */
function PrizeSticker({ reduce }: { reduce: boolean | null }) {
  const r = 62;
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 rotate-[-10deg]">
      <div className="absolute inset-0 rounded-full bg-[#EC8644] shadow-2xl shadow-[#EC8644]/30" />
      <motion.svg
        viewBox="0 0 160 160"
        className="absolute inset-0 w-full h-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        aria-hidden
      >
        <defs>
          <path
            id="sticker-rim"
            d={`M 80,80 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          className="fill-white font-[var(--font-zuume)] font-bold uppercase"
          style={{ fontSize: 13, letterSpacing: "0.12em" }}
          textLength={2 * Math.PI * r - 4}
          lengthAdjust="spacing"
        >
          <textPath href="#sticker-rim">One week ✦ Four tracks ✦ Prizes ✦ </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="font-[var(--font-zuume)] font-black text-[28px] sm:text-[38px] tracking-tight leading-none">
          $23.5K
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase mt-1 text-white/85">
          in prizes
        </span>
      </div>
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

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24 sm:pt-44 sm:pb-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-[2px] bg-[#EC8644]" />
                  <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                    UBC 2026 Hackathon
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
                One week.
                <br />
                <span className="text-[#EC8644]">Ship it.</span>
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
              className="self-start lg:self-auto lg:mb-6"
            >
              <PrizeSticker reduce={reduce} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Ticker ---------- */}
      <div className="relative z-10 -mt-7 -mx-4">
        <div className="-rotate-2 bg-[#EC8644] py-3.5 shadow-xl shadow-[#EC8644]/20">
          <Marquee autoFill speed={45} play={!reduce}>
            {TICKER.map((t) => (
              <span
                key={t}
                className="flex items-center font-[var(--font-zuume)] font-black text-white text-xl sm:text-2xl uppercase tracking-tight"
              >
                {t}
                <span className="mx-6 text-[#1A2A36]/50" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

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
                  <div className="flex items-start justify-between mb-10">
                    <span className="font-[var(--font-zuume)] font-black text-5xl tracking-tight leading-none opacity-90">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <t.Icon size={22} strokeWidth={2} className="opacity-80" />
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
                        <span className="shrink-0 font-[var(--font-zuume)] font-black text-[#EC8644] text-2xl sm:text-3xl tracking-tight">
                          {b.prize}
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
          <Reveal>
            <Eyebrow>The week</Eyebrow>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95] mb-12"
              style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}
            >
              Kickoff to closing ceremony
            </h2>
          </Reveal>

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

      {/* ---------- Last year ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Last year</Eyebrow>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95] mb-12"
              style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}
            >
              From laptops to big checks
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 px-2">
            {POLAROIDS.map((p, i) => (
              <Reveal key={p.src} i={i}>
                <motion.figure
                  initial={{ rotate: p.tilt }}
                  whileHover={reduce ? undefined : { rotate: 0, scale: 1.04, y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="bg-white p-2.5 sm:p-3 pb-10 sm:pb-12 rounded-md shadow-[0_18px_40px_-18px_rgba(26,42,54,0.45)] relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#1A2A36]">
                    <Image
                      src={p.src}
                      alt={p.caption}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="absolute left-0 right-0 bottom-2.5 sm:bottom-3.5 text-center whitespace-nowrap font-[var(--font-zuume)] font-bold text-[#293C4B] text-base sm:text-xl tracking-tight">
                    {p.caption}
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
          <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mt-10">
            Midwest Blockchain Conference 2025
          </p>
        </div>
      </section>

      {/* ---------- The short version ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <Eyebrow>The short version</Eyebrow>
                <h2
                  className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                  style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}
                >
                  Ground rules
                </h2>
              </div>
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start md:self-auto text-[#293C4B] text-sm font-semibold border border-[#293C4B]/20 px-5 py-2.5 rounded-full hover:border-[#EC8644] hover:text-[#EC8644] transition-colors"
              >
                <FileText size={16} /> Full requirements in the guide
              </a>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RULES.map((r, i) => (
              <Reveal key={r.title} i={i % 3} className="h-full">
                <div className="h-full bg-white rounded-2xl p-7 flex gap-4">
                  <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-2xl leading-none mt-0.5">
                    ✦
                  </span>
                  <div>
                    <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl sm:text-2xl tracking-tight">
                      {r.title}
                    </h3>
                    <p className="text-[#5A6B78] text-[15px] leading-relaxed mt-1">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20 sm:py-28">
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Caveat } from "next/font/google";
import Marquee from "react-fast-marquee";
import FAQ from "@/components/FAQ";
import { Polaroid, Sticker, Ticker } from "@/components/Scrapbook";
import { ArrowUpRight, Send, TrendingUp, TrendingDown, FileText, Mic, Wrench, Lightbulb, Check, Lock } from "lucide-react";

const handwriting = Caveat({ subsets: ["latin"], weight: ["700"], display: "swap" });

/** Sign-up and the kickoff / tools-demo calls all run through this Luma event. */
const SIGNUP_URL = "https://luma.com/z1bgn7z8";
/** Full competition memo: tracks, format, report structure, and judging. */
const MEMO_URL =
  "https://docs.google.com/document/d/1n_DFfKbDEzRWKLzivAMEYfUhppSXo_ZRtOPZiMajqug/edit?usp=sharing";
/** Set this once the submission link is live and the locked submit buttons
 *  turn into real links. */
const SUBMIT_URL: string | null = null;
/** Competition chat. Join after signing up on Luma. */
const TELEGRAM_URL = "https://t.me/+AN2V5Da8qh9mYmVh";
/** Main UBC 2026 registration. Only attendees can compete. */
const UBC_REGISTER_URL = "https://luma.com/n4ad0k9m";

const LOGO_BASE =
  "https://xshoggmlvwtjesmqjrmu.supabase.co/storage/v1/object/public/images/partnership-logos";

const TRACKS = [
  {
    Icon: TrendingUp,
    side: "Long",
    cap: "Under $250M",
    body: "Make the case for buying an asset with a circulating market cap under $250M.",
    card: "bg-[#EC8644] text-white",
    muted: "text-white/75",
    chip: "bg-white/20 text-white",
    tilt: -1.5,
  },
  {
    Icon: TrendingUp,
    side: "Long",
    cap: "Over $250M",
    body: "Make the case for buying an asset with a circulating market cap over $250M.",
    card: "bg-[#1A2A36] text-white",
    muted: "text-white/60",
    chip: "bg-white/10 text-white/80",
    tilt: 1.5,
  },
  {
    Icon: TrendingDown,
    side: "Short",
    cap: "Over $1B",
    body: "Make the case for betting against an asset with a circulating market cap over $1B.",
    card: "bg-white text-[#293C4B]",
    muted: "text-[#5A6B78]",
    chip: "bg-[#F4F3EF] text-[#293C4B]",
    tilt: -1,
  },
];

const TICKER = [
  "Long under $250M",
  "Long over $250M",
  "Short over $1B",
  "$10,000 prize pool",
  "Franklin Templeton",
  "No Limit Holdings",
  "Blockworks",
  "Allium",
  "Finals at UT Austin",
];

const STAGES = [
  {
    Icon: FileText,
    title: "Written report",
    body: "Write up to 5 pages making the case for your asset. The top 3 reports in each track make it to the finals.",
    when: "Due Nov 9 at 11:59 PM ET",
  },
  {
    Icon: Mic,
    title: "Live pitch",
    body: "Finalists pitch their thesis in person at UBC, with slides. You get 5 minutes to present (we cut you off at 5), then 5 minutes of questions from the judges.",
    when: "Nov 20 at UT Austin",
  },
];

/** `counts` marks the parts that make up the 5-page main report. */
const REPORT_SECTIONS = [
  { title: "Title page", body: "Report title, track, team members, school, and contact info.", counts: false },
  { title: "Executive summary", body: "One page with your thesis and key findings.", counts: true },
  {
    title: "Project overview",
    body: "What the project does and why it matters: product, team, market, traction, token, upcoming catalysts, and risks.",
    counts: true,
  },
  {
    title: "Investment proposal",
    body: "Long or short, how long you'd hold, and your price target to exit.",
    counts: true,
  },
  { title: "Conclusion", body: "Wrap up your argument.", counts: true },
  { title: "Appendix", body: "Optional. Extra charts and tables can go here.", counts: false },
  { title: "References", body: "Every source you used.", counts: false },
];

const CRITERIA = [
  "Does your thesis hold up?",
  "How thorough is your research?",
  "How clearly do you explain it?",
];

const DATES = [
  { date: "Oct 22", title: "Kickoff town hall", note: "8 PM ET on Google Meet. We'll walk through the tracks and rules and take questions." },
  { date: "Oct 29", title: "Research tools demo", note: "8 PM ET. Blockworks and Allium show off their tools." },
  { date: "Nov 9", title: "Reports due", note: "11:59 PM ET. Judges read reports through Nov 15." },
  { date: "Nov 16", title: "Finalists announced", note: "We'll tell the top 3 teams in each track they're presenting." },
  { date: "Nov 20", title: "Finals at UBC", note: "Finalists pitch in person in Austin." },
  { date: "Nov 21", title: "Winners announced", note: "At the UBC closing ceremony." },
];

/** `h` is the rendered height in px, tuned so wide wordmarks and stacked
 *  marks read at a similar visual weight. */
const JUDGES = [
  { name: "Franklin Templeton", logo: `${LOGO_BASE}/ft.png`, h: 34 },
  { name: "No Limit Holdings", logo: `${LOGO_BASE}/nlh.png`, h: 32 },
  { name: "Collab + Currency", logo: "/judges/collab-currency.svg", h: 18 },
  { name: "Blockworks", logo: "/judges/blockworks.svg", h: 24 },
  { name: "Portal Ventures", logo: `${LOGO_BASE}/portal.png`, h: 34 },
  { name: "College.xyz", logo: "/college-xyz.png", h: 20 },
];

const PHOTOS = {
  headsDown: { src: "/photos/workspace.jpg", caption: "Heads down" },
  pitch: { src: "/photos/hackathon/pitch.jpg", caption: "Pitch time" },
};

const RESEARCH_FAQ = [
  {
    question: "Who can compete?",
    answer:
      "Any student who's attending UBC 2026. Compete solo or in a team of up to 4. There's no cap on how many teams a school can send.",
    link: { href: UBC_REGISTER_URL, label: "Register for UBC" },
  },
  {
    question: "How do I sign up?",
    answer:
      "Sign up on Luma, then join the competition Telegram. That's where we post updates and links to the calls.",
    link: { href: SIGNUP_URL, label: "Sign up on Luma" },
  },
  {
    question: "Can I enter more than one track?",
    answer: "No. Each team picks one track and one asset.",
  },
  {
    question: "What goes in the written report?",
    answer:
      "A title page, a one-page executive summary, a project overview, your investment proposal, a conclusion, and references. Keep the main report to 5 pages. The title page, appendix, and references don't count toward that. The memo has the full details.",
    link: { href: MEMO_URL, label: "Read the competition memo" },
  },
  {
    question: "Where do I submit my report?",
    answer:
      "Reports are due Nov 9 at 11:59 PM ET. The submission link isn't live yet. We'll post it here and in the Telegram once it's ready.",
  },
  {
    question: "Can I use AI?",
    answer:
      "AI is fine for helping with research, but the judges want to read your team's own analysis. Reports that feel mostly AI-written won't score well.",
  },
  {
    question: "How are finalists picked?",
    answer:
      "Judges read every report between Nov 9 and Nov 15. The top 3 teams in each track hear back on Nov 16 and pitch at UBC on Nov 20.",
  },
  {
    question: "What research tools do I get?",
    answer:
      "Blockworks and Allium are giving competitors free, limited access to their tools. They'll show you how to use them and how to get access on the Oct 29 call.",
  },
  {
    question: "Do I need to be in Austin?",
    answer:
      "You can do the research and writing from anywhere, but you need to be at UBC to compete. Finalists pitch in person on Nov 20.",
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
      <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">{children}</span>
    </div>
  );
}

function CtaButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25"
      >
        Sign up on Luma <ArrowUpRight size={17} />
      </a>
      <a
        href={MEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-white text-[#293C4B] text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-black/20"
      >
        <FileText size={17} /> Read the memo
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

/** Locked until SUBMIT_URL is set. `dark` styles it for the navy CTA panel. */
function SubmitButton({ dark = false }: { dark?: boolean }) {
  const tipId = useId();
  const base =
    "inline-flex items-center gap-2 shrink-0 whitespace-nowrap text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full";
  if (SUBMIT_URL) {
    return (
      <a
        href={SUBMIT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-[#EC8644] text-white hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25`}
      >
        Submit your report <ArrowUpRight size={17} />
      </a>
    );
  }
  return (
    <span
      role="button"
      tabIndex={0}
      aria-disabled="true"
      aria-describedby={tipId}
      className={`group relative ${base} cursor-not-allowed select-none border border-dashed outline-none ${
        dark ? "border-white/30 text-white/45" : "border-[#293C4B]/25 text-[#293C4B]/45"
      }`}
    >
      <span
        id={tipId}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 bottom-full mb-2.5 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-[#EC8644] text-white text-xs font-semibold px-3.5 py-1.5 shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
      >
        Submission link opening soon
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-[#EC8644]" />
      </span>
      <Lock size={15} /> Submit your report
      <span
        className={`text-[10px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full ${
          dark ? "bg-white/10 text-white/60" : "bg-[#293C4B]/[0.06] text-[#293C4B]/60"
        }`}
      >
        Link TBD
      </span>
    </span>
  );
}

const DOT_GRID = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const H2 = "font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]";

export default function ResearchCompetitionProgram() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-[#F4F3EF] overflow-x-hidden">

      {/* ---------- Hero ---------- */}
      <section className="relative bg-[#1A2A36] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/research-talk.jpg"
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
          <div className="absolute inset-0 opacity-[0.12]" style={DOT_GRID} />
        </div>

        <div className="relative z-20 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-32 sm:pt-44 sm:pb-36 lg:pb-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-[2px] bg-[#EC8644]" />
                  <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                    Year 3 · Sponsored by Franklin Templeton
                  </span>
                </div>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.88] max-w-5xl"
                style={{ fontSize: "clamp(46px, 8.5vw, 120px)" }}
              >
                Franklin Crypto
                <br />
                <span className="text-[#EC8644]">Research Competition</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mt-7"
              >
                Write an investment thesis on a crypto asset, then pitch it in person to judges from
                Franklin Templeton and leading crypto funds at UBC 2026. There&rsquo;s $10,000 in
                prizes, sponsored by Franklin Templeton&rsquo;s crypto division.
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
                Kickoff Oct 22 · Reports due Nov 9 · Finals Nov 20 at UT Austin
              </motion.p>
            </div>

            <motion.a
              href="#prizes"
              aria-label="About the $10,000 prize pool"
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140, damping: 12 }}
              className="absolute right-5 bottom-1 sm:right-10 sm:bottom-0 lg:static lg:mb-6"
            >
              <Sticker rim="THREE TRACKS ✦ ONE ASSET ✦ PITCH LIVE ✦ " value="$10K" label="prize pool" />
            </motion.a>
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
              <h2 className={H2} style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}>
                Choose your track
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-relaxed max-w-sm">
                Your team picks one track and one asset. Tracks are split by the asset&rsquo;s
                circulating market cap.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {TRACKS.map((t, i) => (
              <Reveal key={`${t.side}-${t.cap}`} i={i} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -8, rotate: t.tilt }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`h-full rounded-3xl p-7 sm:p-8 flex flex-col ${t.card}`}
                >
                  <div className={`flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase mb-6 ${t.muted}`}>
                    <t.Icon size={14} strokeWidth={2.25} />
                    Track {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="font-[var(--font-zuume)] font-black tracking-tight leading-[0.9]"
                    style={{ fontSize: "clamp(44px, 5vw, 68px)" }}
                  >
                    {t.side}
                  </h3>
                  <p className="font-[var(--font-zuume)] font-black text-2xl sm:text-[28px] tracking-tight leading-none mt-1">
                    {t.cap}
                  </p>
                  <p className={`text-[11px] font-semibold tracking-[0.16em] uppercase mt-1.5 ${t.muted}`}>
                    Circulating market cap
                  </p>
                  <p className={`text-sm leading-relaxed mt-4 ${t.muted}`}>{t.body}</p>
                  <div className="mt-auto pt-6">
                    <span className={`inline-block text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full ${t.chip}`}>
                      $2,500 to the winner
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Prizes + how it works ---------- */}
      <section id="prizes" className="pt-20 sm:pt-28 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-4">
            <Reveal className="h-full">
              <div className="relative h-full bg-[#EC8644] rounded-3xl p-8 sm:p-10 overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={DOT_GRID} />
                <div className="relative flex flex-col h-full">
                  <p className="text-white/80 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
                    Prize pool
                  </p>
                  <p
                    className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.85]"
                    style={{ fontSize: "clamp(64px, 8vw, 120px)" }}
                  >
                    $10,000
                  </p>
                  <p className="text-white text-base leading-relaxed mt-4 max-w-md">
                    Each track winner gets $2,500. The best team across all three tracks gets another
                    $2,500 on top, so one team could walk away with $5,000.
                  </p>
                  <ul className="mt-auto pt-8 space-y-2">
                    <li className="flex items-center justify-between gap-4 rounded-2xl bg-white/15 px-5 py-4">
                      <span className="text-white font-semibold">Each track winner</span>
                      <span className="font-[var(--font-zuume)] font-black text-white text-2xl sm:text-3xl tracking-tight">
                        $2,500
                      </span>
                    </li>
                    <li className="flex items-center justify-between gap-4 rounded-2xl bg-[#1A2A36] px-5 py-4">
                      <span className="text-white font-semibold">Best team overall</span>
                      <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-2xl sm:text-3xl tracking-tight">
                        +$2,500
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal i={1} className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 sm:p-10 flex flex-col">
                <Eyebrow>How it works</Eyebrow>
                <h2 className={`${H2} mb-2`} style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                  Two rounds
                </h2>
                <p className="text-[#5A6B78] text-[15px] leading-relaxed">
                  Compete solo or with up to 3 teammates. Your school can send as many teams as it
                  wants.
                </p>
                <ol className="divide-y divide-[#293C4B]/10 mt-4">
                  {STAGES.map((s, i) => (
                    <li key={s.title} className="flex gap-5 py-5">
                      <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-xl tracking-tight w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[#293C4B] font-semibold flex items-center gap-2">
                          <s.Icon size={16} className="text-[#9CADB7]" /> {s.title}
                        </h3>
                        <p className="text-[#5A6B78] text-[15px] leading-relaxed mt-0.5">{s.body}</p>
                        <p className="text-[#293C4B] text-[11px] font-semibold tracking-[0.16em] uppercase mt-2">
                          {s.when}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto flex items-start gap-4 rounded-2xl bg-[#F4F3EF] p-5">
                  <Wrench size={18} className="text-[#EC8644] shrink-0 mt-0.5" />
                  <p className="text-[#5A6B78] text-sm leading-relaxed">
                    <span className="text-[#293C4B] font-semibold">Free research tools.</span>{" "}
                    Blockworks and Allium are giving competitors limited access to their research
                    tools. They&rsquo;ll demo them and explain how to get access on the Oct 29 call.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The report ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>The report</Eyebrow>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <h2 className={H2} style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}>
                What goes in your report
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-relaxed max-w-md">
                Keep the main report to 5 pages. The title page, appendix, and references
                don&rsquo;t count toward that, but charts in the main text do. If you&rsquo;re short
                on space, move charts to the appendix.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10 items-start">
            {/* A sheet of paper with the report outline on it */}
            <Reveal>
              <motion.div
                initial={{ rotate: -1.2 }}
                whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="relative bg-white rounded-md p-7 sm:p-10 shadow-[0_24px_48px_-24px_rgba(26,42,54,0.45)]"
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#EC8644]/35 rotate-[-3deg]"
                />
                <p className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl sm:text-3xl tracking-tight border-b-2 border-[#293C4B] pb-3 mb-2">
                  Contents
                </p>
                <ol>
                  {REPORT_SECTIONS.map((r, i) => {
                    const prev = REPORT_SECTIONS[i - 1];
                    const next = REPORT_SECTIONS[i + 1];
                    const first = r.counts && !prev?.counts;
                    const last = r.counts && !next?.counts;
                    return (
                      <li
                        key={r.title}
                        className={
                          r.counts
                            ? `relative bg-[#EC8644]/[0.07] border-l-[3px] border-[#EC8644] pl-4 pr-3 ${
                                first ? "rounded-tr-xl mt-2 pt-9" : ""
                              } ${last ? "rounded-br-xl mb-2" : ""}`
                            : ""
                        }
                      >
                        {first && (
                          <span className="absolute left-4 top-3 text-[#EC8644] text-[11px] font-semibold tracking-[0.16em] uppercase">
                            5 pages max
                          </span>
                        )}
                        <div
                          className={`flex gap-5 py-4 ${
                            r.counts && !first ? "border-t border-dashed border-[#EC8644]/30" : ""
                          } ${!r.counts && i > 0 && !prev?.counts ? "border-t border-dashed border-[#293C4B]/15" : ""}`}
                        >
                          <span
                            className={`font-[var(--font-zuume)] font-black text-xl tracking-tight w-6 shrink-0 ${
                              r.counts ? "text-[#EC8644]" : "text-[#9CADB7]"
                            }`}
                          >
                            {i + 1}.
                          </span>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <h3 className="text-[#293C4B] font-semibold">{r.title}</h3>
                              {!r.counts && (
                                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#5A6B78] bg-[#F4F3EF] px-2 py-0.5 rounded-full">
                                  Not in page count
                                </span>
                              )}
                            </div>
                            <p className="text-[#5A6B78] text-[15px] leading-relaxed mt-0.5">{r.body}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </motion.div>
            </Reveal>

            <Reveal i={1} className="lg:mt-6">
              <div className="relative bg-[#1A2A36] rounded-3xl p-8 sm:p-10 overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(236,134,68,0.22) 0%, rgba(236,134,68,0) 70%)",
                  }}
                />
                <div className="relative">
                  <Eyebrow>How reports are judged</Eyebrow>
                  <ul className="space-y-3 mt-5">
                    {CRITERIA.map((c) => (
                      <li key={c} className="flex items-start gap-3">
                        <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-[#EC8644] text-white shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <p className="text-white text-[15px] leading-snug">{c}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] border border-white/10 p-4 mt-8">
                    <Lightbulb size={18} className="text-[#EC8644] shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm leading-relaxed">
                      <span className="text-white font-semibold">Make it yours.</span> The judges
                      want to hear how your team thinks. Reports that feel mostly AI-written
                      won&rsquo;t score well.
                    </p>
                  </div>
                  <div className="mt-8">
                    <SubmitButton dark />
                  </div>
                  <a
                    href={MEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-[#EC8644] text-sm font-semibold hover:underline underline-offset-4"
                  >
                    <FileText size={16} /> Read the full memo <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Key dates ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
            <Reveal>
              <Eyebrow>Key dates</Eyebrow>
              <h2 className={H2} style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}>
                From kickoff to finals
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-relaxed max-w-md mt-4">
                You can do all the research from home. Both calls are linked on the Luma page.
              </p>
            </Reveal>
            <Reveal i={1} className="flex gap-4 sm:gap-6 w-full max-w-md lg:w-[26rem] lg:shrink-0 lg:pr-4">
              <Polaroid {...PHOTOS.headsDown} tilt={-4} className="flex-1 max-w-56" />
              <Polaroid {...PHOTOS.pitch} tilt={3} className="flex-1 max-w-56 mt-6" />
            </Reveal>
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-4">
            {/* Connector: vertical on mobile, horizontal on desktop */}
            <span
              aria-hidden
              className="absolute left-[9px] top-2 bottom-2 border-l-2 border-dashed border-[#293C4B]/15 lg:left-2 lg:right-2 lg:top-[9px] lg:bottom-auto lg:border-l-0 lg:border-t-2"
            />
            {DATES.map((d, i) => {
              const finals = d.date === "Nov 20";
              return (
                <motion.li
                  key={d.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="relative pl-10 lg:pl-0 lg:pt-10"
                >
                  <span
                    className={`absolute left-0 top-0 w-5 h-5 rounded-full border-[3px] ${
                      finals
                        ? "bg-[#EC8644] border-[#EC8644] shadow-[0_0_0_6px_rgba(236,134,68,0.18)]"
                        : "bg-[#F4F3EF] border-[#293C4B]"
                    }`}
                  />
                  <p
                    className={`font-[var(--font-zuume)] font-black text-3xl sm:text-4xl tracking-tight leading-none ${
                      finals ? "text-[#EC8644]" : "text-[#293C4B]"
                    }`}
                  >
                    {d.date}
                  </p>
                  <p className="text-[#293C4B] font-semibold mt-2">{d.title}</p>
                  <p className="text-[#5A6B78] text-sm leading-relaxed mt-1">{d.note}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- Judges ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal className="relative flex items-end justify-between gap-6">
            <Eyebrow>Judged by</Eyebrow>
            {/* Scribbled note pointing down at the logo band */}
            <div aria-hidden className="hidden sm:flex items-end gap-1 text-[#EC8644] pointer-events-none -mb-6 mr-4 lg:mr-24">
              <span className={`${handwriting.className} text-[#293C4B] text-[26px] leading-none -rotate-3 mb-12`}>
                the people you&rsquo;ll pitch to
              </span>
              <svg viewBox="0 0 90 80" className="w-[72px] h-[64px]">
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
          </Reveal>
        </div>

        <Reveal className="relative -mx-4 mt-6">
          <div className="rotate-[1.5deg] bg-white py-7 sm:py-9 shadow-[0_24px_48px_-28px_rgba(26,42,54,0.45)]">
            <Marquee autoFill pauseOnHover speed={35} play={!reduce}>
              {JUDGES.map((j) => (
                <span key={j.name} className="flex items-center">
                  <Image
                    src={j.logo}
                    alt={j.name}
                    title={j.name}
                    width={240}
                    height={j.h}
                    style={{ height: j.h }}
                    className="w-auto"
                    unoptimized
                  />
                  <span className="mx-10 sm:mx-14 text-[#EC8644] text-lg" aria-hidden>
                    ✦
                  </span>
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>
      </section>

      <FAQ items={RESEARCH_FAQ} />

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
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={DOT_GRID} />
              <div className="relative">
                <Eyebrow>Reports due Nov 9</Eyebrow>
                <h2
                  className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
                  style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
                >
                  Make your call<span className="text-[#EC8644]">.</span>
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl mt-5">
                  Sign up on Luma and join the Telegram so you don&rsquo;t miss updates. You&rsquo;ll
                  also need to be registered for UBC 2026 to compete.
                </p>
                <div className="mt-9 space-y-3">
                  <CtaButtons />
                  <SubmitButton dark />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

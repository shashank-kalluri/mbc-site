"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  FileText,
  CalendarDays,
  MapPin,
  Ticket,
  Timer,
  Rocket,
  Cpu,
  Building2,
  Gavel,
  Banknote,
} from "lucide-react";

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSewc37--a2CqI6O31s5bP2Jg1wK4s6bL2G9t-BF65aVLvjaMA/viewform?usp=dialog";
const REFER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfhDVAOVA48f7_IdDdolLdWxZIyKk0NqCcEYNf-7aZs0bYREg/viewform?usp=header";
/** Full program write-up: tracks, selection, grant, and timeline. */
const PROGRAM_DOC =
  "https://docs.google.com/document/d/1w_K86czLPHDXaNDyFLPB1o5SgVP8JKSP8wwuWMwG1IU/edit?usp=sharing";

const HERO_IMAGE = "/photos/main-stage.jpg";

const VEDA_URL =
  "https://www.marshall.usc.edu/institutes-and-centers/vaneck-digital-assets-initiative";
const VEDA_LOGO =
  "https://xshoggmlvwtjesmqjrmu.supabase.co/storage/v1/object/public/images/partnership-logos/usc-veda.png";

const INVESTORS: { name: string; href?: string }[] = [
  { name: "Y Combinator", href: "https://www.ycombinator.com/" },
  { name: "Colosseum", href: "https://www.colosseum.org" },
  { name: "Portal Ventures", href: "https://portal.vc/" },
  { name: "Castle Island Ventures", href: "https://castleisland.vc/" },
  { name: "No Limit Holdings", href: "https://nlh.xyz/" },
  { name: "CoinFund", href: "https://www.coinfund.io/" },
  { name: "USC VanEck Digital Assets Initiative", href: VEDA_URL },
];

const SPONSORS = ["Solana", "Circle", "Gemini", "Ledger", "MoonPay", "Franklin Templeton"];

const TRACKS = [
  {
    n: "01",
    title: "Already backed",
    body: "You've raised initial capital from YC, Speedrun, or a venture firm. Show your product, tell your story, and raise your next round.",
  },
  {
    n: "02",
    title: "Raising your first",
    body: "You're raising your first capital and ready to meet the investors who'll back you. The top team receives a $10,000 non-dilutive grant from USC VEDA.",
  },
];

const CRITERIA = [
  {
    Icon: Rocket,
    title: "Under 25",
    body: "Any founder under the age of 25. Recent grads building full-time are welcome.",
  },
  {
    Icon: Cpu,
    title: "Frontier tech",
    body: "Building in crypto, AI, or adjacent frontier tech industries.",
  },
  {
    Icon: Building2,
    title: "A real company",
    body: "We're looking for businesses, not side projects.",
  },
];

const BENEFITS = [
  {
    n: "01",
    title: "A speaking slot",
    body: "Present your product to the investors, accelerators, and talent at UBC 2026.",
  },
  {
    n: "02",
    title: "A closed-door session",
    body: "After the event, with proven founders, investors, and accelerators.",
  },
  {
    n: "03",
    title: "Materials in the room",
    body: "Your materials are shared directly with the investors in the room, if you opt in.",
  },
  {
    n: "04",
    title: "A shot at $10K, non-dilutive",
    body: "A $10K cash grant from USC VEDA & College.xyz, judged live by the investors in the audience.",
  },
  {
    n: "05",
    title: "Referrals",
    body: "Introductions to partner investors and accelerators.",
  },
];

const LOGISTICS = [
  { Icon: MapPin, label: "Location", value: "AT&T Center @ The University of Texas at Austin" },
  { Icon: CalendarDays, label: "When", value: "November 20–21, 2026 · Demo Day likely the 21st" },
  { Icon: Ticket, label: "Eligibility", value: "UBC 2026 attendees only" },
  { Icon: Timer, label: "Applications close", value: "October 25 · reviewed on a rolling basis" },
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

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="block w-6 h-[2px] bg-[#EC8644]" />
      <span
        className={`text-xs font-medium tracking-[0.22em] uppercase ${
          dark ? "text-[#EC8644]" : "text-[#EC8644]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export default function FounderStage() {
  return (
    <div className="bg-[#F4F3EF] overflow-x-hidden">

      {/* ---------- Hero ---------- */}
      <section className="relative bg-[#1A2A36] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-45"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,42,54,0.72) 0%, rgba(26,42,54,0.82) 45%, rgba(26,42,54,0.97) 85%, #1A2A36 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-14 sm:pt-44 sm:pb-20">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-[2px] bg-[#EC8644]" />
              <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                College.xyz · UBC 2026
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
            Student
            <br />
            Founder Stage
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mt-7"
          >
            Over the last two years, we&rsquo;ve helped more than 80 students land jobs and
            internships in frontier tech. Now we&rsquo;re ready to support the ones who&rsquo;d
            rather build the company than join one.
          </motion.p>

          <motion.a
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            href="#grant"
            className="inline-flex items-center gap-3 mt-8 rounded-full border border-[#EC8644]/45 bg-[#EC8644]/12 pl-2 pr-5 py-2 text-white hover:bg-[#EC8644]/20 transition-colors"
          >
            <span className="font-[var(--font-zuume)] font-black text-lg leading-none bg-[#EC8644] text-white rounded-full px-3 py-1.5">
              $10K
            </span>
            <span className="text-sm sm:text-[15px] font-medium">
              Non-dilutive grant from <span className="text-[#EC8644]">USC VEDA</span> &amp; College.xyz
            </span>
          </motion.a>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25"
            >
              Apply to pitch <ArrowUpRight size={17} />
            </a>
            <a
              href={PROGRAM_DOC}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-white text-[#293C4B] text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-black/20"
            >
              <FileText size={17} /> Read the program
            </a>
            <a
              href={REFER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/20 hover:border-white/60 transition-colors"
            >
              Refer a founder
            </a>
          </motion.div>

          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/35 text-[11px] sm:text-xs tracking-[0.2em] uppercase mt-9"
          >
            Nov 20–21, 2026 · UT Austin, TX · Applications close Oct 25
          </motion.p>
        </div>
      </section>

      {/* ---------- Grant ---------- */}
      <section id="grant" className="pt-16 sm:pt-24 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative bg-white rounded-3xl overflow-hidden border border-[#EC8644]/25">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#EC8644]" />
              <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center p-8 sm:p-12 lg:p-14">
                <div>
                  <p className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase mb-2">
                    The grant
                  </p>
                  <p
                    className="font-[var(--font-zuume)] font-black text-[#EC8644] tracking-tight leading-[0.85]"
                    style={{ fontSize: "clamp(88px, 14vw, 180px)" }}
                  >
                    $10K
                  </p>
                  <p className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl sm:text-3xl tracking-tight mt-2">
                    Non-dilutive. Cash.
                  </p>
                </div>

                <div>
                  <h2
                    className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95] mb-5"
                    style={{ fontSize: "clamp(30px, 3.8vw, 50px)" }}
                  >
                    Backed by the{" "}
                    <a
                      href={VEDA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#EC8644]/40 decoration-2 underline-offset-4 hover:decoration-[#EC8644] transition-colors"
                    >
                      USC VanEck Digital Assets Initiative
                    </a>
                  </h2>
                  <p className="text-[#5A6B78] text-base leading-relaxed max-w-2xl">
                    Select founders will have a shot at a $10,000 non-dilutive cash grant from{" "}
                    <a
                      href={VEDA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#EC8644] font-medium hover:underline"
                    >
                      USC VEDA
                    </a>{" "}
                    &amp; College.xyz. No equity, no strings. The winner is judged live, on
                    stage, by the investors in the audience.
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-3 mt-7 max-w-2xl">
                    <li className="flex items-start gap-3 bg-[#F4F3EF] rounded-xl px-4 py-3">
                      <Banknote size={18} className="text-[#EC8644] mt-0.5 shrink-0" />
                      <span className="text-[#293C4B] text-sm font-medium">
                        $10,000 to the top emerging team
                      </span>
                    </li>
                    <li className="flex items-start gap-3 bg-[#F4F3EF] rounded-xl px-4 py-3">
                      <Gavel size={18} className="text-[#EC8644] mt-0.5 shrink-0" />
                      <span className="text-[#293C4B] text-sm font-medium">
                        Judged live by investors in the room
                      </span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-8 pt-7 border-t border-[#293C4B]/10">
                    <span className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase">
                      Presented by
                    </span>
                    <a href={VEDA_URL} target="_blank" rel="noopener noreferrer" title="USC VanEck Digital Assets Initiative">
                      <Image
                        src={VEDA_LOGO}
                        alt="USC Marshall VanEck Digital Assets Initiative"
                        width={180}
                        height={79}
                        className="h-14 w-auto"
                        unoptimized
                      />
                    </a>
                    <span className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl tracking-tight">
                      &amp; College.xyz
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Headline sits with the copy it introduces, in one readable column,
              with the photo carrying the other half of the row. */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <Eyebrow>Why we&rsquo;re building it</Eyebrow>
              <h2
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
              >
                The Founder Stage is how we scale UBC
              </h2>
              <div className="space-y-4 max-w-xl">
                <p className="text-[#5A6B78] text-base leading-relaxed">
                  College.xyz is a 501(c)(3) nonprofit working to close the gap between talented
                  students and frontier tech. Every year we host the University Blockchain
                  Conference, which brings together top talent from over 100 universities and puts
                  them in front of companies like Coinbase, Solana, Polymarket, Gemini, and Ledger.
                </p>
                <p className="text-[#5A6B78] text-base leading-relaxed">
                  Since UBC launched in 2024, attendees have gone on to join Y Combinator, a16z
                  Speedrun, Alliance, and Colosseum, and to raise venture funding. At UBC 2026,
                  founders under 25 will pitch the accelerators, investors, mentors, and builders
                  who actually back young teams.
                </p>
              </div>
              <a
                href={PROGRAM_DOC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 bg-[#293C4B] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#1A2A36] transition-colors"
              >
                <FileText size={16} /> Read the full program
              </a>
            </Reveal>

            <Reveal i={1}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/photos/panel.jpg"
                  alt="University Blockchain Conference"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A36]/50 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Who takes the stage ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Who takes the stage</Eyebrow>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none mb-4"
              style={{ fontSize: "clamp(34px, 5.2vw, 68px)" }}
            >
              You take the stage
            </h2>
            <p className="text-[#5A6B78] text-[15px] leading-relaxed mb-12 max-w-2xl">
              We&rsquo;ll pick around 20 founders to present at UBC 2026. This demo day is not
              crypto-specific. We want founders building anywhere in frontier tech: crypto, AI,
              hard tech, and whatever comes next.
            </p>
          </Reveal>

          {/* Gate: are you eligible at all */}
          <Reveal>
            <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl sm:text-3xl tracking-tight mb-1">
              First, the bar
            </h3>
            <p className="text-[#9CADB7] text-sm mb-6 max-w-2xl">
              Three things we check on every application.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {CRITERIA.map((c, i) => (
              <Reveal key={c.title} i={i}>
                <div className="h-full bg-white rounded-2xl p-7 sm:p-8">
                  <div className="w-11 h-11 rounded-full bg-[#EC8644]/10 flex items-center justify-center mb-5">
                    <c.Icon size={19} className="text-[#EC8644]" />
                  </div>
                  <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl sm:text-2xl tracking-tight mb-2">
                    {c.title}
                  </h3>
                  <p className="text-[#5A6B78] text-sm leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Then: which track, and why there are two */}
          <Reveal>
            <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl sm:text-3xl tracking-tight mb-1">
              Then, pick your track
            </h3>
            <p className="text-[#5A6B78] text-[15px] leading-relaxed mb-6 max-w-2xl">
              A founder six months from their first check and one coming off a seed round need
              different things from a demo day, and it isn&rsquo;t fair to judge them against each
              other. So we run two tracks and review them separately. Apply to the one that matches
              where you are today.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {TRACKS.map((t, i) => (
              <Reveal key={t.title} i={i}>
                <div className="group h-full bg-white rounded-3xl p-8 sm:p-10 border border-transparent hover:border-[#EC8644]/35 transition-colors">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className="font-[var(--font-zuume)] font-black text-[#EC8644]/20 leading-none group-hover:text-[#EC8644]/40 transition-colors"
                      style={{ fontSize: "clamp(42px, 5vw, 64px)" }}
                    >
                      {t.n}
                    </span>
                    <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl sm:text-3xl tracking-tight">
                      {t.title}
                    </h3>
                  </div>
                  <p className="text-[#5A6B78] text-[15px] leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What you get ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>What you get</Eyebrow>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none mb-10"
              style={{ fontSize: "clamp(34px, 5.2vw, 68px)" }}
            >
              What&rsquo;s on the table
            </h2>
          </Reveal>
          <div className="border-t border-[#293C4B]/10">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.n} i={i}>
                <div className="group flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8 py-6 sm:py-7 border-b border-[#293C4B]/10 hover:bg-white/60 transition-colors sm:px-2">
                  <span className="text-[#EC8644] font-[var(--font-zuume)] font-black text-base w-8 shrink-0">
                    {b.n}
                  </span>
                  <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl sm:text-2xl tracking-tight sm:w-80 shrink-0">
                    {b.title}
                  </h3>
                  <p className="text-[#5A6B78] text-[15px] leading-relaxed">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Investors ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14">
              <Eyebrow>Who&rsquo;s in the room</Eyebrow>
              <h3
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none mb-3"
                style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
              >
                Early investor commitments
              </h3>
              <p className="text-[#9CADB7] text-sm mb-8 max-w-2xl">
                We&rsquo;ll announce the full audience later. Committed so far:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {INVESTORS.map((inv, i) =>
                  inv.href ? (
                    <motion.a
                      key={inv.name}
                      href={inv.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="rounded-full border border-[#293C4B]/12 bg-[#F4F3EF] px-4 py-2 text-sm font-medium text-[#293C4B] hover:border-[#EC8644]/50 hover:text-[#EC8644] transition-colors"
                    >
                      {inv.name}
                    </motion.a>
                  ) : (
                    <motion.span
                      key={inv.name}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="rounded-full border border-[#293C4B]/12 bg-[#F4F3EF] px-4 py-2 text-sm font-medium text-[#293C4B]"
                    >
                      {inv.name}
                    </motion.span>
                  )
                )}
              </div>

              <div className="mt-9 pt-8 border-t border-[#293C4B]/8">
                <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mb-4">
                  Plus UBC 2026 sponsors
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  {SPONSORS.map((s) => (
                    <span
                      key={s}
                      className="font-[var(--font-zuume)] font-black text-[#293C4B]/35 text-xl sm:text-2xl tracking-tight"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="text-[#9CADB7] text-sm">&hellip; and many more</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Logistics ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Format &amp; logistics</Eyebrow>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {LOGISTICS.map((l, i) => (
              <Reveal key={l.label} i={i}>
                <div className="h-full bg-white rounded-2xl p-7">
                  <l.Icon size={18} className="text-[#EC8644] mb-4" />
                  <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mb-2">
                    {l.label}
                  </p>
                  <p className="text-[#293C4B] text-sm font-medium leading-relaxed">{l.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Apply CTA ---------- */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative bg-[#1A2A36] rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 90% at 85% 15%, rgba(236,134,68,0.18) 0%, rgba(236,134,68,0) 70%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-[2px] bg-[#EC8644]" />
                  <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                    How to apply
                  </span>
                </div>
                <h2
                  className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.92] max-w-3xl"
                  style={{ fontSize: "clamp(32px, 4.8vw, 62px)" }}
                >
                  Serious founders and builders only
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-2xl mt-5">
                  We read applications as they come in. They close on October 25.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-9">
                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25"
                  >
                    Founders: apply here <ArrowUpRight size={17} />
                  </a>
                  <a
                    href={PROGRAM_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-white text-[#293C4B] text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/90 transition-colors"
                  >
                    <FileText size={17} /> Read the program
                  </a>
                  <a
                    href={REFER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-white/10 text-white text-sm sm:text-base font-semibold border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/20 hover:border-white/60 transition-colors"
                  >
                    Refer a founder <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

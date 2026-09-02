"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Ticket,
  Timer,
  Rocket,
  Cpu,
  Building2,
} from "lucide-react";

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSewc37--a2CqI6O31s5bP2Jg1wK4s6bL2G9t-BF65aVLvjaMA/viewform?usp=dialog";
const REFER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfhDVAOVA48f7_IdDdolLdWxZIyKk0NqCcEYNf-7aZs0bYREg/viewform?usp=header";

const HERO_IMAGE = "/G8VBLXpaUAAVJOe.jpeg";

const STATS = [
  { value: "80+", label: "Students placed in frontier tech" },
  { value: "100+", label: "Universities represented" },
  { value: "~20", label: "Companies on the stage" },
  { value: "<25", label: "Founder age cap" },
];

const INVESTORS = [
  "Y Combinator",
  "Colosseum",
  "Portal Ventures",
  "Castle Island Ventures",
  "No Limit Holdings",
  "Multicoin Capital",
  "USC VanEck Digital Asset Initiative",
];

const SPONSORS = ["Coinbase", "Solana", "Gemini", "Ripple", "MoonPay", "Ledger"];

const TRACKS = [
  {
    n: "01",
    title: "Proven companies",
    body: "Teams who've raised initial capital from YC, Speedrun, and venture firms — ready to showcase their product, share their story, inspire student builders, and raise subsequent funding.",
  },
  {
    n: "02",
    title: "Emerging teams",
    body: "Teams raising their first capital, ready to meet the investors who'll back them. These teams are also eligible for a non-dilutive grant from College.xyz.",
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
    body: "Showcase your product to top investors, accelerators, and talent at UBC 2026.",
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
    title: "A non-dilutive grant",
    body: "A shot at a cash grant from College.xyz, judged live by the investors in the audience.",
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

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3 mt-9"
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
              href={REFER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/20 hover:border-white/60 transition-colors"
            >
              Refer a founder
            </a>
          </motion.div>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/35 text-[11px] sm:text-xs tracking-[0.2em] uppercase mt-9"
          >
            Nov 20–21, 2026 · UT Austin, TX · Applications close Oct 25
          </motion.p>
        </div>

        {/* Stat band */}
        <div className="relative z-10 border-t border-white/10">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
              {STATS.map((s, i) => (
                <Reveal key={s.label} i={i} className="px-1 py-7 sm:py-9 first:pl-0 lg:px-8 lg:first:pl-0">
                  <div
                    className="font-[var(--font-zuume)] font-black text-[#EC8644] leading-none tracking-tight"
                    style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
                  >
                    {s.value}
                  </div>
                  <p className="text-white/45 text-xs sm:text-sm mt-2 leading-snug max-w-[190px]">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Why we&rsquo;re building it</Eyebrow>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.92] mb-10 max-w-3xl"
              style={{ fontSize: "clamp(34px, 5.2vw, 68px)" }}
            >
              The Founder Stage is how we scale this
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
            <Reveal i={1}>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                <p className="text-[#5A6B78] text-[15px] leading-relaxed">
                  College.xyz, a 501(c)(3) nonprofit, exists to close the gap between talented
                  students and frontier tech industries. Within this, we host the University
                  Blockchain Conference — an annual conference bringing together top talent from
                  over 100 universities globally and connecting them with leading companies
                  including Coinbase, Solana, Polymarket, Gemini, and Ledger.
                </p>
                <p className="text-[#5A6B78] text-[15px] leading-relaxed">
                  Since UBC launched in 2024, several attendees have gone on to join top
                  accelerators including Y Combinator, a16z Speedrun, Alliance, and Colosseum, and
                  to raise venture funding. At UBC 2026, select founders under 25 will present to
                  the accelerators, investors, mentors, and builders who can take a young founding
                  team to the next level.
                </p>
              </div>
            </Reveal>

            <Reveal i={2}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/HIFVvbZXQAAq6Q1.jpeg"
                  alt="University Blockchain Conference"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A36]/60 to-transparent" />
              </div>
            </Reveal>
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
                The full investor audience will be announced later. Early commitments include:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {INVESTORS.map((name, i) => (
                  <motion.span
                    key={name}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="rounded-full border border-[#293C4B]/12 bg-[#F4F3EF] px-4 py-2 text-sm font-medium text-[#293C4B] hover:border-[#EC8644]/50 hover:text-[#EC8644] transition-colors"
                  >
                    {name}
                  </motion.span>
                ))}
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

      {/* ---------- Tracks ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Who takes the stage</Eyebrow>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none mb-4"
              style={{ fontSize: "clamp(34px, 5.2vw, 68px)" }}
            >
              ~20 companies, two tracks
            </h2>
            <p className="text-[#9CADB7] text-sm mb-10 max-w-2xl">
              This demo day is not crypto-specific. We&rsquo;re looking for impressive founders
              building in and around frontier tech — including but not limited to crypto, AI, and
              hard tech.
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

      {/* ---------- Who should apply ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Who should apply</Eyebrow>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
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
                  This opportunity is application based. Applications are reviewed on a rolling
                  basis and will close on October 25.
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

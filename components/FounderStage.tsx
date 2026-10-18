"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, FileText, CalendarDays, MapPin, Ticket, Timer } from "lucide-react";
import { Sticker } from "@/components/Scrapbook";

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
const CXYZ_URL = "https://www.college.xyz/";
const CXYZ_LOGO = "/college-xyz.png";
const VEDA_LOGO =
  "https://xshoggmlvwtjesmqjrmu.supabase.co/storage/v1/object/public/images/partnership-logos/usc-veda.png";

const LOGO_BASE =
  "https://xshoggmlvwtjesmqjrmu.supabase.co/storage/v1/object/public/images/partnership-logos";

/** `h` is the rendered height in px, tuned so wide wordmarks and stacked
 *  marks read at a similar visual weight. */
const INVESTORS = [
  { name: "Y Combinator", href: "https://www.ycombinator.com/", logo: "/investors/ycombinator.png", h: 38 },
  { name: "Colosseum", href: "https://www.colosseum.org", logo: `${LOGO_BASE}/colosseum.png`, h: 20 },
  { name: "Portal Ventures", href: "https://portal.vc/", logo: `${LOGO_BASE}/portal.png`, h: 34 },
  { name: "Castle Island Ventures", href: "https://castleisland.vc/", logo: "/investors/castle-island.svg", h: 34 },
  { name: "No Limit Holdings", href: "https://nlh.xyz/", logo: `${LOGO_BASE}/nlh.png`, h: 28 },
  { name: "CoinFund", href: "https://www.coinfund.io/", logo: "/investors/coinfund.svg", h: 16 },
  { name: "USC VanEck Digital Assets Initiative", href: VEDA_URL, logo: VEDA_LOGO, h: 40 },
];

const SPONSORS = [
  { name: "Solana", logo: `${LOGO_BASE}/solana.png`, h: 18 },
  { name: "Circle", logo: `${LOGO_BASE}/circle.png`, h: 24 },
  { name: "Gemini", logo: `${LOGO_BASE}/gemini.png`, h: 22 },
  { name: "Ledger", logo: `${LOGO_BASE}/ledger.png`, h: 24 },
  { name: "MoonPay", logo: `${LOGO_BASE}/moonpay.svg`, h: 22 },
  { name: "Franklin Templeton", logo: `${LOGO_BASE}/ft.png`, h: 22 },
];

const CRITERIA = [
  { title: "Under 25", body: "Recent grads building full-time are welcome." },
  { title: "Frontier tech", body: "Crypto, AI, hard tech, or adjacent." },
  { title: "A real company", body: "A business, not a side project." },
];

const TRACKS = [
  {
    title: "Already backed",
    body: "You've raised from YC, Speedrun, or a venture firm. Show your product and raise your next round.",
    card: "bg-[#293C4B] text-white",
    muted: "text-white/60",
  },
  {
    title: "Raising your first",
    body: "You're raising your first capital and ready to meet the investors who'll back you.",
    card: "bg-[#EC8644] text-white",
    muted: "text-white/80",
  },
];

const BENEFITS = [
  { title: "A speaking slot", body: "Present to the investors, accelerators, and talent at UBC 2026." },
  { title: "A closed-door session", body: "After the event, with proven founders, investors, and accelerators." },
  { title: "Your deck to investors", body: "If you opt in, we share your materials directly with the investors in the room." },
  { title: "Referrals", body: "Intros to partner investors and accelerators." },
];

const LOGISTICS = [
  { Icon: Timer, label: "Applications close", value: "October 25, reviewed on a rolling basis" },
  { Icon: CalendarDays, label: "When", value: "November 20–21, 2026, Demo Day likely the 21st" },
  { Icon: MapPin, label: "Where", value: "AT&T Center at UT Austin" },
  { Icon: Ticket, label: "Eligibility", value: "UBC 2026 attendees only" },
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
    </div>
  );
}

const DOT_GRID = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const H2 = "font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]";

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
          <div className="absolute inset-0 opacity-[0.12]" style={DOT_GRID} />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-36 sm:pt-44 sm:pb-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-[2px] bg-[#EC8644]" />
                  <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                    Demo day for founders under 25
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
                <span className="text-[#EC8644]">Founder Stage</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mt-7"
              >
                About 20 student founders pitch the investors and accelerators at UBC 2026. The
                best team walks away with a $10,000 grant from USC VEDA and College.xyz.
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
                Nov 20–21, 2026 · UT Austin · Applications close Oct 25
              </motion.p>
            </div>

            <motion.a
              href="#grant"
              aria-label="About the $10,000 grant"
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140, damping: 12 }}
              className="absolute right-5 bottom-4 sm:right-10 sm:bottom-6 lg:static lg:mb-6"
            >
              <Sticker rim="NO EQUITY ✦ ONE WINNER ✦ PITCH LIVE ✦ " value="$10K" label="grant" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <Eyebrow>Why we&rsquo;re doing this</Eyebrow>
              <h2 className={`${H2} mb-6`} style={{ fontSize: "clamp(32px, 4vw, 54px)" }}>
                From landing jobs to starting companies
              </h2>
              <div className="space-y-4 max-w-xl">
                <p className="text-[#5A6B78] text-base leading-relaxed">
                  <a
                    href={CXYZ_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#293C4B] font-semibold underline decoration-[#EC8644]/50 decoration-2 underline-offset-4 hover:decoration-[#EC8644] transition-colors"
                  >
                    College.xyz
                  </a>{" "}
                  is the 501(c)(3) nonprofit behind UBC, which puts students from over 100
                  universities in front of companies like Coinbase, Solana, Polymarket, Gemini,
                  and Ledger. In two years, we&rsquo;ve helped more than 80 of them land jobs and
                  internships in frontier tech.
                </p>
                <p className="text-[#5A6B78] text-base leading-relaxed">
                  Some of them would rather build the company than join one. UBC alumni have gone
                  on to Y Combinator, a16z Speedrun, Alliance, and Colosseum. The Founder Stage
                  puts the next ones in front of the people who back young teams.
                </p>
              </div>
            </Reveal>

            <Reveal i={1}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/photos/panel.jpg"
                  alt="A panel at the University Blockchain Conference"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Grant ---------- */}
      <section id="grant" className="pt-20 sm:pt-28 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative bg-[#EC8644] rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={DOT_GRID} />
              <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 lg:items-center">
                <div>
                  <p className="text-white/80 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
                    The grant
                  </p>
                  <p
                    className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.85]"
                    style={{ fontSize: "clamp(72px, 11vw, 150px)" }}
                  >
                    $10,000
                  </p>
                  <p className="font-[var(--font-zuume)] font-black text-[#1A2A36] text-2xl sm:text-3xl tracking-tight mt-1">
                    You keep all your equity.
                  </p>
                </div>
                <div className="max-w-xl">
                  <p className="text-white text-base sm:text-lg leading-relaxed">
                    The USC VanEck Digital Assets Initiative and College.xyz are giving $10,000 to
                    one team. It&rsquo;s a grant, not an investment. The investors in the audience
                    pick the winner after the pitches.
                  </p>
                  <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-5 py-3.5 mt-7">
                    <a href={VEDA_URL} target="_blank" rel="noopener noreferrer" title="USC VanEck Digital Assets Initiative">
                      <Image
                        src={VEDA_LOGO}
                        alt="USC Marshall VanEck Digital Assets Initiative"
                        width={180}
                        height={79}
                        className="h-9 w-auto"
                        unoptimized
                      />
                    </a>
                    <span className="w-px h-7 bg-[#293C4B]/15" aria-hidden />
                    <a href={CXYZ_URL} target="_blank" rel="noopener noreferrer" title="College.xyz">
                      <Image src={CXYZ_LOGO} alt="College.xyz" width={1022} height={157} className="h-5 w-auto" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Who + what you get ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-4">
            <Reveal className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 sm:p-10">
                <Eyebrow>Who can apply</Eyebrow>
                <h2 className={`${H2} mb-6`} style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                  Around 20 founders. Not just crypto.
                </h2>
                <ul className="space-y-3 mb-8">
                  {CRITERIA.map((c) => (
                    <li key={c.title} className="flex items-start gap-3">
                      <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-[#EC8644] text-white shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <p className="text-[#5A6B78] text-[15px] leading-snug">
                        <span className="text-[#293C4B] font-semibold">{c.title}.</span> {c.body}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mb-3">
                  Two tracks, reviewed separately
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {TRACKS.map((t) => (
                    <div key={t.title} className={`rounded-2xl p-5 ${t.card}`}>
                      <h3 className="font-[var(--font-zuume)] font-black text-xl sm:text-2xl tracking-tight leading-none">
                        {t.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mt-2 ${t.muted}`}>{t.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal i={1} className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 sm:p-10">
                <Eyebrow>What you get</Eyebrow>
                <h2 className={`${H2} mb-4`} style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                  A room full of people who fund founders
                </h2>
                <ol className="divide-y divide-[#293C4B]/10">
                  {BENEFITS.map((b, i) => (
                    <li key={b.title} className="flex gap-5 py-4">
                      <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-xl tracking-tight w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[#293C4B] font-semibold">{b.title}</h3>
                        <p className="text-[#5A6B78] text-[15px] leading-relaxed mt-0.5">{b.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          {/* Logistics */}
          <Reveal className="mt-4">
            <div className="bg-white rounded-3xl grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#293C4B]/10">
              {LOGISTICS.map((l) => (
                <div key={l.label} className="flex gap-4 p-6 sm:p-7">
                  <l.Icon size={18} className="text-[#EC8644] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mb-1">
                      {l.label}
                    </p>
                    <p className="text-[#293C4B] text-sm font-medium leading-relaxed">{l.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Investors ---------- */}
      <section className="py-20 sm:py-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Who&rsquo;s in the room</Eyebrow>
            <h2 className={`${H2} mb-10`} style={{ fontSize: "clamp(30px, 3.6vw, 48px)" }}>
              Early investor commitments
            </h2>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-8">
              {INVESTORS.map((inv) => (
                <a
                  key={inv.name}
                  href={inv.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={inv.name}
                  className="group"
                >
                  <Image
                    src={inv.logo}
                    alt={inv.name}
                    width={200}
                    height={inv.h}
                    style={{ height: inv.h }}
                    className="w-auto mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-[#293C4B]/10 mt-12 pt-8">
              <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase">
                Plus UBC 2026 sponsors
              </p>
              {SPONSORS.map((sp) => (
                <Image
                  key={sp.name}
                  src={sp.logo}
                  alt={sp.name}
                  title={sp.name}
                  width={160}
                  height={sp.h}
                  style={{ height: sp.h }}
                  className="w-auto grayscale opacity-60"
                  unoptimized
                />
              ))}
            </div>
          </Reveal>
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
                    "radial-gradient(ellipse 60% 90% at 85% 15%, rgba(236,134,68,0.2) 0%, rgba(236,134,68,0) 70%)",
                }}
              />
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={DOT_GRID} />
              <div className="relative">
                <Eyebrow>Applications close Oct 25</Eyebrow>
                <h2
                  className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
                  style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
                >
                  Take the stage<span className="text-[#EC8644]">.</span>
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl mt-5">
                  Serious founders and builders only. We read applications as they come in, so
                  earlier is better. Know someone who should be up there? Refer them.
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

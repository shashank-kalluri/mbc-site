"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, FileText, CalendarDays, MapPin, Ticket, Timer } from "lucide-react";

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
    body: "You've raised initial capital from YC, Speedrun, or a venture firm. Show your product and raise your next round.",
  },
  {
    title: "Raising your first",
    body: "You're raising your first capital and ready to meet the investors who'll back you.",
  },
];

const BENEFITS = [
  { title: "A speaking slot", body: "Present to the investors, accelerators, and talent at UBC 2026." },
  { title: "A closed-door session", body: "After the event, with proven founders, investors, and accelerators." },
  { title: "Your deck to investors", body: "We share your materials directly with the investors in the room, if you opt in." },
  { title: "Referrals", body: "Intros to partner investors and accelerators." },
];

const LOGISTICS = [
  { Icon: Timer, label: "Applications close", value: "October 25 · reviewed on a rolling basis" },
  { Icon: CalendarDays, label: "When", value: "November 20–21, 2026 · Demo Day likely the 21st" },
  { Icon: MapPin, label: "Location", value: "AT&T Center @ The University of Texas at Austin" },
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
                <a href={CXYZ_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  College.xyz
                </a>{" "}
                · UBC 2026
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

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/80 text-base sm:text-lg mt-6"
          >
            The top team wins a{" "}
            <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-xl sm:text-[22px] tracking-tight">
              $10,000 grant
            </span>{" "}
            from{" "}
            <a href={VEDA_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
              USC VEDA
            </a>{" "}
            &amp;{" "}
            <a href={CXYZ_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
              College.xyz
            </a>
            .{" "}
            <a href="#grant" className="text-[#EC8644] underline underline-offset-4 decoration-[#EC8644]/40 hover:decoration-[#EC8644]">
              Details
            </a>
          </motion.p>

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

      {/* ---------- Why ---------- */}
      <section className="pt-16 sm:pt-24">
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
                  <a
                    href={CXYZ_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#293C4B] font-semibold underline decoration-[#EC8644]/50 decoration-2 underline-offset-4 hover:decoration-[#EC8644] transition-colors"
                  >
                    College.xyz
                  </a>{" "}
                  is a 501(c)(3) nonprofit working to close the gap between talented
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
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={PROGRAM_DOC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#293C4B] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#1A2A36] transition-colors"
                >
                  <FileText size={16} /> Read the full program
                </a>
                <a
                  href={CXYZ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#293C4B]/20 text-[#293C4B] text-sm font-semibold px-6 py-3 rounded-full hover:border-[#EC8644] hover:text-[#EC8644] transition-colors"
                >
                  About College.xyz <ArrowUpRight size={16} />
                </a>
              </div>
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

      {/* ---------- Grant ---------- */}
      <section id="grant" className="pt-16 sm:pt-24 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
              <h2
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95] max-w-lg"
                style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
              >
                <span className="text-[#EC8644]">$10,000</span> for the best team on stage
              </h2>
              <div className="max-w-xl">
                <p className="text-[#293C4B] text-lg leading-relaxed">
                  The{" "}
                  <a
                    href={VEDA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-[#EC8644] decoration-2 underline-offset-4 hover:text-[#EC8644] transition-colors"
                  >
                    USC VanEck Digital Assets Initiative
                  </a>{" "}
                  and{" "}
                  <a
                    href={CXYZ_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-[#EC8644] decoration-2 underline-offset-4 hover:text-[#EC8644] transition-colors"
                  >
                    College.xyz
                  </a>{" "}
                  are giving <span className="font-semibold text-[#EC8644]">$10,000</span> to one team.
                  It&rsquo;s a grant, not an investment, so you <span className="font-semibold">keep all your equity</span>.
                  The investors in the audience pick the winner after the pitches.
                </p>
                <div className="flex items-center gap-6 mt-7">
                  <a href={VEDA_URL} target="_blank" rel="noopener noreferrer" title="USC VanEck Digital Assets Initiative">
                    <Image
                      src={VEDA_LOGO}
                      alt="USC Marshall VanEck Digital Assets Initiative"
                      width={180}
                      height={79}
                      className="h-11 w-auto"
                      unoptimized
                    />
                  </a>
                  <a href={CXYZ_URL} target="_blank" rel="noopener noreferrer" title="College.xyz">
                    <Image
                      src={CXYZ_LOGO}
                      alt="College.xyz"
                      width={1022}
                      height={157}
                      className="h-6 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Who + what you get ---------- */}
      <section className="pt-16 sm:pt-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-4">
            <Reveal className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 sm:p-10">
                <Eyebrow>Who can apply</Eyebrow>
                <p className="text-[#5A6B78] text-[15px] leading-relaxed mb-5">
                  We&rsquo;ll pick around 20 founders. It&rsquo;s not crypto-specific.
                </p>
                <ul className="grid sm:grid-cols-3 gap-2 mb-8">
                  {CRITERIA.map((c) => (
                    <li key={c.title} className="rounded-2xl bg-[#F4F3EF] px-4 py-3">
                      <p className="text-[#293C4B] text-sm font-semibold">{c.title}</p>
                      <p className="text-[#5A6B78] text-[13px] leading-snug mt-0.5">{c.body}</p>
                    </li>
                  ))}
                </ul>
                <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mb-4">
                  Two tracks, reviewed separately
                </p>
                <div className="space-y-5">
                  {TRACKS.map((t) => (
                    <div key={t.title}>
                      <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl sm:text-2xl tracking-tight">
                        {t.title}
                      </h3>
                      <p className="text-[#5A6B78] text-[15px] leading-relaxed">{t.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal i={1} className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 sm:p-10">
                <Eyebrow>What you get</Eyebrow>
                <div className="space-y-5">
                  {BENEFITS.map((b) => (
                    <div key={b.title}>
                      <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl sm:text-2xl tracking-tight">
                        {b.title}
                      </h3>
                      <p className="text-[#5A6B78] text-[15px] leading-relaxed">{b.body}</p>
                    </div>
                  ))}
                  <div>
                    <h3 className="font-[var(--font-zuume)] font-black text-[#EC8644] text-xl sm:text-2xl tracking-tight">
                      A shot at $10,000
                    </h3>
                    <p className="text-[#5A6B78] text-[15px] leading-relaxed">
                      A non-dilutive grant from USC VEDA &amp; College.xyz for the top team.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Logistics ---------- */}
      <section className="pt-16 sm:pt-24">
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

      {/* ---------- Investors ---------- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Who&rsquo;s in the room</Eyebrow>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95] mb-8"
                style={{ fontSize: "clamp(30px, 3.6vw, 48px)" }}
            >
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

            <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mt-12 mb-5">
              Plus UBC 2026 sponsors
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
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

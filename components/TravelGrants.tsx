"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Check,
  X,
  Plane,
  Users,
  Wallet,
  CalendarClock,
} from "lucide-react";
import FAQ from "@/components/FAQ";

/** Travel Grant Program application. Closes November 13, 2026. */
const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfU24E5OEqGPJk4dE6_Uonv9Ouoellm5-3NFAozIzpwOi6EfA/viewform";
/** Full write-up: tiers, referrals, reimbursement, and fine print. */
const PROGRAM_DOC =
  "https://docs.google.com/document/d/1CSF9Ke9l7cx5l7_44koVhXQcmsfsX4uq_rHFrDxuVZE/edit?usp=sharing";
const TICKETS_URL = "https://luma.com/n4ad0k9m";
const CONTACT = "mailto:uniblockchainconferences@gmail.com?subject=UBC%202026%20Travel%20Grant";

const TIERS = [
  {
    label: "Domestic",
    blurb: "Traveling to Austin from anywhere in the US, Canada, or Mexico.",
    max: "$250",
    base: "$150",
    bonus: "+$100",
  },
  {
    label: "International",
    blurb: "Verified as traveling from outside the US, Canada, or Mexico.",
    max: "$500",
    base: "$150",
    bonus: "+$350",
    highlight: true,
  },
];

const ELIGIBLE = [
  "Flights",
  "Train or bus tickets",
  "Hotel or other paid lodging",
  "Gas, if you drive to Austin",
];

const NOT_ELIGIBLE = [
  "Food and meals",
  "Uber, Lyft, taxis, and other rides inside Austin, including to and from the airport",
  "Entertainment and personal expenses",
  "Anything unrelated to getting to Austin or staying there during UBC",
];

const REFERRAL_RULES = [
  "The person registers and names you on the Luma registration form",
  "They are a currently enrolled student with a valid university email",
  "They check in on-site at UBC 2026",
  "You check in on-site at UBC 2026",
  "They list only your name in the referral section",
];

const REFERRAL_REWARDS = [
  { count: "3–5 referrals", reward: "$25" },
  { count: "6–9 referrals", reward: "$50" },
  { count: "10+ referrals", reward: "$100" },
  { count: "Top referrer", reward: "$350", highlight: true },
];

const STEPS: { n: string; title: string; body: string; link?: { href: string; label: string } }[] = [
  {
    n: "01",
    title: "Buy a student ticket",
    body: "Register for UBC 2026 on Luma. A ticket is required to be eligible for a grant.",
    link: { href: TICKETS_URL, label: "Get your ticket" },
  },
  {
    n: "02",
    title: "Submit the application",
    body: "Fill out the Travel Grant Program Application by November 13, 2026. Grants are not competitive, so everyone who applies on time and meets the requirements is eligible.",
  },
  {
    n: "03",
    title: "Show up and check in",
    body: "Check in on-site on Day 1 or Day 2. On-site check-in is what verifies your attendance.",
  },
  {
    n: "04",
    title: "Send us your receipts",
    body: "After the conference we email a reimbursement form. Submit your flight itineraries and lodging receipts by December 12, 2026.",
  },
];

const TIMELINE = [
  { date: "TBA", event: "Registration and the Travel Grant Form go live" },
  { date: "TBA", event: "Last day to register a hackathon team" },
  { date: "TBA", event: "Franklin Templeton Research Competition submissions close" },
  {
    date: "November 13, 2026",
    event:
      "Registration and referral window close. You can still register for UBC after this date, but you will not be eligible for a travel grant and the registration will not count toward referral rewards",
    key: true,
  },
  { date: "November 20–21, 2026", event: "UBC 2026 at UT Austin. Check in either day", key: true },
  { date: "December 12, 2026", event: "Travel and hotel reimbursement form due, with receipts" },
  { date: "By January 21, 2027", event: "Grants paid, within 60 days of the conference" },
];

const RULES = [
  ["You must check in on-site.", "Check in on Day 1 or Day 2 of the conference to verify attendance."],
  ["No self-referrals.", "You cannot refer yourself, including with an email you control."],
  [
    "One person, one registration.",
    "Duplicate registrations under multiple emails will be voided, and voided registrations do not count toward the referral program.",
  ],
  [
    "One referrer per attendee.",
    "Each attendee may credit one referrer. The referrer recorded at registration is final and cannot be changed after the referral deadline.",
  ],
  [
    "Genuine submissions only.",
    "Hackathon and research competition credit requires a valid, complete entry. Requirements and guidelines are released before each competition starts.",
  ],
  [
    "Documentation is required.",
    "Grants only reimburse eligible documented expenses, up to your applicable maximum.",
  ],
  [
    "Eligible expenses are limited to travel and lodging.",
    "Flights, trains, buses, hotels, and applicable gas expenses count. Food, local transportation within Austin, entertainment, and other miscellaneous expenses do not.",
  ],
  [
    "Caps are firm.",
    "Reimbursements are capped at $250 domestic and $500 international. Referral rewards are on top of these caps.",
  ],
  [
    "Budget.",
    "UBC reserves the right to prorate or close the program if applications exceed the budget.",
  ],
  [
    "Referrals can be voided.",
    "Organizers reserve the right to void referrals that violate or fail to meet the rules.",
  ],
];

export const travelGrantFaq = [
  {
    question: "Do I have to pay for a ticket?",
    answer:
      "Yes. You must purchase a student ticket via Luma and submit the Travel Grant Application by November 13 to be eligible for a travel grant.",
  },
  {
    question: "Do I automatically receive the full grant amount I qualify for?",
    answer:
      "No. The amounts listed are maximum reimbursements. After the conference you submit documentation of your eligible travel and lodging expenses, and you receive the lesser of your eligible expenses or your maximum grant amount.",
  },
  {
    question: "If I refer 10 people, will I be paid $100?",
    answer:
      "No. Referral rewards are incremental additions to your maximum travel grant cap. They are only paid out if you have eligible expenses to cover on top of your base grant.",
  },
  {
    question: "What expenses can I submit?",
    answer:
      "Flights, train or bus tickets, hotels or other paid lodging, and applicable gas expenses if you drive to Austin. Food, rides within Austin including trips to and from the airport, and other miscellaneous expenses are not eligible.",
  },
  {
    question: "Can I drive to UBC?",
    answer:
      "Yes. Grants are based on where you are traveling from, not how you get here. If you're traveling to Austin from another part of the US, you can qualify for the domestic tier, and you can submit your gas expenses on the reimbursement form afterward. Students traveling from within the Austin metro area, including UT Austin students, are not eligible for a travel grant.",
  },
  {
    question: "Can I participate in both the research competition and the hackathon?",
    answer:
      "Of course. You only need to participate in one competition to be eligible for the maximum grant tier, but you're encouraged to enter as many as you're interested in.",
  },
  {
    question: "I'm an international student at a US university. Which tier am I?",
    answer:
      "Whichever one matches your trip itinerary. If you're flying to Austin from your US campus, you're domestic. If you're flying in from outside the US, you're international.",
  },
  {
    question: "Can I get the referral bonus without competing in anything?",
    answer:
      "Yes. Referral rewards are independent of competition participation. You and your qualifying referrals still need to meet the referral program requirements.",
  },
  {
    question: "Can I refer someone who goes to a different university from mine?",
    answer: "Yes. Students can refer students from other universities.",
  },
  {
    question: "What if the person I refer does not attend UBC?",
    answer:
      "The referral will not be counted. Qualified referrals require an on-site check-in by the attendee.",
  },
  {
    question: "Does referring someone reduce their grant?",
    answer:
      "No. Being referred does not reduce a student's travel grant. The referred student stays eligible for their own full grant, and the referrer earns any applicable referral reward separately.",
  },
  {
    question: "What if I'm not sure I can afford to get there even with the grant?",
    answer:
      "Email us at uniblockchainconferences@gmail.com. Our goal is to make UBC accessible to everyone, regardless of financial background.",
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
      viewport={{ once: true, amount: 0.2 }}
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
      style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
    >
      {children}
    </h2>
  );
}

export default function TravelGrants() {
  return (
    <div className="bg-[#F4F3EF] overflow-x-hidden">
      {/* ---------- Hero ---------- */}
      <section className="relative bg-[#1A2A36] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 80% 10%, rgba(236,134,68,0.20) 0%, rgba(236,134,68,0) 70%)",
          }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-14 sm:pt-44 sm:pb-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-end">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-[2px] bg-[#EC8644]" />
                  <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                    UBC 2026 · Resources
                  </span>
                </div>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.88] max-w-4xl"
                style={{ fontSize: "clamp(46px, 8.5vw, 116px)" }}
              >
                Travel
                <br />
                Grants
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mt-7"
              >
                Cost shouldn&rsquo;t decide who gets to attend UBC. Eligible students traveling to
                Austin can be reimbursed for travel and lodging. Grants are not competitive: if you
                apply by the deadline and meet the requirements, you&rsquo;re eligible.
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
                  Apply for a grant <ArrowUpRight size={17} />
                </a>
                <a
                  href={PROGRAM_DOC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-white text-[#293C4B] text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-black/20"
                >
                  <FileText size={17} /> Full program doc
                </a>
                <a
                  href={TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 whitespace-nowrap bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/20 hover:border-white/60 transition-colors"
                >
                  Get a ticket
                </a>
              </motion.div>

              <motion.p
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-white/35 text-[11px] sm:text-xs tracking-[0.2em] uppercase mt-9"
              >
                Applications close November 13, 2026
              </motion.p>
            </div>

            {/* Headline numbers */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 lg:grid-cols-1 gap-3 w-full lg:w-[280px]"
            >
              {TIERS.map((t) => (
                <div
                  key={t.label}
                  className={`rounded-2xl p-5 sm:p-6 border ${
                    t.highlight
                      ? "bg-[#EC8644]/10 border-[#EC8644]/30"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <p className="text-white/40 text-[11px] font-medium tracking-[0.18em] uppercase">
                    {t.label}
                  </p>
                  <p
                    className={`font-[var(--font-zuume)] font-black tracking-tight leading-none mt-2 ${
                      t.highlight ? "text-[#EC8644]" : "text-white"
                    }`}
                    style={{ fontSize: "clamp(34px, 5vw, 48px)" }}
                  >
                    {t.max}
                  </p>
                  <p className="text-white/45 text-xs leading-relaxed mt-2">up to, per student</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- How much you can get ---------- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>How much</Eyebrow>
            <SectionTitle>What you can get back</SectionTitle>
            <p className="text-[#5A6B78] text-base leading-relaxed max-w-2xl mt-5">
              Your maximum is based on where you&rsquo;re traveling from and whether you enter one
              of our competitions. Every student traveling from outside the Austin area qualifies
              for the domestic tier by default.
            </p>
          </Reveal>

          {/* Tier matrix */}
          <Reveal i={1} className="mt-10">
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="grid grid-cols-[1.6fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr]">
                {/* Header row */}
                <div className="p-4 sm:p-6 border-b border-[#293C4B]/8">
                  <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase">
                    What you do
                  </p>
                </div>
                <div className="p-4 sm:p-6 border-b border-l border-[#293C4B]/8 text-center">
                  <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase">
                    Domestic
                  </p>
                </div>
                <div className="p-4 sm:p-6 border-b border-l border-[#293C4B]/8 text-center bg-[#EC8644]/5">
                  <p className="text-[#EC8644] text-[11px] font-medium tracking-[0.18em] uppercase">
                    International
                  </p>
                </div>

                {/* Attend */}
                <div className="p-4 sm:p-6 border-b border-[#293C4B]/8">
                  <p className="text-[#293C4B] text-sm sm:text-base font-semibold">
                    Attend and check in
                  </p>
                </div>
                <div className="p-4 sm:p-6 border-b border-l border-[#293C4B]/8 flex items-center justify-center">
                  <span className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl sm:text-3xl tracking-tight">
                    $150
                  </span>
                </div>
                <div className="p-4 sm:p-6 border-b border-l border-[#293C4B]/8 bg-[#EC8644]/5 flex items-center justify-center">
                  <span className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl sm:text-3xl tracking-tight">
                    $150
                  </span>
                </div>

                {/* Compete */}
                <div className="p-4 sm:p-6 border-b border-[#293C4B]/8">
                  <p className="text-[#293C4B] text-sm sm:text-base font-semibold">
                    Submit a qualifying entry
                  </p>
                  <p className="text-[#9CADB7] text-xs sm:text-sm mt-1">
                    Research competition or hackathon
                  </p>
                </div>
                <div className="p-4 sm:p-6 border-b border-l border-[#293C4B]/8 flex items-center justify-center">
                  <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-2xl sm:text-3xl tracking-tight">
                    +$100
                  </span>
                </div>
                <div className="p-4 sm:p-6 border-b border-l border-[#293C4B]/8 bg-[#EC8644]/5 flex items-center justify-center">
                  <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-2xl sm:text-3xl tracking-tight">
                    +$350
                  </span>
                </div>

                {/* Max */}
                <div className="p-4 sm:p-6 bg-[#293C4B]">
                  <p className="text-white text-sm sm:text-base font-semibold">Maximum grant</p>
                </div>
                <div className="p-4 sm:p-6 border-l border-white/10 bg-[#293C4B] flex items-center justify-center">
                  <span className="font-[var(--font-zuume)] font-black text-white text-2xl sm:text-3xl tracking-tight">
                    $250
                  </span>
                </div>
                <div className="p-4 sm:p-6 border-l border-white/10 bg-[#293C4B] flex items-center justify-center">
                  <span className="font-[var(--font-zuume)] font-black text-[#EC8644] text-2xl sm:text-3xl tracking-tight">
                    $500
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tier definitions */}
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {TIERS.map((t, i) => (
              <Reveal key={t.label} i={i}>
                <div className="h-full bg-white rounded-2xl p-6 sm:p-7">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Plane size={16} className="text-[#EC8644]" />
                    <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase">
                      {t.label}
                    </p>
                  </div>
                  <p className="text-[#293C4B] text-sm leading-relaxed">{t.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it's calculated ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-[#1A2A36] rounded-3xl p-8 sm:p-12 lg:p-14">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-6 h-[2px] bg-[#EC8644]" />
                <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                  How it&rsquo;s calculated
                </span>
              </div>
              <h2
                className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.95] max-w-3xl"
                style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
              >
                You&rsquo;re paid the lesser of your expenses or your cap
              </h2>
              <p className="text-white/55 text-base leading-relaxed max-w-2xl mt-5">
                After the conference, every applicant gets a reimbursement form for their travel and
                lodging documentation. If you qualify for a $250 maximum but have $180 in eligible
                expenses, you receive $180.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              <Reveal>
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7">
                  <p className="text-[#EC8644] text-[11px] font-medium tracking-[0.18em] uppercase mb-5">
                    Eligible
                  </p>
                  <ul className="space-y-3">
                    {ELIGIBLE.map((e) => (
                      <li key={e} className="flex items-start gap-3">
                        <Check size={16} className="text-[#EC8644] mt-0.5 shrink-0" />
                        <span className="text-white/75 text-sm leading-relaxed">{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal i={1}>
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7">
                  <p className="text-white/35 text-[11px] font-medium tracking-[0.18em] uppercase mb-5">
                    Not eligible
                  </p>
                  <ul className="space-y-3">
                    {NOT_ELIGIBLE.map((e) => (
                      <li key={e} className="flex items-start gap-3">
                        <X size={16} className="text-white/25 mt-0.5 shrink-0" />
                        <span className="text-white/40 text-sm leading-relaxed">{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal i={2}>
              <div className="flex items-start gap-3 mt-8 pt-8 border-t border-white/10">
                <Wallet size={18} className="text-[#EC8644] mt-0.5 shrink-0" />
                <p className="text-white/45 text-sm leading-relaxed">
                  Grants and referral rewards are denominated in USD and paid in USDC to the Solana
                  wallet address you submit on your application.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- How to apply ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>How to apply</Eyebrow>
            <SectionTitle>Four steps</SectionTitle>
          </Reveal>
          <div className="mt-8 border-t border-[#293C4B]/10">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} i={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8 py-6 sm:py-7 border-b border-[#293C4B]/10 hover:bg-white/60 transition-colors sm:px-2">
                  <span className="text-[#EC8644] font-[var(--font-zuume)] font-black text-base w-8 shrink-0">
                    {s.n}
                  </span>
                  <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl sm:text-2xl tracking-tight sm:w-72 shrink-0">
                    {s.title}
                  </h3>
                  <div>
                    <p className="text-[#5A6B78] text-[15px] leading-relaxed">{s.body}</p>
                    {s.link && (
                      <a
                        href={s.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[#EC8644] text-sm font-medium hover:underline"
                      >
                        {s.link.label} <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal i={2}>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-8 bg-[#293C4B] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#1A2A36] transition-colors"
            >
              Open the application <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------- Referrals ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                <div>
                  <Eyebrow>Referrals</Eyebrow>
                  <SectionTitle>Bring your friends, raise your cap</SectionTitle>
                  <p className="text-[#5A6B78] text-base leading-relaxed mt-5">
                    Referral rewards stack on top of your existing maximum. If you qualify for $250
                    and refer four people, you can be reimbursed up to $275.
                  </p>

                  <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase mt-9 mb-4">
                    A qualified referral
                  </p>
                  <ul className="space-y-3">
                    {REFERRAL_RULES.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <Check size={16} className="text-[#EC8644] mt-0.5 shrink-0" />
                        <span className="text-[#293C4B] text-sm leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:pt-2">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Users size={16} className="text-[#EC8644]" />
                    <p className="text-[#9CADB7] text-[11px] font-medium tracking-[0.18em] uppercase">
                      Rewards
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#293C4B]/10 overflow-hidden">
                    {REFERRAL_REWARDS.map((r, i) => (
                      <div
                        key={r.count}
                        className={`flex items-center justify-between gap-4 px-5 sm:px-7 py-5 ${
                          i > 0 ? "border-t border-[#293C4B]/10" : ""
                        } ${r.highlight ? "bg-[#293C4B]" : "bg-[#F4F3EF]"}`}
                      >
                        <span
                          className={`text-sm font-semibold ${
                            r.highlight ? "text-white" : "text-[#293C4B]"
                          }`}
                        >
                          {r.count}
                        </span>
                        <span
                          className={`font-[var(--font-zuume)] font-black text-2xl sm:text-3xl tracking-tight ${
                            r.highlight ? "text-[#EC8644]" : "text-[#293C4B]"
                          }`}
                        >
                          {r.reward}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#9CADB7] text-xs leading-relaxed mt-4">
                    Rewards are paid only against eligible expenses on top of your base grant, and
                    the referral window closes November 13, 2026.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Timeline</Eyebrow>
            <SectionTitle>Dates that matter</SectionTitle>
          </Reveal>
          <div className="mt-8 border-t border-[#293C4B]/10">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.event} i={Math.min(i, 4)}>
                <div className="flex flex-col sm:flex-row sm:gap-8 gap-1 py-5 sm:py-6 border-b border-[#293C4B]/10 sm:px-2">
                  <div className="sm:w-56 shrink-0 flex items-center gap-2.5">
                    <CalendarClock
                      size={15}
                      className={t.key ? "text-[#EC8644]" : "text-[#9CADB7]"}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        t.key ? "text-[#EC8644]" : "text-[#9CADB7]"
                      }`}
                    >
                      {t.date}
                    </span>
                  </div>
                  <p className="text-[#293C4B] text-[15px] leading-relaxed sm:pl-0 pl-[25px]">
                    {t.event}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Fine print ---------- */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Fine print</Eyebrow>
            <SectionTitle>Rules</SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 mt-8">
            {RULES.map(([title, body], i) => (
              <Reveal key={title} i={Math.min(i, 4)}>
                <p className="text-[15px] leading-relaxed">
                  <span className="text-[#293C4B] font-semibold">{title}</span>{" "}
                  <span className="text-[#5A6B78]">{body}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <FAQ items={travelGrantFaq} />

      {/* ---------- CTA ---------- */}
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
                    Apply by November 13
                  </span>
                </div>
                <h2
                  className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.92] max-w-3xl"
                  style={{ fontSize: "clamp(32px, 4.8vw, 62px)" }}
                >
                  We&rsquo;ll help you get here
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-2xl mt-5">
                  Still not sure you can make the trip work? Email us. We want UBC to be reachable
                  for every student who wants to be in the room.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-9">
                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25"
                  >
                    Apply for a grant <ArrowUpRight size={17} />
                  </a>
                  <a
                    href={PROGRAM_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-white text-[#293C4B] text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/90 transition-colors"
                  >
                    <FileText size={17} /> Full program doc
                  </a>
                  <a
                    href={CONTACT}
                    className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-white/10 text-white text-sm sm:text-base font-semibold border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/20 hover:border-white/60 transition-colors"
                  >
                    Email us
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

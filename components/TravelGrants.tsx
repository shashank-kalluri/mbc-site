"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, FileText, Plane, Users, Wallet, X } from "lucide-react";
import FAQ from "@/components/FAQ";
import { Polaroid, Sticker, Ticker } from "@/components/Scrapbook";

/** Travel Grant Program application. Closes November 13, 2026. */
const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfU24E5OEqGPJk4dE6_Uonv9Ouoellm5-3NFAozIzpwOi6EfA/viewform";
/** Full write-up: tiers, referrals, reimbursement, and fine print. */
const PROGRAM_DOC =
  "https://docs.google.com/document/d/1CSF9Ke9l7cx5l7_44koVhXQcmsfsX4uq_rHFrDxuVZE/edit?usp=sharing";
const TICKETS_URL = "https://luma.com/n4ad0k9m";
/** UBC 2025. The venue mid-conference, and students trading contacts. */
const HERO_IMAGE = "/photos/atrium.jpg";
const REFERRAL_IMAGE = "/photos/swapping-contacts.jpg";
const CONTACT = "mailto:uniblockchainconferences@gmail.com?subject=UBC%202026%20Travel%20Grant";

const TICKER = ["Flights", "Trains", "Buses", "Hotels", "Gas money", "Paid in USDC", "Apply by Nov 13"];

const TIERS = [
  {
    label: "Domestic",
    from: "USA · CAN · MEX",
    blurb: "Traveling to Austin from anywhere in the US, Canada, or Mexico.",
    max: "$250",
    base: "$150",
    bonus: "+$100",
    tilt: -1.5,
  },
  {
    label: "International",
    from: "Anywhere",
    blurb: "Verified as traveling from outside the US, Canada, or Mexico.",
    max: "$500",
    base: "$150",
    bonus: "+$350",
    highlight: true,
    tilt: 1.5,
  },
];

const ELIGIBLE = ["Flights", "Train or bus tickets", "Hotels and paid lodging", "Gas, if you drive"];

const NOT_ELIGIBLE = ["Food", "Rides inside Austin, airport included", "Entertainment", "Other personal expenses"];

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

const STEPS: {
  title: string;
  body: string;
  link?: { href: string; label: string };
  card: string;
  muted: string;
  tilt: number;
}[] = [
  {
    title: "Grab a student ticket",
    body: "Register for UBC 2026 on Luma. You need a ticket to be eligible.",
    link: { href: TICKETS_URL, label: "Get your ticket" },
    card: "bg-[#EC8644] text-white",
    muted: "text-white/80",
    tilt: -1.5,
  },
  {
    title: "Apply by Nov 13",
    body: "Grants aren't competitive. Apply on time, meet the requirements, and you're eligible.",
    link: { href: APPLY_URL, label: "Open the application" },
    card: "bg-[#1A2A36] text-white",
    muted: "text-white/60",
    tilt: 1.5,
  },
  {
    title: "Show up and check in",
    body: "Check in on-site on Day 1 or Day 2. That's how we verify you were there.",
    card: "bg-white text-[#293C4B]",
    muted: "text-[#5A6B78]",
    tilt: -1,
  },
  {
    title: "Send your receipts",
    body: "We email a reimbursement form after the conference. Upload itineraries and receipts by Dec 12.",
    card: "bg-[#9CADB7] text-[#1A2A36]",
    muted: "text-[#1A2A36]/70",
    tilt: 1,
  },
];

const TIMELINE = [
  { date: "Sep 1", title: "Applications open", note: "Registration and the grant form go live." },
  {
    date: "Nov 13",
    title: "Last day to apply",
    note: "Referrals close too. You can still register later, but won't be eligible for a grant.",
    key: true,
  },
  { date: "Nov 20–21", title: "UBC 2026", note: "Check in at UT Austin on either day.", key: true },
  { date: "Dec 12", title: "Receipts due", note: "Travel and lodging receipts on the reimbursement form." },
  { date: "Jan 21", title: "You get paid", note: "Grants go out within 60 days of the conference." },
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
    question: "What can get a grant or referral voided?",
    answer:
      "Registering more than once under different emails, referring yourself (including with another email you control), or entering the hackathon or research competition without a valid, complete submission. Each attendee can credit one referrer, and the referrer recorded at registration is final after the referral deadline. Organizers can void referrals that break or don't meet the rules.",
    link: { href: PROGRAM_DOC, label: "Full program doc" },
  },
  {
    question: "Is the funding guaranteed?",
    answer:
      "Grants aren't competitive, but the budget is fixed. If applications exceed it, UBC may prorate grants or close the program early.",
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

function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`font-[var(--font-zuume)] font-black tracking-tight leading-[0.95] ${
        light ? "text-white" : "text-[#293C4B]"
      }`}
      style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}
    >
      {children}
    </h2>
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
    </div>
  );
}

/** A grant tier drawn as a boarding pass: route on top, perforation, then
 *  how the maximum adds up. */
function BoardingPass({ tier }: { tier: (typeof TIERS)[number] }) {
  const reduce = useReducedMotion();
  const orange = tier.highlight;
  const faint = orange ? "text-white/70" : "text-[#9CADB7]";
  const body = orange ? "text-white/85" : "text-[#5A6B78]";
  const rule = orange ? "border-white/35" : "border-[#293C4B]/15";

  return (
    <motion.div
      initial={{ rotate: tier.tilt }}
      whileHover={reduce ? undefined : { rotate: 0, y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`relative h-full rounded-3xl overflow-hidden shadow-[0_24px_48px_-30px_rgba(26,42,54,0.5)] ${
        orange ? "bg-[#EC8644] text-white" : "bg-white text-[#293C4B]"
      }`}
    >
      <div className="p-7 sm:p-9">
        <div className={`flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] uppercase ${faint}`}>
          <span>Travel grant · {tier.label}</span>
          <span className="hidden sm:inline">UBC 2026</span>
        </div>

        <div className="flex items-end gap-3 sm:gap-4 mt-7">
          <div className="min-w-0">
            <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${faint}`}>From</p>
            <p className="font-[var(--font-zuume)] font-black text-xl sm:text-3xl tracking-tight leading-none mt-1.5 whitespace-nowrap">
              {tier.from}
            </p>
          </div>
          <div className="flex-1 flex items-center gap-2 pb-1.5 min-w-8">
            <span className={`flex-1 border-t-2 border-dashed ${rule}`} />
            <Plane size={18} className="shrink-0" />
          </div>
          <div className="text-right">
            <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${faint}`}>To</p>
            <p className="font-[var(--font-zuume)] font-black text-xl sm:text-3xl tracking-tight leading-none mt-1.5">
              AUS
            </p>
          </div>
        </div>
        <p className={`text-sm leading-relaxed mt-5 ${body}`}>{tier.blurb}</p>
      </div>

      {/* Perforation, with a notch punched out of each edge */}
      <div className="relative">
        <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#F4F3EF]" />
        <span className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#F4F3EF]" />
        <div className={`mx-7 sm:mx-9 border-t-2 border-dashed ${rule}`} />
      </div>

      <div className="p-7 sm:p-9 flex flex-col-reverse gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-baseline gap-3">
            <span className="font-[var(--font-zuume)] font-black text-lg tracking-tight w-14 shrink-0">
              {tier.base}
            </span>
            <span className={body}>Attend and check in</span>
          </li>
          <li className="flex items-baseline gap-3">
            <span
              className={`font-[var(--font-zuume)] font-black text-lg tracking-tight w-14 shrink-0 ${
                orange ? "text-[#1A2A36]" : "text-[#EC8644]"
              }`}
            >
              {tier.bonus}
            </span>
            <span className={body}>Enter the hackathon or research comp</span>
          </li>
        </ul>
        <div className="sm:text-right shrink-0">
          <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${faint}`}>Up to</p>
          <p
            className="font-[var(--font-zuume)] font-black tracking-tight leading-none mt-1"
            style={{ fontSize: "clamp(44px, 5.5vw, 76px)" }}
          >
            {tier.max}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TravelGrants() {
  const reduce = useReducedMotion();

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
            className="object-cover object-center opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,42,54,0.7) 0%, rgba(26,42,54,0.8) 45%, rgba(26,42,54,0.96) 85%, #1A2A36 100%)",
            }}
          />
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
                    We&rsquo;ll help you get here
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
                Travel
                <br />
                <span className="text-[#EC8644]">Grants</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mt-7"
              >
                Cost shouldn&rsquo;t decide who gets to come to UBC. If you&rsquo;re traveling to
                Austin, we&rsquo;ll pay you back for flights, trains, and hotels. It&rsquo;s not a
                competition: apply on time, meet the requirements, and you&rsquo;re in.
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
                Applications close November 13, 2026
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140, damping: 12 }}
              className="absolute right-5 bottom-1 sm:right-10 sm:bottom-0 lg:static lg:mb-6"
            >
              <Sticker rim="FLIGHTS ✦ TRAINS ✦ HOTELS ✦ GAS ✦ " value="$500" label="max grant" />
            </motion.div>
          </div>
        </div>
      </section>

      <Ticker items={TICKER} className="z-10 -mt-7" />

      {/* ---------- How much ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>How much</Eyebrow>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <SectionTitle>Your ticket to Austin</SectionTitle>
              <p className="text-[#5A6B78] text-[15px] leading-relaxed max-w-sm">
                Your max depends on where you&rsquo;re coming from and whether you enter one of
                our competitions.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {TIERS.map((t, i) => (
              <Reveal key={t.label} i={i} className="h-full">
                <BoardingPass tier={t} />
              </Reveal>
            ))}
          </div>
          <Reveal i={2}>
            <p className="text-[#9CADB7] text-[13px] leading-relaxed mt-6">
              Students from the Austin area, including UT Austin, aren&rsquo;t eligible.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- How it's calculated ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative bg-[#1A2A36] rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 90% at 90% 10%, rgba(236,134,68,0.18) 0%, rgba(236,134,68,0) 70%)",
                }}
              />
              <div className="relative grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
                <div>
                  <Eyebrow>How it works</Eyebrow>
                  <SectionTitle light>
                    You spend it,
                    <br />
                    <span className="text-[#EC8644]">we pay it back.</span>
                  </SectionTitle>
                  <p className="text-white/55 text-base leading-relaxed max-w-md mt-5">
                    You get back whatever you spend on eligible travel, up to your cap. Qualify
                    for $250 but spend $180? You get $180.
                  </p>
                  <div className="flex items-start gap-3 mt-8">
                    <Wallet size={18} className="text-[#EC8644] mt-0.5 shrink-0" />
                    <p className="text-white/45 text-sm leading-relaxed max-w-md">
                      Paid in USDC to the Solana wallet address on your application.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-[#EC8644] text-[11px] font-semibold tracking-[0.18em] uppercase mb-4">
                      Counts
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {ELIGIBLE.map((e) => (
                        <span
                          key={e}
                          className="inline-flex items-center gap-2 rounded-full bg-white text-[#293C4B] text-sm font-semibold px-4 py-2"
                        >
                          <Check size={15} strokeWidth={3} className="text-[#EC8644]" /> {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white/35 text-[11px] font-semibold tracking-[0.18em] uppercase mb-4">
                      Doesn&rsquo;t count
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {NOT_ELIGIBLE.map((e) => (
                        <span
                          key={e}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white/45 text-sm px-4 py-2"
                        >
                          <X size={15} className="text-white/30" />
                          <span className="line-through decoration-white/25">{e}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- How to apply ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>How to apply</Eyebrow>
            <div className="mb-10">
              <SectionTitle>Four steps, then pack</SectionTitle>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} i={i} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -8, rotate: s.tilt }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`h-full rounded-3xl p-7 flex flex-col ${s.card}`}
                >
                  <span className="font-[var(--font-zuume)] font-black text-5xl tracking-tight leading-none opacity-90 mb-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[var(--font-zuume)] font-black text-2xl sm:text-[28px] tracking-tight leading-[0.95]">
                    {s.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mt-3 ${s.muted}`}>{s.body}</p>
                  {s.link && (
                    <a
                      href={s.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      {s.link.label} <ArrowUpRight size={15} />
                    </a>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Referrals ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-[#1A2A36]">
              <Image
                src={REFERRAL_IMAGE}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center opacity-[0.55]"
              />
              {/* Heavy enough on the left to carry the headline, light on the
                  right so the room behind it still reads. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, rgba(26,42,54,0.94) 0%, rgba(26,42,54,0.82) 42%, rgba(26,42,54,0.5) 100%)",
                }}
              />
              <div className="relative p-8 sm:p-12 lg:p-14">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                  <div>
                    <Eyebrow>Referrals</Eyebrow>
                    <SectionTitle light>
                      Bring friends,
                      <br />
                      <span className="text-[#EC8644]">raise your cap.</span>
                    </SectionTitle>
                    <p className="text-white/55 text-base leading-relaxed mt-5">
                      Referral rewards stack on top of your max. Qualify for $250 and refer four
                      people? You can be paid back up to $275.
                    </p>

                    <p className="text-white/50 text-[11px] font-medium tracking-[0.18em] uppercase mt-9 mb-4">
                      A referral counts when
                    </p>
                    <ul className="space-y-3">
                      {REFERRAL_RULES.map((r) => (
                        <li key={r} className="flex items-start gap-3">
                          <Check size={16} className="text-[#EC8644] mt-0.5 shrink-0" />
                          <span className="text-white/75 text-sm leading-relaxed">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:pt-2">
                    <div className="flex items-center gap-2.5 mb-5">
                      <Users size={16} className="text-[#EC8644]" />
                      <p className="text-white/35 text-[11px] font-medium tracking-[0.18em] uppercase">
                        Rewards
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {REFERRAL_REWARDS.map((r, i) => (
                        <motion.div
                          key={r.count}
                          initial={{ rotate: i % 2 ? 1.5 : -1.5 }}
                          whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18 }}
                          className={`rounded-2xl p-5 sm:p-6 ${
                            r.highlight
                              ? "bg-[#EC8644] text-white"
                              : "bg-white/[0.08] border border-white/15 backdrop-blur-md text-white"
                          }`}
                        >
                          <p
                            className="font-[var(--font-zuume)] font-black tracking-tight leading-none"
                            style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}
                          >
                            {r.reward}
                          </p>
                          <p
                            className={`text-xs font-semibold tracking-[0.12em] uppercase mt-2 ${
                              r.highlight ? "text-white/85" : "text-white/55"
                            }`}
                          >
                            {r.count}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-white/55 text-xs leading-relaxed mt-5">
                      Rewards are paid only against eligible expenses on top of your base grant.
                      The referral window closes November 13, 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="pt-20 sm:pt-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow>Timeline</Eyebrow>
            <div className="mb-12">
              <SectionTitle>Dates that matter</SectionTitle>
            </div>
          </Reveal>

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
            {/* Connector: vertical on mobile, horizontal on desktop */}
            <span
              aria-hidden
              className="absolute left-[9px] top-2 bottom-2 border-l-2 border-dashed border-[#293C4B]/15 lg:left-2 lg:right-2 lg:top-[9px] lg:bottom-auto lg:border-l-0 lg:border-t-2"
            />
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="relative pl-10 lg:pl-0 lg:pt-10"
              >
                <span
                  className={`absolute left-0 top-0 w-5 h-5 rounded-full border-[3px] ${
                    t.key
                      ? "bg-[#EC8644] border-[#EC8644] shadow-[0_0_0_6px_rgba(236,134,68,0.18)]"
                      : "bg-[#F4F3EF] border-[#293C4B]"
                  }`}
                />
                <p
                  className={`font-[var(--font-zuume)] font-black text-3xl sm:text-4xl tracking-tight leading-none ${
                    t.key ? "text-[#EC8644]" : "text-[#293C4B]"
                  }`}
                >
                  {t.date}
                </p>
                <p className="text-[#293C4B] font-semibold mt-2">{t.title}</p>
                <p className="text-[#5A6B78] text-sm leading-relaxed mt-1">{t.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

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
              <div className="relative grid lg:grid-cols-[1fr_auto] items-center gap-12">
                <div>
                  <Eyebrow>Apply by November 13</Eyebrow>
                  <h2
                    className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
                    style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
                  >
                    See you in Austin<span className="text-[#EC8644]">.</span>
                  </h2>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl mt-5">
                    Still not sure you can make the trip work?{" "}
                    <a href={CONTACT} className="text-white font-semibold underline underline-offset-4 hover:text-[#EC8644]">
                      Email us
                    </a>
                    . We want UBC to be reachable for every student who wants to be in the room.
                  </p>
                  <div className="mt-9">
                    <CtaButtons />
                  </div>
                </div>
                <div className="lg:w-[28rem]">
                  <div className="flex gap-4 sm:gap-6">
                    <Polaroid src="/photos/workspace.jpg" caption="Made it!" tilt={-4} className="flex-1 max-w-56" />
                    <Polaroid src="/photos/main-stage.jpg" caption="Worth the trip" tilt={4} className="flex-1 max-w-56 mt-8" />
                  </div>
                  <p className="text-white/35 text-[11px] font-medium tracking-[0.18em] uppercase mt-6">
                    UBC 2025 · Ann Arbor
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  Mic,
  Send,
  Users,
  Wrench,
} from "lucide-react";
import FAQ from "@/components/FAQ";

const CONTACT_EMAIL = "uniblockchainconferences@gmail.com";
/** UBC 2025. A speaker mid-keynote, and the room during a research talk. */
const HERO_IMAGE = "/photos/keynote.jpg";
const SIDE_IMAGE = "/photos/research-talk.jpg";

const FACTS = [
  { value: "Nov 20–21", label: "2026" },
  { value: "UT Austin", label: "Austin, TX" },
  { value: "1000+", label: "Students" },
  { value: "100+", label: "Universities" },
];

const FORMATS = [
  { id: "Keynote", blurb: "A headline talk on the main stage" },
  { id: "Fireside chat", blurb: "A moderated conversation, one on one" },
  { id: "Panel", blurb: "Three or four voices on one theme" },
  { id: "Technical deep-dive", blurb: "Go deep on architecture or research" },
  { id: "Workshop", blurb: "Hands-on session with a smaller group" },
  { id: "Open to anything", blurb: "Put me wherever I fit best" },
];

const TOPICS = [
  "DeFi",
  "Stablecoins & payments",
  "Trading & market structure",
  "MEV",
  "Prediction markets",
  "Tokenization & RWAs",
  "Institutional adoption",
  "Bitcoin",
  "Infrastructure & scaling",
  "Interoperability & bridges",
  "Data availability",
  "Wallets & account abstraction",
  "ZK & privacy",
  "Cryptography",
  "Security & audits",
  "AI × crypto",
  "DePIN",
  "Identity & reputation",
  "DAOs & governance",
  "Consumer apps & social",
  "Gaming",
  "Policy & regulation",
  "Research",
  "Founding & venture",
  "Careers in crypto",
];

/** November 20 2026 is a Friday, the 21st a Saturday. */
const ATTENDANCE = [
  "In person, both days",
  "Friday, Nov 20 only",
  "Saturday, Nov 21 only",
  "Not sure yet",
];

const LOOKING_FOR = [
  {
    Icon: Mic,
    title: "People building the thing",
    body: "Founders, protocol engineers, researchers, investors, and policy people who can talk about work they actually did.",
  },
  {
    Icon: Users,
    title: "A student audience",
    body: "The room is over a thousand students from a hundred-plus universities. The best talks assume curiosity and technical literacy, but not industry context.",
  },
  {
    Icon: Wrench,
    title: "Something specific",
    body: "One argument, one system, one hard-won lesson. A sharp fifteen-minute keynote, or one perspective that changes where a panel goes, beats a generic summary of the industry every time.",
  },
];

const SPEAKER_FAQ = [
  {
    question: "Is there a deadline?",
    answer:
      "We review applications on a rolling basis as the agenda comes together, so earlier is better. The lineup fills up well before November.",
  },
  {
    question: "Do speakers get paid or reimbursed?",
    answer:
      "UBC is a student-run nonprofit conference, so we don't pay speaking fees. Student speakers are eligible for the same travel grants as every other student — the same domestic and international tiers, with nothing extra for speaking. Everyone else covers their own travel; if that's the deciding factor for you, say so in the last section of the application.",
    link: { href: "/travel-grants", label: "Travel Grants" },
  },
  {
    question: "Can I apply as a student?",
    answer:
      "Yes. Students speak at UBC every year, usually through the research competition or the Founder Stage. Apply here and tell us what you've built or published.",
    link: { href: "/programs/founder-stage", label: "Founder Stage" },
  },
  {
    question: "Can I suggest a panel instead of a solo talk?",
    answer:
      "Please do. Pick Panel as your format and use the abstract to describe the theme and anyone you'd want on it with you. We handle moderation.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "You get a confirmation email immediately, and our programming team follows up from the same thread. If we're a fit, we'll set up a short call to shape the session.",
  },
  {
    question: "Who do I contact about a sponsorship instead?",
    answer:
      "Email us and we'll send over the partnership deck. Speaking slots aren't sold — the agenda is programmed on merit.",
    link: {
      href: `mailto:${CONTACT_EMAIL}?subject=UBC%202026%20Partnership`,
      label: CONTACT_EMAIL,
    },
  },
];

/* ------------------------------------------------------------------ */

type Key =
  | "name"
  | "email"
  | "role"
  | "organization"
  | "links"
  | "format"
  | "title"
  | "abstract"
  | "attendance"
  | "notes";

const EMPTY: Record<Key, string> = {
  name: "",
  email: "",
  role: "",
  organization: "",
  links: "",
  format: "",
  title: "",
  abstract: "",
  attendance: "",
  notes: "",
};

/** Required fields in page order — the order also decides which one we jump to
 *  when a submit comes back short. `format` lives in its own array state, so it
 *  is validated separately from the plain text fields. */
const REQUIRED: Key[] = [
  "name",
  "email",
  "role",
  "organization",
  "format",
  "title",
  "abstract",
  "attendance",
];
const REQUIRED_TEXT = REQUIRED.filter((k) => k !== "format");

const LABELS: Record<Key, string> = {
  name: "Full name",
  email: "Email",
  role: "Role or title",
  organization: "Company or university",
  links: "Links",
  format: "Format",
  title: "Working title",
  abstract: "What the talk covers",
  attendance: "Attendance",
  notes: "Anything else",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
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

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#293C4B] placeholder:text-[#9CADB7] outline-none transition-all duration-200 focus:border-[#EC8644] focus:ring-4 focus:ring-[#EC8644]/12";

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  hint,
  type = "text",
  rows,
  max,
}: {
  id: Key;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  type?: string;
  rows?: number;
  max?: number;
}) {
  const border = error ? "border-[#C0553B]" : "border-[#293C4B]/12";
  return (
    <div data-field={id} className="scroll-mt-28">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <label
          htmlFor={id}
          className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#293C4B]/55"
        >
          {label}
          {required && <span className="text-[#EC8644] ml-1">*</span>}
        </label>
        {max && (
          <span
            className={`text-[11px] tabular-nums transition-colors ${
              value.length > max * 0.9 ? "text-[#EC8644]" : "text-[#9CADB7]"
            }`}
          >
            {value.length}/{max}
          </span>
        )}
      </div>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          maxLength={max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${border} resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          maxLength={max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${border}`}
        />
      )}
      {error ? (
        <p className="mt-1.5 text-xs text-[#C0553B]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[#9CADB7]">{hint}</p>
      ) : null}
    </div>
  );
}

/** Selectable pill. Doubles as a radio (single) and a checkbox (multi). */
function Chip({
  active,
  onClick,
  children,
  blurb,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  blurb?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative text-left transition-all duration-200 ${
        blurb
          ? "rounded-2xl p-4 pr-10 border"
          : "rounded-full px-4 py-2 border text-sm"
      } ${
        active
          ? "border-[#EC8644] bg-[#EC8644]/[0.08] shadow-[0_10px_24px_-18px_rgba(236,134,68,0.9)]"
          : "border-[#293C4B]/12 bg-white hover:border-[#293C4B]/25 hover:-translate-y-px"
      }`}
    >
      <span
        className={`block font-semibold ${blurb ? "text-[15px]" : ""} ${
          active ? "text-[#293C4B]" : "text-[#293C4B]/75"
        }`}
      >
        {children}
      </span>
      {blurb && (
        <>
          <span className="mt-1 block text-xs leading-relaxed text-[#5A6B78]">
            {blurb}
          </span>
          <span
            className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-200 ${
              active ? "bg-[#EC8644] text-white scale-100" : "scale-0"
            }`}
          >
            <Check size={12} strokeWidth={3} />
          </span>
        </>
      )}
    </button>
  );
}

function FieldGroup({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-field={id} className="scroll-mt-28">
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#293C4B]/55 mb-3">
        {label}
        {required && <span className="text-[#EC8644] ml-1">*</span>}
      </p>
      {children}
      {error ? (
        <p className="mt-2 text-xs text-[#C0553B]">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-[#9CADB7]">{hint}</p>
      ) : null}
    </div>
  );
}

/** One numbered block of the form. Everything is on the page at once; these
 *  just give the eye somewhere to rest on the way down. */
function Section({
  n,
  title,
  blurb,
  children,
}: {
  n: string;
  title: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#293C4B]/8 pt-8 first:border-t-0 first:pt-0">
      <div className="grid gap-6 lg:grid-cols-[210px_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs font-medium text-[#EC8644]/70">
              {n}
            </span>
            <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight text-2xl sm:text-3xl leading-none">
              {title}
            </h3>
          </div>
          <p className="text-[#5A6B78] text-sm mt-2 lg:pl-7">{blurb}</p>
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function SpeakerApplication() {
  const [values, setValues] = useState<Record<Key, string>>(EMPTY);
  const [formats, setFormats] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLElement>(null);

  /** Lenis runs the scroll on this site and swallows native smooth scrolling —
   *  `scrollIntoView` and `#` anchors both land nowhere. Instant jumps do stick,
   *  so we ease the position ourselves, one frame at a time. */
  const scrollTo = (el: Element | null, offset = 88) => {
    if (!el) return;
    const start = window.scrollY;
    const distance =
      Math.max(0, start + el.getBoundingClientRect().top - offset) - start;
    if (Math.abs(distance) < 2) return;
    const duration = Math.min(700, 240 + Math.abs(distance) * 0.35);
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      window.scrollTo({ top: start + distance * eased, behavior: "instant" });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const set = (k: Key) => (v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => (v: string) =>
      setter((prev) =>
        prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
      );

  const toggleFormat = (v: string) => {
    toggle(setFormats)(v);
    setErrors((prev) => (prev.format ? { ...prev, format: undefined } : prev));
  };
  const toggleTopic = toggle(setTopics);

  const progress = useMemo(() => {
    const done =
      REQUIRED_TEXT.filter((k) => values[k].trim()).length +
      (formats.length ? 1 : 0);
    return Math.round((done / REQUIRED.length) * 100);
  }, [values, formats]);

  const filled = useMemo(
    () =>
      (
        [
          ["name", values.name],
          ["email", values.email],
          ["role", values.role],
          ["organization", values.organization],
          ["links", values.links],
          ["format", formats.join(", ")],
          ["topics", topics.join(", ")],
          ["title", values.title],
          ["abstract", values.abstract],
          ["attendance", values.attendance],
          ["notes", values.notes],
        ] as [string, string][]
      ).filter(([, v]) => v.trim()),
    [values, formats, topics],
  );

  /** If Resend ever fails, the applicant can still hand us the same content. */
  const mailtoFallback = useMemo(() => {
    const body = filled
      .map(([k, v]) => `${k === "topics" ? "Topics" : LABELS[k as Key]}:\n${v}`)
      .join("\n\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Speaker application — ${values.name || "UBC 2026"}`,
    )}&body=${encodeURIComponent(body)}`;
  }, [filled, values.name]);

  async function submit() {
    const next: Partial<Record<Key, string>> = {};
    for (const k of REQUIRED_TEXT) {
      if (!values[k].trim()) next[k] = "This one's required.";
    }
    if (!formats.length) next.format = "Pick at least one.";
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = "That email address doesn't look right.";
    }
    setErrors(next);

    const firstBad = REQUIRED.find((k) => next[k]);
    if (firstBad) {
      setStatus("idle");
      requestAnimationFrame(() =>
        scrollTo(document.querySelector(`[data-field="${firstBad}"]`), 120),
      );
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/speaker-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          format: formats,
          topics,
          company: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.error || "Something went wrong on our end.");
      setStatus("sent");
      requestAnimationFrame(() => scrollTo(formRef.current));
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong on our end.",
      );
    }
  }

  const missingCount = Object.values(errors).filter(Boolean).length;

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
                "linear-gradient(to bottom, rgba(26,42,54,0.78) 0%, rgba(26,42,54,0.86) 45%, rgba(26,42,54,0.97) 85%, #1A2A36 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 78% 12%, rgba(236,134,68,0.22) 0%, rgba(236,134,68,0) 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-14 sm:pt-44 sm:pb-20">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
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
            Speak
            <br />
            at UBC
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mt-7"
          >
            The agenda is programmed, not sold. If you&rsquo;re building,
            researching, funding, or regulating something worth a thousand
            students&rsquo; attention, tell us about it. One page, about five
            minutes.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3 mt-9"
          >
            <button
              type="button"
              onClick={() => scrollTo(applyRef.current)}
              className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-[#EC8644] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/25"
            >
              Start your application <ArrowRight size={17} />
            </button>
            <Link
              href="/#speakers"
              className="shrink-0 whitespace-nowrap bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-white/20 hover:border-white/60 transition-colors"
            >
              Who you&rsquo;d share the stage with
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 max-w-4xl"
          >
            {FACTS.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-md px-5 py-4"
              >
                <p
                  className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-none whitespace-nowrap"
                  style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}
                >
                  {f.value}
                </p>
                <p className="text-white/40 text-[11px] font-medium tracking-[0.18em] uppercase mt-2">
                  {f.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- What we're looking for ---------- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <Eyebrow>What we look for</Eyebrow>
                <h2
                  className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                  style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
                >
                  People worth skipping class for
                </h2>
              </Reveal>

              <div className="mt-8 space-y-5">
                {LOOKING_FOR.map(({ Icon, title, body }, i) => (
                  <Reveal key={title} i={i + 1}>
                    <div className="flex gap-4">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EC8644]/10 text-[#EC8644]">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h3 className="text-[#293C4B] text-base font-semibold">
                          {title}
                        </h3>
                        <p className="text-[#5A6B78] text-sm leading-relaxed mt-1.5">
                          {body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal i={2}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                <Image
                  src={SIDE_IMAGE}
                  alt="A talk at UBC 2025"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A36]/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-6 right-6 text-white/85 text-sm font-medium">
                  UBC 2025 · Ann Arbor, MI
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Application ---------- */}
      <section id="apply" ref={applyRef} className="pb-16 sm:pb-24">
        {/* Same container and left edge as every other section; the inner
            max-width just keeps the form from running to newspaper widths. */}
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>The application</Eyebrow>
              <h2
                className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-[0.95]"
                style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
              >
                Tell us what you&rsquo;d talk about
              </h2>
              <p className="text-[#5A6B78] text-base leading-relaxed mt-5">
                It&rsquo;s all on this page — fill it in, hit submit, and it
                lands straight in the programming team&rsquo;s inbox. Fields
                marked <span className="text-[#EC8644] font-semibold">*</span>{" "}
                are required.
              </p>
            </Reveal>
          </div>

          <div
            ref={formRef}
            className="relative mt-8 overflow-hidden rounded-3xl border border-[#293C4B]/10 bg-white shadow-[0_30px_60px_-45px_rgba(41,60,75,0.55)]"
          >
            {/* A quiet completion meter across the top of the card. */}
            <div className="h-1 w-full bg-[#293C4B]/8">
              <motion.div
                className="h-full bg-[#EC8644]"
                initial={false}
                animate={{ width: `${status === "sent" ? 100 : progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="p-6 sm:p-9">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="py-10 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 220,
                        damping: 16,
                      }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EC8644] text-white"
                    >
                      <Check size={30} strokeWidth={3} />
                    </motion.span>
                    <h3
                      className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight mt-6"
                      style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
                    >
                      Application in.
                    </h3>
                    <p className="text-[#5A6B78] text-base leading-relaxed max-w-md mx-auto mt-4">
                      It&rsquo;s in the programming team&rsquo;s inbox, and a
                      confirmation is on its way to{" "}
                      <span className="text-[#293C4B] font-medium">
                        {values.email}
                      </span>
                      . We review on a rolling basis and reply from that same
                      thread.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#293C4B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1A2A36] transition-colors"
                      >
                        Back to the site
                      </Link>
                      <a
                        href="https://luma.com/n4ad0k9m"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#293C4B]/15 px-6 py-2.5 text-sm font-semibold text-[#293C4B] hover:border-[#293C4B]/35 transition-colors"
                      >
                        Get tickets <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={false}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <Section
                      n="01"
                      title="About you"
                      blurb="So we know who we're programming and how to reach you."
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          id="name"
                          label={LABELS.name}
                          required
                          value={values.name}
                          onChange={set("name")}
                          error={errors.name}
                          placeholder="Ada Lovelace"
                          max={120}
                        />
                        <Field
                          id="email"
                          label={LABELS.email}
                          required
                          type="email"
                          value={values.email}
                          onChange={set("email")}
                          error={errors.email}
                          placeholder="ada@protocol.xyz"
                          max={200}
                        />
                        <Field
                          id="role"
                          label={LABELS.role}
                          required
                          value={values.role}
                          onChange={set("role")}
                          error={errors.role}
                          placeholder="Head of Research"
                          max={160}
                        />
                        <Field
                          id="organization"
                          label={LABELS.organization}
                          required
                          value={values.organization}
                          onChange={set("organization")}
                          error={errors.organization}
                          placeholder="Solana Foundation"
                          max={160}
                        />
                      </div>
                      <Field
                        id="links"
                        label={LABELS.links}
                        value={values.links}
                        onChange={set("links")}
                        rows={2}
                        placeholder="LinkedIn, X, personal site, papers — whatever helps us place you"
                        hint="Optional, but it makes the review much faster."
                        max={500}
                      />
                    </Section>

                    <Section
                      n="02"
                      title="Your talk"
                      blurb="The part our programming team reads most closely."
                    >
                      <FieldGroup
                        id="format"
                        label="Preferred formats"
                        required
                        error={errors.format}
                        hint="Pick every format you'd be up for."
                      >
                        <div className="grid gap-3 sm:grid-cols-2">
                          {FORMATS.map((f) => (
                            <Chip
                              key={f.id}
                              active={formats.includes(f.id)}
                              blurb={f.blurb}
                              onClick={() => toggleFormat(f.id)}
                            >
                              {f.id}
                            </Chip>
                          ))}
                        </div>
                      </FieldGroup>

                      <FieldGroup
                        id="topics"
                        label="Topics"
                        hint="Pick as many as fit. This just helps us group sessions."
                      >
                        <div className="flex flex-wrap gap-2">
                          {TOPICS.map((t) => (
                            <Chip
                              key={t}
                              active={topics.includes(t)}
                              onClick={() => toggleTopic(t)}
                            >
                              {t}
                            </Chip>
                          ))}
                        </div>
                      </FieldGroup>

                      <Field
                        id="title"
                        label={LABELS.title}
                        required
                        value={values.title}
                        onChange={set("title")}
                        error={errors.title}
                        placeholder="Why proof systems got 100× cheaper"
                        hint="A working title is fine. We'll shape it with you."
                        max={200}
                      />

                      <Field
                        id="abstract"
                        label={LABELS.abstract}
                        required
                        rows={6}
                        value={values.abstract}
                        onChange={set("abstract")}
                        error={errors.abstract}
                        placeholder="A few sentences on the argument, the system, or the story. Specific beats broad."
                        max={2000}
                      />
                    </Section>

                    <Section
                      n="03"
                      title="Logistics"
                      blurb="Nothing here is binding — it just helps us plan the room."
                    >
                      <FieldGroup
                        id="attendance"
                        label="Can you make it to Austin?"
                        required
                        error={errors.attendance}
                        hint="November 20–21, 2026."
                      >
                        <div className="flex flex-wrap gap-2">
                          {ATTENDANCE.map((a) => (
                            <Chip
                              key={a}
                              active={values.attendance === a}
                              onClick={() => set("attendance")(a)}
                            >
                              {a}
                            </Chip>
                          ))}
                        </div>
                      </FieldGroup>

                      <Field
                        id="notes"
                        label={LABELS.notes}
                        rows={3}
                        value={values.notes}
                        onChange={set("notes")}
                        placeholder="Scheduling constraints, travel considerations, someone you'd want on a panel with you."
                        hint="Optional."
                        max={1200}
                      />
                    </Section>

                    {/* Honeypot — hidden from people, catnip for bots. */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    {/* Submit */}
                    <div className="border-t border-[#293C4B]/8 pt-7">
                      <AnimatePresence>
                        {missingCount > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="mb-5 flex items-start gap-2.5 rounded-2xl border border-[#C0553B]/25 bg-[#C0553B]/[0.06] p-4"
                          >
                            <AlertCircle
                              size={16}
                              className="mt-0.5 shrink-0 text-[#C0553B]"
                            />
                            <p className="text-sm text-[#C0553B]">
                              {missingCount === 1
                                ? "One required field still needs an answer."
                                : `${missingCount} required fields still need an answer.`}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {status === "error" && (
                        <div className="mb-5 rounded-2xl border border-[#C0553B]/25 bg-[#C0553B]/[0.06] p-4">
                          <p className="text-sm font-medium text-[#C0553B]">
                            {errorMsg}
                          </p>
                          <a
                            href={mailtoFallback}
                            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#293C4B] underline underline-offset-4 hover:text-[#EC8644]"
                          >
                            <Mail size={14} /> Send it as an email instead
                          </a>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <p className="max-w-xs text-xs leading-relaxed text-[#9CADB7]">
                          Submitting emails your application to {CONTACT_EMAIL}.
                          We only use it to program the conference.
                        </p>
                        <button
                          type="button"
                          onClick={submit}
                          disabled={status === "sending"}
                          className="inline-flex items-center gap-2 rounded-full bg-[#EC8644] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#EC8644]/25 transition-colors hover:bg-[#D4703A] disabled:opacity-70"
                        >
                          {status === "sending" ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />{" "}
                              Sending
                            </>
                          ) : (
                            <>
                              Submit application <Send size={15} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      {/* FAQ brings its own "Questions / FAQ" header, so this section is just
          the closing note underneath it. */}
      <FAQ items={SPEAKER_FAQ} />

      <section className="pb-20 sm:pb-28">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <p className="text-[#5A6B78] text-sm">
              Still unsure whether you&rsquo;re a fit?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=UBC%202026%20Speaking`}
                className="font-semibold text-[#EC8644] hover:underline"
              >
                Email us
              </a>{" "}
              and ask.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

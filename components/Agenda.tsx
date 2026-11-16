"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, MapPin, Search, X } from "lucide-react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { AGENDA, VENUES, type AgendaDay, type Session, type Venue } from "@/data/agenda";
import { getSpeakers } from "@/lib/api/speakers";
import type { Speaker } from "@/lib/supabase";

const STAGES: Venue[] = ["main", "second", "workshop"];

const ACCENT: Record<Venue, string> = {
  main: "bg-[#EC8644]",
  second: "bg-[#293C4B]",
  workshop: "bg-[#9CADB7]",
  side: "bg-[#EC8644]",
};

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** End time in minutes, pushed past midnight when it wraps. */
const endMin = (s: Session) => {
  const a = toMin(s.start);
  const b = toMin(s.end);
  return b <= a ? b + 24 * 60 : b;
};

const clock = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return { text: `${h % 12 || 12}:${String(m).padStart(2, "0")}`, pm: h >= 12 && h < 24 };
};

const timeLabel = (t: string) => {
  const c = clock(t);
  return `${c.text} ${c.pm ? "PM" : "AM"}`;
};

/** "10:20–10:50 AM", or "11:40 AM–12:10 PM" when the range crosses noon. */
const range = (s: Session) => {
  const a = clock(s.start);
  const b = clock(s.end);
  return a.pm === b.pm
    ? `${a.text}–${b.text} ${b.pm ? "PM" : "AM"}`
    : `${a.text} ${a.pm ? "PM" : "AM"}–${b.text} ${b.pm ? "PM" : "AM"}`;
};

const isTba = (s: Session) => !s.title && !s.with?.length;
const headline = (s: Session) => s.title ?? s.with?.join(", ") ?? "To be announced";

/* ---------- Speakers ---------- */

/** Speakers table rows keyed by nameKey, so agenda names find their photo and company. */
type Directory = Map<string, Speaker>;

/** Ignores case, periods and quotes, so `Lucas “LTR” Raymond` matches `Lucas "LTR" Raymond`. */
const nameKey = (name: string) =>
  name.toLowerCase().replace(/[“”"'.]/g, "").replace(/\s+/g, " ").trim();

type Person = { name: string; moderator: boolean; info?: Speaker };

/** Everyone on stage for a session, moderator last. Side events list hosts, not speakers. */
const lineup = (s: Session, dir: Directory): Person[] =>
  s.venue === "side"
    ? []
    : [
        ...(s.with ?? []).map((name) => ({ name, moderator: false })),
        ...(s.moderator ? [{ name: s.moderator, moderator: true }] : []),
      ].map((p) => ({ ...p, info: dir.get(nameKey(p.name)) }));

const AgendaContext = createContext<{ dir: Directory; open: (s: Session) => void }>({
  dir: new Map(),
  open: () => {},
});

const initials = (name: string) => {
  const words = name.replace(/[“"].*?[”"]/g, "").split(/\s+/).filter(Boolean);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
};

function Avatar({ p, size, className = "" }: { p: Person; size: number; className?: string }) {
  const box = `shrink-0 rounded-full ${className}`;
  return p.info?.image_url ? (
    <Image
      src={p.info.image_url}
      alt=""
      width={size}
      height={size}
      className={`${box} object-cover bg-[#E4E7E9]`}
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      aria-hidden
      className={`${box} grid place-items-center bg-[#293C4B] text-white font-semibold`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials(p.name)}
    </span>
  );
}

const matches = (s: Session, q: string, dir: Directory) => {
  if (!q) return true;
  const venue = s.venue === "all" ? "" : VENUES[s.venue].label;
  const companies = lineup(s, dir).map((p) => p.info?.company);
  return [s.title, ...(s.with ?? []), s.moderator, ...companies, s.place, s.blurb, venue]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(q);
};

const byTime = (a: Session, b: Session) =>
  toMin(a.start) - toMin(b.start) ||
  STAGES.indexOf(a.venue as Venue) - STAGES.indexOf(b.venue as Venue);

const dayNum = (d: AgendaDay) => Number(d.date.slice(8));

/* ---------- Cards ---------- */

/** `fill` stretches the card to the rows it spans in the desktop grid. Sessions
 *  with speakers open the session panel; the title button covers the whole card. */
function SessionCard({ s, showVenue = false, fill = false }: { s: Session; showVenue?: boolean; fill?: boolean }) {
  const { dir, open } = useContext(AgendaContext);
  const venue = s.venue === "all" ? null : VENUES[s.venue];
  const kicker = (
    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9CADB7]">
      {range(s)}
      {showVenue && venue && <> · {venue.short ?? venue.label}</>}
    </p>
  );

  if (isTba(s)) {
    return (
      <article className={`${fill ? "h-full" : ""} rounded-2xl border border-dashed border-[#293C4B]/15 px-4 py-3.5`}>
        {kicker}
        <p className="text-[#9CADB7] text-sm font-medium mt-1.5">To be announced</p>
      </article>
    );
  }

  const people = lineup(s, dir);
  const speakers = people.filter((p) => !p.moderator);

  return (
    <article
      className={`group relative ${fill ? "h-full" : ""} rounded-2xl bg-white px-4 py-3.5 pl-5 ring-1 ring-[#293C4B]/[0.05] shadow-[0_1px_2px_rgba(41,60,75,0.04)] overflow-hidden transition ${
        people.length ? "hover:ring-[#EC8644]/40 hover:shadow-[0_6px_20px_-8px_rgba(41,60,75,0.25)] focus-within:ring-2 focus-within:ring-[#EC8644]" : ""
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${ACCENT[s.venue as Venue]}`}
      />
      {kicker}
      <h4 className="text-[#293C4B] font-semibold text-[15px] leading-snug mt-1.5">
        {people.length ? (
          <button
            type="button"
            onClick={() => open(s)}
            className="text-left outline-none after:absolute after:inset-0 after:content-['']"
          >
            {headline(s)}
          </button>
        ) : (
          headline(s)
        )}
      </h4>
      {speakers.length > 0 && (
        <p className="text-[#5A6B78] text-[13px] leading-snug mt-1">{speakers.map((p) => p.name).join(" · ")}</p>
      )}
      {s.moderator && <p className="text-[#9CADB7] text-[12px] leading-snug mt-1">Moderated by {s.moderator}</p>}
      {people.length > 0 && (
        <div aria-hidden className="mt-3 flex items-center justify-between gap-2">
          <span className="flex -space-x-1.5">
            {people.map((p) => (
              <Avatar key={p.name} p={p} size={24} className="ring-2 ring-white" />
            ))}
          </span>
          <span className="inline-flex items-center text-[12px] font-semibold text-[#9CADB7] group-hover:text-[#EC8644] transition-colors">
            {people.length === 1 ? "Speaker" : "Speakers"}
            <ChevronRight size={14} />
          </span>
        </div>
      )}
      {s.href && (
        <Link
          href={s.href}
          className="relative inline-flex items-center gap-1 mt-2.5 text-[#EC8644] text-[13px] font-semibold hover:underline underline-offset-4"
        >
          Details <ArrowUpRight size={14} />
        </Link>
      )}
    </article>
  );
}

/** The panel a session card opens: when and where, then everyone on stage with
 *  their role, company and links. A bottom sheet on phones, a dialog on desktop. */
function SessionPanel({ s, day, onClose }: { s: Session; day: AgendaDay; onClose: () => void }) {
  const { dir } = useContext(AgendaContext);
  const closeRef = useRef<HTMLButtonElement>(null);
  const venue = VENUES[s.venue as Venue];
  const people = lineup(s, dir);

  useEffect(() => {
    const back = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      back?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="absolute inset-0 bg-[#1A2A36]/55 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="agenda-panel-title"
        initial={{ y: 28 }}
        animate={{ y: 0 }}
        exit={{ y: 20 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-lg max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
      >
        <div className="px-6 pt-5 pb-5 sm:px-8 sm:pt-7 border-b border-[#293C4B]/[0.07]">
          <span aria-hidden className="sm:hidden block mx-auto mb-4 w-10 h-1 rounded-full bg-[#293C4B]/15" />
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#EC8644] pt-1.5">
              {day.short}, Nov {dayNum(day)} · {range(s)} CT
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-2 -mt-1 p-2 rounded-full text-[#9CADB7] hover:text-[#293C4B] hover:bg-[#F4F3EF] outline-none focus-visible:ring-2 focus-visible:ring-[#EC8644] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <h3 id="agenda-panel-title" className="text-[#293C4B] font-semibold text-xl sm:text-[22px] leading-snug mt-1.5">
            {headline(s)}
          </h3>
          <p className="mt-2.5 flex items-center gap-2 text-[13px] text-[#5A6B78]">
            <span className={`w-2 h-2 rounded-full ${ACCENT[s.venue as Venue]}`} />
            <span>
              {venue.label}
              {venue.place && <span className="text-[#9CADB7]"> · {venue.place}</span>}
            </span>
          </p>
        </div>

        <div className="px-6 py-6 sm:px-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9CADB7] mb-4">
            {people.length === 1 ? "Speaker" : "Speakers"}
          </p>
          <ul className="flex flex-col gap-4">
            {people.map((p) => {
              const links = [
                { href: p.info?.x_url, label: `${p.name} on X`, Icon: FaXTwitter },
                { href: p.info?.linkedin_url, label: `${p.name} on LinkedIn`, Icon: FaLinkedinIn },
              ].filter((l) => l.href);
              return (
                <li key={p.name} className="flex items-center gap-3.5">
                  <Avatar p={p} size={52} />
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#293C4B] font-semibold text-[15px] leading-snug">
                      {p.name}
                      {p.moderator && (
                        <span className="rounded-full bg-[#EC8644]/10 text-[#C4622A] text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-0.5">
                          Moderator
                        </span>
                      )}
                    </p>
                    {(p.info?.title || p.info?.company) && (
                      <p className="text-[13px] leading-snug text-[#5A6B78] mt-0.5">
                        {p.info.title}
                        {p.info.title && p.info.company && ", "}
                        {p.info.company && <span className="text-[#293C4B] font-medium">{p.info.company}</span>}
                      </p>
                    )}
                  </div>
                  {links.length > 0 && (
                    <div className="flex items-center gap-0.5 -mr-1.5">
                      {links.map(({ href, label, Icon }) => (
                        <a
                          key={label}
                          href={href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          title={label}
                          className="p-1.5 rounded-full text-[#9CADB7] hover:text-[#EC8644] hover:bg-[#F4F3EF] transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Opens the place in Google Maps. */
const mapsUrl = (s: Session) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.place}, ${s.address}`)}`;

function SideEventCard({ s, day }: { s: Session; day: AgendaDay }) {
  return (
    <article className="rounded-2xl bg-white px-4 py-3.5 ring-1 ring-[#293C4B]/[0.05] shadow-[0_1px_2px_rgba(41,60,75,0.04)]">
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9CADB7]">
        {day.short}, Nov {dayNum(day)} · {range(s)}
      </p>
      <h4 className="text-[#293C4B] font-semibold text-[15px] leading-snug mt-1.5">{headline(s)}</h4>
      {s.blurb && <p className="text-[#5A6B78] text-[13px] leading-snug mt-1.5">{s.blurb}</p>}
      {s.place && (
        <p className="text-[13px] mt-2.5">
          {s.address ? (
            <a
              href={mapsUrl(s)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1 text-[#293C4B] font-medium underline decoration-[#293C4B]/20 underline-offset-4 hover:decoration-[#EC8644]"
            >
              <MapPin size={13} className="text-[#EC8644] shrink-0 mt-[3px]" />
              {s.place}
            </a>
          ) : (
            <span className="inline-flex items-start gap-1 text-[#5A6B78]">
              <MapPin size={13} className="text-[#9CADB7] shrink-0 mt-[3px]" />
              {s.place}
            </span>
          )}
        </p>
      )}
      {s.with && <p className="text-[#9CADB7] text-xs mt-1.5">Hosted by {s.with.join(" · ")}</p>}
      {s.note && <p className="text-[#9CADB7] text-xs leading-relaxed mt-2">{s.note}</p>}
      {s.rsvp && (
        <a
          href={s.rsvp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-[#EC8644] text-[13px] font-semibold hover:underline underline-offset-4"
        >
          RSVP on Luma <ArrowUpRight size={14} />
        </a>
      )}
    </article>
  );
}

/** Check-in and lunch, which run across every stage. */
function Band({ s }: { s: Session }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#293C4B]/15 px-4 py-2.5">
      <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9CADB7]">{range(s)}</span>
      <span className="text-[#293C4B] text-sm font-semibold">{s.title}</span>
    </div>
  );
}

function SideEvents({ sessions, day, wide = false }: { sessions: Session[]; day: AgendaDay; wide?: boolean }) {
  if (sessions.length === 0) return null;
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-3">
        <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl tracking-tight">
          {VENUES.side.label}
        </h3>
        <span className="text-[#9CADB7] text-xs">{VENUES.side.place}</span>
      </div>
      <div className={wide ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" : "flex flex-col gap-3"}>
        {sessions.map((s) => (
          <SideEventCard key={s.start + headline(s)} s={s} day={day} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Layouts ---------- */

/** Desktop: one column per stage, rows at each start time so parallel sessions
 *  line up and long sessions span the rows they cover. */
function StageGrid({ day, sessions }: { day: AgendaDay; sessions: Session[] }) {
  const columns = STAGES.filter((v) => day.sessions.some((s) => s.venue === v));
  const rows = [...new Set(sessions.map((s) => toMin(s.start)))].sort((a, b) => a - b);
  const rowOf = (min: number) => rows.indexOf(min) + 2;
  const rowEnd = (s: Session) => {
    const i = rows.findIndex((r) => r >= endMin(s));
    return i === -1 ? rows.length + 2 : i + 2;
  };

  return (
    <div
      className="grid gap-x-3 gap-y-2.5"
      style={{
        gridTemplateColumns: `72px repeat(${columns.length}, minmax(0, 1fr))`,
        gridTemplateRows: `auto repeat(${rows.length}, auto)`,
      }}
    >
      <p style={{ gridColumn: 1, gridRow: 1 }} className="text-[#9CADB7] text-[11px] font-semibold tracking-[0.12em] uppercase pt-1">
        Central
      </p>
      {columns.map((v, i) => (
        <div key={v} style={{ gridColumn: i + 2, gridRow: 1 }} className="pb-1.5">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${ACCENT[v]}`} />
            <h3 className="font-[var(--font-zuume)] font-black text-[#293C4B] text-xl tracking-tight">
              {VENUES[v].label}
            </h3>
          </div>
          {VENUES[v].place && <p className="text-[#9CADB7] text-xs mt-0.5 ml-4">{VENUES[v].place}</p>}
        </div>
      ))}

      {rows.map((min) => {
        const t = `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
        return (
          <p
            key={min}
            style={{ gridColumn: 1, gridRow: rowOf(min) }}
            className="text-[#9CADB7] text-xs font-semibold tabular-nums pt-3.5"
          >
            {timeLabel(t)}
          </p>
        );
      })}

      {sessions.map((s) => (
        <div
          key={s.venue + s.start}
          style={{
            gridColumn: s.venue === "all" ? "2 / -1" : columns.indexOf(s.venue as Venue) + 2,
            gridRow: `${rowOf(toMin(s.start))} / ${s.venue === "all" ? rowOf(toMin(s.start)) + 1 : rowEnd(s)}`,
          }}
        >
          {s.venue === "all" ? <Band s={s} /> : <SessionCard s={s} fill />}
        </div>
      ))}
    </div>
  );
}

/** Mobile: everything on the stages in time order, grouped by start time. */
function StageList({ sessions }: { sessions: Session[] }) {
  const groups: { start: string; items: Session[] }[] = [];
  for (const s of sessions) {
    const last = groups[groups.length - 1];
    if (last && last.start === s.start) last.items.push(s);
    else groups.push({ start: s.start, items: [s] });
  }

  return (
    <ol className="flex flex-col gap-4">
      {groups.map((g) => (
        <li key={g.start} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
          <p className="pt-3 leading-none">
            <span className="block text-[#293C4B] text-sm font-bold tabular-nums">{clock(g.start).text}</span>
            <span className="block text-[#9CADB7] text-[10px] font-semibold tracking-[0.12em] mt-1">
              {clock(g.start).pm ? "PM" : "AM"}
            </span>
          </p>
          <div className="flex flex-col gap-2.5">
            {g.items.map((s) =>
              s.venue === "all" ? <Band key={s.start + s.title} s={s} /> : <SessionCard key={s.venue + s.start} s={s} showVenue />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Section ---------- */

export default function Agenda() {
  const [dayKey, setDayKey] = useState("fri");
  const [query, setQuery] = useState("");
  const [dir, setDir] = useState<Directory>(new Map());
  const [opened, setOpened] = useState<{ s: Session; day: AgendaDay } | null>(null);
  const q = query.trim().toLowerCase();

  useEffect(() => {
    getSpeakers().then((list) => setDir(new Map(list.map((sp) => [nameKey(sp.name), sp]))));
  }, []);

  // During the conference, open on today's tab.
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
    const match = AGENDA.find((d) => d.date === today);
    if (match) setDayKey(match.key);
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(AGENDA.map((d) => [d.key, d.sessions.filter((s) => s.venue !== "all" && matches(s, q, dir)).length])),
    [q, dir]
  );

  const day = AGENDA.find((d) => d.key === dayKey) ?? AGENDA[1];
  const visible = day.sessions.filter((s) => (q ? s.venue !== "all" && matches(s, q, dir) : true));
  const stage = visible.filter((s) => s.venue !== "side").sort(byTime);
  const side = visible.filter((s) => s.venue === "side").sort(byTime);
  const otherDays = AGENDA.filter((d) => d.key !== day.key && counts[d.key] > 0);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const context = useMemo(() => ({ dir, open: (s: Session) => setOpened({ s, day }) }), [dir, day]);
  const close = useCallback(() => setOpened(null), []);

  return (
    <AgendaContext.Provider value={context}>
      <section id="agenda" className="bg-[#F4F3EF] py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-[2px] bg-[#EC8644]" />
              <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                2026 Schedule
              </span>
            </div>
            <h2
              className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              Agenda
            </h2>
            <p className="text-[#5A6B78] text-sm mt-3 max-w-xl leading-relaxed">
              Two days of talks, panels, and workshops at UT Austin, with side events each night. Tap a
              session to see who&rsquo;s speaking.{" "}
              <span className="text-[#293C4B] font-semibold">All times are Central Time (Austin)</span> and
              may still change.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div
              role="tablist"
              aria-label="Conference day"
              className="grid grid-cols-3 lg:inline-grid p-1 rounded-2xl bg-white border border-[#293C4B]/[0.06]"
            >
              {AGENDA.map((d) => {
                const active = d.key === day.key;
                return (
                  <button
                    key={d.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setDayKey(d.key)}
                    className="relative rounded-xl px-2.5 sm:px-6 py-2.5 text-left lg:min-w-[150px] outline-none focus-visible:ring-2 focus-visible:ring-[#EC8644]"
                  >
                    {active && (
                      <motion.span
                        layoutId="agenda-tab"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-[#293C4B]"
                      />
                    )}
                    <span
                      className={`relative flex items-start justify-between gap-2 transition-opacity ${
                        q && counts[d.key] === 0 && !active ? "opacity-40" : ""
                      }`}
                    >
                      <span>
                        <span
                          className={`block font-[var(--font-zuume)] font-black text-lg sm:text-xl tracking-tight leading-none ${
                            active ? "text-white" : "text-[#293C4B]"
                          }`}
                        >
                          {d.short}
                          <span className="hidden sm:inline">, Nov</span> {dayNum(d)}
                        </span>
                        <span
                          className={`block whitespace-nowrap text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] sm:tracking-[0.14em] uppercase mt-1 ${
                            active ? "text-white/60" : "text-[#9CADB7]"
                          }`}
                        >
                          {d.label}
                        </span>
                      </span>
                      {q && counts[d.key] > 0 && (
                        <span className="shrink-0 text-[10px] font-bold tabular-nums rounded-full px-1.5 py-0.5 bg-[#EC8644] text-white">
                          {counts[d.key]}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-[360px]">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CADB7] pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search speakers or sessions"
                aria-label="Search the agenda"
                className="w-full rounded-full bg-white border border-[#293C4B]/[0.06] pl-11 pr-10 py-3 text-sm text-[#293C4B] placeholder:text-[#9CADB7] outline-none focus:border-[#EC8644]/50 focus:ring-4 focus:ring-[#EC8644]/10 transition [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#9CADB7] hover:text-[#293C4B] hover:bg-[#F4F3EF] transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {q && (
            <p className="text-[#5A6B78] text-sm -mt-4 mb-6" aria-live="polite">
              {total === 0
                ? `Nothing matches “${query.trim()}”.`
                : `${total} ${total === 1 ? "session matches" : "sessions match"} “${query.trim()}” across all days.`}
            </p>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={day.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {visible.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#293C4B]/15 px-6 py-10 text-center">
                  <p className="text-[#5A6B78] text-sm">
                    Nothing on {day.weekday} matches your search.
                    {otherDays.length > 0 && " Try "}
                    {otherDays.map((d, i) => (
                      <span key={d.key}>
                        {i > 0 && " or "}
                        <button
                          onClick={() => setDayKey(d.key)}
                          className="text-[#EC8644] font-semibold hover:underline underline-offset-4"
                        >
                          {d.weekday} ({counts[d.key]})
                        </button>
                      </span>
                    ))}
                    {otherDays.length > 0 && "."}
                  </p>
                </div>
              ) : stage.length === 0 ? (
                <SideEvents sessions={side} day={day} wide />
              ) : (
                <>
                  <div className="hidden lg:flex gap-8">
                    <div className="flex-1 min-w-0">
                      <StageGrid day={day} sessions={stage} />
                    </div>
                    {side.length > 0 && (
                      <aside className="w-[260px] xl:w-[290px] shrink-0 border-l border-[#293C4B]/[0.08] pl-8">
                        <SideEvents sessions={side} day={day} />
                      </aside>
                    )}
                  </div>
                  <div className="lg:hidden flex flex-col gap-10">
                    <StageList sessions={stage} />
                    <SideEvents sessions={side} day={day} />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence>
        {opened && <SessionPanel key="panel" s={opened.s} day={opened.day} onClose={close} />}
      </AnimatePresence>
    </AgendaContext.Provider>
  );
}

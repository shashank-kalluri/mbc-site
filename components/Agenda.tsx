"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, Search, X } from "lucide-react";
import { AGENDA, VENUES, type AgendaDay, type Session, type Venue } from "@/data/agenda";

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
const people = (s: Session) => (s.title ? s.with : undefined);

const matches = (s: Session, q: string) => {
  if (!q) return true;
  const venue = s.venue === "all" ? "" : VENUES[s.venue].label;
  return [s.title, ...(s.with ?? []), s.place, venue]
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

/** `fill` stretches the card to the rows it spans in the desktop grid. */
function SessionCard({ s, showVenue = false, fill = false }: { s: Session; showVenue?: boolean; fill?: boolean }) {
  const venue = s.venue === "all" ? null : VENUES[s.venue];

  if (isTba(s)) {
    return (
      <article className={`${fill ? "h-full" : ""} rounded-2xl border border-dashed border-[#293C4B]/15 px-4 py-3.5`}>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9CADB7]">
          {range(s)}
          {showVenue && venue && <> · {venue.label}</>}
        </p>
        <p className="text-[#9CADB7] text-sm font-medium mt-1.5">To be announced</p>
      </article>
    );
  }

  return (
    <article
      className={`relative ${fill ? "h-full" : ""} rounded-2xl bg-white px-4 py-3.5 pl-5 shadow-[0_1px_2px_rgba(41,60,75,0.04)] overflow-hidden`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${ACCENT[s.venue as Venue]}`}
      />
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9CADB7]">
        {range(s)}
        {showVenue && venue && <> · {venue.label}</>}
      </p>
      <h4 className="text-[#293C4B] font-semibold text-[15px] leading-snug mt-1.5">{headline(s)}</h4>
      {people(s) && (
        <p className="text-[#5A6B78] text-[13px] leading-snug mt-1">{people(s)!.join(" · ")}</p>
      )}
      {s.href && (
        <Link
          href={s.href}
          className="inline-flex items-center gap-1 mt-2.5 text-[#EC8644] text-[13px] font-semibold hover:underline underline-offset-4"
        >
          Details <ArrowUpRight size={14} />
        </Link>
      )}
    </article>
  );
}

function SideEventCard({ s }: { s: Session }) {
  return (
    <article className="rounded-2xl bg-[#1A2A36] px-4 py-3.5">
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/45">{range(s)}</p>
      <h4 className="text-white font-semibold text-[15px] leading-snug mt-1.5">{headline(s)}</h4>
      {(s.place || people(s)) && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/55 text-[13px] mt-1.5">
          {s.place && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} className="text-[#EC8644]" />
              {s.place}
            </span>
          )}
          {people(s) && <span>Hosted by {people(s)!.join(" · ")}</span>}
        </p>
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

function SideEvents({ sessions, wide = false }: { sessions: Session[]; wide?: boolean }) {
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
          <SideEventCard key={s.start + headline(s)} s={s} />
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
  const q = query.trim().toLowerCase();

  // During the conference, open on today's tab.
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
    const match = AGENDA.find((d) => d.date === today);
    if (match) setDayKey(match.key);
  }, []);

  const counts = useMemo(
    () => Object.fromEntries(AGENDA.map((d) => [d.key, d.sessions.filter((s) => s.venue !== "all" && matches(s, q)).length])),
    [q]
  );

  const day = AGENDA.find((d) => d.key === dayKey) ?? AGENDA[1];
  const visible = day.sessions.filter((s) => (q ? s.venue !== "all" && matches(s, q) : true));
  const stage = visible.filter((s) => s.venue !== "side").sort(byTime);
  const side = visible.filter((s) => s.venue === "side").sort(byTime);
  const otherDays = AGENDA.filter((d) => d.key !== day.key && counts[d.key] > 0);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
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
          <p className="text-[#9CADB7] text-sm mt-3 max-w-xl">
            Two days of talks, panels, and workshops at UT Austin, with side events each night. All
            times are Central. More sessions will be announced soon.
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
              <SideEvents sessions={side} wide />
            ) : (
              <>
                <div className="hidden lg:flex gap-8">
                  <div className="flex-1 min-w-0">
                    <StageGrid day={day} sessions={stage} />
                  </div>
                  {side.length > 0 && (
                    <aside className="w-[260px] xl:w-[290px] shrink-0 border-l border-[#293C4B]/[0.08] pl-8">
                      <SideEvents sessions={side} />
                    </aside>
                  )}
                </div>
                <div className="lg:hidden flex flex-col gap-10">
                  <StageList sessions={stage} />
                  <SideEvents sessions={side} />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getAgenda, type Agenda as AgendaRow } from "@/lib/api/agenda";

// ---------------------------
// Types
// ---------------------------

type AgendaSession = {
  id: number | string;
  title: string;
  room: string;
  start: string;
  end: string;
  speakers?: string[];
  sponsor?: string;
  description?: string;
};

type TimelineTick = {
  time: Date;
  label: string;
  minutesFromStart: number;
};

type DayInfo = {
  key: string;
  label: string;
  pretty: string;
};

type TimelineData = {
  rooms: string[];
  byRoom: Record<string, AgendaSession[]>;
  ticks: TimelineTick[];
  earliest: Date | null;
  latest: Date | null;
  filteredSessions: AgendaSession[];
};

// ---------------------------
// Helpers
// ---------------------------

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const normalizeSpeakers = (speakers: unknown): string[] | undefined => {
  if (!Array.isArray(speakers)) return undefined;
  if (typeof speakers[0] === "string") return speakers as string[];
  return (speakers as { name?: string | null }[])
    .map((s) => s?.name ?? "")
    .filter((name): name is string => Boolean(name));
};

const normalizeSponsor = (sponsor: unknown): string | undefined => {
  if (!sponsor) return;
  if (typeof sponsor === "string") return sponsor;
  const obj = sponsor as { name?: string | null; label?: string | null; title?: string | null };
  return obj.name ?? obj.label ?? obj.title ?? undefined;
};

const mapRow = (row: AgendaRow): AgendaSession => ({
  id: row.id,
  title: row.title ?? "TBD",
  room: row.location ?? "TBD",
  start: row.start!,
  end: row.end!,
  speakers: normalizeSpeakers(row.speakers),
  sponsor: normalizeSponsor(row.sponsor),
  description: row.description ?? undefined,
});

const MINUTE_HEIGHT_PX = 2.2;

function toDateSafe(value: string): Date | null {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function minutesDiff(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / (1000 * 60);
}

const OTHER_ROOM_LABEL = "Other Events";

function isPrimaryRoom(roomRaw: string): boolean {
  const room = roomRaw.trim().toLowerCase();
  if (!room) return false;
  if (room.includes("robertson")) return true;
  if (room.startsWith("ross r")) return true;
  if (room.includes("winter garden")) return true;
  return false;
}

function extractDayKey(dateStr: string): string | null {
  const d = toDateSafe(dateStr);
  if (!d) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildDays(sessions: AgendaSession[]): DayInfo[] {
  const map = new Map<string, Date>();
  sessions.forEach((s) => {
    const key = extractDayKey(s.start);
    const d = toDateSafe(s.start);
    if (!key || !d) return;
    if (!map.has(key)) map.set(key, d);
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, d], idx) => ({
      key,
      label: `Day ${idx + 1}`,
      pretty: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    }));
}

function buildTimelineData(sessions: AgendaSession[], query: string): TimelineData {
  if (sessions.length === 0) {
    return { rooms: [], byRoom: {}, ticks: [], earliest: null, latest: null, filteredSessions: [] };
  }

  const q = query.trim().toLowerCase();
  const filteredSessions = sessions.filter((s) => {
    if (!q) return true;
    const haystack = [s.title, s.room, s.sponsor, s.description, ...(s.speakers ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  if (filteredSessions.length === 0) {
    return { rooms: [], byRoom: {}, ticks: [], earliest: null, latest: null, filteredSessions: [] };
  }

  const sorted = [...filteredSessions].sort((a, b) => +new Date(a.start) - +new Date(b.start));

  const primaryRoomsSet = new Set<string>();
  let hasOther = false;
  sorted.forEach((s) => {
    if (isPrimaryRoom(s.room)) primaryRoomsSet.add(s.room);
    else hasOther = true;
  });

  const allPrimaryRooms = Array.from(primaryRoomsSet);
  const winterGardenRooms = allPrimaryRooms.filter((r) => r.trim().toLowerCase().includes("winter garden"));
  const otherPrimaryRooms = allPrimaryRooms.filter((r) => !r.trim().toLowerCase().includes("winter garden"));

  const rooms: string[] = [...otherPrimaryRooms, ...winterGardenRooms];
  if (hasOther) rooms.push(OTHER_ROOM_LABEL);
  if (rooms.length === 0) rooms.push(OTHER_ROOM_LABEL);

  let earliest: Date | null = null;
  let latest: Date | null = null;
  sorted.forEach((s) => {
    const sDate = toDateSafe(s.start);
    const eDate = toDateSafe(s.end);
    if (!sDate || !eDate) return;
    if (!earliest || sDate < earliest) earliest = sDate;
    if (!latest || eDate > latest) latest = eDate;
  });

  if (!earliest || !latest) {
    return { rooms, byRoom: {}, ticks: [], earliest: null, latest: null, filteredSessions };
  }

  const roundedEarliest = new Date(earliest);
  roundedEarliest.setMinutes(Math.floor(roundedEarliest.getMinutes() / 30) * 30, 0, 0);

  const roundedLatest = new Date(latest);
  roundedLatest.setMinutes(Math.ceil(roundedLatest.getMinutes() / 30) * 30, 0, 0);

  const ticks: TimelineTick[] = [];
  for (
    let t = new Date(roundedEarliest);
    t <= roundedLatest;
    t = new Date(t.getTime() + 30 * 60 * 1000)
  ) {
    ticks.push({
      time: new Date(t),
      label: t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      minutesFromStart: minutesDiff(roundedEarliest, t),
    });
  }

  const byRoom: Record<string, AgendaSession[]> = {};
  rooms.forEach((r) => { byRoom[r] = []; });
  sorted.forEach((s) => {
    const targetRoom = isPrimaryRoom(s.room) ? s.room : OTHER_ROOM_LABEL;
    if (!byRoom[targetRoom]) byRoom[targetRoom] = [];
    byRoom[targetRoom].push(s);
  });

  return { rooms, byRoom, ticks, earliest: roundedEarliest, latest: roundedLatest, filteredSessions };
}

function formatTimeRange(start: string, end: string): string | null {
  const s = toDateSafe(start);
  const e = toDateSafe(end);
  if (!s || !e) return null;
  const opts: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };
  return `${s.toLocaleTimeString("en-US", opts)} – ${e.toLocaleTimeString("en-US", opts)}`;
}

// ---------------------------
// Session Card
// ---------------------------

function SessionCard({ session, compact = false }: { session: AgendaSession; compact?: boolean }) {
  const { title, room, sponsor, start, end } = session;
  const timeRange = formatTimeRange(start, end);

  if (compact) {
    return (
      <article
        tabIndex={0}
        className={cx(
          "h-full rounded-xl border border-[#293C4B]/10 bg-white",
          "px-2 sm:px-3 py-1.5 sm:py-2",
          "shadow-sm transition-all duration-150 overflow-hidden",
          "outline-none focus-visible:ring-2 focus-visible:ring-[#EC8644]/50",
          "group-hover:border-[#EC8644]/40 group-hover:bg-[#EC8644]/[0.04] group-hover:shadow-md group-hover:scale-[1.03]"
        )}
      >
        <div className="flex h-full items-center">
          <h3 className="w-full truncate text-[10px] sm:text-xs font-semibold tracking-tight text-[#293C4B]">
            {title}
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article
      tabIndex={0}
      className={cx(
        "h-full rounded-xl border border-[#293C4B]/10 bg-white",
        "px-3 py-2 sm:px-3.5 sm:py-2.5",
        "shadow-sm transition-all duration-150 overflow-hidden",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#EC8644]/50",
        "group-hover:border-[#EC8644]/40 group-hover:bg-[#EC8644]/[0.04] group-hover:shadow-md group-hover:scale-[1.03]"
      )}
    >
      <div className="flex flex-col gap-1.5">
        {timeRange && (
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#293C4B]/55">
            <span className="inline-flex items-center rounded-full bg-[#293C4B]/[0.06] px-2 py-0.5 border border-[#293C4B]/10">
              {timeRange}
            </span>
          </div>
        )}

        <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-[#293C4B] line-clamp-2">
          {title}
        </h3>

        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] text-[#293C4B]/55">
          <span className="rounded-full bg-[#F4F3EF] px-2 py-0.5 border border-[#293C4B]/10">
            {room || "TBD"}
          </span>
          {sponsor && (
            <span className="rounded-full bg-[#EC8644]/10 px-2 py-0.5 text-[#EC8644] border border-[#EC8644]/25">
              Sponsored by {sponsor}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ---------------------------
// Session Popover
// ---------------------------

function SessionPopover({
  session,
  placement = "bottom",
}: {
  session: AgendaSession;
  placement?: "top" | "bottom";
}) {
  const { title, start, end, room, sponsor, speakers, description } = session;
  const timeRange = formatTimeRange(start, end);

  const placementClasses =
    placement === "top"
      ? "absolute inset-x-0 bottom-full mb-2"
      : "absolute inset-x-0 top-full mt-2";

  return (
    <div
      className={cx(
        "pointer-events-none opacity-0",
        "group-hover:opacity-100 group-hover:pointer-events-auto",
        "group-focus-within:opacity-100 group-focus-within:pointer-events-auto",
        placementClasses,
        "z-50 w-full rounded-2xl border border-[#293C4B]/15",
        "bg-[#293C4B] p-3 shadow-2xl"
      )}
    >
      {timeRange && (
        <p className="text-[10px] sm:text-[11px] text-white/60 mb-1">{timeRange}</p>
      )}

      <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>

      <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] mb-2">
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70 border border-white/15">
          {room || "TBD"}
        </span>
        {sponsor && (
          <span className="rounded-full bg-[#EC8644]/20 px-2 py-0.5 text-[#EC8644] border border-[#EC8644]/30">
            Sponsored by {sponsor}
          </span>
        )}
      </div>

      {speakers && speakers.length > 0 && (
        <p className="text-[11px] text-white/80 mb-1.5">
          <span className="font-medium">Speakers: </span>
          {speakers.join(", ")}
        </p>
      )}

      {description && (
        <p className="text-[11px] leading-snug text-white/75">{description}</p>
      )}
    </div>
  );
}

// ---------------------------
// Controls
// ---------------------------

function AgendaControls({
  query,
  setQuery,
  days,
  activeDayKey,
  setActiveDayKey,
}: {
  query: string;
  setQuery: (v: string) => void;
  days: DayInfo[];
  activeDayKey: string | null;
  setActiveDayKey: (v: string) => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1">
        <label className="sr-only" htmlFor="agenda-search">
          Search agenda
        </label>
        <input
          id="agenda-search"
          type="text"
          placeholder="Search by session, room, speaker, sponsor…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[#293C4B]/12 bg-white shadow-sm px-4 py-2.5 text-sm text-[#293C4B] placeholder-[#9CADB7] outline-none focus:ring-2 focus:ring-[#EC8644]/40 transition"
        />
      </div>

      {days.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {days.map((day) => {
            const isActive = day.key === activeDayKey;
            return (
              <button
                key={day.key}
                type="button"
                onClick={() => setActiveDayKey(day.key)}
                className={cx(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm border font-medium transition-colors",
                  isActive
                    ? "bg-[#EC8644] text-white border-[#EC8644] shadow-sm"
                    : "bg-[#F4F3EF] text-[#293C4B]/70 border-[#293C4B]/12 hover:bg-[#E8E7E3]"
                )}
              >
                <span>{day.label}</span>
                <span className={cx("text-[11px] sm:text-xs", isActive ? "text-white/80" : "text-[#9CADB7]")}>
                  {day.pretty}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------
// Main Component
// ---------------------------

export default function AgendaSection({
  title = "Conference Agenda",
  subtitle = "Two days of talks, workshops, and networking.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [sessions, setSessions] = useState<AgendaSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeDayKey, setActiveDayKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await getAgenda();
        if (cancelled) return;
        const mapped = (rows || []).map(mapRow);
        setSessions(mapped);
      } catch (err) {
        console.error("Error loading agenda:", err);
        if (!cancelled) setSessions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const days = useMemo(() => buildDays(sessions), [sessions]);

  useEffect(() => {
    if (days.length > 0 && !activeDayKey) {
      setActiveDayKey(days[1]?.key ?? days[0].key);
    }
  }, [days, activeDayKey]);

  const dayFilteredSessions = useMemo(() => {
    if (!activeDayKey) return sessions;
    return sessions.filter((s) => extractDayKey(s.start) === activeDayKey);
  }, [sessions, activeDayKey]);

  const { rooms, byRoom, ticks, earliest, latest, filteredSessions } = useMemo(
    () => buildTimelineData(dayFilteredSessions, query),
    [dayFilteredSessions, query]
  );

  const isEmptyAfterFilter =
    !loading && dayFilteredSessions.length > 0 && filteredSessions.length === 0;

  const totalMinutes = earliest && latest ? minutesDiff(earliest, latest) : 0;
  const timelineHeight =
    totalMinutes > 0 ? totalMinutes * MINUTE_HEIGHT_PX : 60 * MINUTE_HEIGHT_PX;

  return (
    <section id="agenda" className="w-full py-16 sm:py-24 bg-[#F4F3EF]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[#EC8644] text-xs font-semibold uppercase tracking-widest mb-3">
              Schedule
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#293C4B]">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#9CADB7] max-w-prose">{subtitle}</p>
          </div>
        </div>

        {/* Controls */}
        <AgendaControls
          query={query}
          setQuery={setQuery}
          days={days}
          activeDayKey={activeDayKey}
          setActiveDayKey={setActiveDayKey}
        />

        {/* States */}
        {loading && sessions.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#293C4B]/12 p-10 text-center text-[#9CADB7] text-sm">
            Loading agenda…
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#293C4B]/12 p-10 text-center text-[#9CADB7] text-sm">
            Agenda coming soon. Check back as we finalize the schedule.
          </div>
        )}

        {!loading && sessions.length > 0 && dayFilteredSessions.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#293C4B]/12 p-10 text-center text-[#9CADB7] text-sm">
            No sessions scheduled for this day yet.
          </div>
        )}

        {isEmptyAfterFilter && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#293C4B]/12 p-10 text-center text-[#9CADB7] text-sm">
            No sessions match your search on this day.
          </div>
        )}

        {/* Timeline */}
        {!loading &&
          dayFilteredSessions.length > 0 &&
          filteredSessions.length > 0 &&
          earliest &&
          latest && (
            <div className="mt-8 pb-4 overflow-x-auto overflow-y-hidden">
              <div className="relative flex gap-4">
                {/* Time axis */}
                <div
                  className={cx(
                    "shrink-0 w-16 sm:w-20 lg:w-24",
                    "sticky left-0 top-0 z-30 bg-[#F4F3EF]/90 backdrop-blur-sm pr-3"
                  )}
                  style={{ height: timelineHeight }}
                >
                  <div className="mb-2 text-[11px] uppercase tracking-wide text-[#9CADB7]">
                    Time
                  </div>
                  <div className="relative overflow-visible" style={{ height: timelineHeight }}>
                    {ticks.map((tick) => {
                      const top = tick.minutesFromStart * MINUTE_HEIGHT_PX;
                      const isHour = tick.time.getMinutes() === 0;
                      return (
                        <div
                          key={tick.time.toISOString()}
                          className="absolute left-0 right-0"
                          style={{ top }}
                        >
                          <div className="flex items-center gap-1 -translate-y-1/2">
                            <span className={cx("h-px flex-1", isHour ? "bg-[#293C4B]/20" : "bg-[#293C4B]/8")} />
                            {isHour && (
                              <span className="text-[10px] sm:text-xs text-[#9CADB7] whitespace-nowrap">
                                {tick.label}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Room columns */}
                <div className="min-w-0 flex-1">
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${rooms.length}, minmax(200px, 1fr))` }}
                  >
                    {rooms.map((room) => {
                      const roomSessions = byRoom[room] || [];
                      return (
                        <div key={room} className="min-w-[200px]">
                          <div className="mb-2 text-xs sm:text-sm font-medium uppercase tracking-wide text-[#293C4B]/50">
                            {room}
                          </div>
                          <div
                            className="relative rounded-2xl border border-[#293C4B]/10 bg-white overflow-visible pt-1 pb-1 shadow-sm"
                            style={{ height: timelineHeight }}
                          >
                            {/* Guidelines */}
                            {ticks.map((tick) => {
                              const top = tick.minutesFromStart * MINUTE_HEIGHT_PX;
                              const isHour = tick.time.getMinutes() === 0;
                              return (
                                <div
                                  key={tick.time.toISOString()}
                                  className={cx(
                                    "absolute inset-x-0 border-t border-dashed",
                                    isHour ? "border-[#293C4B]/[0.08]" : "border-[#293C4B]/[0.04]"
                                  )}
                                  style={{ top }}
                                />
                              );
                            })}

                            {/* Sessions */}
                            {roomSessions.map((session) => {
                              const sDate = toDateSafe(session.start);
                              const eDate = toDateSafe(session.end);
                              if (!sDate || !eDate) return null;

                              const startMin = Math.max(0, minutesDiff(earliest, sDate));
                              const endMin = Math.max(startMin + 1, minutesDiff(earliest, eDate));
                              const durationMin = endMin - startMin;
                              const isShort = durationMin < 60;

                              const top = startMin * MINUTE_HEIGHT_PX;
                              const height = durationMin * MINUTE_HEIGHT_PX;
                              const sessionbottom = top + height;
                              const placeAbove = sessionbottom > timelineHeight * 0.8;

                              return (
                                <div
                                  key={session.id}
                                  className="absolute inset-x-0 group z-10 hover:z-40 focus-within:z-40"
                                  style={{ top, height }}
                                >
                                  <SessionCard session={session} compact={isShort} />
                                  <SessionPopover
                                    session={session}
                                    placement={placeAbove ? "top" : "bottom"}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  );
}

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
  key: string; // YYYY-MM-DD
  label: string; // "Day 1", "Day 2", ...
  pretty: string; // "Fri, Dec 5"
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

  // Case 1: it's already a string[]
  if (typeof speakers[0] === "string") {
    return speakers as string[];
  }

  // Case 2: array of objects with .name
  return (speakers as { name?: string | null }[])
    .map((s) => s?.name ?? "")
    .filter((name): name is string => Boolean(name));
};

const normalizeSponsor = (sponsor: unknown): string | undefined => {
  if (!sponsor) return;

  if (typeof sponsor === "string") return sponsor;

  const obj = sponsor as {
    name?: string | null;
    label?: string | null;
    title?: string | null;
  };

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

// Single source of truth for vertical scale: pixels per minute
const MINUTE_HEIGHT_PX = 2.2;

function toDateSafe(value: string): Date | null {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function minutesDiff(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / (1000 * 60);
}

// Room bucketing
const OTHER_ROOM_LABEL = "Other Events";

function isPrimaryRoom(roomRaw: string): boolean {
  const room = roomRaw.trim().toLowerCase();
  if (!room) return false;

  if (room.includes("robertson")) return true;
  if (room.startsWith("ross r")) return true;
  if (room.includes("winter garden")) return true;

  return false;
}

// Get YYYY-MM-DD from a date string
function extractDayKey(dateStr: string): string | null {
  const d = toDateSafe(dateStr);
  if (!d) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Build Day 1 / Day 2 info from sessions
function buildDays(sessions: AgendaSession[]): DayInfo[] {
  const map = new Map<string, Date>();

  sessions.forEach((s) => {
    const key = extractDayKey(s.start);
    const d = toDateSafe(s.start);
    if (!key || !d) return;
    if (!map.has(key)) map.set(key, d);
  });

  const arr = Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, d], idx) => {
      const pretty = d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      return {
        key,
        label: `Day ${idx + 1}`,
        pretty,
      };
    });

  return arr;
}

function buildTimelineData(
  sessions: AgendaSession[],
  query: string
): TimelineData {
  if (sessions.length === 0) {
    return {
      rooms: [],
      byRoom: {},
      ticks: [],
      earliest: null,
      latest: null,
      filteredSessions: [],
    };
  }

  const q = query.trim().toLowerCase();

  const filteredSessions = sessions.filter((s) => {
    if (!q) return true;
    const haystack = [
      s.title,
      s.room,
      s.sponsor,
      s.description,
      ...(s.speakers ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  if (filteredSessions.length === 0) {
    return {
      rooms: [],
      byRoom: {},
      ticks: [],
      earliest: null,
      latest: null,
      filteredSessions: [],
    };
  }

  // Sort by start time
  const sorted = [...filteredSessions].sort(
    (a, b) => +new Date(a.start) - +new Date(b.start)
  );

  // Determine primary rooms vs "Other Events"
  const primaryRoomsSet = new Set<string>();
  let hasOther = false;

  sorted.forEach((s) => {
    if (isPrimaryRoom(s.room)) {
      primaryRoomsSet.add(s.room);
    } else {
      hasOther = true;
    }
  });

  const primaryRooms = Array.from(primaryRoomsSet);
  const rooms: string[] = [...primaryRooms];
  if (hasOther) rooms.push(OTHER_ROOM_LABEL);
  if (rooms.length === 0) {
    rooms.push(OTHER_ROOM_LABEL);
  }

  // Earliest start / latest end (for this filtered set)
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
    return {
      rooms,
      byRoom: {},
      ticks: [],
      earliest: null,
      latest: null,
      filteredSessions,
    };
  }

  // Round earliest down and latest up to 30-minute boundaries
  const roundedEarliest = new Date(earliest);
  roundedEarliest.setMinutes(
    Math.floor(roundedEarliest.getMinutes() / 30) * 30,
    0,
    0
  );

  const roundedLatest = new Date(latest);
  roundedLatest.setMinutes(
    Math.ceil(roundedLatest.getMinutes() / 30) * 30,
    0,
    0
  );

  // Generate ticks every 30 minutes
  const ticks: TimelineTick[] = [];
  for (
    let t = new Date(roundedEarliest);
    t <= roundedLatest;
    t = new Date(t.getTime() + 30 * 60 * 1000)
  ) {
    ticks.push({
      time: new Date(t),
      label: t.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      minutesFromStart: minutesDiff(roundedEarliest, t),
    });
  }

  // Group sessions by column
  const byRoom: Record<string, AgendaSession[]> = {};
  rooms.forEach((r) => {
    byRoom[r] = [];
  });

  sorted.forEach((s) => {
    const targetRoom = isPrimaryRoom(s.room) ? s.room : OTHER_ROOM_LABEL;
    if (!byRoom[targetRoom]) byRoom[targetRoom] = [];
    byRoom[targetRoom].push(s);
  });

  return {
    rooms,
    byRoom,
    ticks,
    earliest: roundedEarliest,
    latest: roundedLatest,
    filteredSessions,
  };
}

// Time label inside cards
function formatTimeRange(start: string, end: string): string | null {
  const s = toDateSafe(start);
  const e = toDateSafe(end);
  if (!s || !e) return null;
  const opts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };
  return `${s.toLocaleTimeString("en-US", opts)} – ${e.toLocaleTimeString(
    "en-US",
    opts
  )}`;
}

// ---------------------------
// Session Card (compact / full)
// ---------------------------

function SessionCard({
  session,
  compact = false,
}: {
  session: AgendaSession;
  compact?: boolean;
}) {
  const { title, room, sponsor, start, end } = session;
  const timeRange = formatTimeRange(start, end);

  // Compact: short sessions → just name, one line, ellipsis
  if (compact) {
    return (
      <article
        tabIndex={0}
        className={cx(
          "h-full rounded-xl border border-white/10 bg-white/5",
          "px-2 sm:px-3 py-1.5 sm:py-2",
          "shadow-sm backdrop-blur",
          "transition-all duration-150 overflow-hidden",
          "outline-none focus-visible:ring-2 focus-visible:ring-maize/60",
          "group-hover:border-white/40 group-hover:bg-white/10 group-hover:shadow-lg group-hover:scale-[1.03]"
        )}
      >
        <div className="flex h-full items-center">
          <h3 className="w-full truncate text-[10px] text-xs sm:text-sm font-semibold tracking-tight text-white">
            {title}
          </h3>
        </div>
      </article>
    );
  }

  // Full card: longer sessions keep rich layout
  return (
    <article
      tabIndex={0}
      className={cx(
        "h-full rounded-xl border border-white/10 bg-white/5",
        "px-3 py-2 sm:px-3.5 sm:py-2.5",
        "shadow-sm backdrop-blur",
        "transition-all duration-150 overflow-hidden",
        "outline-none focus-visible:ring-2 focus-visible:ring-maize/60",
        "group-hover:border-white/40 group-hover:bg-white/10 group-hover:shadow-lg group-hover:scale-[1.03]"
      )}
    >
      <div className="flex flex-col gap-1.5">
        {timeRange && (
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-white/65">
            <span className="inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 border border-white/15">
              {timeRange}
            </span>
          </div>
        )}

        <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-white line-clamp-2">
          {title}
        </h3>

        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] text-white/60">
          <span className="rounded-full bg-white/5 px-2 py-0.5 border border-white/10">
            {room || "TBD"}
          </span>
          {sponsor && (
            <span className="rounded-full bg-maize/10 px-2 py-0.5 text-maize border border-maize/30">
              Sponsored by {sponsor}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ---------------------------
// Session Popover (full details)
// ---------------------------

function SessionPopover({ session }: { session: AgendaSession }) {
  const { title, start, end, room, sponsor, speakers, description } = session;
  const timeRange = formatTimeRange(start, end);

  return (
    <div
      className={cx(
        "pointer-events-none opacity-0",
        "group-hover:opacity-100 group-hover:pointer-events-auto",
        "group-focus-within:opacity-100 group-focus-within:pointer-events-auto",
        // BELOW the card, matching its width
        "absolute inset-x-0 top-full mt-2 z-50",
        "w-full rounded-2xl border border-white/25",
        "bg-black/90 backdrop-blur-md p-3 shadow-2xl"
      )}
    >
      {timeRange && (
        <p className="text-[10px] sm:text-[11px] text-white/70 mb-1">
          {timeRange}
        </p>
      )}

      <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>

      <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] text-white/70 mb-2">
        <span className="rounded-full bg-white/5 px-2 py-0.5 border border-white/15">
          {room || "TBD"}
        </span>
        {sponsor && (
          <span className="rounded-full bg-maize/10 px-2 py-0.5 text-maize border border-maize/30">
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
        <p className="text-[11px] leading-snug text-white/80">{description}</p>
      )}
    </div>
  );
}

// ---------------------------
// Controls (search + day toggle)
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
      {/* Search */}
      <div className="flex-1">
        <label className="sr-only" htmlFor="agenda-search">
          Search agenda
        </label>
        <input
          id="agenda-search"
          type="text"
          placeholder="Search by session title, room, speaker, sponsor…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-maize/60"
        />
      </div>

      {/* Day toggle */}
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
                  "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs sm:text-sm border",
                  isActive
                    ? "bg-maize text-black border-maize"
                    : "bg-white/5 text:white/80 border-white/15 hover:bg-white/10"
                )}
              >
                <span className="font-medium">{day.label}</span>
                <span
                  className={cx(
                    "text-[11px] sm:text-xs",
                    isActive ? "text-black" : "text-white/60"
                  )}
                >
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

    return () => {
      cancelled = true;
    };
  }, []);

  // Build list of days from all sessions
  const days = useMemo(() => buildDays(sessions), [sessions]);

  // Ensure we always have an active day when days are available
  useEffect(() => {
    if (days.length > 0 && !activeDayKey) {
      setActiveDayKey(days[0].key);
    }
  }, [days, activeDayKey]);

  // Filter sessions by active day
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
    totalMinutes > 0 ? totalMinutes * MINUTE_HEIGHT_PX : 60 * MINUTE_HEIGHT_PX; // fallback to 1h

  return (
    <section
      id="agenda"
      className="w-full py-16 sm:py-20 bg-background text-white"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-prose">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Controls (search + day toggle) */}
        <AgendaControls
          query={query}
          setQuery={setQuery}
          days={days}
          activeDayKey={activeDayKey}
          setActiveDayKey={setActiveDayKey}
        />

        {/* Loading / Empty states */}
        {loading && sessions.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/70">
            Loading agenda…
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/70">
            Agenda coming soon. Check back as we finalize the schedule.
          </div>
        )}

        {!loading &&
          sessions.length > 0 &&
          dayFilteredSessions.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/70">
              No sessions scheduled for this day yet.
            </div>
          )}

        {isEmptyAfterFilter && (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/70">
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
                    // Sticky so time stays visible while horizontal scrolling
                    "sticky left-0 top-0 z-30 bg-background/80 backdrop-blur-lg pr-3"
                  )}
                  style={{ height: timelineHeight }}
                >
                  <div className="mb-2 text-[11px] uppercase tracking-wide text-white/50">
                    Time
                  </div>
                  <div
                    className="relative overflow-visible"
                    style={{ height: timelineHeight }}
                  >
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
                            <span
                              className={cx(
                                "h-px flex-1",
                                isHour ? "bg-white/40" : "bg-white/15"
                              )}
                            />
                            {isHour && (
                              <span className="text-[10px] sm:text-xs text-white/70 whitespace-nowrap">
                                {tick.label}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rooms timeline */}
                <div className="min-w-0 flex-1">
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${rooms.length}, minmax(200px, 1fr))`,
                    }}
                  >
                    {rooms.map((room) => {
                      const roomSessions = byRoom[room] || [];

                      return (
                        <div key={room} className="min-w-[200px]">
                          <div className="mb-2 text-xs sm:text-sm font-medium uppercase tracking-wide text-white/60">
                            {room}
                          </div>
                          <div
                            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-visible pt-1 pb-1"
                            style={{ height: timelineHeight }}
                          >
                            {/* Guidelines */}
                            {ticks.map((tick) => {
                              const top =
                                tick.minutesFromStart * MINUTE_HEIGHT_PX;
                              const isHour = tick.time.getMinutes() === 0;
                              return (
                                <div
                                  key={tick.time.toISOString()}
                                  className={cx(
                                    "absolute inset-x-0 border-t border-dashed",
                                    isHour
                                      ? "border-white/15"
                                      : "border-white/5"
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

                              const startMin = Math.max(
                                0,
                                minutesDiff(earliest, sDate)
                              );
                              const endMin = Math.max(
                                startMin + 1,
                                minutesDiff(earliest, eDate)
                              );
                              const durationMin = endMin - startMin;
                              const isShort = durationMin < 60;

                              const top = startMin * MINUTE_HEIGHT_PX;
                              const height = durationMin * MINUTE_HEIGHT_PX;

                              return (
                                <div
                                  key={session.id}
                                  className="absolute inset-x-0 group z-10 hover:z-40 focus-within:z-40"
                                  style={{
                                    top,
                                    height,
                                  }}
                                >
                                  <SessionCard
                                    session={session}
                                    compact={isShort}
                                  />
                                  <SessionPopover session={session} />
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

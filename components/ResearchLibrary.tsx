"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  FileText,
  GraduationCap,
  Link2,
  Search,
  TrendingDown,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import {
  RESEARCH_TRACKS,
  type ResearchReport,
  type ResearchTrack,
  reportUrl,
  researchReports,
} from "@/data/researchReports";

const TRACK_STYLE: Record<ResearchTrack, { chip: string; Icon: typeof TrendingUp }> = {
  "long-under-250m": { chip: "bg-[#EC8644] text-white", Icon: TrendingUp },
  "long-over-250m": { chip: "bg-[#1A2A36] text-white", Icon: TrendingUp },
  "short-over-1b": { chip: "bg-[#F4F3EF] text-[#293C4B] ring-1 ring-[#293C4B]/15", Icon: TrendingDown },
};

const trackLabel = (t: ResearchTrack) => RESEARCH_TRACKS.find((x) => x.id === t)!.label;

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Everything a search term can match, folded once up front. */
const HAYSTACK = new Map(
  researchReports.map((r) => [
    r.id,
    fold(
      [r.token, `$${r.token}`, r.project, r.title, trackLabel(r.track), ...r.team, ...r.schools].join(" "),
    ),
  ]),
);

const byCount = (values: string[]) => {
  const counts = new Map<string, number>();
  values.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};

const TOKENS = byCount(researchReports.map((r) => r.token));
const SCHOOLS = byCount(researchReports.flatMap((r) => r.schools)).sort((a, b) => a[0].localeCompare(b[0]));
const PROJECT = Object.fromEntries(researchReports.map((r) => [r.token, r.project]));

/** Alphabetical by token, then title, so reports on the same asset sit together. */
const SORTED = [...researchReports].sort(
  (a, b) => a.token.localeCompare(b.token) || a.title.localeCompare(b.title),
);

const listNames = (names: string[]) =>
  names.length <= 2 ? names.join(" and ") : `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;

type Filters = { q: string; track: ResearchTrack | ""; token: string; school: string };
const EMPTY: Filters = { q: "", track: "", token: "", school: "" };

export default function ResearchLibrary() {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [openId, setOpenId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Read filters and the open report from the URL so any view can be shared as a link.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const track = p.get("track") as ResearchTrack | null;
    setFilters({
      q: p.get("q") ?? "",
      track: track && RESEARCH_TRACKS.some((t) => t.id === track) ? track : "",
      token: p.get("token")?.toUpperCase() ?? "",
      school: p.get("school") ?? "",
    });
    const report = p.get("report");
    if (report && researchReports.some((r) => r.id === report)) setOpenId(report);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    if (filters.q) p.set("q", filters.q);
    if (filters.track) p.set("track", filters.track);
    if (filters.token) p.set("token", filters.token);
    if (filters.school) p.set("school", filters.school);
    if (openId) p.set("report", openId);
    const qs = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [filters, openId, ready]);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const results = useMemo(() => {
    const terms = fold(filters.q).split(/\s+/).filter(Boolean);
    return SORTED.filter(
      (r) =>
        (!filters.track || r.track === filters.track) &&
        (!filters.token || r.token === filters.token) &&
        (!filters.school || r.schools.includes(filters.school)) &&
        terms.every((t) => HAYSTACK.get(r.id)!.includes(t)),
    );
  }, [filters]);

  /** Track counts respect every other filter, so the chips show what you'd get. */
  const trackCounts = useMemo(() => {
    const terms = fold(filters.q).split(/\s+/).filter(Boolean);
    const base = researchReports.filter(
      (r) =>
        (!filters.token || r.token === filters.token) &&
        (!filters.school || r.schools.includes(filters.school)) &&
        terms.every((t) => HAYSTACK.get(r.id)!.includes(t)),
    );
    return { all: base.length, ...Object.fromEntries(RESEARCH_TRACKS.map((t) => [t.id, base.filter((r) => r.track === t.id).length])) } as Record<string, number>;
  }, [filters.q, filters.token, filters.school]);

  const active = filters.q || filters.track || filters.token || filters.school;
  const open = openId ? researchReports.find((r) => r.id === openId) ?? null : null;

  return (
    <div className="bg-[#F4F3EF] min-h-screen overflow-x-hidden">
      {/* ---------- Header ---------- */}
      <section className="relative bg-[#1A2A36] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 90% at 90% 0%, rgba(236,134,68,0.22) 0%, rgba(236,134,68,0) 70%)",
          }}
        />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-10 lg:px-16 pt-28 pb-14 sm:pt-36 sm:pb-16">
          <Link
            href="/programs/research-competition"
            className="inline-flex items-center gap-1.5 text-white/55 text-sm font-medium hover:text-white transition-colors"
          >
            <ArrowLeft size={15} /> Research Competition
          </Link>
          <div className="flex items-center gap-3 mt-7 mb-4">
            <span className="block w-6 h-[2px] bg-[#EC8644]" />
            <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
              Franklin Crypto Research Competition · UBC 2026
            </span>
          </div>
          <h1
            className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
          >
            The report <span className="text-[#EC8644]">library</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mt-5">
            Every investment thesis submitted to this year&rsquo;s competition, written by students from{" "}
            {SCHOOLS.length} schools. Search by token, school, or name, filter by track, and open any report to
            read it.
          </p>
          <dl className="flex flex-wrap gap-x-10 gap-y-4 mt-9">
            {[
              [researchReports.length, "reports"],
              [TOKENS.length, "tokens covered"],
              [SCHOOLS.length, "schools"],
              [new Set(researchReports.flatMap((r) => r.team)).size, "students"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-[var(--font-zuume)] font-black text-white text-4xl sm:text-5xl tracking-tight leading-none">
                  {n}
                </dd>
                <dd className="text-white/45 text-[11px] font-semibold tracking-[0.18em] uppercase mt-1.5">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Controls ---------- */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-10 lg:px-16 -mt-7 relative z-10">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0_24px_48px_-28px_rgba(26,42,54,0.45)]">
          <div className="flex flex-col md:flex-row gap-3">
            <label className="relative flex-1">
              <span className="sr-only">Search reports</span>
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CADB7]" />
              <input
                type="search"
                value={filters.q}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Search by token, school, student, or title"
                className="w-full h-12 rounded-full bg-[#F4F3EF] pl-11 pr-4 text-[15px] text-[#293C4B] placeholder:text-[#9CADB7] outline-none focus:ring-2 focus:ring-[#EC8644]/50"
              />
            </label>
            <label className="relative md:w-72">
              <span className="sr-only">Filter by school</span>
              <GraduationCap size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CADB7] pointer-events-none" />
              <select
                value={filters.school}
                onChange={(e) => set("school", e.target.value)}
                className="w-full h-12 rounded-full bg-[#F4F3EF] pl-11 pr-10 text-[15px] text-[#293C4B] outline-none focus:ring-2 focus:ring-[#EC8644]/50 appearance-none cursor-pointer"
              >
                <option value="">All schools</option>
                {SCHOOLS.map(([s, n]) => (
                  <option key={s} value={s}>
                    {s} ({n})
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CADB7] pointer-events-none text-xs">▼</span>
            </label>
          </div>

          {/* Track */}
          <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Filter by track">
            {[{ id: "" as const, label: "All tracks" }, ...RESEARCH_TRACKS].map((t) => {
              const on = filters.track === t.id;
              const Icon = t.id ? TRACK_STYLE[t.id].Icon : null;
              return (
                <button
                  key={t.id || "all"}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("track", t.id)}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-semibold transition-colors ${
                    on ? "bg-[#293C4B] text-white" : "bg-[#F4F3EF] text-[#293C4B] hover:bg-[#293C4B]/10"
                  }`}
                >
                  {Icon && <Icon size={14} />}
                  {t.label}
                  <span className={`text-xs ${on ? "text-white/60" : "text-[#5A6B78]"}`}>
                    {trackCounts[t.id || "all"]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Token */}
          <div className="mt-4 pt-4 border-t border-dashed border-[#293C4B]/15">
            <p className="text-[#5A6B78] text-[11px] font-semibold tracking-[0.16em] uppercase mb-2.5">Token</p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by token">
              {TOKENS.map(([token, n]) => {
                const on = filters.token === token;
                return (
                  <button
                    key={token}
                    type="button"
                    aria-pressed={on}
                    title={PROJECT[token]}
                    onClick={() => set("token", on ? "" : token)}
                    className={`inline-flex items-center gap-1 h-8 px-3 rounded-full text-[13px] font-semibold transition-colors ${
                      on
                        ? "bg-[#EC8644] text-white"
                        : "bg-white text-[#293C4B] ring-1 ring-[#293C4B]/12 hover:ring-[#EC8644] hover:text-[#EC8644]"
                    }`}
                  >
                    ${token}
                    {n > 1 && <span className={`text-[11px] ${on ? "text-white/75" : "text-[#9CADB7]"}`}>{n}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-8 mb-4">
          <p className="text-[#5A6B78] text-sm" aria-live="polite">
            Showing <span className="text-[#293C4B] font-semibold">{results.length}</span> of{" "}
            {researchReports.length} reports
          </p>
          {active && (
            <button
              type="button"
              onClick={() => setFilters(EMPTY)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#EC8644] hover:underline underline-offset-4"
            >
              <X size={15} /> Clear filters
            </button>
          )}
        </div>
      </section>

      {/* ---------- Results ---------- */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-10 lg:px-16 pb-24">
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center">
            <p className="text-[#293C4B] font-semibold">No reports match those filters.</p>
            <p className="text-[#5A6B78] text-sm mt-1">Try a different search, or clear the filters to see every report.</p>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((r) => (
              <li key={r.id}>
                <ReportCard report={r} onOpen={() => setOpenId(r.id)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <AnimatePresence>{open && <Reader report={open} onClose={() => setOpenId(null)} />}</AnimatePresence>
    </div>
  );
}

function TrackChip({ track }: { track: ResearchTrack }) {
  const { chip, Icon } = TRACK_STYLE[track];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full ${chip}`}>
      <Icon size={12} strokeWidth={2.5} />
      {trackLabel(track)}
    </span>
  );
}

function ReportCard({ report: r, onOpen }: { report: ResearchReport; onOpen: () => void }) {
  return (
    <article className="group relative h-full bg-white rounded-3xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(26,42,54,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-[var(--font-zuume)] font-black text-[#293C4B] text-4xl tracking-tight leading-none">
            ${r.token}
          </p>
          <p className="text-[#5A6B78] text-xs mt-1 truncate">{r.project}</p>
        </div>
        <TrackChip track={r.track} />
      </div>

      <h3 className="text-[#293C4B] font-semibold leading-snug mt-5 line-clamp-3">
        {/* The stretched button makes the whole card open the reader. */}
        <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#EC8644]">
          {r.title}
        </button>
      </h3>

      <div className="mt-4 space-y-2 text-sm">
        <p className="flex items-start gap-2 text-[#293C4B]">
          <Users size={15} className="text-[#9CADB7] shrink-0 mt-0.5" />
          <span>{listNames(r.team)}</span>
        </p>
        <p className="flex items-start gap-2 text-[#5A6B78]">
          <GraduationCap size={15} className="text-[#9CADB7] shrink-0 mt-0.5" />
          <span>{r.schools.length ? r.schools.join(" · ") : "School not listed"}</span>
        </p>
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[#9CADB7] text-xs font-medium">
          <FileText size={14} /> {r.pages} pages
        </span>
        <span className="inline-flex items-center gap-1 text-[#EC8644] text-sm font-semibold group-hover:underline underline-offset-4">
          Read report <ArrowUpRight size={15} />
        </span>
      </div>
    </article>
  );
}

function Reader({ report: r, onClose }: { report: ResearchReport; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard can be blocked; the URL bar still has the link. */
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${r.token}: ${r.title}`}
      data-lenis-prevent
    >
      <button type="button" aria-label="Close report" onClick={onClose} className="absolute inset-0 bg-[#1A2A36]/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 24, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-white sm:rounded-3xl overflow-hidden flex flex-col"
      >
        <header className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 p-4 sm:p-6 border-b border-[#293C4B]/10">
          <div className="min-w-0 flex-1 pr-10 sm:pr-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-[var(--font-zuume)] font-black text-[#293C4B] text-2xl tracking-tight leading-none">
                ${r.token}
              </span>
              <TrackChip track={r.track} />
            </div>
            <h2 className="text-[#293C4B] font-semibold leading-snug mt-2">{r.title}</h2>
            <p className="text-[#5A6B78] text-sm mt-1">
              {listNames(r.team)}
              {r.schools.length > 0 && <> · {r.schools.join(" · ")}</>}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold text-[#293C4B] bg-[#F4F3EF] hover:bg-[#293C4B]/10 transition-colors"
            >
              <Link2 size={15} /> {copied ? "Copied" : "Copy link"}
            </button>
            <a
              href={reportUrl(r)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold text-white bg-[#EC8644] hover:bg-[#D4703A] transition-colors"
            >
              Open in Google Drive <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report"
            className="absolute top-3 right-3 sm:static grid place-items-center w-10 h-10 rounded-full text-[#293C4B] hover:bg-[#F4F3EF] transition-colors"
          >
            <X size={20} />
          </button>
        </header>
        <iframe
          key={r.id}
          src={`https://drive.google.com/file/d/${r.id}/preview`}
          title={`${r.token}: ${r.title}`}
          className="flex-1 w-full bg-[#F4F3EF]"
          allow="autoplay"
        />
      </motion.div>
    </motion.div>
  );
}

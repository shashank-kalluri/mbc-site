export type ProgramStatus = "live" | "coming-soon";

export type ProgramMeta = {
  slug: string;
  name: string;
  /** Short label shown above the card title. */
  tagline: string;
  /** One-paragraph summary for the index card and page metadata. */
  description: string;
  /** Right-hand detail on the index card. */
  detail: string;
  /** Background image for the index card. */
  image: string;
  /**
   * "live" programs are linked from /programs and served at /programs/<slug>.
   * "coming-soon" programs render as a locked card and their route 404s.
   * Flip to "live" to publish one.
   */
  status: ProgramStatus;
};

export const programs: ProgramMeta[] = [
  {
    slug: "founder-stage",
    name: "Student Founder Stage",
    tagline: "Demo day for founders under 25",
    description:
      "Select founders under 25 present to accelerators, investors, mentors, and builders at UBC 2026 — with a shot at a non-dilutive grant from College.xyz.",
    detail: "Applications close Oct 25",
    image: "/photos/keynote.jpg",
    status: "live",
  },
  {
    slug: "hackathon",
    name: "Hackathon",
    tagline: "Build across two days",
    description:
      "Ship something real over the course of UBC 2026 and compete for prizes from our partners.",
    detail: "Details coming soon",
    image: "/photos/workspace.jpg",
    status: "coming-soon",
  },
  {
    slug: "research-competition",
    name: "Research Competition",
    tagline: "Franklin Templeton Research Competition",
    description:
      "Submit original research and present your findings to industry judges at UBC 2026.",
    detail: "Details coming soon",
    image: "/photos/research-talk.jpg",
    status: "coming-soon",
  },
];

/** Programs with a published page — used for routing and the sitemap. */
export const livePrograms = () => programs.filter((p) => p.status === "live");

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);

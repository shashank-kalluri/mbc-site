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
    tagline: "One week · $23,500+ in prizes",
    description:
      "Build for a week on Solana or Arc, then pitch the finals live at UBC 2026. Prizes from Solana, Circle, Gemini, and ElevenLabs.",
    detail: "Hacking starts Nov 13",
    image: "/photos/hackathon/heads-down.jpg",
    status: "live",
  },
  {
    slug: "research-competition",
    name: "Research Competition",
    tagline: "Franklin Crypto · $10,000 prize pool",
    description:
      "Write an investment thesis on one crypto asset, then pitch it live to judges from Franklin Templeton and top funds at UBC 2026.",
    detail: "Reports due Nov 9",
    image: "/photos/research-talk.jpg",
    status: "live",
  },
];

/** Programs with a published page — used for routing and the sitemap. */
export const livePrograms = () => programs.filter((p) => p.status === "live");

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);

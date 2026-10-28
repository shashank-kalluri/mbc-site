/** UBC 2026 schedule. Times are local to Austin (CT), written as 24-hour
 *  "HH:MM". An end time earlier than its start runs past midnight. */

export type Venue = "main" | "second" | "workshop" | "side";

export type Session = {
  start: string;
  end: string;
  /** "all" spans every stage, for check-in and lunch. */
  venue: Venue | "all";
  /** Left out when the speakers are the headline, or when the slot isn't announced yet. */
  title?: string;
  /** Speakers and organizations on the session. */
  with?: string[];
  /** Where an off-site event happens. */
  place?: string;
  /** A program page with more detail. */
  href?: string;
};

export type AgendaDay = {
  key: string;
  /** ISO date, used to open today's tab during the conference. */
  date: string;
  weekday: string;
  short: string;
  label: string;
  sessions: Session[];
};

export const VENUES: Record<Venue, { label: string; place?: string }> = {
  main: { label: "Main Stage", place: "Zlotnick Ballroom" },
  second: { label: "Second Stage" },
  workshop: { label: "Workshops", place: "Rowling Classroom" },
  side: { label: "Side events", place: "Off-site" },
};

export const AGENDA: AgendaDay[] = [
  {
    key: "thu",
    date: "2026-11-19",
    weekday: "Thursday",
    short: "Thu",
    label: "Arrival night",
    sessions: [
      {
        start: "19:00",
        end: "22:00",
        venue: "side",
        title: "Bowling Night",
        with: ["Akash Network"],
        place: "Texas Union",
      },
    ],
  },
  {
    key: "fri",
    date: "2026-11-20",
    weekday: "Friday",
    short: "Fri",
    label: "Day 1",
    sessions: [
      { start: "08:00", end: "10:00", venue: "all", title: "Check-in" },

      { start: "10:00", end: "10:15", venue: "main", title: "Opening Remarks" },
      { start: "10:20", end: "10:50", venue: "main", with: ["Taylor Lindman", "Evan Fisher"] },
      { start: "10:55", end: "11:35", venue: "main", with: ["Joe Kelly", "Dan Held"] },
      {
        start: "11:40",
        end: "12:10",
        venue: "main",
        title: "From Wallet to Checkout: Crypto Payments Go Mainstream",
        with: ["Keith Grossman", "Aaron Solanki"],
      },
      { start: "12:15", end: "12:55", venue: "main", title: "Venture Panel" },
      {
        start: "13:30",
        end: "14:10",
        venue: "main",
        title: "Non-Financial Use Cases of Blockchain",
        with: ["Monad", "Akash Network"],
      },
      { start: "14:15", end: "14:55", venue: "main" },
      {
        start: "15:00",
        end: "15:40",
        venue: "main",
        title: "Crypto x AI: Making AI Useful",
        with: ["Alan Orwick", "Bittensor", "No Limit Holdings"],
      },
      {
        start: "15:45",
        end: "16:15",
        venue: "main",
        title: "Institutional Adoption",
        with: ["Dan Roesbery", "Jacob McCrum", "Circle", "Franklin Templeton"],
      },
      { start: "16:20", end: "17:00", venue: "main" },
      { start: "17:00", end: "17:10", venue: "main", title: "Day 1 Closing" },

      { start: "10:55", end: "11:35", venue: "second", title: "Superteam USA" },
      { start: "11:40", end: "12:10", venue: "second", title: "Stand With Crypto" },
      {
        start: "12:15",
        end: "12:55",
        venue: "second",
        title: "Recruiters Panel",
        with: ["Gemini", "Coinbase", "Circle"],
      },
      {
        start: "14:15",
        end: "16:15",
        venue: "second",
        title: "Research Competition Pitches + Student Panel",
        href: "/programs/research-competition",
      },

      { start: "13:00", end: "13:30", venue: "all", title: "Lunch" },

      { start: "13:30", end: "14:10", venue: "workshop", title: "Gemini Recruiting Workshop", with: ["Gemini"] },
      { start: "14:15", end: "14:55", venue: "workshop", title: "Coinbase Recruiting Workshop", with: ["Coinbase"] },
      {
        start: "15:00",
        end: "15:40",
        venue: "workshop",
        title: "How to Win a Hackathon",
        with: ["Nischay Rawal", "Colosseum"],
      },

      { start: "18:30", end: "22:30", venue: "side", title: "Rec Sports", place: "Whitaker Fields" },
      { start: "19:30", end: "00:30", venue: "side", title: "Bar Crawl", place: "6th Street" },
    ],
  },
  {
    key: "sat",
    date: "2026-11-21",
    weekday: "Saturday",
    short: "Sat",
    label: "Day 2",
    sessions: [
      { start: "08:00", end: "10:00", venue: "side", title: "Morning Run + Coffee" },

      { start: "10:00", end: "10:15", venue: "main", title: "Morning Intro + Day 1 Recap" },
      { start: "10:20", end: "10:50", venue: "main" },
      {
        start: "11:00",
        end: "11:40",
        venue: "main",
        title: "Solana's Next Chapter",
        with: ["Lucas Bruder", "Vibhu Norby", "Nathan Liow"],
      },
      { start: "11:45", end: "12:25", venue: "main" },
      { start: "12:30", end: "13:00", venue: "main" },
      {
        start: "13:30",
        end: "14:10",
        venue: "main",
        title: "DeFi and the Token Supercycle",
        with: ["1inch", "Meteora"],
      },
      { start: "14:15", end: "14:45", venue: "main" },
      {
        start: "14:50",
        end: "15:30",
        venue: "main",
        title: "From Research Paper to Protocol",
        with: ["Gil Rosen", "USC VanEck Digital Assets Initiative"],
      },
      { start: "15:35", end: "16:05", venue: "main", title: "Agentic Commerce" },
      { start: "16:10", end: "16:40", venue: "main", with: ["Scott Aaronson", "Colton Dillon"] },
      { start: "16:45", end: "17:25", venue: "main", title: "Blockchain Club Presidents Panel" },
      { start: "17:30", end: "18:00", venue: "main", title: "Closing Ceremony and Awards" },

      { start: "10:00", end: "10:15", venue: "second", title: "Recap" },
      { start: "10:20", end: "10:55", venue: "second", title: "Avalanche Team1" },
      {
        start: "10:55",
        end: "12:55",
        venue: "second",
        title: "Hackathon Finals",
        href: "/programs/hackathon",
      },
      {
        start: "14:15",
        end: "17:25",
        venue: "second",
        title: "Student Founder Stage",
        href: "/programs/founder-stage",
      },

      { start: "13:00", end: "13:30", venue: "all", title: "Lunch" },

      { start: "13:30", end: "14:10", venue: "workshop", title: "Solana Developer Workshop", with: ["Solana"] },
      { start: "14:50", end: "15:30", venue: "workshop", title: "Circle Developer Workshop", with: ["Circle"] },
      { start: "15:35", end: "16:05", venue: "workshop", title: "Monad Developer Workshop", with: ["Monad"] },

      { start: "21:00", end: "00:00", venue: "side", title: "After Party" },
    ],
  },
];

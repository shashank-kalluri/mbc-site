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
  /** A short line under an off-site event, such as an unconfirmed start time. */
  note?: string;
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
  second: { label: "Second Stage", place: "Zlotnick Ballroom" },
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
      {
        start: "20:00",
        end: "22:30",
        venue: "side",
        title: "PizzaDAO Side Event",
        place: "Central Brewing District",
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
      { start: "10:20", end: "10:50", venue: "main" },
      {
        start: "10:55",
        end: "11:35",
        venue: "main",
        title: "Bitcoin and Quantum",
        with: ["Joe Kelly", "Dan Held", "Scott Aaronson", "Colton Dillion"],
      },
      {
        start: "11:40",
        end: "12:10",
        venue: "main",
        title: "From Wallet to Checkout: Crypto Payments Go Mainstream",
        with: ["Keith Grossman", "Aaron Solanki"],
      },
      {
        start: "12:15",
        end: "12:55",
        venue: "main",
        title: "The State of the Industry: A Venture Perspective",
        with: ["Neil Harounian", "Dylan Unruh"],
      },
      {
        start: "14:00",
        end: "14:40",
        venue: "main",
        title: "Entertainment Finance",
        with: ["Schoen Amidor", "George Heckman", "Haun Ventures"],
      },
      {
        start: "14:45",
        end: "15:25",
        venue: "main",
        title: "Agentic Commerce",
        with: ["Neeraj Prasad", "Zach Meltzer", "Circle"],
      },
      { start: "15:30", end: "16:10", venue: "main" },
      { start: "16:15", end: "16:45", venue: "main" },
      { start: "16:50", end: "17:00", venue: "main", title: "Day 1 Closing" },

      { start: "10:50", end: "11:05", venue: "second", title: "Stand With Crypto" },
      { start: "11:10", end: "11:25", venue: "second", title: "Superteam USA" },
      { start: "11:30", end: "11:45", venue: "second", title: "Avalanche Team1" },
      {
        start: "11:50",
        end: "12:30",
        venue: "second",
        title: "Recruiters Panel",
        with: ["Grace Reginato", "Ian Peryn", "Coinbase"],
      },
      {
        start: "12:35",
        end: "12:55",
        venue: "second",
        title: "Patch the Planet: Three Lessons for DeFi from AI Bug Hunting",
        with: ["Trail of Bits"],
      },
      {
        start: "14:00",
        end: "14:30",
        venue: "second",
        title: "From Research Paper to Protocol",
        with: ["Cesare Fracassi", "Gil Rosen", "USC VanEck Digital Assets Initiative"],
      },
      {
        start: "14:50",
        end: "16:50",
        venue: "second",
        title: "Research Competition Pitches",
        href: "/programs/research-competition",
      },

      { start: "13:00", end: "14:00", venue: "all", title: "Lunch" },

      { start: "10:50", end: "11:30", venue: "workshop", title: "Circle Developer Workshop", with: ["Circle"] },
      { start: "11:35", end: "12:15", venue: "workshop", title: "Solana Developer Workshop", with: ["Solana"] },
      { start: "12:20", end: "13:00", venue: "workshop", title: "Cursor Workshop", with: ["Cursor"] },
      { start: "14:10", end: "14:50", venue: "workshop", title: "Gemini Recruiting Workshop", with: ["Gemini"] },
      { start: "15:10", end: "15:50", venue: "workshop", title: "Coinbase Recruiting Workshop", with: ["Coinbase"] },

      { start: "18:00", end: "22:00", venue: "side", title: "Rec Sports", place: "Whitaker Fields" },
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

      { start: "10:00", end: "10:10", venue: "main", title: "Morning Intro + Day 1 Recap" },
      { start: "10:10", end: "10:40", venue: "main", with: ["Shashank Kalluri", "Agha Khan"] },
      {
        start: "10:45",
        end: "11:25",
        venue: "main",
        title: "Solana's Next Chapter",
        with: ["Lucas Bruder", "Vibhu Norby", "Nathan Liow"],
      },
      {
        start: "11:30",
        end: "12:00",
        venue: "main",
        title: "Should You Drop Out? A Fireside with YC",
        with: ["Nemil Dalal", "Evan Solomon"],
      },
      { start: "12:05", end: "12:35", venue: "main", title: "Z Fellows Fireside", with: ["Cory Levy"] },
      {
        start: "13:45",
        end: "14:25",
        venue: "main",
        title: "Crypto x AI: Making AI Useful",
        with: ["Alan Orwick", "Brian Breslow", "Bittensor", "Akash Network"],
      },
      { start: "14:30", end: "15:00", venue: "main", title: "Fireside Chat" },
      {
        start: "15:05",
        end: "15:35",
        venue: "main",
        title: "DeFi and the Token Supercycle",
        with: ["Ayman Baba", "1inch", "Tangem"],
      },
      {
        start: "15:40",
        end: "16:10",
        venue: "main",
        title: "Is Blockchain a Financial Technology?",
        with: ["Ori Shimony", "Monad", "Haun Ventures"],
      },
      {
        start: "16:15",
        end: "16:55",
        venue: "main",
        title: "Blockchain Club Presidents Panel",
        with: ["Purdue", "Kansas", "Ohio State"],
      },
      { start: "17:10", end: "17:30", venue: "main", title: "Closing Ceremony and Awards" },

      {
        start: "10:15",
        end: "11:45",
        venue: "second",
        title: "Hackathon Finals",
        href: "/programs/hackathon",
      },
      {
        start: "11:50",
        end: "12:25",
        venue: "second",
        title: "Students Starting Businesses",
        with: ["Nischay Rawal", "Pravesh Mansharamani", "Colosseum"],
      },
      { start: "12:30", end: "12:45", venue: "second", title: "USC VanEck Digital Assets Initiative" },
      {
        start: "13:45",
        end: "15:25",
        venue: "second",
        title: "Student Founder Stage (Batch 2)",
        href: "/programs/founder-stage",
      },
      {
        start: "15:30",
        end: "17:10",
        venue: "second",
        title: "Student Founder Stage (Batch 1)",
        href: "/programs/founder-stage",
      },

      { start: "12:45", end: "13:45", venue: "all", title: "Lunch" },

      { start: "11:00", end: "11:40", venue: "workshop", title: "Monad Developer Workshop", with: ["Monad"] },
      { start: "11:50", end: "12:30", venue: "workshop" },
      { start: "15:00", end: "15:40", venue: "workshop", title: "Anthropic Workshop", with: ["Anthropic"] },

      {
        start: "14:30",
        end: "18:30",
        venue: "side",
        title: "Texas vs. Arkansas Football Game",
        place: "DKR-Texas Memorial Stadium",
        note: "Kickoff is set for between 2:30 and 3:30 PM. The exact time hasn't been announced yet.",
      },
      { start: "18:00", end: "21:00", venue: "side", title: "Side Event", place: "Bangers" },
      { start: "21:00", end: "00:00", venue: "side", title: "After Party" },
    ],
  },
];

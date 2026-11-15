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
  second: { label: "Student Stage", place: "Zlotnick Ballroom" },
  workshop: { label: "Workshops", place: "Rowling Hall, Classroom 4.314" },
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
      {
        start: "10:20",
        end: "10:45",
        venue: "main",
        title: "Fireside: AI Accountability & Agentic Payments",
        with: ["Rich Widmann", "Catrina Wang"],
      },
      {
        start: "10:50",
        end: "11:25",
        venue: "main",
        title: "The Future of Bitcoin: Will Quantum Computing Break It?",
        with: ["Dhruv Bansal", "Joe Kelly", "Dan Held (moderator)"],
      },
      {
        start: "11:30",
        end: "11:55",
        venue: "main",
        title: "A Conversation with Alok Vasudev, Managing Partner of Standard",
        with: ["Alok Vasudev", "Dylan Unruh"],
      },
      {
        start: "12:00",
        end: "12:35",
        venue: "main",
        title: "The State of the Industry: A Venture Perspective",
        with: ["Henry Harris", "Neil Harounian", "Lou Mohn", "Zack Rosenblatt (moderator)"],
      },
      {
        start: "12:40",
        end: "13:00",
        venue: "main",
        title: "Patch the Planet: Three Lessons for DeFi from AI Bug Hunting",
        with: ["Dan Guido"],
      },
      {
        start: "14:00",
        end: "14:35",
        venue: "main",
        title: "When Finance Becomes Entertainment",
        with: ["Henry Zhang", "George Heckman", "Matthew Nay", "Schoen Amidor (moderator)"],
      },
      {
        start: "14:40",
        end: "15:15",
        venue: "main",
        title: "Agentic Commerce: When AI Starts Spending Money",
        with: ["Christopher Ries", "Abhay Mavalankar", "Reva Jariwala (moderator)"],
      },
      {
        start: "15:20",
        end: "15:55",
        venue: "main",
        title: "Crypto Goes Institutional: What Does That Even Mean?",
        with: ["Jesse McGannon", "Jacob McCrum", "Gwénolé Martin", "Agha Khan (moderator)"],
      },
      {
        start: "16:00",
        end: "16:35",
        venue: "main",
        title: "How Do Sports Teams Use AI?",
        with: ["Ariel Wengroff", "Jordan Kolosey", "Evan Solomon (moderator)"],
      },
      { start: "16:40", end: "16:50", venue: "main", title: "Day 1 Closing" },

      { start: "10:50", end: "11:05", venue: "second", title: "Stand With Crypto", with: ["Mason Lyndaugh"] },
      { start: "11:10", end: "11:25", venue: "second", title: "Superteam USA", with: ["Nicky Scanz"] },
      { start: "11:30", end: "11:45", venue: "second", title: "Team1", with: ["Alexander Mangin"] },
      {
        start: "11:50",
        end: "12:25",
        venue: "second",
        title: "Recruiters: How to Get a Job in Crypto",
        with: ["Grace Reginato", "Kaitlyn Wehner", "Ian Carroll", "Brock Benton (moderator)"],
      },
      { start: "12:45", end: "13:00", venue: "second", title: "Startup Soup to Nuts", with: ["Aaron Brogan"] },
      {
        start: "14:00",
        end: "14:25",
        venue: "second",
        title: "From Research Paper to Protocol",
        with: ["Steven Willinger", "Cesare Fracassi (moderator)"],
      },
      {
        start: "14:30",
        end: "16:40",
        venue: "second",
        title: "Research Competition Pitches",
        href: "/programs/research-competition",
      },

      { start: "13:00", end: "14:00", venue: "all", title: "Lunch" },

      { start: "11:00", end: "11:40", venue: "workshop", title: "Circle Workshop" },
      { start: "12:10", end: "12:50", venue: "workshop", title: "Anthropic Workshop" },
      { start: "14:20", end: "15:00", venue: "workshop", title: "Solana Workshop" },
      { start: "15:20", end: "16:00", venue: "workshop", title: "Cursor Workshop" },

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
      {
        start: "10:15",
        end: "10:40",
        venue: "main",
        title: "Consulting Meets Crypto: Inside the Industry",
        with: ["Shashank Kalluri", "Agha Khan"],
      },
      {
        start: "10:45",
        end: "11:20",
        venue: "main",
        title: "Solana's Next Chapter",
        with: ["Vibhu Norby", "Lucas Bruder", "Nathan Liow (moderator)"],
      },
      {
        start: "11:25",
        end: "11:50",
        venue: "main",
        title: "Should You Drop Out? A Fireside with YC",
        with: ["Nemil Dalal", "Evan Solomon"],
      },
      {
        start: "11:55",
        end: "12:20",
        venue: "main",
        title: "A Conversation with Cory Levy, Founder of Z Fellows",
        with: ["Cory Levy", "Markus Lam"],
      },
      {
        start: "12:25",
        end: "12:45",
        venue: "main",
        title: "From Zero to Funded: How to Raise Your Pre-Seed Round + Q&A",
        with: ["Evan Fisher"],
      },
      {
        start: "13:30",
        end: "13:45",
        venue: "main",
        title: "The Future of Communities: Introducing Edge City",
        with: ["Telamon Ardavanis"],
      },
      {
        start: "13:45",
        end: "14:20",
        venue: "main",
        title: "Crypto x AI: Making AI Actually Useful",
        with: ["Alan Orwick", "Grant El-Deir", "Joe Deng", "Arjun Yenamandra (moderator)"],
      },
      {
        start: "14:25",
        end: "14:55",
        venue: "main",
        title: "From Wallet to Checkout: Crypto Payments Go Mainstream",
        with: ["Keith A. Grossman", "Aaron Solanki"],
      },
      {
        start: "15:00",
        end: "15:35",
        venue: "main",
        title: "DeFi Under Attack: Can Crypto Solve Its Security Problem?",
        with: ["Tanner Moore", "Brandon Nebeker", "Oliver Tipton", "Ayman Baba (moderator)"],
      },
      {
        start: "15:40",
        end: "16:15",
        venue: "main",
        title: "Is Blockchain a Financial Technology?",
        with: ["Ori Shimony", "Charles Lin", "Lucas “LTR” Raymond", "Evan Fisher (moderator)"],
      },
      {
        start: "16:20",
        end: "16:55",
        venue: "main",
        title: "Blockchain Club Presidents Panel",
        with: ["Neena Naikar", "Caleb Hite", "Jack Korinek", "Evan Thompson (moderator)"],
      },
      { start: "17:00", end: "17:20", venue: "main", title: "Closing Ceremony and Awards" },

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
        title: "From Campus to Company",
        with: ["Pravesh Mansharamani", "Evan Rama", "Karthik Pelleti", "Nate Levine (moderator)"],
      },
      {
        start: "12:30",
        end: "12:45",
        venue: "second",
        title: "USC Marshall VanEck Digital Assets Initiative",
        with: ["Alan Cruz Siero"],
      },
      {
        start: "13:30",
        end: "15:25",
        venue: "second",
        title: "Student Founder Stage (Batch 2)",
        href: "/programs/founder-stage",
      },
      {
        start: "15:25",
        end: "16:55",
        venue: "second",
        title: "Student Founder Stage (Batch 1)",
        href: "/programs/founder-stage",
      },

      { start: "12:45", end: "13:30", venue: "all", title: "Lunch" },

      { start: "11:00", end: "11:40", venue: "workshop", title: "Monad Workshop", with: ["Kacie Ahmed"] },
      { start: "12:00", end: "12:40", venue: "workshop", title: "Base Workshop", with: ["Fahim Ahmed"] },
      { start: "14:00", end: "14:40", venue: "workshop", title: "Gemini Recruiting Workshop", with: ["Grace Reginato"] },

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

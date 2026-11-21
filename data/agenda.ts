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
  /** Speakers on a stage session, or the organizations hosting a side event. */
  with?: string[];
  /** Whoever moderates a panel. Shown after the speakers. */
  moderator?: string;
  /** Where an off-site event happens. */
  place?: string;
  /** Street address for an off-site event. With it, the place opens in Google Maps. */
  address?: string;
  /** A one-line description of an off-site event or a stage session. */
  blurb?: string;
  /** The event's Luma page, where people sign up. */
  rsvp?: string;
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

export const VENUES: Record<Venue, { label: string; place?: string; /** Shown on phone cards in place of the label. */ short?: string }> = {
  main: { label: "Main Stage", place: "Zlotnick Ballroom" },
  second: { label: "Student Stage", place: "Zlotnick Ballroom" },
  workshop: { label: "Workshops", place: "Rowling Hall, Classroom 4.314", short: "Rowling Hall 4.314" },
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
        title: "UBC Leaders: Off Campus",
        with: ["Team1"],
        place: "Shared after you register",
        blurb: "Dinner for blockchain club presidents and VPs, with a first look at Team1 Campus Collective.",
        rsvp: "https://luma.com/9rz3fnbe",
      },
      {
        start: "20:00",
        end: "22:30",
        venue: "side",
        title: "UBC Kickoff Event with Akash",
        with: ["Akash Network"],
        place: "Texas Union Underground",
        address: "2308 Whitis Ave, Austin, TX 78712",
        blurb: "Bowling, billiards and food with the Akash team at the UT student union.",
        rsvp: "https://luma.com/ubckickoffeventwithakash",
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
        end: "10:50",
        venue: "main",
        title: "From AI Agents to Stablecoins: The Future of Web3",
        with: ["Rich Widmann", "Catrina Wang"],
      },
      {
        start: "10:55",
        end: "11:25",
        venue: "main",
        title: "Building Companies in Bitcoin",
        with: ["Dan Held", "Joe Kelly"],
      },
      {
        start: "11:30",
        end: "11:55",
        venue: "main",
        title: "A Conversation with Alok Vasudev, Managing Partner of Standard Venture",
        with: ["Alok Vasudev", "Dylan Unruh"],
      },
      {
        start: "12:00",
        end: "12:35",
        venue: "main",
        title: "The State of the Industry: A Venture Perspective",
        with: ["Henry Harris", "Neil Harounian", "Lou Mohn"],
        moderator: "Zack Rosenblatt",
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
        with: ["Preston Ellis", "George Heckman", "Matthew Nay"],
        moderator: "Schoen Amidor",
      },
      {
        start: "14:40",
        end: "15:15",
        venue: "main",
        title: "Agentic Commerce: When AI Starts Spending Money",
        with: ["Christopher Ries", "Abhay Mavalankar", "Charles Lin"],
        moderator: "Reva Jariwala",
      },
      {
        start: "15:20",
        end: "15:55",
        venue: "main",
        title: "Crypto Goes Institutional: What Does That Even Mean?",
        with: ["Jesse McGannon", "Jacob McCrum", "Gwénolé Martin"],
        moderator: "Agha Khan",
      },
      {
        start: "16:00",
        end: "16:35",
        venue: "main",
        title: "How Do Sports Teams Use AI?",
        with: ["Ariel Wengroff", "Jordan Kolosey"],
        moderator: "Evan Solomon",
      },
      { start: "16:40", end: "16:50", venue: "main", title: "Day 1 Closing" },

      { start: "10:50", end: "11:05", venue: "second", title: "Stand With Crypto" },
      { start: "11:10", end: "11:25", venue: "second", title: "Superteam USA", with: ["Zach Zelle"] },
      { start: "11:30", end: "11:45", venue: "second", title: "Team1", with: ["Alexandre Mangin"] },
      {
        start: "11:50",
        end: "12:25",
        venue: "second",
        title: "Recruiters: How to Get a Job in Crypto",
        with: ["Grace Reginato", "Kaitlyn Wehner", "Ian Carroll"],
        moderator: "Brock Benton",
      },
      { start: "12:30", end: "12:45", venue: "second", title: "Zcash", with: ["Daniel Sequeira"] },
      { start: "12:45", end: "13:00", venue: "second", title: "Startup Soup to Nuts", with: ["Aaron Brogan"] },
      {
        start: "14:00",
        end: "14:25",
        venue: "second",
        title: "From Research Paper to Protocol",
        with: ["Steven Willinger"],
        moderator: "Cesare Fracassi",
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

      {
        start: "07:00",
        end: "10:00",
        venue: "side",
        title: "Coffee Protocol",
        with: ["Whop", "Superteam USA"],
        place: "Near UT Austin, shared after you register",
        blurb: "A morning coffee mixer for founders, builders and operators before Day 1.",
        rsvp: "https://luma.com/scrwhb6t",
      },
      {
        start: "18:00",
        end: "21:30",
        venue: "side",
        title: "UBC Pickleball Cup with Meteora",
        with: ["Boiler Blockchain", "Meteora"],
        place: "Whitaker Fields, UT Austin",
        address: "Whitaker Fields, UT Austin, Austin, TX",
        blurb: "Pair up with someone from your school or company and play for your org. Paddles and snacks provided.",
        rsvp: "https://luma.com/jcvyakxc",
      },
      {
        start: "18:00",
        end: "21:00",
        venue: "side",
        title: "Coinbase Invitational",
        with: ["Coinbase"],
        place: "Shared with confirmed guests",
        blurb: "An invite-only evening with Coinbase's Emerging Talent recruiters. Applications closed Nov 13.",
        rsvp: "https://luma.com/deycl6jz",
      },
      {
        start: "20:00",
        end: "00:00",
        venue: "side",
        title: "Blendy's Bull-Bustin Bullsh*t Bonanza",
        place: "Key Bar",
        address: "617 W 6th St, Austin, TX 78701",
        blurb: "Mechanical bull riding and drinks on 6th Street, with a bar crawl after.",
        rsvp: "https://luma.com/x5urwaqq",
      },
    ],
  },
  {
    key: "sat",
    date: "2026-11-21",
    weekday: "Saturday",
    short: "Sat",
    label: "Day 2",
    sessions: [
      {
        start: "07:30",
        end: "08:30",
        venue: "side",
        title: "UBC Run Club and Coffee with Ledger",
        with: ["Ledger"],
        place: "Fannie Davis Town Lake Gazebo",
        address: "Fannie Davis Town Lake Gazebo, Ann and Roy Butler Hike and Bike Trail, Austin, TX 78701",
        blurb: "A 1.77-mile run along Lady Bird Lake for every pace, ending with free coffee at Revolución Cafe.",
        rsvp: "https://luma.com/sdn4fpmh",
      },
      {
        start: "08:45",
        end: "09:45",
        venue: "side",
        title: "Girls' Breakfast @ UBC",
        place: "Haraz Coffee House",
        address: "500 W Martin Luther King Jr Blvd, Austin, TX 78701",
        blurb: "Breakfast and coffee for the women of UBC, then a walk over together for Day 2.",
        rsvp: "https://luma.com/pmd5ocra",
      },

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
        with: ["Vibhu Norby", "Lucas Bruder"],
        moderator: "Nathan Liow",
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
        with: ["Alan Orwick", "Grant El-Deir", "Joe Deng"],
        moderator: "Arjun Yenamandra",
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
        with: ["Tanner Moore", "Brandon Nebeker", "Oliver Tipton"],
        moderator: "Ayman Baba",
      },
      {
        start: "15:40",
        end: "16:15",
        venue: "main",
        title: "Is Blockchain a Financial Technology?",
        with: ["Ori Shimony", "Lucas “LTR” Raymond"],
        moderator: "Evan Fisher",
      },
      {
        start: "16:20",
        end: "16:55",
        venue: "main",
        title: "Blockchain Club Presidents Panel",
        with: ["Neena Naikar", "Caleb Hite", "Jack Korinek"],
        moderator: "Evan Thompson",
      },
      { start: "17:00", end: "17:20", venue: "main", title: "Closing Ceremony and Awards" },

      {
        start: "10:00",
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
        with: ["Pravesh Mansharamani", "Evan Rama", "Karthik Pelleti"],
        moderator: "Nate Levine",
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
        end: "15:45",
        venue: "second",
        title: "Student Founder Stage: Pre-Seed",
        href: "/programs/founder-stage",
      },
      {
        start: "15:55",
        end: "16:55",
        venue: "second",
        title: "Student Founder Stage: Venture-Backed",
        href: "/programs/founder-stage",
      },

      { start: "12:45", end: "13:30", venue: "all", title: "Lunch" },

      { start: "11:00", end: "11:40", venue: "workshop", title: "Monad Workshop", with: ["Kacie Ahmed"] },
      { start: "12:00", end: "12:40", venue: "workshop", title: "Base Workshop", with: ["Fahim Ahmed"] },
      { start: "14:00", end: "14:40", venue: "workshop", title: "Gemini Recruiting Workshop", with: ["Grace Reginato"] },
      {
        start: "15:00",
        end: "15:40",
        venue: "workshop",
        title: "Solana Workshop, Part 2",
        blurb: "Learn a few AI tricks and how to set up Solana payments for your AI agent. Twenty people will leave with a Solana hardware badge.",
      },

      {
        start: "14:30",
        end: "18:30",
        venue: "side",
        title: "Texas vs. Arkansas Football Game",
        place: "DKR-Texas Memorial Stadium",
        address: "2139 San Jacinto Blvd, Austin, TX 78712",
        note: "Kickoff is set for between 2:30 and 3:30 PM. The exact time hasn't been announced yet.",
      },
      {
        start: "17:30",
        end: "21:00",
        venue: "side",
        title: "UBC Happy Hour",
        with: ["Solana Foundation"],
        place: "Banger's Sausage House & Beer Garden",
        address: "79 Rainey St, Austin, TX 78701",
        blurb: "Happy hour with the Solana Foundation on Rainey Street.",
        rsvp: "https://luma.com/ubc-hh",
      },
      {
        start: "18:00",
        end: "21:00",
        venue: "side",
        title: "Lone Star Slice at UBC 2026",
        with: ["PizzaDAO", "ATX DAO", "Team1"],
        place: "Central District Brewing",
        address: "417 Red River St, Austin, TX 78701",
        blurb: "A pizza party with drinks and a few surprises. All ages welcome.",
        rsvp: "https://luma.com/73hn7jg4",
      },
      {
        start: "18:00",
        end: "20:00",
        venue: "side",
        title: "Crypto Founders Dinner",
        with: ["Slash"],
        place: "Shared after you register",
        blurb: "A small dinner for crypto founders to trade lessons on fundraising and traction. Seats are limited.",
        rsvp: "https://luma.com/6jzodzy8",
      },
      {
        start: "20:00",
        end: "23:00",
        venue: "side",
        title: "Totalis Poker Night",
        with: ["Totalis"],
        place: "Location to be announced",
        blurb: "Poker with $1/$1 and $1/$2 tables. Buy-in is $50 to $300.",
        rsvp: "https://luma.com/g1pl0n3a",
      },
      {
        start: "21:00",
        end: "01:00",
        venue: "side",
        title: "UBC 2026 Closing Party",
        place: "Stubb's Bar-B-Q",
        address: "801 Red River St, Austin, TX 78701",
        blurb: "The official closing party, with a live DJ, sliders and an open bar for guests 21 and over.",
        rsvp: "https://luma.com/rwbt6m6s",
      },
    ],
  },
];

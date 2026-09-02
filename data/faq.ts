const TRAVEL_GRANT_DOC =
  "https://docs.google.com/document/d/1CSF9Ke9l7cx5l7_44koVhXQcmsfsX4uq_rHFrDxuVZE/edit?usp=sharing";
const DATA_ROOM =
  "https://drive.google.com/drive/folders/1Nv_ch6OgDnempbADFcZhKxVgM8JyxCB_?usp=drive_link";

export const faqItems = [
  {
    question: "Where is UBC being hosted?",
    answer:
      "The University Blockchain Conference is being hosted at UT Austin in Austin, Texas. Exact venue details coming soon.",
  },
  {
    question: "When is UBC 2026?",
    answer:
      "UBC 2026 will kick off on Friday, November 20th and close out on Saturday, November 21st, 2026.",
  },
  {
    question: "Is there a travel grant to help me get to Austin?",
    answer:
      "Yes. We believe cost shouldn't determine who can attend UBC. Eligible students can be reimbursed for travel and lodging — up to $250 traveling from within the US, Canada, or Mexico, and up to $500 from outside those countries. Competing in the hackathon or research competition raises your cap, and referring students who attend adds to it on top.\n\nGrants are not competitive: any student who applies by the deadline and meets the requirements may receive reimbursement.",
    link: { href: TRAVEL_GRANT_DOC, label: "Full Travel Grant Program details" },
  },
  {
    question: "Will I receive the full grant amount I qualify for?",
    answer:
      "Not necessarily — those are maximums, not payouts. After the conference you'll submit documentation of your eligible travel and lodging expenses, and you'll receive the lesser of your documented expenses or your maximum grant. If you qualify for $250 but have $180 in eligible expenses, you'll receive $180.\n\nFlights, trains, buses, lodging, and gas count. Food, local rides within Austin, and other personal expenses do not.",
    link: { href: TRAVEL_GRANT_DOC, label: "See tiers and eligible expenses" },
  },
  {
    question: "How do I apply for a travel grant?",
    answer:
      "Purchase a student ticket via Luma and submit the Travel Grant Application by November 13, 2026 — that's when the application and referral window closes. You must also check in on-site on Day 1 or Day 2.\n\nAfterward you'll get a reimbursement form for your receipts, due December 12, 2026. Grants are paid in USDC to the Solana wallet address you provide, within 60 days of the conference.",
    link: { href: TRAVEL_GRANT_DOC, label: "Eligibility, referrals, and fine print" },
  },
  {
    question: "Where can I find more information about UBC?",
    answer:
      "Our data room collects additional materials on UBC 2026 — the conference, our audience, and partnership details. If you have a question it doesn't answer, email us at uniblockchainconferences@gmail.com.",
    link: { href: DATA_ROOM, label: "Open the UBC 2026 data room" },
  },

  // Add more FAQ items here
];

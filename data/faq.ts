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

  // ---- Travel Grant Program ----
  {
    question: "Is there a travel grant to help me get to Austin?",
    answer:
      "Yes. We believe cost shouldn't determine who can attend UBC. Eligible students traveling to Austin can be reimbursed for travel and lodging through the UBC Travel Grant Program. Maximum grants are $250 if you're traveling from within the US, Canada, or Mexico, and $500 if you're traveling from outside those countries.\n\nGrants are not competitive — any student who applies by the deadline and meets the eligibility requirements may receive reimbursement, up to their grant maximum and documented eligible expenses.",
    link: { href: TRAVEL_GRANT_DOC, label: "Read the full Travel Grant Program details" },
  },
  {
    question: "How is my travel grant amount calculated?",
    answer:
      "Grants are sized on where you're traveling from and whether you compete. Checking in is worth $150 for both tiers. Submitting a qualifying entry to the research competition or hackathon adds $100 domestic or $350 international — bringing the maximums to $250 and $500 respectively.\n\nYou receive the lesser of your documented eligible expenses or your maximum grant. For example, if you qualify for a $250 maximum but only have $180 in eligible expenses, you'll receive $180.",
    link: { href: TRAVEL_GRANT_DOC, label: "See the full grant tier breakdown" },
  },
  {
    question: "How do I apply, and when is the deadline?",
    answer:
      "You must purchase a student ticket via Luma and submit the Travel Grant Application by November 13, 2026. The registration and referral window closes that day — students can still register for UBC afterward, but won't be eligible for a travel grant or count toward referral rewards.\n\nAfter the conference, applicants receive a separate reimbursement form to submit documentation such as flight itineraries and lodging receipts. That form is due December 12, 2026, and grants are paid within 60 days of the conference (by January 21, 2027).",
    link: { href: TRAVEL_GRANT_DOC, label: "Travel Grant Program application details" },
  },
  {
    question: "Which expenses can I be reimbursed for?",
    answer:
      "Eligible: flights, train or bus tickets, hotels or other paid lodging, and gas if you drive to Austin.\n\nNot eligible: food and meals, Ubers, Lyfts, taxis or other local transportation within Austin (including trips to and from the airport), entertainment, and other personal or miscellaneous expenses.",
  },
  {
    question: "Can I drive to UBC instead of flying?",
    answer:
      "Yes. Grants are based on where you're traveling from, not how you get here. If you're driving to Austin from another part of the US, you qualify for the domestic tier and can submit your gas expenses on the reimbursement form. Students traveling from within the Austin metro area — UT Austin students, for example — are not eligible for a travel grant.",
  },
  {
    question: "I'm an international student at a US university. Which tier am I?",
    answer:
      "Whichever one matches your trip itinerary. If you're flying to Austin from your US campus, you're domestic. If you're flying in from outside the US, Canada, or Mexico, you're international. Students who can't verify travel from outside those countries are still eligible for the domestic grant.",
  },
  {
    question: "How do referral rewards work?",
    answer:
      "Refer students who ultimately attend and you earn on top of your existing grant cap: $25 for 3–5 referrals, $50 for 6–9, $100 for 10 or more, and $350 for the top referrer.\n\nA qualified referral means the person registers and names you on the Luma form, is a currently enrolled student with a valid university email, checks in on-site at UBC 2026, and lists only your name as referrer — and you check in on-site too. Rewards are incremental to your travel grant cap, so they're only paid out if you have eligible expenses to cover on top of your base grant. Being referred does not reduce anyone's own grant.",
    link: { href: TRAVEL_GRANT_DOC, label: "Full referral rules and fine print" },
  },
  {
    question: "Can I enter both the research competition and the hackathon?",
    answer:
      "Of course. You only need to participate in one to reach the maximum grant tier, but you're highly encouraged to enter as many competitions as you're interested in.",
  },
  {
    question: "How are grants and rewards paid out?",
    answer:
      "Travel grants and referral rewards are denominated in USD and paid in USDC to the Solana wallet address you submit. You must check in on-site on Day 1 or Day 2 to verify attendance.",
  },
  {
    question: "What if I still can't afford to get there, even with the grant?",
    answer:
      "Email us at uniblockchainconferences@gmail.com. Our goal is to make UBC accessible to everyone regardless of financial background, and we hope the travel grant program helps as many students as possible join us.",
  },

  {
    question: "Where can I find more information about UBC?",
    answer:
      "Our data room collects additional materials on UBC 2026 — the conference, our audience, and partnership details. If you have a question it doesn't answer, email us at uniblockchainconferences@gmail.com.",
    link: { href: DATA_ROOM, label: "Open the UBC 2026 data room" },
  },

  // Add more FAQ items here
];

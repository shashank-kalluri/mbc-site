import { FaTwitter, FaLinkedin } from "react-icons/fa";

export interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string; // Path to the speaker's image
  twitter?: string;
  linkedin?: string;
}

export const speakers: Speaker[] = [
  {
    name: "Austin Federa",
    role: "Head of Strategy",
    company: "Solana Foundation",
    image: "/speakers/federa.png",
    twitter: "Austin_Federa",
    linkedin: "austin-federa",
  },
  {
    name: "Christopher Jensen",
    role: "Director of Digital Assets Research",
    company: "Franklin Templeton",
    image: "/speakers/jensen.png",
    linkedin: "christopher-jensen-8a4a971",
  },
  {
    name: "Ross Shuel",
    role: "Network Operations Partner",
    company: "a16z Crypto",
    image: "/speakers/shuel.png",
    linkedin: "ross-shuel",
  },
  {
    name: "Daniel Feder",
    role: "Director of Investments",
    company: "University of Michigan Endowment",
    image: "/speakers/feder.png",
    linkedin: "daniel-feder-7a8b5919",
  },
  {
    name: "Soona Amhaz",
    role: "Founder + Managing Partner",
    company: "Volt Capital",
    image: "/speakers/amhaz.png",
    twitter: "SoonaAmhaz",
    linkedin: "soona-amhaz",
  },
  {
    name: "Yevgeny Khessin",
    role: "CTO & Co-Founder",
    company: "DIMO",
    image: "/speakers/khessin.png",
    twitter: "yevgenykhessin",
    linkedin: "yevgenykhessin",
  },
  {
    name: "Trevor Bacon",
    role: "CEO",
    company: "Parcl",
    image: "/speakers/bacon.png",
    twitter: "trevorbacon",
    linkedin: "trevor-bacon-5a4b3814",
  },
  {
    name: "Anais Rachel",
    role: "Analyst",
    company: "Fidelity Digital Assets Management",
    image: "/speakers/rachel.png",
    linkedin: "anais-rachel",
  },
  {
    name: "Clare Adelgren",
    role: "Head of Blockchain Sales and Operations",
    company: "EY",
    image: "/speakers/adelgren.png",
    linkedin: "clareadelgren",
  },

  {
    name: "Jessica Furr",
    role: "Associate General Counsel",
    company: "Dragonfly",
    image: "/speakers/furr.png",
    linkedin: "jessica-furr-esq",
  },
  {
    name: "Nate Levine",
    role: "Co-Founder",
    company: "Colosseum",
    image: "/speakers/levine.png",
    twitter: "n8levine",
    linkedin: "nate-levine",
  },
  {
    name: "Lauren Weymouth",
    role: "Senior Director, University Partnerships",
    company: "Ripple",
    image: "/speakers/weymouth.png",
    linkedin: "laurenweymouth",
  },
];

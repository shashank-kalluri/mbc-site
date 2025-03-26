import { FaTwitter, FaLinkedin } from "react-icons/fa";

export interface Speaker {
  name: string;
  role: string;
  image: string; // Path to the speaker's image
  twitter?: string;
  linkedin?: string;
}

export const speakers: Speaker[] = [
  {
    name: "Austin Federa",
    role: "Head of Strategy",
    image: "/images/austin-federa.jpg", // Replace with actual image path
    twitter: "Austin_Federa",
    linkedin: "austin-federa",
  },
  {
    name: "Christopher Jensen",
    role: "Director of Digital Assets Research",
    image: "/images/christopher-jensen.jpg", // Replace with actual image path
    linkedin: "christopher-jensen-8a4a971",
  },
  {
    name: "Ross Shuel",
    role: "Network Operations Partner",
    image: "/images/ross-shuel.jpg", // Replace with actual image path
    linkedin: "ross-shuel",
  },
  {
    name: "Daniel Feder",
    role: "Director of Investments",
    image: "/images/daniel-feder.jpg", // Replace with actual image path
    linkedin: "daniel-feder-7a8b5919", // Example LinkedIn - please verify
  },
  {
    name: "Brandon Schroedle",
    role: "Senior Analyst",
    image: "/images/brandon-schroedle.jpg", // Replace with actual image path
    linkedin: "brandon-schroedle",
  },
  {
    name: "Soona Amhaz",
    role: "Founder + Managing Partner",
    image: "/images/soona-amhaz.jpg", // Replace with actual image path
    twitter: "SoonaAmhaz",
    linkedin: "soona-amhaz",
  },
  {
    name: "Yevgeny Khessin",
    role: "CTO & Co-Founder",
    image: "/images/yevgeny-khessin.jpg", // Replace with actual image path
    twitter: "yevgenykhessin",
    linkedin: "yevgenykhessin",
  },
  {
    name: "Jane Lippencott",
    role: "Partner",
    image: "/images/jane-lippencott.jpg", // Replace with actual image path
    twitter: "janelippencott",
    linkedin: "janelippencott",
  },
  {
    name: "Trevor Bacon",
    role: "CEO",
    image: "/images/trevor-bacon.jpg", // Replace with actual image path
    twitter: "trevorbacon",
    linkedin: "trevor-bacon-5a4b3814",
  },
  {
    name: "Phillip Kassab",
    role: "Growth Manager",
    image: "/images/phillip-kassab.jpg", // Replace with actual image path
    twitter: "PhillipKassab",
    linkedin: "phillip-kassab",
  },
  {
    name: "Aaron Stanley",
    role: "Editorial Director + Head of Special Projects",
    image: "/images/aaron-stanley.jpg", // Replace with actual image path
    twitter: "astanley3",
    linkedin: "aaron-stanley-b7665a2",
  },
  {
    name: "Anais Rachel",
    role: "Analyst",
    image: "/images/anais-rachel.jpg", // Replace with actual image path
    linkedin: "anais-rachel",
  },
  {
    name: "Evan Fisher",
    role: "Founder + GP",
    image: "/images/evan-fisher.jpg", // Replace with actual image path
    twitter: "evanfisher7",
    linkedin: "evan-fisher-portal",
  },
  {
    name: "Andy Boyan",
    role: "Head of Growth",
    image: "/images/andy-boyan.jpg", // Replace with actual image path
    twitter: "andyboyan",
    linkedin: "andyboyan",
  },
  {
    name: "Clare Adelgren",
    role: "Head of Blockchain Sales and Operations",
    image: "/images/clare-adelgren.jpg", // Replace with actual image path
    linkedin: "clareadelgren",
  },
  {
    name: "Rich Morrow",
    role: "COO",
    image: "/images/rich-morrow.jpg", // Replace with actual image path
    linkedin: "rich-morrow-b7b0391",
  },
  {
    name: "Jessica Furr",
    role: "Associate General Counsel",
    image: "/images/jessica-furr.jpg", // Replace with actual image path
    linkedin: "jessica-furr-esq",
  },
  {
    name: "Christina Cheung",
    role: "Senior Counsel",
    image: "/images/christina-cheung.jpg", // Replace with actual image path
    linkedin: "christinacheung",
  },
  {
    name: "Alan Orwick",
    role: "Co-Founder",
    image: "/images/alan-orwick.jpg", // Replace with actual image path
    twitter: "AlanOrwick",
    linkedin: "alan-orwick",
  },
  {
    name: "Joey Hiller",
    role: "Director of Network Products",
    image: "/images/joey-hiller.jpg", // Replace with actual image path
    linkedin: "joeyhiller",
  },
  {
    name: "Nate Levine",
    role: "Co-Founder",
    image: "/images/nate-levine.jpg", // Replace with actual image path
    twitter: "n8levine",
    linkedin: "nate-levine",
  },
  {
    name: "Michael Lee",
    role: "Co-Founder",
    image: "/images/michael-lee.jpg", // Replace with actual image path
    linkedin: "michael-lee-abstract",
  },
  {
    name: "Lauren Weymouth",
    role: "Senior Director, University Partnerships",
    image: "/images/lauren-weymouth.jpg", // Replace with actual image path
    linkedin: "laurenweymouth",
  },
  {
    name: "Stephen McKeon",
    role: "Managing Partner",
    image: "/images/stephen-mckeon.jpg", // Replace with actual image path
    twitter: "StephenMcKeon",
    linkedin: "stephenmckeon",
  },
  {
    name: "Max Resnick",
    role: "Head of Research",
    image: "/images/max-resnick.jpg", // Replace with actual image path
    linkedin: "max-resnick",
  },
  {
    name: "Rebhi Oweis",
    role: "Emerging Talent Recruiter",
    image: "/images/rebhi-oweis.jpg", // Replace with actual image path
    linkedin: "rebhi-oweis",
  },
  {
    name: "Gerald Gallagher",
    role: "Counsel",
    image: "/images/gerald-gallagher.jpg", // Replace with actual image path
    linkedin: "gerald-gallagher-esq",
  },
  {
    name: "Christian Kaczmarczyk",
    role: "Principal",
    image: "/images/christian-kaczmarczyk.jpg", // Replace with actual image path
    linkedin: "christian-kaczmarczyk-8194a820",
  },
  {
    name: "Lauren Connolly",
    role: "Head of Design",
    image: "/images/lauren-connolly.jpg", // Replace with actual image path
    twitter: "laurenmconnolly",
    linkedin: "laurenmconnolly",
  },
  {
    name: "Peter Adriaens",
    role: "Director",
    image: "/images/peter-adriaens.jpg", // Replace with actual image path
    linkedin: "peter-adriaens-0274b11",
  },
  {
    name: "Odai Ammar",
    role: "Co-Founder/CEO",
    image: "/images/odai-ammar.jpg", // Replace with actual image path
    twitter: "odaiammar",
    linkedin: "odaiammar",
  },
  {
    name: "Peter Gaffney",
    role: "VP, Business Development & Strategy",
    image: "/images/peter-gaffney.jpg", // Replace with actual image path
    linkedin: "petergaffney",
  },
  {
    name: "Patryk Krasnicki",
    role: "Senior Research Analyst",
    image: "/images/patryk-krasnicki.jpg", // Replace with actual image path
    twitter: "PKrasnicki",
    linkedin: "patryk-krasnicki",
  },
  {
    name: "Luis Fausto",
    role: "Content Manager",
    image: "/images/luis-fausto.jpg", // Replace with actual image path
    twitter: "luisfausto_",
    linkedin: "luis-fausto",
  },
  {
    name: "Ritvick Paliwal",
    role: "Partner",
    image: "/images/ritvick-paliwal.jpg", // Replace with actual image path
    linkedin: "ritvickpaliwal",
  },
  {
    name: "Javier Arroyo Ferrer",
    role: "Leader",
    image: "/images/javier-arroyo-ferrer.jpg", // Replace with actual image path
    linkedin: "javier-arroyo-ferrer",
  },
  {
    name: "Daniel Leavitt",
    role: "Senior Developer Engineer",
    image: "/images/daniel-leavitt.jpg", // Replace with actual image path
    twitter: "djleavitt",
    linkedin: "daniel-leavitt",
  },
  {
    name: "Musab Alturki",
    role: "Senior Blockchain Lead",
    image: "/images/musab-alturki.jpg", // Replace with actual image path
    linkedin: "musab-alturki",
  },
  {
    name: "Parth Valecha",
    role: "Managing Partner",
    image: "/images/parth-valecha.jpg", // Replace with actual image path
    linkedin: "parth-valecha",
  },
  {
    name: "Abdullah Umar",
    role: "Head of Governance",
    image: "/images/abdullah-umar.jpg", // Replace with actual image path
    linkedin: "abdullah-umar-arana",
  },
  {
    name: "Getty Hill",
    role: "Co-Founder",
    image: "/images/getty-hill.jpg", // Replace with actual image path
    twitter: "GettyHill",
    linkedin: "getty-hill",
  },
  {
    name: "Benjamin Sturisky",
    role: "Analyst",
    image: "/images/benjamin-sturisky.jpg", // Replace with actual image path
    twitter: "BenSturisky",
    linkedin: "benjamin-sturisky",
  },
  {
    name: "Evan Solomon",
    role: "Co-President",
    image: "/images/evan-solomon.jpg", // Replace with actual image path
    linkedin: "evan-solomon-30b81a198",
  },
  {
    name: "Mateo Membreno",
    role: "Governance",
    image: "/images/mateo-membreno.jpg", // Replace with actual image path
    linkedin: "mateo-membreno",
  },
  {
    name: "Natasha Vasan",
    role: "Law Clerk",
    image: "/images/natasha-vasan.jpg", // Replace with actual image path
    linkedin: "natasha-vasan",
  },
  {
    name: "Renzo Levi",
    role: "Analyst",
    image: "/images/renzo-levi.jpg", // Replace with actual image path
    linkedin: "renzo-levi",
  },
  {
    name: "Aadil Ahmed",
    role: "Head of Growth",
    image: "/images/aadil-ahmed.jpg", // Replace with actual image path
    linkedin: "aadilahmed1",
  },
  {
    name: "Savindu Wimalasooriya",
    role: "President",
    image: "/images/savindu-wimalasooriya.jpg", // Replace with actual image path
    linkedin: "savindu-wimalasooriya",
  },
  {
    name: "Ezven Galarraga",
    role: "President",
    image: "/images/ezven-galarraga.jpg", // Replace with actual image path
    linkedin: "ezven-galarraga",
  },
  {
    name: "Shashank Kalluri",
    role: "Co-President",
    image: "/images/shashank-kalluri.jpg", // Replace with actual image path
    linkedin: "shashank-kalluri",
  },
  {
    name: "Max Allaire",
    role: "President",
    image: "/images/max-allaire.jpg", // Replace with actual image path
    linkedin: "max-allaire-9b1b59198",
  },
  {
    name: "Ben Spong",
    role: "Founder",
    image: "/images/ben-spong.jpg", // Replace with actual image path
    twitter: "benspong",
  },
  {
    name: "Esha Bora",
    role: "Head of Research",
    image: "/images/esha-bora.jpg", // Replace with actual image path
    linkedin: "esha-bora",
  },
  {
    name: "Ravi Bakhai",
    role: "Founder",
    image: "/images/ravi-bakhai.jpg", // Replace with actual image path
    linkedin: "ravibakhai",
  },
];

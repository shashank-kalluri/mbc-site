import type { Metadata } from "next";
import SpeakerApplication from "@/components/SpeakerApplication";

export const metadata: Metadata = {
  title: "Speak at UBC 2026",
  description:
    "Apply to speak at the University Blockchain Conference, November 20–21, 2026 at UT Austin. Keynotes, panels, fireside chats, and workshops in front of 1,000+ students from 100+ universities.",
  alternates: { canonical: "/speak" },
};

export default function SpeakPage() {
  return <SpeakerApplication />;
}

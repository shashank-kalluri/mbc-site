import type { Metadata } from "next";
import ResearchLibrary from "@/components/ResearchLibrary";
import { researchReports } from "@/data/researchReports";

export const metadata: Metadata = {
  title: "Research Competition Reports · UBC 2026",
  description: `Read all ${researchReports.length} investment theses submitted to the Franklin Crypto Research Competition at UBC 2026. Search by token, school, or student and filter by track.`,
  alternates: { canonical: "/programs/research-competition/reports" },
};

export default function ResearchReportsPage() {
  return <ResearchLibrary />;
}

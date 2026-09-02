import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FounderStage from "@/components/FounderStage";
import { HackathonProgram } from "@/components/HackathonProgram";
import { ResearchCompetitionProgram } from "@/components/ResearchCompetitionProgram";
import { getProgram, livePrograms } from "@/data/programs";

const COMPONENTS: Record<string, React.ComponentType> = {
  "founder-stage": FounderStage,
  hackathon: HackathonProgram,
  "research-competition": ResearchCompetitionProgram,
};

export function generateStaticParams() {
  return livePrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program || program.status !== "live") return {};
  return {
    title: `${program.name} · UBC 2026`,
    description: program.description,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);

  // Unknown or unpublished programs stay unreachable until `status` flips to "live".
  if (!program || program.status !== "live") notFound();

  const Program = COMPONENTS[slug];
  if (!Program) notFound();

  return <Program />;
}

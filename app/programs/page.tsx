"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { HackathonProgram } from "@/components/HackathonProgram";
import { ResearchCompetitionProgram } from "@/components/ResearchCompetitionProgram";
import { ResearchSubmissions } from "@/components/ResearchSubmissions";
import { SessionsCalendar } from "@/components/SessionsCalendar";

const TAB_IDS = [
  "hackathon",
  "research-competition",
  "research-submissions",
  "sessions",
] as const;

type TabId = (typeof TAB_IDS)[number];

const DEFAULT_TAB: TabId = "hackathon";

const SectionHeader: React.FC<{
  kicker?: string;
  title: string;
  subtitle?: string;
}> = ({ kicker, title, subtitle }) => (
  <div className="flex flex-col mb-8 md:mb-10">
    {kicker && (
      <span className="uppercase tracking-widest text-[11px] font-bold text-foreground/60">
        {kicker}
      </span>
    )}
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-1">
      {title}
    </h1>
    {subtitle && (
      <p className="text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>
    )}
  </div>
);

export default function ProgramsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const programFromUrl = searchParams.get("program") as TabId | null;
  const initialTab: TabId =
    programFromUrl && TAB_IDS.includes(programFromUrl)
      ? programFromUrl
      : DEFAULT_TAB;

  const [currentTab, setCurrentTab] = React.useState<TabId>(initialTab);

  React.useEffect(() => {
    if (programFromUrl && TAB_IDS.includes(programFromUrl)) {
      if (programFromUrl !== currentTab) {
        setCurrentTab(programFromUrl);
      }
    }
  }, [programFromUrl, currentTab]);

  const handleTabChange = (value: string) => {
    if (!TAB_IDS.includes(value as TabId)) return;

    const next = value as TabId;
    setCurrentTab(next);

    const params = new URLSearchParams(searchParams.toString());
    params.set("program", next);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <section className="w-full pt-24 md:pt-28 pb-10 md:pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="MBC 2025"
          title="Programs"
          subtitle="From the Hackathon to the Researchathon, The MBC 2025 programs can help you turn your ideas into impact. Real prizes, recognition, and a fast track to jobs in crypto, tech, and finance."
        />

        <Separator className="my-8" />

        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Tabs row */}
          <div className="relative mx-1 md:mx-0">
            <div className="overflow-x-auto overscroll-x-contain px-5 md:px-0 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-w-full">
              <TabsList className="inline-flex min-w-max gap-2 p-1 rounded-xl border border-foreground/10 shadow-sm bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <TabsTrigger
                  value="hackathon"
                  className="shrink-0 snap-start rounded-full border px-4 py-2 transition shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 bg-background/60 hover:bg-foreground/5 ring-1 ring-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:ring-foreground/20 data-[state=active]:shadow-md"
                >
                  <span className="mr-2">💻</span>
                  Hackathon
                </TabsTrigger>

                <TabsTrigger
                  value="research-competition"
                  className="shrink-0 snap-start rounded-full border px-4 py-2 transition shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 bg-background/60 hover:bg-foreground/5 ring-1 ring-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:ring-foreground/20 data-[state=active]:shadow-md"
                >
                  <span className="mr-2">📈</span>
                  FT Pitch Competition
                </TabsTrigger>

                <TabsTrigger
                  value="research-submissions"
                  className="shrink-0 snap-start rounded-full border px-4 py-2 transition shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 bg-background/60 hover:bg-foreground/5 ring-1 ring-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:ring-foreground/20 data-[state=active]:shadow-md"
                >
                  <span className="mr-2">📚</span>
                  Research Submissions
                </TabsTrigger>

                <TabsTrigger
                  value="sessions"
                  className="shrink-0 snap-start rounded-full border px-4 py-2 transition shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 bg-background/60 hover:bg-foreground/5 ring-1 ring-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:ring-foreground/20 data-[state=active]:shadow-md"
                >
                  <span className="mr-2">🗓️</span>
                  Sessions
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab content */}
          <TabsContent value="hackathon" className="focus:outline-none">
            <HackathonProgram />
          </TabsContent>

          <TabsContent
            value="research-competition"
            className="focus:outline-none"
          >
            <ResearchCompetitionProgram />
          </TabsContent>

          <TabsContent
            value="research-submissions"
            className="focus:outline-none"
          >
            <ResearchSubmissions />
          </TabsContent>

          <TabsContent value="sessions" className="focus:outline-none">
            <SessionsCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getResearchSubmissions } from "@/lib/api/researchsubmissions";

type ResearchSubmission = {
  id: number;
  submission_link: string;
  name: string;
  university: string;
  asset: string;
  category: string;
  created_at: string;
  status: string;
};

const parseTeamMembers = (raw?: string | null): string[] => {
  if (!raw) return [];
  const cleaned = raw.trim();
  if (!cleaned) return [];

  return cleaned
    .split(/,|&| and /gi)
    .map((s) => s.trim())
    .filter(Boolean);
};

export const ResearchSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = React.useState<ResearchSubmission[]>(
    []
  );
  const [submissionsLoading, setSubmissionsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSubmissionId, setSelectedSubmissionId] = React.useState<
    number | null
  >(null);

  const filteredSubmissions = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return submissions;

    return submissions.filter((s) => {
      const name = s.name?.toLowerCase() || "";
      const uni = s.university?.toLowerCase() || "";
      const asset = s.asset?.toLowerCase() || "";
      const category = s.category?.toLowerCase() || "";
      const status = s.status?.toLowerCase() || "";

      return (
        name.includes(q) ||
        uni.includes(q) ||
        asset.includes(q) ||
        category.includes(q) ||
        status.includes(q)
      );
    });
  }, [searchQuery, submissions]);

  React.useEffect(() => {
    const fetchSubmissions = async () => {
      setSubmissionsLoading(true);
      const data = await getResearchSubmissions();
      setSubmissions(data);
      setSubmissionsLoading(false);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="mt-8 space-y-6">
      <Card className="rounded-2xl border-foreground/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            📚 Research Submissions Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/70 mb-4">
            Browse research submitted to the Franklin Templeton Pitch
            Competition. Click a submission to view the PDF, or open it directly
            in Google Drive.
          </p>

          {/* Search bar */}
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, university, asset, or category..."
              className="max-w-md"
            />
            {submissions.length > 0 && (
              <p className="text-xs text-foreground/50">
                Showing {filteredSubmissions.length} of {submissions.length}{" "}
                submissions
              </p>
            )}
          </div>

          {submissionsLoading ? (
            <p className="text-sm text-foreground/60">Loading submissions…</p>
          ) : submissions.length === 0 ? (
            <p className="text-sm text-foreground/60">
              No submissions are available yet. Check back soon.
            </p>
          ) : filteredSubmissions.length === 0 ? (
            <p className="text-sm text-foreground/60">
              No submissions match your search. Try a different name,
              university, asset, or category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSubmissions.map((s) => {
                const isSelected = s.id === selectedSubmissionId;
                const teamMembers = parseTeamMembers(s.name);
                const teamDisplay =
                  teamMembers.length > 0 ? teamMembers.join(", ") : s.name;

                return (
                  <React.Fragment key={s.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSubmissionId(isSelected ? null : s.id)
                      }
                      className={`text-left rounded-xl border px-4 py-3 transition shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 bg-background/80 ${
                        isSelected
                          ? "border-foreground/40 bg-foreground/5"
                          : "border-foreground/10 hover:border-foreground/30"
                      } ${
                        s.status?.toLowerCase() === "finalist"
                          ? "bg-maize/20 border-maize/60"
                          : ""
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-sm line-clamp-2">
                          {s.asset || "Unnamed Asset"}
                        </div>

                        <div className="text-xs text-foreground/60 line-clamp-2">
                          {s.university} • {s.category}
                        </div>

                        {s.status?.toLowerCase() === "finalist" && (
                          <div className="text-[10px] font-semibold text-maize/80 uppercase tracking-wide">
                            ⭐ Finalist
                          </div>
                        )}

                        {teamDisplay && (
                          <div className="text-[11px] text-foreground/50 line-clamp-2">
                            {teamDisplay}
                          </div>
                        )}

                        <div className="text-[11px] text-foreground/50">
                          Submitted{" "}
                          {new Date(s.created_at).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </button>

                    {isSelected && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <div className="font-semibold text-base">
                              {s.asset || "Unnamed Asset"}
                            </div>
                            <div className="text-xs text-foreground/60">
                              {s.university} • {s.category}
                            </div>
                            {teamDisplay && (
                              <div className="text-xs text-foreground/60 mt-1">
                                Team: {teamDisplay}
                              </div>
                            )}
                            {s.status?.toLowerCase() === "finalist" && (
                              <div className="text-xs font-semibold text-maize/80 uppercase tracking-wide">
                                ⭐ Finalist
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              <Link
                                href={s.submission_link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Open in Google Drive
                              </Link>
                            </Button>
                          </div>
                        </div>

                        <div className="w-full rounded-xl overflow-hidden border border-foreground/10 bg-muted/20">
                          <iframe
                            src={s.submission_link}
                            title={s.asset || s.name}
                            className="w-full h-[70vh]"
                            style={{ border: "none" }}
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

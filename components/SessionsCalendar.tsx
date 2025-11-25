"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LUMA_URL = "https://luma.com/college.xyz?k=c";

export const SessionsCalendar: React.FC = () => {
  return (
    <div className="mt-8 space-y-6">
      <Card className="rounded-2xl border-foreground/10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            🗓️ Sessions Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Direct link fallback */}
          <div className="mb-4">
            <Button asChild>
              <Link href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                Open in Luma
              </Link>
            </Button>
          </div>

          {/* Responsive iframe embed */}
          <div className="w-full rounded-xl overflow-hidden border border-foreground/10">
            <iframe
              src="https://luma.com/embed/calendar/cal-HBogrD0yphRdekG/events"
              title="MBC 2025 Sessions — Luma"
              className="w-full h-[80vh]"
              style={{
                border: "1px solid #bfcbda88",
                borderRadius: "8px",
              }}
              frameBorder={0}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import type { Metadata } from "next";
import TravelGrants from "@/components/TravelGrants";

export const metadata: Metadata = {
  title: "Travel Grants · UBC 2026",
  description:
    "Reimbursement for travel and lodging to UBC 2026 at UT Austin. Up to $250 domestic and $500 international, plus referral rewards. Applications close November 13, 2026.",
};

export default function TravelGrantsPage() {
  return <TravelGrants />;
}

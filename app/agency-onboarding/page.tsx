import type { Metadata } from "next";
import AgencyOnboardingClient from "@/components/legacy/pages/AgencyOnboardingClient";

export const metadata: Metadata = { title: "Agency Onboarding | EarlyJobs" };

export default function Page() {
  return <AgencyOnboardingClient />;
}

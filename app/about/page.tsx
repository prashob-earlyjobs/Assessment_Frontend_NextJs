import type { Metadata } from "next";
import { AgencyPartnershipsPage } from "@/components/agency-partnerships/page";

export const metadata: Metadata = {
  title: {
    absolute: "About EarlyJobs | The Recruiter-First Hiring Network",
  },
  description:
    "About EarlyJobs, the recruiter-first hiring network. Recruiters, employers, and professionals hire through people, relationships, and AI-powered hiring infrastructure.",
};

export default function AboutPage() {
  return <AgencyPartnershipsPage />;
}

import type { Metadata } from "next";
import RecruiterPageContent from "@/components/legacy/pages/RecruiterPageContent";

export const metadata: Metadata = { title: "Recruiter Opportunities | EarlyJobs" };

export default function Page() {
  return <RecruiterPageContent />;
}

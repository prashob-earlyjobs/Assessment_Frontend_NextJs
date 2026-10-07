import type { Metadata } from "next";
import InternshipLanding from "@/components/legacy/pages/InternshipLanding";

export const metadata: Metadata = { title: "HR Internship | EarlyJobs" };

export default function Page() {
  return <InternshipLanding />;
}

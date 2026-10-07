import type { Metadata } from "next";
import TeamPage from "@/components/legacy/pages/Teampage";

export const metadata: Metadata = { title: "Team | EarlyJobs" };

export default function Page() {
  return <TeamPage />;
}

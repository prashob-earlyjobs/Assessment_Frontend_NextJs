import type { Metadata } from "next";
import TeamPage from "@/components/legacy/pages/Teampage";
import { getTeamMembers } from "@/lib/teams";

export const metadata: Metadata = { title: "Team | EarlyJobs" };

export default async function Page() {
  const members = await getTeamMembers();
  return <TeamPage members={members} />;
}

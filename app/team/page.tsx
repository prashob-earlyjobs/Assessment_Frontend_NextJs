import type { Metadata } from "next";
import TeamPage from "@/components/legacy/pages/Teampage";
import { pageMetadata } from "@/lib/page-metadata";
import { getTeamMembers } from "@/lib/teams";

export const metadata: Metadata = pageMetadata({
  path: "/team",
  title: "Team | EarlyJobs",
  description: "Meet the leadership guiding EarlyJobs' mission to transform hiring across India.",
  ogTitle: "Team | EarlyJobs",
  ogDescription: "Meet the leadership guiding EarlyJobs' mission to transform hiring across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Team | EarlyJobs",
  twitterDescription: "Meet the leadership guiding EarlyJobs.",
  twitterCard: "summary",
});

export default async function Page() {
  const members = await getTeamMembers();
  return <TeamPage members={members} />;
}

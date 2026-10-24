import type { Metadata } from "next";
import { FreelanceRecruitersPage } from "@/components/freelance-recruiters/page";
import { getNetworkMetrics } from "@/lib/dashboard";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/become-a-recruiter",
  title: "Become a Recruiter | Flexible Recruitment Opportunities | EarlyJobs",
  description:
    "Join EarlyJobs as a freelance recruiter. Access hiring opportunities, work flexibly, build recruitment skills and earn commissions on eligible successful placements.",
  ogTitle: "Become a Recruiter with EarlyJobs | Flexible Work & Hiring Opportunities",
  ogDescription:
    "Build your recruitment career with EarlyJobs. Explore hiring mandates, flexible freelance opportunities, recruiter support and commission-based earnings on eligible successful placements.",
  image: "images/logo.png",
  imageAlt: "Join the EarlyJobs freelance recruiter network",
  twitterTitle: "Become a Recruiter with EarlyJobs",
  twitterDescription:
    "Explore flexible freelance recruitment opportunities, hiring mandates and performance-based commissions with EarlyJobs.",
});

export default async function RecruitersPage() {
  const metrics = await getNetworkMetrics();
  return <FreelanceRecruitersPage metrics={metrics} />;
}

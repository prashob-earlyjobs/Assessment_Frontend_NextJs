import type { Metadata } from "next";
import { FreelanceRecruitersPage } from "@/components/freelance-recruiters/page";
import { getNetworkMetrics } from "@/lib/dashboard";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/become-a-recruiter",
  title: "Freelance Recruiter in India | Work From Home | EarlyJobs",
  description:
    "Explore the EarlyJobs recruiter programme, understand the onboarding process, and apply to participate in relevant hiring requirements.",
  ogTitle: "Build Your Recruitment Journey with EarlyJobs",
  ogDescription:
    "Apply to participate in relevant hiring requirements. Acceptance, mandates, and income are not guaranteed.",
  image: "/og/become-a-recruiter.jpg",
  imageAlt: "Freelance recruiters working together on EarlyJobs",
  twitterTitle: "Become a Freelance Recruiter | EarlyJobs",
  twitterDescription:
    "Explore the recruiter programme and submit an application. Commercial terms follow the applicable agreement.",
});

export default async function RecruitersPage() {
  const metrics = await getNetworkMetrics();
  return <FreelanceRecruitersPage metrics={metrics} />;
}

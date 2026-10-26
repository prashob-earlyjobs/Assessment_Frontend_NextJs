import { FreelanceRecruitersPage } from "@/components/freelance-recruiters/page";
import { getNetworkMetrics } from "@/lib/dashboard";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import recruiterJsonLd from "@/schema/become-a-recruiter.jsonld.json";

export const metadata = pageMetadata({
  path: "/become-a-recruiter",
  title: "Become a Freelance Recruiter in India | EarlyJobs",
  description:
    "Become a freelance recruiter with EarlyJobs. Explore flexible recruitment opportunities, hiring mandates, recruiter support and performance-based earnings from successful placements.",
  ogTitle: "Become a Freelance Recruiter in India | EarlyJobs",
  ogDescription:
    "Build your recruitment career with EarlyJobs. Explore flexible freelance recruiting opportunities, available hiring mandates and performance-based commissions under applicable programme terms.",
  image: "/images/logo.png",
  imageAlt: "Freelance recruiters working together on EarlyJobs",
  twitterTitle: "Become a Freelance Recruiter | EarlyJobs",
  twitterDescription:
    "Explore flexible freelance recruitment opportunities with EarlyJobs and earn performance-based commissions on eligible placements.",
  twitterCard: "summary",
});

export default async function BecomeARecruiterPage() {
  const metrics = await getNetworkMetrics();
  return (
    <>
      <JsonLd data={recruiterJsonLd} />
      <FreelanceRecruitersPage metrics={metrics} />
    </>
  );
}

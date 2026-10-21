import { FreelanceRecruitersPage } from "@/components/freelance-recruiters/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import recruiterJsonLd from "@/schema/become-a-recruiter.jsonld.json";

export const metadata = pageMetadata({
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

export default function BecomeARecruiterPage() {
  return (
    <>
      <JsonLd data={recruiterJsonLd} />
      <FreelanceRecruitersPage />
    </>
  );
}

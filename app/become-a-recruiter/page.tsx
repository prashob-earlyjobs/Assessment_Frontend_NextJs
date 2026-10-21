import { FreelanceRecruitersPage } from "@/components/freelance-recruiters/page";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/become-a-recruiter",
  title: "Freelance Recruiter in India | Work From Home | EarlyJobs",
  description:
    "Work on verified hiring mandates from home and earn commission per placement. Open to experienced recruiters, career-break returnees and freshers.",
  ogTitle: "Build a Recruiting Career on Your Terms | EarlyJobs",
  ogDescription: "Work on verified mandates from anywhere and earn commission per placement.",
  image: "/og/become-a-recruiter.jpg",
  imageAlt: "Freelance recruiters working together on EarlyJobs",
  twitterTitle: "Become a Freelance Recruiter | EarlyJobs",
  twitterDescription: "Verified mandates, flexible hours, commission per placement. Apply in minutes.",
});

export default function BecomeARecruiterPage() {
  return <FreelanceRecruitersPage />;
}

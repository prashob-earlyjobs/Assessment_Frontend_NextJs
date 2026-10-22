import type { Metadata } from "next";
import RecruiterPageContent from "@/components/legacy/pages/RecruiterPageContent";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/recruiter",
  title: "Recruiter Opportunities | EarlyJobs",
  description: "Older EarlyJobs recruiter page. The current programme is published at /become-a-recruiter.",
  ogTitle: "Recruiter Opportunities | EarlyJobs",
  ogDescription: "Older EarlyJobs recruiter page. The current programme is published at /become-a-recruiter.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Recruiter Opportunities | EarlyJobs",
  twitterDescription: "Older EarlyJobs recruiter page.",
  twitterCard: "summary",
  index: false,
});

export default function Page() {
  return <RecruiterPageContent />;
}

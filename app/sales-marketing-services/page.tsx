import type { Metadata } from "next";
import SalesMarketingServicePage from "@/components/legacy/pages/ourServices/SalesMarketingServicePage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/sales-marketing-services",
  title: "Sales and Marketing Recruitment | EarlyJobs",
  description: "Sales and marketing recruitment services from EarlyJobs.",
  ogTitle: "Sales and Marketing Recruitment | EarlyJobs",
  ogDescription: "Sales and marketing recruitment services from EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Sales and Marketing Recruitment | EarlyJobs",
  twitterDescription: "Sales and marketing recruitment services from EarlyJobs.",
  twitterCard: "summary",
});

export default function Page() {
  return <SalesMarketingServicePage />;
}

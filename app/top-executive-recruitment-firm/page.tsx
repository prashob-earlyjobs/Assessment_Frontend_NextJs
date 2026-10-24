import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import TopExecutiveServicePage from "@/components/legacy/pages/ourServices/TopExecutiveServicePage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/top-executive-recruitment-firm.jsonld.json";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/top-executive-recruitment-firm",
    title: "Executive Recruitment Firm in India | EarlyJobs",
    description:
      "Find experienced leaders with EarlyJobs. Explore executive recruitment for CEO, COO, CFO, CTO and other senior leadership roles across industries in India.",
    ogTitle: "Executive Search & Leadership Recruitment | EarlyJobs",
    ogDescription:
      "Build your leadership team with executive recruitment support from EarlyJobs. Explore hiring for CEO, COO, CFO, CTO and other senior leadership roles.",
    image: "/images/logo.png",
    imageAlt: "Executive recruitment and leadership hiring services from EarlyJobs",
    twitterTitle: "Executive Search & Leadership Recruitment | EarlyJobs",
    twitterDescription:
      "Find experienced leaders for CEO, COO, CFO, CTO and other senior roles with executive recruitment support from EarlyJobs.",
    twitterCard: "summary",
  }),
  other: { language: "en-IN" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <TopExecutiveServicePage />
    </>
  );
}

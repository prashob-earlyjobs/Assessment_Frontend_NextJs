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
      "Hire senior leaders with EarlyJobs. Discover executive recruitment services for CEO, COO, CFO, CTO and other leadership roles across industries in India.",
    ogTitle: "Executive Search & Leadership Recruitment | EarlyJobs",
    ogDescription:
      "Build your leadership team with EarlyJobs. Get recruitment support for CEO, COO, CFO, CTO and other senior executive positions across India.",
    image: "/images/logo.png",
    imageAlt: "Executive recruitment and leadership hiring services by EarlyJobs",
    twitterTitle: "Executive Search & Leadership Recruitment | EarlyJobs",
    twitterDescription:
      "Find senior leaders for CEO, COO, CFO, CTO and other executive roles with recruitment support from EarlyJobs.",
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

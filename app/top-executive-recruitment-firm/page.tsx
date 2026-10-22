import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import TopExecutiveServicePage from "@/components/legacy/pages/ourServices/TopExecutiveServicePage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/top-executive-recruitment-firm.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/top-executive-recruitment-firm",
  title: "Executive Recruitment | EarlyJobs",
  description: "Executive recruitment services from EarlyJobs for senior leadership roles.",
  ogTitle: "Executive Recruitment | EarlyJobs",
  ogDescription: "Executive recruitment services from EarlyJobs for senior leadership roles.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Executive Recruitment | EarlyJobs",
  twitterDescription: "Executive recruitment services from EarlyJobs for senior leadership roles.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <TopExecutiveServicePage />
    </>
  );
}

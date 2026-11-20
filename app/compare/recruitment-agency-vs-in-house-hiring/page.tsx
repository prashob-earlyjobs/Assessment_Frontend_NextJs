import type { Metadata } from "next";
import { RecruitmentAgencyVsInHousePage } from "@/components/recruitment-agency-vs-in-house/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruitment-agency-vs-in-house-hiring.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/compare/recruitment-agency-vs-in-house-hiring",
  title: "Recruitment Agency vs In-House Hiring | EarlyJobs",
  description:
    "Compare recruitment agencies and in-house hiring across cost, control, sourcing and scalability for Indian employers. A balanced EarlyJobs guide—no fake benchmarks.",
  ogTitle: "Recruitment Agency vs In-House Hiring | EarlyJobs",
  ogDescription:
    "Compare recruitment agencies and in-house hiring across cost, control, sourcing and scalability for Indian employers.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Recruitment Agency vs In-House Hiring Guide",
  twitterTitle: "Recruitment Agency vs In-House Hiring",
  twitterDescription:
    "A balanced employer guide to in-house, agency and hybrid recruitment models.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitmentAgencyVsInHousePage />
    </>
  );
}

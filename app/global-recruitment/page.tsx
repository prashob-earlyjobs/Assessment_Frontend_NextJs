import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SectionPage } from "@/components/section-page";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/global-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/global-recruitment",
  title: "Global Recruitment Services | International Hiring | EarlyJobs",
  description:
    "Explore global recruitment support from EarlyJobs for businesses hiring across markets. Align role requirements, candidate sourcing and recruitment execution.",
  ogTitle: "Global Recruitment Services | International Hiring",
  ogDescription:
    "EarlyJobs helps employers organize recruitment requirements for hiring across markets. Coverage depends on the role.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Global Recruitment Services | International Hiring",
  twitterDescription:
    "EarlyJobs helps employers organize recruitment requirements for hiring across markets. Coverage depends on the role.",
  twitterCard: "summary",
});

export default function GlobalRecruitmentPage() {
  return (
    <>
      <JsonLd data={schema} />
      <SectionPage
        title="Global Recruitment Support for Growing Businesses"
        description="Hiring across markets requires a clear understanding of role requirements, local hiring conditions and a recruitment process that adapts to business priorities. EarlyJobs helps employers organize recruitment requirements and connect them with recruiter-led execution and AI-assisted workflows. Available markets depend on the specific requirement. EarlyJobs does not claim an international office network on this page."
      />
    </>
  );
}

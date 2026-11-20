import type { Metadata } from "next";
import { ConstructionInfrastructureRecruitmentPage } from "@/components/construction-infrastructure-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/construction-infrastructure-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/construction-infrastructure-recruitment",
  title: "Construction Workforce Recruitment India | EarlyJobs",
  description:
    "Hire site support, trades and project administration staff for construction and infrastructure projects across India with EarlyJobs.",
  ogTitle: "Construction Workforce Recruitment India | EarlyJobs",
  ogDescription:
    "Hire site support, trades and project administration staff for construction and infrastructure projects across India with EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs construction and infrastructure recruitment",
  twitterTitle: "Construction & Infrastructure Recruitment India",
  twitterDescription:
    "Construction hiring — site support, trades and project admin across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ConstructionInfrastructureRecruitmentPage />
    </>
  );
}

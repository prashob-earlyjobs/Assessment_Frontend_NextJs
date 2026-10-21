import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { InvestorsPage } from "@/components/investors/page";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/investor-relations.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/investor-relations",
  title: "Investor Relations | EarlyJobs",
  description:
    "Learn about EarlyJobs, its recruitment infrastructure model, technology-enabled hiring approach and business direction through approved company information.",
  ogTitle: "Investor Relations | EarlyJobs",
  ogDescription:
    "EarlyJobs is building a recruitment ecosystem of human execution, a recruiter network, and AI-assisted hiring workflows.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Investor Relations | EarlyJobs",
  twitterDescription:
    "EarlyJobs is building a recruitment ecosystem of human execution, a recruiter network, and AI-assisted hiring workflows.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <InvestorsPage />
    </>
  );
}

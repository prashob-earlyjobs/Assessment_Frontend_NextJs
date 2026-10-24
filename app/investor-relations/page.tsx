import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { InvestorsPage } from "@/components/investors/page";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/investor-relations.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/investor-relations",
  title: "Investor Relations | EarlyJobs Company Overview",
  description:
    "Explore EarlyJobs investor relations, company overview, recruiter network, hiring milestones, leadership team and angel investor community building a recruiter-first hiring network.",
  ogTitle: "nvestor Relations | EarlyJobs Company Overview",
  ogDescription:
    "Discover EarlyJobs' recruiter-first hiring network, business overview, hiring milestones, leadership team and angel investor community",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs investor relations and leadership overview",
  twitterTitle: "nvestor Relations | EarlyJobs Company Overview",
  twitterDescription:
    "Explore EarlyJobs' business overview, recruiter network, company milestones and leadership supporting its hiring ecosystem.",
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

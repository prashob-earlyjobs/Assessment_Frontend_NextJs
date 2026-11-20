import type { Metadata } from "next";
import { ManufacturingAutomationPage } from "@/components/ai-recruiting-automation-manufacturing/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ai-recruiting-automation-manufacturing.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ai-recruiting-automation-manufacturing",
  title: "AI Recruiting Automation for Manufacturing | EarlyJobs",
  description:
    "Automate plant hiring with EarlyJobs AI workflows. Match shift skills, route certifications, and coordinate multi-site manufacturing recruitment faster.",
  ogTitle: "AI Recruiting Automation for Manufacturing | EarlyJobs",
  ogDescription:
    "Automate plant hiring with EarlyJobs AI workflows. Match shift skills, route certifications, and coordinate multi-site manufacturing recruitment.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs AI recruiting automation for manufacturing hiring",
  twitterTitle: "AI Recruiting Automation for Manufacturing",
  twitterDescription:
    "Automate shift-based plant hiring — skills matching, certification routing, and multi-site coordination with EarlyJobs.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ManufacturingAutomationPage />
    </>
  );
}

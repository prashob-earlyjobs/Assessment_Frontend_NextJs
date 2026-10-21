import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import OffshoreCapabilityCenterHiringPage from "@/components/legacy/gcc/OffshoreCapabilityCenterHiringPage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/offshore-capability-center-hiring.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/offshore-capability-center-hiring",
  title: "Offshore Capability Center Hiring | EarlyJobs",
  description:
    "Plan offshore capability center hiring with structured recruitment support, recruiter networks and AI-assisted workflows aligned with your operating model.",
  ogTitle: "Offshore Capability Center Hiring",
  ogDescription:
    "Recruitment support for an offshore capability center. This page does not provide legal, tax, or incorporation advice.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Offshore Capability Center Hiring",
  twitterDescription:
    "Recruitment support for an offshore capability center. This page does not provide legal, tax, or incorporation advice.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <OffshoreCapabilityCenterHiringPage />
    </>
  );
}

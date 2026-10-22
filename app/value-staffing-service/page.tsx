import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import ValueStaffingServicesPage from "@/components/legacy/pages/ourServices/ValueStaffingServicesPage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/value-staffing-service.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/value-staffing-service",
  title: "Value Staffing Service | EarlyJobs",
  description: "Value staffing services from EarlyJobs for employers hiring through the recruitment network.",
  ogTitle: "Value Staffing Service | EarlyJobs",
  ogDescription: "Value staffing services from EarlyJobs for employers hiring through the recruitment network.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Value Staffing Service | EarlyJobs",
  twitterDescription: "Value staffing services from EarlyJobs.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ValueStaffingServicesPage />
    </>
  );
}

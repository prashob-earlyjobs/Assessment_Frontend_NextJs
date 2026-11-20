import type { Metadata } from "next";
import { ElectronicsManufacturingRecruitmentPage } from "@/components/electronics-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/electronics-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/electronics-manufacturing-recruitment",
  title: "Electronics & EMS Manufacturing Recruitment | EarlyJobs",
  description:
    "Hire assembly operators, inspection trainees and ESD-aware line staff for electronics and EMS plants in India. EarlyJobs supports high-volume ramp hiring.",
  ogTitle: "Electronics & EMS Manufacturing Recruitment | EarlyJobs",
  ogDescription:
    "Hire assembly operators, inspection trainees and ESD-aware line staff for electronics and EMS plants in India. EarlyJobs supports high-volume ramp hiring.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs electronics manufacturing recruitment",
  twitterTitle: "Electronics Manufacturing Recruitment & EMS Hiring",
  twitterDescription:
    "EMS and electronics plant hiring — assembly, inspection, ESD discipline and high-volume line staffing in India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ElectronicsManufacturingRecruitmentPage />
    </>
  );
}

import type { Metadata } from "next";
import { EvAutomotiveManufacturingRecruitmentPage } from "@/components/ev-automotive-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ev-automotive-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ev-automotive-manufacturing-recruitment",
  title: "EV & Automotive Plant Recruitment India | EarlyJobs",
  description:
    "Hire vehicle assembly operators, production trainees and plant support staff for EV and automotive plants in India through EarlyJobs.",
  ogTitle: "EV & Automotive Plant Recruitment India | EarlyJobs",
  ogDescription:
    "Hire vehicle assembly operators, production trainees and plant support staff for EV and automotive plants in India through EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs EV and automotive manufacturing recruitment",
  twitterTitle: "EV & Automotive Manufacturing Recruitment in India",
  twitterDescription:
    "EV and automotive plant hiring — assembly, quality and materials support across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <EvAutomotiveManufacturingRecruitmentPage />
    </>
  );
}

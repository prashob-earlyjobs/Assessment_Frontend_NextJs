import type { Metadata } from "next";
import { PharmaceuticalManufacturingRecruitmentPage } from "@/components/pharmaceutical-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/pharmaceutical-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/pharmaceutical-manufacturing-recruitment",
  title: "Pharma Plant Recruitment & GMP Hiring India | EarlyJobs",
  description:
    "Hire GMP-aware production operators, packaging staff and junior QC support for pharmaceutical plants across India. EarlyJobs helps plant HR build regulated hiring pipelines.",
  ogTitle: "Pharma Plant Recruitment & GMP Hiring India | EarlyJobs",
  ogDescription:
    "Hire GMP-aware production operators, packaging staff and junior QC support for pharmaceutical plants across India. EarlyJobs helps plant HR build regulated hiring pipelines.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs pharmaceutical manufacturing recruitment",
  twitterTitle: "Pharma Plant Recruitment & GMP Hiring India",
  twitterDescription:
    "GMP-aware pharma plant staffing — production, packaging, junior QC and warehouse roles across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PharmaceuticalManufacturingRecruitmentPage />
    </>
  );
}

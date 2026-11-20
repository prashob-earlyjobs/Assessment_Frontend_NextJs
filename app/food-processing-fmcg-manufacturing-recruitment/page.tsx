import type { Metadata } from "next";
import { FoodProcessingFmcgManufacturingRecruitmentPage } from "@/components/food-processing-fmcg-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/food-processing-fmcg-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/food-processing-fmcg-manufacturing-recruitment",
  title: "Food & FMCG Plant Recruitment India | EarlyJobs",
  description:
    "Hire hygiene-aware production and packaging staff for food processing and FMCG plants in India, including seasonal volume planning with EarlyJobs.",
  ogTitle: "Food & FMCG Plant Recruitment India | EarlyJobs",
  ogDescription:
    "Hire hygiene-aware production and packaging staff for food processing and FMCG plants in India, including seasonal volume planning with EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs food processing and FMCG manufacturing recruitment",
  twitterTitle: "Food Processing & FMCG Recruitment India",
  twitterDescription:
    "Food and FMCG plant hiring — production, packaging and seasonal spikes across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <FoodProcessingFmcgManufacturingRecruitmentPage />
    </>
  );
}

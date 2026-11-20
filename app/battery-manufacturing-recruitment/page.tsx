import type { Metadata } from "next";
import { BatteryManufacturingRecruitmentPage } from "@/components/battery-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/battery-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/battery-manufacturing-recruitment",
  title: "Battery Cell Plant Recruitment India | EarlyJobs",
  description:
    "Hire cell assembly, electrode and dry-room operators for battery manufacturing plants in India. EarlyJobs supports entry-level plant workforce planning.",
  ogTitle: "Battery Cell Plant Recruitment India | EarlyJobs",
  ogDescription:
    "Hire cell assembly, electrode and dry-room operators for battery manufacturing plants in India. EarlyJobs supports entry-level plant workforce planning.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs battery manufacturing recruitment",
  twitterTitle: "Battery Manufacturing Recruitment in India",
  twitterDescription:
    "Battery cell plant hiring — assembly, electrode and dry-room ops across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <BatteryManufacturingRecruitmentPage />
    </>
  );
}

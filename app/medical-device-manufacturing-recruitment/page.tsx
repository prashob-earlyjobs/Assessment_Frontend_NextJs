import type { Metadata } from "next";
import { MedicalDeviceManufacturingRecruitmentPage } from "@/components/medical-device-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/medical-device-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/medical-device-manufacturing-recruitment",
  title: "Medical Device Plant Recruitment India | EarlyJobs",
  description:
    "Hire precision assembly, packaging and quality-documentation staff for medical device manufacturing plants in India through EarlyJobs.",
  ogTitle: "Medical Device Plant Recruitment India | EarlyJobs",
  ogDescription:
    "Hire precision assembly, packaging and quality-documentation staff for medical device manufacturing plants in India through EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs medical device manufacturing recruitment",
  twitterTitle: "Medical Device Manufacturing Recruitment India",
  twitterDescription:
    "Medical device plant hiring — precision assembly, packaging and quality docs.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <MedicalDeviceManufacturingRecruitmentPage />
    </>
  );
}

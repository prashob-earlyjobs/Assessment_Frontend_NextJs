import type { Metadata } from "next";
import { SemiconductorElectronicsComponentRecruitmentPage } from "@/components/semiconductor-electronics-component-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/semiconductor-electronics-component-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/semiconductor-electronics-component-recruitment",
  title: "Semiconductor & Electronics Recruitment India | EarlyJobs",
  description:
    "Explore recruitment for semiconductor and electronics component manufacturing, including production trainees, assembly support and qualified technical staff.",
  ogTitle: "Semiconductor & Electronics Recruitment India | EarlyJobs",
  ogDescription:
    "Explore recruitment for semiconductor and electronics component manufacturing, including production trainees, assembly support and qualified technical staff.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs semiconductor and electronics component recruitment",
  twitterTitle: "Semiconductor & Electronics Recruitment India",
  twitterDescription:
    "Semiconductor plant hiring — production trainees, assembly support and junior technical roles.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <SemiconductorElectronicsComponentRecruitmentPage />
    </>
  );
}

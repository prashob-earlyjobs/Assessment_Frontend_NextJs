import type { Metadata } from "next";
import { SolarRenewableEnergyRecruitmentPage } from "@/components/solar-renewable-energy-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/solar-renewable-energy-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/solar-renewable-energy-recruitment",
  title: "Solar & Renewable Energy Recruitment India | EarlyJobs",
  description:
    "Hire solar technicians, installation helpers and multi-site project staff across India. EarlyJobs supports workforce planning for renewable energy employers.",
  ogTitle: "Solar & Renewable Energy Recruitment India | EarlyJobs",
  ogDescription:
    "Hire solar technicians, installation helpers and multi-site project staff across India. EarlyJobs supports workforce planning for renewable energy employers.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs solar and renewable energy recruitment",
  twitterTitle: "Solar & Renewable Energy Recruitment in India",
  twitterDescription:
    "Solar project hiring — technicians, installation support and multi-site manpower across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <SolarRenewableEnergyRecruitmentPage />
    </>
  );
}

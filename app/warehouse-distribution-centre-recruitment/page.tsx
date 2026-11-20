import type { Metadata } from "next";
import { WarehouseDistributionCentreRecruitmentPage } from "@/components/warehouse-distribution-centre-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/warehouse-distribution-centre-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/warehouse-distribution-centre-recruitment",
  title: "Warehouse & DC Recruitment India | EarlyJobs",
  description:
    "Hire pickers, packers, inventory assistants and dispatch staff for warehouses and distribution centres across India with EarlyJobs.",
  ogTitle: "Warehouse & DC Recruitment India | EarlyJobs",
  ogDescription:
    "Hire pickers, packers, inventory assistants and dispatch staff for warehouses and distribution centres across India with EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs warehouse and distribution centre recruitment",
  twitterTitle: "Warehouse & Distribution Centre Recruitment",
  twitterDescription:
    "Warehouse and DC hiring — pickers, packers, inventory and dispatch across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <WarehouseDistributionCentreRecruitmentPage />
    </>
  );
}

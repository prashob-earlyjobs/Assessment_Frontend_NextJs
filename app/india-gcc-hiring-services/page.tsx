import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { createGccMetadata, GccRoutePage } from "@/components/legacy/gcc/GccRoutePage";
import { indiaGccHiringServices } from "@/components/legacy/gcc/gccPagesData";
import { getPublicNetworkStats } from "@/lib/dashboard";
import schema from "@/schema/india-gcc-hiring-services.jsonld.json";

export const metadata: Metadata = createGccMetadata(indiaGccHiringServices);

export default async function Page() {
  const stats = await getPublicNetworkStats();
  const differentiators = indiaGccHiringServices.differentiators;
  const content =
    differentiators && stats
      ? {
          ...indiaGccHiringServices,
          differentiators: {
            heading: differentiators.heading ?? "Why Enterprises Choose EarlyJobs for India Hiring",
            items: differentiators.items.map((item) =>
              item.endsWith("Recruiters") ? `${stats.recruiters} Recruiters` : item,
            ),
          },
        }
      : indiaGccHiringServices;

  return (
    <>
      <JsonLd data={schema} />
      <GccRoutePage content={content} />
    </>
  );
}

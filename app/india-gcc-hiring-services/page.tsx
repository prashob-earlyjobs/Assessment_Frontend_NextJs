import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { createGccMetadata, GccRoutePage } from "@/components/legacy/gcc/GccRoutePage";
import { indiaGccHiringServices } from "@/components/legacy/gcc/gccPagesData";
import schema from "@/schema/india-gcc-hiring-services.jsonld.json";

export const metadata: Metadata = createGccMetadata(indiaGccHiringServices);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <GccRoutePage content={indiaGccHiringServices} />
    </>
  );
}

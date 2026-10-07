import type { Metadata } from "next";
import { createGccMetadata, GccRoutePage } from "@/components/legacy/gcc/GccRoutePage";
import { indiaGccHiringServices } from "@/components/legacy/gcc/gccPagesData";

export const metadata: Metadata = createGccMetadata(indiaGccHiringServices);

export default function Page() {
  return <GccRoutePage content={indiaGccHiringServices} />;
}

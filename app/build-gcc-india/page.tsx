import type { Metadata } from "next";
import BuildGccIndiaPage from "@/components/legacy/gcc/BuildGccIndiaPage";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/build-gcc-india.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/build-gcc-india",
  title: "Build a GCC in India | Hiring Strategy & Expansion | EarlyJobs",
  description:
    "EarlyJobs helps enterprises planning or expanding an India Global Capability Center align hiring strategy, talent planning, and recruitment execution with their business goals.",
  ogTitle: "Build a GCC in India | Hiring Strategy & Expansion",
  ogDescription:
    "Hiring strategy, talent planning, and recruitment execution for enterprises planning or expanding a Global Capability Center in India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Build a GCC in India | Hiring Strategy & Expansion",
  twitterDescription:
    "Hiring strategy, talent planning, and recruitment execution for enterprises planning or expanding a Global Capability Center in India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <BuildGccIndiaPage />
    </>
  );
}

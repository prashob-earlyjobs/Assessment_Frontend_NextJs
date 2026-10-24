import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import OffshoreCapabilityCenterHiringPage from "@/components/legacy/gcc/OffshoreCapabilityCenterHiringPage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/offshore-capability-center-hiring.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/offshore-capability-center-hiring",
  title: "Offshore Capability Center Hiring in India | EarlyJobs",
  description:
    "Build and scale your offshore capability center in India with EarlyJobs. Access dedicated recruiter pods, AI-assisted sourcing and enterprise hiring across engineering, product, finance and leadership.",
  ogTitle: "Offshore Capability Center Hiring in India | EarlyJobs",
  ogDescription:
    "Scale offshore capability center hiring with EarlyJobs. Combine dedicated recruiter pods, human expertise and AI-assisted recruitment operations to build high-performing teams in India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs offshore capability center hiring and recruitment services",
  twitterTitle: "Offshore Capability Center Hiring in India | EarlyJobs",
  twitterDescription:
    "Build and scale your offshore capability center in India with dedicated recruiter pods, human expertise and AI-assisted recruitment operations.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <OffshoreCapabilityCenterHiringPage />
    </>
  );
}

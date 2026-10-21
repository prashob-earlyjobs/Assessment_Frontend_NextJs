import type { Metadata } from "next";
import GccTalentAcquisitionPage from "@/components/legacy/gcc/GccTalentAcquisitionPage";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/gcc-talent-acquisition.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/gcc-talent-acquisition",
  title: "GCC Talent Acquisition Strategy & Operations | EarlyJobs",
  description:
    "EarlyJobs supports Global Capability Centers with talent acquisition planning and recruitment execution, including sourcing, screening coordination, and recruiter-led hiring.",
  ogTitle: "GCC Talent Acquisition Strategy & Operations",
  ogDescription:
    "Talent acquisition planning and recruitment execution for Global Capability Centers, including sourcing and screening coordination.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "GCC Talent Acquisition Strategy & Operations",
  twitterDescription:
    "Talent acquisition planning and recruitment execution for Global Capability Centers, including sourcing and screening coordination.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <GccTalentAcquisitionPage />
    </>
  );
}

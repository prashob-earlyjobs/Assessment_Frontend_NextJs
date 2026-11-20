import type { Metadata } from "next";
import { JobDescriptionGeneratorPage } from "@/components/job-description-generator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/job-description-generator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/job-description-generator",
  title: "Free Job Description Generator for Employers | EarlyJobs",
  description:
    "Create structured job descriptions for entry-level hiring. Generate editable responsibilities, qualifications and working conditions for employer review.",
  ogTitle: "Free Job Description Generator for Employers | EarlyJobs",
  ogDescription:
    "Create structured job descriptions for entry-level hiring with editable responsibilities, qualifications and working conditions.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Job Description Generator",
  twitterTitle: "Free Job Description Generator",
  twitterDescription:
    "Build editable entry-level job descriptions from your role details — template-based, not invented content.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <JobDescriptionGeneratorPage />
    </>
  );
}

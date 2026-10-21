import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import InternshipLanding from "@/components/legacy/pages/InternshipLanding";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/internship.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/internship",
  title: "Internship Opportunities | Explore Careers at EarlyJobs",
  description:
    "Explore internship opportunities and early-career learning at EarlyJobs. Review available roles, responsibilities and application requirements. Stipend, certificate, and later-role terms are confirmed in writing. They are not promised on this page.",
  ogTitle: "Internship Opportunities | Explore Careers at EarlyJobs",
  ogDescription:
    "Review the EarlyJobs internship. Stipend, certificate, and a later role are confirmed in writing and are not promised on this page.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Internship Opportunities | Explore Careers at EarlyJobs",
  twitterDescription:
    "Review the EarlyJobs internship. Stipend, certificate, and a later role are confirmed in writing and are not promised on this page.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <InternshipLanding />
    </>
  );
}

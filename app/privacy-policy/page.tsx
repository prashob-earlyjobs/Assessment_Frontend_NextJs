import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import PrivacyPolicy from "@/components/legacy/pages/PrivacyPolicy";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/privacy-policy.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy | EarlyJobs",
  description:
    "How EarlyJobs collects, uses, discloses, and safeguards personal information when you visit the website or use its services. Effective July 7, 2025.",
  ogTitle: "Privacy Policy | EarlyJobs",
  ogDescription: "How EarlyJobs collects, uses, and safeguards personal information.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Privacy Policy | EarlyJobs",
  twitterDescription: "How EarlyJobs collects, uses, and safeguards personal information.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PrivacyPolicy />
    </>
  );
}

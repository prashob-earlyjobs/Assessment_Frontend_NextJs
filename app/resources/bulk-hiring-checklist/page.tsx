import type { Metadata } from "next";
import { BulkHiringChecklistPage } from "@/components/bulk-hiring-checklist/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/bulk-hiring-checklist.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/resources/bulk-hiring-checklist",
  title: "Free Bulk Hiring Checklist & Recruitment Plan | EarlyJobs",
  description:
    "Download the free EarlyJobs bulk hiring checklist for Indian employers. Plan vacancies, sourcing, interviews, selection and joining across high-volume drives.",
  ogTitle: "Free Bulk Hiring Checklist & Recruitment Plan | EarlyJobs",
  ogDescription:
    "Download the free EarlyJobs bulk hiring checklist for Indian employers. Plan vacancies, sourcing, interviews, selection and joining across high-volume drives.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Bulk Hiring Checklist",
  twitterTitle: "Free Bulk Hiring Checklist",
  twitterDescription:
    "Plan high-volume hiring across vacancies, sourcing, interviews, selection and joining.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <BulkHiringChecklistPage />
    </>
  );
}

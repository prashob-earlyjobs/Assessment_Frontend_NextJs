import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import RecruitmentProcessOutsourcingPage from "@/components/legacy/pages/ourServices/RecruitmentProcessOutsourcingPage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruitment-process-outsourcing.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/recruitment-process-outsourcing",
  title: "Recruitment Process Outsourcing | EarlyJobs",
  description: "Recruitment process outsourcing from EarlyJobs for employers that want hiring support across open roles.",
  ogTitle: "Recruitment Process Outsourcing | EarlyJobs",
  ogDescription: "Recruitment process outsourcing from EarlyJobs for employers that want hiring support across open roles.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Recruitment Process Outsourcing | EarlyJobs",
  twitterDescription: "Recruitment process outsourcing from EarlyJobs.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitmentProcessOutsourcingPage />
    </>
  );
}

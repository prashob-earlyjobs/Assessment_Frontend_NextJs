import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import RecruitmentProcessOutsourcingPage from "@/components/legacy/pages/ourServices/RecruitmentProcessOutsourcingPage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruitment-process-outsourcing.jsonld.json";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/recruitment-process-outsourcing",
    title: "Recruitment Process Outsourcing (RPO) Services in India | EarlyJobs",
    description:
      "Simplify hiring with EarlyJobs recruitment process outsourcing (RPO) services. Access recruiter-led sourcing, candidate screening and hiring coordination for businesses across India.",
    ogTitle: "Recruitment Process Outsourcing (RPO) Services | EarlyJobs",
    ogDescription:
      "Scale your hiring with EarlyJobs RPO services. Streamline candidate sourcing, screening and recruitment coordination through a recruiter-led, technology-enabled approach.",
    image: "/images/logo.png",
    imageAlt: "EarlyJobs recruitment process outsourcing and hiring services",
    twitterTitle: "Recruitment Process Outsourcing (RPO) Services | EarlyJobs",
    twitterDescription:
      "Improve recruitment execution with recruiter-led sourcing, candidate screening and hiring coordination from EarlyJobs.",
    twitterCard: "summary",
  }),
  other: { language: "en-IN" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitmentProcessOutsourcingPage />
    </>
  );
}

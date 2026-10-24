import type { Metadata } from "next";
import FinanceAccountingServicePage from "@/components/legacy/pages/ourServices/FinanceAccountingServicePage";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/finance-and-accounting-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/finance-and-accounting-recruitment",
  title: "Finance & Accounting Recruitment Services in India | EarlyJobs",
  description:
    "Hire qualified finance and accounting professionals with EarlyJobs. Access recruiter-led sourcing, candidate screening and recruitment support for accounting, taxation, audit and finance roles across India.",
  ogTitle: "Finance & Accounting Recruitment Services in India | EarlyJobs",
  ogDescription:
    "Build a stronger finance team with EarlyJobs. Find accounting, audit, taxation and finance professionals through recruiter-led sourcing and candidate screening.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs finance and accounting recruitment services",
  twitterTitle: "Finance & Accounting Recruitment Services | EarlyJobs",
  twitterDescription:
    "Hire finance and accounting talent with recruiter-led sourcing and screening from EarlyJobs.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <FinanceAccountingServicePage />
    </>
  );
}

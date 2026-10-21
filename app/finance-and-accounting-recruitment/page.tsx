import type { Metadata } from "next";
import FinanceAccountingServicePage from "@/components/legacy/pages/ourServices/FinanceAccountingServicePage";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/finance-and-accounting-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/finance-and-accounting-recruitment",
  title: "Finance & Accounting Recruitment Services | EarlyJobs",
  description:
    "EarlyJobs helps employers hire finance and accounting professionals for roles such as accounting, audit, taxation, financial planning and analysis, and related functions.",
  ogTitle: "Finance & Accounting Recruitment Services",
  ogDescription:
    "Recruitment support for accounting, audit, taxation, financial planning and analysis, and related finance roles.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Finance & Accounting Recruitment Services",
  twitterDescription:
    "Recruitment support for accounting, audit, taxation, financial planning and analysis, and related finance roles.",
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

import type { Metadata } from "next";
import { RecruitmentFunnelCalculatorPage } from "@/components/recruitment-funnel-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruitment-funnel-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/recruitment-funnel-calculator",
  title: "Free Recruitment Funnel Conversion Calculator | EarlyJobs",
  description:
    "Calculate recruitment funnel conversion rates from applications to interviews, offers and joinings. Identify hiring-stage drop-offs with a free employer tool.",
  ogTitle: "Free Recruitment Funnel Conversion Calculator | EarlyJobs",
  ogDescription:
    "Calculate recruitment funnel conversion rates from applications to interviews, offers and joinings.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Recruitment Funnel Calculator",
  twitterTitle: "Free Recruitment Funnel Calculator",
  twitterDescription:
    "Measure hiring-stage conversions and drop-offs from applications to joinings.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitmentFunnelCalculatorPage />
    </>
  );
}

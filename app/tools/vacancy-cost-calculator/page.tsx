import type { Metadata } from "next";
import { VacancyCostCalculatorPage } from "@/components/vacancy-cost-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/vacancy-cost-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/vacancy-cost-calculator",
  title: "Free Vacancy Cost Calculator for Employers | EarlyJobs",
  description:
    "Estimate the cost of unfilled positions using vacancy days, daily operational impact and temporary coverage expenses. Free hiring calculator.",
  ogTitle: "Free Vacancy Cost Calculator for Employers | EarlyJobs",
  ogDescription:
    "Estimate the cost of unfilled positions using vacancy days, daily operational impact and temporary coverage expenses.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Vacancy Cost Calculator",
  twitterTitle: "Free Vacancy Cost Calculator",
  twitterDescription:
    "Model vacancy duration, daily impact and coverage costs for unfilled roles in INR.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <VacancyCostCalculatorPage />
    </>
  );
}

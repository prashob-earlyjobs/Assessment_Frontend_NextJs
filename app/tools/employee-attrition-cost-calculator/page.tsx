import type { Metadata } from "next";
import { EmployeeAttritionCostCalculatorPage } from "@/components/employee-attrition-cost-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/employee-attrition-cost-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/employee-attrition-cost-calculator",
  title: "Free Employee Attrition Cost Calculator India | EarlyJobs",
  description:
    "Estimate employee attrition costs using replacement recruitment expenses, vacancy days, training costs and productivity assumptions. Free calculator for employers.",
  ogTitle: "Free Employee Attrition Cost Calculator India | EarlyJobs",
  ogDescription:
    "Estimate employee attrition costs using replacement recruitment expenses, vacancy days, training costs and productivity assumptions.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Employee Attrition Cost Calculator",
  twitterTitle: "Free Employee Attrition Cost Calculator",
  twitterDescription:
    "Estimate attrition cost from recruitment, training and vacancy assumptions — free for employers.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <EmployeeAttritionCostCalculatorPage />
    </>
  );
}

import type { Metadata } from "next";
import { SalaryBenchmarkingPlannerPage } from "@/components/salary-benchmarking-planner/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/salary-benchmarking-planner.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/salary-benchmarking-planner",
  title: "Salary Benchmarking & Compensation Planning Tool | EarlyJobs",
  description:
    "Compare employer-provided salary ranges and plan compensation budgets across roles, locations and hiring volumes with a free salary planning tool.",
  ogTitle: "Salary Benchmarking & Compensation Planning Tool | EarlyJobs",
  ogDescription:
    "Compare employer-provided salary ranges and plan compensation budgets across roles, locations and hiring volumes.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Salary Benchmarking & Compensation Planning Tool",
  twitterTitle: "Salary Benchmarking & Compensation Planning Tool",
  twitterDescription:
    "Plan hiring salary budgets from employer-provided inputs across roles, locations and headcount.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <SalaryBenchmarkingPlannerPage />
    </>
  );
}

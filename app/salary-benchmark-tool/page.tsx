import type { Metadata } from "next";
import { SalaryBenchmarkToolPage } from "@/components/salary-benchmark-tool/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/salary-benchmark-tool.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/salary-benchmark-tool",
  title: "Salary Benchmarking Tool for Employers | EarlyJobs",
  description:
    "Free Salary Benchmarking Tool — compare illustrative pay ranges by role, industry & location. Plan competitive offers for India hiring teams.",
  ogTitle: "Salary Benchmarking Tool for Employers | EarlyJobs",
  ogDescription:
    "Free Salary Benchmarking Tool — compare illustrative pay ranges by role, industry & location. Plan competitive offers for India hiring teams.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Salary Benchmarking Tool",
  twitterTitle: "Salary Benchmarking Tool for Employers",
  twitterDescription:
    "Free tool: illustrative salary ranges by role, industry, and location for India employers.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <SalaryBenchmarkToolPage />
    </>
  );
}

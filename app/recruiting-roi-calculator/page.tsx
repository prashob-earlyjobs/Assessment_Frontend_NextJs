import type { Metadata } from "next";
import { RecruitingRoiCalculatorPage } from "@/components/recruiting-roi-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruiting-roi-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/recruiting-roi-calculator",
  title: "Recruiting ROI Calculator | EarlyJobs",
  description:
    "Free Recruiting ROI Calculator — estimate hiring program returns from time-to-fill, vacancy cost, and cost per hire. Model ROI for leadership in minutes.",
  ogTitle: "Recruiting ROI Calculator | EarlyJobs",
  ogDescription:
    "Free Recruiting ROI Calculator — estimate hiring program returns from time-to-fill, vacancy cost, and cost per hire. Model ROI for leadership in minutes.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Recruiting ROI Calculator",
  twitterTitle: "Recruiting ROI Calculator",
  twitterDescription:
    "Free tool: estimate recruiting ROI from time-to-fill, vacancy cost, and cost per hire — ready for leadership reviews.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitingRoiCalculatorPage />
    </>
  );
}

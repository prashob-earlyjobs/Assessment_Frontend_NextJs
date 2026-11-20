import type { Metadata } from "next";
import { NinetyDayWorkforceHiringPlanPage } from "@/components/ninety-day-workforce-hiring-plan/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/90-day-workforce-hiring-plan.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/resources/90-day-workforce-hiring-plan",
  title: "Free 90-Day Workforce Hiring Plan Template | EarlyJobs",
  description:
    "Download the free EarlyJobs 90-day workforce hiring plan for Indian employers. Phase headcount, sourcing milestones, interviews and joining targets across a quarter.",
  ogTitle: "Free 90-Day Workforce Hiring Plan Template | EarlyJobs",
  ogDescription:
    "Download the free EarlyJobs 90-day workforce hiring plan for Indian employers. Phase headcount, sourcing milestones, interviews and joining targets across a quarter.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs 90-Day Workforce Hiring Plan Template",
  twitterTitle: "Free 90-Day Workforce Hiring Plan Template",
  twitterDescription:
    "Organize headcount, recruitment milestones, interviews and joining targets over 90 days.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <NinetyDayWorkforceHiringPlanPage />
    </>
  );
}

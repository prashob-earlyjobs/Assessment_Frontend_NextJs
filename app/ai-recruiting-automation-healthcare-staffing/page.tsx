import type { Metadata } from "next";
import { HealthcareStaffingAutomationPage } from "@/components/ai-recruiting-automation-healthcare-staffing/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ai-recruiting-automation-healthcare-staffing.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ai-recruiting-automation-healthcare-staffing",
  title: "AI Recruiting Automation for Healthcare Staffing | EarlyJobs",
  description:
    "Automate hospital recruitment with EarlyJobs AI workflows. Source, screen & schedule healthcare candidates faster with credential-aware automation.",
  ogTitle: "AI Recruiting Automation for Healthcare Staffing | EarlyJobs",
  ogDescription:
    "Automate hospital recruitment with EarlyJobs AI workflows. Source, screen & schedule healthcare candidates faster with credential-aware automation.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs AI recruiting automation for healthcare staffing",
  twitterTitle: "AI Recruiting Automation for Healthcare Staffing",
  twitterDescription:
    "Automate hospital recruitment with credential-aware AI workflows. Source, screen & schedule healthcare candidates faster.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <HealthcareStaffingAutomationPage />
    </>
  );
}

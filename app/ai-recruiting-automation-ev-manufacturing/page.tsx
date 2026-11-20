import type { Metadata } from "next";
import { EvManufacturingAutomationPage } from "@/components/ai-recruiting-automation-ev-manufacturing/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ai-recruiting-automation-ev-manufacturing.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ai-recruiting-automation-ev-manufacturing",
  title: "AI Recruiting Automation for EV Manufacturing | EarlyJobs",
  description:
    "Automate EV and battery plant hiring with EarlyJobs AI. Match power-electronics skills, schedule shift interviews, and ramp factory teams faster.",
  ogTitle: "AI Recruiting Automation for EV Manufacturing | EarlyJobs",
  ogDescription:
    "Automate EV and battery plant hiring with EarlyJobs AI. Match power-electronics skills, schedule shift interviews, and ramp factory teams faster.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs AI recruiting automation for EV manufacturing",
  twitterTitle: "AI Recruiting Automation for EV Manufacturing",
  twitterDescription:
    "Automate EV and battery plant hiring — skills matching, shift scheduling, and high-volume follow-ups with EarlyJobs AI.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <EvManufacturingAutomationPage />
    </>
  );
}

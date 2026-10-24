import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import InternshipLanding from "@/components/legacy/pages/InternshipLanding";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/internship.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/internship",
  title: "Remote HR Recruitment Internship for Freshers | EarlyJobs",
  description:
    "Start your career with EarlyJobs' 3-month remote HR recruitment internship for students and freshers in India. Gain hands-on hiring experience, earn performance-based stipends up to ₹10,000 and explore PPO opportunities.",
  ogTitle: "Remote HR Recruitment Internship for Freshers | EarlyJobs",
  ogDescription:
    "Get real recruitment experience from home with EarlyJobs. A 3-month internship for students and freshers featuring live hiring tasks, performance-based stipends and potential PPO opportunities.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs remote HR recruitment internship for students and freshers",
  twitterTitle: "Remote HR Recruitment Internship for Freshers | EarlyJobs",
  twitterDescription:
    "Review the EarlyJobs internship. Stipend, certificate, and a later role are confirmed in writing and are not promised on this page.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <InternshipLanding />
    </>
  );
}

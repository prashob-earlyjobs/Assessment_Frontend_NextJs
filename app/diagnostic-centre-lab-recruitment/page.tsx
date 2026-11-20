import type { Metadata } from "next";
import { DiagnosticCentreLabRecruitmentPage } from "@/components/diagnostic-centre-lab-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/diagnostic-centre-lab-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/diagnostic-centre-lab-recruitment",
  title: "Diagnostic Centre & Lab Recruitment | EarlyJobs",
  description:
    "Hire phlebotomists, lab assistants and shift-lab support for diagnostic chains and medical laboratories across India with EarlyJobs.",
  ogTitle: "Diagnostic Centre & Lab Recruitment | EarlyJobs",
  ogDescription:
    "Hire phlebotomists, lab assistants and shift-lab support for diagnostic chains and medical laboratories across India with EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs diagnostic centre and medical lab recruitment",
  twitterTitle: "Diagnostic Centre & Medical Lab Recruitment",
  twitterDescription:
    "Diagnostic hiring — phlebotomy, lab assistants and shift-lab support across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <DiagnosticCentreLabRecruitmentPage />
    </>
  );
}

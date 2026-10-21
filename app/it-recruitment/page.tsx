import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import ITRecruitmentServicePage from "@/components/legacy/pages/ourServices/ITRecruitmentServicePage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/it-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/it-recruitment",
  title: "IT Recruitment Services | Technology Hiring | EarlyJobs",
  description:
    "Hire technology professionals through EarlyJobs. Align technical role requirements, relevant candidate profiles and recruiter-led hiring execution.",
  ogTitle: "IT Recruitment Services | Technology Hiring",
  ogDescription:
    "EarlyJobs helps employers define technology hiring requirements. Technical assessments are used only when agreed.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "IT Recruitment Services | Technology Hiring",
  twitterDescription:
    "EarlyJobs helps employers define technology hiring requirements. Technical assessments are used only when agreed.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ITRecruitmentServicePage />
    </>
  );
}

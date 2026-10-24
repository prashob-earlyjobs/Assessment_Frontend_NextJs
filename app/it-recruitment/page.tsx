import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import ITRecruitmentServicePage from "@/components/legacy/pages/ourServices/ITRecruitmentServicePage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/it-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/it-recruitment",
  title: "IT Recruitment Services in India | EarlyJobs",
  description:
    "Hire skilled IT professionals with EarlyJobs. Access recruiter-led hiring for software developers, engineers, cloud, DevOps, cybersecurity, QA and technology leadership roles across India.",
  ogTitle: "IT Recruitment Services in India | EarlyJobs",
  ogDescription:
    "Build your technology team with EarlyJobs. Connect with qualified IT talent through recruiter-led sourcing, candidate screening and hiring coordination across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs IT recruitment services for technology teams",
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

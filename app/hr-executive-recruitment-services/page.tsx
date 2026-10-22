import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import HrExecutiveServicePage from "@/components/legacy/pages/ourServices/HrExecutiveServicePage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/hr-executive-recruitment-services.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/hr-executive-recruitment-services",
  title: "HR Executive Recruitment Services | EarlyJobs",
  description:
    "Hire HR professionals through EarlyJobs. Align recruitment with your people operations, talent acquisition, HR business partnering and workforce needs.",
  ogTitle: "HR Executive Recruitment Services",
  ogDescription:
    "EarlyJobs helps employers connect HR hiring requirements with recruiter-led sourcing. Outcomes are not guaranteed.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "HR Executive Recruitment Services",
  twitterDescription:
    "EarlyJobs helps employers connect HR hiring requirements with recruiter-led sourcing. Outcomes are not guaranteed.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <HrExecutiveServicePage />
    </>
  );
}

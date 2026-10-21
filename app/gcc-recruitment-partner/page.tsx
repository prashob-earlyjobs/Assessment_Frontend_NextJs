import type { Metadata } from "next";
import GccRecruitmentPartnerPage from "@/components/legacy/gcc/GccRecruitmentPartnerPage";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/gcc-recruitment-partner.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/gcc-recruitment-partner",
  title: "GCC Recruitment Partner in India | EarlyJobs",
  description:
    "EarlyJobs works with Global Capability Centers as a recruitment partner for dedicated hiring support, recruiter coordination, and AI-assisted recruitment workflows.",
  ogTitle: "GCC Recruitment Partner in India",
  ogDescription:
    "Dedicated hiring support, recruiter coordination, and AI-assisted recruitment workflows for Global Capability Centers.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "GCC Recruitment Partner in India",
  twitterDescription:
    "Dedicated hiring support, recruiter coordination, and AI-assisted recruitment workflows for Global Capability Centers.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <GccRecruitmentPartnerPage />
    </>
  );
}

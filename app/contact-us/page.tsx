import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/contact-us.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/contact-us",
  title: "Contact EarlyJobs | Hiring & Recruitment Partnerships",
  description:
    "Contact EarlyJobs to discuss hiring requirements, recruitment partnerships, or general enquiries. Share the role, location, and timeline, and the team will review the enquiry.",
  ogTitle: "Contact EarlyJobs | Hiring & Recruitment Partnerships",
  ogDescription:
    "Discuss hiring requirements, recruitment partnerships, or general enquiries with EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Contact EarlyJobs | Hiring & Recruitment Partnerships",
  twitterDescription:
    "Discuss hiring requirements, recruitment partnerships, or general enquiries with EarlyJobs.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ContactPage />
    </>
  );
}

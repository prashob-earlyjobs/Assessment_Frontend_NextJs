import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/contact-us.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/contact-us",
  title: "Contact EarlyJobs | Hiring & Recruitment Enquiries",
  description:
    "Contact EarlyJobs for recruitment services, employer hiring requirements, recruiter partnerships and general enquiries. Reach our team by phone, email or contact form.",
  ogTitle: "Contact EarlyJobs | Hiring & Recruitment Enquiries",
  ogDescription:
    "Connect with EarlyJobs for hiring support, recruitment services, recruiter and agency partnerships, and other business enquiries.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Contact EarlyJobs | Hiring & Recruitment Enquiries",
  twitterDescription:
    "Contact EarlyJobs for recruitment, hiring, partnerships and general enquiries.",
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

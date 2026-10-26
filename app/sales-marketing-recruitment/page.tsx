import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import SalesMarketingServicePage from "@/components/legacy/pages/ourServices/SalesMarketingServicePage";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/sales-marketing-services.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/sales-marketing-services",
  title: "Sales & Marketing Recruitment Services in India | EarlyJobs",
  description: "Hire sales and marketing professionals with EarlyJobs. Access recruiter-led sourcing and candidate screening for sales executives, business development, digital marketing and leadership roles across India.",
  ogTitle: "Sales & Marketing Recruitment Services | EarlyJobs",
  ogDescription: "Build high-performing sales and marketing teams with EarlyJobs. Connect with relevant professionals through recruiter-led sourcing, candidate screening and hiring support.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Sales & Marketing Recruitment Services | EarlyJobs",
  twitterDescription: "Find sales, business development and marketing talent through EarlyJobs' recruiter-led hiring network.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <SalesMarketingServicePage />
    </>
  );
}

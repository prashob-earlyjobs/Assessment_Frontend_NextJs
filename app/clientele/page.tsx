import type { Metadata } from "next";
import { CompanyTieUpsPage } from "@/components/clientele/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { getPublicCompanies } from "@/lib/public-companies";
import schema from "@/schema/clientele.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/clientele",
  title: "Our Hiring Partners & Client Network | EarlyJobs",
  description:
    "Explore companies that work with EarlyJobs for recruitment and hiring support. Discover our hiring network, corporate recruitment services, GCC hiring solutions and frontline workforce capabilities.",
  ogTitle: "Our Hiring Partners & Client Network | EarlyJobs",
  ogDescription:
    "See the companies and hiring solutions connected with EarlyJobs. Explore recruiter-led corporate hiring, international recruitment support, GCC talent acquisition and GigKaro frontline hiring.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Our Hiring Partners & Client Network | EarlyJobs",
  twitterDescription:
    "Explore EarlyJobs' hiring network, recruitment services and solutions for businesses.",
  twitterCard: "summary",
});

export default async function Page() {
  const companies = await getPublicCompanies().catch(() => []);
  return (
    <>
      <JsonLd data={schema} />
      <CompanyTieUpsPage companies={companies} />
    </>
  );
}

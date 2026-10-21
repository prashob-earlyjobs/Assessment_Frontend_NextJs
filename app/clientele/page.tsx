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
    "EarlyJobs brings recruitment expertise, a connected hiring network and intelligent technology together to help you hire across India, access global hiring support and build frontline workforces through GigKaro.",
  ogTitle: "Our Hiring Partners & Client Network",
  ogDescription:
    "Recruitment expertise, a connected hiring network, and frontline hiring through GigKaro.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Our Hiring Partners & Client Network",
  twitterDescription:
    "Recruitment expertise, a connected hiring network, and frontline hiring through GigKaro.",
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

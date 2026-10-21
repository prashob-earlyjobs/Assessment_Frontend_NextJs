import { AgencyPartnershipsPage } from "@/components/agency-partnerships/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import agencyJsonLd from "@/schema/agency-partnerships.jsonld.json";

export const metadata = pageMetadata({
  path: "/agency-partnerships",
  title: "Recruitment Agency Tie-Up & Partnership | EarlyJobs",
  description:
    "Recruitment agencies: get verified hiring mandates, work across cities and grow with EarlyJobs. Zero candidate fees. Apply to partner today.",
  ogTitle: "Partner with EarlyJobs | Recruitment Agency Tie-Up",
  ogDescription: "Get verified hiring mandates. Work across cities. Zero candidate fees.",
  image: "/og/agency-partnerships.jpg",
  imageAlt: "Recruitment agencies partnering with EarlyJobs",
  twitterTitle: "Partner with EarlyJobs",
  twitterDescription: "Verified hiring mandates for recruitment agencies. Zero candidate fees.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={agencyJsonLd} />
      <AgencyPartnershipsPage />
    </>
  );
}

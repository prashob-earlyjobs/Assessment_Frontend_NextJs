import { AgencyPartnershipsPage } from "@/components/agency-partnerships/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import agencyJsonLd from "@/schema/agency-partnerships.jsonld.json";

export const metadata = pageMetadata({
  path: "/agency-partnerships",
  title: "Recruitment Agency Tie-Up & Partnership | EarlyJobs",
  description:
    "Explore opportunities to collaborate with EarlyJobs on recruitment requirements. Share your agency's hiring specialisations and operating capabilities.",
  ogTitle: "Recruitment Agency Partnerships with EarlyJobs",
  ogDescription:
    "Enquiries from recruitment agencies interested in sharing hiring specialisations, industry experience, and operating capabilities.",
  image: "/og/agency-partnerships.jpg",
  imageAlt: "Recruitment agencies partnering with EarlyJobs",
  twitterTitle: "Partner with EarlyJobs",
  twitterDescription:
    "Explore a potential recruitment partnership. An enquiry does not guarantee approval or mandate allocation.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={agencyJsonLd} />
      <AgencyPartnershipsPage />
    </>
  );
}

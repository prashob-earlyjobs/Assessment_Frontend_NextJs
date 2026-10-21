import type { Metadata } from "next";
import Franchise from "@/components/legacy/franchise/franchise";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/franchise.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/franchise",
  title: "Start a Recruitment Franchise with EarlyJobs | Investment & Support",
  description:
    "Explore a recruitment franchise with EarlyJobs. Investment, support, and commercial terms are confirmed in the applicable franchise agreement. Outcomes vary and are not guaranteed.",
  ogTitle: "Start a Recruitment Franchise with EarlyJobs",
  ogDescription:
    "Investment, support, and commercial terms are confirmed in the applicable franchise agreement. Outcomes vary and are not guaranteed.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Start a Recruitment Franchise with EarlyJobs",
  twitterDescription:
    "Investment, support, and commercial terms are confirmed in the applicable franchise agreement. Outcomes vary and are not guaranteed.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Franchise />
    </>
  );
}

import type { Metadata } from "next";
import Franchise from "@/components/legacy/franchise/franchise";
import { JsonLd } from "@/components/json-ld";
import { getPublicNetworkStats } from "@/lib/dashboard";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/franchise.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/franchise",
  title: "Recruitment Franchise in India | Start an EarlyJobs Franchise",
  description:
    "Start your own recruitment franchise with EarlyJobs. Explore franchise investment, training, recruitment business support and opportunities to build a local hiring network across India.",
  ogTitle: "Start a Recruitment Franchise in India | EarlyJobs",
  ogDescription:
    "Build a local recruitment business with EarlyJobs. Learn about franchise investment, training, hiring operations and support for growing your recruitment network.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs recruitment franchise business opportunity",
  twitterTitle: "Recruitment Franchise in India | EarlyJobs",
  twitterDescription:
    "Explore the EarlyJobs recruitment franchise opportunity, investment requirements, training and business support.",
  twitterCard: "summary",
});

export default async function Page() {
  const stats = await getPublicNetworkStats();
  return (
    <>
      <JsonLd data={schema} />
      <Franchise stats={stats} />
    </>
  );
}

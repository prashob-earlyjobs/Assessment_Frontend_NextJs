import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { BeliefStoryPage } from "@/components/story/belief-page";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/story.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/story",
  title: "Our Story | EarlyJobs",
  description:
    "We're building a better way to hire—connecting people, networks and technology across EarlyJobs, Huntlo AI and GigKaro.",
  ogTitle: "Our Story | EarlyJobs",
  ogDescription:
    "We're building a better way to hire—connecting people, networks and technology across EarlyJobs, Huntlo AI and GigKaro.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Our Story | EarlyJobs",
  twitterDescription:
    "We're building a better way to hire—connecting people, networks and technology across EarlyJobs, Huntlo AI and GigKaro.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <BeliefStoryPage />
    </>
  );
}

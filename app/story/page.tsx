import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { BeliefStoryPage } from "@/components/story/belief-page";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/story.jsonld.json";

const TITLE = "Our Story | Saurav Kumar & the Journey of EarlyJobs";
const DESCRIPTION =
  "Discover how Saurav Kumar founded EarlyJobs after seeing talented women face barriers to returning to recruitment. Learn how the mission grew into a connected hiring ecosystem.";

const baseMetadata = pageMetadata({
  path: "/story",
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: "The EarlyJobs Story | From a Simple Idea to a Connected Hiring Network",
  ogDescription:
    "From creating flexible recruitment opportunities for women to building a recruiter-first hiring network, discover the story and mission behind EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "The EarlyJobs journey, mission and vision",
  twitterTitle: "The EarlyJobs Story | Our Mission, Founder & Vision",
  twitterDescription:
    "Discover why Saurav Kumar started EarlyJobs and how its mission to expand access to recruitment opportunities is shaping a connected hiring ecosystem.",
  twitterCard: "summary",
});

export const metadata: Metadata = {
  ...baseMetadata,
  other: { language: "en-IN" },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "article",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <BeliefStoryPage />
    </>
  );
}

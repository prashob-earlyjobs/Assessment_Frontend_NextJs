import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { NewsroomPage } from "@/components/newsroom/page";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/press-release.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/press-release",
  title: "EarlyJobs Press Releases | Official Company Announcements",
  description:
    "Read official EarlyJobs press releases and company announcements published through our official communication channels.",
  ogTitle: "EarlyJobs Press Releases",
  ogDescription: "Official EarlyJobs press releases and company announcements.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "EarlyJobs Press Releases",
  twitterDescription: "Official EarlyJobs press releases and company announcements.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <NewsroomPage heading="EarlyJobs Press Releases" scope="press" />
    </>
  );
}

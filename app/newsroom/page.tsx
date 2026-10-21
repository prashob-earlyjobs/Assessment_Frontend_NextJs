import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { NewsroomPage } from "@/components/newsroom/page";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/newsroom.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/newsroom",
  title: "EarlyJobs Newsroom | Company News and Updates",
  description:
    "Read company announcements, business updates and published news about EarlyJobs and its recruitment ecosystem.",
  ogTitle: "EarlyJobs Newsroom",
  ogDescription: "Published company announcements and news about EarlyJobs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "EarlyJobs Newsroom",
  twitterDescription: "Published company announcements and news about EarlyJobs.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <NewsroomPage />
    </>
  );
}

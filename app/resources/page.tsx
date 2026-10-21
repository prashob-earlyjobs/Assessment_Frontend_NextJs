import { SectionPage } from "@/components/section-page";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/resources",
  title: "Resources | EarlyJobs",
  description: "EarlyJobs has not published a resources library on this page.",
  ogTitle: "Resources | EarlyJobs",
  ogDescription: "EarlyJobs has not published a resources library on this page.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Resources | EarlyJobs",
  twitterDescription: "EarlyJobs has not published a resources library on this page.",
  twitterCard: "summary",
  index: false,
});

export default function ResourcesPage() {
  return <SectionPage title="Resources" />;
}

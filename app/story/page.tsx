import type { Metadata } from "next";
import Story from "@/components/legacy/pages/ourStory";

export const metadata: Metadata = { title: "Our Story | EarlyJobs" };

export default function Page() {
  return <Story />;
}

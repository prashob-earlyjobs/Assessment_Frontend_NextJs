import type { Metadata } from "next";
import { StoryPage } from "@/components/story/page";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story | EarlyJobs",
  },
  description:
    "Every career has a story. So does every hire. How EarlyJobs is building a recruiter-first hiring network for India.",
};

export default function Page() {
  return <StoryPage />;
}

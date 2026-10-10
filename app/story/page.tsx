import type { Metadata } from "next";
import { BeliefStoryPage } from "@/components/story/belief-page";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story | EarlyJobs",
  },
  description:
    "EarlyJobs was built around people — freelance recruiters, women returning to work, and district partners hiring across India.",
};

export default function Page() {
  return <BeliefStoryPage />;
}

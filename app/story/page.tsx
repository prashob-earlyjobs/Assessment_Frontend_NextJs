import type { Metadata } from "next";
import { BeliefStoryPage } from "@/components/story/belief-page";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story | EarlyJobs",
  },
  description:
    "We're building a better way to hire—connecting people, networks and technology across EarlyJobs, Huntlo AI and GigKaro.",
};

export default function Page() {
  return <BeliefStoryPage />;
}

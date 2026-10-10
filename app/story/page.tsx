import type { Metadata } from "next";
import { BeliefStoryPage } from "@/components/story/belief-page";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story | EarlyJobs",
  },
  description:
    "EarlyJobs started by connecting overlooked talent with opportunity through a network of recruiters, Huntlo AI and GigKaro.",
};

export default function Page() {
  return <BeliefStoryPage />;
}

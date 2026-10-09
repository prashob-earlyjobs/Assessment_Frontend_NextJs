import type { Metadata } from "next";
import { NewsroomPage } from "@/components/newsroom/page";

export const metadata: Metadata = {
  title: {
    absolute: "Newsroom | EarlyJobs",
  },
  description:
    "News, announcements and stories from EarlyJobs as we build a recruiter-first hiring network powered by AI.",
};

export default function Page() {
  return <NewsroomPage />;
}

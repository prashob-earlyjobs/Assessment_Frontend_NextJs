import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = { title: "Press Release | EarlyJobs" };

export default function PressReleasePage() {
  return <SectionPage title="Press Release" />;
}

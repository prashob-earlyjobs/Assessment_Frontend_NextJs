import type { Metadata } from "next";
import Franchise from "@/components/legacy/franchise/franchise";

export const metadata: Metadata = { title: "Franchise | EarlyJobs" };

export default function Page() {
  return <Franchise />;
}

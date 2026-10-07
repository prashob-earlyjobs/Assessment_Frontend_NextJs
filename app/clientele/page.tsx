import type { Metadata } from "next";
import Clientele from "@/components/legacy/pages/clientele";

export const metadata: Metadata = { title: "Clientele | EarlyJobs" };

export default function Page() {
  return <Clientele />;
}

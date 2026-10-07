import type { Metadata } from "next";
import BlogDetailPage from "@/components/legacy/blogs/[slug]/page";

export const metadata: Metadata = { title: "Blog | EarlyJobs" };

export default function Page() {
  return <BlogDetailPage />;
}

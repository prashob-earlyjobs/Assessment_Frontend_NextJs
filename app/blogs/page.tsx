import type { Metadata } from "next";
import BlogsPage from "@/components/legacy/blogs/page";

export const metadata: Metadata = { title: "Blogs | EarlyJobs" };

export default function Page() {
  return <BlogsPage />;
}

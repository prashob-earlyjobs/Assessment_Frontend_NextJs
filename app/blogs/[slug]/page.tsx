import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailPage from "@/components/legacy/blogs/[slug]/page";
import { pageMetadata } from "@/lib/page-metadata";
import { getPublishedBlogBySlug } from "@/lib/public-blogs";

type BlogRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (blog === "missing" || blog === "unavailable") {
    return { title: { absolute: "Blog | EarlyJobs" } };
  }
  const title = blog.seoTitle || `${blog.title} | EarlyJobs`;
  const description = blog.seoDescription || blog.excerpt || blog.title;
  return pageMetadata({
    path: `/blogs/${blog.slug}`,
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    image: blog.featuredImage || "/images/logo.png",
    imageAlt: blog.title,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: blog.featuredImage ? "summary_large_image" : "summary",
  });
}

export default async function Page({ params }: BlogRouteProps) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (blog === "missing") notFound();
  return <BlogDetailPage initialBlog={blog === "unavailable" ? null : blog} />;
}

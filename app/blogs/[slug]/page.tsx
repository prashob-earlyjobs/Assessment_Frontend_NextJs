import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailPage from "@/components/legacy/blogs/[slug]/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, SITE_URL } from "@/lib/page-metadata";
import { getPublishedBlogBySlug, type PublicBlog } from "@/lib/public-blogs";

type BlogRouteProps = { params: Promise<{ slug: string }> };

function blogPosting(blog: PublicBlog) {
  const published = blog.publishedAt || blog.createdAt;
  if (!blog.title || !blog.content || !published) return null;
  const authorName = typeof blog.author === "string" ? blog.author : blog.author?.username;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seoDescription || blog.excerpt || blog.title,
    datePublished: published,
    ...(blog.updatedAt ? { dateModified: blog.updatedAt } : {}),
    mainEntityOfPage: `${SITE_URL}/blogs/${blog.slug}`,
    ...(blog.featuredImage ? { image: blog.featuredImage } : {}),
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

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
  const posting = blog === "unavailable" ? null : blogPosting(blog);
  return (
    <>
      {posting ? <JsonLd data={posting} /> : null}
      <BlogDetailPage initialBlog={blog === "unavailable" ? null : blog} />
    </>
  );
}

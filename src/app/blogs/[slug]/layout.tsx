import { Metadata } from "next";

const BACKEND_URL_2_0 = process.env.NEXT_PUBLIC_BACKEND_URL_2_0 || "http://localhost:5001/api";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

type LayoutProps = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await fetch(`${BACKEND_URL_2_0}/blogs/slug/${slug}`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    const result = await response.json();

    if (!response.ok || !result?.success || !result?.data?.blog) {
      return fallbackMetadata(slug);
    }

    const blog = result.data.blog;
    const pageTitle = blog.seoTitle || blog.title || "Blog - EarlyJobs";
    const ogTitle = blog.title || pageTitle;
    const description =
      blog.seoDescription ||
      blog.excerpt ||
      (typeof blog.content === "string"
        ? blog.content.replace(/<[^>]*>/g, "").slice(0, 160)
        : "") ||
      `Read ${blog.title} on EarlyJobs.`;
    const rawImage = blog.featuredImage || "";
    const ogImage =
      rawImage && (rawImage.startsWith("http://") || rawImage.startsWith("https://"))
        ? rawImage
        : rawImage
          ? `${BASE_URL}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`
          : `${BASE_URL}/images/company_logo.jpg`;

    return {
      title: pageTitle,
      description,
      keywords: blog.seoKeywords?.join(", ") || blog.tags?.join(", "),
      openGraph: {
        title: ogTitle,
        description,
        type: "article",
        url: `${BASE_URL}/blogs/${slug}`,
        siteName: "EarlyJobs",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: ogTitle,
          },
        ],
        publishedTime: blog.publishedAt,
        modifiedTime: blog.updatedAt,
        authors: typeof blog.author === "object" && blog.author?.username ? [blog.author.username] : undefined,
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: `${BASE_URL}/blogs/${slug}`,
      },
    };
  } catch {
    return fallbackMetadata(slug);
  }
}

function fallbackMetadata(slug: string): Metadata {
  const title = "Blog - EarlyJobs";
  const description = "Discover career insights, hiring tips, and industry news on EarlyJobs.";
  const url = `${BASE_URL}/blogs/${slug}`;
  const image = `${BASE_URL}/images/company_logo.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "EarlyJobs",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  };
}

export default function BlogSlugLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

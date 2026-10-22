const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL_2_0 || "https://portal-bd-prod.earlyjobs.ai/api";

export type PublicBlog = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author: { username?: string; email?: string; profilePhotoUrl?: string } | string;
  status?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PublicBlogList = {
  blogs: PublicBlog[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
};

function blogFromPayload(payload: unknown): PublicBlog | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as { blog?: PublicBlog; slug?: string; title?: string };
  const blog = record.blog ?? (record.slug && record.title ? (record as PublicBlog) : null);
  if (!blog?.slug || !blog.title) return null;
  if (blog.status && blog.status !== "published") return null;
  return blog;
}

export async function getPublishedBlogs(params: {
  page?: number;
  tag?: string;
  search?: string;
}): Promise<PublicBlogList | null> {
  const query = new URLSearchParams({
    page: String(params.page && params.page > 0 ? params.page : 1),
    limit: "12",
    status: "published",
  });
  if (params.tag) query.set("tag", params.tag);
  if (params.search) query.set("search", params.search);

  try {
    const response = await fetch(`${BACKEND_URL}/blogs?${query.toString()}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const result = (await response.json()) as { success?: boolean; data?: PublicBlogList };
    if (!result.success || !Array.isArray(result.data?.blogs)) return null;
    return result.data;
  } catch {
    return null;
  }
}

/** "missing" is a real 404. "unavailable" means the article service could not be reached. */
export async function getPublishedBlogBySlug(
  slug: string,
): Promise<PublicBlog | "missing" | "unavailable"> {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (response.status === 404) return "missing";
    if (!response.ok) return "unavailable";
    const result = (await response.json()) as { success?: boolean; data?: unknown };
    if (result.success === false) return "missing";
    return blogFromPayload(result.data) ?? "missing";
  } catch {
    return "unavailable";
  }
}

export async function listPublishedBlogPaths(): Promise<{ path: string; lastModified?: Date }[]> {
  const paths: { path: string; lastModified?: Date }[] = [];
  try {
    let page = 1;
    let totalPages = 1;
    while (page <= totalPages && page <= 10) {
      const list = await getPublishedBlogs({ page });
      if (!list) break;
      totalPages = Math.max(list.pagination?.totalPages || 1, Math.ceil((list.pagination?.totalResults || list.blogs.length) / 12));
      for (const blog of list.blogs) {
        if (!blog.slug || (blog.status && blog.status !== "published")) continue;
        const raw = blog.updatedAt || blog.publishedAt || blog.createdAt;
        const lastModified = raw ? new Date(raw) : undefined;
        paths.push({
          path: `/blogs/${blog.slug}`,
          lastModified: lastModified && !Number.isNaN(lastModified.getTime()) ? lastModified : undefined,
        });
      }
      page += 1;
    }
  } catch {
    return paths;
  }
  return paths;
}

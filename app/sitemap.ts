import type { MetadataRoute } from "next";
import { listPublishedBlogPaths } from "@/lib/public-blogs";
import { listPublishedJobPaths } from "@/lib/public-jobs";

export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

const routes = [
  "/",
  "/about",
  "/story",
  "/team",
  "/newsroom",
  "/press-release",
  "/investor-relations",
  "/clientele",
  "/employers",
  "/become-a-recruiter",
  "/agency-partnerships",
  "/franchise",
  "/internship",
  "/jobs",
  "/blogs",
  "/contact-us",
  "/it-recruitment",
  "/finance-and-accounting-recruitment",
  "/sales-marketing-services",
  "/hr-executive-recruitment-services",
  "/top-executive-recruitment-firm",
  "/global-recruitment",
  "/recruitment-process-outsourcing",
  "/gcc-hiring-solutions",
  "/gcc-recruitment-partner",
  "/gcc-talent-acquisition",
  "/build-gcc-india",
  "/india-gcc-hiring-services",
  "/offshore-capability-center-hiring",
  "/privacy-policy",
  "/terms-and-conditions",
] as const;

function entry(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path === "/" ? "" : path}`,
    ...(lastModified ? { lastModified } : {}),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, blogs] = await Promise.all([listPublishedJobPaths(), listPublishedBlogPaths()]);
  return [
    ...routes.map((path) => entry(path)),
    ...blogs.map((blog) => entry(blog.path, blog.lastModified)),
    ...jobs.map((job) => entry(job.path, job.lastModified)),
  ];
}

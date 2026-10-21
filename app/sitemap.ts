import type { MetadataRoute } from "next";

export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

const routes = [
  "/",
  "/about",
  "/story",
  "/team",
  "/newsroom",
  "/investor-relations",
  "/clientele",
  "/employers",
  "/recruiters",
  "/become-a-recruiter",
  "/franchise",
  "/internship",
  "/jobs",
  "/blogs",
  "/resources",
  "/contact-us",
  "/it-recruitment",
  "/finance-and-accounting-recruitment",
  "/sales-marketing-services",
  "/hr-executive-recruitment-services",
  "/top-executive-recruitment-firm",
  "/global-recruitment",
  "/recruitment-process-outsourcing",
  "/value-staffing-service",
  "/gcc-hiring-solutions",
  "/gcc-recruitment-partner",
  "/gcc-talent-acquisition",
  "/build-gcc-india",
  "/india-gcc-hiring-services",
  "/offshore-capability-center-hiring",
  "/privacy-policy",
  "/terms-and-conditions",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((path, index) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));
}

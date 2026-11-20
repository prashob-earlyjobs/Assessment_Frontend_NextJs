import type { MetadataRoute } from "next";
import { listFranchiseCities } from "@/lib/franchise-cities";
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
  "/franchise/locations",
  "/internship",
  "/join-creator-programme",
  "/jobs",
  "/blogs",
  "/contact-us",
  "/it-recruitment",
  "/finance-and-accounting-recruitment",
  "/sales-marketing-recruitment",
  "/hr-executive-recruitment-services",
  "/top-executive-recruitment-firm",
  "/ai-recruiting-automation-healthcare-staffing",
  "/ai-recruiting-automation-manufacturing",
  "/ai-recruiting-automation-ev-manufacturing",
  "/pharmaceutical-manufacturing-recruitment",
  "/electronics-manufacturing-recruitment",
  "/solar-renewable-energy-recruitment",
  "/ev-automotive-manufacturing-recruitment",
  "/diagnostic-centre-lab-recruitment",
  "/warehouse-distribution-centre-recruitment",
  "/battery-manufacturing-recruitment",
  "/food-processing-fmcg-manufacturing-recruitment",
  "/construction-infrastructure-recruitment",
  "/medical-device-manufacturing-recruitment",
  "/semiconductor-electronics-component-recruitment",
  "/resources/manpower-requisition-template",
  "/resources/bulk-hiring-checklist",
  "/resources/90-day-workforce-hiring-plan",
  "/recruiting-roi-calculator",
  "/salary-benchmark-tool",
  "/tools/cost-per-hire-calculator",
  "/tools/employee-attrition-cost-calculator",
  "/tools/recruitment-funnel-calculator",
  "/tools/vacancy-cost-calculator",
  "/tools/job-description-generator",
  "/tools/salary-benchmarking-planner",
  "/compare/recruitment-agency-vs-in-house-hiring",
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

const franchiseUpdated = new Date("2026-11-06");

function entry(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path === "/" ? "" : path}`,
    ...(lastModified ? { lastModified } : {}),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, blogs] = await Promise.all([listPublishedJobPaths(), listPublishedBlogPaths()]);
  return [
    ...routes.map((path) => entry(path, path.startsWith("/franchise") ? franchiseUpdated : undefined)),
    ...listFranchiseCities().map((city) => entry(city.path, franchiseUpdated)),
    ...blogs.map((blog) => entry(blog.path, blog.lastModified)),
    ...jobs.map((job) => entry(job.path, job.lastModified)),
  ];
}

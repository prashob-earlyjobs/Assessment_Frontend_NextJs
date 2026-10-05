import type { JobListing } from "@/components/jobs/listing";

const JOBS_ENDPOINT = "https://portal-bd-prod.earlyjobs.ai/api/public/jobs";
const PAGE_SIZE = 20;

const employmentTypeByLabel: Record<string, string> = {
  "Full Time": "full-time",
  "Part Time": "part-time",
  Freelance: "freelance",
  Seasonal: "seasonal",
  "Fixed-Price": "fixed-price",
};

const experienceByLabel: Record<string, string> = {
  "No-experience": "no-experience",
  Fresher: "fresher",
  Intermediate: "intermediate",
  Expert: "expert",
};

type PublicJob = {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
  minSalary: number;
  maxSalary: number;
  paymentFrequency: string;
  status: string;
  workType: string;
  noOfOpenings: number;
  minExperience: number;
  maxExperience: number;
  isExternal: boolean;
  createdAt: string;
  jobId: string;
  companyName: string;
  brandName?: string;
  companyLogoUrl?: string;
};

type JobsResponse = {
  status: string;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  data?: {
    jobs?: PublicJob[];
  };
};

export type PublishedJobsPage = {
  jobs: JobListing[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
};

function trimNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

function money(amount: number) {
  if (amount >= 10_000_000) return `₹${trimNumber(amount / 10_000_000)} Cr`;
  if (amount >= 100_000) return `₹${trimNumber(amount / 100_000)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatSalary(min: number, max: number, frequency: string) {
  if (frequency === "yearly" && min >= 100_000 && max >= 100_000 && max < 10_000_000) {
    return `₹${trimNumber(min / 100_000)}–${trimNumber(max / 100_000)} LPA`;
  }

  const suffix = frequency === "monthly" ? " /mo" : frequency === "yearly" ? " /yr" : "";
  return `${money(min)}–${money(max)}${suffix}`;
}

function formatExperience(min: number, max: number) {
  if (min === 0 && max === 0) return "Fresher";
  if (min === max) return min === 1 ? "1 yr" : `${min} yrs`;
  return `${min}–${max} yrs`;
}

function formatOpenings(count: number) {
  return count === 1 ? "1 opening" : `${count} openings`;
}

function lpaAmount(amount: number, mode: string) {
  const yearly = mode.toLowerCase() === "monthly" ? amount * 12 : amount;
  return yearly / 100_000;
}

function lpaLabel(amount: number) {
  return amount >= 10 ? amount.toFixed(0) : amount.toFixed(1);
}

function summarySalary(min: number | null, max: number | null, mode: string) {
  const left = min == null ? null : lpaAmount(min, mode);
  const right = max == null ? null : lpaAmount(max, mode);
  if (left != null && right != null) return `${lpaLabel(left)} - ${lpaLabel(right)} LPA`;
  if (left != null) return `${lpaLabel(left)} LPA`;
  if (right != null) return `${lpaLabel(right)} LPA`;
  return "Not Disclosed";
}

function summaryExperience(min: number, max: number) {
  const left = Number.isFinite(min) ? String(min) : "";
  const right = Number.isFinite(max) ? String(max) : "";
  if (left && right) return `${left} - ${right} years`;
  if (left) return `${left} years`;
  if (right) return `${right} years`;
  return "Not specified";
}

function formatWorkType(workType: string) {
  return workType
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}

function postedLabel(createdAt: string) {
  const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "1d ago";
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? "1w ago" : `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return months <= 1 ? "1mo ago" : `${months}mo ago`;
}

function toListing(job: PublicJob): JobListing {
  return {
    id: job._id,
    jobId: job.jobId,
    title: job.title,
    company: job.brandName || job.companyName,
    logoUrl: job.companyLogoUrl,
    location: job.location,
    type: job.employmentType,
    mode: formatWorkType(job.workType),
    experience: formatExperience(job.minExperience, job.maxExperience),
    minExperience: job.minExperience,
    maxExperience: job.maxExperience,
    openings: formatOpenings(job.noOfOpenings),
    salary: formatSalary(job.minSalary, job.maxSalary, job.paymentFrequency),
    posted: postedLabel(job.createdAt),
  };
}

export type JobQuery = {
  search: string;
  location: string;
  categories: string[];
  types: string[];
  levels: string[];
};

export function parseJobsPage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  if (!Number.isInteger(page) || page < 1) return 1;
  return page;
}

function firstParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function parseJobQuery(params: {
  search?: string | string[];
  location?: string | string[];
  category?: string | string[];
  type?: string | string[];
  level?: string | string[];
}): JobQuery {
  const split = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);
  const categories = split(firstParam(params.category));
  return {
    search: firstParam(params.search),
    location: firstParam(params.location),
    categories: categories.length ? categories : ["All Categories"],
    types: split(firstParam(params.type)),
    levels: split(firstParam(params.level)),
  };
}

export function jobsPageHref(page: number, filters?: Partial<JobQuery>) {
  const params = new URLSearchParams();
  if (filters?.search) params.set("search", filters.search);
  if (filters?.location) params.set("location", filters.location);
  const categories = filters?.categories ?? [];
  const defaultCategory = categories.length === 1 && categories[0] === "All Categories";
  if (categories.length && !defaultCategory) params.set("category", categories.join(","));
  if (filters?.types?.length) params.set("type", filters.types.join(","));
  if (filters?.levels?.length) params.set("level", filters.levels.join(","));
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/jobs?${query}` : "/jobs";
}

function employmentTypeParam(types: string[]) {
  return types
    .map((type) => employmentTypeByLabel[type] ?? type.toLowerCase().replace(/\s+/g, "-"))
    .filter(Boolean)
    .join(",");
}

function experienceParam(levels: string[]) {
  return levels
    .map((level) => experienceByLabel[level] ?? level.toLowerCase())
    .filter(Boolean)
    .join(",");
}

function jobsUrl(page: number, filters?: JobQuery) {
  const url = new URL(JOBS_ENDPOINT);
  const categories = filters?.categories?.length ? filters.categories : ["All Categories"];
  url.searchParams.set("category", categories.join(","));
  if (filters?.search) url.searchParams.set("search", filters.search);
  if (filters?.location) url.searchParams.set("location", filters.location);
  const employmentType = employmentTypeParam(filters?.types ?? []);
  if (employmentType) url.searchParams.set("employmentType", employmentType);
  const experience = experienceParam(filters?.levels ?? []);
  if (experience) url.searchParams.set("experience", experience);
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", String(PAGE_SIZE));
  url.searchParams.set("limit", String(PAGE_SIZE));
  url.searchParams.set("status", "published");
  return url;
}

export type PublicJobDetail = {
  jobId: string;
  title: string;
  description: string;
  company: string;
  logoUrl?: string;
  location: string;
  category: string;
  type: string;
  mode: string;
  experience: string;
  minExperience: number;
  maxExperience: number;
  openings: string;
  salary: string;
  skills: string[];
  qualification: string[];
  keywords: JobKeyword[];
  hiringNeed: string;
  shift: string;
  companyName: string;
  city: string;
  summaryExperience: string;
  summarySalary: string;
  updates: "linkedin" | "instagram";
  isActive: boolean;
  isExternal: boolean;
  related: RelatedJob[];
};

export type RelatedJob = {
  jobId: string;
  title: string;
  company: string;
  logoUrl?: string;
  location: string;
  type: string;
  minExperience: number;
  maxExperience: number;
};

type PublicJobRecord = {
  title?: string;
  description?: string;
  location?: string;
  category?: string;
  job_id?: string;
  company_name?: string;
  brand_name?: string;
  city?: string;
  commission_type?: string;
  company_logo_url?: string;
  employment_type?: string;
  work_type?: string;
  min_salary?: number;
  max_salary?: number;
  salary_mode?: string;
  min_experience?: number;
  max_experience?: number;
  no_of_openings?: number;
  skills?: string[];
  qualification?: string[];
  keywords?: { keyword?: string; isShared?: boolean }[] | string[];
  hiring_need?: string;
  shift_timings?: string;
  isActive?: boolean;
  isExternal?: boolean;
  related_jobs?: {
    title?: string;
    company_name?: string;
    city?: string;
    employment_type?: string;
    company_logo?: string;
    job_id?: string;
    min_experience?: number;
    max_experience?: number;
  }[];
};

function relatedJobs(jobs: PublicJobRecord["related_jobs"]): RelatedJob[] {
  if (!jobs?.length) return [];
  return jobs.flatMap((job) => {
    if (!job.job_id || !job.title) return [];
    const minExperience = job.min_experience ?? 0;
    const parenthetical = job.employment_type?.match(/\(([^)]+)\)/)?.[1];
    return [
      {
        jobId: job.job_id,
        title: job.title,
        company: job.company_name || "",
        logoUrl: job.company_logo,
        location: job.city || "",
        type: parenthetical || job.employment_type || "",
        minExperience,
        maxExperience: job.max_experience ?? minExperience,
      },
    ];
  });
}

export type JobKeyword = {
  label: string;
  shared: boolean;
};

function keywordLabels(keywords: PublicJobRecord["keywords"]): JobKeyword[] {
  if (!keywords?.length) return [];
  const labels: JobKeyword[] = [];
  for (const item of keywords) {
    const shared = typeof item !== "string" && Boolean(item.isShared);
    const raw = (typeof item === "string" ? item : item.keyword) ?? "";
    const lines = raw
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line && !/^here are \d+/i.test(line));
    const label = lines.at(-1);
    if (!label) continue;
    const existing = labels.find((entry) => entry.label === label);
    if (existing) existing.shared = existing.shared || shared;
    else labels.push({ label, shared });
  }
  return labels;
}

export async function getPublicJob(jobId: string): Promise<PublicJobDetail | null> {
  if (!/^ej[A-Za-z0-9]+$/.test(jobId)) return null;

  const response = await fetch(`${JOBS_ENDPOINT}/${jobId}`, {
    headers: { Accept: "*/*" },
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;

  const body = (await response.json()) as { status?: string; data?: PublicJobRecord };
  const job = body.data;
  if (body.status !== "success" || !job?.title || !job.job_id) return null;

  const minExperience = job.min_experience ?? 0;
  const maxExperience = job.max_experience ?? minExperience;

  return {
    jobId: job.job_id,
    title: job.title,
    description: job.description ?? "",
    company: job.brand_name || job.company_name || "",
    logoUrl: job.company_logo_url,
    location: job.location || "",
    category: job.category || "",
    type: job.employment_type || "",
    mode: job.work_type ? formatWorkType(job.work_type) : "",
    experience: formatExperience(minExperience, maxExperience),
    minExperience,
    maxExperience,
    openings: formatOpenings(job.no_of_openings ?? 0),
    salary: formatSalary(job.min_salary ?? 0, job.max_salary ?? 0, job.salary_mode || ""),
    skills: job.skills ?? [],
    qualification: job.qualification ?? [],
    keywords: keywordLabels(job.keywords),
    hiringNeed: job.hiring_need || "",
    shift: job.shift_timings || "",
    companyName: job.company_name || job.brand_name || "",
    city: job.city || "Remote",
    summaryExperience: summaryExperience(minExperience, maxExperience),
    summarySalary: summarySalary(
      typeof job.min_salary === "number" ? job.min_salary : null,
      typeof job.max_salary === "number" ? job.max_salary : null,
      job.salary_mode || "",
    ),
    updates: job.commission_type === "percentage" ? "linkedin" : "instagram",
    isActive: job.isActive !== false,
    isExternal: job.isExternal === true,
    related: relatedJobs(job.related_jobs),
  };
}

export async function getPublishedJobs(page = 1, filters?: JobQuery): Promise<PublishedJobsPage> {
  const response = await fetch(jobsUrl(page, filters), {
    headers: { Accept: "*/*" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Jobs request failed (${response.status})`);
  }

  const body = (await response.json()) as JobsResponse;
  if (body.status !== "success" || !body.data?.jobs) {
    throw new Error("Jobs response was empty");
  }

  return {
    jobs: body.data.jobs.map(toListing),
    page: body.page,
    pageSize: body.limit,
    totalPages: body.totalPages,
    totalResults: body.totalResults,
  };
}

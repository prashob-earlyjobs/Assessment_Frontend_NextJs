import type { JobListing } from "@/components/jobs/listing";

const DASHBOARD_ENDPOINT = "https://portal-bd-prod.earlyjobs.ai/api/dashboard";

const dashboardHeaders = {
  Accept: "*/*",
  Origin: "https://www.earlyjobs.ai",
  Referer: "https://www.earlyjobs.ai/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
};

export type DashboardStats = {
  jobs: number;
  recruiters: number;
  companies: number;
};

export type DashboardPayload = DashboardStats & {
  recentJobs: JobListing[];
};

type DashboardJob = {
  _id?: string;
  title?: string;
  location?: string;
  employmentType?: string;
  minSalary?: number;
  maxSalary?: number;
  paymentFrequency?: string;
  workType?: string;
  noOfOpenings?: number;
  minExperience?: number;
  maxExperience?: number;
  jobId?: string;
  companyName?: string;
  brandName?: string;
  companyLogoUrl?: string;
  createdAt?: string;
};

type DashboardResponse = {
  success?: boolean;
  data?: {
    companies?: number;
    totalVacancies?: number;
    totalRecruiters?: number;
    recentJobs?: DashboardJob[];
  };
};

export const fallbackDashboardStats: DashboardStats = {
  jobs: 6439,
  recruiters: 3404,
  companies: 264,
};

export const fallbackDashboard: DashboardPayload = {
  ...fallbackDashboardStats,
  recentJobs: [],
};

export function formatStat(value: number) {
  return `${value.toLocaleString("en-IN")}+`;
}

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
  if (frequency === "monthly" && max > 0 && max < 100_000) {
    const minLpa = (min * 12) / 100_000;
    const maxLpa = (max * 12) / 100_000;
    return `₹${trimNumber(minLpa)}–${trimNumber(maxLpa)} LPA`;
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

function toListing(job: DashboardJob): JobListing | null {
  if (!job.jobId || !job.title) return null;
  const minExperience = job.minExperience ?? 0;
  const maxExperience = job.maxExperience ?? minExperience;
  const minSalary = job.minSalary ?? 0;
  const maxSalary = job.maxSalary ?? 0;
  const frequency =
    job.paymentFrequency || (maxSalary > 0 && maxSalary < 100_000 ? "monthly" : "yearly");

  return {
    id: job._id || job.jobId,
    jobId: job.jobId,
    title: job.title,
    company: job.brandName || job.companyName || "",
    logoUrl: job.companyLogoUrl,
    location: job.location || "",
    type: job.employmentType || "",
    mode: job.workType ? formatWorkType(job.workType) : "",
    experience: formatExperience(minExperience, maxExperience),
    minExperience,
    maxExperience,
    openings: formatOpenings(job.noOfOpenings ?? 0),
    salary: formatSalary(minSalary, maxSalary, frequency),
    posted: job.createdAt ? postedLabel(job.createdAt) : "",
  };
}

export async function getDashboard(): Promise<DashboardPayload> {
  const response = await fetch(DASHBOARD_ENDPOINT, {
    headers: dashboardHeaders,
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Dashboard request failed (${response.status})`);
  }

  const body = (await response.json()) as DashboardResponse;
  if (!body.success || !body.data) {
    throw new Error("Dashboard response was empty");
  }

  return {
    jobs: body.data.totalVacancies ?? fallbackDashboardStats.jobs,
    recruiters: body.data.totalRecruiters ?? fallbackDashboardStats.recruiters,
    companies: body.data.companies ?? fallbackDashboardStats.companies,
    recentJobs: (body.data.recentJobs ?? []).flatMap((job) => {
      const listing = toListing(job);
      return listing ? [listing] : [];
    }),
  };
}

/** @deprecated Prefer getDashboard() */
export async function getDashboardStats(): Promise<DashboardStats> {
  const data = await getDashboard();
  return {
    jobs: data.jobs,
    recruiters: data.recruiters,
    companies: data.companies,
  };
}

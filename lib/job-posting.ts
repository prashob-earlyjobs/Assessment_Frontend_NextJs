import type { PublicJobDetail } from "@/lib/public-jobs";

const EMPLOYMENT_TYPE: Record<string, string> = {
  "full-time": "FULL_TIME",
  "full time": "FULL_TIME",
  "part-time": "PART_TIME",
  "part time": "PART_TIME",
  contract: "CONTRACTOR",
  contractor: "CONTRACTOR",
  temporary: "TEMPORARY",
  intern: "INTERN",
  internship: "INTERN",
  freelance: "OTHER",
};

function salaryUnit(mode: string) {
  if (mode === "yearly") return "YEAR";
  if (mode === "monthly") return "MONTH";
  if (mode === "hourly") return "HOUR";
  return null;
}

/** JobPosting only when the vacancy is active and the required visible fields exist. */
export function jobPostingSchema(job: PublicJobDetail, descriptionHtml: string) {
  if (!job.isActive || !job.title || !job.datePosted || !descriptionHtml.trim() || !job.company) return null;
  const posted = new Date(job.datePosted);
  if (Number.isNaN(posted.getTime())) return null;

  const employmentType = EMPLOYMENT_TYPE[job.type.trim().toLowerCase()];
  const unit = salaryUnit(job.salaryMode);
  const locality = job.city && job.city !== "Remote" ? job.city : job.location;
  const remote = /remote/i.test(job.mode);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: descriptionHtml,
    datePosted: posted.toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      ...(job.logoUrl ? { logo: job.logoUrl } : {}),
    },
    identifier: {
      "@type": "PropertyValue",
      name: "EarlyJobs",
      value: job.jobId,
    },
    directApply: !job.isExternal,
  };

  if (employmentType) data.employmentType = employmentType;
  if (locality) {
    data.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressCountry: "IN",
      },
    };
  }
  if (remote) {
    data.jobLocationType = "TELECOMMUTE";
    data.applicantLocationRequirements = { "@type": "Country", name: "India" };
  }
  if (unit && job.minSalary && job.maxSalary && job.minSalary > 0 && job.maxSalary > 0) {
    data.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.minSalary,
        maxValue: job.maxSalary,
        unitText: unit,
      },
    };
  }

  return data;
}

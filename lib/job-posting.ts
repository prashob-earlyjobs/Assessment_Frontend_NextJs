import { City, State } from "country-state-city";
import type { PublicJobDetail } from "@/lib/public-jobs";

const NON_PLACE = new Set([
  "remote",
  "hybrid",
  "on-site",
  "onsite",
  "on site",
  "wfh",
  "work from home",
  "n/a",
  "na",
  "nil",
  "tbd",
]);

const ALIASES = new Map<string, string>([
  ["bangalore", "Karnataka"],
  ["bombay", "Maharashtra"],
  ["calcutta", "West Bengal"],
  ["madras", "Tamil Nadu"],
  ["gurugram", "Haryana"],
  ["trivandrum", "Kerala"],
  ["vizag", "Andhra Pradesh"],
  ["baroda", "Gujarat"],
  ["cochin", "Kerala"],
]);

function norm(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

const stateNameByCode = new Map(State.getStatesOfCountry("IN").map((state) => [state.isoCode, state.name]));
const STATES = new Map(State.getStatesOfCountry("IN").map((state) => [norm(state.name), state.name]));

const CITIES = new Map<string, string | null>();
for (const city of City.getCitiesOfCountry("IN") ?? []) {
  const key = norm(city.name);
  const region = stateNameByCode.get(city.stateCode) ?? null;
  if (!CITIES.has(key)) CITIES.set(key, region);
  else if (CITIES.get(key) !== region) CITIES.set(key, null);
}

function salaryUnit(mode: string) {
  const value = norm(mode);
  if (value === "yearly" || value === "annual" || value === "per annum") return "YEAR";
  if (value === "monthly") return "MONTH";
  if (value === "weekly") return "WEEK";
  if (value === "daily") return "DAY";
  if (value === "hourly") return "HOUR";
  return null;
}

function employmentType(type: string) {
  const value = norm(type);
  if (!value) return null;
  if (value.includes("intern")) return "INTERN";
  if (value.includes("part-time") || value.includes("part time")) return "PART_TIME";
  if (value.includes("full") || value.includes("permanent")) return "FULL_TIME";
  if (value.includes("contract")) return "CONTRACTOR";
  if (value.includes("freelance") || value.includes("fixed-price") || value.includes("fixed price")) return "OTHER";
  if (value.includes("temporary") || value.includes("seasonal") || value.includes("fixed-term") || value.includes("fixed term"))
    return "TEMPORARY";
  return null;
}

function resolvePlace(city: string, location: string) {
  let regionFromText = "";
  let fallback = "";
  let match: { locality: string; region: string | null } | null = null;

  for (const source of [city, location]) {
    if (!source) continue;
    for (const token of source.split(/[,|/]/)) {
      const label = token.trim();
      const key = norm(label);
      if (!key || NON_PLACE.has(key)) continue;
      const state = STATES.get(key);
      if (state) {
        if (!regionFromText) regionFromText = state;
        continue;
      }
      if (!match) {
        if (CITIES.has(key)) match = { locality: label, region: CITIES.get(key) ?? null };
        else if (ALIASES.has(key)) match = { locality: label, region: ALIASES.get(key) ?? null };
      }
      if (!fallback && label.length <= 48 && !/\d/.test(label)) fallback = label;
    }
  }

  if (match) return { locality: match.locality, region: match.region || regionFromText };
  return { locality: fallback, region: regionFromText };
}

function jobLocation(
  locality: string,
  region: string,
  extras?: { street?: string; area?: string; pincode?: string },
) {
  const streetParts = [extras?.street?.trim(), extras?.area?.trim()].filter(Boolean);
  const streetAddress = streetParts.join(", ");
  const postalCode = extras?.pincode?.trim() || "";

  return {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      addressLocality: locality,
      ...(region ? { addressRegion: region } : {}),
      ...(postalCode ? { postalCode } : {}),
      addressCountry: "IN",
    },
  };
}

/** Paragraph markup Google requires, using the same HTML the page renders. */
export function jobDescriptionHtml(html: string) {
  const trimmed = html.trim();
  if (!trimmed) return "";
  if (/<(p|ul|ol|br|li)\b/i.test(trimmed) || trimmed.includes("\n")) return trimmed;
  return `<p>${trimmed}</p>`;
}

/** Expiry is always 1 month after the original post date. */
export function jobValidThrough(datePosted: string) {
  const posted = new Date(datePosted);
  if (Number.isNaN(posted.getTime())) return null;
  const expires = new Date(posted);
  expires.setUTCMonth(expires.getUTCMonth() + 1);
  return expires;
}

/** JobPosting only when the vacancy is active and the required visible fields exist. */
export function jobPostingSchema(job: PublicJobDetail, descriptionHtml: string) {
  const description = jobDescriptionHtml(descriptionHtml);
  if (!job.isActive || !job.title || !job.datePosted || !description || !job.company) return null;
  const posted = new Date(job.datePosted);
  if (Number.isNaN(posted.getTime())) return null;

  const expires = jobValidThrough(job.datePosted);
  if (!expires) return null;

  const unit = salaryUnit(job.salaryMode);
  const place = resolvePlace(job.city, job.location);
  const remote = /remote/i.test(job.mode);
  const type = employmentType(job.type);
  const logo = job.logoUrl && /^https?:\/\//i.test(job.logoUrl) ? job.logoUrl : "";
  const website = (() => {
    const raw = (job.companyWebsite || "").trim();
    if (!raw) return "https://www.earlyjobs.ai";
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
  })();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: posted.toISOString(),
    validThrough: expires.toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: website,
      ...(logo ? { logo } : {}),
    },
    identifier: {
      "@type": "PropertyValue",
      name: "EarlyJobs",
      value: job.jobId,
    },
    directApply: !job.isExternal,
  };

  if (type) data.employmentType = type;
  if (place.locality) {
    data.jobLocation = jobLocation(place.locality, place.region, {
      street: job.street,
      area: job.area,
      pincode: job.pincode,
    });
  }
  if (remote) {
    data.jobLocationType = "TELECOMMUTE";
    data.applicantLocationRequirements = { "@type": "Country", name: "India" };
  }
  if (job.minExperience > 0) {
    data.experienceRequirements = {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: Math.round(job.minExperience * 12),
    };
  } else if (job.maxExperience === 0) {
    data.experienceRequirements = "no requirements";
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

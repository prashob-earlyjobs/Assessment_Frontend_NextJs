/**
 * Single source of truth for public company metrics.
 * Consumed by home, about, become-a-recruiter, newsroom labels, Our Story labels, and JSON-LD.
 * Do not invent additional figures here.
 *
 * PLACEHOLDERS (render as "—"):
 * - womenRecruiters
 * - districtPartners
 */
export const companyFacts = {
  updatedAt: "October 2026",
  updatedIso: "2026-10-21",
  updatedLabel: "Updated October 2026",
  recruiters: { value: "3,449+", label: "Recruiters", count: 3449 },
  /** @verification Unverified public count — keep as em dash until confirmed. */
  womenRecruiters: { value: "—", label: "Women Recruiters" },
  companies: { value: "266+", label: "Companies", count: 266 },
  interviews: { value: "72,000+", label: "Interviews", count: 72000 },
  joinings: { value: "5,500+", label: "Joinings", count: 5500 },
  /** @verification Unverified public count — keep as em dash until confirmed. */
  districtPartners: { value: "—", label: "District Partners" },
  collegePartners: { value: "430+", label: "College Partners", count: 430 },
  hiringPartners: { value: "20+", label: "Hiring Partners", count: 20 },
} as const;

export type CompanyFactKey = keyof Omit<
  typeof companyFacts,
  "updatedAt" | "updatedIso" | "updatedLabel"
>;

/** Headline stats published on /, /about, /become-a-recruiter and in schema. */
export const publishedNetworkStats = [
  companyFacts.recruiters,
  companyFacts.companies,
  companyFacts.interviews,
  companyFacts.joinings,
] as const;

export const networkStatsSentence = `As of ${companyFacts.updatedAt}, EarlyJobs reports ${companyFacts.recruiters.value} recruiters, ${companyFacts.companies.value} companies, ${companyFacts.interviews.value} interviews, ${companyFacts.joinings.value} successful joinings, ${companyFacts.collegePartners.value} college partners and ${companyFacts.hiringPartners.value} hiring partners.`;

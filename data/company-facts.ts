/**
 * Single source of truth for public company metrics.
 * Consumed by Newsroom and Our Story. Never invent values here.
 *
 * PLACEHOLDERS (render as "—"):
 * - womenRecruiters
 * - districtPartners
 */
export const companyFacts = {
  updatedLabel: "Updated October 2026",
  recruiters: { value: "350+", label: "Recruiters" },
  /** @verification Unverified public count — keep as em dash until confirmed. */
  womenRecruiters: { value: "—", label: "Women Recruiters" },
  companies: { value: "500+", label: "Companies" },
  interviews: { value: "25,000+", label: "Interviews" },
  joinings: { value: "3,000+", label: "Successful Joinings" },
  /** @verification Unverified public count — keep as em dash until confirmed. */
  districtPartners: { value: "—", label: "District Partners" },
  collegePartners: { value: "150+", label: "College Partners" },
  hiringPartners: { value: "20+", label: "Hiring Partners" },
} as const;

export type CompanyFactKey = keyof Omit<typeof companyFacts, "updatedLabel">;

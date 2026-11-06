export type FranchiseCityRecord = {
  name: string;
  state: string;
  hub: string;
  heroImage?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  placements?: string;
  partnerCompanies?: string;
  localColleges?: string;
  aboutText?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  theme?: {
    primary?: string;
    gradient?: string;
  };
  companyBenefits?: string[];
};

export const franchiseCities: Record<string, FranchiseCityRecord>;
export const allowedCities: string[];
export function getDefaultCityData(cityName: string): FranchiseCityRecord;

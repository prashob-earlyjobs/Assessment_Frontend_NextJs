const COMPANIES_ENDPOINT = "https://portal-bd-prod.earlyjobs.ai/api/public/companies";

const companiesHeaders = {
  Accept: "*/*",
  Origin: "https://www.earlyjobs.ai",
  Referer: "https://www.earlyjobs.ai/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
};

export type PublicCompany = {
  id: string;
  name: string;
  logo_url: string;
};

type RawCompany = {
  id?: string;
  _id?: string;
  name?: string;
  logo_url?: string | null;
  is_external_company?: boolean;
};

function normalizeCompanies(raw: unknown): PublicCompany[] {
  const items = Array.isArray(raw) ? raw : [];
  const seen = new Set<string>();

  return items
    .map((item): PublicCompany | null => {
      const company = item as RawCompany;
      const id = company.id || company._id || "";
      const name = (company.name || "").trim();
      const logo = (company.logo_url || "").trim();
      if (!id || !name || !logo) return null;
      if (company.is_external_company) return null;
      if (!/^https?:\/\//i.test(logo)) return null;
      if (seen.has(logo)) return null;
      seen.add(logo);
      return { id, name, logo_url: logo };
    })
    .filter((company): company is PublicCompany => Boolean(company));
}

export async function getPublicCompanies(): Promise<PublicCompany[]> {
  const response = await fetch(COMPANIES_ENDPOINT, {
    headers: companiesHeaders,
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`companies failed: ${response.status}`);
  return normalizeCompanies(await response.json());
}

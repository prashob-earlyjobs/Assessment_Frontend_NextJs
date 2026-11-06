import { allowedCities, franchiseCities, getDefaultCityData } from "@/data/franchise-cities";
import type { FranchiseCityRecord } from "@/data/franchise-cities";

/** Old dedicated URLs that used a different slug from the district list. */
const ALIASES: Record<string, string> = {
  bangalore: "bangalore urban",
  mohali: "mohali/sasnagar",
  ananthapur: "anantapur",
};

export type FranchiseCity = FranchiseCityRecord & {
  canonicalPath: string;
};

function normalize(value: string) {
  return decodeURIComponent(value).toLowerCase().replace(/[-_\s/&]+/g, " ").trim();
}

function canonicalSegment(slug: string) {
  return slug
    .trim()
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[\s_]+/g, "-")
    .replace(/\//g, "-")
    .replace(/-+/g, "-");
}

const byNormalized = new Map<string, FranchiseCityRecord>();
for (const [key, value] of Object.entries(franchiseCities)) {
  byNormalized.set(normalize(key), value);
}

const allowed = allowedCities.filter(Boolean);

export function franchiseCityPath(slug: string) {
  return `/franchise/${canonicalSegment(slug)}`;
}

export function resolveFranchiseCity(citySlug: string): FranchiseCity | null {
  const decoded = normalize(citySlug);
  const aliased = ALIASES[decoded] ?? citySlug;
  const normalized = ALIASES[decoded] ? normalize(aliased) : decoded;
  const match = allowed.find((city) => normalize(city) === normalized);
  if (!match) return null;
  const data = byNormalized.get(normalize(match)) ?? getDefaultCityData(match);
  return { ...data, canonicalPath: franchiseCityPath(match) };
}

export function listFranchiseCities() {
  const seen = new Set<string>();
  const cities: { path: string; name: string; state: string }[] = [];
  for (const slug of allowed) {
    const path = franchiseCityPath(slug);
    if (seen.has(path)) continue;
    seen.add(path);
    const data = byNormalized.get(normalize(slug)) ?? getDefaultCityData(slug);
    cities.push({ path, name: data.name, state: data.state });
  }
  return cities;
}

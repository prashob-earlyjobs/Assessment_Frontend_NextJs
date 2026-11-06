import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityFranchise from "@/components/legacy/franchise/CityFranchise";
import { getPublicNetworkStats } from "@/lib/dashboard";
import { listFranchiseCities, resolveFranchiseCity } from "@/lib/franchise-cities";
import { pageMetadata } from "@/lib/page-metadata";

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return listFranchiseCities().map((city) => ({
    city: city.path.slice("/franchise/".length),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = resolveFranchiseCity(city);
  if (!data) return {};
  const description =
    data.heroDescription ||
    `Join EarlyJobs ${data.name}, India's leading hybrid AI + human recruiter platform. Discover career opportunities in ${data.name}.`;
  return pageMetadata({
    path: data.canonicalPath,
    title: `${data.name} Franchise - AI-Powered Recruitment | EarlyJobs`,
    description,
    ogTitle: `EarlyJobs ${data.name} Franchise`,
    ogDescription: data.heroSubtitle || description,
    image: data.heroImage || "/images/logo.png",
    imageAlt: `EarlyJobs ${data.name} franchise`,
    twitterTitle: `EarlyJobs ${data.name} Franchise`,
    twitterDescription: data.heroSubtitle || description,
  });
}

export default async function FranchiseCityPage({ params }: Props) {
  const { city } = await params;
  const data = resolveFranchiseCity(city);
  if (!data) notFound();
  const stats = await getPublicNetworkStats();
  return <CityFranchise data={data} stats={stats} />;
}

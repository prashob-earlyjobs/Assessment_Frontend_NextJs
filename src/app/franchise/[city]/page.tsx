import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import Navbar from "../../components/pages/navbar";
import CityFranchise from "../../components/Franchise/CityFranchise";
import { franchiseCities, getDefaultCityData, allowedCities } from "../data/franchiseCities";

type Props = {
  params: { city: string };
};

function getMatchedSlug(citySlug: string): string | null {
  const lowerCitySlug = citySlug.toLowerCase();
  const normalizedSlug = lowerCitySlug.replace(/-/g, " ");
  const underscoreSlug = lowerCitySlug.replace(/-/g, "_");

  return (
    allowedCities.find((city) => {
      const c = city.toLowerCase();
      return c === lowerCitySlug || c === normalizedSlug || c === underscoreSlug;
    }) || null
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const matchedSlug = getMatchedSlug(params.city);
  const cityData = matchedSlug
    ? franchiseCities[matchedSlug] || getDefaultCityData(matchedSlug)
    : getDefaultCityData(params.city);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

  return {
    title: `${cityData.name} Franchise - AI-Powered Recruitment | EarlyJobs`,
    description:
      cityData.heroDescription ||
      `Join EarlyJobs ${cityData.name}, India's leading hybrid AI + human recruiter platform. Discover career opportunities in ${cityData.name}.`,
    keywords: ["EarlyJobs", cityData.name, "franchise", "recruitment", "AI recruitment", "job placement", cityData.state],
    openGraph: {
      title: `EarlyJobs ${cityData.name} Franchise`,
      description: cityData.heroSubtitle || cityData.heroDescription,
      url: `${baseUrl}/franchise/${params.city}`,
      images: [
        {
          url: cityData.heroImage || `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: `EarlyJobs ${cityData.name} Franchise`,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/${params.city}`,
    },
  };
}

export default function DynamicCityFranchise({ params }: Props) {
  const matchedSlug = getMatchedSlug(params.city);

  if (!matchedSlug) {
    notFound();
  }

  // Get city data or fallback to default
  const cityData = franchiseCities[matchedSlug] || getDefaultCityData(matchedSlug);

  return (
    <main>
      <Navbar />
      <Header />
      <CityFranchise data={cityData} />
      <Footer />
    </main>
  );
}

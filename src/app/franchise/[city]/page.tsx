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
    // Decode URL encoded characters and normalize case
    const decoded = decodeURIComponent(citySlug).toLowerCase();

    // Normalize all separators (hyphens, underscores, spaces) to a single space
    const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, " ").trim();
    const normalizedInput = normalize(decoded);

    return (
        allowedCities.find((city) => {
            if (!city) return false;
            return normalize(city) === normalizedInput;
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

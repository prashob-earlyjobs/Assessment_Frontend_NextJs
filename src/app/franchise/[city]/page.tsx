"use client"

import { notFound, useParams } from "next/navigation";
import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import Navbar from "../../components/pages/navbar";
import CityFranchise from "../../components/Franchise/CityFranchise";
import { franchiseCities, getDefaultCityData, allowedCities } from "../data/franchiseCities";

export default function DynamicCityFranchise() {
    const params = useParams();
    const citySlug = Array.isArray(params.city) ? params.city[0] : params.city;

    if (!citySlug) return null;

    // Check if city is allowed
    if (!allowedCities.includes(citySlug.toLowerCase())) {
        notFound();
    }

    // Get city data or fallback to default
    const cityData = franchiseCities[citySlug.toLowerCase()] || getDefaultCityData(citySlug);

    return (
        <main>
            <Navbar />
            <Header />
            <CityFranchise data={cityData} />
            <Footer />
        </main>
    );
}

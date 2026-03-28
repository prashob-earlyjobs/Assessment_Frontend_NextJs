import { Metadata } from "next";
import Link from "next/link";
import { franchiseCities, allowedCities } from "../data/franchiseCities";
import Footer from "../../components/pages/footer";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";

export const metadata: Metadata = {
  title: "Franchise Locations | EarlyJobs",
  description: "Explore EarlyJobs franchise locations across India. Grouped by state, find job opportunities and recruitment services in your district.",
  keywords: ["EarlyJobs", "franchise locations", "recruitment nodes", "job search by district", "India jobs"],
};

export default function FranchiseLocations() {
  // Group cities by state
  const groupedCities: Record<string, { slug: string; name: string }[]> = {};

  allowedCities.forEach((slug) => {
    // Try to find the city in the data object
    // Handle potential key variations (spaces vs underscores)
    const lookupSlug = slug.toLowerCase().replace(/\s+/g, "_");
    const cityData = franchiseCities[lookupSlug] || franchiseCities[slug] || { name: slug, state: "India" };

    const state = cityData.state || "India";
    const cityName = cityData.name || slug.charAt(0).toUpperCase() + slug.slice(1);

    if (!groupedCities[state]) {
      groupedCities[state] = [];
    }
    groupedCities[state].push({ slug, name: cityName });
  });

  // Sort states by district count (descending)
  const sortedStates = Object.keys(groupedCities).sort((a, b) =>
    groupedCities[b].length - groupedCities[a].length
  );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24 md:pt-32">
      <NavbarV2 />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-6 px-4 md:py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Our Franchise Network
          </h1>
          <p className="text-base text-orange-50 text-balance max-w-3xl mx-auto leading-relaxed">
            Connecting talent with opportunity across {allowedCities.length}+ districts in India.
            Find your local EarlyJobs hub and accelerate your career.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <div className="flex-grow py-12 px-4 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {sortedStates.map((state) => (
              <div
                key={state}
                className="break-inside-avoid bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="bg-orange-50 px-6 py-4 border-b border-orange-100">
                  <h2 className="text-xl font-bold text-gray-900 group flex items-center">
                    <span className="w-2 h-6 bg-orange-600 rounded-full mr-3"></span>
                    {state}
                    <span className="ml-auto text-sm font-medium text-orange-600 bg-white px-2 py-0.5 rounded-full border border-orange-100">
                      {groupedCities[state].length}
                    </span>
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {groupedCities[state].sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/franchise/${city.slug.replace(/\s+/g, "-")}`}
                          className="group flex items-center gap-2 text-gray-600 hover:text-orange-700 transition-all duration-200 text-sm py-1.5 px-2 rounded-lg hover:bg-orange-50/50 truncate border border-transparent hover:border-orange-100"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 group-hover:bg-orange-600 rounded-full transition-colors flex-shrink-0"></span>
                          <span className="truncate">{city.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

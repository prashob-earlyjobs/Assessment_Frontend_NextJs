import type { Metadata } from "next";
import Link from "next/link";
import { listFranchiseCities } from "@/lib/franchise-cities";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/franchise/locations",
  title: "Franchise Locations | EarlyJobs",
  description:
    "Explore EarlyJobs franchise locations across India. Grouped by state, find recruitment services in your district.",
  ogTitle: "EarlyJobs franchise locations",
  ogDescription: "EarlyJobs franchise locations grouped by state across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs franchise locations",
  twitterTitle: "Franchise Locations | EarlyJobs",
  twitterDescription: "Find an EarlyJobs franchise location by state and district.",
  twitterCard: "summary",
});

export default function FranchiseLocationsPage() {
  const grouped = new Map<string, { path: string; name: string }[]>();
  for (const city of listFranchiseCities()) {
    if (!city.state || city.state === "India") continue;
    const list = grouped.get(city.state) ?? [];
    list.push({ path: city.path, name: city.name });
    grouped.set(city.state, list);
  }
  const states = [...grouped.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-2 text-2xl font-extrabold text-white md:text-3xl">Our Franchise Network</h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-orange-50">
            Connecting talent with opportunity across {listFranchiseCities().length} districts in India. Find your
            local EarlyJobs hub.
          </p>
        </div>
      </section>
      <div className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-7xl columns-1 gap-8 space-y-8 md:columns-2 lg:columns-3">
          {states.map(([state, cities]) => (
            <div
              key={state}
              className="break-inside-avoid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="border-b border-orange-100 bg-orange-50 px-6 py-4">
                <h2 className="flex items-center text-xl font-bold text-gray-900">
                  <span className="mr-3 h-6 w-2 rounded-full bg-orange-600" />
                  {state}
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-x-4 gap-y-2 p-6 sm:grid-cols-2">
                {cities
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((city) => (
                    <li key={city.path}>
                      <Link
                        href={city.path}
                        className="flex items-center gap-2 truncate rounded-lg border border-transparent px-2 py-1.5 text-sm text-gray-600 hover:border-orange-100 hover:bg-orange-50/50 hover:text-orange-700"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                        <span className="truncate">{city.name}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

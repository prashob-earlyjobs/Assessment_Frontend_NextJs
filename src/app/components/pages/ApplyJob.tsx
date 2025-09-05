"use client";
import { useMemo, useState } from "react";

export default function Index() {
  // Data
  const categories = useMemo(
    () => [
      { icon: "🛍️", title: "Information Technology" },
      { icon: "✍️", title: "BPO/KPO" },
      { icon: "🩺", title: "Health Care" },
      { icon: "📊", title: "Retail" },
      { icon: "🏭", title: "Manufacturing" },
      { icon: "💳", title: "Banking & Finance" },
      { icon: "📈", title: "SaaS/eCommerce" },
      { icon: "👥", title: "Others" },
    ],
    [],
  );

  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  return (
    <main className="bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40 px-2">
      {/* Hero */}
      <section className="relative">
        {/* Highlighted orange background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] sm:h-[700px] md:h-[900px] bg-[radial-gradient(70%_70%_at_15%_5%,rgba(251,146,60,0.6),transparent_60%),radial-gradient(60%_60%_at_85%_10%,rgba(249,115,22,0.55),transparent_60%),radial-gradient(50%_50%_at_50%_40%,rgba(253,186,116,0.4),transparent_70%)]" />

        <div className="container mx-auto grid gap-8 py-8 sm:gap-10 sm:py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16 lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 md:px-3 md:py-1">
              New
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-orange-500">EarlyJobs</span> makes it easy to find your next role
            </h1>
            <p className="mt-3 text-sm text-gray-600 sm:text-base md:mt-4 md:text-base lg:max-w-xl">
              Discover opportunities on EarlyJobs. Search by industry, location, and category — then apply in one click.
            </p>

            {/* Enhanced field box (stacked on mobile, inline on desktop) */}
            <form
              className="mt-4 w-full rounded-2xl border border-orange-200/80 bg-white/95 p-2 sm:p-3 shadow-[0_10px_30px_-8px_rgba(251,146,60,0.3)] ring-1 ring-orange-200/70 backdrop-blur md:p-3 md:shadow-[0_14px_40px_-12px_rgba(251,146,60,0.35)]"
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams({ industry, location });
                window.location.href = `/jobs?${params.toString()}`;
              }}
            >
              <div className="grid gap-2 sm:grid-cols-[2fr_1fr_auto] sm:gap-3 md:gap-2">
                <label className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-2.5 py-1.5 text-sm text-gray-700 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-200 sm:px-3 sm:py-2 md:px-3 md:py-2">
                  <span className="text-orange-500">🔍</span>
                  <input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Search Job Role, Industry"
                    className="h-10 w-full bg-transparent placeholder:text-gray-400 focus:outline-none text-sm sm:h-11 md:h-11"
                  />
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-2.5 py-1.5 text-sm text-gray-700 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-200 sm:px-3 sm:py-2 md:px-3 md:py-2">
                  <span className="text-orange-500">📍</span>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="h-10 w-full bg-transparent placeholder:text-gray-400 focus:outline-none text-sm sm:h-11 md:h-11"
                  />
                </label>
                <button
                  type="submit"
                  className="h-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 text-sm font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700 sm:h-11 sm:px-6 md:h-12 md:px-6 md:rounded-2xl"
                >
                  Search
                </button>
              </div>
            </form>

            <p className="mt-2 text-xs text-gray-500 sm:mt-3 sm:text-sm md:mt-3 md:text-sm">
              Popular searches: <a className="text-orange-700 hover:underline" href="#">Information Technology</a>,{" "}
              <a className="text-orange-700 hover:underline" href="#">Finance</a>,{" "}
              <a className="text-orange-700 hover:underline" href="#">Management</a>
            </p>
          </div>

          {/* Two images layered with z-index (original desktop sizes) */}
          <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
            {/* Ambient glows */}
            <div className="absolute -left-4 -top-4 size-20 rounded-3xl bg-orange-200/60 blur-xl sm:size-24 sm:blur-2xl md:size-28 md:blur-2xl" />
            <div className="absolute -right-6 bottom-0 size-24 rounded-full bg-orange-300/60 blur-2xl sm:size-28 sm:blur-3xl md:size-36 md:blur-3xl" />

            {/* Decorative grid squares (orange/white) */}
            <div className="absolute right-1 top-1 h-12 w-12 rounded-lg opacity-40 [background-image:linear-gradient(to_right,rgba(249,115,22,.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.35)_1px,transparent_1px)] [background-size:10px_10px] sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <div className="absolute left-2 bottom-1/3 h-10 w-10 rounded-lg opacity-30 [background-image:linear-gradient(to_right,rgba(249,115,22,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.3)_1px,transparent_1px)] [background-size:8px_8px] sm:h-12 sm:w-12 md:h-14 md:w-14" />

            {/* Back image with offset outline */}
            <div className="absolute  right-1 top-4 z-0 sm:right-2 sm:top-6 md:right-2 md:top-6">
              <div className="absolute -left-2 -top-2 h-48 w-[360px] rounded-xl md:border-2 md:border-orange-400/70 sm:h-56 sm:w-[400px] md:h-64 md:w-[460px] md:rounded-[2rem] md:border-4"></div>
              <img
                src="/images/HeroImg3.jpg"
                alt="Team meeting"
                className="relative h-48 w-[360px] rounded-xl bg-white object-cover shadow-xl sm:h-56 sm:w-[400px] md:h-64 md:w-[460px] md:rounded-[2rem]"
              />
            </div>
            {/* Front image with offset outline */}
            <div className="absolute hidden md:block left-2 bottom-2 z-10 sm:left-4 sm:bottom-4 md:left-4 md:bottom-4">
              <div className="absolute -left-2 -top-2 h-40 w-[280px] rounded-xl border-2 border-orange-400/70 sm:h-48 sm:w-[320px] md:h-56 md:w-[360px] md:rounded-[2rem] md:border-4"></div>
              <img
                src="/images/Networking.jpg"
                alt="Networking"
                className="relative h-40 w-[280px] rounded-xl bg-white object-cover shadow-xl sm:h-48 sm:w-[320px] md:h-56 md:w-[360px] md:rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-8 sm:py-12 md:py-12 lg:py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">Browse by Industry</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base md:text-base">Find the role that fits. New jobs added daily.</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 md:mt-8">
          {categories.map((c) => (
            <div key={c.title} className="group rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-2xl text-orange-600 ring-1 ring-orange-100">
                  {c.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{c.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring banner */}
        <div className="mt-10 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-6 shadow-sm sm:p-10 md:mt-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-700">We are hiring</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900">Let’s work together & explore opportunities</h3>
            </div>
            <a href="/jobs" className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto py-16">
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">Need help hiring or looking for a role?</h3>
          <p className="mt-2 text-gray-600">Tell us what you need and we’ll reach out.</p>
          <a href="" className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700">
            Contact us
          </a>
        </div>
      </section>
    </main>
  );
}
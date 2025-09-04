import { useMemo, useState } from "react";

export default function Index() {
  // Data
  const categories = useMemo(
    () => [
      { icon: "🛍️", title: "Retail & Product", count: "3 jobs" },
      { icon: "✍️", title: "Content Writer", count: "5 jobs" },
      { icon: "👥", title: "Human Resource", count: "8 jobs" },
      { icon: "📊", title: "Market Research", count: "4 jobs" },
      { icon: "💻", title: "Software", count: "10 jobs" },
      { icon: "💳", title: "Finance", count: "6 jobs" },
      { icon: "📈", title: "Management", count: "9 jobs" },
      { icon: "📣", title: "Marketing & Sales", count: "7 jobs" },
    ],
    [],
  );

  const jobs = useMemo(
    () => [
      {
        company: "Ashford",
        title: "Lead Quality Control QA",
        location: "Remote",
        salary: "$500/hour",
        tags: ["Full Time", "Senior", "Figma"],
      },
      {
        company: "Percepta",
        title: "React Native Developer",
        location: "Germany",
        salary: "$80/hour",
        tags: ["App", "PSD", "Remote"],
      },
      {
        company: "Tesla",
        title: "Senior System Engineer",
        location: "USA",
        salary: "$500/hour",
        tags: ["Figma", "Lead", "Full Time"],
      },
      {
        company: "Bing Search",
        title: "Full Stack Engineer",
        location: "New York, USA",
        salary: "$800/hour",
        tags: ["React", "Node", "Cloud"],
      },
      {
        company: "Amazon",
        title: "Frontend Developer",
        location: "London",
        salary: "$120k/yr",
        tags: ["React", "TypeScript", "UI"],
      },
      {
        company: "Aceable, Inc.",
        title: "Java Software Engineer",
        location: "Austin, TX",
        salary: "$140k/yr",
        tags: ["Java", "Spring", "AWS"],
      },
    ],
    [],
  );

  // Hero search (field box) state
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  return (
    <main className="bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40">
      {/* Hero */}
      <section className="relative">
        {/* Highlighted orange background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(70%_70%_at_15%_5%,rgba(251,146,60,0.6),transparent_60%),radial-gradient(60%_60%_at_85%_10%,rgba(249,115,22,0.55),transparent_60%),radial-gradient(50%_50%_at_50%_40%,rgba(253,186,116,0.4),transparent_70%)]" />

        <div className="container mx-auto grid gap-12 py-16 md:grid-cols-2 md:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              New
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              EarlyJobs makes it easy to find your next role
            </h1>
            <p className="mt-4 max-w-xl text-gray-600">
              Discover opportunities on EarlyJobs. Search by industry, location, and category — then apply in one click.
            </p>

            {/* Enhanced field box (inline) */}
            <form
              className="mt-6 w-full rounded-3xl border border-orange-200/80 bg-white/95 p-3 shadow-[0_14px_40px_-12px_rgba(251,146,60,0.35)] ring-1 ring-orange-200/70 backdrop-blur"
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams({ category, industry, location });
                window.location.href = `/jobs?${params.toString()}`;
              }}
            >
              <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
                <label className="flex items-center gap-2 rounded-2xl border border-orange-100 bg-white px-3 py-2 text-sm text-gray-700 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-200">
                  <span className="text-orange-500">🏷️</span>
                  <input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Industry"
                    className="h-11 w-full bg-transparent placeholder:text-gray-400 focus:outline-none"
                  />
                </label>
                <label className="flex items-center gap-2 rounded-2xl border border-orange-100 bg-white px-3 py-2 text-sm text-gray-700 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-200">
                  <span className="text-orange-500">📍</span>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="h-11 w-full bg-transparent placeholder:text-gray-400 focus:outline-none"
                  />
                </label>
                <label className="flex items-center gap-2 rounded-2xl border border-orange-100 bg-white px-3 py-2 text-sm text-gray-700 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-200">
                  <span className="text-orange-500">🗂️</span>
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    className="h-11 w-full bg-transparent placeholder:text-gray-400 focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700"
                >
                  Search
                </button>
              </div>
            </form>

            <p className="mt-3 text-sm text-gray-500">
              Popular searches: <a className="text-orange-700 hover:underline" href="#">Content Writer</a>, {" "}
              <a className="text-orange-700 hover:underline" href="#">Finance</a>, {" "}
              <a className="text-orange-700 hover:underline" href="#">Management</a>
            </p>
          </div>

          {/* Two images layered with z-index */}
          <div className="relative h-[420px] md:h-[460px]">
            {/* Ambient glows */}
            <div className="absolute -left-6 -top-6 size-28 rounded-3xl bg-orange-200/60 blur-2xl" />
            <div className="absolute -right-10 bottom-0 size-36 rounded-full bg-orange-300/60 blur-3xl" />

            {/* Decorative grid squares (orange/white) */}
            <div className="absolute right-2 top-2 h-16 w-16 rounded-lg opacity-40 [background-image:linear-gradient(to_right,rgba(249,115,22,.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.35)_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="absolute left-4 bottom-1/3 h-14 w-14 rounded-lg opacity-30 [background-image:linear-gradient(to_right,rgba(249,115,22,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.3)_1px,transparent_1px)] [background-size:10px_10px]" />

            {/* Back image with offset outline (not touching) */}
            <div className="absolute right-2 top-6 z-0">
              <div className="absolute -left-3 -top-3 h-64 w-[460px] rounded-[2rem] border-4 border-orange-400/70"></div>
              <img
                src="/images/HeroImg3.jpg"
                alt="Team meeting"
                className="relative h-64 w-[460px] rounded-[2rem] bg-white object-cover shadow-2xl"
              />
            </div>
            {/* Front image with offset outline (not touching) */}
            <div className="absolute left-4 bottom-4 z-10">
              <div className="absolute -left-3 -top-3 h-56 w-[360px] rounded-[2rem] border-4 border-orange-400/70"></div>
              <img
                src="/images/Networking.jpg"
                alt="Networking"
                className="relative h-56 w-[360px] rounded-[2rem] bg-white object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Browse by category</h2>
          <p className="mt-2 text-gray-600">Find the role that fits. New jobs added daily.</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <div key={c.title} className="group rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-2xl text-orange-600 ring-1 ring-orange-100">
                  {c.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring banner */}
        <div className="mt-10 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-6 shadow-sm sm:p-10">
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

      {/* Jobs of the day */}
      <section className="container mx-auto py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Jobs of the day</h2>
          <p className="mt-2 text-gray-600">Connect with the right opportunities faster</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {["Content Writer","Finance","Human Resource","Management","Market Research","Marketing & Sales","Software"].map((t) => (
            <button key={t} className="rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-orange-300 hover:bg-orange-50">
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => {
            const initials = j.company
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            return (
              <div key={j.company + j.title} className="flex h-full flex-col justify-between rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow ring-1 ring-orange-500/30">
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{j.company} • {j.location}</p>
                    <h3 className="mt-1 text-base font-semibold text-gray-900">{j.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {j.tags.map((t) => (
                        <span key={t} className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">{j.salary}</p>
                  <a href="/jobs" className="inline-flex h-9 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-3.5 text-xs font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700">Apply Now</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto py-16">
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">Need help hiring or looking for a role?</h3>
          <p className="mt-2 text-gray-600">Tell us what you need and we’ll reach out.</p>
          <a href="mailto:hello@example.com" className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700">
            Contact us
          </a>
        </div>
      </section>
    </main>
  );
}

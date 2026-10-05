"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useJobsNav } from "@/components/jobs/jobs-nav";
import { filtersPanelClass } from "@/components/jobs/panel-classes";
import { FiltersBodyShimmer } from "@/components/jobs/shimmer";
import { jobsPageHref, type JobQuery } from "@/lib/public-jobs";

const categories = [
  "All Categories",
  "Commerce",
  "Telecommunications",
  "Hotels & Tourism",
  "Education",
  "Financial Services",
  "Aviation",
  "Banking",
  "Insurance",
  "Oil And Gas",
  "Retail",
  "Consumer Goods",
  "Manufacturing",
  "Information Technology",
  "Health Care",
  "BPO",
  "ITES",
  "Entertainment",
  "Finance",
  "Textile",
  "Media and news",
  "Food processing",
  "Hospitality",
  "Construction",
  "Law",
  "Advertising",
  "E-commerce",
  "Other",
] as const;

const cities = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Noida",
  "Gurgaon",
  "Kochi",
  "Indore",
  "Chandigarh",
  "Coimbatore",
  "Mangalore",
] as const;

const jobTypes = ["Full Time", "Part Time", "Freelance", "Seasonal", "Fixed-Price"] as const;
const levels = ["No-experience", "Fresher", "Intermediate", "Expert"] as const;

const collapsedCount = 8;

export function JobFilters({ filters }: { filters: JobQuery }) {
  const router = useRouter();
  const { isPending, navigate } = useJobsNav();
  const [query, setQuery] = useState(filters.search);
  const [expanded, setExpanded] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!filtersOpen) return;
    const media = window.matchMedia("(max-width: 1023px)");
    const lock = () => {
      document.body.style.overflow = media.matches ? "hidden" : "";
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    lock();
    media.addEventListener("change", lock);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      media.removeEventListener("change", lock);
      window.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen]);

  useEffect(() => {
    setQuery(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (query.trim() === filters.search) return;
      replace({ ...filters, search: query.trim() });
    }, 300);
    return () => window.clearTimeout(handle);
  }, [query, filters]);

  useEffect(() => {
    function focusSearch() {
      if (window.location.hash !== "#job-search") return;
      const inputs = document.querySelectorAll<HTMLInputElement>("[data-job-search]");
      const visible = Array.from(inputs).find((input) => input.getClientRects().length > 0);
      (visible ?? inputs[0])?.focus({ preventScroll: true });
    }

    focusSearch();
    const frame = window.requestAnimationFrame(focusSearch);
    const timeout = window.setTimeout(focusSearch, 120);
    window.addEventListener("hashchange", focusSearch);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("hashchange", focusSearch);
    };
  }, []);

  function replace(next: JobQuery) {
    navigate(() => router.replace(jobsPageHref(1, next), { scroll: false }));
  }

  function toggleList(key: "types" | "levels", value: string) {
    const current = filters[key];
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    replace({ ...filters, [key]: next });
  }

  function toggleCategory(value: string) {
    if (value === "All Categories") {
      replace({ ...filters, categories: ["All Categories"] });
      return;
    }
    const withoutAll = filters.categories.filter((item) => item !== "All Categories");
    const next = withoutAll.includes(value) ? withoutAll.filter((item) => item !== value) : [...withoutAll, value];
    replace({ ...filters, categories: next.length ? next : ["All Categories"] });
  }

  const visibleCategories = expanded
    ? categories
    : categories.filter((category, index) => index < collapsedCount || filters.categories.includes(category));
  const active =
    Boolean(filters.search || filters.location || filters.types.length || filters.levels.length) ||
    filters.categories.some((category) => category !== "All Categories");

  function searchField() {
    return (
    <label className="block min-w-0 flex-1">
      <span className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
        Search by Job Title
      </span>
      <span className="mt-2 flex h-11 items-center gap-2 rounded-full bg-neutral-50 px-3.5 ring-1 ring-transparent transition-[background-color,box-shadow] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/25">
        <SearchIcon />
        <input
          data-job-search
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Job title or company"
          className="w-full bg-transparent text-[13px] text-neutral-950 outline-none placeholder:text-neutral-400"
        />
      </span>
    </label>
    );
  }

  return (
    <>
      <div className={`mx-3 mt-3 flex items-end gap-2 sm:mx-4 lg:hidden ${filtersOpen ? "max-lg:hidden" : ""}`}>
        {searchField()}
        <button
          type="button"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(true)}
          className={`mb-0.5 inline-flex h-11 shrink-0 cursor-pointer items-center rounded-full px-4 text-[13px] font-medium ${
            active ? "bg-brand text-white" : "bg-neutral-950 text-white"
          }`}
        >
          Filters
        </button>
      </div>
      {filtersOpen ? (
        <button
          type="button"
          aria-label="Close filters"
          className="fixed inset-0 z-30 bg-neutral-950/30 lg:hidden"
          onClick={() => setFiltersOpen(false)}
        />
      ) : null}
    <aside
      aria-busy={isPending}
      className={`${filtersPanelClass} ${filtersOpen ? "max-lg:block" : "max-lg:hidden"} lg:block`}
    >
      <div className="mb-4 flex items-center justify-between px-1.5">
        <p className="text-[15px] font-semibold tracking-[-0.03em] text-neutral-950">Filters</p>
        <span className="flex items-center gap-3">
          {active ? (
            <button
              type="button"
              onClick={() =>
                replace({ search: "", location: "", categories: ["All Categories"], types: [], levels: [] })
              }
              className="cursor-pointer text-[12px] font-medium text-brand"
            >
              Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="cursor-pointer text-[12px] font-medium text-neutral-500 lg:hidden"
          >
            Close
          </button>
        </span>
      </div>

      {searchField()}

      {isPending ? (
        <FiltersBodyShimmer />
      ) : (
        <>
      <label className="mt-5 block">
        <span className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">Location</span>
        <span className="mt-2 flex h-11 cursor-pointer items-center gap-2 rounded-full bg-neutral-50 px-3.5 ring-1 ring-transparent transition-[background-color,box-shadow] focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/25">
          <PinIcon />
          <select
            value={filters.location}
            onChange={(event) => replace({ ...filters, location: event.target.value })}
            className={`w-full cursor-pointer appearance-none bg-transparent text-[13px] outline-none ${filters.location ? "text-neutral-950" : "text-neutral-400"}`}
          >
            <option value="">Choose city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none size-3.5 shrink-0 text-neutral-400">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </label>

      <fieldset className="mt-5">
        <legend className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">Category</legend>
        <div className="mt-2">
          {visibleCategories.map((category) => (
            <CheckRow
              key={category}
              label={category}
              checked={filters.categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-1 inline-flex cursor-pointer items-center gap-1 px-1.5 py-1.5 text-[13px] font-medium text-brand"
        >
          {expanded ? "Show less" : "Show more"}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">Job Type</legend>
        <div className="mt-2.5 flex flex-wrap gap-1.5 px-0.5">
          {jobTypes.map((type) => (
            <Chip key={type} label={type} checked={filters.types.includes(type)} onChange={() => toggleList("types", type)} />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
          Experience Level
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-1.5 px-0.5">
          {levels.map((level) => (
            <Chip
              key={level}
              label={level}
              checked={filters.levels.includes(level)}
              onChange={() => toggleList("levels", level)}
            />
          ))}
        </div>
      </fieldset>
        </>
      )}
    </aside>
    </>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left transition-colors ${
        checked ? "bg-[#fff4f1]" : "hover:bg-neutral-50"
      }`}
    >
      <span
        className={`flex size-4 shrink-0 items-center justify-center rounded-[5px] border ${
          checked ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white"
        }`}
      >
        {checked ? (
          <svg aria-hidden viewBox="0 0 16 16" className="size-3">
            <path d="m3.5 8.2 2.8 2.8 6.2-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span className={`text-[13px] ${checked ? "font-medium text-neutral-950" : "text-neutral-700"}`}>{label}</span>
    </button>
  );
}

function Chip({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
        checked ? "bg-brand text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      {label}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-neutral-400">
      <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="m10.4 10.4 3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-neutral-400">
      <path
        d="M8 8.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M8 14s4.2-3.7 4.2-6.7A4.2 4.2 0 0 0 3.8 7.3C3.8 10.3 8 14 8 14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

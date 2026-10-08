"use client";

import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { HeroMotion } from "@/components/home/motion";
import {
  fallbackDashboardStats,
  formatStat,
  type DashboardStats,
} from "@/lib/dashboard";
import { jobsPageHref } from "@/lib/public-jobs";

const clientLogos = Array.from({ length: 22 }, (_, index) => ({
  src: `https://storage.googleapis.com/earlyjobs_datas/EJ_V2/${index + 1}.png`,
  alt: `Client ${index + 1}`,
}));

const cities = [
  "Remote",
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
  "Lucknow",
  "Bhopal",
  "Nagpur",
  "Vadodara",
  "Surat",
  "Visakhapatnam",
  "Mysore",
  "Trivandrum",
] as const;

const typingPhrases = [
  "Sales Executive",
  "Frontend Developer",
  "Data Analyst",
  "TCS",
  "Marketing Intern",
] as const;

const statMeta = [
  { key: "jobs" as const, label: "Jobs Openings", icon: "/v2/icons/hjobs.png" },
  { key: "recruiters" as const, label: "Recruiters", icon: "/v2/icons/hCandidates.png" },
  { key: "companies" as const, label: "Companies", icon: "/v2/icons/hCompanies.png" },
] as const;

function useCountUp(target: number, duration = 2700) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target <= 0) {
      setValue(0);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function StatValue({ target }: { target: number }) {
  const value = useCountUp(target);
  return (
    <span className="text-xl font-bold text-white tabular-nums sm:text-2xl md:text-3xl lg:text-4xl">
      {formatStat(value).replace(/\+$/, "")}+
    </span>
  );
}

function useTypingPlaceholder(phrases: readonly string[], enabled: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!enabled || phrases.length === 0) {
      setText("");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(`e.g. ${phrases[0]}`);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const phrase = phrases[phraseIndex] ?? "";

      if (!deleting) {
        charIndex += 1;
        setText(`e.g. ${phrase.slice(0, charIndex)}`);
        if (charIndex >= phrase.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1200);
          return;
        }
        timer = window.setTimeout(tick, 55);
        return;
      }

      charIndex -= 1;
      setText(`e.g. ${phrase.slice(0, Math.max(charIndex, 0))}`);
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(tick, 400);
        return;
      }
      timer = window.setTimeout(tick, 35);
    };

    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [enabled, phrases]);

  return text;
}

function LocationPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities;
    return cities.filter((city) => city.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto sm:min-w-[180px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between gap-2 rounded-lg border-0 bg-transparent px-4 text-left text-black focus:outline-none sm:h-14 sm:rounded-none sm:px-6"
      >
        <span className={value ? "text-black" : "text-gray-500"}>
          {value || "Select Location"}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
      </button>
      {open ? (
        <div className="absolute top-full left-0 z-30 mt-1 w-full min-w-[200px] overflow-hidden rounded-lg border border-black/10 bg-white shadow-lg sm:w-[220px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city..."
            className="h-10 w-full border-b border-black/10 px-3 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
          />
          <ul className="max-h-56 overflow-y-auto py-1">
            {options.length === 0 ? (
              <li className="px-3 py-2 text-sm text-neutral-500">No city found.</li>
            ) : (
              options.map((city) => (
                <li key={city}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-50"
                    onClick={() => {
                      onChange(city);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    {city}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function HeroSearch() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const typed = useTypingPlaceholder(typingPhrases, jobTitle.trim().length === 0);

  function onSubmit(event?: FormEvent) {
    event?.preventDefault();
    const href = jobsPageHref(1, {
      search: jobTitle.trim(),
      location: location.trim(),
    });
    router.push(`${href}${href.includes("#") ? "" : "#job-search"}`);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl px-2 sm:px-4">
      <div className="flex flex-1 flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-lg sm:flex-row sm:rounded-full">
        <div className="flex flex-1 flex-col items-stretch gap-2 p-2.5 sm:flex-row sm:gap-2 sm:p-0 sm:pl-4">
          <input
            type="text"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder={typed || "Job Title or Company"}
            className="h-12 flex-1 rounded-lg border-0 bg-transparent px-8 text-black outline-none placeholder:text-gray-500 sm:h-14 sm:rounded-none sm:px-10"
          />
          <LocationPicker value={location} onChange={setLocation} />
        </div>
        <button
          type="submit"
          className="m-2 flex h-12 items-center justify-center gap-2 rounded-lg bg-[#ea6a4e] px-6 font-medium text-white transition-colors hover:bg-[#ea6a4e]/90 sm:m-0 sm:h-14 sm:rounded-l-none sm:rounded-r-full sm:px-8"
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline">Search Job</span>
          <span className="sm:hidden">Search</span>
        </button>
      </div>
    </form>
  );
}

function LogoCarousel({
  reverse = false,
  className = "",
}: {
  reverse?: boolean;
  className?: string;
}) {
  const logos = reverse ? clientLogos : [...clientLogos, ...clientLogos];
  return (
    <div className={`relative z-10 overflow-hidden ${className}`}>
      <div className="mx-auto max-w-[90rem] px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-12 items-center overflow-hidden sm:h-14 md:h-16">
          <div
            className={`flex w-max gap-4 sm:gap-6 md:gap-8 lg:gap-12 ${
              reverse ? "carousel-horizontal-top" : "carousel-horizontal"
            }`}
          >
            {logos.map((logo, idx) => (
              <div
                key={`${reverse ? "top" : "bot"}-${idx}`}
                className="flex h-14 w-20 shrink-0 items-center justify-center sm:h-20 sm:w-28 md:h-28 md:w-36"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={112}
                  height={100}
                  unoptimized
                  className="h-full w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [dashboard, setDashboard] = useState<DashboardStats>(fallbackDashboardStats);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/dashboard")
      .then(async (response) => {
        if (!response.ok) throw new Error("dashboard failed");
        return (await response.json()) as { success?: boolean; data?: DashboardStats };
      })
      .then((body) => {
        if (cancelled || !body.success || !body.data) return;
        setDashboard(body.data);
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HeroMotion>
      <div className="absolute inset-0">
        <Image
          src="/v2/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 z-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center px-4 py-4 sm:px-6 sm:py-8 md:py-12 lg:px-8 lg:py-16 xl:py-20">
        <div className="space-y-3 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
          <h1 className="px-2 text-center text-3xl leading-tight font-bold text-white sm:px-4 sm:text-4xl md:text-5xl xl:text-6xl">
            Find Jobs. Get Discovered by Recruiters.
          </h1>

          <p className="mx-auto max-w-3xl px-2 text-center text-sm text-white/80 sm:px-6 sm:text-base md:text-lg lg:text-xl">
            A Growing Network of Women Recruiters, Built for the Future of Hiring.
          </p>

          <HeroSearch />

          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-2 text-sm text-white/70">
            <span>Built for recruiters</span>
            <span aria-hidden className="text-white/35">
              ·
            </span>
            <span>Trusted by employers</span>
            <span aria-hidden className="text-white/35">
              ·
            </span>
            <span>Loved by job seekers</span>
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-2 pt-1 sm:mt-4 sm:gap-4 sm:pt-2 md:mt-8 md:gap-6 lg:mt-12 lg:gap-10 xl:gap-16">
            {statMeta.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 sm:gap-3">
                <div className="relative h-8 w-8 shrink-0 sm:h-10 sm:w-10 md:h-12 md:w-12">
                  <Image src={stat.icon} alt="" fill className="object-contain" />
                </div>
                <div>
                  <StatValue target={dashboard[stat.key]} />
                  <p className="text-xs text-white/70 sm:text-sm md:text-base">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LogoCarousel reverse className="hidden lg:block" />
      <LogoCarousel className="shrink-0 pb-3 sm:pb-4" />
    </HeroMotion>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { HeroMotion } from "@/components/home/motion";
import {
  fallbackDashboardStats,
  formatStat,
  type DashboardStats,
} from "@/lib/dashboard";
import { jobsPageHref } from "@/lib/public-jobs";

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

const statMeta = [
  {
    key: "jobs" as const,
    label: "Jobs Openings",
    icon: "/hero-icons/hjobs.png",
  },
  {
    key: "recruiters" as const,
    label: "Recruiters",
    icon: "/hero-icons/hCandidates.png",
  },
  {
    key: "companies" as const,
    label: "Companies",
    icon: "/hero-icons/hCompanies.png",
  },
] as const;

const partners = Array.from({ length: 18 }, (_, index) => `/partners/${index + 1}.png`);

const typingPhrases = ["Data Analyst", "Marketing Intern", "Frontend Developer"] as const;

function useCountUp(target: number, duration = 1400) {
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
    <span className="block text-xl font-semibold tracking-[-0.03em] text-white tabular-nums sm:text-2xl">
      {formatStat(value)}
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
      setText(phrases[0] ?? "");
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
        setText(phrase.slice(0, charIndex));
        if (charIndex >= phrase.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 70);
        return;
      }

      charIndex -= 1;
      setText(phrase.slice(0, Math.max(charIndex, 0)));
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(tick, 400);
        return;
      }
      timer = window.setTimeout(tick, 40);
    };

    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [enabled, phrases]);

  return text;
}

function HeroSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [focused, setFocused] = useState(false);
  const typed = useTypingPlaceholder(typingPhrases, !search && !focused);
  const placeholder = typed ? `e.g. ${typed}` : "e.g. ";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = jobsPageHref(1, {
      search: search.trim(),
      location: location.trim(),
    });
    router.push(`${href}${href.includes("#") ? "" : "#job-search"}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex h-auto w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:h-[3.5rem] sm:flex-row sm:items-stretch sm:rounded-full"
    >
      <label className="flex min-w-0 flex-1 items-center px-5 py-3.5 sm:py-0 sm:pr-2 sm:pl-6">
        <span className="sr-only">Job title or company</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[15px] text-neutral-950 outline-none placeholder:text-neutral-400"
        />
      </label>
      <label className="relative flex min-w-0 w-full items-center border-t border-neutral-100 px-5 py-3.5 sm:w-[9rem] sm:flex-none sm:border-t-0 sm:py-0 sm:pr-3 sm:pl-1">
        <span className="sr-only">Location</span>
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className={`w-full appearance-none bg-transparent pr-5 text-[15px] outline-none ${
            location ? "text-neutral-950" : "text-neutral-400"
          }`}
        >
          <option value="">Select Location</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="pointer-events-none absolute right-4 size-3.5 text-neutral-400"
        >
          <path
            d="M4 6.5 8 10.5 12 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 bg-brand px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#d85c42] sm:h-auto sm:shrink-0 sm:px-7"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.2 10.2 13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Search Job
      </button>
    </form>
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
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,12,0.55)_0%,rgba(8,10,12,0.62)_40%,rgba(8,10,12,0.78)_100%)]"
        />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pt-10 pb-12 text-center sm:px-8 sm:pt-12 sm:pb-16">
        <h1 className="mt-6 max-w-4xl text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:mt-8 sm:text-[3.25rem]">
          Connecting Talent with Opportunities Across India.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-[15px]">
          India&apos;s Women Recruiter Network: Your Career Partner, From Interview to Onboarding.
        </p>

        <div className="mt-8 w-full sm:mt-10">
          <HeroSearch />
        </div>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/70 sm:mt-5">
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

        <ul className="mt-10 flex w-full max-w-3xl flex-col items-center gap-5 sm:mt-12 sm:flex-row sm:justify-center sm:gap-10">
          {statMeta.map((stat) => (
            <li key={stat.label} className="flex items-center gap-3 text-left">
              <Image
                src={stat.icon}
                alt=""
                width={60}
                height={60}
                className="size-10 shrink-0 object-contain sm:size-11"
              />
              <span>
                <StatValue target={dashboard[stat.key]} />
                <span className="block text-xs text-white/65 sm:text-sm">{stat.label}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex w-full max-w-6xl flex-col gap-2 sm:gap-3">
          {[
            { dir: "left" as const, className: "logo-track" },
            { dir: "right" as const, className: "logo-track-right" },
          ].map((row) => (
            <div key={row.dir} className="logo-marquee w-full overflow-hidden">
              <div className={`${row.className} flex w-max items-center gap-14 sm:gap-16`}>
                {[0, 1].map((copy) => (
                  <ul
                    key={`${row.dir}-${copy}`}
                    className="flex items-center gap-14 sm:gap-16"
                    aria-hidden={copy === 1 || undefined}
                  >
                    {partners.map((src) => (
                      <li
                        key={`${row.dir}-${copy}-${src}`}
                        className="flex h-24 w-48 shrink-0 items-center justify-center sm:h-28 sm:w-52"
                      >
                        <Image
                          src={src}
                          alt=""
                          width={280}
                          height={280}
                          className="h-20 w-auto max-w-[12rem] object-contain brightness-0 invert sm:h-24 sm:max-w-[13rem]"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HeroMotion>
  );
}

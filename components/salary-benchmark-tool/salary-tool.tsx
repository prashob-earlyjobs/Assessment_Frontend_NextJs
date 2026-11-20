"use client";

import { useMemo, useState } from "react";

type Level = "entry" | "mid" | "senior";
type Industry = "manufacturing" | "healthcare" | "ev" | "technology";
type Location = "midwest" | "northeast" | "south" | "west" | "india-metro";

type BenchmarkRow = {
  role: string;
  industry: Industry;
  location: Location;
  level: Level;
  p10: number;
  median: number;
  p90: number;
};

const roles = [
  "Mechanical Engineer",
  "Production Technician",
  "Maintenance Technician",
  "Registered Nurse",
  "Junior Nurse",
  "Battery Assembly Technician",
  "Software Engineer",
] as const;

const industries: { value: Industry; label: string }[] = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "healthcare", label: "Healthcare" },
  { value: "ev", label: "EV / Battery" },
  { value: "technology", label: "Technology" },
];

const locations: { value: Location; label: string }[] = [
  { value: "midwest", label: "Midwest US" },
  { value: "northeast", label: "Northeast US" },
  { value: "south", label: "South US" },
  { value: "west", label: "West US" },
  { value: "india-metro", label: "India Metro" },
];

const levels: { value: Level; label: string }[] = [
  { value: "entry", label: "Entry" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
];

/** Illustrative market bands for demo purposes — not live compensation survey data. */
const dataset: BenchmarkRow[] = [
  { role: "Mechanical Engineer", industry: "manufacturing", location: "midwest", level: "entry", p10: 62000, median: 72000, p90: 85000 },
  { role: "Mechanical Engineer", industry: "manufacturing", location: "midwest", level: "mid", p10: 82000, median: 98000, p90: 118000 },
  { role: "Mechanical Engineer", industry: "manufacturing", location: "midwest", level: "senior", p10: 105000, median: 128000, p90: 155000 },
  { role: "Mechanical Engineer", industry: "ev", location: "midwest", level: "mid", p10: 88000, median: 108000, p90: 132000 },
  { role: "Production Technician", industry: "manufacturing", location: "midwest", level: "entry", p10: 38000, median: 45000, p90: 54000 },
  { role: "Production Technician", industry: "manufacturing", location: "midwest", level: "mid", p10: 46000, median: 56000, p90: 68000 },
  { role: "Maintenance Technician", industry: "manufacturing", location: "midwest", level: "entry", p10: 42000, median: 50000, p90: 60000 },
  { role: "Maintenance Technician", industry: "manufacturing", location: "midwest", level: "mid", p10: 52000, median: 64000, p90: 78000 },
  { role: "Registered Nurse", industry: "healthcare", location: "northeast", level: "mid", p10: 78000, median: 92000, p90: 112000 },
  { role: "Registered Nurse", industry: "healthcare", location: "midwest", level: "mid", p10: 70000, median: 82000, p90: 98000 },
  { role: "Junior Nurse", industry: "healthcare", location: "midwest", level: "entry", p10: 56000, median: 65000, p90: 76000 },
  { role: "Junior Nurse", industry: "healthcare", location: "northeast", level: "entry", p10: 62000, median: 72000, p90: 84000 },
  { role: "Battery Assembly Technician", industry: "ev", location: "midwest", level: "entry", p10: 44000, median: 52000, p90: 62000 },
  { role: "Battery Assembly Technician", industry: "ev", location: "south", level: "entry", p10: 40000, median: 48000, p90: 58000 },
  { role: "Battery Assembly Technician", industry: "ev", location: "midwest", level: "mid", p10: 52000, median: 64000, p90: 78000 },
  { role: "Software Engineer", industry: "technology", location: "west", level: "entry", p10: 95000, median: 120000, p90: 145000 },
  { role: "Software Engineer", industry: "technology", location: "west", level: "mid", p10: 130000, median: 165000, p90: 205000 },
  { role: "Software Engineer", industry: "technology", location: "india-metro", level: "entry", p10: 900000, median: 1200000, p90: 1600000 },
  { role: "Software Engineer", industry: "technology", location: "india-metro", level: "mid", p10: 1500000, median: 2200000, p90: 3200000 },
  { role: "Mechanical Engineer", industry: "manufacturing", location: "india-metro", level: "mid", p10: 800000, median: 1100000, p90: 1500000 },
  { role: "Production Technician", industry: "manufacturing", location: "south", level: "entry", p10: 36000, median: 43000, p90: 52000 },
  { role: "Registered Nurse", industry: "healthcare", location: "west", level: "mid", p10: 88000, median: 105000, p90: 128000 },
];

const experienceBoost: Record<string, number> = {
  "0-2": 0.92,
  "3-5": 1,
  "6-10": 1.12,
  "10+": 1.22,
};

function formatPay(value: number, location: Location) {
  const currency = location === "india-metro" ? "INR" : "USD";
  return new Intl.NumberFormat(location === "india-metro" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SalaryBenchmarkTool() {
  const [role, setRole] = useState<string>("Production Technician");
  const [level, setLevel] = useState<Level>("entry");
  const [industry, setIndustry] = useState<Industry>("manufacturing");
  const [location, setLocation] = useState<Location>("midwest");
  const [experience, setExperience] = useState("0-2");

  const match = useMemo(() => {
    const exact = dataset.find(
      (row) =>
        row.role === role &&
        row.level === level &&
        row.industry === industry &&
        row.location === location,
    );
    if (exact) return exact;

    const sameRole = dataset.find(
      (row) => row.role === role && row.level === level && row.industry === industry,
    );
    if (sameRole) return sameRole;

    return dataset.find((row) => row.role === role && row.level === level) ?? null;
  }, [role, level, industry, location]);

  const adjusted = useMemo(() => {
    if (!match) return null;
    const factor = experienceBoost[experience] ?? 1;
    return {
      p10: match.p10 * factor,
      median: match.median * factor,
      p90: match.p90 * factor,
    };
  }, [match, experience]);

  const percentileWidth = adjusted
    ? ((adjusted.median - adjusted.p10) / (adjusted.p90 - adjusted.p10)) * 100
    : 50;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Compensation explorer
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Salary Benchmarking Tool
          </h3>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-800">
          Illustrative ranges
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="role"
              label="Role / job title"
              value={role}
              onChange={setRole}
              options={roles.map((item) => ({ value: item, label: item }))}
            />
            <SelectField
              id="level"
              label="Level"
              value={level}
              onChange={(value) => setLevel(value as Level)}
              options={levels}
            />
            <SelectField
              id="industry"
              label="Industry / sector"
              value={industry}
              onChange={(value) => setIndustry(value as Industry)}
              options={industries}
            />
            <SelectField
              id="location"
              label="Location"
              value={location}
              onChange={(value) => setLocation(value as Location)}
              options={locations}
            />
            <div className="sm:col-span-2">
              <SelectField
                id="experience"
                label="Experience range (optional)"
                value={experience}
                onChange={setExperience}
                options={[
                  { value: "0-2", label: "0–2 years" },
                  { value: "3-5", label: "3–5 years" },
                  { value: "6-10", label: "6–10 years" },
                  { value: "10+", label: "10+ years" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          {adjusted ? (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-black/5 bg-white p-4">
                  <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                    10th percentile
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] tabular-nums">
                    {formatPay(adjusted.p10, location)}
                  </p>
                </div>
                <div className="rounded-xl border border-black/5 bg-white p-4">
                  <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                    Median
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                    {formatPay(adjusted.median, location)}
                  </p>
                </div>
                <div className="rounded-xl border border-black/5 bg-white p-4">
                  <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                    90th percentile
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] tabular-nums">
                    {formatPay(adjusted.p90, location)}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold tracking-[-0.02em]">Market band</p>
                  <p className="text-[11px] text-neutral-500">10th → 90th</p>
                </div>
                <div className="relative mt-8 h-3 rounded-full bg-neutral-100">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#93c5fd] via-[#2563EB] to-[#1d4ed8]"
                    style={{ width: "100%" }}
                  />
                  <div
                    className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#2563EB] shadow"
                    style={{ left: `calc(${clamp(percentileWidth, 8, 92)}% - 8px)` }}
                    title="Median"
                  />
                </div>
                <div className="mt-3 flex justify-between text-[11px] text-neutral-500">
                  <span>Low offer band</span>
                  <span>Competitive midpoint</span>
                  <span>Premium band</span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-black/5 bg-white p-4">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                  Report preview
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  {role} · {levels.find((item) => item.value === level)?.label} ·{" "}
                  {industries.find((item) => item.value === industry)?.label} ·{" "}
                  {locations.find((item) => item.value === location)?.label}
                </p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Suggested offer range:{" "}
                  <span className="font-medium tabular-nums text-neutral-950">
                    {formatPay(adjusted.p10, location)} – {formatPay(adjusted.p90, location)}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-black/15 bg-white px-4 py-10 text-center text-sm text-neutral-600">
              No benchmark found for this combination. Try another role, level, or industry.
            </div>
          )}

          <p className="mt-4 text-[11px] leading-5 text-neutral-500">
            Figures are illustrative samples for planning conversations. Combine with your pay
            policy and local market checks before finalizing offers.
          </p>
        </div>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

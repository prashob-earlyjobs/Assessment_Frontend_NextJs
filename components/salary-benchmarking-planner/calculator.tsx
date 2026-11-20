"use client";

import { useMemo, useState } from "react";

type Inputs = {
  jobTitle: string;
  industry: string;
  location: string;
  proposedSalary: number;
  positions: number;
  comparisonSalary: number;
  allowances: number;
};

const defaults: Inputs = {
  jobTitle: "Production Trainee",
  industry: "Manufacturing",
  location: "Pune",
  proposedSalary: 18000,
  positions: 20,
  comparisonSalary: 20000,
  allowances: 0,
};

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function formatPlainInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function TextField({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">{label}</span>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
      />
      <span className="mt-1.5 block text-[12px] leading-5 text-neutral-500">{hint}</span>
    </label>
  );
}

function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">{label}</span>
        {suffix ? (
          <span className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
            {suffix}
          </span>
        ) : null}
      </span>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange(Number.isFinite(next) ? clamp(next, min, max) : min);
        }}
        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm tabular-nums text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
      />
      <span className="mt-1.5 block text-[12px] leading-5 text-neutral-500">{hint}</span>
    </label>
  );
}

function ComparisonBars({
  proposedMonthly,
  comparisonMonthly,
}: {
  proposedMonthly: number;
  comparisonMonthly: number;
}) {
  const max = Math.max(proposedMonthly, comparisonMonthly, 1);
  const proposedPct = (proposedMonthly / max) * 100;
  const comparisonPct = (comparisonMonthly / max) * 100;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[12px] font-medium text-neutral-700">Proposed scenario</p>
          <p className="text-[12px] tabular-nums text-neutral-500">{formatInr(proposedMonthly)}</p>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-[#2563EB] transition-[width] duration-500 ease-out"
            style={{ width: `${proposedPct}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[12px] font-medium text-neutral-700">Comparison scenario</p>
          <p className="text-[12px] tabular-nums text-neutral-500">{formatInr(comparisonMonthly)}</p>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-[#EA6A4E] transition-[width] duration-500 ease-out"
            style={{ width: `${comparisonPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function SalaryBenchmarkingCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const proposedMonthly =
      inputs.positions * (inputs.proposedSalary + inputs.allowances);
    const proposedAnnual = proposedMonthly * 12;
    const hasComparison = inputs.comparisonSalary > 0;
    const comparisonMonthly = hasComparison
      ? inputs.positions * (inputs.comparisonSalary + inputs.allowances)
      : null;
    const comparisonAnnual =
      comparisonMonthly !== null ? comparisonMonthly * 12 : null;
    const perEmployeeDiff = hasComparison
      ? inputs.proposedSalary - inputs.comparisonSalary
      : null;
    const monthlyDiff =
      comparisonMonthly !== null ? proposedMonthly - comparisonMonthly : null;
    const annualDiff =
      comparisonAnnual !== null ? proposedAnnual - comparisonAnnual : null;
    const percentDiff =
      hasComparison && inputs.comparisonSalary > 0
        ? ((inputs.proposedSalary - inputs.comparisonSalary) /
            inputs.comparisonSalary) *
          100
        : null;

    return {
      proposedMonthly,
      proposedAnnual,
      hasComparison,
      comparisonMonthly,
      comparisonAnnual,
      perEmployeeDiff,
      monthlyDiff,
      annualDiff,
      percentDiff,
    };
  }, [inputs]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copySummary() {
    const lines = [
      "EarlyJobs Salary Benchmarking & Compensation Planning Summary",
      `Job title: ${inputs.jobTitle || "—"}`,
      `Industry: ${inputs.industry || "—"}`,
      `Location: ${inputs.location || "—"}`,
      `Proposed monthly salary (per employee): ${formatInr(inputs.proposedSalary)}`,
      `Allowances / additional costs (per employee): ${formatInr(inputs.allowances)}`,
      `Positions: ${inputs.positions}`,
      `Estimated monthly budget: ${formatInr(results.proposedMonthly)}`,
      `Estimated annual budget: ${formatInr(results.proposedAnnual)}`,
      results.hasComparison
        ? `Comparison monthly salary (per employee): ${formatInr(inputs.comparisonSalary)}`
        : "Comparison salary: not entered",
      results.percentDiff !== null
        ? `Percentage difference vs comparison: ${results.percentDiff.toFixed(1)}%`
        : null,
      "All figures are user-provided unless verified external benchmark data is integrated.",
    ].filter(Boolean) as string[];

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Compensation planning
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Salary Benchmarking Planner
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setInputs(defaults)}
          className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Reset defaults
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="job-title"
              label="Job title"
              hint="Role being planned for hiring."
              value={inputs.jobTitle}
              onChange={(value) => update("jobTitle", value)}
              placeholder="e.g. Production Trainee"
            />
            <TextField
              id="industry"
              label="Industry"
              hint="Sector context for this compensation plan."
              value={inputs.industry}
              onChange={(value) => update("industry", value)}
              placeholder="e.g. Manufacturing"
            />
            <TextField
              id="location"
              label="Hiring location"
              hint="City, facility or region for this scenario."
              value={inputs.location}
              onChange={(value) => update("location", value)}
              placeholder="e.g. Pune"
            />
            <NumberField
              id="positions"
              label="Number of positions"
              hint="Headcount included in this budget scenario."
              value={inputs.positions}
              onChange={(value) => update("positions", value)}
              min={1}
              max={100000}
            />
            <NumberField
              id="proposed-salary"
              label="Proposed monthly salary"
              hint="Employer-provided base salary per employee."
              value={inputs.proposedSalary}
              onChange={(value) => update("proposedSalary", value)}
              min={0}
              max={10000000}
              step={500}
              suffix="INR / month"
            />
            <NumberField
              id="comparison-salary"
              label="Comparison salary (optional)"
              hint="Second employer-defined salary for percentage difference."
              value={inputs.comparisonSalary}
              onChange={(value) => update("comparisonSalary", value)}
              min={0}
              max={10000000}
              step={500}
              suffix="INR / month"
            />
            <div className="sm:col-span-2">
              <NumberField
                id="allowances"
                label="Allowances / additional costs (optional)"
                hint="Employer-defined monthly allowances or other costs per employee."
                value={inputs.allowances}
                onChange={(value) => update("allowances", value)}
                min={0}
                max={10000000}
                step={100}
                suffix="INR / month"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <p className="rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-[12px] leading-5 text-amber-900">
            User-provided figures. This planner calculates salary scenarios — it does not establish
            whether a salary is above or below the market unless verified external data is added.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Monthly budget
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                {formatInr(results.proposedMonthly)}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Annual budget
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {formatInr(results.proposedAnnual)}
              </p>
            </div>
          </div>

          {results.percentDiff !== null ? (
            <div className="mt-3 rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Difference vs comparison
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.03em] tabular-nums">
                {results.percentDiff > 0 ? "+" : ""}
                {results.percentDiff.toFixed(1)}%
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {formatInr(Math.abs(results.perEmployeeDiff ?? 0))} per employee / month
                {results.monthlyDiff !== null
                  ? ` · ${formatInr(Math.abs(results.monthlyDiff))} monthly for ${inputs.positions} roles`
                  : ""}
                {results.annualDiff !== null
                  ? ` · ${formatInr(Math.abs(results.annualDiff))} annually`
                  : ""}
              </p>
            </div>
          ) : null}

          {results.comparisonMonthly !== null ? (
            <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
              <p className="text-sm font-semibold tracking-[-0.02em]">
                Two-scenario monthly budget
              </p>
              <div className="mt-4">
                <ComparisonBars
                  proposedMonthly={results.proposedMonthly}
                  comparisonMonthly={results.comparisonMonthly}
                />
              </div>
              <p className="mt-4 text-[12px] leading-5 text-neutral-500">
                Proposed ({formatPlainInr(results.proposedMonthly)}) vs comparison (
                {formatPlainInr(results.comparisonMonthly)}) including allowances.
              </p>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copySummary}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              {copied ? "Copied" : "Copy summary"}
            </button>
          </div>

          <p className="mt-4 text-[12px] leading-5 text-neutral-500">
            Illustrative planning calculation. Also consider applicable minimum wages, statutory
            contributions and employment obligations separately.
          </p>
        </div>
      </div>
    </div>
  );
}

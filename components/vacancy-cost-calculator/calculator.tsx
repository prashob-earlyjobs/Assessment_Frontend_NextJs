"use client";

import { useMemo, useState } from "react";

type Inputs = {
  vacantPositions: number;
  vacancyDays: number;
  dailyImpact: number;
  coverageCosts: number;
  roleCategory: string;
  scenarioDays: number;
};

const defaults: Inputs = {
  vacantPositions: 5,
  vacancyDays: 12,
  dailyImpact: 800,
  coverageCosts: 10000,
  roleCategory: "",
  scenarioDays: 30,
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

function Field({
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

export function VacancyCostCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const [copied, setCopied] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(true);

  const results = useMemo(() => {
    const baseImpact =
      inputs.vacantPositions * inputs.vacancyDays * inputs.dailyImpact;
    const totalCost = baseImpact + inputs.coverageCosts;
    const costPerPosition =
      inputs.vacantPositions > 0 ? totalCost / inputs.vacantPositions : null;

    const scenarioImpact =
      inputs.vacantPositions * inputs.scenarioDays * inputs.dailyImpact;
    const scenarioTotal = scenarioImpact + inputs.coverageCosts;
    const durationDelta = Math.abs(inputs.scenarioDays - inputs.vacancyDays);
    const costDelta = Math.abs(scenarioTotal - totalCost);

    return {
      baseImpact,
      totalCost,
      costPerPosition,
      scenarioTotal,
      durationDelta,
      costDelta,
      scenarioHigher: scenarioTotal > totalCost,
    };
  }, [inputs]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copySummary() {
    const lines = [
      "EarlyJobs Vacancy Cost Summary",
      inputs.roleCategory ? `Role category: ${inputs.roleCategory}` : null,
      `Vacant positions: ${inputs.vacantPositions}`,
      `Vacancy days: ${inputs.vacancyDays}`,
      `Daily impact: ${formatInr(inputs.dailyImpact)}`,
      `Additional coverage costs: ${formatInr(inputs.coverageCosts)}`,
      `Estimated vacancy cost: ${formatInr(results.totalCost)}`,
      results.costPerPosition !== null
        ? `Cost per position: ${formatInr(results.costPerPosition)}`
        : "Cost per position: cannot be calculated with zero positions",
      `Scenario (${inputs.scenarioDays} days): ${formatInr(results.scenarioTotal)}`,
      "Formula: Vacancy Days × Daily Impact × Positions + Coverage Costs",
      "Assumption: overtime already in daily impact should not be added again as coverage.",
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
            Vacancy impact model
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Vacancy Cost Calculator
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
          <div className="grid gap-5">
            <Field
              id="vacant-positions"
              label="Number of vacant positions"
              hint="How many open roles you are evaluating together."
              value={inputs.vacantPositions}
              onChange={(value) => update("vacantPositions", value)}
              min={0}
              max={10000}
            />
            <Field
              id="vacancy-days"
              label="Average vacancy duration"
              hint="Expected days each position remains unfilled."
              value={inputs.vacancyDays}
              onChange={(value) => update("vacancyDays", value)}
              min={0}
              max={3650}
              suffix="Days"
            />
            <Field
              id="daily-impact"
              label="Estimated daily impact"
              hint="Organisation-specific financial effect of each vacant position per day."
              value={inputs.dailyImpact}
              onChange={(value) => update("dailyImpact", value)}
              min={0}
              max={10000000}
              step={100}
              suffix="INR"
            />
            <Field
              id="coverage-costs"
              label="Temporary coverage expenses"
              hint="Overtime or temp staffing not already counted in daily impact."
              value={inputs.coverageCosts}
              onChange={(value) => update("coverageCosts", value)}
              min={0}
              max={100000000}
              step={1000}
              suffix="INR"
            />
            <label htmlFor="role-category" className="block">
              <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">
                Role category (optional)
              </span>
              <input
                id="role-category"
                type="text"
                value={inputs.roleCategory}
                onChange={(event) => update("roleCategory", event.target.value)}
                placeholder="e.g. Production · Night shift · Plant A"
                className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
              />
              <span className="mt-1.5 block text-[12px] leading-5 text-neutral-500">
                Classify by department, facility or job function for reporting.
              </span>
            </label>
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-4 sm:col-span-2">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Total estimated vacancy cost
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                {formatInr(results.totalCost)}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Cost per position
              </p>
              {results.costPerPosition !== null ? (
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                  {formatInr(results.costPerPosition)}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Enter at least one vacant position.
                </p>
              )}
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Duration impact only
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {formatInr(results.baseImpact)}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Transparent formula</p>
            <p className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-3 font-mono text-[12px] leading-5 text-neutral-700 sm:text-[13px]">
              Vacancy Cost = Positions × Days × Daily Impact + Coverage Costs
            </p>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {inputs.vacantPositions} × {inputs.vacancyDays} ×{" "}
              {formatPlainInr(inputs.dailyImpact)} + {formatPlainInr(inputs.coverageCosts)} ={" "}
              {formatPlainInr(results.totalCost)}
            </p>
            <p className="mt-3 text-[12px] leading-5 text-neutral-500">
              If overtime is already included in daily impact, do not add it again as coverage.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-[-0.02em]">Scenario comparison</p>
              <button
                type="button"
                onClick={() => setScenarioOpen((open) => !open)}
                className="text-[12px] font-medium text-[#2563EB]"
              >
                {scenarioOpen ? "Hide" : "Show"}
              </button>
            </div>
            {scenarioOpen ? (
              <div className="mt-4 space-y-4">
                <Field
                  id="scenario-days"
                  label="Compare with vacancy duration"
                  hint="Model a faster or slower fill timeline while keeping other inputs fixed."
                  value={inputs.scenarioDays}
                  onChange={(value) => update("scenarioDays", value)}
                  min={0}
                  max={3650}
                  suffix="Days"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-[#f8fafc] px-3 py-3">
                    <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                      Scenario total
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums">
                      {formatInr(results.scenarioTotal)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#f8fafc] px-3 py-3">
                    <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                      Difference
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums">
                      {formatInr(results.costDelta)}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] leading-5 text-neutral-500">
                  {results.durationDelta} day difference illustrates the potential value of reducing
                  vacancy duration
                  {results.scenarioHigher ? " versus the longer scenario" : ""}. It does not prove a
                  provider can achieve the faster timeline.
                </p>
              </div>
            ) : null}
          </div>

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
            Illustrative estimate for planning — not an industry benchmark or a guaranteed loss.
            Actual costs depend on how the organisation operates.
          </p>
        </div>
      </div>
    </div>
  );
}

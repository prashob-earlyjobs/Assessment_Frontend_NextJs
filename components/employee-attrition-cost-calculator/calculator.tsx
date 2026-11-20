"use client";

import { useMemo, useState } from "react";

type Inputs = {
  departures: number;
  recruitmentCost: number;
  trainingCost: number;
  vacancyDays: number;
  dailyVacancyCost: number;
  otherDirect: number;
};

const defaults: Inputs = {
  departures: 20,
  recruitmentCost: 4000,
  trainingCost: 3000,
  vacancyDays: 10,
  dailyVacancyCost: 200,
  otherDirect: 0,
};

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
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

export function EmployeeAttritionCostCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const vacancyPerDeparture = inputs.vacancyDays * inputs.dailyVacancyCost;
    const recruitmentTotal = inputs.departures * inputs.recruitmentCost;
    const trainingTotal = inputs.departures * inputs.trainingCost;
    const vacancyTotal = inputs.departures * vacancyPerDeparture;
    const otherTotal = inputs.departures * inputs.otherDirect;
    const costPerDeparture =
      inputs.recruitmentCost + inputs.trainingCost + vacancyPerDeparture + inputs.otherDirect;
    const totalCost = inputs.departures * costPerDeparture;
    const components = [
      { key: "Recruitment", value: recruitmentTotal },
      { key: "Training", value: trainingTotal },
      { key: "Vacancy", value: vacancyTotal },
      { key: "Other direct", value: otherTotal },
    ] as const;
    const maxComponent = Math.max(...components.map((c) => c.value), 1);
    return {
      vacancyPerDeparture,
      costPerDeparture,
      totalCost,
      components,
      maxComponent,
      hasDepartures: inputs.departures > 0,
    };
  }, [inputs]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copySummary() {
    const lines = [
      "EarlyJobs Employee Attrition Cost Summary",
      `Departures: ${inputs.departures}`,
      `Recruitment cost per replacement: ${formatInr(inputs.recruitmentCost)}`,
      `Training cost per replacement: ${formatInr(inputs.trainingCost)}`,
      `Vacancy days: ${inputs.vacancyDays}`,
      `Daily vacancy cost: ${formatInr(inputs.dailyVacancyCost)}`,
      `Vacancy cost per departure: ${formatInr(results.vacancyPerDeparture)}`,
      `Other direct cost per departure: ${formatInr(inputs.otherDirect)}`,
      `Cost per departure: ${formatInr(results.costPerDeparture)}`,
      `Total estimated attrition cost: ${formatInr(results.totalCost)}`,
      "Formula: (Recruitment + Training + Vacancy + Other) × Departures",
      "Planning estimate only — not a guaranteed financial loss.",
    ];
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
            Attrition cost model
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Employee Attrition Cost Calculator
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
            <Field
              id="departures"
              label="Employee departures"
              hint="Number of employees who left during the selected period."
              value={inputs.departures}
              onChange={(value) => update("departures", value)}
              min={0}
              max={100000}
            />
            <Field
              id="recruitment-cost"
              label="Replacement recruitment cost"
              hint="Advertising, agency fees, recruiter time and assessments per replacement."
              value={inputs.recruitmentCost}
              onChange={(value) => update("recruitmentCost", value)}
              min={0}
              max={100000000}
              step={100}
              suffix="INR / hire"
            />
            <Field
              id="training-cost"
              label="Training cost"
              hint="Induction, job training and onboarding expenses per replacement."
              value={inputs.trainingCost}
              onChange={(value) => update("trainingCost", value)}
              min={0}
              max={100000000}
              step={100}
              suffix="INR / hire"
            />
            <Field
              id="vacancy-days"
              label="Average vacancy duration"
              hint="Average number of days positions remained unfilled."
              value={inputs.vacancyDays}
              onChange={(value) => update("vacancyDays", value)}
              min={0}
              max={3650}
              suffix="Days"
            />
            <Field
              id="daily-vacancy-cost"
              label="Daily vacancy cost"
              hint="Organisation-specific estimate of the daily impact of an unfilled role."
              value={inputs.dailyVacancyCost}
              onChange={(value) => update("dailyVacancyCost", value)}
              min={0}
              max={100000000}
              step={50}
              suffix="INR / day"
            />
            <Field
              id="other-direct"
              label="Other direct replacement expenses"
              hint="Additional direct costs per departure not already counted above."
              value={inputs.otherDirect}
              onChange={(value) => update("otherDirect", value)}
              min={0}
              max={100000000}
              step={100}
              suffix="INR / hire"
            />
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Cost per departure
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                {formatInr(results.costPerDeparture)}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Total estimated cost
              </p>
              {results.hasDepartures ? (
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                  {formatInr(results.totalCost)}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Enter at least one departure to estimate total period cost.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Expense breakdown</p>
            <ul className="mt-4 space-y-3" aria-label="Attrition cost component breakdown">
              {results.components.map((item) => {
                const width = Math.round((item.value / results.maxComponent) * 100);
                return (
                  <li key={item.key}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-neutral-800">{item.key}</span>
                      <span className="tabular-nums text-neutral-600">{formatInr(item.value)}</span>
                    </div>
                    <div
                      className="mt-1.5 h-2 overflow-hidden rounded-full bg-neutral-100"
                      role="img"
                      aria-label={`${item.key}: ${formatInr(item.value)}, ${width}% of largest component`}
                    >
                      <div
                        className="h-full rounded-full bg-[#2563EB]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Transparent formula</p>
            <p className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-3 font-mono text-[12px] leading-5 text-neutral-700 sm:text-[13px]">
              Total = (Recruitment + Training + Vacancy days × Daily cost + Other) × Departures
            </p>
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
            Planning estimate based on your inputs — not a guaranteed financial loss. Avoid
            double-counting costs already included in another category.
          </p>
        </div>
      </div>
    </div>
  );
}

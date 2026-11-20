"use client";

import { useMemo, useState } from "react";

type Inputs = {
  openPositions: number;
  avgDaysToFill: number;
  costPerUnfilledDay: number;
  costPerHire: number;
  improvementPercent: number;
  annualInvestment: number;
};

const defaults: Inputs = {
  openPositions: 100,
  avgDaysToFill: 45,
  costPerUnfilledDay: 500,
  costPerHire: 4500,
  improvementPercent: 20,
  annualInvestment: 36000,
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(value)),
  );
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

export function RoiCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);

  const results = useMemo(() => {
    const improvement = inputs.improvementPercent / 100;
    const daysSaved = inputs.openPositions * inputs.avgDaysToFill * improvement;
    const vacancySavings = daysSaved * inputs.costPerUnfilledDay;
    const recruitingSavings = inputs.openPositions * inputs.costPerHire * improvement * 0.35;
    const totalSavings = vacancySavings + recruitingSavings;
    const netGain = totalSavings - inputs.annualInvestment;
    const roiPercent =
      inputs.annualInvestment > 0 ? (netGain / inputs.annualInvestment) * 100 : 0;
    const paybackMonths =
      totalSavings > 0 ? (inputs.annualInvestment / totalSavings) * 12 : 0;

    return {
      daysSaved,
      vacancySavings,
      recruitingSavings,
      totalSavings,
      netGain,
      roiPercent,
      paybackMonths,
    };
  }, [inputs]);

  const maxBar = Math.max(results.vacancySavings, results.recruitingSavings, 1);
  const vacancyHeight = (results.vacancySavings / maxBar) * 100;
  const recruitingHeight = (results.recruitingSavings / maxBar) * 100;

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Hiring investment model
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Recruiting ROI Calculator
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
              id="open-positions"
              label="Open positions per year"
              hint="Annual hiring volume drives total impact."
              value={inputs.openPositions}
              onChange={(value) => update("openPositions", value)}
              min={1}
              max={10000}
            />
            <Field
              id="avg-days"
              label="Average days to fill"
              hint="Current time-to-fill across roles."
              value={inputs.avgDaysToFill}
              onChange={(value) => update("avgDaysToFill", value)}
              min={1}
              max={365}
              suffix="days"
            />
            <Field
              id="cost-unfilled"
              label="Cost of unfilled role / day"
              hint="Lost productivity or revenue per vacant day."
              value={inputs.costPerUnfilledDay}
              onChange={(value) => update("costPerUnfilledDay", value)}
              min={0}
              max={50000}
              step={50}
              suffix="USD"
            />
            <Field
              id="cost-per-hire"
              label="Current cost per hire"
              hint="Ads, agency fees, recruiter time combined."
              value={inputs.costPerHire}
              onChange={(value) => update("costPerHire", value)}
              min={0}
              max={100000}
              step={100}
              suffix="USD"
            />
            <Field
              id="improvement"
              label="Estimated improvement"
              hint="Use 20–30% unless you have pilot data."
              value={inputs.improvementPercent}
              onChange={(value) => update("improvementPercent", value)}
              min={1}
              max={80}
              suffix="%"
            />
            <Field
              id="investment"
              label="Annual solution investment"
              hint="Subscription or program cost to compare against."
              value={inputs.annualInvestment}
              onChange={(value) => update("annualInvestment", value)}
              min={0}
              max={5000000}
              step={1000}
              suffix="USD"
            />
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Days saved
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {formatNumber(results.daysSaved)}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Cost savings
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                {formatCurrency(results.totalSavings)}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                ROI
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {formatNumber(results.roiPercent)}%
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-[-0.02em]">Savings breakdown</p>
              <p className="text-[11px] text-neutral-500">
                Payback ~{results.paybackMonths > 0 ? results.paybackMonths.toFixed(1) : "—"} mo
              </p>
            </div>
            <div className="mt-6 flex h-40 items-end justify-center gap-10 sm:gap-14">
              <div className="flex w-16 flex-col items-center gap-2 sm:w-20">
                <span className="text-[11px] font-medium tabular-nums text-neutral-600">
                  {formatCurrency(results.vacancySavings)}
                </span>
                <div className="flex h-28 w-full items-end rounded-t-lg bg-neutral-100">
                  <div
                    className="w-full rounded-t-lg bg-[#2563EB] transition-[height] duration-500 ease-out"
                    style={{ height: `${Math.max(8, vacancyHeight)}%` }}
                  />
                </div>
                <span className="text-center text-[11px] leading-4 text-neutral-500">
                  Vacancy cost
                </span>
              </div>
              <div className="flex w-16 flex-col items-center gap-2 sm:w-20">
                <span className="text-[11px] font-medium tabular-nums text-neutral-600">
                  {formatCurrency(results.recruitingSavings)}
                </span>
                <div className="flex h-28 w-full items-end rounded-t-lg bg-neutral-100">
                  <div
                    className="w-full rounded-t-lg bg-brand transition-[height] duration-500 ease-out"
                    style={{ height: `${Math.max(8, recruitingHeight)}%` }}
                  />
                </div>
                <span className="text-center text-[11px] leading-4 text-neutral-500">
                  Recruiting efficiency
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-neutral-950 px-4 py-4 text-sm leading-6 text-white/80">
            <span className="font-medium text-white">Narrative for leadership: </span>
            By improving hiring {inputs.improvementPercent}%, you could save{" "}
            <span className="tabular-nums text-white">
              {formatCurrency(results.totalSavings)}
            </span>{" "}
            annually — a{" "}
            <span className="tabular-nums text-[#93c5fd]">
              {formatNumber(results.roiPercent)}% ROI
            </span>{" "}
            on a {formatCurrency(inputs.annualInvestment)} investment.
          </div>
        </div>
      </div>
    </div>
  );
}

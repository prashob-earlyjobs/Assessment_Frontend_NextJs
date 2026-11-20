"use client";

import { useMemo, useState } from "react";

type Inputs = {
  internalCosts: number;
  externalCosts: number;
  completedHires: number;
};

const defaults: Inputs = {
  internalCosts: 150000,
  externalCosts: 150000,
  completedHires: 30,
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

export function CostPerHireCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const totalCosts = inputs.internalCosts + inputs.externalCosts;
    const hasHires = inputs.completedHires > 0;
    const costPerHire = hasHires ? totalCosts / inputs.completedHires : null;
    return { totalCosts, hasHires, costPerHire };
  }, [inputs]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copySummary() {
    const lines = [
      "EarlyJobs Cost-per-Hire Summary",
      `Internal costs: ${formatInr(inputs.internalCosts)}`,
      `External costs: ${formatInr(inputs.externalCosts)}`,
      `Total recruitment costs: ${formatInr(results.totalCosts)}`,
      `Completed hires: ${inputs.completedHires}`,
      results.costPerHire !== null
        ? `Cost per hire: ${formatInr(results.costPerHire)}`
        : "Cost per hire: cannot be calculated with zero hires",
      "Formula: (Internal + External) ÷ Number of Hires",
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
            Recruitment cost model
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Cost-per-Hire Calculator
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
              id="internal-costs"
              label="Internal recruiting costs"
              hint="Recruiter time, interview effort, admin and software allocated to hiring."
              value={inputs.internalCosts}
              onChange={(value) => update("internalCosts", value)}
              min={0}
              max={100000000}
              step={1000}
              suffix="INR"
            />
            <Field
              id="external-costs"
              label="External recruiting costs"
              hint="Job ads, agency fees, assessments, travel reimbursements and third-party spend."
              value={inputs.externalCosts}
              onChange={(value) => update("externalCosts", value)}
              min={0}
              max={100000000}
              step={1000}
              suffix="INR"
            />
            <Field
              id="completed-hires"
              label="Completed hires"
              hint="Number of hires completed in the same period as the costs above."
              value={inputs.completedHires}
              onChange={(value) => update("completedHires", value)}
              min={0}
              max={100000}
            />
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Total costs
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {formatInr(results.totalCosts)}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Cost per hire
              </p>
              {results.costPerHire !== null ? (
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                  {formatInr(results.costPerHire)}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Cannot calculate with zero hires. Enter at least one completed hire.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Transparent formula</p>
            <p className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-3 font-mono text-[12px] leading-5 text-neutral-700 sm:text-[13px]">
              Cost per Hire = (Internal + External) ÷ Number of Hires
            </p>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              ({formatPlainInr(inputs.internalCosts)} + {formatPlainInr(inputs.externalCosts)}) ÷{" "}
              {inputs.completedHires}
              {results.costPerHire !== null
                ? ` = ${formatPlainInr(results.costPerHire)}`
                : " — undefined when hires = 0"}
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
            Illustrative calculation for planning — not an industry benchmark. Keep cost definitions
            consistent when comparing periods or channels.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

type Inputs = {
  applications: number;
  shortlisted: number;
  interviewed: number;
  offered: number;
  joined: number;
};

const defaults: Inputs = {
  applications: 1000,
  shortlisted: 400,
  interviewed: 250,
  offered: 100,
  joined: 70,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function pct(numerator: number, denominator: number) {
  if (denominator <= 0) return null;
  return (numerator / denominator) * 100;
}

function formatPct(value: number | null) {
  if (value === null) return "—";
  return `${value.toFixed(value >= 10 || value === 0 ? 0 : 1)}%`;
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">{label}</span>
      <input
        id={id}
        type="number"
        min={0}
        max={10000000}
        step={1}
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange(Number.isFinite(next) ? clamp(next, 0, 10000000) : 0);
        }}
        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm tabular-nums text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
      />
      <span className="mt-1.5 block text-[12px] leading-5 text-neutral-500">{hint}</span>
    </label>
  );
}

export function RecruitmentFunnelCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const stages = [
      { key: "Applications", value: inputs.applications },
      { key: "Shortlisted", value: inputs.shortlisted },
      { key: "Interviewed", value: inputs.interviewed },
      { key: "Offered", value: inputs.offered },
      { key: "Joined", value: inputs.joined },
    ] as const;

    const conversions = [
      {
        label: "Application → shortlist",
        rate: pct(inputs.shortlisted, inputs.applications),
        drop: Math.max(0, inputs.applications - inputs.shortlisted),
      },
      {
        label: "Shortlist → interview",
        rate: pct(inputs.interviewed, inputs.shortlisted),
        drop: Math.max(0, inputs.shortlisted - inputs.interviewed),
      },
      {
        label: "Interview → offer",
        rate: pct(inputs.offered, inputs.interviewed),
        drop: Math.max(0, inputs.interviewed - inputs.offered),
      },
      {
        label: "Offer → joining",
        rate: pct(inputs.joined, inputs.offered),
        drop: Math.max(0, inputs.offered - inputs.joined),
      },
    ] as const;

    const overall = pct(inputs.joined, inputs.applications);

    const inconsistencies: string[] = [];
    for (let i = 1; i < stages.length; i += 1) {
      if (stages[i].value > stages[i - 1].value) {
        inconsistencies.push(
          `${stages[i].key} (${stages[i].value}) exceeds ${stages[i - 1].key} (${stages[i - 1].value}).`,
        );
      }
    }

    const maxCount = Math.max(...stages.map((s) => s.value), 1);

    return { stages, conversions, overall, inconsistencies, maxCount };
  }, [inputs]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copySummary() {
    const lines = [
      "EarlyJobs Recruitment Funnel Summary",
      `Applications: ${inputs.applications}`,
      `Shortlisted: ${inputs.shortlisted}`,
      `Interviewed: ${inputs.interviewed}`,
      `Offered: ${inputs.offered}`,
      `Joined: ${inputs.joined}`,
      ...results.conversions.map(
        (c) => `${c.label}: ${formatPct(c.rate)} (drop-off ${c.drop})`,
      ),
      `Overall application → joining: ${formatPct(results.overall)}`,
      results.inconsistencies.length
        ? `Warnings: ${results.inconsistencies.join(" ")}`
        : "Warnings: none for a simple single-cohort funnel",
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
            Hiring funnel model
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Recruitment Funnel Calculator
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

      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="grid gap-5">
            <Field
              id="applications"
              label="Applications"
              hint="Candidates who applied for the role or campaign."
              value={inputs.applications}
              onChange={(value) => update("applications", value)}
            />
            <Field
              id="shortlisted"
              label="Shortlisted"
              hint="Candidates who met initial selection criteria."
              value={inputs.shortlisted}
              onChange={(value) => update("shortlisted", value)}
            />
            <Field
              id="interviewed"
              label="Interviewed"
              hint="Candidates who completed interviews — not just invitations."
              value={inputs.interviewed}
              onChange={(value) => update("interviewed", value)}
            />
            <Field
              id="offered"
              label="Offered"
              hint="Candidates who received a job offer."
              value={inputs.offered}
              onChange={(value) => update("offered", value)}
            />
            <Field
              id="joined"
              label="Joined"
              hint="Candidates who accepted and joined."
              value={inputs.joined}
              onChange={(value) => update("joined", value)}
            />
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <div className="rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                  Overall conversion
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                  {formatPct(results.overall)}
                </p>
                <p className="mt-1 text-sm text-neutral-600">Application → joining</p>
              </div>
              <p className="text-sm tabular-nums text-neutral-600">
                {inputs.joined} of {inputs.applications} joined
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Five-stage funnel</p>
            <ol className="mt-5 space-y-3" aria-label="Recruitment funnel stages">
              {results.stages.map((stage, index) => {
                const width = Math.max(12, Math.round((stage.value / results.maxCount) * 100));
                const next = results.stages[index + 1];
                const stageRate = next ? pct(next.value, stage.value) : null;
                return (
                  <li key={stage.key}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-neutral-800">
                        {index + 1}. {stage.key}
                      </span>
                      <span className="tabular-nums text-neutral-600">
                        {stage.value.toLocaleString("en-IN")}
                        {stageRate !== null ? ` · next ${formatPct(stageRate)}` : ""}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 h-3 overflow-hidden rounded-full bg-neutral-100"
                      role="img"
                      aria-label={`${stage.key}: ${stage.value.toLocaleString("en-IN")} candidates, bar width ${width}% of largest stage`}
                    >
                      <div
                        className="flex h-full items-center justify-end rounded-full bg-[#2563EB] px-2"
                        style={{ width: `${width}%` }}
                      >
                        <span className="text-[10px] font-semibold text-white tabular-nums">
                          {stage.value.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Stage conversions & drop-offs</p>
            <ul className="mt-4 divide-y divide-black/5">
              {results.conversions.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-wrap items-baseline justify-between gap-2 py-2.5 text-sm"
                >
                  <span className="font-medium text-neutral-800">{item.label}</span>
                  <span className="tabular-nums text-neutral-600">
                    {formatPct(item.rate)}
                    <span className="text-neutral-400"> · </span>
                    drop-off {item.drop.toLocaleString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {results.inconsistencies.length > 0 ? (
            <div
              role="status"
              className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950"
            >
              <p className="font-semibold">Inconsistent funnel counts</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {results.inconsistencies.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
              <p className="mt-2 text-[12px] leading-5 text-amber-900/80">
                For a simple single-cohort funnel, later stages should not exceed earlier stages.
                Complex processes may allow stage skipping or multi-channel entry.
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
            Conversion metrics identify where to investigate. They do not establish the cause of a
            drop-off on their own.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What inputs does the ROI calculator need?",
    a: "Enter annual open positions, average days to fill, estimated daily cost of an unfilled role, current cost per hire, expected improvement percentage from your initiative, and annual program investment. HR and finance teams in India usually pull time-to-fill and headcount from ATS or payroll reports, and vacancy cost from operations estimates.",
  },
  {
    q: "Can the calculator include quality-of-hire?",
    a: "This model focuses on time and direct recruiting cost, not performance ratings or ramp productivity. Those need separate assumptions. Faster, clearer hiring often supports quality indirectly because strong candidates stay engaged, but treat quality gains as a qualitative benefit unless you have your own data to model them.",
  },
  {
    q: "How accurate is the ROI estimate?",
    a: "Results are directional estimates from your inputs — best for comparing scenarios (automation vs. agency spend, pilot vs. baseline) rather than forecasting to the rupee. Update assumptions when hiring volume, salaries, or vacancy cost changes so leadership sees a current business case.",
  },
  {
    q: "Is the Recruiting ROI Calculator free?",
    a: "Yes. The EarlyJobs Recruiting ROI Calculator is free to use in your browser with no signup. You can adjust inputs instantly, share the methodology with finance, and combine the output with other free EarlyJobs tools such as cost-per-hire or vacancy-cost calculators.",
  },
] as const;

export function RoiFaq() {
  const [open, setOpen] = useState(0);

  return (
    <ul className="divide-y divide-black/10 border-y border-black/10">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <li key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium tracking-[-0.02em] text-neutral-950"
            >
              {item.q}
              <span aria-hidden className="text-brand">
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="max-w-2xl pb-5 text-sm leading-6 text-neutral-600">{item.a}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
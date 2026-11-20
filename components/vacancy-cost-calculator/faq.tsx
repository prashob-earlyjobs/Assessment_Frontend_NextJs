"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the cost of an unfilled position?",
    a: "Cost of vacancy estimates the financial impact of leaving a role open — daily lost output or service capacity, overtime, temporary staff, and delayed projects. The EarlyJobs calculator multiplies vacancy days by your daily impact estimate and adds coverage costs you enter.",
  },
  {
    q: "Is vacancy cost the same as cost per hire?",
    a: "No. Vacancy cost is about money lost while the seat is empty; cost per hire measures recruitment spending to fill it. Leaders need both: high vacancy cost justifies faster hiring spend, while cost per hire shows whether sourcing is efficient.",
  },
  {
    q: "Can the calculator be used for manufacturing?",
    a: "Yes. Plant and operations teams can model unfilled operator, maintenance, or QC roles using line-specific daily impact and shift overtime. Use conservative assumptions you can explain to plant heads rather than industry averages you cannot verify.",
  },
  {
    q: "Does the calculator predict exact losses?",
    a: "No. It produces estimates from your inputs for planning and prioritisation, not statutory reporting. Revisit assumptions when production targets, customer SLAs, or staffing models change.",
  },
  {
    q: "Is the Vacancy Cost Calculator free?",
    a: "Yes. This vacancy cost tool is free on EarlyJobs. Pair it with the Recruiting ROI or recruitment funnel calculators when building a case to shorten time-to-fill for critical roles.",
  },
] as const;

export function VacancyCostFaq() {
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
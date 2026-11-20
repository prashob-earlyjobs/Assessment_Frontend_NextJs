"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What data does the Salary Benchmarking Tool use?",
    a: "The tool shows illustrative pay ranges for selected roles, industries, and locations to support offer planning. Figures are reference samples for discussion — not a live feed of every employer in India. Validate final offers against your budget, internal grades, and any compensation surveys you already trust.",
  },
  {
    q: "Can I use this for entry-level roles?",
    a: "Yes. Choose entry, mid, or senior levels for roles such as production technicians, junior nurses, or battery assembly staff. Use the output as a starting band for job posts and approvals, then adjust for your city, shift premiums, and statutory benefits.",
  },
  {
    q: "How should I interpret the percentile ranges?",
    a: "Lower and upper bands help you see spread around the median — useful when candidates negotiate or when you compare plants in different states. They are modelling aids, not guarantees of what every competitor pays. Combine them with your attrition and time-to-fill data.",
  },
  {
    q: "Is the Salary Benchmarking Tool free?",
    a: "Yes. EarlyJobs provides this salary benchmarking tool free in the browser with no signup. Use it alongside the Salary Benchmarking Planner or Recruiting ROI Calculator when building hiring budgets for manufacturing, healthcare, or EV teams.",
  },
] as const;

export function SalaryFaq() {
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
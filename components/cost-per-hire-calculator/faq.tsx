"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do you calculate cost per hire?",
    a: "Add internal recruitment costs (recruiter time, tools, interview hours) and external costs (ads, agencies, assessments) for a defined period, then divide by the number of hires completed in that same period. The EarlyJobs calculator applies this standard formula using amounts you enter in INR.",
  },
  {
    q: "Should recruiter salaries be included?",
    a: "Include the portion of recruiter or HR compensation attributable to hiring activity if your finance team tracks it that way. Some organisations allocate by headcount or percentage of role — pick one method and use it consistently when comparing quarters or plants.",
  },
  {
    q: "Does cost per hire include employee salaries?",
    a: "No. Cost per hire covers spending to fill a role, not the employee's post-joining wages, statutory contributions, or bonuses. Keep recruitment spend separate so you can compare channels and agencies without mixing payroll.",
  },
  {
    q: "What if there are zero hires?",
    a: "You cannot calculate a meaningful average cost per hire when no one joined in the period — the tool avoids dividing by zero and prompts you to adjust dates or hire counts. Recruitment spend still matters for reporting; pair it with funnel metrics instead.",
  },
  {
    q: "Is the Cost Per Hire Calculator free?",
    a: "Yes. This EarlyJobs calculator is free to use online. Enter your recruitment expenses and hire count to see average cost per hire instantly — helpful for budget reviews with finance and leadership.",
  },
] as const;

export function CostPerHireFaq() {
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
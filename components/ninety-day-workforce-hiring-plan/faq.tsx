"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a 90-day recruitment plan?",
    a: "It is a three-month framework that ties approved headcount to sourcing, interview milestones and joining targets. The EarlyJobs template helps Indian HR teams phase work instead of treating hiring as a continuous emergency.",
  },
  {
    q: "Who should prepare the plan?",
    a: "HR usually owns the document, with input from department heads, finance and hiring managers. Plant or branch leaders add location-specific volumes and shift coverage before week one.",
  },
  {
    q: "Can it support bulk recruitment?",
    a: "Yes. Map multiple vacancies and sites across the same 90-day calendar, with owners per phase. Pair the plan with the Bulk Hiring Checklist when volumes spike in a single month.",
  },
  {
    q: "Does the plan guarantee hiring targets?",
    a: "No. It is a planning tool only. Outcomes depend on candidate supply, employer selection speed, compensation decisions and operational readiness—not on the template itself.",
  },
] as const;

export function NinetyDayHiringPlanFaq() {
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
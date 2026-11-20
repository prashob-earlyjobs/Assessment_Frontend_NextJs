"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is salary benchmarking?",
    a: "Salary benchmarking compares compensation for similar roles using consistent assumptions — base pay, location, level, and headcount. The EarlyJobs Salary Benchmarking Planner helps Indian employers model hiring budgets across teams before approvals, without relying on unverified market claims.",
  },
  {
    q: "Does the tool provide live market salary data?",
    a: "This planner uses salary scenarios and figures you enter, not a live national wage database. Pair it with the Salary Benchmarking Tool for reference ranges, then plug verified numbers from your own surveys or finance here for budget planning.",
  },
  {
    q: "Can employers compare salary budgets across locations?",
    a: "Yes. Enter separate pay assumptions for metros, tier-2 cities, or multiple plants. The planner rolls up totals so workforce planning and TA leaders see how location mix affects annual hiring spend.",
  },
  {
    q: "Is the Salary Benchmarking Planner free?",
    a: "Yes. EarlyJobs offers the Salary Benchmarking Planner free online. Use it with the free Salary Benchmarking Tool when preparing compensation bands for manufacturing, healthcare, or high-volume hiring programs.",
  },
] as const;

export function SalaryBenchmarkingFaq() {
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
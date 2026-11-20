"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is an agency cheaper than in-house recruitment?",
    a: "Neither model is cheaper by default. In-house teams carry payroll, tools and management overhead; agencies often charge placement fees or project fees tied to scope. Compare your hiring mix, volume and internal capacity—not headline rates alone.",
  },
  {
    q: "Can companies use both recruitment models?",
    a: "Yes. Many Indian employers keep core roles in-house and use agencies for spikes, niche skills or new locations. A hybrid model works when responsibilities, SLAs and commercial terms are documented before sourcing begins.",
  },
  {
    q: "Who makes the final hiring decision?",
    a: "The employer ordinarily retains final selection authority unless a different lawful arrangement is explicitly agreed. Agencies may shortlist and coordinate, but culture fit, compensation approval and offer release typically stay internal.",
  },
  {
    q: "When should a company consider an agency?",
    a: "Consider an agency when internal TA lacks bandwidth, specialist networks or geographic reach for a hiring burst. Agencies add sourcing capacity and flexibility, scoped by agreed services and fees—not guaranteed headcount outcomes.",
  },
] as const;

export function RecruitmentAgencyVsInHouseFaq() {
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
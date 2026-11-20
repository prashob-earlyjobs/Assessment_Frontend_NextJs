"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help with entry-level pharmaceutical manufacturing recruitment?",
    a: "EarlyJobs helps pharmaceutical manufacturers assess entry-level recruitment for production trainees, packaging associates, junior QC support and warehouse staff. Share plant locations, GMP-related role expectations and joining timelines so sourcing can align with regulated shop-floor needs.",
  },
  {
    q: "Can pharmaceutical companies hire diploma and science graduates?",
    a: "Yes. Diploma and science graduates are often considered for entry-level pharma plant roles, provided they meet the employer's qualification criteria, shift availability and training requirements for the specific production or packaging department.",
  },
  {
    q: "Does EarlyJobs verify pharmaceutical compliance certifications?",
    a: "EarlyJobs does not replace employer-led compliance. Pharmaceutical companies remain responsible for GMP training, credential verification, regulatory documentation and final hiring decisions unless a separate verification service is separately agreed.",
  },
  {
    q: "Can manufacturers discuss bulk hiring requirements?",
    a: "Yes. Manufacturers can discuss bulk hiring across production, packaging and support functions. Sharing vacancy counts, shift patterns, plant locations and target joining dates helps plan a structured recruitment drive.",
  },
] as const;

export function PharmaFaq() {
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
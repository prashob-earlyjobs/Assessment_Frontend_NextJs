"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help recruit medical device production workers?",
    a: "EarlyJobs helps device manufacturers assess precision assembly, packaging, labelling and quality-documentation hiring. Share clean-area requirements, batch traceability expectations and shift plans before sourcing begins.",
  },
  {
    q: "Can freshers apply for medical device manufacturing roles?",
    a: "Some assembly and packaging trainee roles may consider freshers when employers provide documented work instructions and in-process checks. Roles touching sterilization or validated equipment need employer-defined technical gates.",
  },
  {
    q: "Can manufacturers discuss bulk hiring?",
    a: "Yes. Manufacturers can share SKU ramp schedules, UDI labelling needs and joining targets across consumables or equipment lines. Clear station mapping separates high-volume packaging from specialized assembly.",
  },
  {
    q: "Who verifies regulated manufacturing qualifications?",
    a: "Employers remain responsible for technical assessments, quality record training and regulatory documentation discipline. EarlyJobs coordinates hiring discussions—not final compliance verification for regulated device roles.",
  },
] as const;

export function MedicalDeviceFaq() {
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
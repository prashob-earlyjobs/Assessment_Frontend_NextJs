"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support semiconductor recruitment?",
    a: "Employers can discuss suitable entry-level, junior technical and operational support requirements for assessment.",
  },
  {
    q: "Are fresh engineering graduates eligible?",
    a: "Eligibility depends on the specific role and the employer's technical requirements.",
  },
  {
    q: "Can companies discuss new facility hiring?",
    a: "Yes. Employers can share phased headcount requirements and expected timelines.",
  },
  {
    q: "Who verifies cleanroom and technical qualifications?",
    a: "Employers remain responsible for mandatory assessments, training and authorizations.",
  },
] as const;

export function SemiconductorFaq() {
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

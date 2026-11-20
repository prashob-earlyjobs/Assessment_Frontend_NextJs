"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support construction workforce recruitment?",
    a: "EarlyJobs helps EPC and infrastructure employers assess site assistants, trades, equipment support and project admin hiring. Share project belts, mobilisation dates and accommodation context so candidates understand on-site conditions.",
  },
  {
    q: "Can companies request hiring across project sites?",
    a: "Yes. Multi-site employers can provide location-wise vacancies, trade mixes and peak manpower windows. Separating civil, MEP and finishing trades avoids mismatched applicant pools.",
  },
  {
    q: "What information is needed for project hiring?",
    a: "Vacancy numbers, site GPS or district, trade certifications required, compensation, work rotation and reporting dates help scope recruitment. Employers remain accountable for site safety briefing and statutory compliance.",
  },
  {
    q: "Who handles construction safety compliance?",
    a: "Employers must deliver site induction, PPE allocation and trade-specific safety authorization. EarlyJobs does not replace contractor obligations under applicable construction safety regulations.",
  },
] as const;

export function ConstructionFaq() {
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
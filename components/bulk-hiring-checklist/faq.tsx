"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is bulk hiring?",
    a: "Bulk hiring means filling many related vacancies in a defined window—often across shifts, plants or branches. It needs more coordination than single-role recruitment because approvals, interviews and joining move in parallel.",
  },
  {
    q: "What should a bulk hiring plan include?",
    a: "Cover approved vacancies, eligibility, sourcing channels, interview logistics, selection owners, budget and joining dates. The EarlyJobs checklist walks Indian employers through those steps in six phases before launch.",
  },
  {
    q: "Can the checklist be used for factory recruitment?",
    a: "Yes. Adapt phases for production, packaging, warehouse or maintenance drives. Note shift coverage and plant-specific safety induction so interview panels and joining teams know floor expectations.",
  },
  {
    q: "Is a bulk hiring checklist the same as a recruitment tracker?",
    a: "No. The checklist plans what must happen; a tracker records individual candidate status. Use both—plan with the checklist, then monitor applications to joinings in your ATS or spreadsheet.",
  },
] as const;

export function BulkHiringChecklistFaq() {
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
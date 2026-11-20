"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the purpose of a manpower requisition form?",
    a: "It documents an approved hiring need—headcount, budget and justification—before recruiters source candidates. The EarlyJobs template keeps department, HR and finance aligned on one record for India-based plant and corporate hiring.",
  },
  {
    q: "Who prepares a manpower requisition?",
    a: "Typically the hiring manager or department head drafts the request, while HR standardises fields and finance confirms budget. Approvers sign off before the requisition reaches talent acquisition or an external partner.",
  },
  {
    q: "Can this template be used for factory hiring?",
    a: "Yes. Add shift patterns, plant location and safety notes for production, warehouse or maintenance roles. The same structure works across Indian manufacturing clusters when internal policy fields are appended.",
  },
  {
    q: "Is a manpower requisition the same as a job description?",
    a: "No. A requisition requests approval to hire and records budget; a job description explains duties and qualifications for applicants. Keep both documents linked but distinct in your workflow.",
  },
  {
    q: "Can it be used for multiple vacancies?",
    a: "Yes. Record total headcount and shared eligibility when openings share one approval. Split requisitions when locations, grades or budgets differ materially.",
  },
] as const;

export function ManpowerRequisitionFaq() {
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
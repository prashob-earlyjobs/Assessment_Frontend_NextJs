"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help recruit diagnostic centre staff?",
    a: "EarlyJobs helps diagnostic chains and standalone labs assess hiring for phlebotomists, lab assistants, registration staff and branch operations roles. Share shift-lab hours, branch list and credential expectations before sourcing begins.",
  },
  {
    q: "Can fresh graduates work in diagnostic centres?",
    a: "Graduates may be considered for administrative and some technical support roles when qualifications match employer criteria. Patient-facing or specimen-handling positions typically require employer-verified credentials and training.",
  },
  {
    q: "Can diagnostic chains discuss hiring across branches?",
    a: "Yes. Multi-city chains can share branch-wise vacancies, early-morning collection needs and joining timelines. Consistent role briefs reduce rework when the same profile is hired across locations.",
  },
  {
    q: "Does EarlyJobs certify laboratory technicians?",
    a: "No certification should be assumed through recruitment. Employers must verify mandatory lab qualifications, registration requirements and clinical training before staff handle specimens or patients.",
  },
] as const;

export function DiagnosticFaq() {
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
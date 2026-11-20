"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a job description generator?",
    a: "A job description generator is a free writing tool that turns role details you provide — title, location, responsibilities, and qualifications — into a structured job description draft. EarlyJobs helps Indian employers publish clearer posts faster before sourcing on job boards or WhatsApp hiring channels.",
  },
  {
    q: "Can the generator create descriptions for freshers?",
    a: "Yes. Include entry-level requirements, training provided, and shift or plant details for fresher manufacturing, warehouse, or healthcare support roles. Review statutory wage and contract language with your HR or legal team before posting.",
  },
  {
    q: "Should generated job descriptions be reviewed?",
    a: "Always. Verify duties, mandatory certifications, compensation bands, and equal-opportunity statements match your actual role and local rules. Generated text is a starting draft — recruiters should edit tone, benefits, and compliance clauses before publication.",
  },
  {
    q: "Is the Job Description Generator free?",
    a: "Yes. The EarlyJobs Job Description Generator is free to use online. Edit the draft, then copy or download it for your ATS, careers page, or agency briefing — no account required for basic generation.",
  },
] as const;

export function JobDescriptionFaq() {
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
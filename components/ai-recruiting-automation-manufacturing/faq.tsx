"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is manufacturing recruitment automation?",
    a: "Manufacturing recruitment automation uses AI-assisted workflows to run repeatable industrial hiring steps — intake across plants, shift-preference surveys, certification flags, and interview scheduling — while recruiters decide who advances. For Indian factories and staffing partners, it reduces time spent chasing mismatched shift or location fits during ramp-ups and seasonal peaks.",
  },
  {
    q: "Can AI handle multiple plant locations?",
    a: "Yes, when workflows are configured per site. Each plant can keep its own shift patterns, certification rules, and hiring manager calendars while sharing common messaging and compliance standards. The system routes candidates to the right location, avoids duplicate outreach, and alerts recruiters when one applicant qualifies for roles at more than one facility.",
  },
  {
    q: "Do I need an ATS to use these workflows?",
    a: "A candidate database helps, but the core need is a workflow engine that reacts to manufacturing events — shift changes, new headcount, certification gaps. Many ATS products include workflow modules. EarlyJobs can complement your stack by coordinating outreach and handoffs; the important part is logic built around plant-specific hiring steps.",
  },
  {
    q: "How is manufacturing recruiting automation priced?",
    a: "Pricing depends on hiring volume, number of plants, and which workflow steps you automate. EarlyJobs typically scopes automation alongside recruitment support rather than a one-size calculator. Contact the team for a quote aligned to your shift hiring and certification requirements — this page itself is free to read and share.",
  },
] as const;

export function ManufacturingFaq() {
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
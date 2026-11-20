"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support solar project recruitment?",
    a: "EarlyJobs helps solar and renewable employers assess hiring for installation helpers, junior technicians and site support across project locations in India. Share MW timelines, site clusters and joining windows so sourcing matches field execution.",
  },
  {
    q: "Which qualifications are relevant for solar technician roles?",
    a: "Requirements vary by employer and may include ITI electrical trades, diplomas in mechanical or electrical engineering, or employer-led apprenticeship paths. Site safety induction remains the employer's responsibility before technicians work at height or on energised equipment.",
  },
  {
    q: "Can solar employers recruit candidates for different project sites?",
    a: "Yes. Multi-location EPC and O&M teams can share branch-wise headcount, mobility expectations and accommodation context. EarlyJobs assesses coverage based on role type and candidate availability near each project belt.",
  },
  {
    q: "Who is responsible for electrical and site safety certification?",
    a: "Employers must ensure workers meet applicable electrical safety, height work and site-access requirements. EarlyJobs does not replace statutory training, PPE authorisation or legal compliance on live project sites.",
  },
] as const;

export function SolarFaq() {
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
"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What roles can electronics manufacturers recruit for?",
    a: "Common entry-level roles include SMT and final-assembly operators, inspection trainees, production assistants and warehouse associates. EarlyJobs can discuss volumes, shift patterns and qualification expectations for each station before sourcing begins.",
  },
  {
    q: "Can EMS companies discuss bulk recruitment?",
    a: "Yes. EMS companies can share ramp timelines, line counts, plant locations and joining targets for assessment. Clear headcount by shift helps plan high-volume hiring without disrupting customer program go-live dates.",
  },
  {
    q: "Can fresh diploma holders apply for electronics manufacturing roles?",
    a: "Many diploma and ITI graduates are considered for assembly and inspection roles, depending on employer requirements, ESD training readiness and commuting distance to the facility.",
  },
  {
    q: "Does EarlyJobs provide technical certification?",
    a: "Technical training or ESD certification should not be assumed as part of recruitment. Employers remain responsible for station-specific training, assessments and workplace safety authorization before operators start production.",
  },
] as const;

export function ElectronicsFaq() {
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
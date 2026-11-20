"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support battery manufacturing recruitment?",
    a: "EarlyJobs helps cell and pack plant employers assess hiring for electrode, assembly and dry-room support roles—not vehicle trim lines. Share facility type, humidity-controlled areas and shift volumes for accurate sourcing.",
  },
  {
    q: "Which qualifications are relevant?",
    a: "Entry-level roles may consider ITI, diploma or science backgrounds depending on the station. Positions in electrode coating, cell assembly or dry rooms often need employer-led moisture-control and electrical safety training before start.",
  },
  {
    q: "Can battery manufacturers discuss bulk hiring?",
    a: "Yes. Employers can share line ramp schedules, clean-room staffing needs and joining targets across giga-factory phases. Separating cell, module and pack vacancies avoids mismatched candidate pools.",
  },
  {
    q: "Who is responsible for battery safety training?",
    a: "Employers must provide training, authorization and supervision for chemical handling, high-voltage zones and dry-room protocols. EarlyJobs does not replace plant safety compliance or technical sign-off.",
  },
] as const;

export function BatteryFaq() {
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
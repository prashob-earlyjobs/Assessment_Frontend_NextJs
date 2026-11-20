"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support warehouse staff recruitment?",
    a: "EarlyJobs helps logistics and fulfilment employers assess hiring for pickers, packers, inventory assistants and dispatch coordinators. Share DC locations, shift patterns and peak-season volumes so sourcing matches floor reality.",
  },
  {
    q: "Can companies discuss bulk warehouse hiring?",
    a: "Yes. Employers can outline multi-shift headcount, seasonal spikes and facility clusters for assessment. Clear pick-rate and mobility expectations help align candidates before interview scheduling.",
  },
  {
    q: "What information is needed to start warehouse recruitment?",
    a: "Start with role descriptions, vacancy counts, facility addresses, shift rotation, compensation bands and physical job requirements. EarlyJobs uses this to scope sourcing—not to set operational SLAs for the warehouse.",
  },
  {
    q: "Does EarlyJobs provide forklift certification?",
    a: "Equipment certification and MHE authorisation remain employer responsibilities. Recruitment should not be read as guaranteeing licensed forklift or reach-truck operation until the employer completes training.",
  },
] as const;

export function WarehouseFaq() {
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
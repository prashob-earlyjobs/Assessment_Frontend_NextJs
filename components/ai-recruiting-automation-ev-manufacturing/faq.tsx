"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does AI help hire for EV factories?",
    a: "AI workflows coordinate high-volume EV plant hiring by matching battery, power-electronics, and assembly skills to open roles, capturing shift availability, and scheduling technical interviews. For India's expanding EV and cell manufacturing capacity, automation keeps ramp timelines visible while recruiters focus on safety credentials and hands-on assessments.",
  },
  {
    q: "Can AI handle multiple EV plant locations?",
    a: "Yes. Workflows can treat each greenfield or expansion site separately — location preferences, relocation willingness, and shift patterns — while applying shared messaging about roles and onboarding. Candidates not suited to one battery or assembly site can be routed to another qualified opening instead of leaving the pipeline.",
  },
  {
    q: "What should EV recruiters automate first?",
    a: "Prioritise outreach and screening for bottleneck roles: pack-line technicians, BMS or power-electronics specialists, and quality inspectors tied to go-live dates. Automate status updates for technical tests and plant tours, then add shift scheduling. Keep human sign-off on safety training and equipment-specific qualifications.",
  },
  {
    q: "How is EV manufacturing automation different from general automotive hiring?",
    a: "EV ramp hiring stresses new battery and e-drive skills, tighter production start dates, and often 24/7 pilot lines — not legacy ICE service roles. Automation should filter for EV-relevant certifications, support multi-skill assessments, and align interview load with cell or module line readiness rather than generic dealership hiring flows.",
  },
] as const;

export function EvManufacturingFaq() {
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
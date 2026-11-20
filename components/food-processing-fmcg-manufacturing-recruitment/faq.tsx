"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help recruit food processing workers?",
    a: "EarlyJobs helps food and FMCG plant employers assess production, packaging, quality support and warehouse hiring. Share hygiene protocols, line speeds and seasonal peaks so candidates understand shop-floor expectations.",
  },
  {
    q: "Can companies discuss seasonal hiring?",
    a: "Yes. Employers should specify contract length, volume spikes around festivals or harvest windows, and joining dates. EarlyJobs uses that context to plan sourcing without over-promising permanent headcount.",
  },
  {
    q: "Are freshers eligible for food manufacturing roles?",
    a: "Some entry-level packaging and material-handling roles may consider freshers when employers provide hygiene induction and PPE training. Production stations with allergen or temperature controls may need additional criteria.",
  },
  {
    q: "Who handles food-safety compliance?",
    a: "Employers remain responsible for FSSAI-aligned hygiene training, hair-net and glove discipline, and documented GMP practices on the line. EarlyJobs supports hiring coordination—not regulatory sign-off.",
  },
] as const;

export function FoodManufacturingFaq() {
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
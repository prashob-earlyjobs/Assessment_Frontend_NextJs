"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support EV manufacturing recruitment?",
    a: "EarlyJobs helps automotive and EV plant employers assess entry-level vehicle assembly, trim, materials and quality support hiring. Share OEM line briefs, shift plans and plant locations so candidates match shop-floor expectations—not battery cell roles.",
  },
  {
    q: "Which qualifications are suitable for automotive production roles?",
    a: "Requirements depend on the station and may include ITI, diploma or employer-approved training paths. Employers typically confirm aptitude for rotational shifts, plant commuting and structured assembly work before selection.",
  },
  {
    q: "Can manufacturers discuss bulk hiring?",
    a: "Yes. Manufacturers can share vacancy counts across body, paint, trim or EV assembly lines, plus target joining dates for ramp or model changeovers. Clear station mapping speeds bulk coordination with plant HR.",
  },
  {
    q: "Who handles technical and safety verification?",
    a: "Employers remain responsible for mandatory trade assessments, PPE training and workplace safety authorisation on the production floor. EarlyJobs supports sourcing and coordination—not final technical certification.",
  },
] as const;

export function AutomotiveFaq() {
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
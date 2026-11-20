"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does AI recruiting automation help healthcare staffing?",
    a: "AI automation handles repeatable tasks — first-response outreach, interview scheduling, credential reminders, and status updates — so candidates hear back quickly. Complex decisions such as license verification, clinical fit, and offer approval stay with recruiters and credentialing teams, helping Indian hospitals and staffing firms move pipelines without cutting corners on patient-care standards.",
  },
  {
    q: "Can AI check nurse licenses automatically?",
    a: "Some workflows can flag missing or expired licenses when integrated with official registries or document uploads, but outcomes depend on your data sources and region. Final verification, compliance sign-off, and any offer tied to clinical practice should remain with trained HR or credentialing staff — automation should surface gaps early, not replace professional judgment.",
  },
  {
    q: "What should healthcare recruiters automate first?",
    a: "Start with high-volume, rule-based steps: interview scheduling, acknowledgement messages, shift-availability questions, and follow-ups on pending paperwork. These save recruiter hours quickly. Add credential routing next. Keep human review on any step that affects patient safety, compensation, or regulated employment data.",
  },
  {
    q: "How is candidate data handled in healthcare recruiting workflows?",
    a: "Healthcare hiring involves sensitive employment and sometimes health-related information. EarlyJobs workflows are designed for secure handling of candidate data — access controls, audited messaging, and human checkpoints before offers. Automation should limit what is collected to what hiring requires and route sensitive questions to trained recruiters.",
  },
] as const;

export function HealthcareFaq() {
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
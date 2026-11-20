"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a recruitment funnel conversion rate?",
    a: "A recruitment funnel conversion rate is the percentage of candidates who move from one stage to the next — applications to screens, screens to interviews, interviews to offers, and offers to joinings. Tracking these rates helps Indian employers see where candidates drop off in high-volume hiring.",
  },
  {
    q: "How do you calculate offer-to-joining conversion?",
    a: "Divide joinings by offers extended in the same period, then multiply by 100. For example, 40 joinings from 50 offers is 80% offer-to-joining conversion. The calculator applies this logic across each funnel stage you enter.",
  },
  {
    q: "What is a good recruitment conversion rate?",
    a: "There is no single benchmark that fits every role. Plant hiring, nursing staffing, and tech roles differ widely by channel, salary, and location. Use your own historical funnel data as the baseline, then measure whether process changes improve the weakest stage.",
  },
  {
    q: "Can employers use the calculator for bulk hiring?",
    a: "Yes. Enter volume at each stage for campus drives, seasonal manufacturing hiring, or multi-city campaigns. The output highlights bottlenecks so coordinators can fix scheduling, offers, or documentation before the next wave.",
  },
  {
    q: "Is the Recruitment Funnel Calculator free?",
    a: "Yes. EarlyJobs provides this recruitment funnel calculator free in your browser. Use it with vacancy cost and cost-per-hire tools when reporting hiring efficiency to operations and finance leaders.",
  },
] as const;

export function RecruitmentFunnelFaq() {
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
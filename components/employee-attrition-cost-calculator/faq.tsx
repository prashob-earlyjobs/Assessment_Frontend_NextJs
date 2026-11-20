"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the cost of employee attrition?",
    a: "Attrition cost is an estimate of what you spend when someone leaves — recruiting replacements, onboarding and training, temporary coverage, and productivity lost while the role is vacant. It helps Indian employers discuss retention budgets with finance using assumptions they control.",
  },
  {
    q: "Is attrition cost the same as recruitment cost?",
    a: "No. Recruitment cost per hire is one input. Attrition cost also includes vacancy impact, learning-curve time, and sometimes overtime or agency cover. Use both calculators together: attrition for turnover programs, cost per hire for sourcing efficiency.",
  },
  {
    q: "Can the calculator be used for factory workers?",
    a: "Yes. Enter assumptions suited to plant roles — shift premiums, trainer time on the line, contract labour during gaps. Manufacturing and warehouse teams often see attrition costs rise when certifications or safety training must be repeated for each new joiner.",
  },
  {
    q: "Does the result represent an exact financial loss?",
    a: "No. Output is a model from your inputs, not audited financial truth. Treat it as a structured estimate for prioritising retention, supervisor training, or faster hiring — then refine with actual HR and finance data over time.",
  },
  {
    q: "Is the Employee Attrition Cost Calculator free?",
    a: "Yes. EarlyJobs offers this attrition cost calculator free online. Adjust inputs to compare scenarios, such as reducing time-to-fill or improving offer acceptance, before committing to retention initiatives.",
  },
] as const;

export function EmployeeAttritionCostFaq() {
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
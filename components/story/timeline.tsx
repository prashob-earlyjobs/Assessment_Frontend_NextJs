"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Milestone notes:
 * - 2024 founded: consistent with public company narrative
 * - Antler / Google Immersion / ₹1.2 crore: included per brief —
 *   @verification confirm dates and wording before launch
 * - 2026 scale line: use verified companyFacts where possible; do not
 *   invent recruiter/company counts beyond shared data
 */
const milestones = [
  { year: "2024", label: "EarlyJobs founded in Bengaluru" },
  {
    year: "2024",
    // @verification Confirm Antler backing announcement date before launch
    label: "Antler backing; early recruiter network seeded",
  },
  {
    year: "2025",
    // @verification Confirm Google for Startups × Antler Immersion listing
    label: "Google for Startups × Antler Immersion",
  },
  {
    year: "2025",
    // @verification Confirm ₹1.2 crore seed round public disclosure
    label: "₹1.2 crore seed round",
  },
  {
    year: "2025",
    // @verification Confirm district franchise launch timing
    label: "District franchise network launches",
  },
  {
    year: "2026",
    // Verified public metrics only via company-facts — no inflated counts
    label: "Recruiter network and company coverage scaling across India",
  },
] as const;

export function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="border-t border-[#E5E5E5]">
      <div ref={ref} className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-[140px]">
        <h2 className="text-[1.75rem] font-semibold tracking-[-0.02em] text-[#0A0A0A]">
          The road so far.
        </h2>
        <div className="relative mt-12">
          <div className="absolute top-2 right-0 left-0 hidden h-px bg-[#E5E5E5] md:block" />
          <motion.div
            aria-hidden
            className="absolute top-2 left-0 hidden h-px origin-left bg-[#F97316] md:block"
            style={{ scaleX, width: "100%" }}
          />
          <ol className="grid gap-8 md:grid-cols-6 md:gap-4">
            {milestones.map((item) => (
              <li key={`${item.year}-${item.label}`} className="relative md:pt-8">
                <span
                  aria-hidden
                  className="absolute top-0 left-0 size-2.5 rounded-full bg-[#F97316] md:left-0"
                />
                <p className="pl-5 text-[20px] font-semibold text-[#0A0A0A] md:pl-0">{item.year}</p>
                <p className="mt-2 pl-5 text-[14px] leading-5 text-[#525252] md:pl-0">{item.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

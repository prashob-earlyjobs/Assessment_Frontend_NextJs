"use client";

import { motion } from "framer-motion";

const strips = [
  // @verification Placeholder stats — keep em dashes until verified
  { value: "—", label: "Resumes per role, on average" },
  { value: "—", label: "Districts with near-zero recruiter coverage" },
  { value: "—", label: "Experienced women recruiters outside the workforce" },
] as const;

const rotates = ["-1deg", "1deg", "-1deg"] as const;

export function ProblemStrips() {
  return (
    <ul className="space-y-4 lg:pt-4">
      {strips.map((strip, index) => (
        <motion.li
          key={strip.label}
          initial={{ opacity: 0, y: 14, rotate: rotates[index] }}
          whileInView={{ opacity: 1, y: 0, rotate: rotates[index] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
          className="border border-[#E5E5E5] bg-white px-5 py-5"
        >
          <p className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-[#0A0A0A]">
            {strip.value}
          </p>
          <p className="mt-2 text-[13px] leading-5 text-[#525252]">{strip.label}</p>
        </motion.li>
      ))}
    </ul>
  );
}

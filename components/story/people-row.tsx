"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const people = [
  {
    headline:
      "She screened candidates for eight years. Then marriage moved her 400 kilometres from the nearest agency.",
    // @verification Placeholder story — replace with verified recruiter narrative + placement counts
    body: "Placeholder — a woman recruiter rebuilding her career from home through EarlyJobs, — placements in — months.",
  },
  {
    headline: "He graduated from a college no recruiter visits.",
    // @verification Placeholder story — replace with verified candidate narrative
    body: "Placeholder — a Tier 3 student whose 15-minute AI interview report got him interviews at companies he'd only seen on job boards.",
  },
  {
    headline: "Her consultancy was built for one city. The network made it national.",
    // @verification Placeholder story — replace with verified agency partner narrative
    body: "Placeholder — an agency owner closing mandates across states through the recruiter network.",
  },
] as const;

export function PeopleRows() {
  return (
    <div className="mt-16 space-y-24 sm:space-y-32">
      {people.map((person, index) => (
        <PeopleRow key={person.headline} person={person} reverse={index % 2 === 1} />
      ))}
    </div>
  );
}

function PeopleRow({
  person,
  reverse,
}: {
  person: (typeof people)[number];
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.55"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const panelY = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <h3 className="max-w-xl text-[1.65rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0A0A0A] sm:text-[2rem]">
          {person.headline}
        </h3>
        <p className="mt-5 max-w-lg text-[18px] leading-[1.7] text-[#525252]">{person.body}</p>
      </div>
      <motion.div
        style={{ y: panelY }}
        aria-hidden
        className="relative aspect-[5/4] w-full overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #0A0A0A 0%, #1a1a1a 42%, #F97316 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-24 items-center justify-center rounded-full border border-white/30 text-2xl font-semibold tracking-[-0.04em] text-white/90">
            EJ
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

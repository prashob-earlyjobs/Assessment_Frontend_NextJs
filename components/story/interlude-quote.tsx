"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function InterludeQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = quote.split(" ");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.45"],
  });

  return (
    <section
      ref={ref}
      className="flex min-h-[60vh] items-center bg-[#0A0A0A] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[900px] text-center">
        <blockquote className="text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.02em] text-white sm:text-[2.25rem] lg:text-[2.5rem]">
          {words.map((word, index) => {
            const start = index / words.length;
            const end = (index + 1) / words.length;
            return (
              <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </blockquote>
        <p className="mt-8 text-[13px] font-medium tracking-[0.1em] text-[#A3A3A3] uppercase">
          {attribution}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

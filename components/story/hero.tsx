"use client";

import { motion } from "framer-motion";

export function StoryHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t border-[#E5E5E5] bg-[#FAFAFA]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 88% 8%, rgba(249,115,22,0.14), transparent 42%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1120px] px-5 py-24 sm:px-8 sm:py-32">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#F97316] uppercase">
          Our Story
        </p>
        <h1 className="mt-5 max-w-[900px] text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0A0A0A] sm:text-[4rem] lg:text-[5rem]">
          Every career has a story. So does every hire.
        </h1>
        <p className="mt-6 max-w-[560px] text-[18px] leading-[1.7] text-[#525252]">
          EarlyJobs began with a simple observation: the people who understand hiring best —
          recruiters — were the most disconnected from it. This is how we&apos;re fixing that.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <motion.span
          aria-hidden
          className="block h-12 w-px bg-[#F97316]"
          animate={{ opacity: [0.25, 1, 0.25], scaleY: [0.85, 1, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="sr-only">Scroll to continue</span>
      </div>
    </section>
  );
}

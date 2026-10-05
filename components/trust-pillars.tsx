"use client";

import { useRef, useState } from "react";
import { DrawList } from "@/components/home/motion";
import { Frame, Headline } from "@/components/home/primitives";
import { gsap, useGSAP } from "@/lib/gsap";

const pillars = [
  {
    title: "Recruiter First",
    body: "We empower recruiters with opportunities, technology, and community.",
  },
  {
    title: "Human + AI",
    body: "Automation supports people—not replaces them.",
  },
  {
    title: "Long-Term Success",
    body: "Every placement is the beginning of a relationship, not the end of a transaction.",
  },
] as const;

const quotes = [
  {
    role: "Recruiter",
    text: "The work is the conversation. The tools just get me there sooner.",
  },
  {
    role: "Employer",
    text: "We stopped reviewing piles of resumes and started meeting people a recruiter already believed in.",
  },
  {
    role: "Job Seeker",
    text: "Someone who understood the role found me. I did not have to shout into a job board.",
  },
] as const;

export function TrustPillars() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];
  const quoteRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const seenRef = useRef(false);

  useGSAP(
    () => {
      const quoteEl = quoteRef.current;
      if (!quoteEl) return;
      const direction = index === indexRef.current ? 0 : index > indexRef.current ? 1 : -1;
      indexRef.current = index;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const first = !seenRef.current;
      seenRef.current = true;
      gsap.killTweensOf(quoteEl);

      if (first || reduce || direction === 0) {
        gsap.set(quoteEl, { x: 0, autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        quoteEl,
        { x: direction * 22, autoAlpha: 0.2 },
        { x: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
      );
    },
    { dependencies: [index], scope: quoteRef },
  );

  return (
    <Frame id="relationships" className="bg-white">
      <Headline>Built on Relationships. Backed by Results.</Headline>
      <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
        <p>Technology makes hiring faster.</p>
        <p>Relationships make hiring successful.</p>
        <p>
          That&apos;s why EarlyJobs combines recruiter expertise with AI-powered infrastructure to
          create meaningful hiring experiences.
        </p>
      </div>

      <DrawList className="mt-12 grid gap-8 lg:grid-cols-3">
        {pillars.map((pillar, pillarIndex) => (
          <li key={pillar.title} className="relative border-t border-black/10 pt-4">
            <span
              aria-hidden
              data-line
              className="absolute -top-px left-0 h-0.5 bg-brand"
              style={{ width: "0%" }}
            />
            <p className="text-xs tabular-nums text-neutral-400">0{pillarIndex + 1}</p>
            <h3 className="mt-2 text-base font-medium tracking-[-0.02em] text-neutral-950">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{pillar.body}</p>
          </li>
        ))}
      </DrawList>

      <figure className="mt-16 max-w-2xl">
        <div ref={quoteRef}>
          <blockquote className="text-[1.35rem] font-medium leading-snug tracking-[-0.03em] text-neutral-950 sm:text-[1.6rem]">
            “{quote.text}”
          </blockquote>
          <figcaption className="mt-4 text-sm text-neutral-500">{quote.role}</figcaption>
        </div>
        <div className="mt-6 flex gap-2">
          {quotes.map((item, quoteIndex) => (
            <button
              key={item.role}
              type="button"
              aria-label={`Show ${item.role} quote`}
              aria-current={quoteIndex === index}
              onClick={() => setIndex(quoteIndex)}
              className={`h-1.5 w-6 rounded-full ${quoteIndex === index ? "bg-brand" : "bg-neutral-200"}`}
            />
          ))}
        </div>
      </figure>
    </Frame>
  );
}

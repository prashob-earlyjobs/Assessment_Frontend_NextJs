"use client";

import { useRef, useState } from "react";
import { Headline } from "@/components/home/primitives";
import { RecruiterSection } from "@/components/recruiters/section";
import { gsap, useGSAP } from "@/lib/gsap";

const questions = [
  {
    q: "Who can join EarlyJobs as a recruiter?",
    a: "Anyone interested in recruitment—from experienced recruiters to aspiring professionals.",
  },
  {
    q: "Is recruiting experience required?",
    a: "No. Beginners can learn and grow while experienced recruiters can scale their work.",
  },
  {
    q: "How do recruiters receive hiring opportunities?",
    a: "Verified hiring requirements are shared through the platform based on recruiter expertise and specialization.",
  },
  {
    q: "Does AI replace recruiters?",
    a: "No. AI supports recruiters by reducing repetitive work while recruiters continue making hiring decisions and building relationships.",
  },
  {
    q: "How do recruiters earn?",
    a: "Recruiters earn through successful candidate placements according to the agreed commercial model.",
  },
] as const;

export function RecruiterFaq() {
  const root = useRef<HTMLDivElement>(null);
  const panels = useRef<Array<HTMLDivElement | null>>([]);
  const [open, setOpen] = useState(0);
  const { contextSafe } = useGSAP(() => {}, { scope: root });

  const onToggle = (index: number) => {
    const next = open === index ? -1 : index;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    contextSafe(() => {
      panels.current.forEach((panel, itemIndex) => {
        if (!panel) return;
        const opening = itemIndex === next;
        const wasOpen = itemIndex === open;
        if (!opening && !wasOpen) return;

        const inner = panel.firstElementChild;
        if (!(inner instanceof HTMLElement)) return;
        gsap.killTweensOf(panel);
        gsap.set(panel, { height: panel.offsetHeight });
        gsap.to(panel, {
          height: opening ? inner.offsetHeight : 0,
          duration: reduce ? 0 : 0.45,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            gsap.set(panel, { height: opening ? "auto" : 0 });
          },
        });
      });
    })();

    setOpen(next);
  };

  return (
    <RecruiterSection id="recruiter-faq">
      <div ref={root} className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,20rem)] lg:gap-12">
        <div>
        <Headline>Frequently Asked Questions</Headline>
        <ul className="mt-10 border-t border-black/10">
          {questions.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q} className="border-b border-black/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => onToggle(index)}
                  className="flex w-full items-center justify-between gap-6 py-4 text-left text-base font-medium tracking-[-0.02em] text-neutral-950"
                >
                  {item.q}
                  <span aria-hidden className="text-neutral-400">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  ref={(node) => {
                    panels.current[index] = node;
                  }}
                  data-open={isOpen ? "true" : "false"}
                  className="recruiter-faq-panel"
                >
                  <p className="max-w-2xl pb-5 text-sm leading-6 text-neutral-600">{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
        </div>
        <img
          src="/recruiters/question.jpg"
          alt=""
          width={1024}
          height={1024}
          className="mx-auto aspect-square h-auto w-full max-w-xs rotate-[30deg] mix-blend-multiply lg:max-w-none"
        />
      </div>
    </RecruiterSection>
  );
}

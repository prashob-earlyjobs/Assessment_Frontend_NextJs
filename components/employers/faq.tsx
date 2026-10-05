"use client";

import { useRef, useState } from "react";
import { Headline } from "@/components/home/primitives";
import { FaqMotion } from "@/components/employers/motion";
import { EmployerSection } from "@/components/employers/section";
import { gsap, useGSAP } from "@/lib/gsap";

const questions = [
  {
    q: "Is EarlyJobs a recruitment agency?",
    a: "No. EarlyJobs is The Recruiter-First Hiring Network, connecting employers with independent recruiters supported by AI-powered hiring infrastructure.",
  },
  {
    q: "Can we hire for multiple roles?",
    a: "Yes. The network supports hiring across functions, industries, and geographies.",
  },
  {
    q: "How quickly can we receive candidates?",
    a: "Recruiters begin working once hiring requirements are shared, with qualified shortlists delivered based on role complexity.",
  },
  {
    q: "Do recruiters specialize in industries?",
    a: "Yes. Recruiters participate across domains such as technology, BFSI, healthcare, manufacturing, retail, executive search, and more.",
  },
  {
    q: "Can startups use EarlyJobs?",
    a: "Absolutely. From early-stage startups to global enterprises, the network is designed to support different hiring needs.",
  },
] as const;

export function EmployerFaq() {
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
        gsap.killTweensOf([panel, inner]);
        gsap.set(panel, { height: panel.offsetHeight });
        gsap.to(panel, {
          height: opening ? inner.offsetHeight : 0,
          duration: reduce ? 0 : 0.5,
          ease: "power3.out",
          overwrite: true,
          onComplete: () => {
            gsap.set(panel, { height: opening ? "auto" : 0 });
          },
        });
        gsap.fromTo(
          inner,
          { autoAlpha: opening ? 0 : 1, y: opening ? 10 : 0 },
          {
            autoAlpha: opening ? 1 : 0,
            y: 0,
            duration: reduce ? 0 : 0.4,
            delay: opening && !reduce ? 0.08 : 0,
            ease: "power2.out",
            overwrite: true,
            clearProps: opening ? "opacity,visibility,transform" : "transform",
          },
        );
      });
    })();

    setOpen(next);
  };

  return (
    <EmployerSection id="faq">
      <FaqMotion>
        <div ref={root}>
          <Headline>Frequently Asked Questions</Headline>
          <div className="mt-10 border-t border-black/10">
            {questions.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q} className="faq-row border-b border-black/10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => onToggle(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-base font-medium tracking-[-0.02em] text-neutral-950"
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
                    className="faq-panel"
                  >
                    <p className="max-w-3xl pb-4 text-sm leading-6 text-neutral-600">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FaqMotion>
    </EmployerSection>
  );
}

"use client";

import { useRef, useState } from "react";
import { Frame, Headline } from "@/components/home/primitives";
import { gsap, useGSAP } from "@/lib/gsap";

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const previous = useRef(open);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const inner = innerRef.current;
      if (!panel || !inner) return;
      const changed = previous.current !== open;
      previous.current = open;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.killTweensOf([panel, inner]);

      if (!changed || reduce) {
        gsap.set(panel, { height: open ? "auto" : 0, autoAlpha: open ? 1 : 0 });
        gsap.set(inner, { y: 0 });
        return;
      }

      if (!open) {
        gsap.to(panel, { height: 0, autoAlpha: 0, duration: 0.38, ease: "power3.inOut" });
        gsap.to(inner, { y: 6, duration: 0.38, ease: "power3.inOut" });
        return;
      }

      gsap.set(panel, { height: "auto", autoAlpha: 1 });
      const height = panel.offsetHeight;
      gsap.fromTo(
        panel,
        { height: 0, autoAlpha: 0 },
        {
          height,
          autoAlpha: 1,
          duration: 0.42,
          ease: "power3.out",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        },
      );
      gsap.fromTo(inner, { y: 10 }, { y: 0, duration: 0.42, ease: "power3.out" });
    },
    { dependencies: [open], scope: panelRef },
  );

  return (
    <li className="border-b border-black/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-4 text-left text-base font-medium tracking-[-0.02em] text-neutral-950"
      >
        {question}
        <span aria-hidden className="text-neutral-400">
          {open ? "–" : "+"}
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: open ? "auto" : 0 }}>
        <div ref={innerRef}>
          <p className="max-w-2xl pb-5 text-sm leading-6 text-neutral-600">{answer}</p>
        </div>
      </div>
    </li>
  );
}

const questions = [
  {
    q: "Is EarlyJobs a Job Portal?",
    a: "No. EarlyJobs is The Recruiter-First Hiring Network where recruiters, employers, and professionals connect through AI-powered hiring infrastructure.",
  },
  {
    q: "Is EarlyJobs a Recruitment Agency?",
    a: "No. Recruiters work independently while employers access recruiter-led hiring through the network.",
  },
  {
    q: "How is EarlyJobs different from LinkedIn or Naukri?",
    a: "Traditional platforms focus on listings or networking. EarlyJobs focuses on recruiter-guided hiring journeys and better hiring outcomes.",
  },
  {
    q: "Is EarlyJobs only for Recruiters?",
    a: "No. EarlyJobs is designed for recruiters, employers, job seekers, recruitment agencies, and hiring partners. Recruiters simply sit at the center of the ecosystem.",
  },
  {
    q: "Can freshers use EarlyJobs?",
    a: "Yes. Students, graduates, experienced professionals, and career changers can all build profiles and discover opportunities.",
  },
  {
    q: "Why is AI part of EarlyJobs?",
    a: "AI removes repetitive tasks such as matching and screening. People continue making hiring decisions.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <Frame id="faq" className="bg-white">
      <Headline>Questions? We&apos;ve Answered Them.</Headline>
      <ul className="mt-10 border-t border-black/10">
        {questions.map((item, index) => (
          <FaqItem
            key={item.q}
            question={item.q}
            answer={item.a}
            open={open === index}
            onToggle={() => setOpen(open === index ? -1 : index)}
          />
        ))}
      </ul>
    </Frame>
  );
}

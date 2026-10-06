"use client";

import { useRef, useState } from "react";
import { Flow, Frame, SolidLink } from "@/components/home/primitives";
import { gsap, playMotion, useGSAP } from "@/lib/gsap";

const chain = [
  "Employer",
  "Hiring Requirement",
  "Recruiter",
  "AI Matching",
  "Qualified Talent",
  "Interview",
  "Joining",
  "Success",
] as const;

const steps = [
  {
    n: "01",
    title: "Employers Share Hiring Needs",
    body: "Companies post hiring requirements once. The network intelligently routes those opportunities to the right recruiters.",
    note: "Company → Job Requirement",
    active: ["Employer", "Hiring Requirement"],
  },
  {
    n: "02",
    title: "Recruiters Find the Right Talent",
    body: "Recruiters receive verified mandates based on their expertise. Instead of searching blindly, they focus on matching the best people.",
    note: "Recruiter → Candidate Matching",
    active: ["Recruiter", "Qualified Talent"],
  },
  {
    n: "03",
    title: "AI Accelerates Everything",
    body: "AI assists with talent matching, resume intelligence, interview scheduling, communication, and screening. AI removes repetitive work. Recruiters remain in control.",
    note: "AI removes the repetitive work.",
    active: ["AI Matching"],
  },
  {
    n: "04",
    title: "Job Seekers Discover Better Opportunities",
    body: "Instead of applying hundreds of times, qualified professionals are matched with recruiters already working on relevant positions. Recruiters help candidates move faster.",
    note: "A match, not another application.",
    active: ["Qualified Talent", "Recruiter"],
  },
  {
    n: "05",
    title: "Employers Hire Faster",
    body: "Companies receive recruiter-reviewed candidates. Less screening. Better quality. Higher joining rates.",
    note: "Shortlist, then joining.",
    active: ["Employer", "Interview", "Joining"],
  },
  {
    n: "06",
    title: "Everyone Wins",
    body: "Recruiters grow. Employers hire. Professionals build careers. The network becomes stronger with every successful joining.",
    note: "The network gets stronger.",
    active: ["Success", "Joining"],
  },
] as const;

type Step = (typeof steps)[number];

function StepRow({ item, open, onOpen }: { item: Step; open: boolean; onOpen: () => void }) {
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
        onClick={onOpen}
        className="flex w-full items-baseline gap-4 py-4 text-left"
      >
        <span className={`text-xs tabular-nums ${open ? "text-brand" : "text-neutral-400"}`}>
          {item.n}
        </span>
        <span
          className={`text-base font-medium tracking-[-0.02em] ${open ? "text-neutral-950" : "text-neutral-500"}`}
        >
          {item.title}
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: open ? "auto" : 0 }}>
        <div ref={innerRef} className="pb-5 pl-8">
          <p className="max-w-lg text-sm leading-6 text-neutral-600">{item.body}</p>
          <p className="mt-3 text-[13px] text-brand">{item.note}</p>
        </div>
      </div>
    </li>
  );
}

export function HowItWorks() {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () =>
      playMotion(headingRef, (reduce) => {
        gsap.fromTo(
          headingRef.current,
          { backgroundSize: reduce ? "100% 88%" : "0% 88%" },
          {
            backgroundSize: "100% 88%",
            ease: "none",
            duration: reduce ? 0 : 0.5,
            scrollTrigger: reduce
              ? undefined
              : { trigger: headingRef.current, start: "top 72%", end: "top 18%", scrub: true },
          },
        );
      }),
    { scope: headingRef },
  );

  return (
    <Frame id="how-it-works" className="bg-white">
      <h2
        ref={headingRef}
        className="max-w-3xl text-[2rem] font-semibold leading-[1.2] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]"
        style={{
          backgroundImage: "linear-gradient(#f6d0c6, #f6d0c6)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundSize: "0% 88%",
          WebkitBoxDecorationBreak: "clone",
          boxDecorationBreak: "clone",
        }}
      >
        Hiring Works Better When Everyone Works Together.
      </h2>
      <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
        <p>
          Traditional hiring forces recruiters, employers, and job seekers to work in separate
          systems.
        </p>
        <p>
          EarlyJobs brings everyone together through one connected hiring network, where recruiters
          guide hiring, employers find better talent, and job seekers discover meaningful
          opportunities.
        </p>
        <p className="font-medium text-neutral-800">
          AI powers the process, but people make the decisions.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_16rem]">
        <ol className="border-t border-black/10">
          {steps.map((item, index) => (
            <StepRow key={item.n} item={item} open={index === current} onOpen={() => setCurrent(index)} />
          ))}
        </ol>

        <div className="rounded-md border border-black/10 px-6 py-6">
          <p className="text-[13px] text-neutral-500">The network</p>
          <div className="mt-5">
            <Flow steps={chain} active={new Set(step.active)} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SolidLink href="/recruiters">Explore How It Works</SolidLink>
      </div>
    </Frame>
  );
}

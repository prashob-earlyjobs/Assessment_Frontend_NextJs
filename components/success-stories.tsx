"use client";

import { useRef, useState } from "react";
import { Frame, Headline } from "@/components/home/primitives";
import { gsap, useGSAP } from "@/lib/gsap";

const stories = [
  {
    id: "seekers",
    label: "Job Seekers",
    title: "A profile, then a conversation.",
    body: "Professionals stop sending applications into silence. One profile reaches recruiters who are already working on roles that fit, and the next step is an interview instead of another form.",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    title: "Mandates you can actually close.",
    body: "Recruiters work verified hiring requirements, place people they believe in, and see earnings tied to joinings. Milestones show up as placements, not as activity.",
  },
  {
    id: "employers",
    label: "Employers",
    title: "A shorter path to the right person.",
    body: "Teams spend less time screening and more time meeting recruiter-reviewed candidates. Hiring time drops. Quality holds. Joinings stick.",
  },
] as const;

export function SuccessStories() {
  const [current, setCurrent] = useState<(typeof stories)[number]["id"]>("seekers");
  const story = stories.find((item) => item.id === current) ?? stories[0];
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  const seenRef = useRef(false);

  useGSAP(
    () => {
      const list = listRef.current;
      const bar = barRef.current;
      const panel = panelRef.current;
      const button = list?.querySelector<HTMLButtonElement>(`[data-tab="${current}"]`);
      if (!list || !bar || !panel || !button) return;

      const nextIndex = Math.max(0, stories.findIndex((item) => item.id === current));
      const direction = nextIndex === indexRef.current ? 0 : nextIndex > indexRef.current ? 1 : -1;
      indexRef.current = nextIndex;
      const targetX = button.offsetLeft;
      const targetW = button.offsetWidth;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const first = !seenRef.current;
      seenRef.current = true;
      gsap.killTweensOf([bar, panel]);

      const settle = () => {
        gsap.set(bar, { x: targetX, width: targetW });
        gsap.set(panel, { x: 0, autoAlpha: 1 });
      };
      if (first || reduce || direction === 0) {
        settle();
        const onResize = () => settle();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }

      gsap.to(bar, { x: targetX, width: targetW, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        panel,
        { x: direction * 18, autoAlpha: 0.35 },
        { x: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" },
      );
    },
    { dependencies: [current], scope: listRef },
  );

  return (
    <Frame id="success-stories">
      <Headline>Every Successful Hiring Story Starts with a Connection.</Headline>

      <div
        ref={listRef}
        role="tablist"
        aria-label="Success stories"
        className="relative mt-10 flex gap-6 border-b border-black/10"
      >
        {stories.map((item) => {
          const selected = item.id === current;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-tab={item.id}
              aria-selected={selected}
              onClick={() => setCurrent(item.id)}
              className={`pb-3 text-sm font-medium ${selected ? "text-neutral-950" : "text-neutral-400"}`}
            >
              {item.label}
            </button>
          );
        })}
        <span ref={barRef} aria-hidden className="absolute bottom-0 left-0 h-0.5 bg-brand" />
      </div>

      <article ref={panelRef} className="mt-8 max-w-xl">
        <h3 className="text-xl font-medium tracking-[-0.03em] text-neutral-950">{story.title}</h3>
        <p className="mt-3 text-sm leading-6 text-neutral-600">{story.body}</p>
      </article>

      <p className="mt-12 text-sm text-neutral-500">
        <span className="tracking-[0.15em] text-brand" aria-hidden>
          ★★★★★
        </span>
        <span className="sr-only">5 stars. </span> Trusted by recruiters, employers, and
        professionals building the future of hiring.
      </p>
    </Frame>
  );
}

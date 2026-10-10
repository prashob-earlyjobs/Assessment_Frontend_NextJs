"use client";

import { useRef } from "react";
import { gsap, playMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const beforeLanes = [
  {
    actor: "Job Seeker",
    steps: ["Applies Everywhere", "No Response"],
  },
  {
    actor: "Employer",
    steps: ["Screens Hundreds of Resumes"],
  },
  {
    actor: "Recruiter",
    steps: ["Works Alone"],
  },
] as const;

const withEarlyJobs = [
  "Recruiter",
  "AI Matching",
  "Qualified Talent",
  "Employer",
  "Interview",
  "Successful Joining",
] as const;

function scrollToNextSection() {
  const current = document.getElementById("why-earlyjobs");
  let next = current?.nextElementSibling ?? null;
  while (next && next.tagName !== "SECTION") next = next.nextElementSibling;
  if (!(next instanceof HTMLElement)) return;

  const header = document.querySelector("header");
  const offset = header instanceof HTMLElement ? header.offsetHeight : 64;
  const top = next.getBoundingClientRect().top + window.scrollY - offset;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

function BeforeRoutes() {
  return (
    <div data-route="muted" className="relative">
      <div className="flex items-baseline justify-between gap-3 border-b border-neutral-200 pb-3">
        <p className="text-sm font-medium text-neutral-500">Before EarlyJobs</p>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          Fragmented
        </p>
      </div>
      <ul className="mt-6 divide-y divide-neutral-200/80">
        {beforeLanes.map((lane) => (
          <li key={lane.actor} data-lane className="py-4 first:pt-0 last:pb-0">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              {lane.actor}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium leading-5 text-neutral-800">
              {lane.steps.map((step, stepIndex) => {
                const last = stepIndex === lane.steps.length - 1;
                return (
                  <span key={step} className="inline-flex items-center gap-2">
                    <span
                      className={
                        step === "No Response"
                          ? "text-neutral-400 line-through decoration-neutral-300"
                          : undefined
                      }
                    >
                      {step}
                    </span>
                    {!last ? (
                      <span aria-hidden className="text-neutral-300">
                        /
                      </span>
                    ) : null}
                  </span>
                );
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WithRoute({ steps }: { steps: readonly string[] }) {
  return (
    <div data-route="brand" className="relative">
      <div className="flex items-baseline justify-between gap-3 border-b border-brand/20 pb-3">
        <p className="text-sm font-medium text-brand">With EarlyJobs</p>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-brand/70 uppercase">
          Connected
        </p>
      </div>
      <ol className="relative mt-6">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-[11px] w-px bg-[#f6d5cd]"
        />
        <span
          aria-hidden
          data-progress-line
          className="absolute top-0 left-[11px] w-px origin-top bg-brand"
          style={{ height: "100%", transform: "scaleY(0)" }}
        />
        {steps.map((step, index) => (
          <li
            key={step}
            data-step
            className="relative flex min-h-12 items-center gap-3 py-2.5"
            data-index={index}
          >
            <span
              aria-hidden
              data-index-badge
              className="relative z-[1] flex size-6 shrink-0 items-center justify-center bg-white text-[11px] font-semibold tabular-nums text-neutral-300"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span data-label className="text-sm font-medium leading-5 text-neutral-300">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RouteMap() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      playMotion(ref, (reduce) => {
        const root = ref.current;
        if (!root) return;

        const paint = (progress: number) => {
          const line = root.querySelector<HTMLElement>("[data-progress-line]");
          if (line) gsap.set(line, { scaleY: progress, transformOrigin: "top center" });

          const brandRoute = root.querySelector<HTMLElement>('[data-route="brand"]');
          if (brandRoute) {
            const steps = brandRoute.querySelectorAll<HTMLElement>("[data-step]");
            const last = Math.max(1, steps.length - 1);
            steps.forEach((step, index) => {
              const reached = progress + 0.02 >= index / last;
              const badge = step.querySelector<HTMLElement>("[data-index-badge]");
              const label = step.querySelector<HTMLElement>("[data-label]");
              if (badge) {
                badge.className = `relative z-[1] flex size-6 shrink-0 items-center justify-center bg-white text-[11px] font-semibold tabular-nums ${
                  reached ? "text-brand" : "text-neutral-300"
                }`;
              }
              if (label) {
                label.className = `text-sm font-medium leading-5 ${
                  reached ? "text-neutral-950" : "text-neutral-300"
                }`;
              }
            });
          }

          root.querySelectorAll<HTMLElement>("[data-lane]").forEach((lane, index) => {
            const reveal = progress >= index / Math.max(1, beforeLanes.length);
            gsap.set(lane, {
              autoAlpha: reveal || reduce ? 1 : 0.5,
              y: reveal || reduce ? 0 : 6,
            });
          });
        };

        if (reduce) {
          paint(1);
          return;
        }

        paint(0);
        ScrollTrigger.create({
          trigger: root,
          start: "top 62%",
          end: "bottom 62%",
          scrub: 0.7,
          onUpdate: (self) => paint(self.progress),
        });
      }),
    { scope: ref },
  );

  return (
    <div ref={ref} className="mt-12 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:gap-12">
      <BeforeRoutes />
      <WithRoute steps={withEarlyJobs} />
    </div>
  );
}

const points = [
  "Today's hiring process forces recruiters, employers, and job seekers to work in isolation.",
  "Recruiters struggle to access consistent opportunities.",
  "Job seekers send hundreds of applications without hearing back.",
  "Employers spend weeks reviewing unqualified candidates.",
  "Everyone is working harder—but hiring isn't getting better.",
  "We believe hiring should be connected, guided, and built around people—not just platforms.",
];

export function WhyEarlyJobs() {
  const sectionRef = useRef<HTMLElement>(null);
  const fragmentRef = useRef<HTMLSpanElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const pairRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      playMotion(sectionRef, (reduce) => {
        const fragment = fragmentRef.current;
        if (fragment) {
          gsap.fromTo(
            fragment,
            { backgroundSize: reduce ? "100% 100%" : "0% 100%" },
            {
              backgroundSize: "100% 100%",
              ease: "none",
              scrollTrigger: reduce
                ? undefined
                : { trigger: fragment, start: "top 72%", end: "top 20%", scrub: 0.7 },
            },
          );
        }

        gsap.utils.toArray<HTMLElement>("[data-point]", pointsRef.current).forEach((row) => {
          const copy = row.querySelector<HTMLElement>("[data-copy]");
          const bullet = row.querySelector<HTMLElement>("[data-bullet]");
          if (reduce) {
            if (copy) gsap.set(copy, { x: 0 });
            if (bullet) gsap.set(bullet, { scale: 1 });
            return;
          }
          if (bullet) gsap.set(bullet, { scale: 0, force3D: true });
          ScrollTrigger.create({
            trigger: row,
            start: "top 82%",
            once: true,
            onEnter: () => {
              if (bullet) {
                gsap.to(bullet, {
                  scale: 1,
                  duration: 0.45,
                  ease: "back.out(1.6)",
                  force3D: true,
                  overwrite: true,
                });
              }
              if (copy) {
                gsap.fromTo(
                  copy,
                  { x: 8, autoAlpha: 0.55 },
                  { x: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out", force3D: true },
                );
              }
            },
          });
        });

        const circles = gsap.utils.toArray<HTMLElement>("[data-circle]", pairRef.current);
        if (reduce) {
          gsap.set(circles, { x: 0, y: 0, autoAlpha: 1 });
          return;
        }
        if (circles[0]) gsap.set(circles[0], { x: -56, y: -25, autoAlpha: 1, force3D: true });
        if (circles[1]) gsap.set(circles[1], { x: 56, y: 25, autoAlpha: 1, force3D: true });
        ScrollTrigger.create({
          trigger: pairRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const pair = gsap.timeline({ defaults: { force3D: true, overwrite: true } });
            if (circles[0]) {
              pair.to(circles[0], { x: 0, y: 0, duration: 0.85, ease: "power3.out" }, 0);
            }
            if (circles[1]) {
              pair.to(circles[1], { x: 0, y: 0, duration: 0.85, ease: "power3.out" }, 0);
            }
          },
        });
      }),
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="why-earlyjobs" className="snap-section border-t border-black/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-12 sm:px-8 sm:py-16">
        <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-[2.75rem]">
          Hiring Isn&apos;t Broken.
          <br />
          <span
            ref={fragmentRef}
            className="text-brand"
            style={{
              display: "inline-block",
              backgroundImage: "linear-gradient(#171717, #171717)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
              backgroundSize: "0% 100%",
              padding: "0 0.08em",
            }}
          >
            It&apos;s Fragmented.
          </span>
        </h2>

        <div className="mt-5 grid items-center gap-10 lg:grid-cols-[minmax(0,36rem)_auto]">
          <div ref={pointsRef} className="max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
            {points.map((point) => (
              <p key={point} data-point className="relative pl-4">
                <span
                  aria-hidden
                  data-bullet
                  className="absolute top-[0.55rem] left-0 size-1.5 rounded-full bg-brand"
                  style={{ transform: "scale(0)" }}
                />
                <span data-copy className="inline-block">
                  {point}
                </span>
              </p>
            ))}
            <p className="font-medium text-neutral-800">
              That&apos;s why we created The Recruiter-First Hiring Network.
            </p>
          </div>
          <div ref={pairRef} className="relative mx-auto h-52 w-64 lg:mx-0 lg:mr-6">
            <div
              data-circle
              className="absolute top-3 left-2 flex size-32 items-center justify-center rounded-full bg-brand text-[11px] font-semibold tracking-[0.16em] text-white"
            >
              PEOPLE
            </div>
            <div
              data-circle
              className="absolute right-0 bottom-3 flex size-36 items-center justify-center rounded-full bg-neutral-950 px-5 text-center text-[11px] font-semibold tracking-[0.12em] text-white"
            >
              OPPORTUNITY
            </div>
          </div>
        </div>

        <RouteMap />

        <div className="mt-10 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
          <p className="font-medium text-neutral-950">
            Technology alone doesn&apos;t create better hiring.
            <br />
            People do.
          </p>
          <p>AI makes hiring faster.</p>
          <p>Recruiters make hiring smarter.</p>
          <p>Together, they create better career outcomes for everyone.</p>
        </div>

        <button
          type="button"
          onClick={scrollToNextSection}
          className="mt-8 inline-flex w-fit flex-col items-center gap-2 text-brand"
        >
          <span className="flex h-11 items-center justify-center rounded-[6px] bg-brand px-5 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]">
            Discover How EarlyJobs Works
          </span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="hidden size-4 text-brand motion-safe:animate-bounce sm:block"
          >
            <path
              d="M8 3v8M8 11 4.5 7.5M8 11l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

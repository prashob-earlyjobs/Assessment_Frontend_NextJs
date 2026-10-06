"use client";

import { useRef } from "react";
import { gsap, playMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const before = [
  "Job Seeker",
  "Applies Everywhere",
  "No Response",
  "Employer",
  "Screens Hundreds of Resumes",
  "Recruiter Works Alone",
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

const beforeNudge = [0, 40, 12, 52, 6, 32];

function Route({
  label,
  steps,
  tone,
}: {
  label: string;
  steps: readonly string[];
  tone: "muted" | "brand";
}) {
  const brand = tone === "brand";

  return (
    <div data-route={tone}>
      <p className={`text-sm font-medium ${brand ? "text-brand" : "text-neutral-500"}`}>{label}</p>
      <ol className="relative mt-5">
        {brand ? (
          <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-[#f6d5cd]" />
        ) : null}
        {brand ? (
          <span
            aria-hidden
            data-progress-line
            className="absolute top-2 left-[5px] w-px origin-top bg-brand"
            style={{ height: "calc(100% - 16px)", transform: "scaleY(0)" }}
          />
        ) : null}
        {steps.map((step, index) => {
          const shift = brand ? 0 : beforeNudge[index];
          return (
            <li key={step} data-step className="relative h-14" data-index={index}>
              <span
                aria-hidden
                data-dot
                className={`absolute top-2 size-[11px] rounded-full border-2 ${
                  brand ? "border-neutral-300 bg-white" : "border-neutral-300 bg-white"
                }`}
                style={{ left: shift }}
              />
              <span
                data-label
                className="absolute top-1 max-w-[16rem] text-sm font-medium leading-5 text-neutral-300"
                style={{ left: shift + 22 }}
              >
                {step}
              </span>
            </li>
          );
        })}
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

          root.querySelectorAll<HTMLElement>("[data-route]").forEach((route) => {
            const brand = route.dataset.route === "brand";
            const steps = route.querySelectorAll<HTMLElement>("[data-step]");
            const last = Math.max(1, steps.length - 1);
            steps.forEach((step, index) => {
              const reached = progress + 0.02 >= index / last;
              const shift = brand ? 0 : beforeNudge[index] ?? 0;
              const dot = step.querySelector<HTMLElement>("[data-dot]");
              const label = step.querySelector<HTMLElement>("[data-label]");
              if (dot) {
                dot.className = `absolute top-2 size-[11px] rounded-full border-2 ${
                  reached
                    ? brand
                      ? "border-brand bg-brand"
                      : "border-neutral-600 bg-neutral-600"
                    : "border-neutral-300 bg-white"
                }`;
                dot.style.left = `${shift}px`;
              }
              if (label) {
                label.className = `absolute top-1 max-w-[16rem] text-sm font-medium leading-5 ${
                  reached ? "text-neutral-950" : "text-neutral-300"
                }`;
                label.style.left = `${shift + 22}px`;
              }
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
    <div ref={ref} className="mt-12 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
      <Route label="Before EarlyJobs" steps={before} tone="muted" />
      <Route label="With EarlyJobs" steps={withEarlyJobs} tone="brand" />
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
          className="mt-8 inline-flex w-fit flex-col items-center gap-2 text-neutral-950"
        >
          <span className="flex h-11 items-center justify-center rounded-[6px] border border-black/10 bg-white px-4 text-[13px] font-medium transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-neutral-50">
            Discover How EarlyJobs Works
          </span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="hidden size-4 text-neutral-400 motion-safe:animate-bounce sm:block"
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

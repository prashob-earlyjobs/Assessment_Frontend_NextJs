"use client";

import { useRef, type ReactNode } from "react";
import { gsap, playMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  return (
    <section
      ref={root}
      id="section-1"
      className="snap-section relative flex min-h-dvh flex-1 flex-col justify-center overflow-hidden bg-neutral-950 ![min-height:100dvh]"
    >
      {children}
    </section>
  );
}

export function JourneyMotion({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      playMotion(sectionRef, (reduce) => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-check]");
        rows.forEach((row) => {
          const mark = row.querySelector<HTMLElement>("[data-mark]");
          const copy = row.querySelector<HTMLElement>("[data-copy]");
          if (reduce) {
            if (mark) gsap.set(mark, { scale: 1, opacity: 1 });
            if (copy) gsap.set(copy, { x: 0 });
            return;
          }
          if (mark) gsap.set(mark, { scale: 0, opacity: 0 });
        });

        if (reduce) return;

        const play = () => {
          rows.forEach((row, index) => {
            const mark = row.querySelector<HTMLElement>("[data-mark]");
            if (!mark) return;
            const delay = (index % 4) * 0.12;
            gsap.to(mark, {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              delay,
              ease: "back.out(1.7)",
              overwrite: true,
              force3D: true,
            });
          });
        };

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: play,
        });
      }),
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="section-3" className="snap-section border-t border-black/10 bg-white">
      {children}
    </section>
  );
}

export function AssembleList({ children, className }: { children: ReactNode; className?: string }) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () =>
      playMotion(listRef, (reduce) => {
        const list = listRef.current;
        if (!list) return;
        const cells = gsap.utils.toArray<HTMLElement>(":scope > li", list);
        if (reduce) {
          gsap.set(cells, { clearProps: "all" });
          return;
        }

        const scatter = [
          [-1.1, -0.9],
          [1.2, -0.7],
          [-0.9, 0.85],
          [1.05, 0.7],
          [0.15, 1.15],
        ] as const;

        list.style.overflow = "visible";

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: list,
            start: "top 78%",
            end: "top 32%",
            scrub: 0.65,
            onLeave: () => {
              list.style.overflow = "";
            },
            onEnterBack: () => {
              list.style.overflow = "visible";
            },
          },
        });

        cells.forEach((cell, index) => {
          const [sx, sy] = scatter[index] ?? [0, 0.8];
          timeline.fromTo(
            cell,
            {
              x: sx * 32,
              y: sy * 32,
              autoAlpha: 0.15,
              borderRadius: 10,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 14px 28px rgba(0,0,0,0.05)",
              force3D: true,
            },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              borderRadius: 0,
              boxShadow: "0 0 0 1px rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0)",
              ease: "none",
              force3D: true,
            },
            0,
          );
        });
      }),
    { scope: listRef },
  );

  return (
    <ul ref={listRef} className={className}>
      {children}
    </ul>
  );
}

export function DrawList({ children, className }: { children: ReactNode; className?: string }) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () =>
      playMotion(listRef, (reduce) => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
        if (reduce) {
          gsap.set(lines, { scaleX: 1, transformOrigin: "left center" });
          return;
        }
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: line.parentElement,
                start: "top 86%",
                end: "top 46%",
                scrub: 0.6,
              },
            },
          );
        });
      }),
    { scope: listRef },
  );

  return (
    <ul ref={listRef} className={className}>
      {children}
    </ul>
  );
}

export function CompareLanes({ children }: { children: ReactNode }) {
  const compare = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      playMotion(compare, (reduce) => {
        const traditional = gsap.utils.toArray<HTMLElement>("[data-lane='traditional'] li", compare.current);
        const network = gsap.utils.toArray<HTMLElement>("[data-lane='network'] li", compare.current);
        if (reduce) {
          gsap.set([...traditional, ...network], { autoAlpha: 1 });
          return;
        }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: compare.current,
            start: "top 78%",
            end: "top 38%",
            scrub: 0.6,
          },
        });
        traditional.forEach((row, index) => {
          timeline.fromTo(row, { autoAlpha: 0.28 }, { autoAlpha: 1, duration: 0.22, ease: "none" }, index * 0.18);
        });
        network.forEach((row, index) => {
          timeline.fromTo(
            row,
            { autoAlpha: 0.28 },
            { autoAlpha: 1, duration: 0.22, ease: "none" },
            0.85 + index * 0.18,
          );
        });
      }),
    { scope: compare },
  );

  return (
    <div ref={compare} className="mt-12 grid gap-10 sm:grid-cols-2">
      {children}
    </div>
  );
}

const joinNodes = [
  { x: "7%", y: "18%" },
  { x: "14%", y: "74%" },
  { x: "91%", y: "16%" },
  { x: "84%", y: "78%" },
  { x: "4%", y: "46%" },
  { x: "95%", y: "42%" },
];

export function JoinMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      playMotion(root, (reduce) => {
        if (reduce) return;
        gsap.fromTo(
          ".join-drift",
          { y: (index: number) => (index % 2 === 0 ? 14 : -14) },
          {
            y: (index: number) => (index % 2 === 0 ? -18 : 18),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }),
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="join"
      className="snap-section relative overflow-hidden border-t border-black/10 bg-white"
    >
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {joinNodes.map((node) => (
          <span key={node.x} className="absolute size-1.5" style={{ left: node.x, top: node.y }}>
            <span className="join-drift block size-1.5 rounded-full bg-brand will-change-transform" />
          </span>
        ))}
      </div>
    </section>
  );
}

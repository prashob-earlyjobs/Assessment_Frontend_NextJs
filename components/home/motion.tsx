"use client";

import { useRef, type ReactNode } from "react";
import { gsap, playMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const scatter = [
  [-1, -0.8],
  [1, -0.8],
  [-1.05, 0.95],
  [0, 1.05],
  [1.05, 0.95],
];

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      playMotion(root, (reduce) => {
        if (reduce) return;
        gsap.to(".hero-turn", {
          rotation: 8,
          ease: "none",
          transformOrigin: "50% 55%",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }),
    { scope: root },
  );

  return (
    <section ref={root} id="section-1" className="snap-section relative flex flex-1 flex-col justify-start">
      {children}
    </section>
  );
}

export function JourneyMotion({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      playMotion(sectionRef, (reduce) => {
        gsap.utils.toArray<HTMLElement>("[data-check]").forEach((row, index) => {
          const mark = row.querySelector<HTMLElement>("[data-mark]");
          const copy = row.querySelector<HTMLElement>("[data-copy]");
          const settle = () => {
            if (mark) gsap.set(mark, { scale: 1 });
            if (copy) gsap.set(copy, { x: 12 });
          };
          if (reduce) {
            settle();
            return;
          }
          const play = () => {
            const delay = (index % 4) * 0.11;
            if (mark) gsap.fromTo(mark, { scale: 0 }, { scale: 1, duration: 0.6, delay, ease: "back.out(1.6)" });
            if (copy) gsap.fromTo(copy, { x: 0 }, { x: 12, duration: 0.6, delay, ease: "power2.out" });
          };
          ScrollTrigger.create({
            trigger: row,
            start: "top 88%",
            once: true,
            onEnter: play,
          });
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
          gsap.set(list, { overflow: "hidden" });
          gsap.set(cells, { x: 0, y: 0, borderRadius: 0, boxShadow: "none" });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: list,
            start: "top 54%",
            end: "top 22%",
            scrub: true,
          },
        });
        timeline.eventCallback("onUpdate", () => {
          list.style.overflow = timeline.progress() > 0.98 ? "hidden" : "visible";
        });
        cells.forEach((cell, index) => {
          const [x, y] = scatter[index] ?? [0, 0];
          timeline.fromTo(
            cell,
            {
              x: x * 36,
              y: y * 36,
              borderRadius: 10,
              boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.05)",
            },
            {
              x: 0,
              y: 0,
              borderRadius: 0,
              boxShadow: "0 0 0 1px rgba(0, 0, 0, 0), 0 16px 32px rgba(0, 0, 0, 0)",
              duration: 1,
              ease: "none",
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
          gsap.set(lines, { width: "100%" });
          return;
        }
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { width: "0%" },
            {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: line.parentElement,
                start: "top 86%",
                end: "top 46%",
                scrub: true,
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
            scrub: true,
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

export function ImpactSketch({ children }: { children: ReactNode }) {
  const diagram = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      playMotion(diagram, (reduce) => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-draw]", diagram.current);
        if (reduce) {
          gsap.set(lines, { scaleX: 1, scaleY: 1 });
          return;
        }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: diagram.current,
            start: "top 90%",
            end: "top 55%",
            scrub: true,
          },
        });
        lines.forEach((line, index) => {
          const vertical = line.dataset.draw === "down";
          timeline.fromTo(
            line,
            vertical ? { scaleY: 0 } : { scaleX: 0 },
            {
              scaleY: 1,
              scaleX: 1,
              duration: 0.35,
              ease: "none",
              transformOrigin: vertical ? "center top" : "center center",
            },
            index * 0.28,
          );
        });
      }),
    { scope: diagram },
  );

  return (
    <div ref={diagram} className="flex flex-col items-center text-center text-sm">
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
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
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

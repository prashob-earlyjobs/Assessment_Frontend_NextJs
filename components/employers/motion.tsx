"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { gsap, playMotion, revealCards, useGSAP } from "@/lib/gsap";

const accent = "#608cbe";

function useMotion(run: (root: RefObject<HTMLDivElement | null>, reduce: boolean) => void) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => playMotion(root, (reduce) => run(root, reduce)), { scope: root });
  return root;
}

function slideIn(selector: string, trigger: HTMLElement | null, reduce: boolean) {
  if (reduce || !trigger) return;
  gsap.from(selector, {
    y: 18,
    duration: 0.7,
    stagger: 0.08,
    ease: "power3.out",
    immediateRender: false,
    clearProps: "transform",
    scrollTrigger: {
      trigger,
      start: "top 80%",
      once: true,
    },
  });
}

export function HeroMotion({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function CompareMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => {
    slideIn(".compare-col", scope.current, reduce);

    const circles = gsap.utils.toArray<HTMLElement>(".attach-circle", scope.current);
    if (!circles.length) return;

    if (reduce) {
      gsap.set(circles, { x: 0, y: 0 });
      return;
    }

    const pair = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 78%",
        end: "top 22%",
        scrub: 0.45,
      },
    });

    pair.fromTo(circles[0], { x: -64, y: -32 }, { x: 0, y: 0, duration: 1, ease: "none" }, 0);
    if (circles[1]) {
      pair.fromTo(circles[1], { x: 48, y: 28 }, { x: 0, y: 0, duration: 1, ease: "none" }, 0);
    }
  });

  return <div ref={root} className="relative">{children}</div>;
}

export function JourneyMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => {
    gsap.set(".journey-line", { scaleY: reduce ? 1 : 0, transformOrigin: "top center" });
    if (reduce) {
      gsap.set(".flow-mark", { backgroundColor: accent });
      gsap.set(".step-index", { color: accent });
      return;
    }

    gsap.set(".flow-mark", { backgroundColor: "#e5e5e5" });
    gsap.set(".step-index", { color: "#a3a3a3" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 72%",
        end: "bottom 55%",
        scrub: 0.6,
      },
    });

    timeline.to(".journey-line", { scaleY: 1, ease: "none", duration: 1 }, 0);

    gsap.utils.toArray<HTMLElement>(".flow-mark").forEach((mark, index, marks) => {
      timeline.to(mark, { backgroundColor: accent, duration: 0.08, ease: "none" }, index / marks.length);
    });

    gsap.utils.toArray<HTMLElement>(".step-index").forEach((step, index, items) => {
      timeline.to(step, { color: accent, duration: 0.08, ease: "none" }, index / items.length);
    });
  });

  return <div ref={root}>{children}</div>;
}

export function OutcomesMotion({ children }: { children: ReactNode }) {
  const root = useMotion((_, reduce) => revealCards(".outcome-card", reduce));
  return <div ref={root}>{children}</div>;
}

export function StagesMotion({ children }: { children: ReactNode }) {
  const root = useMotion((_, reduce) => revealCards(".stage-item", reduce));
  return <div ref={root}>{children}</div>;
}

export function IndustriesMotion({ children }: { children: ReactNode }) {
  const root = useMotion((_, reduce) => revealCards(".industry-cell", reduce));
  return <div ref={root}>{children}</div>;
}

export function StoriesMotion({ children }: { children: ReactNode }) {
  const root = useMotion((_, reduce) => revealCards(".story-card", reduce));
  return <div ref={root}>{children}</div>;
}

export function FaqMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => slideIn(".faq-row", scope.current, reduce));
  return <div ref={root}>{children}</div>;
}

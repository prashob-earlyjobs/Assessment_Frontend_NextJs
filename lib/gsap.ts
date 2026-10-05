"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export function playMotion(
  scope: RefObject<HTMLElement | null>,
  run: (reduce: boolean) => void,
) {
  const mm = gsap.matchMedia();
  mm.add(
    "(min-width: 0px)",
    () => {
      run(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    },
    scope,
  );
  return () => mm.revert();
}

export function revealCards(selector: string, reduce: boolean) {
  if (reduce) return;
  ScrollTrigger.batch(selector, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { y: 18 },
        {
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
          overwrite: true,
          clearProps: "transform",
        },
      );
    },
  });
}

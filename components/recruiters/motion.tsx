"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap, playMotion, revealCards, ScrollTrigger, useGSAP } from "@/lib/gsap";

const scramble = [
  { x: -72, y: 46, rotation: -8 },
  { x: 64, y: -34, rotation: 6 },
  { x: 48, y: 54, rotation: 9 },
  { x: -56, y: -28, rotation: -6 },
  { x: 70, y: 32, rotation: 7 },
  { x: -40, y: 50, rotation: -9 },
] as const;

function useMotion(run: (root: RefObject<HTMLDivElement | null>, reduce: boolean) => void) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => playMotion(root, (reduce) => run(root, reduce)), { scope: root });
  return root;
}

export function WhyMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => {
    const items = gsap.utils.toArray<HTMLElement>(".why-card");
    gsap.set(".success-bg", { scaleX: reduce ? 1 : 0, transformOrigin: "left center" });
    if (reduce) {
      gsap.set(items, { x: 0, y: 0, rotation: 0 });
      return;
    }

    gsap.to(".success-bg", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".success-word",
        start: "top 78%",
        end: "top 42%",
        scrub: 0.4,
      },
    });

    const compact = window.innerWidth < 640;
    const scale = compact ? 0.4 : 1;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 82%",
        end: "top 28%",
        scrub: 0.6,
      },
    });

    items.forEach((card, index) => {
      const from = scramble[index];
      timeline.fromTo(
        card,
        {
          x: from.x * scale,
          y: from.y * scale,
          rotation: from.rotation * scale,
        },
        { x: 0, y: 0, rotation: 0, ease: "power2.out", duration: 0.85 },
        index * 0.05,
      );
    });
  });

  return <div ref={root}>{children}</div>;
}

export function CompareMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => {
    if (reduce) return;
    gsap.from(".compare-col", {
      y: 18,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      immediateRender: false,
      clearProps: "transform",
      scrollTrigger: {
        trigger: scope.current,
        start: "top 78%",
        once: true,
      },
    });
  });

  return <div ref={root}>{children}</div>;
}

export function JourneyMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => {
    gsap.set(".journey-line", {
      scaleY: reduce ? 1 : 0,
      transformOrigin: "top center",
    });

    if (reduce) {
      gsap.set(".flow-mark", { backgroundColor: "#ea6a4e" });
      gsap.set(".step-index", { color: "#ea6a4e" });
      return;
    }

    gsap.set(".flow-mark", { backgroundColor: "#e5e5e5" });
    gsap.set(".step-index", { color: "#a3a3a3" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 72%",
        end: "bottom 50%",
        scrub: 0.6,
      },
    });

    timeline.to(".journey-line", { scaleY: 1, ease: "none", duration: 1 }, 0);

    gsap.utils.toArray<HTMLElement>(".flow-mark").forEach((mark, index, marks) => {
      timeline.to(
        mark,
        { backgroundColor: "#ea6a4e", duration: 0.08, ease: "none" },
        index / marks.length,
      );
    });

    gsap.utils.toArray<HTMLElement>(".step-index").forEach((step, index, items) => {
      timeline.to(
        step,
        { color: "#ea6a4e", duration: 0.08, ease: "none" },
        index / items.length,
      );
    });
  });

  useEffect(() => {
    const revealJourney = () => {
      if (window.location.hash !== "#how-it-works") return;
      document.getElementById("how-it-works")?.scrollIntoView({ block: "start" });
    };
    revealJourney();
    window.addEventListener("hashchange", revealJourney);
    return () => window.removeEventListener("hashchange", revealJourney);
  }, []);

  return <div ref={root}>{children}</div>;
}

export function ExperienceMotion({ children }: { children: ReactNode }) {
  const root = useMotion((_, reduce) => {
    gsap.set(".experience-fill", { clipPath: "inset(0 100% 0 0)" });
    if (!reduce) {
      gsap.utils.toArray<HTMLElement>(".experience-fill").forEach((fill) => {
        gsap.to(fill, {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: fill,
            start: "top 85%",
            end: "top 52%",
            scrub: 0.35,
          },
        });
      });
    }
    revealCards(".experience-card", reduce);
  });

  return <div ref={root}>{children}</div>;
}

function roundedBorder(left: number, top: number, right: number, bottom: number) {
  const radius = Math.min(12, (right - left) / 2, (bottom - top) / 2);
  return `M ${left + radius} ${top} H ${right - radius} A ${radius} ${radius} 0 0 1 ${right} ${top + radius} V ${bottom - radius} A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom} H ${left + radius} A ${radius} ${radius} 0 0 1 ${left} ${bottom - radius} V ${top + radius} A ${radius} ${radius} 0 0 1 ${left + radius} ${top} `;
}

function linkTiles(host: HTMLElement) {
  const svg = host.querySelector(".ai-links");
  const path = host.querySelector(".ai-link");
  const cards = gsap.utils.toArray<HTMLElement>(".ai-card", host);
  if (!(svg instanceof SVGSVGElement) || !(path instanceof SVGPathElement) || cards.length < 2) return 0;

  const box = host.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  const points = cards.map((card) => {
    const rect = card.getBoundingClientRect();
    return {
      left: rect.left - box.left,
      right: rect.right - box.left,
      top: rect.top - box.top,
      bottom: rect.bottom - box.top,
      cx: rect.left + rect.width / 2 - box.left,
      cy: rect.top + rect.height / 2 - box.top,
    };
  });

  let commands = roundedBorder(points[0].left, points[0].top, points[0].right, points[0].bottom);
  for (let index = 0; index < points.length - 1; index++) {
    const from = points[index];
    const to = points[index + 1];
    if (Math.abs(from.cy - to.cy) < 12) {
      commands += `M ${from.right} ${from.cy} L ${to.left} ${to.cy} `;
    } else {
      const mid = (from.bottom + to.top) / 2;
      commands += `M ${from.cx} ${from.bottom} L ${from.cx} ${mid} L ${to.cx} ${mid} L ${to.cx} ${to.top} `;
    }
    commands += roundedBorder(to.left, to.top, to.right, to.bottom);
  }

  path.setAttribute("d", commands);
  return path.getTotalLength();
}

export function AiMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => {
    if (!reduce) {
      gsap.to(".ai-drift", {
        y: (index: number) => (index % 2 === 0 ? -10 : 8),
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.16,
      });
    }

    const row = scope.current?.querySelector(".ai-row");
    const path = row?.querySelector(".ai-link");
    if (!(row instanceof HTMLElement) || !(path instanceof SVGPathElement)) return;

    let length = linkTiles(row);
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = reduce ? "0" : `${length}`;
    if (reduce) return;

    ScrollTrigger.create({
      trigger: row,
      start: "top 80%",
      end: "bottom 60%",
      scrub: 0.35,
      onRefresh: () => {
        length = linkTiles(row);
        path.style.strokeDasharray = `${length}`;
      },
      onUpdate: (self) => {
        path.style.strokeDashoffset = `${length * (1 - self.progress)}`;
      },
    });
  });

  return <div ref={root}>{children}</div>;
}

export function StoriesMotion({ children }: { children: ReactNode }) {
  const root = useMotion((_, reduce) => revealCards(".story-card", reduce));
  return <div ref={root}>{children}</div>;
}

export function CtaMotion({ children }: { children: ReactNode }) {
  const root = useMotion((scope, reduce) => {
    if (reduce) return;
    gsap.from(".cta-line", {
      y: 16,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: scope.current,
        start: "top 80%",
        once: true,
      },
    });
    gsap.fromTo(
      ".cta-drift",
      { y: (index: number) => (index % 2 === 0 ? 14 : -14) },
      {
        y: (index: number) => (index % 2 === 0 ? -18 : 18),
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  return <div ref={root}>{children}</div>;
}

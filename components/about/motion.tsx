"use client";

import { useRef, type ReactNode } from "react";
import { gsap, playMotion, useGSAP } from "@/lib/gsap";

export function AboutJourneyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      playMotion(root, (reduce) => {
        const line = root.current?.querySelector<HTMLElement>(".about-line");
        const ticks = gsap.utils.toArray<HTMLElement>(".about-tick");
        const years = gsap.utils.toArray<HTMLElement>(".about-year");

        const markReached = (on: boolean) => {
          ticks.forEach((tick, index) => {
            tick.classList.toggle("is-on", on);
            years[index]?.classList.toggle("is-on", on);
          });
        };

        gsap.set(".about-line", { scaleY: reduce ? 1 : 0, transformOrigin: "top center" });
        if (reduce) {
          markReached(true);
          return;
        }

        markReached(false);
        gsap.to(".about-line", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current?.querySelector("ol") ?? root.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.5,
            onUpdate: () => {
              if (!line) return;
              const tip = line.getBoundingClientRect().bottom;
              ticks.forEach((tick, index) => {
                const on = tick.getBoundingClientRect().top <= tip + 2;
                tick.classList.toggle("is-on", on);
                years[index]?.classList.toggle("is-on", on);
              });
            },
          },
        });
      }),
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}

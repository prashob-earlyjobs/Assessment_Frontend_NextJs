"use client";

import { useRef, type ReactNode } from "react";
import { gsap, playMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ParallaxString({
  children,
  className,
  speed = 0.06,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () =>
      playMotion(ref, (reduce) => {
        const el = ref.current;
        if (!el || reduce) return;
        const shift = () =>
          gsap.utils.clamp(-16, 16, (window.innerHeight * 0.42 - el.getBoundingClientRect().top) * speed);
        const apply = () => gsap.set(el, { y: shift() });
        apply();
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onRefresh: apply,
          onUpdate: apply,
        });
      }),
    { scope: ref, dependencies: [speed] },
  );

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

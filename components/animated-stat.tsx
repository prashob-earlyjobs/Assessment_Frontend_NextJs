"use client";

import { useEffect, useState } from "react";

/**
 * The server HTML and the first client render show the final value.
 * Counting runs only after hydration, and only when motion is allowed.
 */
export function AnimatedStat({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    const match = value.match(/^([\d,]+)(\+)?$/);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!match || reduce) {
      setText(value);
      return;
    }

    const target = Number(match[1].replace(/,/g, ""));
    const suffix = match[2] ?? "";
    if (!Number.isFinite(target)) {
      setText(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setText(`${current.toLocaleString("en-IN")}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    setText(`0${suffix}`);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className={className}>{text}</span>;
}

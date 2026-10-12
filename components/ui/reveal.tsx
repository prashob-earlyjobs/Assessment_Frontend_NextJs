"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for sequenced reveals */
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

/** Lightweight scroll reveal with reduced-motion support. Above-fold stays visible. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.classList.add("is-in");
      return;
    }

    const show = () => {
      node.classList.remove("is-pending");
      node.classList.add("is-in");
    };

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    const alreadyVisible = rect.top < vh * 0.92 && rect.bottom > 24;

    if (alreadyVisible) {
      if (delay) {
        window.setTimeout(show, delay);
      } else {
        show();
      }
      return;
    }

    node.classList.add("is-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        window.setTimeout(show, delay);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`.trim()}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

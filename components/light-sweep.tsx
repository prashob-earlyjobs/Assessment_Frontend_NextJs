"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t ** 3;

function cycle(frame: number, offset: number, enter: number, hold: number, exit: number, pause: number) {
  if (frame < offset) return 0;
  const total = enter + hold + exit + pause;
  const t = (frame - offset) % total;
  if (t < enter) return easeOut(t / enter);
  if (t < enter + hold) return 1;
  if (t < enter + hold + exit) return 1 - easeIn((t - enter - hold) / exit);
  return 0;
}

function paint(el: HTMLElement, css: string) {
  el.style.background = css;
  el.style.webkitBackgroundClip = "text";
  el.style.backgroundClip = "text";
  el.style.webkitTextFillColor = "transparent";
}

export function LightSweep({
  text,
  className,
  as: Tag = "span",
  base = "#171717",
  highlight = "#ffffff",
}: {
  text: string;
  className?: string;
  as?: ElementType;
  base?: string;
  highlight?: string;
}) {
  const chars = useRef<HTMLSpanElement[]>([]);
  const words = text.split(" ");

  useEffect(() => {
    const nodes = chars.current.filter(Boolean);
    if (nodes.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stagger = 8;
    const enter = 84;
    const hold = 20;
    const exit = 58;
    const pause = 36;
    let frame = 0;
    let raf = 0;

    const tick = () => {
      frame += 0.4;
      nodes.forEach((node, index) => {
        const progress = cycle(frame, index * stagger, enter, hold, exit, pause);
        const mid = progress * 130 - 15;
        paint(
          node,
          `linear-gradient(90deg, ${base} 0%, ${base} ${(mid - 18).toFixed(1)}%, ${highlight} ${mid.toFixed(1)}%, ${base} ${(mid + 18).toFixed(1)}%, ${base} 100%)`,
        );
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, base, highlight]);

  let index = 0;

  return (
    <Tag className={className ? `relative inline ${className}` : "relative inline"}>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>
      <span aria-hidden="true">
      {words.map((word, wordIndex) => {
        const letters: ReactNode[] = word.split("").map((char) => {
          const charIndex = index;
          index += 1;
          return (
            <span
              key={charIndex}
              ref={(node) => {
                if (node) chars.current[charIndex] = node;
              }}
              className="inline-block"
            >
              {char}
            </span>
          );
        });
        return (
          <span key={`${word}-${wordIndex}`}>
            <span className="inline-flex whitespace-nowrap">{letters}</span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        );
      })}
      </span>
    </Tag>
  );
}

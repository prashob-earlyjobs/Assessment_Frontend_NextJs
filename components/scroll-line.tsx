"use client";

import { useLayoutEffect, useRef } from "react";

function sideInset(width: number) {
  const pad = width >= 640 ? 32 : 20;
  const contentLeft = Math.max(0, (width - 1152) / 2);
  const textLeft = contentLeft + pad;
  return Math.max(pad * 0.55, Math.min(textLeft - 24, contentLeft + 16));
}

type Mark = { length: number; scroll: number };

export function ScrollLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGPolygonElement>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const mask = maskRef.current;
    const head = headRef.current;
    const main = svg?.parentElement;
    if (!svg || !path || !mask || !head || !(main instanceof HTMLElement)) return;

    let marks: Mark[] = [];
    let total = 0;
    let raf = 0;
    let layoutKey = "";

    const measure = () => {
      const sections = [...main.querySelectorAll(":scope > section")] as HTMLElement[];
      if (sections.length < 2) return;

      const width = main.clientWidth;
      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const header = document.querySelector("header");
      const headerH = header instanceof HTMLElement ? header.offsetHeight : 0;
      const inset = sideInset(width);
      const right = width - inset;
      const left = inset;

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const anchor = Math.round(window.innerHeight * 0.38);
      const sideX = (index: number) => (index % 2 === 0 ? right : left);
      const localY = (scroll: number) => scroll + anchor - mainTop;
      const scrolls = sections.map((section) =>
        Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerH),
      );
      scrolls.push(maxScroll);

      const points: { x: number; y: number; scroll: number; linear?: boolean }[] = [
        { x: right, y: 16, scroll: scrolls[0] },
      ];
      const origin = document.getElementById("hero-network");
      if (origin) {
        const box = origin.getBoundingClientRect();
        const mainBox = main.getBoundingClientRect();
        points[0] = {
          x: box.left + box.width / 2 - mainBox.left,
          y: box.top + box.height * 0.82 - mainBox.top,
          scroll: scrolls[0],
        };
      }

      sections.forEach((section, index) => {
        const start = scrolls[index];
        const end = scrolls[index + 1];
        const span = end - start;
        const sameSide = index === sections.length - 1;
        points.push({
          x: sideX(index),
          y: localY(start + span * 0.58),
          scroll: start + span * 0.58,
        });
        points.push({
          x: sameSide ? sideX(index) : sideX(index + 1),
          y: localY(end),
          scroll: end,
        });
      });

      const lengths = [0];
      let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      let length = 0;
      for (let index = 1; index < points.length; index += 1) {
        const from = points[index - 1];
        const to = points[index];
        const dy = to.y - from.y;
        const segment = to.linear
          ? ` L ${to.x.toFixed(1)} ${to.y.toFixed(1)}`
          : ` C ${from.x.toFixed(1)} ${(from.y + dy * 0.65).toFixed(1)}, ${to.x.toFixed(1)} ${(to.y - dy * 0.35).toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
        path.setAttribute("d", `M ${from.x.toFixed(1)} ${from.y.toFixed(1)}${segment}`);
        length += path.getTotalLength();
        lengths.push(length);
        d += segment;
      }

      total = length;
      path.setAttribute("d", d);
      mask.setAttribute("d", d);

      const height = Math.max(main.offsetHeight, points[points.length - 1]?.y ?? 0) + 40;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.style.height = `${height}px`;
      const maskEl = svg.querySelector("mask");
      maskEl?.setAttribute("x", "0");
      maskEl?.setAttribute("y", "0");
      maskEl?.setAttribute("width", `${width}`);
      maskEl?.setAttribute("height", `${height}`);

      marks = points.map((point, index) => ({
        length: lengths[index] ?? total,
        scroll: point.scroll,
      }));
    };

    const draw = () => {
      raf = 0;
      if (marks.length < 2) return;
      const y = window.scrollY;
      let index = 0;
      while (index < marks.length - 2 && y >= marks[index + 1].scroll) index += 1;
      const start = marks[index];
      const end = marks[index + 1];
      const span = end.scroll - start.scroll || 1;
      const t = Math.min(1, Math.max(0, (y - start.scroll) / span));
      const drawn = start.length + (end.length - start.length) * t;
      const stroke = Math.max(0, drawn - 12);
      mask.style.strokeDasharray = `${total}`;
      mask.style.strokeDashoffset = `${total - stroke}`;

      const tip = path.getPointAtLength(Math.min(drawn, total));
      const back = path.getPointAtLength(Math.max(0, drawn - 10));
      const angle = (Math.atan2(tip.y - back.y, tip.x - back.x) * 180) / Math.PI;
      head.setAttribute(
        "transform",
        `translate(${tip.x.toFixed(2)} ${tip.y.toFixed(2)}) rotate(${Number.isFinite(angle) ? angle : 90})`,
      );
      head.style.opacity = "1";
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(draw);
    };
    const onResize = () => {
      const sections = main.querySelectorAll(":scope > section");
      const key = `${main.clientWidth}x${sections.length}x${window.innerHeight}x${main.offsetHeight}`;
      if (key === layoutKey && marks.length > 1) {
        draw();
        return;
      }
      layoutKey = key;
      measure();
      draw();
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const observer = new ResizeObserver(onResize);
    observer.observe(main);
    const origin = document.getElementById("hero-network");
    const onPop = () => {
      layoutKey = "";
      onResize();
    };
    origin?.addEventListener("animationend", onPop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      origin?.removeEventListener("animationend", onPop);
      observer.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full overflow-visible"
    >
      <defs>
        <mask id="scroll-line-mask" maskUnits="userSpaceOnUse">
          <path
            ref={maskRef}
            fill="none"
            stroke="white"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      <path
        ref={pathRef}
        fill="none"
        stroke="#ea6a4e"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 14"
        mask="url(#scroll-line-mask)"
      />
      <polygon ref={headRef} points="0,-8 20,0 0,8" fill="#ea6a4e" className="hidden sm:block" />
    </svg>
  );
}

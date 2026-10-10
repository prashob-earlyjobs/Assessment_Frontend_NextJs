"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function EcosystemSvg() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [16, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="mt-14 w-full overflow-x-auto">
      <svg
        viewBox="0 0 640 520"
        className="mx-auto h-auto w-full min-w-[20rem] max-w-2xl"
        role="img"
        aria-label="EarlyJobs ecosystem: employers to mandates through EarlyJobs AI and network to recruiters, agencies, women recruiters, talent, and joinings"
      >
        <Node x={260} y={12} w={120} h={36} label="EMPLOYERS" />
        <Connector x1={320} y1={48} x2={320} y2={72} progress={scrollYProgress} range={[0, 0.15]} />
        <Node x={230} y={76} w={180} h={36} label="HIRING MANDATES" />
        <Connector x1={320} y1={112} x2={320} y2={148} progress={scrollYProgress} range={[0.1, 0.25]} />
        <Node x={200} y={152} w={240} h={64} label="EARLYJOBS" sub="AI + NETWORK" accent />
        <Connector x1={240} y1={216} x2={120} y2={260} progress={scrollYProgress} range={[0.25, 0.4]} />
        <Connector x1={320} y1={216} x2={320} y2={260} progress={scrollYProgress} range={[0.25, 0.4]} />
        <Connector x1={400} y1={216} x2={500} y2={260} progress={scrollYProgress} range={[0.25, 0.4]} />
        <Node x={40} y={264} w={160} h={52} label="WOMEN" sub="RECRUITERS" />
        <Node x={240} y={264} w={160} h={52} label="AGENCIES" />
        <Node x={440} y={264} w={160} h={52} label="RECRUITERS" />
        <Connector x1={120} y1={316} x2={320} y2={360} progress={scrollYProgress} range={[0.4, 0.6]} />
        <Connector x1={320} y1={316} x2={320} y2={360} progress={scrollYProgress} range={[0.4, 0.6]} />
        <Connector x1={520} y1={316} x2={320} y2={360} progress={scrollYProgress} range={[0.4, 0.6]} />
        <Node x={260} y={364} w={120} h={36} label="TALENT" />
        <Connector x1={320} y1={400} x2={320} y2={436} progress={scrollYProgress} range={[0.6, 0.8]} />
        <Node x={250} y={440} w={140} h={36} label="JOININGS" accent />
      </svg>
    </motion.div>
  );
}

function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={accent ? "#FFF7ED" : "#FFFFFF"}
        stroke="#0A0A0A"
        strokeWidth="1"
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#0A0A0A"
        letterSpacing="0.06em"
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontSize="10"
          fill="#525252"
          letterSpacing="0.08em"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Connector({
  x1,
  y1,
  x2,
  y2,
  progress,
  range,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const pathLength = useTransform(progress, range, [0, 1]);
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#F97316"
      strokeWidth="1.5"
      style={{ pathLength }}
    />
  );
}

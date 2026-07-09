"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { GccPageContent, GccVariant } from "./types";

type GccHeroProps = {
  content: GccPageContent;
};

const TRUST_BAR = ({ items }: { items: string[] }) => (
  <div className="relative border-t border-white/10 bg-black/20">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Trusted for</span>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const HeroCopy = ({ content, light }: { content: GccPageContent; light?: boolean }) => (
  <div>
    <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#F08504]`}>
      {content.hero.eyebrow}
    </p>
    <h1
      className={`max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
        light ? "text-slate-900" : "text-white"
      }`}
    >
      {content.hero.headline}
    </h1>
    <p className={`mt-5 max-w-2xl text-lg font-medium sm:text-xl ${light ? "text-slate-700" : "text-slate-200"}`}>
      {content.hero.subheadline}
    </p>
    <p className={`mt-4 max-w-2xl text-base leading-relaxed ${light ? "text-slate-600" : "text-slate-400"}`}>
      {content.hero.paragraph}
    </p>
    <div className="mt-8 flex flex-wrap gap-4">
      <a
        href="tel:+918217527926"
        className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        {content.hero.primaryCta}
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href="mailto:info@earlyjobs.in"
        className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition ${
          light
            ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
            : "border-white/20 bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        {content.hero.secondaryCta}
      </a>
    </div>
  </div>
);

const PillarVisual = () => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Hiring Infrastructure Flow</p>
    <div className="mt-6 space-y-3">
      {["Global Enterprise", "India GCC", "Recruiter Network", "Human + AI Layer", "Talent Pipeline", "Hiring Dashboard"].map(
        (step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F08504]/15 text-xs font-bold text-[#F08504]">
              {index + 1}
            </div>
            <div className="flex-1 rounded-xl border border-white/10 bg-[#0A0F10]/60 px-4 py-2.5 text-sm font-medium">
              {step}
            </div>
          </div>
        )
      )}
    </div>
  </div>
);

const ExpansionVisual = () => (
  <div className="rounded-3xl border border-[#1e3a8a]/20 bg-gradient-to-br from-[#1e3a8a]/10 to-white p-6 lg:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1e3a8a]">GCC Build Roadmap</p>
    <div className="relative mt-8 space-y-0">
      {[
        "Business Strategy",
        "Location Selection",
        "Talent & Hiring Strategy",
        "Recruitment Execution",
        "Scale & Optimize",
      ].map((step, index) => (
        <div key={step} className="relative flex gap-4 pb-8 last:pb-0">
          {index < 4 && <div className="absolute left-[18px] top-10 h-full w-0.5 bg-[#1e3a8a]/20" />}
          <div
            className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              index >= 2 ? "bg-[#F08504] text-white" : "bg-[#1e3a8a] text-white"
            }`}
          >
            {index + 1}
          </div>
          <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${index >= 2 ? "border-[#F08504]/30 bg-orange-50 text-orange-900" : "border-slate-200 bg-white text-slate-800"}`}>
            {step}
            {index === 2 && <span className="mt-1 block text-xs font-normal text-[#F08504]">EarlyJobs partners from here</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PartnerVisual = () => (
  <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#1e3a8a]/40 to-[#0A0F10] p-6 lg:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Partner Ecosystem</p>
    <div className="mt-8 flex flex-col items-center gap-3">
      {["Your Enterprise", "Recruitment Lead", "Dedicated Recruiter Pod", "AI Hiring Layer", "Hiring Dashboard", "Successful Joins"].map(
        (node, index) => (
          <div key={node} className="w-full">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white">
              {node}
            </div>
            {index < 5 && <div className="mx-auto h-4 w-0.5 bg-[#F08504]/60" />}
          </div>
        )
      )}
    </div>
  </div>
);

const OffshoreVisual = () => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Offshore Center Evolution</p>
    <div className="mt-6 flex flex-col gap-2">
      {["Traditional BPO", "Shared Services", "Engineering Centers", "Innovation Hubs", "AI & Product Centers"].map(
        (stage, index) => (
          <div
            key={stage}
            className={`rounded-xl px-4 py-3 text-sm font-semibold ${
              index === 4
                ? "bg-[#F08504] text-white"
                : index >= 2
                  ? "border border-[#F08504]/30 bg-[#F08504]/10 text-orange-100"
                  : "border border-white/10 bg-[#0A0F10]/40 text-slate-400"
            }`}
          >
            {stage}
          </div>
        )
      )}
    </div>
  </div>
);

const TalentVisual = () => (
  <div className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 lg:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">Talent Ecosystem</p>
    <div className="relative mx-auto mt-8 flex h-56 w-56 items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-violet-200" />
      <div className="absolute inset-6 rounded-full border border-violet-300/60 bg-violet-50" />
      <div className="absolute inset-14 rounded-full border border-[#F08504]/40 bg-orange-50" />
      <div className="relative z-10 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-600">TA Engine</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">Human + AI</p>
      </div>
      {["Employer Brand", "Talent Intel", "Recruiter Net", "Hiring Ops"].map((label, i) => {
        const positions = ["-top-2 left-1/2 -translate-x-1/2", "top-1/2 -right-2 -translate-y-1/2", "bottom-0 left-1/2 -translate-x-1/2", "top-1/2 -left-2 -translate-y-1/2"];
        return (
          <span key={label} className={`absolute ${positions[i]} rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 shadow-sm`}>
            {label}
          </span>
        );
      })}
    </div>
  </div>
);

const PanIndiaVisual = () => (
  <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 lg:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F08504]">Pan-India Talent Hubs</p>
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {["Bengaluru", "Hyderabad", "Pune", "Chennai", "NCR", "Mumbai", "Kolkata", "Ahmedabad", "Tier 2"].map((city) => (
        <div key={city} className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-3 py-3 shadow-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#F08504]" />
          <span className="text-xs font-semibold text-slate-700">{city}</span>
        </div>
      ))}
    </div>
    <p className="mt-5 text-center text-xs font-medium text-slate-500">One partner · Multiple cities · Unified hiring ops</p>
  </div>
);

const VARIANT_STYLES: Record<
  GccVariant,
  { shell: string; grid: string; light?: boolean }
> = {
  pillar: {
    shell: "bg-[#0A0F10] text-white",
    grid: "lg:grid-cols-[1.1fr_0.9fr]",
  },
  expansion: {
    shell: "bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900",
    grid: "lg:grid-cols-[1fr_1fr]",
    light: true,
  },
  partner: {
    shell: "bg-[#0A0F10] text-white",
    grid: "lg:grid-cols-[1fr_0.85fr]",
  },
  offshore: {
    shell: "bg-gradient-to-br from-[#0A0F10] via-[#111827] to-[#1e3a8a]/30 text-white",
    grid: "lg:grid-cols-[1.05fr_0.95fr]",
  },
  talent: {
    shell: "bg-gradient-to-b from-violet-50/80 via-white to-white text-slate-900",
    grid: "lg:grid-cols-[1fr_0.9fr]",
    light: true,
  },
  "pan-india": {
    shell: "bg-gradient-to-br from-[#0A0F10] to-[#1a1410] text-white",
    grid: "lg:grid-cols-[1fr_1fr]",
  },
};

const VARIANT_VISUAL: Record<GccVariant, ReactNode> = {
  pillar: <PillarVisual />,
  expansion: <ExpansionVisual />,
  partner: <PartnerVisual />,
  offshore: <OffshoreVisual />,
  talent: <TalentVisual />,
  "pan-india": <PanIndiaVisual />,
};

const GccHero = ({ content }: GccHeroProps) => {
  const styles = VARIANT_STYLES[content.variant];
  const isLight = styles.light;

  return (
    <section className={`relative overflow-hidden ${styles.shell}`}>
      {!isLight && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,133,4,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(30,58,138,0.35),transparent_50%)]" />
      )}
      {content.variant === "partner" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(30,58,138,0.45),transparent_55%)]" />
      )}
      <div className={`relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:gap-16 lg:px-8 lg:py-24 ${styles.grid}`}>
        <HeroCopy content={content} light={isLight} />
        {VARIANT_VISUAL[content.variant]}
      </div>
      {!isLight && <TRUST_BAR items={content.hero.trustBar} />}
      {isLight && (
        <div className="border-t border-slate-200 bg-white/80">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Trusted for</span>
            {content.hero.trustBar.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GccHero;

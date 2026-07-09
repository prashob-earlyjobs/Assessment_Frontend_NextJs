"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  Handshake,
  MapPin,
  Network,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import GccHero from "./GccHero";
import type { GccPageContent, GccVariant } from "./types";

const RELATED_PAGES = [
  { href: "/gcc-hiring-solutions", label: "GCC Hiring Solutions" },
  { href: "/build-gcc-india", label: "Build GCC in India" },
  { href: "/gcc-recruitment-partner", label: "GCC Recruitment Partner" },
  { href: "/offshore-capability-center-hiring", label: "Offshore Capability Center Hiring" },
  { href: "/gcc-talent-acquisition", label: "GCC Talent Acquisition" },
  { href: "/india-gcc-hiring-services", label: "India GCC Hiring Services" },
];

type SectionId =
  | "maturity"
  | "editorial"
  | "framework"
  | "challenges"
  | "comparison"
  | "value"
  | "services"
  | "categories"
  | "timeline"
  | "differentiators"
  | "meta"
  | "success"
  | "governance"
  | "faq"
  | "cta"
  | "related";

const SECTION_ORDER: Record<GccVariant, SectionId[]> = {
  pillar: ["editorial", "challenges", "comparison", "value", "categories", "timeline", "differentiators", "meta", "success", "faq", "cta", "related"],
  expansion: ["editorial", "framework", "challenges", "comparison", "value", "timeline", "differentiators", "success", "faq", "cta", "related"],
  partner: ["comparison", "editorial", "value", "services", "timeline", "differentiators", "meta", "success", "faq", "cta", "related"],
  offshore: ["editorial", "challenges", "framework", "services", "governance", "differentiators", "success", "faq", "cta", "related"],
  talent: ["maturity", "editorial", "challenges", "framework", "value", "services", "comparison", "differentiators", "faq", "cta", "related"],
  "pan-india": ["editorial", "categories", "challenges", "comparison", "value", "services", "timeline", "governance", "differentiators", "faq", "cta", "related"],
};

type GccPageProps = {
  content: GccPageContent;
};

const GccPage = ({ content }: GccPageProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const variant = content.variant;

  const challengeIcon =
    variant === "partner" ? Handshake : variant === "offshore" ? AlertTriangle : Sparkles;

  const sections: Record<SectionId, React.ReactNode> = {
    maturity: content.maturityModel ? (
      <section className="border-b border-violet-100 bg-gradient-to-b from-violet-50/50 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">{content.maturityModel.heading}</h2>
          <div className="mt-10 flex flex-col gap-2 lg:flex-row lg:items-stretch">
            {content.maturityModel.levels.map((level, index) => (
              <div key={level} className="flex flex-1 flex-col items-center lg:flex-row">
                <div
                  className={`w-full flex-1 rounded-2xl border p-5 text-center text-sm font-semibold lg:text-left ${
                    index === content.maturityModel!.levels.length - 1
                      ? "border-[#F08504] bg-[#F08504] text-white shadow-lg shadow-orange-200"
                      : "border-violet-200 bg-white text-slate-600"
                  }`}
                >
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider opacity-70">Level {index + 1}</span>
                  {level}
                </div>
                {index < content.maturityModel!.levels.length - 1 && (
                  <div className="hidden px-2 text-violet-300 lg:block">→</div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-base font-semibold text-slate-800">{content.maturityModel.footer}</p>
        </div>
      </section>
    ) : null,

    editorial: content.editorial ? (
      <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ${variant === "talent" ? "bg-white" : ""}`}>
        <div className={`grid gap-10 lg:items-center ${variant === "expansion" ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}>
          {variant === "expansion" && content.editorial.planningQuestions ? (
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{content.editorial.heading}</h2>
              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-slate-600">{content.editorial.content}</p>
              {content.editorial.transition && (
                <p className="mt-5 border-l-4 border-[#1e3a8a] pl-4 text-base font-medium text-slate-800">{content.editorial.transition}</p>
              )}
            </div>
          ) : null}

          <div
            className={`rounded-3xl p-8 ${
              variant === "talent"
                ? "border border-violet-100 bg-violet-50"
                : variant === "offshore"
                  ? "border border-slate-200 bg-slate-900 text-white"
                  : variant === "pan-india"
                    ? "border border-orange-200 bg-orange-50"
                    : "border border-slate-200 bg-slate-50"
            } ${variant === "expansion" ? "order-1 lg:order-2" : ""}`}
          >
            {variant === "expansion" && content.editorial.planningQuestions ? (
              <>
                <div className="mb-5 flex items-center gap-3 text-[#1e3a8a]">
                  <Target className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Before You Build — 5 Key Questions</span>
                </div>
                <div className="space-y-3">
                  {content.editorial.planningQuestions.map((q, i) => (
                    <div key={q} className="flex gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                      <span className="font-bold text-[#F08504]">{i + 1}.</span>
                      <span className="text-sm font-medium text-slate-700">{q}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : variant === "talent" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-red-100 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400">Traditional</p>
                  <p className="mt-2 text-sm text-slate-600">Reactive vacancy filling — search when someone resigns</p>
                </div>
                <div className="rounded-2xl border border-[#F08504]/30 bg-orange-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#F08504]">Modern TA</p>
                  <p className="mt-2 text-sm text-slate-700">Proactive talent pipelines, communities & employer brand</p>
                </div>
              </div>
            ) : variant === "offshore" ? (
              <div className="space-y-2 text-sm">
                {["Engineering", "Product Development", "AI & Data", "Cybersecurity", "Finance", "Customer Success"].map((fn) => (
                  <div key={fn} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium">{fn}</div>
                ))}
              </div>
            ) : (
              <>
                <div className={`mb-6 flex items-center gap-3 ${variant === "pan-india" ? "text-[#F08504]" : "text-[#1e3a8a]"}`}>
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    {variant === "pan-india" ? "Nationwide Coverage" : "India GCC Hub"}
                  </span>
                </div>
                <div className={`grid gap-3 text-sm font-medium ${variant === "pan-india" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
                  {(variant === "pan-india"
                    ? ["Bengaluru", "Hyderabad", "Pune", "Chennai", "NCR", "Mumbai", "Kolkata", "Ahmedabad", "Coimbatore"]
                    : ["Bengaluru", "Hyderabad", "Pune", "Chennai", "NCR", "Mumbai"]
                  ).map((city) => (
                    <div
                      key={city}
                      className={`rounded-xl px-4 py-3 shadow-sm ${variant === "pan-india" ? "border border-orange-100 bg-white" : "bg-white"}`}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {variant !== "expansion" && (
            <div>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{content.editorial.heading}</h2>
              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-slate-600">{content.editorial.content}</p>
              {content.editorial.transition && (
                <p
                  className={`mt-5 border-l-4 pl-4 text-base font-medium text-slate-800 ${
                    variant === "pan-india" ? "border-[#F08504]" : variant === "offshore" ? "border-[#1e3a8a]" : "border-[#F08504]"
                  }`}
                >
                  {content.editorial.transition}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    ) : null,

    framework: content.framework ? (
      <section className={`py-16 lg:py-20 ${variant === "offshore" ? "bg-slate-900 text-white" : variant === "expansion" ? "bg-[#1e3a8a]/5" : "bg-white"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold sm:text-4xl ${variant === "offshore" ? "text-white" : "text-slate-900"}`}>
            {content.framework.heading}
          </h2>
          {variant === "offshore" ? (
            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {content.framework.phases.map((phase, index) => (
                <div key={phase.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F08504] text-xs font-bold">{index + 1}</div>
                  <h3 className="font-semibold text-white">{phase.title}</h3>
                  {phase.description && <p className="mt-2 text-xs leading-relaxed text-slate-400">{phase.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative mt-10 space-y-0">
              {content.framework.phases.map((phase, index) => (
                <div key={phase.title} className="relative flex gap-5 pb-10 last:pb-0">
                  {index < content.framework!.phases.length - 1 && (
                    <div className={`absolute left-5 top-12 h-full w-0.5 ${variant === "talent" ? "bg-violet-200" : "bg-[#1e3a8a]/20"}`} />
                  )}
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${variant === "talent" ? "bg-violet-600" : "bg-[#1e3a8a]"}`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">{phase.title}</h3>
                    {phase.description && <p className="mt-1 text-sm text-slate-600">{phase.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    ) : null,

    challenges: content.challenges ? (
      <section className={`py-16 lg:py-20 ${variant === "partner" ? "bg-[#1e3a8a]/5" : "bg-slate-50"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">{content.challenges.heading}</h2>
          <div className={`mt-10 grid gap-4 ${variant === "partner" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
            {content.challenges.items.map((item) => {
              const Icon = challengeIcon;
              return (
                <div
                  key={item}
                  className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    variant === "partner" ? "border-[#1e3a8a]/20" : "border-slate-200"
                  }`}
                >
                  <Icon className={`mb-3 h-5 w-5 ${variant === "partner" ? "text-[#1e3a8a]" : "text-[#F08504]"}`} />
                  <p className="text-sm font-semibold leading-relaxed text-slate-800">{item}</p>
                </div>
              );
            })}
          </div>
          {content.challenges.transition && (
            <p className="mt-8 max-w-3xl text-base font-medium text-slate-700">{content.challenges.transition}</p>
          )}
        </div>
      </section>
    ) : null,

    comparison: content.comparison ? (
      <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ${variant === "partner" ? "bg-white" : ""}`}>
        <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">{content.comparison.heading}</h2>
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <div className={`grid grid-cols-2 text-sm font-semibold text-white ${variant === "partner" ? "bg-[#1e3a8a]" : "bg-[#0A0F10]"}`}>
            <div className="px-5 py-4">{variant === "partner" ? "Traditional Agency" : "Traditional Approach"}</div>
            <div className="border-l border-white/10 px-5 py-4">
              {variant === "partner" ? "Enterprise GCC Requirements" : "Enterprise Reality"}
            </div>
          </div>
          {content.comparison.rows.map((row) => (
            <div key={row.traditional} className="grid grid-cols-2 border-t border-slate-200 text-sm">
              <div className="bg-slate-50 px-5 py-4 text-slate-600">{row.traditional}</div>
              <div className="border-l border-slate-200 px-5 py-4 font-medium text-slate-900">{row.enterprise}</div>
            </div>
          ))}
        </div>
        <p className={`mt-6 text-lg font-semibold ${variant === "talent" ? "text-violet-700" : "text-[#1e3a8a]"}`}>
          {content.comparison.footer}
        </p>
      </section>
    ) : null,

    value: content.valueProposition ? (
      <section
        className={`py-16 lg:py-20 ${
          variant === "talent"
            ? "bg-violet-900 text-white"
            : variant === "expansion"
              ? "bg-[#0A0F10] text-white"
              : "bg-[#0A0F10] text-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">{content.valueProposition.subheading}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">{content.valueProposition.heading}</h2>
          <div className={`mt-10 grid gap-4 ${variant === "talent" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {content.valueProposition.items.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F08504]" />
                <p className="text-sm leading-relaxed text-slate-200">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-lg font-semibold">{content.valueProposition.outcome}</p>
        </div>
      </section>
    ) : null,

    services: content.services ? (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{content.services.heading}</h2>
        {variant === "partner" || variant === "offshore" ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.items.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#1e3a8a]/30 hover:shadow-md">
                <Building2 className="mb-3 h-5 w-5 text-[#1e3a8a]" />
                <p className="text-sm font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-wrap gap-3">
            {content.services.items.map((item) => (
              <span key={item} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-800">
                {item}
              </span>
            ))}
          </div>
        )}
      </section>
    ) : null,

    categories: content.categories ? (
      <section className={`py-16 lg:py-20 ${variant === "pan-india" ? "bg-orange-50/50" : "bg-white"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{content.categories.heading}</h2>
          {variant === "pan-india" ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.categories.items.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
                  <MapPin className="h-5 w-5 shrink-0 text-[#F08504]" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-wrap gap-3">
              {content.categories.items.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    ) : null,

    timeline: content.timeline ? (
      <section className={`py-16 lg:py-20 ${variant === "pan-india" ? "bg-white" : "bg-slate-50"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{content.timeline.heading}</h2>
          {variant === "pan-india" ? (
            <div className="mt-10 flex gap-3 overflow-x-auto pb-4">
              {content.timeline.steps.map((step, index) => (
                <div key={step.title} className="min-w-[180px] shrink-0 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                  <div className="text-xs font-bold text-[#F08504]">Step {index + 1}</div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">{step.title}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {content.timeline.steps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[#F08504]">Step {index + 1}</div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  {step.description && <p className="mt-2 text-sm text-slate-600">{step.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    ) : null,

    differentiators: content.differentiators && content.outcomes ? (
      <section className={`py-16 lg:py-20 ${variant === "pan-india" ? "bg-[#0A0F10]" : "bg-[#0A0F10]"} text-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">{content.differentiators.heading}</h2>
              <div className="mt-8 space-y-3">
                {content.differentiators.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <Network className="h-4 w-4 text-[#F08504]" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{content.outcomes.heading}</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {content.outcomes.items.map((item) => (
                  <div key={item} className="rounded-2xl bg-[#F08504]/10 p-4 text-sm font-semibold text-orange-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : null,

    meta: (content.industries || content.engagementModels) ? (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className={`grid gap-10 ${content.engagementModels ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
          {content.industries && (
            <div>
              <h3 className="text-xl font-bold text-slate-900">{content.industries.heading}</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
                {content.industries.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#F08504]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {content.engagementModels && (
            <div>
              <h3 className="text-xl font-bold text-slate-900">{content.engagementModels.heading}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {content.engagementModels.items.map((item) => (
                  <div key={item} className="rounded-xl border border-[#1e3a8a]/20 bg-[#1e3a8a]/5 px-4 py-3 text-sm font-semibold text-[#1e3a8a]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    ) : null,

    governance: content.governance ? (
      <section className="bg-gradient-to-br from-[#0A0F10] to-[#1e3a8a] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-[#F08504]" />
            <h2 className="text-3xl font-bold">{content.governance.heading}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.governance.items.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Users className="mb-3 h-5 w-5 text-[#F08504]" />
                <p className="text-sm font-medium text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ) : null,

    success: content.successStory ? (
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{content.successStory.heading}</h2>
          <div className={`mt-8 grid gap-4 ${content.successStory.steps.length > 4 ? "md:grid-cols-3 lg:grid-cols-6" : "md:grid-cols-2 lg:grid-cols-4"}`}>
            {content.successStory.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-2 text-xs font-bold uppercase text-[#F08504]">
                  {content.successStory!.steps.length > 4 ? `Phase ${index + 1}` : step.title}
                </div>
                <h3 className="font-semibold text-[#1e3a8a]">{content.successStory!.steps.length > 4 ? step.title : step.title}</h3>
                {step.description && <p className="mt-2 text-sm text-slate-600">{step.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    ) : null,

    faq: (
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-3">
          {content.faqs.map((faq, index) => (
            <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 bg-slate-50 px-5 py-4 text-left"
              >
                <span className="font-semibold text-slate-900">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              {openFaq === index && (
                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    ),

    cta: (
      <section
        className={`py-16 text-white lg:py-20 ${
          variant === "talent" ? "bg-violet-800" : variant === "pan-india" ? "bg-gradient-to-r from-[#F08504] to-orange-600" : "bg-[#1e3a8a]"
        }`}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">{content.finalCta.heading}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed opacity-90">{content.finalCta.paragraph}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="tel:+918217527926" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              {content.finalCta.primaryCta}
            </a>
            <a href="mailto:info@earlyjobs.in" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              {content.finalCta.secondaryCta}
            </a>
          </div>
        </div>
      </section>
    ),

    related: (
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Explore GCC Resources</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {RELATED_PAGES.filter((page) => page.href !== `/${content.slug}`).map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#F08504] hover:text-[#F08504]"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    ),
  };

  return (
    <main className="bg-white text-slate-900">
      <GccHero content={content} />
      {SECTION_ORDER[variant].map((id) => {
        const section = sections[id];
        return section ? <div key={id}>{section}</div> : null;
      })}
    </main>
  );
};

export default GccPage;

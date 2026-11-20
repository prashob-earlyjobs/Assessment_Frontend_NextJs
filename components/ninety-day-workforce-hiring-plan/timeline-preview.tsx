"use client";

import { useState } from "react";
import { SolidLink } from "@/components/home/primitives";

const phases = [
  {
    id: "days-1-30",
    label: "Days 1–30",
    title: "Define and Prepare",
    summary: "Confirm demand, budgets, job descriptions and recruitment ownership.",
    items: [
      "Confirm workforce requirements from department heads",
      "Identify new, replacement and project-based roles",
      "Approve compensation ranges and recruitment expenses",
      "Prepare job descriptions and joining expectations",
      "Establish sourcing, interview and approval owners",
      "Lock approved vacancies and recruitment priorities",
    ],
  },
  {
    id: "days-31-60",
    label: "Days 31–60",
    title: "Source and Evaluate",
    summary: "Activate channels, coordinate interviews and track progress.",
    items: [
      "Activate internal or external sourcing channels",
      "Coordinate interview schedules and expectations",
      "Conduct role-specific assessments",
      "Track applications, shortlists, interviews and offers",
      "Flag roles that need additional sourcing attention",
    ],
  },
  {
    id: "days-61-90",
    label: "Days 61–90",
    title: "Convert and Review",
    summary: "Confirm offers, joining dates and performance against the plan.",
    items: [
      "Confirm offers and employment terms",
      "Coordinate joining dates and documentation",
      "Review remaining open vacancies",
      "Compare planned vacancies with actual joinings",
      "Review conversion, spend and operational challenges",
      "Carry lessons into the next planning period",
    ],
  },
] as const;

const trackerFields = [
  "Department and job title",
  "Hiring location",
  "Approved headcount",
  "Compensation range",
  "Recruitment owner",
  "Planned sourcing date",
  "Interview milestones",
  "Expected joining date",
  "Actual hiring status",
  "Risks and dependencies",
] as const;

type TimelinePreviewProps = {
  docxAvailable: boolean;
  xlsxAvailable: boolean;
};

export function TimelinePreview({ docxAvailable, xlsxAvailable }: TimelinePreviewProps) {
  const [activePhase, setActivePhase] = useState<(typeof phases)[number]["id"]>("days-1-30");
  const active = phases.find((phase) => phase.id === activePhase) ?? phases[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Three-month roadmap
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            90-Day Workforce Hiring Plan
          </h3>
        </div>
      </div>

      <div className="border-b border-black/5 bg-white px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Preview the 30 / 60 / 90 timeline and tracker fields before downloading. No email gate is
          required for basic resource access.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {docxAvailable ? (
            <a
              href="/resources/earlyjobs-90-day-workforce-hiring-plan.docx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-4 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
            >
              Download DOCX
            </a>
          ) : null}
          {xlsxAvailable ? (
            <a
              href="/resources/earlyjobs-90-day-workforce-hiring-plan.xlsx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] border border-black/10 bg-white px-4 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
            >
              Download XLSX
            </a>
          ) : null}
          {!docxAvailable && !xlsxAvailable ? (
            <p className="text-sm text-neutral-500">
              Download files are being prepared. Preview the interactive timeline below in the
              meantime.
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-b border-black/5 px-5 py-4 sm:px-6">
        <div className="grid gap-2 sm:grid-cols-3">
          {phases.map((phase) => {
            const isActive = phase.id === activePhase;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhase(phase.id)}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  isActive
                    ? "border-[#2563EB]/30 bg-[#eff6ff]"
                    : "border-black/10 bg-white hover:bg-[#f8fafc]"
                }`}
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
                  {phase.label}
                </p>
                <p className="mt-1 text-sm font-semibold tracking-[-0.02em]">{phase.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
            Milestone checklist
          </p>
          <h4 className="mt-2 text-base font-semibold tracking-[-0.02em]">
            {active.label}: {active.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{active.summary}</p>
          <ul className="mt-4 space-y-2">
            {active.items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-dashed border-black/10 bg-[#f8fafc] px-3 py-2.5 text-[13px] text-neutral-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
            Hiring tracker fields
          </p>
          <h4 className="mt-2 text-base font-semibold tracking-[-0.02em]">
            Shared reference for HR, finance and operations
          </h4>
          <ul className="mt-4 space-y-2">
            {trackerFields.map((field) => (
              <li
                key={field}
                className="rounded-lg border border-dashed border-black/10 bg-white px-3 py-2.5 text-[13px] text-neutral-600"
              >
                {field}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 bg-[#f8fafc] px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Once your 90-day plan is drafted, share it with EarlyJobs to discuss hiring coverage by
          location, role and joining timeline.
        </p>
        <div className="mt-4">
          <SolidLink href="#enquiry">Share Your 90-Day Hiring Plan</SolidLink>
        </div>
      </div>
    </div>
  );
}

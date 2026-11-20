"use client";

import { useState } from "react";
import { SolidLink } from "@/components/home/primitives";

const phases = [
  {
    id: "phase-1",
    title: "Define the hiring requirement",
    items: [
      "Number of vacancies",
      "Job titles and departments",
      "Workplace locations",
      "Employment types",
      "Salary ranges and approved budgets",
      "Educational and skill requirements",
      "Shift patterns",
      "Expected joining dates",
      "Hiring managers and approval responsibilities",
    ],
  },
  {
    id: "phase-2",
    title: "Prepare candidate sourcing",
    items: [
      "Relevant candidate channels",
      "Educational institutions / partners / referrals / ads",
      "Candidate location and availability notes",
      "Consistent job descriptions",
      "Candidate communication templates",
    ],
  },
  {
    id: "phase-3",
    title: "Plan interviews and assessments",
    items: [
      "Interview dates and venues",
      "Interviewer availability",
      "Candidate instructions",
      "Assessment requirements",
      "Document requirements",
      "Selection criteria",
      "Decision-making responsibilities",
    ],
  },
  {
    id: "phase-4",
    title: "Track candidate progress",
    items: [
      "Applications received",
      "Shortlisted",
      "Interviewed",
      "Selected",
      "Offered",
      "Joined",
    ],
  },
  {
    id: "phase-5",
    title: "Coordinate joining",
    items: [
      "Reporting date",
      "Reporting location",
      "Required documentation",
      "Compensation and working hours confirmation",
      "Change communication plan",
    ],
  },
  {
    id: "phase-6",
    title: "Review the hiring drive",
    items: [
      "Vacancies planned versus filled",
      "Interview attendance",
      "Offer-to-joining conversion",
      "Recruitment spending",
      "Vacancies remaining",
      "Lessons for future campaigns",
    ],
  },
] as const;

type ChecklistPreviewProps = {
  docxAvailable: boolean;
  xlsxAvailable: boolean;
};

export function ChecklistPreview({ docxAvailable, xlsxAvailable }: ChecklistPreviewProps) {
  const [activePhase, setActivePhase] = useState<(typeof phases)[number]["id"]>("phase-1");
  const active = phases.find((phase) => phase.id === activePhase) ?? phases[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Planning kit preview
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Bulk Hiring Checklist
          </h3>
        </div>
      </div>

      <div className="border-b border-black/5 bg-white px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Inspect checklist categories before downloading. No email gate is required for the basic
          resource access.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {docxAvailable ? (
            <a
              href="/resources/earlyjobs-bulk-hiring-checklist.docx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-4 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
            >
              Download DOCX
            </a>
          ) : null}
          {xlsxAvailable ? (
            <a
              href="/resources/earlyjobs-bulk-hiring-checklist.xlsx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] border border-black/10 bg-white px-4 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
            >
              Download XLSX
            </a>
          ) : null}
          {!docxAvailable && !xlsxAvailable ? (
            <p className="text-sm text-neutral-500">
              Download files are being prepared. Preview the six-phase checklist below in the
              meantime.
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
            Six-phase journey
          </p>
          <ol className="mt-4 space-y-2">
            {phases.map((phase, index) => {
              const isActive = phase.id === activePhase;
              return (
                <li key={phase.id}>
                  <button
                    type="button"
                    onClick={() => setActivePhase(phase.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                      isActive
                        ? "border-[#2563EB]/30 bg-[#eff6ff]"
                        : "border-black/10 bg-white hover:bg-[#f8fafc]"
                    }`}
                  >
                    <span className="text-[11px] font-medium tracking-[0.12em] text-brand tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">
                      {phase.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <h4 className="text-base font-semibold tracking-[-0.02em]">{active.title}</h4>
          <ul className="mt-4 space-y-2">
            {active.items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-dashed border-black/10 bg-white px-3 py-2.5 text-[13px] text-neutral-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 bg-[#f8fafc] px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Once your bulk hiring plan is drafted, share it with EarlyJobs to discuss volume hiring
          coverage.
        </p>
        <div className="mt-4">
          <SolidLink href="#enquiry">Share Your Bulk Hiring Plan</SolidLink>
        </div>
      </div>
    </div>
  );
}

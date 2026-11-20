"use client";

import { useState } from "react";
import { SolidLink } from "@/components/home/primitives";

const industries = [
  "General",
  "Healthcare",
  "Manufacturing",
  "Logistics",
  "Renewable Energy",
] as const;

const fieldGroups = [
  {
    title: "Position details",
    fields: ["Job title", "Department", "Reporting manager", "Workplace location"],
  },
  {
    title: "Workforce requirement",
    fields: ["Number of vacancies", "Employment type", "Shift pattern", "Expected joining date"],
  },
  {
    title: "Candidate eligibility",
    fields: ["Educational qualifications", "Experience", "Skills", "Mandatory certifications"],
  },
  {
    title: "Compensation information",
    fields: ["Proposed salary range", "Approved budget", "Relevant allowances"],
  },
  {
    title: "Business justification",
    fields: ["Expansion", "Replacement", "Increased workload", "New project"],
  },
  {
    title: "Approval details",
    fields: ["Requesting manager", "HR reviewer", "Budget approver", "Approval status"],
  },
] as const;

type TemplatePreviewProps = {
  docxAvailable: boolean;
  xlsxAvailable: boolean;
};

export function TemplatePreview({ docxAvailable, xlsxAvailable }: TemplatePreviewProps) {
  const [industry, setIndustry] = useState<(typeof industries)[number]>("General");

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Document preview
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Manpower Requisition Template
          </h3>
        </div>
        <label className="flex items-center gap-2 text-[12px] text-neutral-600">
          Industry view
          <select
            value={industry}
            onChange={(event) =>
              setIndustry(event.target.value as (typeof industries)[number])
            }
            className="rounded-lg border border-black/10 bg-white px-2.5 py-1.5 text-[12px] font-medium text-neutral-800 outline-none focus:border-[#2563EB]"
          >
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="border-b border-black/5 bg-white px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Preview shows the fields included in the template
          {industry !== "General" ? ` — adapted for ${industry.toLowerCase()} hiring context` : ""}.
          No email gate is required for the basic download.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {docxAvailable ? (
            <a
              href="/resources/earlyjobs-manpower-requisition-template.docx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-4 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
            >
              Download DOCX
            </a>
          ) : null}
          {xlsxAvailable ? (
            <a
              href="/resources/earlyjobs-manpower-requisition-template.xlsx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] border border-black/10 bg-white px-4 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
            >
              Download XLSX
            </a>
          ) : null}
          {!docxAvailable && !xlsxAvailable ? (
            <p className="text-sm text-neutral-500">
              Download files are being prepared. Preview the fields below in the meantime.
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-0 sm:grid-cols-2">
        {fieldGroups.map((group) => (
          <div key={group.title} className="border-b border-black/5 p-5 sm:border-r sm:p-6 odd:sm:border-r">
            <h4 className="text-sm font-semibold tracking-[-0.02em] text-neutral-950">
              {group.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {group.fields.map((field) => (
                <li
                  key={field}
                  className="rounded-lg border border-dashed border-black/10 bg-[#f8fafc] px-3 py-2 text-[13px] text-neutral-600"
                >
                  {field}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5 bg-[#f8fafc] px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Once approved internally, share the completed requisition with EarlyJobs to discuss
          recruitment coverage.
        </p>
        <div className="mt-4">
          <SolidLink href="#enquiry">Share Your Approved Hiring Requirement</SolidLink>
        </div>
      </div>
    </div>
  );
}

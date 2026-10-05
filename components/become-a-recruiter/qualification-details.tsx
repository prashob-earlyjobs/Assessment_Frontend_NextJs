"use client";

import { useState } from "react";
import {
  Field,
  QualificationField,
  inputClass,
  shell,
  type QualificationDetails,
  type QualificationErrors,
  type WorkExperienceEntry,
} from "@/components/become-a-recruiter/form-shared";

export function QualificationDetailsStep({
  value,
  errors,
  onChange,
}: {
  value: QualificationDetails;
  errors: QualificationErrors;
  onChange: (next: QualificationDetails) => void;
}) {
  const [draft, setDraft] = useState<WorkExperienceEntry>({ company: "", experienceYears: "" });

  function setHighestQualification(highestQualification: string) {
    onChange({ ...value, highestQualification });
  }

  function updateExperience(index: number, patch: Partial<WorkExperienceEntry>) {
    onChange({
      ...value,
      workExperience: value.workExperience.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
    });
  }

  function removeExperience(index: number) {
    onChange({
      ...value,
      workExperience: value.workExperience.filter((_, i) => i !== index),
    });
  }

  function addExperience() {
    const hasDraft = draft.company.trim() || draft.experienceYears.trim();
    const nextEntry: WorkExperienceEntry = hasDraft
      ? { company: draft.company, experienceYears: draft.experienceYears }
      : { company: "", experienceYears: "" };

    onChange({
      ...value,
      workExperience: [...value.workExperience, nextEntry],
    });

    if (hasDraft) setDraft({ company: "", experienceYears: "" });
  }

  return (
    <div className="mt-8 space-y-10">
      <QualificationField
        value={value.highestQualification}
        error={errors.highestQualification}
        onChange={setHighestQualification}
      />

      <section className="border-t border-black/10 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">Work experience</h3>
            <p className="mt-1 text-[13px] text-neutral-500">Optional — add past roles in recruiting or HR.</p>
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex h-9 items-center justify-center rounded-[6px] bg-brand px-3 text-[12px] font-medium text-white transition-colors hover:bg-[#d85c42]"
          >
            Add
          </button>
        </div>

        {value.workExperience.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {value.workExperience.map((entry, index) => {
              const rowErrors = errors.workExperience?.[index];
              return (
                <li
                  key={index}
                  className="rounded-[6px] border border-black/10 bg-neutral-50/80 p-4 sm:p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-[13px] font-medium text-neutral-800">Experience {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-[12px] font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company name" required error={rowErrors?.company}>
                      <span className={shell(rowErrors?.company)}>
                        <input
                          value={entry.company}
                          onChange={(event) => updateExperience(index, { company: event.target.value })}
                          placeholder="Ex. Microsoft"
                          className={inputClass()}
                        />
                      </span>
                    </Field>
                    <Field label="Years of experience" required error={rowErrors?.experienceYears}>
                      <span className={shell(rowErrors?.experienceYears)}>
                        <input
                          inputMode="numeric"
                          min={0}
                          max={50}
                          value={entry.experienceYears}
                          onChange={(event) =>
                            updateExperience(index, {
                              experienceYears: event.target.value.replace(/\D/g, "").slice(0, 2),
                            })
                          }
                          placeholder="Ex. 2"
                          className={inputClass()}
                        />
                      </span>
                    </Field>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-6 rounded-[6px] border border-dashed border-black/15 p-4 sm:p-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company name">
                <span className={shell()}>
                  <input
                    value={draft.company}
                    onChange={(event) => setDraft((prev) => ({ ...prev, company: event.target.value }))}
                    placeholder="Ex. Microsoft"
                    className={inputClass()}
                  />
                </span>
              </Field>
              <Field label="Years of experience">
                <span className={shell()}>
                  <input
                    inputMode="numeric"
                    value={draft.experienceYears}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        experienceYears: event.target.value.replace(/\D/g, "").slice(0, 2),
                      }))
                    }
                    placeholder="Ex. 2"
                    className={inputClass()}
                  />
                </span>
              </Field>
            </div>
            <p className="mt-3 text-[12px] text-neutral-500">
              Fill in both fields, then click Add to include this experience.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Select, { type StylesConfig } from "react-select";

const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati", "Punjabi"];
const qualifications = [
  ["10th", "10th"],
  ["12th", "12th"],
  ["diploma", "Diploma"],
  ["bachelor", "Bachelor's Degree"],
  ["master", "Master's Degree"],
  ["phd", "PhD"],
] as const;
const workModes = [
  ["remote", "Remote"],
  ["hybrid", "Hybrid"],
  ["on-site", "On-site"],
] as const;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const qualificationOptions = qualifications.map(([value, label]) => ({ value, label }));

const fieldSelectStyles: StylesConfig<{ value: string; label: string }, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    height: 40,
    marginTop: 8,
    borderRadius: 6,
    borderColor: state.isFocused ? "#d4d4d4" : "#e5e5e5",
    boxShadow: "none",
    fontSize: 14,
    cursor: "pointer",
    "&:hover": { borderColor: "#d4d4d4" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 12px" }),
  placeholder: (base) => ({ ...base, color: "#a3a3a3" }),
  singleValue: (base) => ({ ...base, color: "#0a0a0a" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "#737373", paddingRight: 10 }),
  menuPortal: (base) => ({ ...base, zIndex: 90 }),
  menu: (base) => ({ ...base, borderRadius: 6, overflow: "hidden" }),
  option: (base, state) => ({
    ...base,
    fontSize: 14,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#ea6a4e" : state.isFocused ? "#f5f5f5" : "#fff",
    color: state.isSelected ? "#fff" : "#171717",
  }),
};

const field =
  "mt-2 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-300";

function keepDigits(event: React.FormEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  const digits = input.value.replace(/\D/g, "");
  if (input.value !== digits) input.value = digits;
}

const APPLICATION_KEY = "earlyjobs-application";

type SavedApplication = {
  fullName: string;
  fatherName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  aadharNumber: string;
  highestQualification: string;
  currentLocation: string;
  experienceYears: string;
  experienceMonths: string;
  skills: string[];
  spokenLanguages: string[];
  workMode: string[];
};

function asStrings(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim() !== "") : [];
}

function readSavedApplication(): SavedApplication | null {
  try {
    const raw = localStorage.getItem(APPLICATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedApplication>;
    const text = (value: unknown) => (typeof value === "string" ? value : "");
    const gender = genderOptions.some((option) => option.value === parsed.gender) ? parsed.gender ?? "" : "";
    const highestQualification = qualificationOptions.some((option) => option.value === parsed.highestQualification)
      ? parsed.highestQualification ?? ""
      : "";
    const modeValues = new Set<string>(workModes.map(([value]) => value));
    return {
      fullName: text(parsed.fullName),
      fatherName: text(parsed.fatherName),
      email: text(parsed.email),
      phone: text(parsed.phone).replace(/\D/g, "").slice(0, 10),
      dateOfBirth: text(parsed.dateOfBirth),
      gender,
      aadharNumber: text(parsed.aadharNumber).replace(/\D/g, "").slice(0, 12),
      highestQualification,
      currentLocation: text(parsed.currentLocation),
      experienceYears: text(parsed.experienceYears).replace(/\D/g, ""),
      experienceMonths: text(parsed.experienceMonths).replace(/\D/g, ""),
      skills: asStrings(parsed.skills),
      spokenLanguages: asStrings(parsed.spokenLanguages).filter((language) => languages.includes(language)),
      workMode: asStrings(parsed.workMode).filter((mode) => modeValues.has(mode)),
    };
  } catch {
    return null;
  }
}

function saveApplication(application: SavedApplication) {
  try {
    localStorage.setItem(APPLICATION_KEY, JSON.stringify(application));
  } catch {
    // Storage can be blocked; the submission still completes.
  }
}

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="block text-sm font-medium text-neutral-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export function ApplyJob({
  jobId,
  title,
  open,
  external,
}: {
  jobId: string;
  title: string;
  open: boolean;
  external: boolean;
}) {
  const [shown, setShown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const requestId = useRef(0);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [spoken, setSpoken] = useState<string[]>([]);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [modes, setModes] = useState<string[]>([]);
  const [resumeName, setResumeName] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [draft, setDraft] = useState<SavedApplication | null>(null);
  const [formKey, setFormKey] = useState(0);

  if (!open) {
    return (
      <span className="inline-flex h-11 shrink-0 items-center justify-center rounded-[6px] bg-neutral-100 px-4 text-[13px] font-medium text-neutral-400">
        Applications closed
      </span>
    );
  }

  function addSkill() {
    const next = skill.trim();
    if (!next || skills.includes(next)) return;
    setSkills((current) => [...current, next]);
    setSkill("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const fatherName = String(form.get("fatherName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const dateOfBirth = String(form.get("dateOfBirth") ?? "");
    const gender = String(form.get("gender") ?? "");
    const highestQualification = String(form.get("highestQualification") ?? "");
    const currentLocation = String(form.get("currentLocation") ?? "").trim();
    const years = String(form.get("experienceYears") ?? "").trim();
    const months = String(form.get("experienceMonths") ?? "").trim();
    const resume = form.get("resume");

    if (!fullName) return setError("Full name is required");
    if (!modes.length) return setError("At least one work mode is required");
    if (!fatherName) return setError("Father name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address");
    if (!/^[6-9]\d{9}$/.test(phone)) return setError("Enter a valid 10-digit phone number");
    if (!dateOfBirth) return setError("Date of birth is required");
    if (!gender) return setError("Gender is required");
    if (!highestQualification) return setError("Highest qualification is required");
    if (!currentLocation) return setError("Current location is required");
    if (!years && !months) return setError("Experience is required");
    if (!skills.length) return setError("At least one skill is required");
    if (!spoken.length) return setError("At least one spoken language is required");
    if (resume instanceof File && resume.size > 3 * 1024 * 1024) return setError("Resume must be 3MB or smaller");

    const aadhar = String(form.get("aadharNumber") ?? "").trim();
    const payload = {
      jobId,
      fullName,
      email,
      fatherName,
      phone,
      dateOfBirth,
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      highestQualification,
      currentLocationDetails: currentLocation,
      spokenLanguages: spoken,
      totalExperienceYears: years ? Number(years) : 0,
      totalExperienceMonths: months ? Number(months) : 0,
      skills,
      workMode: modes,
      isExternalJob: external,
      ...(aadhar ? { aadharNumber: aadhar } : {}),
    };

    const body = new FormData();
    body.append("application", JSON.stringify(payload));
    if (resume instanceof File && resume.size > 0) body.append("resume", resume);

    const id = ++requestId.current;
    setError("");
    setSubmitting(true);
    const started = Date.now();
    try {
      const response = await fetch("/api/jobs/apply", { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as { status?: string; message?: string };
      if (requestId.current !== id) return;
      const ok = result.status === "success";
      const message = result.message || (ok ? "Application submitted" : "Failed to submit application");
      const remaining = 800 - (Date.now() - started);
      if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
      if (requestId.current !== id) return;
      setResult({ ok, message });
      if (ok) {
        saveApplication({
          fullName,
          fatherName,
          email,
          phone,
          dateOfBirth,
          gender,
          aadharNumber: aadhar,
          highestQualification,
          currentLocation,
          experienceYears: years,
          experienceMonths: months,
          skills,
          spokenLanguages: spoken,
          workMode: modes,
        });
      }
    } catch {
      if (requestId.current !== id) return;
      setError("Failed to submit application");
    } finally {
      if (requestId.current === id) setSubmitting(false);
    }
  }

  function closeDialog() {
    requestId.current += 1;
    setShown(false);
    setSubmitting(false);
    setResult(null);
    setError("");
  }

  function openDialog() {
    const saved = readSavedApplication();
    setDraft(saved);
    setGender(saved?.gender ?? "");
    setQualification(saved?.highestQualification ?? "");
    setSkills(saved?.skills ?? []);
    setSpoken(saved?.spokenLanguages ?? []);
    setModes(saved?.workMode ?? []);
    setSkill("");
    setResumeName("");
    setLanguagesOpen(false);
    setResult(null);
    setError("");
    setSubmitting(false);
    setFormKey((current) => current + 1);
    setShown(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-brand px-5 text-[13px] font-medium text-white"
      >
        Apply
      </button>
      {shown
        ? createPortal(
            <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-8">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="apply-title"
                className="w-full max-w-[680px] rounded-xl bg-white p-6 shadow-[0_24px_80px_rgba(23,23,23,0.22)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 id="apply-title" className="text-lg font-semibold text-neutral-950">
                    Apply for {title}
                  </h2>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={closeDialog}
                    className="cursor-pointer text-neutral-500"
                  >
                    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                      <path d="M3 3l10 10M13 3 3 13" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
                {result?.ok ? (
                  <div className="flex flex-col items-center px-4 py-12 text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white">
                      <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
                        <path
                          d="M5 12.5 9.5 17 19 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="mt-4 text-base font-medium text-neutral-950">{result.message}</p>
                    <Link href="/jobs" className="mt-6 cursor-pointer text-sm font-medium text-brand">
                      Back to roles
                    </Link>
                  </div>
                ) : (
                  <>
                  {submitting ? (
                    <div className="flex flex-col items-center px-4 py-12 text-center" role="status">
                      <span className="size-14 animate-spin rounded-full border-4 border-neutral-200 border-t-brand" />
                      <p className="mt-4 text-base font-medium text-neutral-950">Submitting your application</p>
                    </div>
                  ) : result ? (
                    <div className="flex flex-col items-center px-4 py-12 text-center">
                      <span className="flex size-14 items-center justify-center rounded-full bg-neutral-950 text-white">
                        <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
                          <path d="M7 7l10 10M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                      </span>
                      <p className="mt-4 max-w-md text-base font-medium text-neutral-950">{result.message}</p>
                      <button
                        type="button"
                        onClick={() => setResult(null)}
                        className="mt-6 h-9 cursor-pointer rounded-md border border-neutral-950 bg-white px-4 text-sm font-medium text-neutral-950"
                      >
                        Try again
                      </button>
                    </div>
                  ) : null}
                  <form key={formKey} onSubmit={onSubmit} className={submitting || result ? "hidden" : "mt-5 grid gap-4 sm:grid-cols-2"}>
                    <Field label="Full Name" required>
                      <input name="fullName" autoComplete="name" placeholder="Ex: John Doe" defaultValue={draft?.fullName ?? ""} className={field} />
                    </Field>
                    <Field label="Father Name" required>
                      <input name="fatherName" placeholder="Ex: John Doe" defaultValue={draft?.fatherName ?? ""} className={field} />
                    </Field>
                    <Field label="Email ID" required>
                      <input name="email" type="email" autoComplete="email" placeholder="Ex: example@email.com" defaultValue={draft?.email ?? ""} className={field} />
                    </Field>
                    <Field label="Phone Number" required>
                      <input name="phone" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="Ex: 9876543210" defaultValue={draft?.phone ?? ""} className={field} />
                    </Field>
                    <Field label="Date of Birth" required>
                      <input name="dateOfBirth" type="date" defaultValue={draft?.dateOfBirth ?? ""} className={field} />
                    </Field>
                    <Field label="Gender" required>
                      <input type="hidden" name="gender" value={gender} />
                      <Select
                        instanceId="gender"
                        options={genderOptions}
                        placeholder="Select gender"
                        isSearchable={false}
                        styles={fieldSelectStyles}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        menuPlacement="bottom"
                        value={genderOptions.find((option) => option.value === gender) ?? null}
                        onChange={(option) => setGender(option?.value ?? "")}
                      />
                    </Field>
                    <Field label="Aadhar Number">
                      <input name="aadharNumber" inputMode="numeric" maxLength={12} placeholder="Ex: 123456789012" defaultValue={draft?.aadharNumber ?? ""} className={field} />
                    </Field>
                    <Field label="Highest Qualification" required>
                      <input type="hidden" name="highestQualification" value={qualification} />
                      <Select
                        instanceId="qualification"
                        options={qualificationOptions}
                        placeholder="Select Highest Qualification"
                        isSearchable={false}
                        styles={fieldSelectStyles}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        menuPlacement="bottom"
                        value={qualificationOptions.find((option) => option.value === qualification) ?? null}
                        onChange={(option) => setQualification(option?.value ?? "")}
                      />
                    </Field>
                    <Field label="Current Location" required className="sm:col-span-2">
                      <input name="currentLocation" placeholder="Enter location" defaultValue={draft?.currentLocation ?? ""} className={field} />
                    </Field>
                    <fieldset className="sm:col-span-2">
                      <legend className="text-sm font-medium text-neutral-700">
                        Experience<span className="text-red-500"> *</span>
                      </legend>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <label>
                          <input name="experienceYears" inputMode="numeric" pattern="[0-9]*" placeholder="Ex: 2" defaultValue={draft?.experienceYears ?? ""} onInput={keepDigits} className="h-10 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300" />
                          <span className="mt-1 block text-xs text-neutral-500">Years</span>
                        </label>
                        <label>
                          <input name="experienceMonths" inputMode="numeric" pattern="[0-9]*" placeholder="Ex: 5" defaultValue={draft?.experienceMonths ?? ""} onInput={keepDigits} className="h-10 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300" />
                          <span className="mt-1 block text-xs text-neutral-500">Months</span>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset className="sm:col-span-2">
                      <legend className="text-sm font-medium text-neutral-700">Preferred Work Mode</legend>
                      <div className="mt-2 flex flex-wrap gap-5">
                        {workModes.map(([value, label]) => (
                          <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
                            <input
                              type="checkbox"
                              checked={modes.includes(value)}
                              onChange={(event) =>
                                setModes((current) =>
                                  event.target.checked ? [...current, value] : current.filter((item) => item !== value),
                                )
                              }
                              className="size-4 accent-[#ea6a4e]"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div className="sm:col-span-2">
                      <span className="block text-sm font-medium text-neutral-700">
                        Skills<span className="text-red-500"> *</span>
                      </span>
                      <div className="relative mt-2">
                        <input
                          value={skill}
                          onChange={(event) => setSkill(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addSkill();
                            }
                          }}
                          placeholder="Ex: MS Excel"
                          className="h-10 w-full rounded-md border border-neutral-200 px-3 pr-20 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300"
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-sm text-neutral-800"
                        >
                          + Add
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-neutral-400">Type a Skill and click &apos;Add&apos; button to add it to the list</p>
                      {skills.length ? <p className="mt-2 text-sm text-neutral-700">{skills.join(", ")}</p> : null}
                    </div>
                    <label className="sm:col-span-2">
                      <span className="block text-sm font-medium text-neutral-700">Resume (PDF/DOC/DOCX) (Optional, Max 3MB)</span>
                      <span className="mt-2 flex h-16 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-neutral-300 text-sm text-neutral-500">
                        <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                          <path d="M8 11V3M8 3 5 6M8 3l3 3M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {resumeName || "Click to upload resume"}
                        <input
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="sr-only"
                          onChange={(event) => setResumeName(event.target.files?.[0]?.name ?? "")}
                        />
                      </span>
                    </label>
                    <div className="relative sm:col-span-2">
                      <span className="block text-sm font-medium text-neutral-700">
                        Spoken Languages<span className="text-red-500"> *</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setLanguagesOpen((open) => !open)}
                        className="mt-2 flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-neutral-200 px-3 text-left text-sm text-neutral-500"
                      >
                        <span className={spoken.length ? "text-neutral-950" : ""}>
                          {spoken.length ? spoken.join(", ") : "Select languages"}
                        </span>
                        <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden="true">
                          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      </button>
                      {languagesOpen ? (
                        <ul className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
                          {languages.map((language) => (
                            <li key={language}>
                              <label className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50">
                                <input
                                  type="checkbox"
                                  checked={spoken.includes(language)}
                                  onChange={(event) =>
                                    setSpoken((current) =>
                                      event.target.checked
                                        ? [...current, language]
                                        : current.filter((item) => item !== language),
                                    )
                                  }
                                  className="accent-[#ea6a4e]"
                                />
                                {language}
                              </label>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    {error ? <p className="text-sm text-red-600 sm:col-span-2">{error}</p> : null}
                    <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
                      <button
                        type="button"
                        onClick={closeDialog}
                        className="h-9 cursor-pointer rounded-md border border-neutral-300 bg-white px-4 text-sm text-neutral-800"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="h-9 cursor-pointer rounded-md border border-neutral-950 bg-white px-4 text-sm font-medium text-neutral-950 disabled:opacity-60"
                      >
                        {submitting ? "Submitting" : "Submit"}
                      </button>
                    </div>
                  </form>
                  </>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PersonalDetailsStep } from "@/components/become-a-recruiter/personal-details";
import { QualificationDetailsStep } from "@/components/become-a-recruiter/qualification-details";
import { AboutDetailsStep } from "@/components/become-a-recruiter/about-details";
import { ReferencesDetailsStep } from "@/components/become-a-recruiter/references-details";
import { IdentificationDetailsStep } from "@/components/become-a-recruiter/identification-details";
import {
  aboutIsValid,
  emptyAboutDetails,
  emptyIdentificationDetails,
  emptyPersonalDetails,
  emptyQualificationDetails,
  emptyReferences,
  identificationIsValid,
  qualificationIsValid,
  referencesIsValid,
  validateAboutDetails,
  validateIdentificationDetails,
  validatePersonalDetails,
  validateQualificationDetails,
  validateReferences,
  type AboutDetails,
  type AboutErrors,
  type IdentificationDetails,
  type IdentificationErrors,
  type PersonalDetails,
  type PersonalErrors,
  type QualificationDetails,
  type QualificationErrors,
  type ReferencePerson,
  type ReferencesErrors,
} from "@/components/become-a-recruiter/form-shared";
import {
  clearRecruiterApplicationDraft,
  emptyRecruiterApplicationDraft,
  loadRecruiterApplicationDraft,
  saveRecruiterApplicationDraft,
} from "@/components/become-a-recruiter/storage";

const steps = [
  { id: "personal", label: "Personal details" },
  { id: "qualification", label: "Qualification / certification" },
  { id: "about", label: "About" },
  { id: "references", label: "References" },
  { id: "identification", label: "Identification" },
] as const;

type StepId = (typeof steps)[number]["id"];

const button =
  "inline-flex h-11 items-center justify-center rounded-[6px] px-4 text-[13px] font-medium transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px]";

export function RecruiterApplicationForm() {
  const [hydrated, setHydrated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [uploadSessionId, setUploadSessionId] = useState(() => String(Date.now()));
  const [personal, setPersonal] = useState<PersonalDetails>(emptyPersonalDetails);
  const [personalErrors, setPersonalErrors] = useState<PersonalErrors>({});
  const [qualification, setQualification] = useState<QualificationDetails>(emptyQualificationDetails);
  const [qualificationErrors, setQualificationErrors] = useState<QualificationErrors>({});
  const [about, setAbout] = useState<AboutDetails>(emptyAboutDetails);
  const [aboutErrors, setAboutErrors] = useState<AboutErrors>({});
  const [references, setReferences] = useState<ReferencePerson[]>(emptyReferences);
  const [referencesErrors, setReferencesErrors] = useState<ReferencesErrors>({});
  const [identification, setIdentification] = useState<IdentificationDetails>(emptyIdentificationDetails);
  const [identificationErrors, setIdentificationErrors] = useState<IdentificationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const step = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  useEffect(() => {
    const draft = loadRecruiterApplicationDraft();
    if (draft) {
      setCurrent(draft.current);
      setUploadSessionId(draft.uploadSessionId);
      setPersonal(draft.personal);
      setQualification(draft.qualification);
      setAbout(draft.about);
      setReferences(draft.references);
      setIdentification(draft.identification);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    saveRecruiterApplicationDraft({
      current,
      uploadSessionId,
      personal,
      qualification,
      about,
      references,
      identification,
    });
  }, [
    hydrated,
    submitted,
    current,
    uploadSessionId,
    personal,
    qualification,
    about,
    references,
    identification,
  ]);

  function goTo(index: number) {
    if (index < 0 || index >= steps.length) return;
    if (index > current && !validateCurrent()) return;
    setCurrent(index);
  }

  function scrollToFirstError() {
    window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(".text-red-500")
        ?.closest("label, fieldset, section, div")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function validateStep(stepId: StepId) {
    if (stepId === "personal") {
      const nextErrors = validatePersonalDetails(personal);
      setPersonalErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (stepId === "qualification") {
      const nextErrors = validateQualificationDetails(qualification);
      setQualificationErrors(nextErrors);
      return qualificationIsValid(nextErrors);
    }
    if (stepId === "about") {
      const nextErrors = validateAboutDetails(about);
      setAboutErrors(nextErrors);
      return aboutIsValid(nextErrors);
    }
    if (stepId === "references") {
      const nextErrors = validateReferences(references);
      setReferencesErrors(nextErrors);
      return referencesIsValid(nextErrors);
    }
    if (stepId === "identification") {
      const nextErrors = validateIdentificationDetails(identification);
      setIdentificationErrors(nextErrors);
      return identificationIsValid(nextErrors);
    }
    return true;
  }

  function validateCurrent() {
    const valid = validateStep(steps[current].id);
    if (!valid) scrollToFirstError();
    return valid;
  }

  function onPersonalChange(next: PersonalDetails) {
    setPersonal(next);
    if (Object.keys(personalErrors).length) {
      setPersonalErrors(validatePersonalDetails(next));
    }
  }

  function onQualificationChange(next: QualificationDetails) {
    setQualification(next);
    if (!qualificationIsValid(qualificationErrors)) {
      setQualificationErrors(validateQualificationDetails(next));
    }
  }

  function onAboutChange(next: AboutDetails) {
    setAbout(next);
    if (!aboutIsValid(aboutErrors)) {
      setAboutErrors(validateAboutDetails(next));
    }
  }

  function onReferencesChange(next: ReferencePerson[]) {
    setReferences(next);
    if (!referencesIsValid(referencesErrors)) {
      setReferencesErrors(validateReferences(next));
    }
  }

  function onIdentificationChange(next: IdentificationDetails) {
    setIdentification(next);
    if (!identificationIsValid(identificationErrors)) {
      setIdentificationErrors(validateIdentificationDetails(next));
    }
  }

  function resetForm() {
    const empty = emptyRecruiterApplicationDraft();
    setCurrent(empty.current);
    setUploadSessionId(empty.uploadSessionId);
    setPersonal(empty.personal);
    setQualification(empty.qualification);
    setAbout(empty.about);
    setReferences(empty.references);
    setIdentification(empty.identification);
    setPersonalErrors({});
    setQualificationErrors({});
    setAboutErrors({});
    setReferencesErrors({});
    setIdentificationErrors({});
  }

  async function onContinue() {
    if (submitting) return;
    if (!validateCurrent()) return;
    if (!isLast) {
      setCurrent((value) => value + 1);
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Submitting your application…");

    try {
      const response = await fetch("/api/recruiter/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personal,
          qualification,
          about,
          references,
          identification,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message || "Failed to submit application");
      }

      clearRecruiterApplicationDraft();
      toast.success("Application submitted successfully", { id: toastId });
      setSubmitted(true);
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit application";
      toast.error(message, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="w-full max-w-3xl">
        <div className="h-40 animate-pulse rounded-[18px] bg-neutral-100" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="w-full max-w-3xl">
        <header>
          <p className="text-sm font-medium text-brand">Application</p>
          <h1 className="mt-2 text-[2rem] font-semibold leading-[1.1] tracking-[-0.045em] text-neutral-950 sm:text-[2.75rem]">
            Application received
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            Thanks — we received your application. Your draft has been cleared.
          </p>
        </header>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className={`${button} mt-8 bg-brand text-white hover:bg-[#d85c42]`}
        >
          Start another application
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      <header>
        <p className="text-sm font-medium text-brand">Application</p>
        <h1 className="mt-2 text-[2rem] font-semibold leading-[1.1] tracking-[-0.045em] text-neutral-950 sm:text-[2.75rem]">
          Become a Recruiter
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
          Tell us about yourself. You can move through five short steps—start with the essentials.
        </p>
      </header>

      <ol className="mt-10 grid gap-3 sm:grid-cols-5">
        {steps.map((item, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-current={active ? "step" : undefined}
                className={`w-full border-t pt-3 text-left transition-colors ${
                  active || done ? "border-brand" : "border-black/10"
                }`}
              >
                <span
                  className={`block text-[11px] tabular-nums tracking-[0.14em] uppercase ${
                    active || done ? "text-brand" : "text-neutral-400"
                  }`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`mt-1 block text-[13px] font-medium ${
                    active ? "text-neutral-950" : done ? "text-neutral-700" : "text-neutral-400"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <section aria-labelledby={`step-${step.id}-title`} className="mt-12">
        <div className="flex items-end justify-between gap-4 border-b border-black/10 pb-4">
          <h2
            id={`step-${step.id}-title`}
            className="text-[1.35rem] font-semibold tracking-[-0.03em] text-neutral-950"
          >
            {step.label}
          </h2>
          <p className="text-[12px] tabular-nums text-neutral-400">
            {current + 1} / {steps.length}
          </p>
        </div>

        {step.id === "personal" ? (
          <PersonalDetailsStep value={personal} errors={personalErrors} onChange={onPersonalChange} />
        ) : step.id === "qualification" ? (
          <QualificationDetailsStep
            value={qualification}
            errors={qualificationErrors}
            onChange={onQualificationChange}
          />
        ) : step.id === "about" ? (
          <AboutDetailsStep value={about} errors={aboutErrors} onChange={onAboutChange} />
        ) : step.id === "references" ? (
          <ReferencesDetailsStep
            value={references}
            errors={referencesErrors}
            onChange={onReferencesChange}
          />
        ) : (
          <IdentificationDetailsStep
            value={identification}
            errors={identificationErrors}
            email={personal.email}
            uploadSessionId={uploadSessionId}
            onChange={onIdentificationChange}
          />
        )}
      </section>

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-black/10 pt-6">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={isFirst || submitting}
          className={`${button} border border-black/10 bg-white text-neutral-950 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => void onContinue()}
          disabled={submitting}
          className={`${button} bg-brand text-white hover:bg-[#d85c42] disabled:cursor-wait disabled:opacity-70`}
        >
          {isLast ? (submitting ? "Submitting…" : "Submit application") : "Continue"}
        </button>
      </div>
    </div>
  );
}

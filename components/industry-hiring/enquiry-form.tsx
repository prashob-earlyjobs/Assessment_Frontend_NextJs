"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/track-event";

const fieldClass =
  "mt-1.5 h-11 w-full border border-black/10 bg-white px-3 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-brand";

type IndustryEnquiryFormProps = {
  formId: string;
  sourceLabel: string;
  submitLabel: string;
  defaultMessage: string;
  extraFields?:
    | "pharma"
    | "electronics"
    | "solar"
    | "automotive"
    | "diagnostic"
    | "warehouse"
    | "battery"
    | "food"
    | "construction"
    | "medical"
    | "semiconductor";
};

export function IndustryEnquiryForm({
  formId,
  sourceLabel,
  submitLabel,
  defaultMessage,
  extraFields = "pharma",
}: IndustryEnquiryFormProps) {
  const started = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onStart() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_id: formId, location: formId });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const parts = name.split(/\s+/);
    const firstName = parts[0] || name;
    const lastName = parts.slice(1).join(" ") || "—";
    const company = String(form.get("company") ?? "").trim();
    const plantLocation = String(form.get("plantLocation") ?? "").trim();
    const hiringVolume = String(form.get("hiringVolume") ?? "").trim();
    const roles = String(form.get("roles") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();

    const messageParts = [
      defaultMessage,
      plantLocation ? `Plant location: ${plantLocation}` : null,
      hiringVolume ? `Hiring volume: ${hiringVolume}` : null,
      roles ? `Roles / departments: ${roles}` : null,
      notes ? `Notes: ${notes}` : null,
      `Source page: ${sourceLabel}`,
    ].filter(Boolean);

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.get("email"),
          phone: String(form.get("phone") ?? "").replace(/\D/g, "").slice(0, 10),
          phoneCode: "+91",
          topic: "Hiring for my company",
          company,
          message: messageParts.join("\n"),
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; mailtoUrl?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Could not send your enquiry.");
      }
      if (payload.mailtoUrl) window.location.href = payload.mailtoUrl;
      trackEvent("generate_lead", { form_id: formId, location: formId });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your enquiry.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-black/10 bg-[#f7f8fa] p-6 sm:p-8">
        <p className="text-sm font-medium text-neutral-950">Enquiry received.</p>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Our team will review your hiring requirements and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={onStart}
      className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
        Enterprise enquiry
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
        Share your hiring brief
      </h3>
      <p className="mt-2 text-sm leading-6 text-neutral-600">
        Tell us about roles, location and timeline. We&apos;ll assess fit and respond.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block text-[12px] font-medium text-neutral-700">
          Full name
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-neutral-700">
          Work email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-neutral-700">
          Company
          <input name="company" required autoComplete="organization" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-neutral-700">
          Phone
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-neutral-700">
          {extraFields === "solar" || extraFields === "construction"
            ? "Project location"
            : extraFields === "diagnostic"
              ? "Branch / centre location"
              : extraFields === "warehouse"
                ? "Facility location"
                : "Plant location"}
          <input
            name="plantLocation"
            required
            placeholder={
              extraFields === "electronics"
                ? "e.g. Sriperumbudur, TN"
                : extraFields === "solar"
                  ? "e.g. Bikaner, RJ"
                  : extraFields === "automotive"
                    ? "e.g. Chennai, TN"
                    : extraFields === "diagnostic"
                      ? "e.g. Pune, MH — multiple branches welcome"
                      : extraFields === "warehouse"
                        ? "e.g. Bhiwandi, MH — multi-DC welcome"
                        : extraFields === "battery"
                          ? "e.g. Sanand, GJ — multi-plant welcome"
                          : extraFields === "food"
                            ? "e.g. Nashik, MH"
                            : extraFields === "construction"
                              ? "e.g. Nagpur, MH — multi-site welcome"
                              : extraFields === "medical"
                                ? "e.g. Bengaluru, KA — facility-specific"
                                : extraFields === "semiconductor"
                                  ? "e.g. Greater Noida, UP — facility-specific"
                                  : "e.g. Hyderabad, TS"
            }
            className={fieldClass}
          />
        </label>
        {extraFields === "electronics" ||
        extraFields === "solar" ||
        extraFields === "automotive" ||
        extraFields === "diagnostic" ||
        extraFields === "warehouse" ||
        extraFields === "battery" ||
        extraFields === "food" ||
        extraFields === "construction" ||
        extraFields === "medical" ||
        extraFields === "semiconductor" ? (
          <>
            {extraFields === "automotive" ||
            extraFields === "diagnostic" ||
            extraFields === "warehouse" ||
            extraFields === "battery" ||
            extraFields === "food" ||
            extraFields === "construction" ||
            extraFields === "medical" ||
            extraFields === "semiconductor" ? (
              <label className="block text-[12px] font-medium text-neutral-700">
                {extraFields === "battery" ||
                extraFields === "food" ||
                extraFields === "construction" ||
                extraFields === "medical" ||
                extraFields === "semiconductor"
                  ? "Role category"
                  : "Role type"}
                <input
                  name="roles"
                  required
                  placeholder={
                    extraFields === "diagnostic"
                      ? "e.g. Lab assistant, phlebotomist, front desk"
                      : extraFields === "warehouse"
                        ? "e.g. Pickers, packers, inventory, dispatch"
                        : extraFields === "battery"
                          ? "e.g. Assembly trainee, quality, warehouse"
                          : extraFields === "food"
                            ? "e.g. Packaging, production, warehouse"
                            : extraFields === "construction"
                              ? "e.g. Site support, trades, equipment, admin"
                              : extraFields === "medical"
                                ? "e.g. Assembly, packaging, quality, materials"
                                : extraFields === "semiconductor"
                                  ? "e.g. Production trainee, assembly, junior technician"
                                  : "e.g. Assembly operator, quality trainee"
                  }
                  className={fieldClass}
                />
              </label>
            ) : null}
            <label className="block text-[12px] font-medium text-neutral-700">
              Hiring volume
              {extraFields === "warehouse" || extraFields === "construction" ? (
                <select name="hiringVolume" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select expected volume
                  </option>
                  <option value="1–10 openings">1–10 openings</option>
                  <option value="11–25 openings">11–25 openings</option>
                  <option value="26–50 openings">26–50 openings</option>
                  <option value="51–100 openings">51–100 openings</option>
                  {extraFields === "construction" ? (
                    <option value="100+ openings / multi-site">100+ openings / multi-site</option>
                  ) : (
                    <option value="100+ openings / multi-facility">
                      100+ openings / multi-facility
                    </option>
                  )}
                </select>
              ) : (
                <input
                  name="hiringVolume"
                  required
                  placeholder={
                    extraFields === "solar"
                      ? "e.g. 25 installation helpers"
                      : extraFields === "diagnostic"
                        ? "e.g. 12 across 3 branches"
                        : extraFields === "automotive"
                          ? "e.g. 50 production trainees"
                          : extraFields === "battery"
                            ? "e.g. 80 production trainees across shifts"
                            : extraFields === "food"
                              ? "e.g. 40 packaging associates"
                              : extraFields === "medical"
                                ? "e.g. 35 assembly trainees"
                                : extraFields === "semiconductor"
                                  ? "e.g. 60 production trainees / phased facility hire"
                                  : "e.g. 40 assembly operators"
                  }
                  className={fieldClass}
                />
              )}
            </label>
          </>
        ) : (
          <label className="block text-[12px] font-medium text-neutral-700">
            Roles / departments
            <input
              name="roles"
              required
              placeholder="e.g. Packaging, QC trainees"
              className={fieldClass}
            />
          </label>
        )}
        <label className="block text-[12px] font-medium text-neutral-700">
          Additional context
          <textarea
            name="notes"
            rows={3}
            placeholder="Shift pattern, joining timeline, qualification criteria…"
            className={`${fieldClass} h-auto py-2.5`}
          />
        </label>
        <label className="flex items-start gap-2 text-sm leading-6 text-neutral-700">
          <input name="consent" type="checkbox" required className="mt-1" />
          <span>
            I agree to be contacted about this hiring enquiry.{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-[6px] bg-brand text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42] disabled:opacity-60"
      >
        {submitting ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

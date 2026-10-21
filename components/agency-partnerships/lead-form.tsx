"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/track-event";

const specialisations = [
  "BPO",
  "IT",
  "Banking",
  "Insurance",
  "Aviation",
  "Retail",
  "Education",
  "Manufacturing",
  "Healthcare",
  "E-commerce",
  "Hospitality",
  "Construction",
  "Other",
] as const;

const fieldClass =
  "mt-1.5 h-11 w-full border border-black/10 bg-white px-3 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-brand";

export function AgencyPartnershipLeadForm() {
  const started = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onStart() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_id: "agency_partnership", location: "agency_partnerships" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          agencyName: form.get("agencyName"),
          email: form.get("email"),
          phone: form.get("phone"),
          specialisation: form.get("specialisation"),
          cities: form.get("cities"),
          consent: form.get("consent") === "on",
          source: "agency_partnership",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; mailtoUrl?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Could not send your application.");
      }
      if (payload.mailtoUrl) window.location.href = payload.mailtoUrl;
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your application.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <p className="text-sm leading-6 text-neutral-700">
        Thanks. We&apos;ll review your application and reply.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={onStart} className="space-y-4">
      <label className="block text-[12px] font-medium text-neutral-700">
        Name
        <input name="name" required autoComplete="name" className={fieldClass} />
      </label>
      <label className="block text-[12px] font-medium text-neutral-700">
        Agency name
        <input name="agencyName" required className={fieldClass} />
      </label>
      <label className="block text-[12px] font-medium text-neutral-700">
        Work email
        <input name="email" type="email" required autoComplete="email" className={fieldClass} />
      </label>
      <label className="block text-[12px] font-medium text-neutral-700">
        Phone
        <input name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
      </label>
      <label className="block text-[12px] font-medium text-neutral-700">
        Primary specialisation
        <select name="specialisation" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Select a specialisation
          </option>
          {specialisations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[12px] font-medium text-neutral-700">
        Cities served
        <input name="cities" required className={fieldClass} />
      </label>
      <label className="flex items-start gap-2 text-sm leading-6 text-neutral-700">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          I agree to be contacted about partnership.{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Apply to partner"}
      </button>
      <p className="text-[12px] leading-5 text-neutral-500">
        Partnerships are subject to suitability, availability and mutually agreed terms.
      </p>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track-event";

const whatsappHref =
  "https://wa.me/918217527926?text=Hi%20EarlyJobs%2C%20I%20just%20applied%20as%20a%20freelance%20recruiter";

export function RecruiterThankYou() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const params = new URLSearchParams(window.location.search);
    trackEvent("generate_lead", {
      lead_type: "freelance_recruiter",
      value: 1,
      utm_source: params.get("utm_source") ?? undefined,
      utm_medium: params.get("utm_medium") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
    });
  }, []);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16">
      <h1 className="text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.04em] text-neutral-950">
        Application received.
      </h1>
      {/* TODO(content): review window "[X] working days" omitted until a real SLA is supplied. */}
      <h2 className="mt-8 text-lg font-semibold">What happens next</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-neutral-700">
        <li>We review your application.</li>
        <li>You receive onboarding details on WhatsApp and email.</li>
        <li>Start exploring mandates once onboarded.</li>
      </ol>
      <h2 className="mt-10 text-lg font-semibold">While you wait</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={whatsappHref}
          onClick={() =>
            trackEvent("whatsapp_click", {
              cta_id: "recruiter_whatsapp_thank_you",
              audience: "recruiter",
              location: "thank_you",
            })
          }
          className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-medium text-white"
        >
          Join the recruiter community on WhatsApp
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.victaman.earlyjobs"
          className="inline-flex h-11 items-center rounded-full border border-black/10 px-5 text-sm font-medium"
        >
          Download the EarlyJobs app
        </a>
        <Link href="/become-a-recruiter" className="inline-flex h-11 items-center text-sm underline">
          Back to Become a Recruiter
        </Link>
      </div>
    </main>
  );
}

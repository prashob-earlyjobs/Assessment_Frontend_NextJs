"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  earlyJobsContact,
  enquiryTopics,
  gigKaroContact,
  huntloContact,
  isValidEmail,
} from "@/lib/contact";

const supportBlocks = [
  {
    title: "Hiring & Business Enquiries",
    body: "For companies looking to hire professionals, build teams, or explore recruitment solutions.",
  },
  {
    title: "Recruitment Partnerships",
    body: "For recruitment consultancies, freelance recruiters, franchise partners, and workforce partners.",
  },
  {
    title: "General Enquiries",
    body: "For questions about EarlyJobs, our services, or potential collaborations.",
  },
] as const;

const faqs = [
  {
    q: "What hiring services does EarlyJobs offer?",
    a: "EarlyJobs offers recruitment across IT, finance, sales and marketing, HR, executive hiring, global recruitment, GCC talent acquisition and Recruitment Process Outsourcing. GigKaro focuses on frontline and gig workforce hiring.",
  },
  {
    q: "Can businesses partner with EarlyJobs for recruitment?",
    a: "Yes. Companies can explore corporate hiring, global or GCC recruitment, RPO and related solutions through EarlyJobs. Share your requirements and our team will discuss a suitable approach.",
  },
  {
    q: "How can I join the EarlyJobs recruiter network?",
    a: "Freelance recruiters can apply through Become a Recruiter, and recruitment consultancies can explore collaboration via Agency Onboarding. Scope and commercial terms are agreed for each partnership.",
  },
  {
    q: "Does EarlyJobs support international hiring?",
    a: "EarlyJobs is building global recruitment capabilities, including hiring support for markets such as the US and UAE. Available markets, roles and delivery models depend on the specific requirement.",
  },
  {
    q: "How can I hire frontline workers through GigKaro?",
    a: "GigKaro, by EarlyJobs, focuses on frontline and gig workforce hiring across operational roles. Reach out via the form selecting “Frontline hiring through GigKaro”, or contact GigKaro directly.",
  },
  {
    q: "How do I get started with EarlyJobs?",
    a: "Tell us about your hiring needs, roles, locations and timelines using the form on this page. Our team will review the enquiry and follow up to discuss next steps.",
  },
] as const;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  topic: "",
  company: "",
  message: "",
};

const MESSAGE_MAX = 500;

const fieldClass =
  "mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25";
const textareaClass =
  "mt-1.5 w-full resize-none rounded-xl border border-black/10 bg-[#fafafa] px-3.5 py-3 text-sm text-neutral-950 outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25";
const selectClass = `${fieldClass} appearance-none bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat pr-10`;
const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!form.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!form.email.trim()) errors.email = "Enter your work email.";
  else if (!isValidEmail(form.email)) errors.email = "Enter a valid email address.";
  if (!form.topic) errors.topic = "Select what you are contacting us about.";
  if (!form.message.trim()) errors.message = "Tell us how we can help.";
  else if (form.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }
  return errors;
}

export function ContactPage() {
  const formIds = {
    firstName: useId(),
    lastName: useId(),
    email: useId(),
    phone: useId(),
    topic: useId(),
    company: useId(),
    message: useId(),
    faqEmail: useId(),
  };
  const [faqIndex, setFaqIndex] = useState(0);
  const [faqEmail, setFaqEmail] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || sent) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          topic: form.topic,
          company: form.company.trim() || undefined,
          message: form.message.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        delivery?: "mailto" | "webhook";
        mailtoUrl?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setSubmitError(
          data?.error ||
            "We could not send your enquiry. Please email info@earlyjobs.in or try again.",
        );
        return;
      }

      if (data.delivery === "mailto" && data.mailtoUrl) {
        window.location.href = data.mailtoUrl;
      }

      setSent(true);
      setForm(emptyForm);
    } catch {
      setSubmitError(
        "We could not send your enquiry. Please email info@earlyjobs.in or try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onFaqEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = faqEmail.trim();
    if (!isValidEmail(email)) return;
    window.location.href = `mailto:${earlyJobsContact.email}?subject=${encodeURIComponent("Contact enquiry")}&body=${encodeURIComponent(`Please get back to me at ${email}.`)}`;
  };

  return (
    <main className="bg-white text-neutral-950">
      {/* Hero + form — mockup two-column */}
      <section className="bg-[#eef4fb]">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14 lg:py-24">
          <div>
            <h1 className="text-[2.6rem] leading-[1.05] font-medium tracking-[-0.045em] sm:text-[3.4rem]">
              Contact Us
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-neutral-600 sm:text-base">
              Email, call, or complete the form to learn how EarlyJobs can support your hiring or
              partnership goals.
            </p>

            <div className="mt-8 space-y-2 text-[15px]">
              <p>
                <a
                  href={`mailto:${earlyJobsContact.email}`}
                  className="font-medium text-brand hover:underline"
                >
                  {earlyJobsContact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${earlyJobsContact.phoneTel}`}
                  className="font-medium text-neutral-950 hover:underline"
                >
                  {earlyJobsContact.phoneDisplay}
                </a>
              </p>
              <p>
                <a href="#support" className="font-medium text-neutral-950 hover:underline">
                  Customer Support
                </a>
              </p>
            </div>

            <div
              id="support"
              className="mt-12 grid scroll-mt-28 gap-8 sm:grid-cols-3 sm:gap-6"
            >
              {supportBlocks.map((block) => (
                <div key={block.title}>
                  <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950">
                    {block.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-6 text-neutral-600">{block.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 border-t border-black/8 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-[13px] font-semibold text-neutral-950">GigKaro</p>
                <p className="mt-1 text-[12px] leading-5 text-neutral-500">
                  Frontline &amp; gig workforce hiring
                </p>
                <a
                  href={`mailto:${gigKaroContact.email}`}
                  className="mt-2 block text-[13px] font-medium text-brand hover:underline"
                >
                  {gigKaroContact.email}
                </a>
                <a
                  href={`tel:${gigKaroContact.phoneTel}`}
                  className="mt-1 block text-[13px] text-neutral-700 hover:underline"
                >
                  {gigKaroContact.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-neutral-950">Huntlo</p>
                <p className="mt-1 text-[12px] leading-5 text-neutral-500">AI recruiting agent</p>
                <a
                  href={`mailto:${huntloContact.email}`}
                  className="mt-2 block text-[13px] font-medium text-brand hover:underline"
                >
                  {huntloContact.email}
                </a>
                <a
                  href={`tel:${huntloContact.phoneTel}`}
                  className="mt-1 block text-[13px] text-neutral-700 hover:underline"
                >
                  {huntloContact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div
            id="enquiry"
            className="scroll-mt-28 rounded-[22px] border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8"
          >
            {sent ? (
              <div className="flex min-h-[360px] flex-col justify-center text-center">
                <h2 className="text-[1.5rem] font-medium tracking-[-0.03em]">Almost done</h2>
                <p className="mt-3 text-[15px] leading-7 text-neutral-600">
                  Your email app should open with the enquiry to{" "}
                  <a href={`mailto:${earlyJobsContact.email}`} className="text-brand underline">
                    {earlyJobsContact.email}
                  </a>
                  . Send that message to complete your enquiry. If nothing opened, email us
                  directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setSubmitError(null);
                  }}
                  className="mt-8 inline-flex h-11 cursor-pointer items-center justify-center self-center rounded-full border border-black/12 px-5 text-[13px] font-medium text-neutral-950 hover:bg-neutral-50"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 className="text-[1.55rem] font-medium tracking-[-0.03em]">Get in Touch</h2>
                <p className="mt-1 text-[14px] leading-6 text-neutral-500">
                  You can reach us anytime
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field
                    id={formIds.firstName}
                    label="First name"
                    error={errors.firstName}
                    required
                  >
                    <input
                      id={formIds.firstName}
                      name="firstName"
                      autoComplete="given-name"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={errors.firstName ? `${formIds.firstName}-error` : undefined}
                      className={fieldClass}
                    />
                  </Field>
                  <Field id={formIds.lastName} label="Last name" error={errors.lastName} required>
                    <input
                      id={formIds.lastName}
                      name="lastName"
                      autoComplete="family-name"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={errors.lastName ? `${formIds.lastName}-error` : undefined}
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    id={formIds.email}
                    label="Work email"
                    error={errors.email}
                    required
                    className="sm:col-span-2"
                  >
                    <input
                      id={formIds.email}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? `${formIds.email}-error` : undefined}
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    id={formIds.phone}
                    label="Phone number"
                    hint="Optional"
                    className="sm:col-span-2"
                  >
                    <input
                      id={formIds.phone}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    id={formIds.topic}
                    label="I am contacting you about"
                    error={errors.topic}
                    required
                    className="sm:col-span-2"
                  >
                    <select
                      id={formIds.topic}
                      name="topic"
                      value={form.topic}
                      onChange={(e) => update("topic", e.target.value)}
                      aria-invalid={Boolean(errors.topic)}
                      aria-describedby={errors.topic ? `${formIds.topic}-error` : undefined}
                      className={selectClass}
                      style={{ backgroundImage: selectChevron }}
                    >
                      <option value="">Select an option</option>
                      {enquiryTopics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    id={formIds.company}
                    label="Company name"
                    hint="Optional"
                    className="sm:col-span-2"
                  >
                    <input
                      id={formIds.company}
                      name="company"
                      autoComplete="organization"
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    id={formIds.message}
                    label="How can we help?"
                    error={errors.message}
                    required
                    className="sm:col-span-2"
                  >
                    <textarea
                      id={formIds.message}
                      name="message"
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      placeholder="How can we help?"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message
                          ? `${formIds.message}-error`
                          : `${formIds.message}-count`
                      }
                      className={textareaClass}
                    />
                    <p
                      id={`${formIds.message}-count`}
                      className="mt-1.5 text-right text-[11px] text-neutral-400"
                    >
                      {form.message.length}/{MESSAGE_MAX}
                    </p>
                  </Field>
                </div>

                {submitError ? (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-5 text-red-700"
                  >
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-brand text-[13px] font-medium text-white transition-colors hover:bg-[#d85c42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "Submit"}
                </button>
                <p className="mt-4 text-center text-[12px] leading-5 text-neutral-500">
                  By contacting us you agree to our{" "}
                  <Link href="/terms-and-conditions" className="underline underline-offset-2">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Location + map — mockup two-column */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative min-h-[320px] overflow-hidden rounded-[22px] bg-[#f4f4f4] sm:min-h-[400px]">
            <iframe
              title="EarlyJobs office location"
              src={earlyJobsContact.mapsEmbed}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-[16px] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:right-auto sm:max-w-xs">
              <div className="flex items-start gap-3">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={40}
                  height={28}
                  className="mt-0.5 h-7 w-auto object-contain"
                />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-neutral-950">EarlyJobs</p>
                  <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">
                    Recruiter-first hiring network
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-5 text-neutral-600">
                {earlyJobsContact.addressShort}
              </p>
              <a
                href={earlyJobsContact.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-brand hover:underline"
              >
                Open Google Maps
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
              Our Location
            </p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.5rem]">
              Connecting Near and Far
            </h2>
            <div className="mt-8">
              <h3 className="text-[15px] font-semibold text-neutral-950">Headquarters</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-neutral-600">
                EarlyJobs
                <br />
                2nd Floor, Regent Insignia, Obeya Tulip
                <br />
                Mahakavi Vemana Rd, KHB Block, 4th Block
                <br />
                Koramangala, Bengaluru
                <br />
                Karnataka 560095
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — mockup two-column with email field */}
      <section className="border-t border-black/8 bg-white py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
              FAQ
            </p>
            <h2 className="mt-4 max-w-sm text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.5rem]">
              Do you have any questions for us?
            </h2>
            <form
              onSubmit={onFaqEmailSubmit}
              className="mt-8 flex h-12 max-w-sm items-center gap-2 rounded-full border border-black/10 bg-white p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <label htmlFor={formIds.faqEmail} className="sr-only">
                Your email
              </label>
              <input
                id={formIds.faqEmail}
                type="email"
                required
                placeholder="Enter your email address"
                value={faqEmail}
                onChange={(e) => setFaqEmail(e.target.value)}
                className="min-w-0 flex-1 bg-transparent px-3 text-[13px] outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand px-4 text-[12px] font-medium text-white hover:bg-[#d85c42]"
              >
                Submit
              </button>
            </form>
          </div>

          <ul className="divide-y divide-black/10 border-y border-black/10">
            {faqs.map((faq, i) => {
              const open = faqIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <li key={faq.q}>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setFaqIndex(open ? -1 : i)}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2"
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span className="min-w-0 text-[1.05rem] font-medium tracking-[-0.02em] text-neutral-950">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1 flex size-6 shrink-0 items-center justify-center text-neutral-400 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 5L7 9L11 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-[15px] leading-7 text-neutral-600">{faq.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA — mockup style */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="relative mx-auto flex min-h-[280px] w-full max-w-[1120px] items-center justify-center overflow-hidden rounded-[28px] px-5 py-14 sm:min-h-[320px] sm:px-10">
          <Image
            src="/clientele/cta-bg.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1120px) 1120px, 100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/65 to-neutral-950/80"
          />
          <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <h2 className="text-[1.85rem] leading-[1.15] font-medium tracking-[-0.035em] sm:text-[2.4rem]">
              Ready to hire smarter with EarlyJobs?
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#enquiry"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[13px] font-medium text-neutral-950 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Get Started
              </a>
              <Link
                href="/clientele"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/40 px-6 text-[13px] font-medium text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Learn more
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  required,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`block text-left ${className}`}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2">
        <span className="text-[12px] font-medium text-neutral-500">
          {label}
          {required ? <span className="text-brand"> *</span> : null}
        </span>
        {hint ? <span className="text-[11px] text-neutral-400">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] leading-4 text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

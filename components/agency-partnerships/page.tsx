import Image from "next/image";
import Link from "next/link";
import { AgencyPartnershipLeadForm } from "@/components/agency-partnerships/lead-form";

const cards = [
  {
    title: "Verified mandates",
    body: "Work on real hiring requirements from trusted employers.",
  },
  {
    title: "More cities, more categories",
    body: "Take on roles beyond your current client base.",
  },
  {
    title: "Technology that saves time",
    body: "AI-assisted sourcing, screening and scheduling through Huntlo AI.",
  },
  {
    title: "Zero candidate fees",
    body: "Candidates are never charged. It is part of the partnership agreement.",
  },
] as const;

const steps = [
  "Apply in 2 minutes.",
  "We verify your agency.",
  "Complete onboarding.",
  "Receive mandates in your categories.",
  "Earn on successful placements.",
] as const;

const faqs = [
  {
    q: "Who can partner with EarlyJobs as an agency?",
    a: "Recruitment agencies and consultancies that hire in one or more categories, such as IT, BPO, banking, insurance, retail or healthcare. Partnerships are subject to suitability, availability and mutually agreed terms.",
  },
  {
    q: "Can agencies charge candidates a fee?",
    a: "No. Agencies must agree not to charge candidates any fee at any stage of the hiring process. Violations can lead to legal action.",
  },
] as const;

export function AgencyPartnershipsPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="page-shell page-section grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="text-[2.4rem] leading-[1.05] font-medium tracking-[-0.045em] sm:text-[3.2rem]">
            Partner with EarlyJobs. Work more mandates, with no candidate fees.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-neutral-600">
            Recruitment agencies and consultancies get verified hiring mandates from employers
            across India, without building every client relationship from scratch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apply"
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Apply to partner
            </a>
            {/* TODO(content): "Download the partner overview" omitted — no overview file was supplied. */}
          </div>
        </div>
        <div className="media-frame relative aspect-[8/7] w-full">
          <Image
            src="/agency-partnerships/partnership-handshake.jpg"
            alt="Recruitment agencies partnering with EarlyJobs"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 36rem, 100vw"
          />
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="page-shell page-section">
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em] sm:text-[2.5rem]">
            Why agencies partner with EarlyJobs
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {cards.map((card) => (
              <li key={card.title} className="border border-black/10 p-6">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-black/10 bg-[#f7f5f2]">
        <div className="page-shell page-section">
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em] sm:text-[2.5rem]">How it works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step} className="bg-white p-4">
                <span className="text-xs font-semibold text-brand">{index + 1}</span>
                <p className="mt-2 text-sm leading-6 text-neutral-800">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="page-shell page-section max-w-3xl">
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">Who we partner with</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Recruitment agencies and consultancies that hire in one or more categories, such as IT,
            BPO, banking, insurance, retail or healthcare.
          </p>
          <h2 className="mt-12 text-[2rem] font-semibold tracking-[-0.04em]">
            What we expect (zero candidate fee)
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Agencies must agree not to charge candidates any fee at any stage of the hiring process.
            Violations can lead to legal action.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#f7f5f2]">
        <div className="page-shell page-section max-w-3xl">
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">FAQ</h2>
          {/* TODO(content): skipped "What does onboarding involve?" — answer contained an unconfirmed document list. */}
          {/* TODO(content): skipped "How do agencies earn through EarlyJobs?" — answer contained an unconfirmed commission structure and payout cycle. */}
          <div className="mt-6 divide-y divide-black/10">
            {faqs.map((item) => (
              <details key={item.q} className="py-4">
                <summary className="cursor-pointer font-semibold">{item.q}</summary>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 border-t border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">Apply</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Tell us about your agency. Partnerships are subject to suitability, availability and
              mutually agreed terms.
            </p>
            <p className="mt-4 text-sm">
              Already invited?{" "}
              <Link href="/agency-onboarding" className="underline">
                Continue agency onboarding
              </Link>
              .
            </p>
          </div>
          {/* TODO(content): success line omitted the unconfirmed "[X] working days" reply window. */}
          <AgencyPartnershipLeadForm />
        </div>
      </section>
    </main>
  );
}

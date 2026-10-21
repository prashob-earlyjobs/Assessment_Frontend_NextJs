import Image from "next/image";
import Link from "next/link";
import { AgencyPartnershipLeadForm } from "@/components/agency-partnerships/lead-form";

const cards = [
  {
    title: "Share Your Expertise",
    body: "Tell us about your agency's recruitment focus and the roles you specialise in.",
  },
  {
    title: "Discuss Hiring Requirements",
    body: "Explore whether your agency's capabilities align with relevant recruitment needs.",
  },
  {
    title: "Understand the Working Arrangement",
    body: "Review the applicable onboarding requirements and commercial terms before proceeding.",
  },
  {
    title: "How to get started",
    body: "Submit a partnership enquiry with accurate agency details. The information can be reviewed to assess whether there is a suitable basis for collaboration.",
  },
] as const;

const steps = [
  "Share your agency's recruitment focus.",
  "Tell us the roles you specialise in.",
  "Explore whether your capabilities align with relevant needs.",
  "Review the applicable onboarding requirements.",
  "Review commercial terms before proceeding.",
] as const;

const faqs = [
  {
    q: "Who can enquire about a partnership?",
    a: "We welcome enquiries from recruitment agencies interested in sharing their hiring specialisations, industry experience, and operating capabilities.",
  },
  {
    q: "Does submitting an enquiry guarantee a partnership?",
    a: "Submitting an enquiry does not guarantee partnership approval, mandate allocation, or business outcomes.",
  },
] as const;

export function AgencyPartnershipsPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="page-shell page-section grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="text-[2.4rem] leading-[1.05] font-medium tracking-[-0.045em] sm:text-[3.2rem]">
            Recruitment Agency Partnerships with EarlyJobs
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-neutral-600">
            Explore opportunities to collaborate with EarlyJobs on recruitment requirements. We
            welcome enquiries from recruitment agencies interested in sharing their hiring
            specialisations, industry experience, and operating capabilities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apply"
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Enquire About a Partnership
            </a>
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
            Explore a potential partnership
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
            We welcome enquiries from recruitment agencies interested in sharing their hiring
            specialisations, industry experience, and operating capabilities.
          </p>
          <h2 className="mt-12 text-[2rem] font-semibold tracking-[-0.04em]">Important information</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Submitting an enquiry does not guarantee partnership approval, mandate allocation, or
            business outcomes. Review the applicable onboarding requirements and commercial terms
            before proceeding.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#f7f5f2]">
        <div className="page-shell page-section max-w-3xl">
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">FAQ</h2>
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
            <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">How to get started</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Submit a partnership enquiry with accurate agency details. The information can be
              reviewed to assess whether there is a suitable basis for collaboration. Submitting an
              enquiry does not guarantee partnership approval, mandate allocation, or business
              outcomes.
            </p>
            <p className="mt-4 text-sm">
              Already invited?{" "}
              <Link href="/agency-onboarding" className="underline">
                Continue agency onboarding
              </Link>
              .
            </p>
          </div>
          <AgencyPartnershipLeadForm />
        </div>
      </section>
    </main>
  );
}

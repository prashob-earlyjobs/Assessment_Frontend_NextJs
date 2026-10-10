import Image from "next/image";
import Link from "next/link";
import { companyFacts } from "@/data/company-facts";

const clientLogos = [
  { src: "/client_logos/flipkart.png", alt: "Flipkart" },
  { src: "/client_logos/hdfc.png", alt: "HDFC" },
  { src: "/client_logos/bb.png", alt: "BigBasket" },
  { src: "/client_logos/shaadi.png", alt: "Shaadi.com" },
  { src: "/client_logos/tp.png", alt: "Teleperformance" },
  { src: "/client_logos/cogent.png", alt: "Cogent" },
  { src: "/client_logos/starhealth.png", alt: "Star Health" },
  { src: "/client_logos/hgs.png", alt: "HGS" },
  { src: "/client_logos/ebixcash.png", alt: "EbixCash" },
  { src: "/client_logos/allsec.png", alt: "Allsec" },
  { src: "/client_logos/genius.png", alt: "Genius" },
  { src: "/client_logos/jindl.png", alt: "Jindal" },
  { src: "/client_logos/altrust.png", alt: "Altrust" },
  { src: "/client_logos/taurus.png", alt: "Taurus" },
  { src: "/client_logos/ecpl.png", alt: "ECPL" },
  { src: "/client_logos/qpoint1.png", alt: "Qpoint" },
] as const;

const partnerLogos = Array.from({ length: 18 }, (_, index) => ({
  src: `/partners/${index + 1}.png`,
  alt: "Hiring partner",
}));

const quotes = [
  {
    role: "Startup Founder",
    quote: "Reduced hiring time by connecting with specialized recruiters.",
  },
  {
    role: "HR Manager",
    quote: "Improved candidate quality without increasing hiring costs.",
  },
  {
    role: "Enterprise TA Lead",
    quote: "Scaled hiring across multiple functions with recruiter-led coordination.",
  },
] as const;

const stats = [
  companyFacts.companies,
  companyFacts.recruiters,
  companyFacts.interviews,
  companyFacts.joinings,
] as const;

export function CompanyTieUpsPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
            Company tie-ups
          </p>
          <h1 className="mt-4 max-w-xl text-[2.6rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-[4rem]">
            Made for the roles that companies need filled.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600">
            EarlyJobs powers hiring for India&apos;s brands through a recruiter-first network.
            Employers share a requirement. Recruiters who know the market bring the candidates.
          </p>
          <Link
            href="/employers"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Start hiring
          </Link>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-neutral-100 sm:aspect-[5/4]">
            <Image
              src="/freelance-recruiters/hero-culture.jpg"
              alt="A recruiter at work"
              fill
              priority
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-[#111] p-5 text-white shadow-xl sm:right-auto sm:w-64">
            <p className="text-3xl font-medium tracking-[-0.04em]">{companyFacts.companies.value}</p>
            <p className="mt-1 text-sm text-white/70">Companies hiring through the network</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0F10] text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <h2 className="max-w-md text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.6rem]">
              A faster way to fill the roles that matter.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/70 sm:text-base">
              EarlyJobs connects hiring teams with independent recruiters, supported by AI-assisted
              matching, so companies spend less time screening and more time interviewing.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-8">
            {stats.map((item) => (
              <li key={item.label}>
                <p className="text-[2rem] font-medium tracking-[-0.04em] sm:text-[2.5rem]">{item.value}</p>
                <p className="mt-1 text-sm text-white/55">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-center text-[11px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          Testimonials
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-center text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.75rem]">
          Don&apos;t just take our word for it
        </h2>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {quotes.map((item, index) => (
            <li
              key={item.role}
              className={`flex min-h-56 flex-col justify-between rounded-2xl p-6 ${
                index === 1 ? "bg-[#111] text-white" : "bg-[#f4f4f4] text-neutral-950"
              }`}
            >
              <blockquote className="text-lg leading-7 tracking-[-0.02em]">“{item.quote}”</blockquote>
              <p className={`mt-8 text-sm ${index === 1 ? "text-white/60" : "text-neutral-500"}`}>
                {item.role}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-black/5 bg-[#f7f7f7]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="max-w-xl text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.5rem]">
            Companies hiring through EarlyJobs
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {clientLogos.map((logo) => (
              <li
                key={logo.src}
                className="flex h-24 items-center justify-center rounded-xl bg-white px-4"
              >
                <img src={logo.src} alt={logo.alt} className="max-h-10 w-auto max-w-[8.5rem] object-contain" />
              </li>
            ))}
          </ul>
          <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {partnerLogos.map((logo) => (
              <li
                key={logo.src}
                className="flex h-20 items-center justify-center rounded-xl bg-[#111] px-3"
              >
                <img src={logo.src} alt={logo.alt} className="max-h-8 w-auto max-w-[6.5rem] object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:px-8 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="max-w-xl text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.75rem]">
            Bring your next role to the network.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
            Share a hiring requirement and reach recruiters who already work with these companies.
          </p>
        </div>
        <Link
          href="/employers"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-brand px-5 text-sm font-medium text-white hover:bg-[#d85c42]"
        >
          Talk to EarlyJobs
        </Link>
      </section>
    </main>
  );
}

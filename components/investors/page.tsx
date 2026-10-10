import Image from "next/image";
import Link from "next/link";
import { companyFacts } from "@/data/company-facts";

const ink = "text-[#14352c]";

const links = [
  {
    title: "Investor Deck",
    href: "mailto:info@earlyjobs.in?subject=Investor%20deck%20request",
    external: true,
    icon: "document",
  },
  {
    title: "Company Metrics",
    href: "mailto:info@earlyjobs.in?subject=Company%20metrics%20request",
    external: true,
    icon: "metrics",
  },
  {
    title: "Newsroom",
    href: "/newsroom",
    external: false,
    icon: "announce",
  },
  {
    title: "Leadership",
    href: "/team",
    external: false,
    icon: "people",
  },
  {
    title: "Contact Us",
    href: "mailto:info@earlyjobs.in?subject=Investor%20enquiry",
    external: true,
    icon: "mail",
  },
  {
    title: "Our Story",
    href: "/story",
    external: false,
    icon: "archive",
  },
  {
    title: "Financial Overview",
    href: "mailto:info@earlyjobs.in?subject=Financial%20overview%20access%20request",
    external: true,
    icon: "results",
  },
] as const;

function LinkIcon({ name }: { name: (typeof links)[number]["icon"] }) {
  const common = "h-6 w-6";
  if (name === "metrics") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <path d="M7 4.5h7.5L19 9v10.5H7V4.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 4.8V9h4.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 15.5l2-2 1.6 1.4 2.4-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "announce") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <path d="M5 10.5v3.2c0 .6.4 1 1 1h1.2L12 18v-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 6.2 7.2 9.2H6c-.6 0-1 .4-1 1v.6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 6.2v7.6l5.2-3.1c.8-.5.8-1.6 0-2.1L12 6.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "people") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <path d="M4.5 18.5v-1.2A3.3 3.3 0 0 1 7.8 14h2.4a3.3 3.3 0 0 1 3.3 3.3v1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="9" cy="8.2" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 14.2h2.1A3.2 3.2 0 0 1 19.3 17.4v1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="15.2" cy="8.6" r="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4.5 7 7.5 6L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "archive") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <path d="M4 7.5h16v11.2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.2 4.8h17.6V7.5H3.2V4.8Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "results") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <path d="M7 4.5h7.5L19 9v10.5H7V4.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.2 16.2V13M12 16.2v-5M14.8 16.2V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
      <path d="M7 4.5h7.5L19 9v10.5H7V4.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 4.8V9h4.2M9.2 12.2h5.6M9.2 15.4h5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function InvestorsPage() {
  return (
    <main className="bg-white text-[#1c1c1c]">
      <section className="mx-auto w-full max-w-6xl px-5 pt-14 pb-6 sm:px-8 sm:pt-20">
        <p className="text-[13px] font-medium tracking-[0.14em] text-[#5d6b66] uppercase">
          Investor Relations
        </p>
        <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-16">
          <h1 className={`text-[3.1rem] leading-[1.02] font-medium tracking-[-0.04em] sm:text-[4.6rem] ${ink}`}>
            Our Mission
          </h1>
          <p className="max-w-md text-[1.15rem] leading-8 text-[#2c2c2c] lg:justify-self-end">
            To empower individuals and organizations by bridging the gap between talent and
            opportunity.
          </p>
        </div>
        <div className="relative mt-12 aspect-[16/6.2] overflow-hidden rounded-[28px] sm:mt-16">
          <Image
            src="/agency-partnerships/hero-lounge.jpg"
            alt="EarlyJobs team in conversation"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-[62%_center]"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className={`max-w-[10ch] text-[2.8rem] leading-[1.02] font-medium tracking-[-0.04em] sm:text-[4rem] ${ink}`}>
            About EarlyJobs
          </h2>
          <h3 className={`mt-8 text-xl font-medium tracking-[-0.02em] sm:text-2xl ${ink}`}>
            A recruiter-first hiring network
          </h3>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#3a3a3a] sm:text-base">
            EarlyJobs connects employers, independent recruiters, agencies and talent so companies
            can hire across India without building a centralized recruitment team for every role.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#3a3a3a] sm:text-base">
            Recruiters bring judgment and local context. Technology helps them move faster. The
            network now includes {companyFacts.recruiters.value} recruiters and{" "}
            {companyFacts.companies.value} hiring companies,             with {companyFacts.interviews.value} interviews and {companyFacts.joinings.value}{" "}
            joinings.
          </p>
        </div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-[28px]">
          <Image
            src="/freelance-recruiters/women-team.jpg"
            alt="EarlyJobs recruiters around a table"
            fill
            sizes="(min-width: 1024px) 36rem, 100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pt-4 pb-20 sm:px-8 sm:pb-28">
        <h2 className={`text-[2.6rem] leading-none font-medium tracking-[-0.04em] sm:text-[3.4rem] ${ink}`}>
          Quick Links
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {links.map((item) => {
            const className =
              "flex h-full min-h-[240px] flex-col rounded-[22px] border border-[#e6e6e4] bg-white p-7 sm:p-8";
            const inner = (
              <>
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f3] ${ink}`}>
                  <LinkIcon name={item.icon} />
                </span>
                <h3 className={`mt-8 text-[1.35rem] font-medium tracking-[-0.02em] ${ink}`}>
                  {item.title}
                </h3>
                <span className="mt-auto inline-flex w-fit rounded-full bg-[#f1f1ef] px-5 py-2.5 text-sm font-medium text-[#1f1f1f] transition-colors group-hover:bg-[#e7e7e4]">
                  View Details
                </span>
              </>
            );
            return (
              <li key={item.title}>
                {item.external ? (
                  <a href={item.href} className={`group ${className}`}>
                    {inner}
                  </a>
                ) : (
                  <Link href={item.href} className={`group ${className}`}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

import Image from "next/image";
import { NetworkStatsCopy } from "@/components/investors/network-stats";
import { Reveal } from "@/components/ui/reveal";

const ink = "text-[#14352c]";

const audienceRoles = [
  {
    name: "Shankar Gaur",
    title: "Non-Executive Director & Angel Investor",
    body: "30+ years of leadership experience, including expertise in scaling job marketplaces and high-growth startups.",
    image: "/images/shankar-gaur.jpg",
    linkedInUrl: "https://www.linkedin.com/in/shankargaur/",
  },
  {
    name: "Sridhar Sampathirao",
    title: "Angel Investor",
    body: "Angel investor and operator with experience building and scaling businesses across consulting and high-growth environments.",
    image: "/images/sridhar-sampathirao.jpg",
    linkedInUrl: "https://www.linkedin.com/in/sridharsampathirao/",
  },
  {
    name: "Ratan Saha",
    title: "Angel Investor",
    body: "Supports EarlyJobs with strategic guidance across growth, partnerships, and hiring network expansion.",
    image: "/images/ratan-saha.jpg",
    linkedInUrl: "https://www.linkedin.com/in/ratan-saha-47a2b8171/",
  },
  {
    name: "Vishaal Pamulapati",
    title: "Angel Investor",
    body: "Supports EarlyJobs with strategic guidance across growth, partnerships, and hiring network expansion.",
    image: "/images/vishaal-pamulapati-2.jpg",
    linkedInUrl: "https://www.linkedin.com/in/vishaal-pamulapati-4a392537/",
  },
  {
    name: "NJ Jacob",
    title: "Angel Investor",
    body: "MD of JTechno Associates.",
    placeholder: true,
    linkedInUrl: "https://www.linkedin.com/in/jacob-nj-87240831/",
  },
  {
    name: "Power Tech Enterprises",
    prefix: "&",
    centered: true,
  },
] as const;

export function InvestorsPage() {
  return (
    <main className="bg-white text-[#1c1c1c]">
      <section className="page-shell page-section !pt-14 sm:!pt-20 !pb-6 sm:!pb-8">
        <Reveal>
          <p className="text-[13px] font-medium tracking-[0.14em] text-[#5d6b66] uppercase">
            Investor Relations
          </p>
          <div className="mt-8 grid items-center gap-8 sm:gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-16">
            <h1
              className={`text-[3.1rem] leading-[1.02] font-medium tracking-[-0.04em] sm:text-[4.6rem] ${ink}`}
            >
              Our Mission
            </h1>
            <p className="max-w-md text-[1.15rem] leading-8 text-[#2c2c2c] lg:justify-self-end">
              To empower individuals and organizations by bridging the gap between talent and
              opportunity.
            </p>
          </div>
        </Reveal>
        <Reveal className="mt-12 sm:mt-16">
          <div className="media-frame aspect-[16/6.2] !rounded-[28px]">
            <Image
              src="/agency-partnerships/hero-lounge.jpg"
              alt="EarlyJobs team in conversation"
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover object-[62%_center]"
            />
          </div>
        </Reveal>
      </section>

      <section className="page-shell page-section grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2
            className={`max-w-[10ch] text-[2.8rem] leading-[1.02] font-medium tracking-[-0.04em] sm:text-[4rem] ${ink}`}
          >
            About EarlyJobs
          </h2>
          <h3 className={`mt-8 text-xl font-medium tracking-[-0.02em] sm:text-2xl ${ink}`}>
            A recruiter-first hiring network
          </h3>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#3a3a3a] sm:text-base">
            EarlyJobs connects employers, independent recruiters, agencies and talent so companies
            can hire across India without building a centralized recruitment team for every role.
          </p>
          <NetworkStatsCopy />
        </Reveal>
        <Reveal>
          <div className="media-frame aspect-[5/4] !rounded-[28px]">
            <Image
              src="/freelance-recruiters/women-team.jpg"
              alt="EarlyJobs recruiters around a table"
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </section>

      <section className="overflow-hidden border-t border-[#e8e8e6]">
        <div className="bg-[linear-gradient(105deg,#f4a27a_0%,#f7c4a0_28%,#f3b8c8_58%,#e8a0b8_100%)]">
          <div className="page-shell page-section !pb-12 sm:!pb-14">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] text-[#1c1c1c] sm:text-[2.75rem]">
                Guided by operators and advisors
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#3a3a3a] sm:text-base">
                EarlyJobs is supported by directors and advisors who bring marketplace, growth, and
                operating experience to help the hiring network scale with clarity.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="page-shell pb-16 sm:pb-20">
          <ul className="reveal-stagger grid grid-cols-1 divide-y divide-[#e6e6e4] border border-[#e6e6e4] bg-white sm:grid-cols-2 sm:divide-x lg:grid-cols-3 xl:grid-cols-6 xl:divide-y-0">
            {audienceRoles.map((person) => (
              <Reveal
                as="li"
                key={person.name}
                className={`bg-white p-5 transition-colors duration-300 hover:bg-[#fafaf9] sm:p-6 ${
                  "centered" in person && person.centered
                    ? "flex items-center justify-center text-center"
                    : ""
                }`}
              >
                {"image" in person && person.image ? (
                  <div className="media-frame aspect-[4/5] !rounded-none bg-[#f3f4f3]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(min-width: 1280px) 14rem, (min-width: 1024px) 20rem, (min-width: 640px) 40vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : "placeholder" in person && person.placeholder ? (
                  <div className="media-frame aspect-[4/5] !rounded-none bg-[#f3f4f3]">
                    <span
                      aria-hidden
                      className="absolute inset-0 grid place-items-center text-[2.25rem] font-medium tracking-[-0.04em] text-[#14352c]/35"
                    >
                      {person.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                  </div>
                ) : null}
                <div
                  className={`flex gap-3 ${
                    "centered" in person && person.centered
                      ? "w-full items-center justify-center text-center"
                      : `items-start justify-between ${
                          ("image" in person && person.image) ||
                          ("placeholder" in person && person.placeholder)
                            ? "mt-5"
                            : ""
                        }`
                  }`}
                >
                  <div className={`min-w-0 ${"centered" in person && person.centered ? "text-center" : ""}`}>
                    <h3 className={`text-[1.15rem] font-semibold tracking-[-0.02em] ${ink}`}>
                      {"prefix" in person && person.prefix ? `${person.prefix} ` : ""}
                      {person.name}
                    </h3>
                    {"title" in person && person.title ? (
                      <p className="mt-1 text-[13px] font-medium text-brand">{person.title}</p>
                    ) : null}
                  </div>
                  {"linkedInUrl" in person && person.linkedInUrl ? (
                    <a
                      href={person.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 shrink-0 text-[#0077b5] transition-colors duration-200 hover:text-[#005885]"
                      aria-label={`${person.name}'s LinkedIn profile`}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Z" />
                      </svg>
                    </a>
                  ) : null}
                </div>
                {"body" in person && person.body ? (
                  <p className="mt-2 text-[14px] leading-6 text-[#5a5a5a]">{person.body}</p>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

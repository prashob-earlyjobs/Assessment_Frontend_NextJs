import Link from "next/link";
import { NewsroomVisual } from "@/components/newsroom/visual";

const thesis = [
  {
    title: "A Fragmented Market",
    body: "Recruitment remains fragmented across job boards, agencies, independent recruiters and local hiring networks.",
  },
  {
    title: "Recruiters as Infrastructure",
    body: "EarlyJobs aggregates recruiting capacity rather than relying on one centralized recruitment team.",
  },
  {
    title: "AI + Human Execution",
    body: "AI increases recruiter productivity while humans bring judgment, relationships and local context.",
  },
  {
    title: "Distributed Growth",
    body: "Recruiters, agencies and district partners allow the network to expand without replicating a traditional centralized recruitment operation.",
  },
] as const;

const traction = [
  { value: "350+", label: "Recruiters" },
  { value: "500+", label: "Hiring Companies" },
  { value: "25,000+", label: "Interviews" },
  { value: "3,000+", label: "Successful Joinings" },
  { value: "150+", label: "College Partners" },
  { value: "20+", label: "Hiring Partners" },
] as const;

const market = [
  {
    title: "Hiring Is Becoming More Distributed",
    body: "Companies need access to more talent pools across cities, roles and employment models.",
  },
  {
    title: "Recruiters Are Becoming More Productive",
    body: "AI is changing what one recruiter can accomplish without replacing human judgment.",
  },
  {
    title: "Talent Is Becoming More Flexible",
    body: "Remote and independent work expands the recruiting workforce itself.",
  },
] as const;

const why = [
  { title: "Recruiter Network", body: "Distributed capacity at the center of hiring." },
  { title: "AI Infrastructure", body: "Technology that multiplies recruiter productivity." },
  { title: "Employer Demand", body: "Verified mandates that create real network activity." },
  { title: "Distributed Expansion", body: "Agencies and partners that scale coverage locally." },
] as const;

const built = [
  "Recruiter Network",
  "AI Recruitment",
  "Employer Hiring",
  "Agency Network",
  "District Partners",
  "Talent Network",
] as const;

const journey = [
  { year: "2024", label: "Company started" },
  { year: "2025", label: "Seed round" },
  { year: "2025–26", label: "Recruiter network expansion" },
  { year: "2026", label: "AI recruiting infrastructure" },
  { year: "2026", label: "Agency + district expansion" },
  { year: "Next", label: "Scale the recruiter-first hiring network" },
] as const;

const materials = [
  { title: "Investor Deck", action: "Request PDF →", subject: "Investor deck request" },
  { title: "Financial Overview", action: "Request access →", subject: "Financial overview access request" },
  { title: "Company Metrics", action: "Request →", subject: "Company metrics request" },
  { title: "Funding History", action: "Request →", subject: "Funding history request" },
  { title: "Data Room", action: "Request access →", subject: "Data room access request" },
] as const;

const leaders = [
  { name: "Saurav Kumar", role: "Founder & CEO", initials: "SK" },
  { name: "Ravi Prakash Kumar", role: "Founder & Director", initials: "RK" },
  { name: "Surbhi Rani", role: "Co-Founder & Director", initials: "SR" },
] as const;

export function InvestorsPage() {
  return (
    <main className="relative bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% -10%, rgba(234,106,78,0.16), transparent 40%), linear-gradient(180deg, #faf8f7 0%, #ffffff 70%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,22rem)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              For Investors
            </p>
            <h1 className="mt-4 max-w-2xl text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.05em] text-neutral-950 sm:text-[3.25rem]">
              Building the Infrastructure Behind Modern Hiring.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              EarlyJobs is building a recruiter-first hiring network that connects employers,
              recruiters and talent through AI-powered recruitment infrastructure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:info@earlyjobs.in?subject=Investor%20deck%20request"
                className="inline-flex h-11 items-center justify-center rounded-[6px] bg-brand px-5 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
              >
                View Investor Deck
              </a>
              <a
                href="mailto:info@earlyjobs.in?subject=Investor%20materials%20request"
                className="inline-flex h-11 items-center justify-center rounded-[6px] border border-black/15 bg-white px-5 text-[13px] font-medium text-neutral-950 transition-colors hover:border-black/30"
              >
                Request Investor Materials
              </a>
            </div>
          </div>
          <NewsroomVisual
            src="/investors/investor-infrastructure.jpg"
            alt="EarlyJobs infrastructure network connecting employers, recruiters, partners and AI"
            priority
            aspect="square"
            className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none"
          />
        </div>
      </section>

      {/* THESIS */}
      <section id="thesis" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            The Investment Thesis
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {thesis.map((item, index) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MODEL */}
      <section id="model" className="scroll-mt-24 border-t border-black/10 bg-[#fcfaf9]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              One Network. Multiple Engines of Growth.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              EarlyJobs connects distributed recruiting capacity with employer demand through a
              common technology and operating layer.
            </p>
          </div>
          <NewsroomVisual
            src="/investors/model-flow.jpg"
            alt="Illustration of the EarlyJobs hiring model from employers through the network to talent"
            aspect="wide"
          />
        </div>
      </section>

      {/* MOAT */}
      <section id="moat" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              The Network Is the Moat.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-[13px] font-medium text-neutral-700">
              {["Recruiters", "Women Recruiters", "Agencies", "District Partners"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5"
                >
                  {label}
                </span>
              ))}
              <span aria-hidden className="text-neutral-300">
                →
              </span>
              <span className="rounded-full bg-brand px-3 py-1.5 text-white">EarlyJobs</span>
              <span aria-hidden className="text-neutral-300">
                →
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1.5">
                Employers
              </span>
              <span aria-hidden className="text-neutral-300">
                →
              </span>
              <span className="rounded-full border border-brand/20 bg-[#fff4f1] px-3 py-1.5 text-brand">
                More Network Activity
              </span>
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              More employers create more mandates. More mandates attract more recruiters. More
              recruiters increase coverage and candidate supply. Better coverage improves hiring
              outcomes, creating more employer demand.
            </p>
          </div>
          <NewsroomVisual
            src="/investors/investor-flywheel.jpg"
            alt="Illustration of the EarlyJobs network flywheel"
            aspect="wide"
          />
        </div>
      </section>

      {/* TRACTION */}
      <section id="traction" className="scroll-mt-24 border-t border-black/10 bg-[#0A0F10] text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">
            Traction
          </h2>
          <p className="mt-3 text-[12px] font-medium tracking-[0.08em] text-white/45 uppercase">
            Verified network metrics · Updated October 2026
          </p>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {traction.map((item) => (
              <li key={item.label}>
                <p className="text-[2.1rem] font-semibold leading-none tracking-[-0.04em] sm:text-[2.75rem]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-white/55">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MARKET */}
      <section id="market" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            The Market Is Moving
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {market.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.03em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-lg font-semibold tracking-[-0.03em] text-neutral-950">
            EarlyJobs sits at the intersection of all three.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="scroll-mt-24 border-t border-black/10 bg-[#fcfaf9]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            Why EarlyJobs
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((item) => (
              <li key={item.title} className="rounded-[6px] border border-black/10 bg-white p-5">
                <h3 className="text-sm font-semibold tracking-[-0.02em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-medium tracking-[-0.02em] text-neutral-800">
            Network + Technology + Hiring Demand = Recruiting Infrastructure.
          </p>
        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section id="business-model" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            Business Model
          </h2>
          <ol className="mt-10 flex flex-wrap items-center gap-2 text-[13px] font-medium">
            {[
              "Employer Demand",
              "Recruitment Execution",
              "Successful Hiring",
              "Revenue",
              "Network Expansion",
            ].map((step, index, arr) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-[6px] border border-black/10 bg-white px-3 py-2 text-neutral-950">
                  {step}
                </span>
                {index < arr.length - 1 ? (
                  <span aria-hidden className="text-neutral-300">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-neutral-600">
            Revenue follows successful hiring outcomes. As the network expands—more recruiters, more
            mandates, more joinings—the operating layer compounds without requiring a traditional
            centralized recruitment team.
          </p>
        </div>
      </section>

      {/* BUILT */}
      <section id="infrastructure" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              What We&apos;ve Built
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
              Infrastructure—not six disconnected products.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-3">
              {built.map((item) => (
                <li
                  key={item}
                  className="rounded-[6px] border border-black/10 bg-[#fcfaf9] px-4 py-5 text-sm font-semibold tracking-[-0.02em] text-neutral-950"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <NewsroomVisual
            src="/investors/investor-growth.jpg"
            alt="Illustration of EarlyJobs distributed growth and infrastructure expansion"
            aspect="wide"
          />
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="scroll-mt-24 border-t border-black/10 bg-[#fcfaf9]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            The Journey
          </h2>
          <ol className="mt-12 flex gap-4 overflow-x-auto pb-2">
            {journey.map((item, index) => (
              <li
                key={`${item.year}-${item.label}`}
                className="relative min-w-[9.5rem] shrink-0 border-t-2 border-brand/40 pt-4"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
                  {item.year}
                </p>
                <p className="mt-2 text-sm font-medium tracking-[-0.02em] text-neutral-950">
                  {item.label}
                </p>
                {index < journey.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-[-2px] right-0 hidden h-0.5 w-4 bg-brand/20 sm:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              For Investors
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
              Sensitive materials are shared through controlled requests—not public download links.
            </p>
            <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {materials.map((item) => (
                <li key={item.title} className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm font-medium text-neutral-950">{item.title}</span>
                  <a
                    href={`mailto:info@earlyjobs.in?subject=${encodeURIComponent(item.subject)}`}
                    className="shrink-0 text-[13px] font-medium text-brand hover:text-[#d85c42]"
                  >
                    {item.action}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <NewsroomVisual
            src="/investors/investor-infrastructure.jpg"
            alt="EarlyJobs infrastructure illustration for investor materials"
            aspect="square"
            className="mx-auto max-w-sm lg:max-w-none"
          />
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            Leadership
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {leaders.map((person) => (
              <li key={person.name} className="rounded-[6px] border border-black/10 p-5">
                <span
                  aria-hidden
                  className="flex size-12 items-center justify-center rounded-[6px] bg-[#fff4f1] text-[13px] font-semibold text-brand"
                >
                  {person.initials}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.03em] text-neutral-950">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm text-brand">{person.role}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/team"
            className="mt-6 inline-flex text-[13px] font-medium text-brand hover:text-[#d85c42]"
          >
            Meet the full team →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="scroll-mt-24 border-t border-black/10 bg-[#0A0F10] text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">
              We&apos;re Building the Network Behind the Next Generation of Hiring.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
              If you believe recruitment will become more distributed, intelligent and
              outcome-driven, we&apos;d like to talk.
            </p>
            <a
              href="mailto:info@earlyjobs.in?subject=Investor%20materials%20request"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-[6px] bg-brand px-5 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
            >
              Request Investor Materials →
            </a>
          </div>
          <div className="rounded-[6px] bg-white/95 p-3">
            <NewsroomVisual
              src="/investors/investor-growth.jpg"
              alt="EarlyJobs growth network illustration"
              aspect="wide"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

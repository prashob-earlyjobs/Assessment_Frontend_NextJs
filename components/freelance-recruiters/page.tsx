import Image from "next/image";
import Link from "next/link";

const applyHref = "/become-a-recruiter/apply";
const contactHref = "mailto:info@earlyjobs.in?subject=Freelance%20recruiter%20inquiry";

const btn =
  "inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-[#d85c42]";
const btnGhost =
  "inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50";

const trust = [
  "Flexible Work",
  "Real Hiring Opportunities",
  "Performance-Based Earnings",
  "A Network That Supports You",
] as const;

const helps = [
  {
    title: "Access hiring opportunities",
    body: "Explore available recruitment mandates across participating companies and industries, subject to role requirements and availability.",
    tone: "bg-[#FFE7A3]",
  },
  {
    title: "Work with flexibility",
    body: "Organise your work around your schedule and location, while staying accountable to agreed hiring requirements and timelines.",
    tone: "bg-[#D9D6FF]",
  },
  {
    title: "Earn through successful placements",
    body: "Receive commission for eligible successful placements according to the applicable terms. Your earnings depend on your placements, role economics and the programme's conditions.",
    tone: "bg-[#F7C1E0]",
  },
  {
    title: "Grow your recruitment skills",
    body: "Build practical experience in sourcing, screening, candidate communication and hiring coordination as you work on real requirements.",
    tone: "bg-[#B7F0DE]",
  },
  {
    title: "Be part of a wider network",
    body: "Connect with an ecosystem of recruiters, employers and hiring partners instead of having to build every client relationship from scratch.",
    tone: "bg-[#D6E4FF]",
  },
] as const;

const who = [
  {
    title: "Experienced HR professionals",
    body: "Put your sourcing, screening and hiring experience to work through freelance recruitment opportunities.",
  },
  {
    title: "Women returning to work",
    body: "Reconnect with your professional skills and explore a more flexible way to participate in the workforce.",
  },
  {
    title: "Independent recruiters and consultants",
    body: "Expand the hiring requirements you can work on and explore opportunities beyond your existing client base.",
  },
  {
    title: "Aspiring recruiters",
    body: "Build practical recruitment experience, develop sourcing skills and learn how hiring works through available opportunities and programme support.",
  },
] as const;

const how = [
  {
    n: "01",
    title: "Apply to join",
    body: "Share your background, experience and interest in freelance recruitment.",
    tone: "bg-[#FFE7A3]",
  },
  {
    n: "02",
    title: "Get onboarded",
    body: "Understand the recruitment process, expectations, tools and programme terms applicable to you.",
    tone: "bg-[#D9D6FF]",
  },
  {
    n: "03",
    title: "Explore hiring requirements",
    body: "Review the mandates made available to you and understand the role, eligibility criteria and placement terms.",
    tone: "bg-[#F7C1E0]",
  },
  {
    n: "04",
    title: "Source and engage talent",
    body: "Identify relevant candidates, assess their suitability and coordinate the next steps in the hiring process.",
    tone: "bg-[#B7F0DE]",
  },
  {
    n: "05",
    title: "Earn on successful placements",
    body: "When an eligible placement is completed under the agreed terms, earn the applicable recruitment commission.",
    tone: "bg-[#D6E4FF]",
  },
] as const;

const earnings = [
  "The number and type of mandates you work on.",
  "Your ability to source and engage relevant candidates.",
  "Successful placements and applicable commission terms.",
  "Employer hiring timelines and recruitment requirements.",
] as const;

const industries = [
  {
    title: "Technology & IT",
    body: "Software, engineering and technology roles.",
    image: "/freelance-recruiters/industry-tech.jpg",
  },
  {
    title: "Sales & Marketing",
    body: "Business development, sales and marketing talent.",
    image: "/freelance-recruiters/industry-sales.jpg",
  },
  {
    title: "Finance & Accounting",
    body: "Finance, accounts and related positions.",
    image: "/freelance-recruiters/hero-culture.jpg",
  },
  {
    title: "HR & Business Operations",
    body: "Human resources and operational roles.",
    image: "/freelance-recruiters/story-culture.jpg",
  },
  {
    title: "Leadership & Specialist Hiring",
    body: "Experienced professionals for specialised requirements.",
    image: "/freelance-recruiters/network.jpg",
  },
] as const;

const why = [
  {
    title: "A wider opportunity network",
    body: "Explore hiring requirements made available through EarlyJobs' employer and recruitment relationships.",
  },
  {
    title: "A structured way to work",
    body: "Understand the role, process, candidate requirements and commercial terms before you begin.",
  },
  {
    title: "Technology that supports your work",
    body: "Use available recruitment tools and workflows to help manage sourcing and candidate coordination.",
  },
  {
    title: "A place to grow professionally",
    body: "Build experience, strengthen your recruitment skills and develop relationships through your work.",
  },
  {
    title: "Human judgment stays at the centre",
    body: "Technology can make parts of recruitment more efficient. Understanding people is still essential.",
  },
] as const;

const faqs = [
  {
    q: "What is a freelance recruiter at EarlyJobs?",
    a: "A freelance recruiter works independently on recruitment requirements made available through EarlyJobs, helping identify and engage suitable candidates in line with the agreed process.",
  },
  {
    q: "Can I work from home?",
    a: "The model is designed to offer flexibility in where you work. Specific requirements, communication expectations and deadlines depend on the mandate and programme terms.",
  },
  {
    q: "Can women returning after a career break apply?",
    a: "Yes. Women looking to return to recruitment or explore flexible professional opportunities are welcome to apply, subject to the programme's onboarding and role requirements.",
  },
  {
    q: "Do I need previous recruitment experience?",
    a: "Relevant recruitment or HR experience can be helpful. Applicants without prior experience should confirm the current eligibility criteria and whether an appropriate training or entry-level pathway is available.",
  },
  {
    q: "How do freelance recruiters earn?",
    a: "Eligible commissions are paid for successful placements according to the applicable mandate and agreed commercial terms. Earnings depend on results and are not guaranteed.",
  },
  {
    q: "Will EarlyJobs provide hiring requirements?",
    a: "EarlyJobs connects recruiters with available hiring opportunities through its network. Access to specific mandates depends on availability, suitability and the applicable onboarding process.",
  },
  {
    q: "Can I choose my working hours?",
    a: "Freelance recruitment offers greater flexibility than many traditional office roles, but recruiters must still meet agreed deadlines, candidate communication expectations and hiring timelines.",
  },
  {
    q: "How do I get started?",
    a: "Complete the application form. The team can review your details and share the relevant onboarding process and next steps.",
  },
] as const;

function Mark() {
  return (
    <span className="mb-4 grid size-10 place-items-center rounded-full bg-white/80 text-brand">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 8.5v7M8.5 12h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function FreelanceRecruitersPage() {
  return (
    <main className="relative bg-white text-neutral-950">
      <section>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-14 pb-10 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,22rem)] lg:gap-16">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              Your Recruiting Career, Your Way
            </p>
            <h1 className="mt-4 max-w-xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.4rem]">
              Build a Career in Recruitment.{" "}
              <span className="text-brand">On Your Terms.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-neutral-500">
              You don&apos;t need a corporate office to build a meaningful career. You need the right
              opportunities, the freedom to work your way, and a network that helps you move forward.
            </p>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-neutral-500">
              With EarlyJobs, work on hiring requirements from companies, connect the right talent
              with the right opportunities, and earn commissions on successful placements — with the
              flexibility to work from wherever life takes you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={applyHref} className={btn}>
                Become a Freelance Recruiter
              </Link>
              <a href="#how-it-works" className={btnGhost}>
                How It Works
              </a>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-neutral-400">
              For experienced recruiters, aspiring talent professionals and women ready to restart
              their careers.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] lg:max-w-none">
            <Image
              src="/freelance-recruiters/hero-culture.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 22rem, 20rem"
            />
          </div>
        </div>
        <div className="border-y border-black/5">
          <ul className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 text-[13px] font-medium tracking-[0.04em] text-neutral-400 uppercase sm:justify-between">
            {trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="story" className="scroll-mt-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[24px]">
            <Image
              src="/freelance-recruiters/story-culture.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 32rem, 100vw"
            />
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              A Different Way to Work
            </p>
            <h2 className="mt-3 max-w-md text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
              Your career shouldn&apos;t have to compete with your{" "}
              <span className="text-brand">life.</span>
            </h2>
            <div className="mt-6 space-y-3 text-[15px] leading-7 text-neutral-500">
              <p>
                Maybe you&apos;ve spent years building your recruitment skills, but a relocation
                changed everything.
              </p>
              <p>
                Maybe you&apos;ve taken a career break to raise a family and aren&apos;t sure how to
                get back into the professional world.
              </p>
              <p>
                Maybe you love finding the right people for the right roles, but you&apos;re ready to
                move beyond a traditional office job.
              </p>
              <p>
                Or perhaps you&apos;re starting your recruitment journey and looking for a practical
                way to learn.
              </p>
              <p>Your circumstances may be different. Your ambition is still yours.</p>
              <p>
                EarlyJobs gives you a way to explore freelance recruitment, work on available hiring
                requirements and build professional experience with greater flexibility.
              </p>
              <p className="font-semibold text-neutral-950">
                You bring the drive to find great talent. We&apos;ll help connect you with
                opportunities to put that talent to work.
              </p>
            </div>
            <Link href={applyHref} className={`${btn} mt-8`}>
              Find Your Place in Our Network
            </Link>
          </div>
        </div>
      </section>

      <section id="helps" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              More Than a Job. A Network.
            </p>
            <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
              Recruit independently. Work with a wider{" "}
              <span className="text-brand">network.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-neutral-500">
              Freelance doesn&apos;t have to mean figuring everything out alone. EarlyJobs connects
              freelance recruiters with hiring requirements and a broader recruitment ecosystem,
              helping you focus on what recruiters do best: discovering talent, building relationships
              and moving candidates towards the right opportunities.
            </p>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {helps.slice(0, 3).map((item) => (
              <li key={item.title} className={`rounded-[22px] p-7 ${item.tone}`}>
                <Mark />
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-700">{item.body}</p>
                <Link href={applyHref} className="mt-6 inline-flex text-sm font-medium text-brand">
                  Learn more &gt;
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            {helps.slice(3).map((item) => (
              <li key={item.title} className={`rounded-[22px] p-7 ${item.tone}`}>
                <Mark />
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-700">{item.body}</p>
                <Link href={applyHref} className="mt-6 inline-flex text-sm font-medium text-brand">
                  Learn more &gt;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="women" className="scroll-mt-24 px-5 py-10 sm:px-8">
        <div className="relative mx-auto min-h-[520px] w-full max-w-6xl overflow-hidden rounded-[28px]">
          <Image
            src="/freelance-recruiters/women-team.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 72rem, 100vw"
          />
          <div className="relative m-5 max-w-md rounded-[22px] bg-white/90 p-7 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:m-10 sm:p-8">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              Your Experience Still Counts
            </p>
            <h2 className="mt-3 text-[1.7rem] font-semibold leading-[1.1] tracking-[-0.03em]">
              A career break doesn&apos;t erase your <span className="text-brand">talent.</span>
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-neutral-600">
              <p>
                For many women, professional ambition doesn&apos;t disappear when life changes.
                Marriage, relocation, caregiving or motherhood can simply make traditional work
                arrangements harder to sustain.
              </p>
              <p>
                But the skills you built before a break — understanding people, communicating well,
                assessing potential and building relationships — still have value.
              </p>
              <p className="font-semibold text-neutral-950">
                You don&apos;t have to start your ambition from scratch. You can start with the
                experience you already have.
              </p>
            </div>
            <Link href={applyHref} className={`${btn} mt-6`}>
              Restart Your Career with EarlyJobs
            </Link>
            <p className="mt-4 text-[12px] leading-5 text-neutral-400">
              Flexible work does not mean guaranteed income or unrestricted hours. Opportunities,
              workload and earnings depend on available mandates and individual performance.
            </p>
          </div>
        </div>
      </section>

      <section id="who" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              There&apos;s More Than One Way to Start
            </p>
            <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
              Your background could be your <span className="text-brand">starting point.</span>
            </h2>
          </div>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {who.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-6 text-center lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <h3 className="text-lg font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href={applyHref} className={btn}>
              Apply to Join the Network
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-[#f7f8fc]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              Simple, Structured, Recruiter-First
            </p>
            <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
              From your first application to your next{" "}
              <span className="text-brand">placement.</span>
            </h2>
          </div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {how.map((step) => (
              <li key={step.n} className={`rounded-[22px] p-5 ${step.tone}`}>
                <span className="text-[12px] font-semibold tracking-[0.14em] text-neutral-700">
                  {step.n}
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-700">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link href={applyHref} className={btn}>
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      <section id="earnings" className="scroll-mt-24">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              Your Work. Your Results.
            </p>
            <h2 className="mt-3 max-w-lg text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
              Turn your recruiting skills into earning{" "}
              <span className="text-brand">opportunities.</span>
            </h2>
            <div className="mt-5 space-y-3 text-[15px] leading-7 text-neutral-500">
              <p>
                Freelance recruitment creates the opportunity to earn by helping employers find the
                people they need.
              </p>
              <p>
                The commission for each successful placement depends on the applicable mandate,
                agreed commercial terms and placement outcome.
              </p>
              <p>
                As you build experience, strengthen your candidate network and improve your sourcing
                approach, you can work towards building a more consistent freelance recruitment
                practice.
              </p>
            </div>
            <Link href={applyHref} className={`${btn} mt-8`}>
              Become a Freelance Recruiter
            </Link>
            <p className="mt-4 max-w-lg text-[12px] leading-5 text-neutral-400">
              Earnings are performance-based and are not guaranteed.
            </p>
          </div>
          <div className="rounded-[22px] bg-[#f7f8fc] p-7 sm:p-8">
            <h3 className="text-lg font-semibold tracking-[-0.02em]">What shapes your earnings?</h3>
            <ul className="mt-5 space-y-3">
              {earnings.map((item) => (
                <li key={item} className="text-[15px] leading-7 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="opportunities" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
                Recruit Across Industries
              </p>
              <h2 className="mt-3 max-w-xl text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
                Different companies. Different roles. One focus: finding the right{" "}
                <span className="text-brand">fit.</span>
              </h2>
            </div>
            <Link href={applyHref} className="text-sm font-medium text-brand">
              Explore Recruiter Opportunities &gt;
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-500">
            Explore recruitment requirements across industries and functions, depending on the
            opportunities available through EarlyJobs.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item) => (
              <li key={item.title}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[18px]">
                  <Image src={item.image} alt="" fill className="object-cover" sizes="20rem" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-500">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="why" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
            Built Around People Who Hire
          </p>
          <h2 className="mt-3 max-w-3xl text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
            Recruitment is a people business. We believe the network should work for the people{" "}
            <span className="text-brand">doing it.</span>
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((item) => (
              <li key={item.title} className="rounded-[18px] border border-black/8 p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-[#f7f8fc]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
              FAQ
            </p>
            <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
              Frequently asked <span className="text-brand">questions.</span>
            </h2>
          </div>
          <div className="divide-y divide-black/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-sm font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span aria-hidden className="text-neutral-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 pr-8 text-sm leading-6 text-neutral-500">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-brand uppercase">
            Your Next Chapter Starts Here
          </p>
          <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.7rem]">
            Your skills have value. Give them room to <span className="text-brand">grow.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-neutral-500">
            Whether you&apos;re an experienced recruiter, returning to work or exploring recruitment
            for the first time, take the next step towards building a career on your terms. Join a
            network that brings people, hiring opportunities and technology together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={applyHref} className={btn}>
              Become a Freelance Recruiter
            </Link>
            <a href={contactHref} className={btnGhost}>
              Talk to Our Team
            </a>
          </div>
          <p className="mt-8 text-sm text-neutral-400">EarlyJobs — Helping recruiters reach further.</p>
        </div>
      </section>
    </main>
  );
}

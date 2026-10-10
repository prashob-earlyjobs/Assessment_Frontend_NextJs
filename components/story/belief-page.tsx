import Image from "next/image";
import Link from "next/link";
import { companyFacts } from "@/data/company-facts";

const stats = [
  companyFacts.recruiters,
  companyFacts.companies,
  companyFacts.joinings,
] as const;

const values = [
  {
    eyebrow: "Our belief",
    title: "We believe there is always a better way.",
    body: "Hiring was broken on both sides of the table. Job seekers sent resumes into silence. Employers bought volume, not judgment. EarlyJobs started again from that contradiction.",
    image: "/story/value-1.webp",
    alt: "Illustration of a paper plane and a paper boat finding another way forward",
  },
  {
    eyebrow: "Our partners",
    title: "We work beside the people who hire.",
    body: "Recruiters, women returning to work, agencies and district partners are the network. Technology extends their reach. It does not replace the trust they already have.",
    image: "/story/value-2.webp",
    alt: "Illustration of people rowing one boat together",
  },
  {
    eyebrow: "Our pace",
    title: "We never learned to leave talent behind.",
    body: "A career break, a smaller city, or a first interview should not end the chance to be seen. The network is built so more of India can take part in hiring.",
    image: "/story/value-3.webp",
    alt: "Illustration of people at desks, one raising a hand",
  },
  {
    eyebrow: "Our standard",
    title: "We value judgment over title.",
    body: "A recruiter in a district knows which candidate is real. An AI interview shows where a person actually stands. Decisions stay with people who can tell the difference.",
    image: "/story/value-4.webp",
    alt: "Illustration of chess pieces on uneven pedestals",
  },
] as const;

const founders = [
  {
    name: "Saurav Kumar",
    role: "Founder & CEO",
    image: "/images/1756300384422.jpeg",
  },
  {
    name: "Ravi Prakash Kumar",
    role: "Founder & Director",
    image: "/images/founder-image.jpg",
  },
  {
    name: "Surbhi Rani",
    role: "Co-Founder & Director",
    image: "/images/1765196458989.jpeg",
  },
  {
    name: "Prashob P",
    role: "CTO",
    image: "/images/1780079531953.png",
  },
] as const;

const stories = [
  {
    year: "2026",
    title: "The women building careers in recruitment",
    body: "How flexible recruiting work helps women re-enter the workforce.",
    href: "/newsroom",
  },
  {
    year: "2026",
    title: "Inside the recruiter-first hiring model",
    body: "Why putting recruiters at the center changes the outcome of a hire.",
    href: "/newsroom",
  },
] as const;

export function BeliefStoryPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 pb-8 sm:px-8 sm:pt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
          <h1 className="max-w-[12ch] text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">
            We Believe In The Power Of People
          </h1>
          <div>
            <Image
              src="/story/hero-connect-coral.png"
              alt="A recruiter on a call, connected to someone at a laptop"
              width={682}
              height={498}
              priority
              className="ml-auto h-auto w-full max-w-xl"
            />
            <div className="mt-2 ml-auto max-w-md space-y-4 text-sm leading-6 text-neutral-500">
              <p>
                Across India, countless women recruiters and aspiring recruiters face a silent
                struggle. Opportunities often fade after college, marriage, or a career break,
                leaving talent underutilized.
              </p>
              <p>
                EarlyJobs was born to change this. A freelance recruiter network, a district
                franchise model, and an AI interview that shows candidates where they actually
                stand.
              </p>
              <p>
                Women form the backbone of the network. Local partners carry hiring into cities
                the portals never reached.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 ml-auto max-w-3xl">
          <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-[2rem]">
            A recruiter-first hiring network, built in India.
          </h2>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid items-center gap-4 rounded-[28px] bg-[#e7f3fb] p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:p-5">
            <div className="px-2 py-2">
              <p className="text-3xl font-semibold tracking-[-0.04em]">{companyFacts.interviews.value}</p>
              <p className="mt-1 text-sm text-neutral-500">{companyFacts.interviews.label}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/story/impact-card.webp"
                alt="Three people working together around a table"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[#2f6bff] px-3 py-1 text-xs font-medium text-white">
                {companyFacts.joinings.value} joinings
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="text-center text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          At The Core Of
          <br />
          Everything We Do
        </h2>
        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#e23b2f] uppercase">
                  {value.eyebrow}
                </p>
                <h3 className="mt-3 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-[1.7rem]">
                  {value.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-neutral-500">{value.body}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                <Image
                  src={value.image}
                  alt={value.alt}
                  width={974}
                  height={802}
                  className="h-auto w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e7f3fb]">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-center text-3xl font-semibold tracking-[-0.04em] text-[#1d4ed8]">
            Our Founders
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {founders.map((person) => (
              <li key={person.name} className="rounded-2xl bg-white px-4 py-6 text-center">
                <Image
                  src={person.image}
                  alt=""
                  width={160}
                  height={160}
                  className="mx-auto size-28 rounded-full bg-neutral-100 object-cover object-top ring-1 ring-black/10"
                />
                <p className="mt-4 text-sm font-semibold">{person.name}</p>
                <p className="mt-1 text-xs text-[#1d4ed8]">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image
            src="/story/cta-bg-coral.png"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
          <div className="relative px-6 py-16 text-center sm:py-20">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              Join us in shaping the future of hiring.
            </h2>
            <Link
              href="/become-a-recruiter"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Become a Recruiter
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        <div className="rounded-[28px] bg-[#f4f6f8] px-6 py-10 text-center">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#e23b2f] uppercase">
            Investors
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">For the people building with us</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-neutral-500">
            Company metrics and materials live with investor relations. We publish only the numbers
            we can stand behind.
          </p>
          <Link href="/investor-relations" className="mt-5 inline-flex text-sm font-medium text-[#1d4ed8]">
            Investor relations →
          </Link>
        </div>

        <div className="mt-16">
          <p className="text-center text-sm text-neutral-400">
            <span className="font-medium text-neutral-950">Journal</span>
            <span className="mx-2">·</span>
            Stories from the network
          </p>
          <ul className="mt-8 grid items-stretch gap-5 sm:grid-cols-2">
            {stories.map((story, index) => (
              <li key={story.title} className="h-full">
                <Link
                  href={story.href}
                  className={`flex h-full flex-col rounded-2xl p-6 ${index === 1 ? "bg-[#e7f3fb]" : "bg-[#f4f6f8]"}`}
                >
                  <p className="text-xs text-neutral-400">{story.year}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em]">{story.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">{story.body}</p>
                  <span className="mt-auto pt-6 inline-flex text-sm font-medium">Read →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

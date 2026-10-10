import Image from "next/image";
import Link from "next/link";

const capabilities = [
  {
    name: "EarlyJobs",
    title: "The Recruiter Network",
    body: "We connect companies with a distributed network of recruiters who help execute hiring across roles, industries and geographies. We are creating flexible professional opportunities, particularly for women and people in emerging cities who deserve greater access to work.",
  },
  {
    name: "Huntlo AI",
    title: "Intelligent Hiring Infrastructure",
    body: "Huntlo brings AI-powered capabilities into recruitment execution, helping teams streamline candidate sourcing, outreach, screening, interview scheduling and follow-ups. Our belief is not that technology should replace human judgment. It should help people make better decisions and execute hiring at scale.",
  },
  {
    name: "GigKaro",
    title: "Frontline Workforce Hiring",
    body: "India's growth depends on the people who keep its economy moving: delivery professionals, warehouse workers, drivers, technicians, machine operators and many others. GigKaro extends our hiring network into frontline workforce recruitment, helping employers connect with talent across India's diverse markets.",
  },
] as const;

const beliefs = [
  {
    title: "We believe a woman should not have to choose between family responsibilities and professional ambition.",
    image: "/story/value-1.webp",
    alt: "Illustration of a paper plane and a paper boat finding another way forward",
  },
  {
    title: "We believe a recruiter in a smaller city should have access to meaningful hiring opportunities without needing to move to a metro.",
    image: "/story/value-2.webp",
    alt: "Illustration of people rowing one boat together",
  },
  {
    title: "We believe employers should be able to reach talent beyond conventional channels.",
    image: "/story/value-3.webp",
    alt: "Illustration of people at desks, one raising a hand",
  },
  {
    title: "We believe AI can make recruitment more efficient when combined with human relationships, local knowledge and accountability for outcomes.",
    image: "/story/value-4.webp",
    alt: "Illustration of chess pieces on uneven pedestals",
  },
] as const;

const actions = [
  { label: "Explore Careers", href: "/jobs" },
  { label: "Become a Recruiter", href: "/become-a-recruiter" },
  { label: "Partner With Us", href: "/agency-onboarding" },
] as const;

export function BeliefStoryPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 pb-8 sm:px-8 sm:pt-24">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">Our Story</p>
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          <h1 className="max-w-[14ch] text-[2.4rem] leading-[1.05] font-semibold tracking-[-0.045em] sm:text-5xl">
            We Started by Seeing Talent the World Was Overlooking.
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
            <div className="mt-4 ml-auto max-w-md space-y-4 text-sm leading-6 text-neutral-500">
              <p>India doesn&apos;t lack talent. It lacks enough ways to connect that talent with opportunity.</p>
              <p>
                We saw capable women stepping away from their careers because of marriage, motherhood
                or relocation. We saw young people searching for their first opportunity. And we saw
                companies struggling to find the right people, at the right time, in the right places.
              </p>
              <p>
                We realized that hiring needed more than job portals and recruitment software. It
                needed a network of people, technology and local execution working together.
              </p>
              <p className="font-semibold text-neutral-950">That belief became EarlyJobs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
          From a Simple Observation to a Bigger Mission
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-600 sm:text-base">
          <p>
            Our journey began with Victaman, where we witnessed firsthand the gap between people
            looking for opportunities and businesses looking for talent.
          </p>
          <p>
            What stood out was the untapped potential of people who wanted to work but needed
            flexibility, access and a way to participate in the workforce on their own terms.
          </p>
          <p>We asked ourselves a simple question:</p>
          <p className="text-lg leading-8 font-medium text-neutral-950 italic">
            What if recruitment itself could become an opportunity for thousands of people, while
            helping companies hire better and faster?
          </p>
          <p>That question shaped EarlyJobs.</p>
          <p>
            We began building a distributed network of recruiters who could work from anywhere,
            connect with candidates in their communities and help companies execute hiring beyond
            the limitations of traditional recruitment models.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f5f2]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
            We Are Building More Than a Recruitment Company
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            EarlyJobs is building the infrastructure behind modern hiring. Our model brings together
            three capabilities.
          </p>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {capabilities.map((item) => (
              <li key={item.name} className="rounded-2xl bg-white p-6">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                  {item.name}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-base font-semibold tracking-[-0.02em]">
            Different capabilities. One larger ambition: make hiring more accessible, connected and
            scalable.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="mx-auto max-w-3xl text-center text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
          Our Belief: Talent Is Everywhere. Opportunity Should Be Too.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-neutral-500">
          These are not separate ideas. They are connected parts of the future we want to build.
        </p>
        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
          {beliefs.map((belief, index) => (
            <article key={belief.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <h3
                className={`max-w-md text-2xl leading-tight font-semibold tracking-[-0.04em] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {belief.title}
              </h3>
              <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                <Image
                  src={belief.image}
                  alt={belief.alt}
                  width={974}
                  height={802}
                  className="h-auto w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-16">
        <div>
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
            The Network Is Our Foundation
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-600 sm:text-base">
            <p>
              Every recruiter who joins our network brings more than recruitment capacity. They
              bring local knowledge, relationships, community access and an understanding of the
              people behind every application.
            </p>
            <p>
              As the network grows, we can reach more candidates, serve more employers and execute
              hiring across a wider range of roles and locations.
            </p>
            <p>
              Technology helps coordinate that network. Human relationships help make it effective.
              Successful hiring outcomes create the foundation for sustainable growth.
            </p>
            <p>
              This is how we believe hiring infrastructure should evolve: not through software
              alone, but through the combination of people, intelligence and execution.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
            Built in India. Designed for a Bigger Future.
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-600 sm:text-base">
            <p>
              We started by addressing a real problem in India&apos;s hiring ecosystem. Our ambition
              is to build a model that can serve diverse hiring needs at scale, from high-volume
              recruitment to frontline workforce hiring and technology-enabled recruitment
              operations.
            </p>
            <p>
              We are still building, learning and improving. Every employer we serve, every
              recruiter who grows with us and every successful joining teaches us something about
              how hiring can work better.
            </p>
            <p>Our journey is not just about filling vacancies.</p>
            <p>
              It is about expanding access to opportunity, helping businesses grow and building a
              more connected hiring ecosystem.
            </p>
          </div>
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
          <div className="relative px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              The Future of Hiring Is Connected.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              We are building a future where companies can access distributed recruiting capacity,
              recruiters can build sustainable professional careers, and technology can make hiring
              more efficient without losing the human connection that matters.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              If you are an employer looking to hire, a recruiter looking to grow, a partner who
              shares our vision or an investor interested in the future of hiring, we would love to
              connect.
            </p>
            <p className="mt-8 text-lg font-semibold">EarlyJobs. Huntlo AI. GigKaro.</p>
            <p className="mt-2 text-sm text-white/90 italic">One mission. A connected hiring ecosystem.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {actions.map((action, index) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium ${
                    index === 0
                      ? "bg-neutral-950 text-white hover:bg-neutral-800"
                      : "bg-white text-neutral-950 hover:bg-white/90"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

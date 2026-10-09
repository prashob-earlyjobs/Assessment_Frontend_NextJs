import Link from "next/link";
import { NewsroomAnnouncements } from "@/components/newsroom/announcements";
import { NewsroomEcosystemDiagram } from "@/components/newsroom/ecosystem-diagram";
import { NewsroomVisual } from "@/components/newsroom/visual";

const glance = [
  { value: "350+", label: "Recruiters" },
  { value: "500+", label: "Companies" },
  { value: "25,000+", label: "Interviews" },
  { value: "3,000+", label: "Successful Joinings" },
  { value: "150+", label: "College Partners" },
  { value: "20+", label: "Hiring Partners" },
] as const;

const stories = [
  {
    title: "The Women Building Careers in Recruitment",
    body: "How flexible recruiting careers are helping women re-enter the workforce and build lasting professional identity.",
    image: "/newsroom/women-recruiters-story.jpg",
    alt: "Illustration of women recruiters connected through the EarlyJobs network",
  },
  {
    title: "Inside the Recruiter-First Hiring Model",
    body: "Why putting recruiters at the center creates better outcomes for employers and job seekers alike.",
    image: "/newsroom/hiring-network-flow.jpg",
    alt: "Illustration of the EarlyJobs recruiter-first hiring network flow",
  },
  {
    title: "From Hiring Mandate to Joining",
    body: "A look at how EarlyJobs executes recruitment—from employer demand through network matching to successful joinings.",
    image: "/newsroom/mandate-to-joining.jpg",
    alt: "Illustration of the journey from hiring mandate to successful joining",
  },
] as const;

const kit = [
  "Company Overview",
  "Logo Pack",
  "Founder Headshots",
  "Leadership Bios",
  "Product Screenshots",
  "Company Fact Sheet",
] as const;

export function NewsroomPage() {
  return (
    <main className="relative bg-white">
      {/* HERO — editorial, image-led */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(234,106,78,0.12), transparent 42%), radial-gradient(ellipse at 100% 40%, rgba(234,106,78,0.06), transparent 28%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,22rem)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              01 — EarlyJobs Newsroom
            </p>
            <h1 className="mt-4 max-w-2xl text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3.25rem]">
              The Future of Hiring Is Being Built Around People.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              News, announcements and stories from EarlyJobs as we build a recruiter-first hiring
              network powered by AI.
            </p>
          </div>
          <NewsroomEcosystemDiagram />
        </div>
      </section>

      {/* AT A GLANCE */}
      <section id="glance" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              EarlyJobs, at a Glance
            </h2>
            <p className="text-[12px] font-medium tracking-[0.06em] text-neutral-500 uppercase">
              Updated October 2026
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
            EarlyJobs is a recruiter-first hiring network connecting job seekers and employers
            through independent recruiters, women recruiters, recruitment agencies and local hiring
            partners, supported by AI-powered recruitment infrastructure.
          </p>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {glance.map((item) => (
              <li key={item.label}>
                <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-neutral-500">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING */}
      <section id="building" className="scroll-mt-24 border-t border-black/10 bg-[#fcfaf9]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              A Hiring Network Built Around Recruiters.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              Hiring has traditionally been split across job boards, agencies, internal teams and
              independent recruiters. EarlyJobs is bringing these fragmented pieces into one
              connected network—giving recruiters more opportunities, employers more reach and job
              seekers more ways to get discovered.
            </p>
          </div>
          <NewsroomVisual
            src="/newsroom/hiring-network-flow.jpg"
            alt="Illustration of employers, EarlyJobs, recruiters, agencies and talent forming one hiring network"
            aspect="wide"
          />
        </div>
      </section>

      {/* WHAT'S HAPPENING */}
      <section id="news" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            What&apos;s Happening at EarlyJobs
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
            Company announcements, product updates, partnerships and people stories.
          </p>
          <div className="mt-10">
            <NewsroomAnnouncements />
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
            Stories From the Network
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
            Beyond announcements—human and industry narratives that define recruiter-first hiring.
          </p>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {stories.map((story, index) => (
              <li key={story.title} className="flex flex-col">
                <NewsroomVisual
                  src={story.image}
                  alt={story.alt}
                  aspect="story"
                  className="mb-5"
                />
                <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                  Story {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-neutral-950">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{story.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MEDIA */}
      <section id="media" className="scroll-mt-24 border-t border-black/10 bg-[#0A0F10] text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[3rem]">
            EarlyJobs in the Media
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
            Third-party coverage will appear here as it is published. We don&apos;t invent logos or
            claim placement we haven&apos;t earned.
          </p>
          <div className="mt-10 border border-white/10 bg-white/[0.03] px-5 py-8 sm:px-8">
            <p className="text-sm text-white/55">No published coverage listed yet.</p>
            <a
              href="mailto:info@earlyjobs.in?subject=Media%20coverage%20inquiry"
              className="mt-4 inline-flex text-[13px] font-medium text-brand hover:text-[#ff8a6b]"
            >
              Share coverage with us →
            </a>
          </div>
        </div>
      </section>

      {/* MEDIA KIT */}
      <section id="media-kit" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              Everything You Need to Cover EarlyJobs
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
              Request brand and company assets for accurate reporting.
            </p>
            <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {kit.map((asset) => (
                <li key={asset} className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm font-medium text-neutral-950">{asset}</span>
                  <a
                    href={`mailto:info@earlyjobs.in?subject=${encodeURIComponent(`Media kit request: ${asset}`)}`}
                    className="shrink-0 text-[13px] font-medium text-brand hover:text-[#d85c42]"
                  >
                    Request →
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <NewsroomVisual
            src="/newsroom/media-storytelling.jpg"
            alt="Illustration of media storytelling and coverage around EarlyJobs"
            aspect="wide"
          />
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="scroll-mt-24 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <article className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <span
              aria-hidden
              className="flex size-16 items-center justify-center rounded-[6px] bg-[#fff4f1] text-sm font-semibold tracking-[-0.03em] text-brand"
            >
              SK
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
                Saurav Kumar
              </h2>
              <p className="mt-1 text-sm font-medium text-brand">Founder &amp; CEO</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
                Leading EarlyJobs as a recruiter-first hiring network—where people, relationships,
                and AI infrastructure create better hiring outcomes.
              </p>
              <Link
                href="/team"
                className="mt-5 inline-flex text-[13px] font-medium text-brand hover:text-[#d85c42]"
              >
                Meet the team →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 border-t border-black/10 bg-[#fcfaf9]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
              Have a Story to Tell?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
              For interviews, commentary, company information and media requests.
            </p>
            <a
              href="mailto:info@earlyjobs.in?subject=Media%20inquiry"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-[6px] bg-brand px-5 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
            >
              Media inquiries →
            </a>
          </div>
          <NewsroomVisual
            src="/newsroom/talent-network.jpg"
            alt="EarlyJobs network illustration"
            aspect="wide"
            className="opacity-90"
          />
        </div>
      </section>
    </main>
  );
}

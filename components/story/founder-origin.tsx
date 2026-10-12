import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const chapters = [
  {
    id: "started-with-a-call",
    title: "EarlyJobs Didn't Start With a Business Plan. It Started With a Call.",
    image: "/agency-partnerships/story-team.jpg",
    alt: "EarlyJobs team working together on recruitment",
    imageFirst: true,
    paragraphs: [
      "Before EarlyJobs, we were running a recruitment agency called Victaman. As we worked with companies, something unexpected began happening.",
      "We started receiving calls, emails, and WhatsApp messages from women who had previously worked as recruiters at multinational companies. Many had lost their jobs or had been forced to step away from their careers after marriage, relocation, or maternity. Some had children to care for. Others had moved to places where their previous careers were difficult to continue.",
      "They weren't lacking skills or experience. They weren't lacking the willingness to work. They were lacking an opportunity that could fit their lives.",
      "And the number of these women reaching out to us kept growing.",
    ],
  },
  {
    id: "one-call",
    title: "One Call Made It Personal",
    image: "/about_us_imgs/Saurav-Kumar.jpg",
    alt: "Saurav Kumar, Founder and CEO of EarlyJobs",
    imageFirst: false,
    portrait: true,
    paragraphs: [
      "One day, a call made me think seriously about what we could do.",
      "I asked myself: Why should someone have to give up a career simply because life circumstances change?",
      "This question was personal to me, too.",
      "I come from a village in Bihar. Growing up, I had seen relatives, classmates, and people around me who were educated, talented, and eager to do something meaningful, but who didn't always have access to the right opportunities. I had seen this within my own family, including my sister, who had studied but wasn't able to put her education to work in the way she could have.",
      "I began to see that the problem wasn't always a lack of talent. Sometimes, opportunity simply wasn't reaching the people who needed it.",
      "That day, I went to our CTO with an idea: Why don't we build a portal where women can work remotely as recruiters?",
      "We didn't have all the answers. But we knew the problem was real.",
    ],
  },
  {
    id: "first-meeting",
    title: "Our First Meeting Wasn't an Interview",
    image: "/freelance-recruiters/women-culture.jpg",
    alt: "Women recruiters collaborating in a shared workspace",
    imageFirst: true,
    paragraphs: [
      "When we brought the first group of women together, we didn't conduct interviews. We conducted a webinar.",
      "Around 55 women joined us.",
      "I told them honestly that we didn't yet know exactly what we were building. We were trying to create a platform where they could work remotely, use their recruitment skills, and find opportunities without having to choose between their careers and their personal responsibilities.",
      "There was no elaborate blueprint. There was a problem worth solving, a group of women willing to give it a chance, and a belief that we could build something meaningful together.",
      "Thirty-three women joined us that day.",
      "That was the beginning of EarlyJobs.",
    ],
  },
  {
    id: "bigger-vision",
    title: "From 33 Women to a Much Bigger Vision",
    image: "/freelance-recruiters/women-team.jpg",
    alt: "EarlyJobs recruiter partners collaborating in person",
    imageFirst: false,
    paragraphs: [
      "What began with a simple attempt to create remote recruitment opportunities has grown into a network of more than 1,000 women working remotely with EarlyJobs.",
      "For us, this is about more than remote work. It's about making professional opportunities accessible to people whose talent might otherwise remain underutilized.",
      "A woman shouldn't have to live in a metro city to build a career. She shouldn't have to abandon her professional ambitions because she has moved to another city or has children to care for. And access to meaningful work shouldn't depend on where someone lives or whether they speak a particular language.",
      "We want to build a model where talent, commitment, and the willingness to work matter more than geography or circumstances.",
      "Our next ambition is to enable more than 10,000 women to work as recruiters through EarlyJobs.",
    ],
  },
] as const;

export function FounderOrigin() {
  return (
    <div>
      {chapters.map((chapter) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className="border-t border-black/6 bg-[#f7f5f2] odd:bg-white"
        >
          <Reveal
            className={`page-shell page-section grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14 ${
              chapter.imageFirst ? "" : "lg:[&>*:first-child]:order-2"
            }`}
          >
            <div
              className={`media-frame bg-white ${
                "portrait" in chapter && chapter.portrait ? "aspect-[4/5]" : "aspect-[5/4]"
              }`}
            >
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className={`object-cover ${
                  "portrait" in chapter && chapter.portrait ? "object-top" : "object-center"
                }`}
              />
            </div>
            <div>
              {"portrait" in chapter && chapter.portrait ? (
                <p className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                  A Note from Our Founder · Saurav Kumar
                </p>
              ) : null}
              <h2 className="max-w-[20ch] text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
                {chapter.title}
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">
                {chapter.paragraphs.map((paragraph) => {
                  const isEmphasis =
                    paragraph.startsWith("I asked myself:") ||
                    paragraph === "That was the beginning of EarlyJobs." ||
                    paragraph.startsWith("Our next ambition");
                  return (
                    <p
                      key={paragraph}
                      className={
                        isEmphasis
                          ? "text-lg leading-8 font-medium text-neutral-950"
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>
      ))}
    </div>
  );
}

export function MissionBeliefClose() {
  return (
    <section id="mission-grown" className="border-t border-black/6 bg-[#eef4fb]">
      <Reveal className="page-shell page-section !max-w-3xl">
        <h2 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
          The Mission Has Grown. The Belief Hasn&apos;t Changed.
        </h2>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">
          <p>
            EarlyJobs continues to evolve. Our distributed recruiter network is being strengthened by
            Huntlo AI, our AI-powered hiring infrastructure, and GigKaro, our frontline workforce
            hiring business.
          </p>
          <p>
            Together, they represent our broader ambition: to make hiring more effective for
            businesses while making employment opportunities more accessible to people across India.
          </p>
          <p>
            We started by listening to women who wanted another chance at their careers. That
            experience shaped how we think about hiring, technology, and opportunity.
          </p>
          <p>We are still building, still learning, and still working toward that vision.</p>
          <p className="text-lg leading-8 font-semibold text-neutral-950">
            Because talent is everywhere. Opportunity should be, too.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

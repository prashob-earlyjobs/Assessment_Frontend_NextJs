"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Frame, Headline } from "@/components/home/primitives";
import { gsap, useGSAP } from "@/lib/gsap";

type Review = {
  title?: string;
  quote: string;
  name: string;
  role: string;
  image?: string;
};

type Story = {
  id: "seekers" | "recruiters" | "employers";
  label: string;
  title: string;
  body: string;
  reviews: Review[];
};

const stories: Story[] = [
  {
    id: "seekers",
    label: "Job Seekers",
    title: "A profile, then a conversation.",
    body: "Professionals stop sending applications into silence. One profile reaches recruiters who are already working on roles that fit, and the next step is an interview instead of another form.",
    reviews: [
      {
        quote: "One recruiter reached out with a role that actually matched — interview the same week.",
        name: "Ananya R.",
        role: "Product Designer",
      },
      {
        quote: "My profile went to people already hiring for my stack. No ghosting — just a real conversation.",
        name: "Karthik M.",
        role: "Backend Engineer",
      },
      {
        quote: "Three relevant intros in a month. That never happened on job boards.",
        name: "Meera S.",
        role: "Marketing Associate",
      },
      {
        quote: "I stopped mass-applying overnight. EarlyJobs made the next step feel human again.",
        name: "Rahul V.",
        role: "Data Analyst",
      },
    ],
  },
  {
    id: "recruiters",
    label: "Recruiters",
    title: "Mandates you can actually close.",
    body: "Recruiters work verified hiring requirements, place people they believe in, and see earnings tied to joinings. Milestones show up as placements, not as activity.",
    reviews: [
      {
        title: "Career Revival",
        quote:
          "EarlyJobs has created a great impact and changed the direction of my life. After a long career gap EarlyJobs gave me chance to prove myself.",
        name: "Bhanu Rekha Teki",
        role: "Happy Recruiter",
      },
      {
        title: "Supportive Team",
        quote:
          "I had great experience with Early jobs team was very professional and guided me through out the job search.",
        name: "Bhavana T",
        role: "Happy Recruiter",
      },
      {
        title: "Highly Recommended",
        quote:
          "I highly recommend Victa Early Jobs for HR internships. My experience was incredibly enriching.",
        name: "Saurav Das",
        role: "Happy Recruiter",
      },
    ],
  },
  {
    id: "employers",
    label: "Employers",
    title: "A shorter path to the right person.",
    body: "Teams spend less time screening and more time meeting recruiter-reviewed candidates. Hiring time drops. Quality holds. Joinings stick.",
    reviews: [
      {
        title: "Trusted Partnership",
        quote:
          "We are working with early jobs for years ... they provide a good service in part of recruiting. The service was very supportive",
        name: "HDFC Bank",
        role: "Happy Client",
      },
      {
        title: "Organized Excellence",
        quote:
          "Demonstrates strong organizational skills. Excellent in follow-ups and candidate screening. Effectively communicates career opportunities and ensures candidates clearly understand the role and growth prospects.",
        name: "Teleperformance",
        role: "Happy Client",
      },
      {
        title: "Appreciation Note",
        quote:
          "I would like to sincerely thank you for the excellent support and guidance you provide throughout the process. i truly appreciate your efforts and the opportunity given by you and Earlyjobs.",
        name: "Frankfinn Aviation Services Private Limited",
        role: "Happy Client",
      },
    ],
  },
];

type StoryId = Story["id"];

function ReviewAvatar({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const showImage = Boolean(image) && !failed;

  return (
    <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden bg-brand text-[11px] font-semibold tracking-wide text-white" aria-hidden>
      {showImage ? (
        <Image
          src={image!}
          alt=""
          fill
          sizes="36px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}

export function SuccessStories() {
  const [current, setCurrent] = useState<StoryId>("seekers");
  const story = stories.find((item) => item.id === current) ?? stories[0];
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  const seenRef = useRef(false);

  useGSAP(
    () => {
      const list = listRef.current;
      const bar = barRef.current;
      const panel = panelRef.current;
      const button = list?.querySelector<HTMLButtonElement>(`[data-tab="${current}"]`);
      if (!list || !bar || !panel || !button) return;

      const nextIndex = Math.max(0, stories.findIndex((item) => item.id === current));
      const direction = nextIndex === indexRef.current ? 0 : nextIndex > indexRef.current ? 1 : -1;
      indexRef.current = nextIndex;
      const targetX = button.offsetLeft;
      const targetW = button.offsetWidth;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const first = !seenRef.current;
      seenRef.current = true;
      gsap.killTweensOf([bar, panel]);

      const settle = () => {
        gsap.set(bar, { x: targetX, width: targetW });
        gsap.set(panel, { x: 0, autoAlpha: 1 });
      };
      if (first || reduce || direction === 0) {
        settle();
        const onResize = () => settle();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }

      gsap.to(bar, { x: targetX, width: targetW, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        panel,
        { x: direction * 18, autoAlpha: 0.35 },
        { x: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" },
      );
    },
    { dependencies: [current], scope: listRef },
  );

  const loop = [...story.reviews, ...story.reviews];

  return (
    <Frame id="success-stories">
      <Headline>Every Successful Hiring Story Starts with a Connection.</Headline>

      <div
        ref={listRef}
        role="tablist"
        aria-label="Success stories"
        className="relative mt-10 flex gap-6 border-b border-black/10"
      >
        {stories.map((item) => {
          const selected = item.id === current;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-tab={item.id}
              aria-selected={selected}
              onClick={() => setCurrent(item.id)}
              className={`pb-3 text-sm font-medium ${selected ? "text-neutral-950" : "text-neutral-400"}`}
            >
              {item.label}
            </button>
          );
        })}
        <span ref={barRef} aria-hidden className="absolute bottom-0 left-0 h-0.5 bg-brand" />
      </div>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-10">
        <article ref={panelRef} className="max-w-xl">
          <h3 className="text-xl font-medium tracking-[-0.03em] text-neutral-950">{story.title}</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-600">{story.body}</p>
        </article>

        <aside
          aria-label={`${story.label} reviews`}
          className="review-marquee w-full min-w-0 rounded-[6px] bg-[linear-gradient(135deg,rgba(234,106,78,0.1),rgba(234,106,78,0.03))] py-3"
        >
          <div key={current} className="review-track flex gap-3 px-3 will-change-transform">
            {loop.map((item, i) => (
              <figure
                key={`${item.name}-${i}`}
                aria-hidden={i >= story.reviews.length}
                className="relative flex h-[13.5rem] w-[13.5rem] shrink-0 flex-col overflow-hidden bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-3 select-none text-[4.5rem] font-semibold leading-none text-brand/15"
                >
                  ”
                </span>
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <span aria-hidden className="block h-1 w-8 shrink-0 bg-brand" />
                  {item.title ? (
                    <p className="mt-3 shrink-0 truncate text-[13px] font-semibold tracking-[-0.02em] text-neutral-950">
                      {item.title}
                    </p>
                  ) : null}
                  <blockquote
                    className={`min-h-0 overflow-hidden break-words text-[12px] leading-[1.45] text-neutral-700 ${
                      item.title ? "mt-1.5 line-clamp-5" : "mt-3 line-clamp-6"
                    }`}
                  >
                    {item.quote}
                  </blockquote>
                </div>
                <figcaption className="relative mt-auto flex shrink-0 items-center gap-2.5 border-t border-black/5 pt-3">
                  <ReviewAvatar name={item.name} image={item.image} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-neutral-950">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-neutral-500">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </aside>
      </div>

      <p className="mt-12 text-sm text-neutral-500">
        <span className="tracking-[0.15em] text-brand" aria-hidden>
          ★★★★★
        </span>
        <span className="sr-only">5 stars. </span> Trusted by recruiters, employers, and
        professionals building the future of hiring.
      </p>
    </Frame>
  );
}

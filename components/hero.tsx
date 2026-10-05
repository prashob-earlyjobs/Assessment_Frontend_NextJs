import Image from "next/image";
import Link from "next/link";
import { HeroMotion } from "@/components/home/motion";
import { ParallaxString } from "@/components/parallax-string";

const audiences = [
  { line: "Built for Recruiters.", speed: 0.04 },
  { line: "Trusted by Employers.", speed: 0.07 },
  { line: "Loved by Job Seekers.", speed: 0.1 },
];

const actions = [
  {
    title: "Find Jobs",
    description: "Discover opportunities matched to your skills.",
    href: "/jobs",
    tone: "primary",
  },
  {
    title: "Become a Recruiter",
    description: "Build your recruiting career with verified hiring opportunities.",
    href: "/become-a-recruiter",
    tone: "secondary",
  },
  {
    title: "Start Hiring",
    description: "Connect with recruiters and hire faster.",
    href: "/employers",
    tone: "tertiary",
  },
] as const;

export function Hero() {
  return (
    <HeroMotion>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,22rem)]">
        <div className="min-w-0">
        <h1 className="max-w-2xl text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-[3.25rem]">
          The Recruiter-First Hiring Network.
        </h1>

        <ul className="mt-4 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5">
          {audiences.map((audience, index) => (
            <li key={audience.line} className="flex items-center gap-2.5 text-sm text-neutral-500">
              {index > 0 ? (
                <span aria-hidden className="hidden h-1 w-1 rounded-full bg-brand sm:block" />
              ) : null}
              <ParallaxString speed={audience.speed}>{audience.line}</ParallaxString>
            </li>
          ))}
        </ul>

        <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
          <p className="font-medium text-neutral-800">Hiring works best when people work together.</p>
          <p>
            EarlyJobs brings recruiters, employers, and job seekers into one AI-powered hiring
            network—helping recruiters build meaningful careers, employers hire exceptional talent,
            and job seekers discover opportunities where they truly belong.
          </p>
          <p>
            Whether you&apos;re looking for your next role, growing your recruiting career, or hiring
            your next great employee, EarlyJobs helps every connection lead to better outcomes.
          </p>
        </div>

        <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {actions.map((action) => (
            <div key={action.href} className="flex flex-col gap-1.5">
              <Link
                href={action.href}
                className={
                  action.tone === "primary"
                    ? "group relative flex h-11 w-full items-center justify-center rounded-[6px] bg-brand px-3 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
                    : "flex h-11 w-full items-center justify-center rounded-[6px] border border-black/10 bg-white px-3 text-[13px] font-medium text-neutral-950 transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-neutral-50"
                }
              >
                <span className="relative">
                  {action.title}
                  {action.tone === "primary" ? (
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="pointer-events-none absolute top-1/2 left-full ml-1.5 size-4 -translate-y-1/2 translate-x-1 opacity-0 transition-[opacity,translate] duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                    >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    </svg>
                  ) : null}
                </span>
              </Link>
              <p className="text-[13px] leading-5 text-neutral-500">{action.description}</p>
            </div>
          ))}
        </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="hero-turn w-full max-w-[22rem] will-change-transform">
            <Image
              id="hero-network"
              src="/hero-network.png"
              alt="A recruiter connected with job seekers, employers, and hiring teams"
              width={1024}
              height={1024}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </HeroMotion>
  );
}

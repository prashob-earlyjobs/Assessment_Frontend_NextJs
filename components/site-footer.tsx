import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Team", href: "/teams" },
  { label: "Blogs", href: "/resources" },
  { label: "Contact Us", href: "mailto:info@earlyjobs.in" },
  { label: "Our Story", href: "/about" },
  { label: "Job Openings", href: "/jobs" },
  { label: "HR Internship", href: "/jobs" },
] as const;

const gcc = [
  { label: "GCC Hiring Solutions", href: "/employers" },
  { label: "Build GCC India", href: "/employers" },
  { label: "GCC Recruitment Partner", href: "/employers" },
  { label: "Offshore Capability Center Hiring", href: "/employers" },
  { label: "GCC Talent Acquisition", href: "/employers" },
  { label: "India GCC Hiring Services", href: "/employers" },
] as const;

const services = [
  { label: "IT Recruitment", href: "/employers" },
  { label: "Finance & Accounting Recruitment", href: "/employers" },
  { label: "Sales & Marketing Recruitment", href: "/employers" },
  { label: "Top Executive Recruitment", href: "/employers" },
  { label: "HR & Executive Recruitment", href: "/employers" },
  { label: "Recruitment Process Outsourcing", href: "/employers" },
  { label: "Value Staffing Services", href: "/employers" },
] as const;

const tieUps = [
  { label: "Agencies and consultancies tie-up", href: "/recruiters", icon: "rocket" },
  { label: "Company Tie-Ups", href: "/employers", icon: "building" },
  { label: "Franchise With Us", href: "/about", icon: "pin" },
  { label: "Become Freelance Recruiter", href: "/become-a-recruiter", icon: "person" },
] as const;

const aiPlatforms = [
  {
    label: "ChatGPT",
    href: "https://chatgpt.com/?q=What%20is%20EarlyJobs.ai%20(https%3A%2F%2Fwww.earlyjobs.ai)%20and%20how%20can%20it%20help%20job%20seekers%2C%20employers%2C%20and%20recruiters%20in%20India%3F",
    icon: "/store/ai-openai.svg",
  },
  {
    label: "Grok",
    href: "https://grok.com/?q=What%20is%20EarlyJobs.ai%20(https%3A%2F%2Fwww.earlyjobs.ai)%20and%20how%20can%20it%20help%20job%20seekers%2C%20employers%2C%20and%20recruiters%20in%20India%3F",
    icon: "/store/ai-x.svg",
  },
  {
    label: "Claude",
    href: "https://claude.ai/new?q=What%20is%20EarlyJobs.ai%20(https%3A%2F%2Fwww.earlyjobs.ai)%20and%20how%20can%20it%20help%20job%20seekers%2C%20employers%2C%20and%20recruiters%20in%20India%3F",
    icon: "/store/ai-anthropic.svg",
  },
  {
    label: "Gemini",
    href: "https://gemini.google.com/app?prompt=What%20is%20EarlyJobs.ai%20(https%3A%2F%2Fwww.earlyjobs.ai)%20and%20how%20can%20it%20help%20job%20seekers%2C%20employers%2C%20and%20recruiters%20in%20India%3F",
    icon: "/store/ai-gemini.svg",
  },
  {
    label: "Perplexity",
    href: "https://www.perplexity.ai/search?q=What%20is%20EarlyJobs.ai%20(https%3A%2F%2Fwww.earlyjobs.ai)%20and%20how%20can%20it%20help%20job%20seekers%2C%20employers%2C%20and%20recruiters%20in%20India%3F",
    icon: "/store/ai-perplexity.svg",
  },
  {
    label: "Copilot",
    href: "https://copilot.microsoft.com/?q=What%20is%20EarlyJobs.ai%20(https%3A%2F%2Fwww.earlyjobs.ai)%20and%20how%20can%20it%20help%20job%20seekers%2C%20employers%2C%20and%20recruiters%20in%20India%3F",
    icon: "/store/ai-copilot.svg",
  },
] as const;

const social = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/earlyjobs",
    icon: (
      <path d="M9.5 15.5v-5.5H7.75V8.25H9.5V6.9c0-1.55.95-2.4 2.35-2.4.67 0 1.37.12 1.37.12v1.5h-.77c-.76 0-1 .47-1 1v1.13h1.7l-.27 1.75H11.45V15.5" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/earlyjobs.ai",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="9" height="9" rx="2.5" />
        <circle cx="8" cy="8" r="2.2" />
        <circle cx="11.2" cy="4.8" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/earlyjobs",
    icon: (
      <path d="M4.5 6.25h2V13.5h-2V6.25Zm1-3.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM7.85 6.25h1.9v.98h.03c.26-.5.92-1.03 1.9-1.03 2.03 0 2.4 1.34 2.4 3.08V13.5h-2V9.7c0-.9-.02-2.06-1.26-2.06-1.26 0-1.45.98-1.45 2V13.5h-2V6.25Z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@earlyjobs",
    icon: (
      <>
        <path d="M13.2 5.6c.3.8.3 2.4.3 2.4s0 1.6-.3 2.4a1.4 1.4 0 0 1-1 1c-.8.2-4.2.2-4.2.2s-3.4 0-4.2-.2a1.4 1.4 0 0 1-1-1C2.5 9.6 2.5 8 2.5 8s0-1.6.3-2.4a1.4 1.4 0 0 1 1-1C4.6 4.4 8 4.4 8 4.4s3.4 0 4.2.2a1.4 1.4 0 0 1 1 1Z" />
        <path d="M7.1 9.9 10 8 7.1 6.1v3.8Z" fill="currentColor" stroke="none" />
      </>
    ),
  },
] as const;

const linkClass =
  "text-sm leading-6 text-neutral-600 transition-colors hover:text-brand";
const headingClass =
  "text-[11px] font-semibold tracking-[0.14em] text-neutral-950 uppercase";

function Column({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p className={headingClass}>{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TieIcon({ name }: { name: (typeof tieUps)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 16 16",
    className: "mt-0.5 size-3.5 shrink-0 text-brand",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "rocket") {
    return (
      <svg {...common}>
        <path d="M8.5 11.5c-1.2.4-2.4.2-3.3-.7-.9-.9-1.1-2.1-.7-3.3 1.5.1 3 .7 4 1.7 1 1 1.6 2.5 1.7 4Z" />
        <path d="M9.2 6.8c.7-1.8 2.1-3.2 3.8-3.8-1.1 1.7-1.3 3.2-1.5 4.2-.8.2-1.7.2-2.3-.4Z" />
        <path d="M5.2 10.8 4 13.2l2.4-1.2" />
      </svg>
    );
  }
  if (name === "building") {
    return (
      <svg {...common}>
        <path d="M3.5 13.5h9M4.5 13.5V4.5h7v9M6.5 6.5h1M8.5 6.5h1M6.5 8.5h1M8.5 8.5h1M6.5 10.5h1M8.5 10.5h1" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg {...common}>
        <path d="M8 13.5s3.5-3.1 3.5-5.8A3.5 3.5 0 0 0 8 4.2a3.5 3.5 0 0 0-3.5 3.5C4.5 10.4 8 13.5 8 13.5Z" />
        <circle cx="8" cy="7.7" r="1.1" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="8" cy="5.5" r="2.2" />
      <path d="M3.5 13c.7-2.2 2.3-3.3 4.5-3.3S11.8 10.8 12.5 13" />
    </svg>
  );
}

function ContactRow({
  icon,
  children,
  href,
}: {
  icon: ReactNode;
  children: ReactNode;
  href?: string;
}) {
  const className = "flex gap-2.5 text-sm leading-6 text-neutral-600";
  const body = (
    <>
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={`${className} transition-colors hover:text-brand`}>
        {body}
      </a>
    );
  }
  return <p className={className}>{body}</p>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto border-t border-black/10 bg-[#fafafa]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
        <div>
          <Link href="/" className="inline-flex items-center" aria-label="EarlyJobs home">
            <Image
              src="/earlyjobs-logo.png"
              alt="EarlyJobs"
              width={234}
              height={106}
              className="h-9 w-auto"
            />
          </Link>

          <div className="mt-6 space-y-3">
            <ContactRow
              icon={
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path
                    d="M8 13.5s3.5-3.1 3.5-5.8A3.5 3.5 0 0 0 8 4.2a3.5 3.5 0 0 0-3.5 3.5C4.5 10.4 8 13.5 8 13.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <circle cx="8" cy="7.7" r="1.1" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              }
            >
              2nd Floor, Regent Insignia, Obeya Tulip, Mahakavi Vemana Rd, KHB Block
              Koramangala, Koramangala 4-B Block, 4th Block, Koramangala, Bengaluru,
              Karnataka 560095
            </ContactRow>
            <ContactRow
              href="mailto:info@earlyjobs.in"
              icon={
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <rect x="2.5" y="4" width="11" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="m3.2 4.6 4.8 3.4 4.8-3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            >
              info@earlyjobs.in
            </ContactRow>
            <ContactRow
              href="tel:+918217527926"
              icon={
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path
                    d="M5.2 3.5h2.1l.7 2.1-1.1.9a7.2 7.2 0 0 0 3.1 3.1l.9-1.1 2.1.7v2.1c0 .6-.5 1.1-1.1 1.1A8.9 8.9 0 0 1 3.5 4.6c0-.6.5-1.1 1.1-1.1Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              +91 8217527926
            </ContactRow>
          </div>

          <div className="mt-5 flex items-center gap-2.5">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex size-8 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition-colors hover:border-brand/40 hover:text-brand"
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                  {item.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <Column title="Company" links={company} />
        <Column title="GCC" links={gcc} />
        <Column title="Our Services" links={services} />

        <nav aria-label="Tools & Tie-Ups">
          <p className={headingClass}>Tools & Tie-Ups</p>
          <ul className="mt-4 space-y-3">
            {tieUps.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={`flex items-start gap-2 ${linkClass}`}>
                  <TieIcon name={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
        <p className="text-xs font-medium text-neutral-500">Available on</p>
        <div className="mt-2.5 flex flex-nowrap items-center justify-between gap-2.5 overflow-x-auto">
          <div className="flex flex-nowrap items-center gap-2.5">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              aria-label="Get it on Google Play"
              className="inline-flex shrink-0 transition-opacity hover:opacity-85"
            >
              <Image
                src="/store/google-play.svg"
                alt="Get it on Google Play"
                width={120}
                height={40}
                className="h-9 w-[120px] object-contain"
              />
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Download on the App Store"
              className="inline-flex shrink-0 transition-opacity hover:opacity-85"
            >
              <Image
                src="/store/app-store.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-9 w-[120px] object-contain"
              />
            </a>
          </div>
          <div className="ml-auto flex h-9 shrink-0 items-center gap-3">
            {aiPlatforms.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex size-5 items-center justify-center text-neutral-800 opacity-80 transition-opacity hover:opacity-100"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 object-contain invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-sm text-neutral-500 sm:flex-row sm:px-8">
          <p>© EarlyJobs.ai</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/resources" className="hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="/resources" className="hover:text-brand">
              Terms & Conditions
            </Link>
            <a href="mailto:info@earlyjobs.in" className="hover:text-brand">
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

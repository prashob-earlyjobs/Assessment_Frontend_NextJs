import Link from "next/link";

const links = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "For Recruiters", href: "/recruiters" },
  { label: "For Employers", href: "/employers" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "mailto:info@earlyjobs.in" },
] as const;

const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/earlyjobs" },
  { label: "Instagram", href: "https://www.instagram.com/earlyjobs.ai" },
] as const;

export function AboutFooter() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_auto_auto]">
        <div>
          <p className="text-base font-semibold tracking-[-0.03em] text-neutral-950">EarlyJobs</p>
          <p className="mt-2 text-sm text-neutral-800">The Recruiter-First Hiring Network.</p>
          <div className="mt-4 space-y-1 text-sm leading-6 text-neutral-500">
            <p>Built for Recruiters.</p>
            <p>Trusted by Employers.</p>
            <p>Loved by Job Seekers.</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-neutral-600 hover:text-neutral-950">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Social">
          <ul className="space-y-2">
            {social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-neutral-600 hover:text-neutral-950"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-5 text-sm text-neutral-500 sm:px-8">
          <p>© EarlyJobs.ai</p>
          <p>One Global Network. Infinite Hiring Possibilities.</p>
        </div>
      </div>
    </footer>
  );
}

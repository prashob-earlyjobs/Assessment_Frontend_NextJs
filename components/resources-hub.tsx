import Link from "next/link";
import { Frame, Headline } from "@/components/home/primitives";

const categories = [
  {
    title: "For Recruiters",
    items: ["Latest recruiter playbooks.", "Hiring trends.", "Placement strategies.", "AI recruiting."],
    cta: "Explore Recruiter Resources",
    href: "/resources",
  },
  {
    title: "For Job Seekers",
    items: ["Interview preparation.", "Career guides.", "Resume insights.", "Industry advice."],
    cta: "Explore Career Resources",
    href: "/resources",
  },
  {
    title: "For Employers",
    items: ["Hiring insights.", "Recruitment strategies.", "Industry reports.", "Talent acquisition trends."],
    cta: "Explore Hiring Resources",
    href: "/resources",
  },
] as const;

const articles = [
  "How Great Recruiters Never Run Out of Qualified Candidates",
  "Why Recruiter-Led Hiring Delivers Better Results",
  "Building Better Careers Through Recruiter Guidance",
] as const;

export function ResourcesHub() {
  return (
    <Frame id="resources-hub">
      <Headline>Learn. Grow. Hire Better.</Headline>
      <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
        Whether you&apos;re building your recruiting career, preparing for your next interview, or
        growing your hiring team, our resources are designed to help you succeed.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category.title}>
            <h3 className="text-lg font-medium tracking-[-0.03em] text-neutral-950">
              {category.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {category.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={category.href}
              className="mt-5 inline-flex text-sm font-medium text-neutral-950"
            >
              {category.cta}
              <span aria-hidden className="ml-1">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>

      <ul className="mt-14 border-t border-black/10">
        {articles.map((article) => (
          <li key={article} className="border-b border-black/10">
            <Link
              href="/resources"
              className="flex items-center justify-between gap-6 py-4 text-sm font-medium tracking-[-0.02em] text-neutral-950"
            >
              {article}
              <span aria-hidden className="text-neutral-400">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

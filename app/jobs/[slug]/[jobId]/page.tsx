import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ApplyJob } from "@/components/jobs/apply-job";
import { CompanyLogo } from "@/components/jobs/company-logo";
import { jobHref, jobSlug } from "@/lib/job-path";
import { getPublicJob, jobsPageHref } from "@/lib/public-jobs";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
      <path
        fill="#fff"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <defs>
        <radialGradient id="instagram-logo" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#instagram-logo)" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
      />
    </svg>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right font-medium text-neutral-950">{value}</dd>
    </div>
  );
}

function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; jobId: string }>;
}): Promise<Metadata> {
  const { jobId } = await params;
  const job = await getPublicJob(jobId);
  if (!job) return { title: "Job | EarlyJobs" };
  return { title: `${job.title} | EarlyJobs` };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string; jobId: string }> }) {
  const { slug, jobId } = await params;
  const job = await getPublicJob(jobId);
  if (!job) notFound();

  const canonical = jobSlug(job);
  if (slug !== canonical) redirect(`/jobs/${canonical}/${job.jobId}`);

  const chips = [job.location, job.type, job.mode, job.experience, job.openings, job.category, job.hiringNeed, job.shift].filter(
    Boolean,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/jobs" className="cursor-pointer text-[13px] font-medium text-brand">
        All roles
      </Link>
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
      <article className="rounded-2xl bg-white p-5 shadow-[0_10px_40px_rgba(23,23,23,0.06)] ring-1 ring-black/[0.05] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            {job.logoUrl ? (
              <img src={job.logoUrl} alt="" className="size-12 shrink-0 rounded-xl object-cover ring-1 ring-black/[0.06]" />
            ) : null}
            <div className="min-w-0">
              <p className="text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">{job.company}</p>
              <h1 className="mt-1 text-[22px] font-medium leading-tight tracking-[-0.03em] text-neutral-950">{job.title}</h1>
              <p className="mt-2 text-[15px] font-medium text-neutral-950">{job.salary}</p>
            </div>
          </div>
          <ApplyJob jobId={job.jobId} title={job.title} open={job.isActive} external={job.isExternal} />
        </div>
        <p className="mt-4 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span key={chip} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-700">
              {chip}
            </span>
          ))}
        </p>
        {job.qualification.length ? (
          <p className="mt-4 text-[13px] text-neutral-600">{job.qualification.join(", ")}</p>
        ) : null}
        {job.skills.length ? <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{job.skills.join(", ")}</p> : null}
        {job.description ? (
          <div
            className="mt-5 text-[14px] leading-relaxed text-neutral-800 [&_h1]:mt-4 [&_h1]:text-[18px] [&_h1]:font-medium [&_h2]:mt-4 [&_h2]:text-[16px] [&_h2]:font-medium [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-2 [&_ul]:mt-2"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
          />
        ) : null}
        {job.keywords.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {job.keywords.map((keyword) =>
              keyword.shared ? (
                <li key={keyword.label}>
                  <Link
                    href={jobsPageHref(1, { search: keyword.label })}
                    className="inline-flex cursor-pointer rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:text-brand hover:ring-1 hover:ring-brand/50"
                  >
                    {keyword.label}
                  </Link>
                </li>
              ) : (
                <li key={keyword.label} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-700">
                  {keyword.label}
                </li>
              ),
            )}
          </ul>
        ) : null}
      </article>
      <div className="filters-scroll flex flex-col gap-3 p-[5px] lg:fixed lg:top-[112px] lg:right-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:z-20 lg:max-h-[calc(100vh-128px)] lg:w-[17rem] lg:overflow-y-auto">
      <aside className="rounded-2xl bg-white p-3 shadow-[0_10px_40px_rgba(23,23,23,0.06)] ring-1 ring-black/[0.05]">
        {job.updates === "linkedin" ? (
          <a
            href="https://www.linkedin.com/company/earlyjobs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-[#0b66c1] py-1.5 text-[13px] font-medium text-white transition hover:bg-[#0959aa]"
          >
            <LinkedInIcon />
            Join for More Updates
          </a>
        ) : null}
        {job.updates === "instagram" ? (
          <a
            href="https://www.instagram.com/earlyjobs.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 py-1.5 text-[13px] font-medium text-white transition hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700"
          >
            <InstagramIcon />
            Join for More Updates
          </a>
        ) : null}
        <h2 className="mt-3 text-base font-medium text-neutral-950">Job Summary</h2>
        <dl className="mt-3 space-y-2 text-[13px]">
          <SummaryRow label="Company:" value={job.companyName} />
          <SummaryRow label="Location:" value={job.city} />
          <SummaryRow label="Type:" value={job.type || "Full-time"} />
          <SummaryRow label="Experience:" value={job.summaryExperience} />
          <SummaryRow label="Salary:" value={job.summarySalary} />
        </dl>
      </aside>
      {job.related.length ? (
        <section className="rounded-2xl bg-white p-3 shadow-[0_10px_40px_rgba(23,23,23,0.06)] ring-1 ring-black/[0.05]">
          <h2 className="text-base font-medium text-neutral-950">Related Jobs</h2>
          <ul className="mt-3 space-y-2">
            {job.related.map((item) => (
              <li key={item.jobId}>
                <Link
                  href={jobHref(item)}
                  className="flex h-[70px] cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl px-2.5 py-2 ring-1 ring-black/[0.06] transition-colors hover:bg-neutral-50"
                >
                  <CompanyLogo src={item.logoUrl} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium text-neutral-950">{item.title}</span>
                    <span className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-neutral-500">
                      {[item.company, item.location, item.type].filter(Boolean).join(" • ")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      </div>
      </div>
    </main>
  );
}

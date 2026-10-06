import Link from "next/link";
import { jobHref } from "@/lib/job-path";

export type JobListing = {
  id: string;
  jobId: string;
  title: string;
  company: string;
  logoUrl?: string;
  location: string;
  type: string;
  mode: string;
  experience: string;
  minExperience: number;
  maxExperience: number;
  openings: string;
  salary: string;
  posted: string;
};

const meta = "max-w-full truncate rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-700 lg:max-w-56";

export function JobListingCard({ job }: { job: JobListing }) {
  const href = jobHref(job);
  const details = [job.location, job.type, job.mode, job.experience, job.openings];

  return (
    <article className="flex flex-col gap-3 overflow-hidden rounded-2xl bg-neutral-50 p-4 ring-1 ring-black/[0.04] transition-colors hover:bg-white sm:p-5 lg:h-[100px] lg:flex-row lg:items-center lg:gap-4">
      <Link href={href} className="flex min-w-0 cursor-pointer items-start gap-3 lg:contents">
        {job.logoUrl ? (
          <img src={job.logoUrl} alt="" className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-black/[0.06]" />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">{job.company}</p>
          <h2 className="mt-1 truncate text-[15px] font-medium leading-tight tracking-[-0.03em] text-neutral-950">
            {job.title}
          </h2>
          <p className="mt-2 flex flex-wrap gap-1.5 lg:flex-nowrap lg:overflow-hidden">
            {details.map((detail) => (
              <span key={detail} className={meta}>
                {detail}
              </span>
            ))}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 border-t border-black/[0.04] pt-3 lg:block lg:shrink-0 lg:border-0 lg:pt-0 lg:text-right">
        <p className="text-[13px] font-medium tabular-nums tracking-[-0.02em] text-neutral-950">{job.salary}</p>
        <div className="text-right">
          <p className="text-[11px] text-neutral-400 lg:mt-1">{job.posted}</p>
          <Link
            href={href}
            className="mt-1 inline-block text-[12px] font-medium text-brand transition-colors hover:text-[#d85c42]"
          >
            Apply
          </Link>
        </div>
      </div>
    </article>
  );
}

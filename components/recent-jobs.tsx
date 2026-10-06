"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { JobListingCard, type JobListing } from "@/components/jobs/listing";

export function RecentJobs() {
  const [jobs, setJobs] = useState<JobListing[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/dashboard")
      .then(async (response) => {
        if (!response.ok) throw new Error("dashboard failed");
        return (await response.json()) as {
          success?: boolean;
          data?: { recentJobs?: JobListing[] };
        };
      })
      .then((body) => {
        if (cancelled || !body.success || !body.data?.recentJobs) return;
        setJobs(body.data.recentJobs);
      })
      .catch(() => {
        /* keep empty */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="section-2" className="snap-section border-t border-black/10 bg-[#fafafa]">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-[2.75rem]">
              Recent Jobs Available
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
              Real opportunities. Verified employers. Structured hiring.
            </p>
          </div>
          <Link
            href="/jobs"
            className="shrink-0 text-sm font-medium text-brand transition-colors hover:text-[#d85c42]"
          >
            View all
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {jobs.length === 0
            ? Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-[100px] animate-pulse rounded-2xl bg-neutral-200/70"
                />
              ))
            : jobs.map((job) => <JobListingCard key={job.jobId} job={job} />)}
        </div>
      </div>
    </section>
  );
}

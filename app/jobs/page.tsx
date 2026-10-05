import { redirect } from "next/navigation";
import { JobFilters } from "@/components/jobs/filters";
import { JobsNavProvider } from "@/components/jobs/jobs-nav";
import { JobListingCard } from "@/components/jobs/listing";
import { OpenRoles } from "@/components/jobs/open-roles";
import { JobsPagination } from "@/components/jobs/pagination";
import {
  getPublishedJobs,
  jobsPageHref,
  parseJobQuery,
  parseJobsPage,
  type JobQuery,
  type PublishedJobsPage,
} from "@/lib/public-jobs";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    location?: string | string[];
    category?: string | string[];
    type?: string | string[];
    level?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const requestedPage = parseJobsPage(params.page);
  const filters: JobQuery = parseJobQuery(params);
  let result: PublishedJobsPage | null = null;

  try {
    result = await getPublishedJobs(requestedPage, filters);
  } catch {
    result = null;
  }

  if (result && requestedPage > result.totalPages && result.totalPages > 0) {
    redirect(jobsPageHref(result.totalPages, filters));
  }

  const jobs = result?.jobs ?? [];

  return (
    <main className="lg:h-[calc(100dvh-4rem)]">
      <JobsNavProvider>
        <JobFilters filters={filters} />
        <OpenRoles total={result ? result.totalResults : null}>
          {result ? (
            jobs.length ? (
              <>
                <ul className="job-list mt-4 flex min-h-0 flex-1 flex-col gap-2 lg:overflow-y-auto">
                  {jobs.map((job) => (
                    <li key={job.id}>
                      <JobListingCard job={job} />
                    </li>
                  ))}
                </ul>
                <JobsPagination page={result.page} totalPages={result.totalPages} filters={filters} />
              </>
            ) : (
              <p className="mt-5 px-1.5 text-sm text-neutral-500">No roles match these filters.</p>
            )
          ) : (
            <p className="mt-5 px-1.5 text-sm text-neutral-500">Jobs are unavailable right now.</p>
          )}
        </OpenRoles>
      </JobsNavProvider>
    </main>
  );
}

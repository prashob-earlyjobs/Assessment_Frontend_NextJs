import { notFound, redirect } from "next/navigation";
import { jobHref } from "@/lib/job-path";
import { getPublicJob } from "@/lib/public-jobs";

/** Old /jobs/{slug}/{jobId} URLs redirect to /jobs/{title}-{shortId}. */
export default async function LegacyJobPage({
  params,
}: {
  params: Promise<{ slug: string; jobId: string }>;
}) {
  const { jobId } = await params;
  const job = await getPublicJob(jobId);
  if (!job) notFound();
  redirect(jobHref(job));
}

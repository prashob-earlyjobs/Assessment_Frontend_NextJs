function pathPart(value: string, fallback: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || fallback;
}

export function jobSlug(job: {
  title: string;
  location: string;
  minExperience: number;
  maxExperience: number;
}) {
  const years = `${job.minExperience}-to-${job.maxExperience}-years`;
  return `${pathPart(job.title, "job")}-${pathPart(job.location, "location")}-${years}`;
}

export function jobHref(job: {
  title: string;
  location: string;
  minExperience: number;
  maxExperience: number;
  jobId: string;
}) {
  return `/jobs/${jobSlug(job)}/${job.jobId}`;
}

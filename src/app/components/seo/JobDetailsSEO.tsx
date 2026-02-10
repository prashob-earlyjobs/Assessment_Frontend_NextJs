import Head from "next/head";

interface JobDetailsSEOProps {
  jobData: {
    title: string;
    company_name: string;
    employment_type?: string;
    min_salary?: string | number;
    max_salary?: string | number;
    salary_mode?: string;
    min_experience?: number | string;
    max_experience?: number | string;
    city?: string;
    description?: string;
    company_logo_url?: string;
    created_at?: string;
    qualification?: string;
    keywords?: string;
  } | null;
  currentUrl: string;
}

const JobDetailsSEO = ({ jobData, currentUrl }: JobDetailsSEOProps) => {
  // Utility function to format salary
  const formatSalary = (minSalary?: string | number, maxSalary?: string | number, salaryMode?: string): string => {
    if (!minSalary && !maxSalary) return "Not Disclosed";

    const min = typeof minSalary === 'string' ? parseFloat(minSalary) : minSalary;
    const max = typeof maxSalary === 'string' ? parseFloat(maxSalary) : maxSalary;

    if (min && max) {
      const minLpa = salaryMode?.toLowerCase() === "monthly" ? (min * 12) / 100000 : min / 100000;
      const maxLpa = salaryMode?.toLowerCase() === "monthly" ? (max * 12) / 100000 : max / 100000;
      return `${minLpa >= 10 ? minLpa.toFixed(0) : minLpa.toFixed(1)} - ${maxLpa >= 10 ? maxLpa.toFixed(0) : maxLpa.toFixed(1)} LPA`;
    } else if (min) {
      const minLpa = salaryMode?.toLowerCase() === "monthly" ? (min * 12) / 100000 : min / 100000;
      return `${minLpa >= 10 ? minLpa.toFixed(0) : minLpa.toFixed(1)} LPA`;
    } else if (max) {
      const maxLpa = salaryMode?.toLowerCase() === "monthly" ? (max * 12) / 100000 : max / 100000;
      return `${maxLpa >= 10 ? maxLpa.toFixed(0) : maxLpa.toFixed(1)} LPA`;
    }

    return "Not Disclosed";
  };

  // Utility function to format experience
  const formatExperience = (minExp?: number | string, maxExp?: number | string): string => {
    const toStr = (v?: number | string) =>
      v === undefined || v === null || v === "_" || v === "" ? null : String(v);
    const minS = toStr(minExp);
    const maxS = toStr(maxExp);

    if (minS && maxS) return `${minS} - ${maxS} years`;
    if (minS) return `${minS} years`;
    if (maxExp) return `${maxS} years`;
    return "Not specified";
  };

  // Fallback metadata when jobData is null
  if (!jobData) {
    return (
      <Head>
        <title>Job Details - EarlyJobs</title>
        <meta name="description" content="Find and apply for the best job opportunities on EarlyJobs." />
        <meta name="keywords" content="jobs, careers, employment, earlyjobs" />
        <meta name="author" content="EarlyJobs" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Job Details - EarlyJobs" />
        <meta property="og:description" content="Find and apply for the best job opportunities on EarlyJobs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="/assets/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Job Details - EarlyJobs" />
        <meta name="twitter:description" content="Find and apply for the best job opportunities on EarlyJobs." />
        <meta name="twitter:image" content="/assets/og-image.png" />
        <link rel="canonical" href={currentUrl} />
      </Head>
    );
  }

  // Metadata when jobData is available
  const title = `${jobData.title} Job at ${jobData.company_name} - EarlyJobs`;
  const description = `Apply for ${jobData.title} position at ${jobData.company_name}. ${jobData.employment_type || 'Full-time'} job with ${formatSalary(jobData.min_salary, jobData.max_salary, jobData.salary_mode)} salary. ${formatExperience(jobData.min_experience, jobData.max_experience)} experience required.`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${jobData.title}, ${jobData.company_name}, job, career, employment, ${jobData.city || 'remote'}, ${jobData.employment_type || 'full-time'}, ${jobData.keywords || ''}`} />
      <meta name="author" content="EarlyJobs" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={jobData.company_logo_url || '/assets/og-image.png'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={jobData.company_logo_url || '/assets/og-image.png'} />
      <link rel="canonical" href={currentUrl} />

      {/* Structured Data for Job Posting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: jobData.title,
            description: jobData.description?.replace(/<[^>]*>/g, '') || `Job opportunity for ${jobData.title} at ${jobData.company_name}`,
            hiringOrganization: {
              "@type": "Organization",
              name: jobData.company_name,
              logo: jobData.company_logo_url,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: jobData.city || "Remote",
                addressCountry: "IN",
              },
            },
            employmentType: jobData.employment_type || "FULL_TIME",
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "INR",
              value: {
                "@type": "QuantitativeValue",
                minValue: jobData.min_salary || 0,
                maxValue: jobData.max_salary || 0,
                unitText: "YEAR",
              },
            },
            qualifications: jobData.qualification || "Not specified",
            experienceRequirements: formatExperience(jobData.min_experience, jobData.max_experience),
            datePosted: jobData.created_at,
            validThrough: jobData.created_at
              ? new Date(new Date(jobData.created_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
              : null,
            applicantLocationRequirements: {
              "@type": "Country",
              name: "India",
            },
          }),
        }}
      />
    </Head>
  );
};

export default JobDetailsSEO;
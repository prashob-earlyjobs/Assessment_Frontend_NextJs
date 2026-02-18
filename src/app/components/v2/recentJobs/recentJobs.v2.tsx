"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import JobCard from "../jobCard/jobCard";
import { Card } from "../../ui/card";

const RecentJobsV2 = ({ data }: { data: any }) => {
  const router = useRouter();
  const isLoading = !data;

  const handleViewAll = () => {
    router.push("/jobs");
  };

  const handleJobClick = (job: any) => {
    const jobId = job.jobId || job.id;
    const jobTitle = (job.title || "job").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "job";
    const location = (job.location || "location").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "location";
    const expMin = job.minExperience != null ? String(job.minExperience) : undefined;
    const expMax = job.maxExperience != null ? String(job.maxExperience) : undefined;
    const expPart = expMin != null || expMax != null ? `-${expMin ?? "0"}-${expMax ?? "0"}` : "";
    router.push(`/jobs/${jobTitle}-${location}${expPart}/${jobId}`);
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Recent Jobs Available
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet...
            </p>
          </div>
          <button
            onClick={handleViewAll}
            className="text-[#ea6a4e] hover:text-[#c95a42] font-medium text-base md:text-lg transition-colors duration-200 self-start md:self-auto"
          >
            View all
          </button>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {isLoading ? (
            /* Shimmer skeleton - same layout as JobCard */
            [...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="p-6 shadow-none border border-gray-200/50 animate-pulse"
              >
                <div className="flex flex-col gap-4">
                  <div className="h-5 w-24 rounded-full bg-gray-200" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-3/4 bg-gray-200 rounded" />
                      <div className="h-4 w-1/2 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="h-4 w-20 bg-gray-100 rounded" />
                    <div className="h-4 w-16 bg-gray-100 rounded" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                    <div className="h-4 w-20 bg-gray-100 rounded" />
                    <div className="h-8 w-24 bg-gray-200 rounded ml-auto" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-100 rounded-full" />
                    <div className="h-6 w-20 bg-gray-100 rounded-full" />
                    <div className="h-6 w-14 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </Card>
            ))
          ) : data?.recentJobs && data.recentJobs.length > 0 ? (
            data.recentJobs.map((job: any) => (
              <JobCard
                key={job.jobId || job.id}
                company={job.companyName || job.company_name || ""}
                brandName={job.brandName || job.companyName}
                logo={job.companyLogoUrl || job.company_logo_url || "/images/company_placeholder.png"}
                title={job.title || "Job Title"}
                employmentType={job.employmentType || job.category || "Full Time"}
                workType={job.workType}
                min_salary={job.minSalary != null ? String(job.minSalary) : undefined}
                max_salary={job.maxSalary != null ? String(job.maxSalary) : undefined}
                salary_mode={job.paymentFrequency === "monthly" ? "monthly" : "yearly"}
                min_experience={job.minExperience != null ? String(job.minExperience) : undefined}
                max_experience={job.maxExperience != null ? String(job.maxExperience) : undefined}
                location={job.location || "Not specified"}
                skills={Array.isArray(job.skills) ? job.skills : undefined}
                postedTime={job.createdAt || job.created_at || ""}
                onJobClick={() => handleJobClick(job)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No recent jobs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentJobsV2;

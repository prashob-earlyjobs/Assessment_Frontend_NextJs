"use client";

import { useRouter } from "next/navigation";
import { Briefcase, Clock, DollarSign, MapPin, Bookmark } from "lucide-react";
import { Button } from "../../ui/button";

interface Job {
  id: string;
  timePosted: string;
  jobTitle: string;
  companyName: string;
  category: string;
  type: string;
  salary: string;
  location: string;
  logoColor: string;
}

const RecentJobsV2 = ({ data }: { data: any }) => {
  const router = useRouter();

  function timeAgo(inputDate: string | Date): string {
    const date = new Date(inputDate);
    const now = new Date();
  
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diffInSeconds < 5) return "just now";
  
    const intervals: { label: string; seconds: number }[] = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 }
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
  
    return "just now";
  }


  type PaymentFrequency = "monthly" | "yearly" | "hourly";

  function salaryRangeToLPA(
    minSalary: number,
    maxSalary: number,
    paymentFrequency: PaymentFrequency
  ): string {
    console.log("paymentFrequency", paymentFrequency);
    const MULTIPLIER = paymentFrequency === "monthly" ? 12 : paymentFrequency === "yearly" ? 1 : 0;
  
    const minYearly = minSalary * MULTIPLIER;
    const maxYearly = maxSalary * MULTIPLIER;
  
    const toLPA = (amount: number): string => {
      const lpa = amount / 100000;
      return lpa % 1 === 0 ? `${lpa}` : lpa.toFixed(2);
    };
  
    return `${toLPA(minYearly)} – ${toLPA(maxYearly)} LPA`;
  }
  

  const handleViewAll = () => {
    router.push("/jobs");
  };

  const handleJobDetails = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
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
            className="text-orange-500 hover:text-orange-600 font-medium text-base md:text-lg transition-colors duration-200 self-start md:self-auto"
          >
            View all
          </button>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {data?.recentJobs && data.recentJobs.length > 0 ? (
            data.recentJobs.map((job: any) => (
            <div
              key={job.id}
              className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 relative"
            >
              {/* Bookmark Icon - Top Right */}
              <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bookmark className="w-5 h-5" />
              </button>

              <div className="flex gap-4 pr-8">
                {/* Company Logo */}
                <div
                  className={`${job.logoColor} w-12 h-12 rounded-full flex-shrink-0`}
                />

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  {/* Time Posted Badge */}
                  <div className="mb-2">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                      {timeAgo(job.createdAt)}
                    </span>
                  </div>

                  {/* Job Title and Company */}
                  <h3 className="text-xl font-bold text-black mb-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {job.companyName}
                  </p>

                  {/* Job Attributes */}
                  <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-sm text-gray-600">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0 text-orange-400" />
                        <span>{job.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 text-orange-400" />
                        <span>{job.workType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0 text-orange-400" />
                        <span>{salaryRangeToLPA(job.minSalary, job.maxSalary, job.paymentFrequency)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 text-orange-400" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleJobDetails(job.id)}
                      className="bg-[#F08504] hover:bg-orange-600 text-white rounded-lg px-6 py-2 font-medium transition-colors duration-200 flex-shrink-0"
                    >
                      Job Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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

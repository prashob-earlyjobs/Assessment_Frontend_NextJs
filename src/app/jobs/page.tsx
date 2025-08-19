"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import Header from "../components/layout/Header";
import FilterSidebar from "../components/jobs/FilterSidebar";
import JobCard from "../components/jobs/JobCard";
import Sidebar from "../components/jobs/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

interface Job {
  id: string;
  company_name: string;
  company_logo_url?: string;
  title?: string;
  jobType?: string;
  min_salary?: string | number;
  max_salary?: string | number;
  salary_mode?: string;
  min_experience?: string;
  max_experience?: string;
  city?: string;
  //   skills?: string[];
  created_at?: string;
}

const Jobs = () => {
  const router = useRouter();
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [jobsPerPage] = useState(10);
  const pageSize = 10;

  // Filter states
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const backendUrl = "https://apis.earlyjobs.in";


  // Calculate pagination values
  const totalPages = Math.ceil(totalJobs / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalJobs);

  // Use refs to store latest values for fetchJobs
  const filtersRef = useRef({
    companyName,
    location,
    title,
    searchInput,
    currentPage,
  });

  // Update refs when state changes
  useEffect(() => {
    filtersRef.current = {
      companyName,
      location,
      title,
      searchInput,
      currentPage,
    };
  }, [companyName, location, title, searchInput, currentPage]);

  console.log("Jobs component mounted, backendUrl:", backendUrl);

  const fetchJobs = useCallback(async () => {
    try {
      console.log("=== fetchJobs called ===");
      setLoading(true);
      console.log("Fetching jobs..."); // Debug log

      const {
        companyName: cn,
        location: loc,
        title: tit,
        searchInput: si,
        currentPage: cp,
      } = filtersRef.current;

      const params = new URLSearchParams();
      if (cn) params.append("company", cn);
      if (loc) params.append("location", loc);
      if (tit) params.append("title", tit);
      if (si) params.append("search", si);
      params.append("page", cp.toString());
      params.append("pageSize", pageSize.toString());

      const url = `${backendUrl}/api/public/jobs?${params.toString()}`;
      console.log("API URL:", url); // Debug log

      console.log("About to make fetch request..."); // Debug log
      const response = await fetch(url);
      console.log("Response received:", response); // Debug log
      console.log("Response status:", response.status); // Debug log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      if (data.jobs) {
        console.log("Setting jobs data:", data.jobs.length, "jobs"); // Debug log
        console.log("Sample job data:", data.jobs[0]); // Debug log to see structure
        setJobsData(data.jobs || []);
        setTotalJobs(data.count || 0);
      } else {
        console.error("Failed to fetch jobs:", data.message || "No jobs data");
        setJobsData([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobsData([]);
    } finally {
      console.log("Setting loading to false"); // Debug log
      setLoading(false);
    }
  }, []); // removed jobsPerPage dependency since backend controls page size

  // Call fetchJobs on component mount
  useLayoutEffect(() => {
    console.log("=== Component mounted, calling fetchJobs... ===");
    fetchJobs();
  }, [fetchJobs]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchJobs();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [companyName, location, title, searchInput, fetchJobs]);

  // Fetch when page changes
  useEffect(() => {
    fetchJobs();
  }, [currentPage, fetchJobs]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of the page when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJobClick = (jobId: string) => {
    // Get the job data to extract the title
    const job = jobsData.find((j) => j.id === jobId);
    if (job) {
      const jobTitle =
        job.title
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") || "job";
      router.push(`/jobs/${jobTitle}/${jobId}`);
    } else {
      // Fallback if job not found
      router.push(`/jobs/job/${jobId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-64 space-y-4">
            <FilterSidebar
              companyName={companyName}
              setCompanyName={setCompanyName}
              location={location}
              setLocation={setLocation}
              title={title}
              setTitle={setTitle}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.34-4.34"
                    />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search jobs by title, company, or keywords..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-earlyjobs-orange focus:border-transparent"
                  />
                </div>
              </div>
              <Select defaultValue="latest">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Sort By Latest Jobs</SelectItem>
                  <SelectItem value="relevance">Sort By Relevance</SelectItem>
                  <SelectItem value="salary">Sort By Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earlyjobs-orange mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading jobs...</p>
                </div>
              ) : jobsData.length > 0 ? (
                <>
                  {jobsData.map((job) => (
                    <JobCard
                      key={job.id}
                      company={job.company_name}
                      logo={
                        job.company_logo_url ||
                        "/images/default-company-logo.png"
                      }
                      title={job.title || "Job Title Not Available"}
                      jobType={job.jobType || "Full Time"}
                      min_salary={String(job.min_salary || "Not Disclosed")}
                      max_salary={String(job.max_salary || "Not Disclosed")}
                      min_experience={job.min_experience || "_"}
                      max_experience={job.max_experience || "_"}
                      salary_mode={job.salary_mode || "_"}
                      location={job.city || "Location Not Specified"}
                      // skills={job.skills || []}
                      // postedTime={new Date().toISOString()}
                      postedTime={job.created_at || "Not Disclosed"}
                      onJobClick={() => handleJobClick(job.id)}
                    />
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Previous
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  currentPage === pageNum
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className="w-8 h-8 p-0"
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1"
                      >
                        Next
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    No jobs found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-64 space-y-6">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Jobs;

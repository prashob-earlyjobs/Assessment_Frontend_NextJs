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
import Footer from "../components/pages/footer";

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
  created_at?: string;
}

const Jobs = () => {
  const router = useRouter();
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter states
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Sidebar visibility states for mobile/tablet
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IN;

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
      console.log("Fetching jobs...");

      const { companyName: cn, location: loc, title: tit, searchInput: si, currentPage: cp } = filtersRef.current;

      const params = new URLSearchParams();
      if (cn) params.append("company", cn);
      if (loc) params.append("location", loc);
      if (tit) params.append("title", tit);
      if (si) params.append("search", si);
      params.append("page", cp.toString());
      params.append("pageSize", pageSize.toString());

      const url = `${backendUrl}/public/jobs?${params.toString()}`;
      console.log("API URL:", url);

      console.log("About to make fetch request...");
      const response = await fetch(url);
      console.log("Response received:", response);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.jobs) {
        console.log("Setting jobs data:", data.jobs.length, "jobs");
        console.log("Sample job data:", data.jobs[0]);
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
      console.log("Setting loading to false");
      setLoading(false);
    }
  }, []);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJobClick = (jobId: string) => {
    const job = jobsData.find((j) => j.id === jobId);
    if (job) {
      const jobTitle = job.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "job";
      router.push(`/jobs/${jobTitle}/${jobId}`);
    } else {
      router.push(`/jobs/job/${jobId}`);
    }
  };

  // Toggle sidebar visibility
  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Mobile/Tablet Toggle Buttons */}
        <div className="flex justify-between mb-4 md:hidden">
          <Button
            variant="outline"
            onClick={toggleFilterSidebar}
            className="flex items-center gap-2 border border-gray-300"
          >
            {isFilterSidebarOpen ? "Hide Filters" : "Apply Filters"}
          </Button>
          
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left Sidebar - Filters */}
          <div
            className={`w-full md:w-64 space-y-4 ${
              isFilterSidebarOpen ? "block" : "hidden md:block"
            }`}
          >
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="w-full sm:max-w-md">
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
                <SelectTrigger className="w-full sm:w-48">
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
                        job.company_logo_url || "/images/default-company-logo.png"
                      }
                      title={job.title || "Job Title Not Available"}
                      jobType={job.jobType || "Full Time"}
                      min_salary={String(job.min_salary || "Not Disclosed")}
                      max_salary={String(job.max_salary || "Not Disclosed")}
                      min_experience={job.min_experience || "_"}
                      max_experience={job.max_experience || "_"}
                      salary_mode={job.salary_mode || "_"}
                      location={job.city || "Location Not Specified"}
                      postedTime={job.created_at || "Not Disclosed"}
                      onJobClick={() => handleJobClick(job.id)}
                    />
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
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

                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(pageNum)}
                              className="w-8 h-8 p-0"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
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
                  <p className="text-gray-600">No jobs found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>

         
          <div
            className={`w-full md:w-64 space-y-6 
             
            }`}
          >
            <Sidebar />
          </div>
          
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Jobs;
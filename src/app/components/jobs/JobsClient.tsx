"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Header from "../layout/Header";
import FilterSidebar from "./FilterSidebar";
import JobCard from "./JobCard";
import Sidebar from "./Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Footer from "../pages/footer";
import Cookies from "js-cookie";

interface Job {
  id: string;
  jobId: string;
  companyName: string;
  companyLogoUrl?: string;
  title: string;
  workType?: string;
  employmentType?: string;
  location?: string;
  createdAt?: string;
  minSalary?: number;
  maxSalary?: number;
  minExperience?: number;
  maxExperience?: number;
  noOfOpenings?: number;
  status?: string;
}

interface JobDetailsData {
  id: string;
  title: string;
  company_name: string;
  company_logo_url?: string;
  employment_type?: string;
  work_type?: string;
  min_salary?: string | number;
  max_salary?: string | number;
  salary_mode?: string;
  min_experience?: number | string;
  max_experience?: number | string;
  city?: string;
  location?: string;
  skills?: string | string[];
  created_at?: string;
  description?: string;
  category?: string;
  commission_fee?: number;
  commission_type?: string;
  no_of_openings?: number;
  status?: string;
  hiring_need?: string;
  shift_timings?: string;
  language?: string;
  min_age?: number;
  max_age?: number;
  qualification?: string;
  currency?: string;
  street?: string;
  area?: string;
  pincode?: string;
  keywords?: string;
  location_link?: string;
}

const JobsClient = () => {
  const pathname = usePathname();
  const router = useRouter();

  
  const [searchInput, setSearchInput] = useState(() => {
    const savedQuery = Cookies.get("searchQuery") ;
    if (savedQuery) {
      Cookies.remove("searchQuery"); // Clear after reading
    }
    return savedQuery;
  });

  const [rawJobsData, setRawJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const pageSize = 10;

  // Filter states
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [workType, setWorkType] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState<string[]>([]);

  // Sidebar visibility states for mobile/tablet
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;

  // Calculate pagination values
  const totalPages = Math.ceil(totalJobs / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalJobs);

  // Use refs to store latest filter values
  const filtersRef = useRef({
    companyName,
    location,
    title,
    searchInput,
    currentPage,
    sortBy,
    employmentType,
    workType,
    salaryRange,
    experienceRange,
  });

  // Update refs when state changes
  useEffect(() => {
    filtersRef.current = {
      companyName,
      location,
      title,
      searchInput,
      currentPage,
      sortBy,
      employmentType,
      workType,
      salaryRange,
      experienceRange,
    };
  }, [companyName, location, title, searchInput, currentPage, sortBy, employmentType, workType, salaryRange, experienceRange]);

  console.log("Jobs component mounted, backendUrl:", backendUrl);

  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    try {
      console.log("=== fetchJobs called ===");
      setLoading(true);
      console.log("Fetching jobs...");

      const { companyName, location, title, searchInput, currentPage, employmentType, workType, salaryRange, experienceRange } = filtersRef.current;

      const params = new URLSearchParams();
      if (companyName) params.append("company", companyName);
      if (location) params.append("location", location);
      if (title) params.append("title", title);
      if (searchInput) params.append("search", searchInput);
      if (employmentType.length > 0) {
        const normalizedEmploymentTypes = employmentType.map(type =>
          type === "full-time" ? "full-time" :
            type === "part-time" ? "part-time" :
              type === "internship" ? "internship" :
                type === "contract" ? "contract" :
                  type === "freelance" ? "freelance" : type
        );
        params.append("employmentType", normalizedEmploymentTypes.join(","));
      }
      if (workType.length > 0) params.append("workType", workType.join(","));
      if (salaryRange.length > 0) {
        const normalizedSalaryRanges = salaryRange.map(range => {
          if (range === "10+") return "10+";
          const [min, max] = range.split("-").map(Number);
          return `${min}-${max}`;
        });
        params.append("salaryRange", normalizedSalaryRanges.join(","));
      }
      if (experienceRange.length > 0) {
        params.append("experience", experienceRange.join(","));
      }
      params.append("page", currentPage.toString());
      params.append("pageSize", pageSize.toString());
      params.append("status", "published");

      const url = `${backendUrl}/public/jobs?${params.toString()}`;
      console.log("API URL:", url);

      const response = await fetch(url);
      console.log("Response received:", response);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "success" && data.data?.jobs) {
        const normalizedJobs = data.data.jobs.map((job: Job) => ({
          ...job,
          employmentType: job.employmentType
            ? job.employmentType.toLowerCase().replace(/\s+/g, "-")
            : undefined,
        }));
        console.log("Setting raw jobs data:", normalizedJobs.length, "jobs");
        console.log("Sample job data:", normalizedJobs[0]);
        setRawJobsData(normalizedJobs || []);
        setTotalJobs(data.totalResults || 0);
      } else {
        console.error("Failed to fetch jobs:", data.message || "No jobs data");
        setRawJobsData([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setRawJobsData([]);
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  }, [backendUrl]);

  // Sort jobs based on sortBy value
  const jobsData = useMemo(() => {
    const sortedJobs = [...rawJobsData];

    if (sortBy === "latest") {
      sortedJobs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Descending order (latest first)
      });
    } else if (sortBy === "salary") {
      sortedJobs.sort((a, b) => {
        const salaryA = a.maxSalary ?? a.minSalary ?? 0;
        const salaryB = b.maxSalary ?? b.minSalary ?? 0;
        return salaryB - salaryA; // Descending order (highest salary first)
      });
    } else if (sortBy === "relevance") {
      // Placeholder: sort by title alphabetically
      sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
      // Optional: For enhanced relevance, use a library like fuse.js
      // Example (requires `npm install fuse.js`):
      /*
      if (searchInput) {
        const fuse = new Fuse(sortedJobs, {
          keys: ["title", "companyName", "location"],
          threshold: 0.4,
        });
        const results = fuse.search(searchInput);
        return results.map((result) => result.item);
      }
      */
    }

    return sortedJobs;
  }, [rawJobsData, sortBy, searchInput]);

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
  }, [companyName, location, title, searchInput, employmentType, workType, salaryRange, experienceRange, fetchJobs]);

  // Fetch when page changes
  useEffect(() => {
    fetchJobs();
  }, [currentPage, fetchJobs]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJobClick = async (jobId: string) => {
    const job = jobsData.find((j) => j.jobId === jobId);
    const jobTitle = job?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "job";

    if (job) {
      router.push(`/jobs/${jobTitle}/${jobId}`);
    } else {
      router.push(`/jobs/job/${jobId}`);
    }
  };

  // Toggle sidebar visibility
  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Mobile/Tablet Toggle Buttons */}
        <div className="flex justify-between mb-4 lg:hidden">
          <Button
            variant="outline"
            onClick={toggleFilterSidebar}
            className="flex items-center gap-2 border border-gray-300"
          >
            {isFilterSidebarOpen ? "Hide Filters" : "Apply Filters"}
          </Button>
          <Button
            variant="outline"
            onClick={toggleSidebar}
            className="flex items-center gap-2 border border-gray-300"
          >
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left Sidebar - Filters */}
          <div
            className={`w-full md:w-64 space-y-4 ${isFilterSidebarOpen ? "block" : "hidden md:block"}`}
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
              employmentType={employmentType}
              setEmploymentType={setEmploymentType}
              workType={workType}
              setWorkType={setWorkType}
              salaryRange={salaryRange}
              setSalaryRange={setSalaryRange}
              experienceRange={experienceRange}
              setExperienceRange={setExperienceRange}
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
              <Select value={sortBy} onValueChange={setSortBy}>
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
                      company={job.companyName}
                      logo={job.companyLogoUrl}
                      title={job.title || "Job Title Not Available"}
                      employmentType={job.employmentType || "Full Time"}
                      workType={job.workType}
                      min_salary={job.minSalary ? String(job.minSalary) : undefined}
                      max_salary={job.maxSalary ? String(job.maxSalary) : undefined}
                      min_experience={job.minExperience ? String(job.minExperience) : undefined}
                      max_experience={job.maxExperience ? String(job.maxExperience) : undefined}
                      salary_mode="yearly"
                      location={job.location || "Location Not Specified"}
                      postedTime={job.createdAt || "Not Disclosed"}
                      onJobClick={() => handleJobClick(job.jobId)}
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

          {/* Right Sidebar */}
          <div
            className={`w-full md:w-64 space-y-6 ${isSidebarOpen ? "block" : "hidden md:block"}`}
          >
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobsClient;

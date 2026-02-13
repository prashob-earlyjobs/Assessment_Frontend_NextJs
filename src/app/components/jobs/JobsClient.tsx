"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Header from "../layout/Header";
import FilterSidebar from "./FilterSidebar";
import JobCard from "../v2/jobCard/jobCard";
import { Button } from "../ui/button";
import Footer from "../pages/footer";
import Cookies from "js-cookie";
import NavbarV2 from "../v2/navbar/navbar.v2";
import { EARLYJOBS_ORANGE, BORDER_COLOR, TEXT_PRIMARY, ACCENT_COLOR_LIGHT, ACCENT_COLOR_DARK, TEXT_SECONDARY, PRIMARY_COLOR_LIGHT, PRIMARY_COLOR } from "../../../constants/theme";
import HeaderV2 from "../v2/headerBlack/header.v2";
interface Job {
  id: string;
  jobId: string;
  companyName: string;
  brandName?: string;
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
  const searchParams = useSearchParams();

  
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
  const [category, setCategory] = useState<string[]>(["All Categories"]);
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [workType, setWorkType] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState<string[]>([]);
  const [tpoId, setTpoId] = useState<string | null>(() => searchParams.get("tpoId"));

  // Sidebar visibility states for mobile/tablet
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  
  // State to track if header is scrolled (to show title in navbar)
  const [showTitleInNavbar, setShowTitleInNavbar] = useState(false);

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
    category,
    employmentType,
    workType,
    salaryRange,
    experienceRange,
    tpoId,
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
      category,
      employmentType,
      workType,
      salaryRange,
      experienceRange,
      tpoId,
    };
  }, [companyName, location, title, searchInput, currentPage, sortBy, category, employmentType, workType, salaryRange, experienceRange, tpoId]);

  console.log("Jobs component mounted, backendUrl:", backendUrl);

  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    try {
      console.log("=== fetchJobs called ===");
      setLoading(true);
      console.log("Fetching jobs...");

      const { companyName, location, title, searchInput, currentPage, category, employmentType, workType, salaryRange, experienceRange, tpoId } = filtersRef.current;

      const params = new URLSearchParams();
      if (companyName) params.append("company", companyName);
      if (location) params.append("location", location);
      if (title) params.append("title", title);
      if (searchInput) params.append("search", searchInput);
      if (category.length > 0) {
        params.append("category", category.join(","));
      }
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
      if (tpoId) {
        params.append("tpoId", tpoId);
      }
      params.append("page", currentPage.toString());
      params.append("pageSize", pageSize.toString());
      params.append("status", "published");

      // const url = `${backendUrl}/public/jobs?${params.toString()}`;
       const url =(tpoId && typeof tpoId === 'string') ? `${backendUrl}/public/jobs/tpo?${params.toString()}` : `${backendUrl}/public/jobs?${params.toString()}`;

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

  
  useEffect(() => {
    const keywordFromUrl = searchParams.get("search") || ""; // read 'search' param
    const tpoIdFromUrl = searchParams.get("tpoId");
    const normalizedSearchKeyword = keywordFromUrl
    .replace(/dot/g, ".")      // "dot" → "."
    .replace(/-/g, " ");
    
    if (normalizedSearchKeyword) {
      setSearchInput(normalizedSearchKeyword);
    }
    setTpoId(tpoIdFromUrl);
  }, [searchParams]);


  useEffect(() => {
    if (!searchInput) return; // skip if empty

    const slug = searchInput
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\./g, "dot");

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", slug);
    router.replace(`?${params.toString()}`); // replace to avoid adding history entries
  }, [searchInput]);
  // Call fetchJobs on component mount
  const initialFetchRef = useRef(false);
  useEffect(() => {
    if (initialFetchRef.current) return;
    initialFetchRef.current = true;
    console.log("=== Component mounted, calling fetchJobs... ===");
    fetchJobs();
  }, [fetchJobs]);

  // Debounced search effect
  const skipFirstFiltersRef = useRef(true);
  useEffect(() => {
    if (skipFirstFiltersRef.current) {
      skipFirstFiltersRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchJobs();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [companyName, location, title, searchInput, category, employmentType, workType, salaryRange, experienceRange, fetchJobs]);

  
  // Fetch when page changes
  const skipFirstPageRef = useRef(true);
  useEffect(() => {
    if (skipFirstPageRef.current) {
      skipFirstPageRef.current = false;
      return;
    }
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
    const location = job?.location?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "location";

    const experienceMin = job?.minExperience != null ? String(job.minExperience) : undefined;
    const experienceMax = job?.maxExperience != null ? String(job.maxExperience) : undefined;
    let experience = undefined;

    if(experienceMin && experienceMax) {
      experience = `${experienceMin}-to-${experienceMax}-years`;
    } else if(experienceMin) {
      experience = `${experienceMin}-years`;
    } else if(experienceMax) {
      experience = `${experienceMax}-years`;
    }
    const expPart = experience ? `-${experience}` : "";
    if (tpoId) {
      router.push(job ? `/jobs/${jobTitle}-${location}${expPart}/${jobId}?tpoId=${tpoId}&source=campus-drive` : `/jobs/job/${jobTitle}-${location}${expPart}/${jobId}?tpoId=${tpoId}&source=campus-drive`);
    }
    else {
      router.push(job ? `/jobs/${jobTitle}-${location}${expPart}/${jobId}` : `/jobs/job/${jobTitle}-${location}${expPart}/${jobId}`);
    }

  };

  // Toggle sidebar visibility
  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavbarV2 pageTitle="Jobs" showPageTitle={showTitleInNavbar} />  
      <HeaderV2 title="Jobs" onScrollStateChange={(isScrolled) => setShowTitleInNavbar(isScrolled)} />

      <div className="max-w-7xl mx-auto sm:p-6 bg-white">
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
              category={category}
              setCategory={setCategory}
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
            {/* Job Cards */}
            <div className="space-y-4">
              {loading ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200/50 bg-white p-6 shadow-sm"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Posted Time Pill Skeleton */}
                      <div className="mb-4">
                        <div className="h-5 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full bg-[length:200%_100%] animate-shimmer"></div>
                      </div>

                      {/* Top Section Skeleton */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Logo Skeleton */}
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer"></div>
                          <div className="flex-1 space-y-2">
                            {/* Title Skeleton */}
                            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 bg-[length:200%_100%] animate-shimmer"></div>
                            {/* Company Skeleton */}
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 bg-[length:200%_100%] animate-shimmer"></div>
                          </div>
                        </div>
                        {/* Bookmark Skeleton */}
                        <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer"></div>
                      </div>

                      {/* Job Details Skeleton */}
                      <div className="space-y-3">
                        {/* Icons and Text Row */}
                        <div className="flex flex-wrap gap-4">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer"></div>
                              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer"></div>
                            </div>
                          ))}
                        </div>
                        {/* Badges Skeleton */}
                        <div className="flex gap-2">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full bg-[length:200%_100%] animate-shimmer"></div>
                          ))}
                        </div>
                      </div>
                </div>
                  ))}
                </>
              ) : jobsData.length > 0 ? (
                <>
                  {jobsData.map((job, index) => (
                    <div
                      key={job.id}
                      className="animate-fade-in-up"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <JobCard
                      company={job.companyName}
                      brandName={job.brandName}
                      logo={job.companyLogoUrl}
                      title={job.title || "Job Title Not Available"}
                      employmentType={job.employmentType || "Full Time"}
                      workType={job.workType}
                      noOfOpenings={job.noOfOpenings || 0}
                      min_salary={job.minSalary ? String(job.minSalary) : undefined}
                      max_salary={job.maxSalary ? String(job.maxSalary) : undefined}
                      min_experience={job.minExperience != null ? String(job.minExperience) : undefined}
                      max_experience={job.maxExperience != null ? String(job.maxExperience) : undefined}
                      salary_mode="yearly"
                      location={job.location || "Location Not Specified"}
                      postedTime={job.createdAt || "Not Disclosed"}
                      onJobClick={() => handleJobClick(job.jobId)}
                    />
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 border-2 font-medium"
                        style={{
                          borderColor: BORDER_COLOR,
                          color: TEXT_PRIMARY,
                        }}
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
                              className={`w-8 h-8 p-0 font-medium ${
                                currentPage === pageNum 
                                  ? "text-white border-2" 
                                  : "border-2 text-gray-700 hover:bg-gray-50"
                              }`}
                              style={currentPage === pageNum ? {
                                backgroundColor: EARLYJOBS_ORANGE,
                                borderColor: EARLYJOBS_ORANGE,
                              } : {
                                borderColor: BORDER_COLOR,
                                color: TEXT_PRIMARY,
                              }}
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
                        className="flex items-center gap-1 border-2 font-medium"
                        style={{
                          borderColor: BORDER_COLOR,
                          color: TEXT_PRIMARY,
                        }}
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
        </div>
      </div>

      {/* Top Company Section */}
      <div 
        className="w-full py-12 md:py-16" 
        style={{ 
          backgroundColor: `rgba(240, 133, 4, 0.05)` // PRIMARY_COLOR with 5% opacity
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: TEXT_PRIMARY }}>
              Top Company
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: TEXT_SECONDARY }}>
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum
            </p>
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Company Card 1 - Instagram */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                
                {/* Company Name */}
                <h3 className="text-lg font-bold mb-3" style={{ color: TEXT_PRIMARY }}>
                  Instagram
                </h3>
                
                {/* Description */}
                <p className="text-sm mb-4" style={{ color: TEXT_SECONDARY }}>
                  Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat
                </p>
                
                {/* Open Jobs Button */}
                <button 
                  className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                  style={{ 
                    backgroundColor: PRIMARY_COLOR_LIGHT,
                    color: PRIMARY_COLOR
                  }}
                >
                  8 open jobs
                </button>
              </div>
            </div>

            {/* Company Card 2 - Tesla */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white font-bold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 5.173l-7.173 7.173H12V24h4.173V12.346h7.173L12 5.173z"/>
                  </svg>
                </div>
                
                {/* Company Name */}
                <h3 className="text-lg font-bold mb-3" style={{ color: TEXT_PRIMARY }}>
                  Tesla
                </h3>
                
                {/* Description */}
                <p className="text-sm mb-4" style={{ color: TEXT_SECONDARY }}>
                  At pellentesque amet odio cras imperdiet nisl. Ac magna aliquet massa leo
                </p>
                
                {/* Open Jobs Button */}
                <button 
                  className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                  style={{ 
                    backgroundColor: PRIMARY_COLOR_LIGHT,
                    color: PRIMARY_COLOR
                  }}
                >
                  18 open jobs
                </button>
              </div>
            </div>

            {/* Company Card 3 - McDonald's */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-3xl font-bold">M</span>
                </div>
                
                {/* Company Name */}
                <h3 className="text-lg font-bold mb-3" style={{ color: TEXT_PRIMARY }}>
                  McDonald's
                </h3>
                
                {/* Description */}
                <p className="text-sm mb-4" style={{ color: TEXT_SECONDARY }}>
                  Odio aliquet tellus tellus maecenas. Faucibus in viverra venenatis phasellus
                </p>
                
                {/* Open Jobs Button */}
                <button 
                  className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                  style={{ 
                    backgroundColor: PRIMARY_COLOR_LIGHT,
                    color: PRIMARY_COLOR
                  }}
                >
                  12 open jobs
                </button>
              </div>
            </div>

            {/* Company Card 4 - Apple */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </div>
                
                {/* Company Name */}
                <h3 className="text-lg font-bold mb-3" style={{ color: TEXT_PRIMARY }}>
                  Apple
                </h3>
                
                {/* Description */}
                <p className="text-sm mb-4" style={{ color: TEXT_SECONDARY }}>
                  Et odio sem tellus ultrices posuere consequat. Tristique nascetur sapien
                </p>
                
                {/* Open Jobs Button */}
                <button 
                  className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                  style={{ 
                    backgroundColor: PRIMARY_COLOR_LIGHT,
                    color: PRIMARY_COLOR
                  }}
                >
                  9 open jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Footer />
    </div>
  );
};

export default JobsClient;
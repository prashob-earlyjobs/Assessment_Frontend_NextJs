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
import { useUser } from "@/app/context";
import { Search, Briefcase } from "lucide-react";
interface Job {
  id: string;
  jobId: string;
  companyName: string;
  savedJob?: boolean;
  brandName?: string;
  companyLogoUrl?: string;
  title: string;
  workType?: string;
  employmentType?: string;
  location?: string;
  createdAt?: string;
  minSalary?: number;
  maxSalary?: number;
  paymentFrequency?: string;
  payment_frequency?: string;
  salaryMode?: string;
  salary_mode?: string;
  minExperience?: number;
  maxExperience?: number;
  noOfOpenings?: number;
  status?: string;
  type?: string;
  isSubJob?: boolean;
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
  const { userCredentials } = useUser();


  const [searchInput, setSearchInput] = useState(() => {
    const savedQuery = Cookies.get("searchQuery");
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
  const [suggestedJobs, setSuggestedJobs] = useState<Job[]>([]);
  const [suggestedLoading, setSuggestedLoading] = useState(false);

  const getSalaryMode = (job: Job): "monthly" | "yearly" => {
    const rawMode =
      job.paymentFrequency ??
      job.payment_frequency ??
      job.salaryMode ??
      job.salary_mode;
    return String(rawMode || "").toLowerCase() === "monthly" ? "monthly" : "yearly";
  };

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

  // When no jobs found, fetch recent jobs from dashboard to suggest
  useEffect(() => {
    if (loading || rawJobsData.length > 0) {
      setSuggestedJobs([]);
      return;
    }
    let cancelled = false;
    setSuggestedLoading(true);
    fetch(`${backendUrl}/dashboard`, { cache: "no-store" })
      .then((res) => res.json())
      .then((result: { data?: { recentJobs?: Job[] } }) => {
        if (cancelled) return;
        const list = result?.data?.recentJobs;
        if (Array.isArray(list) && list.length > 0) {
          const normalized = list.slice(0, 6).map((job: Job) => ({
            ...job,
            paymentFrequency:
              job.paymentFrequency ??
              job.payment_frequency ??
              job.salaryMode ??
              job.salary_mode,
            employmentType: job.employmentType
              ? job.employmentType.toLowerCase().replace(/\s+/g, "-")
              : undefined,
          }));
          setSuggestedJobs(normalized);
        } else {
          setSuggestedJobs([]);
        }
      })
      .catch(() => {
        if (!cancelled) setSuggestedJobs([]);
      })
      .finally(() => {
        if (!cancelled) setSuggestedLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [loading, rawJobsData.length, backendUrl]);

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
      const userEmail = userCredentials?.email;
      if (userEmail) {
        params.append("userEmail", userEmail);
      }
      if (tpoId) {
        params.append("tpoId", tpoId);
      }
      params.append("page", currentPage.toString());
      params.append("pageSize", pageSize.toString());
      params.append("status", "published");

      // const url = `${backendUrl}/public/jobs?${params.toString()}`;
      const url = (tpoId && typeof tpoId === 'string') ? `${backendUrl}/public/jobs/tpo?${params.toString()}` : `${backendUrl}/public/jobs?${params.toString()}`;

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
          paymentFrequency:
            job.paymentFrequency ??
            job.payment_frequency ??
            job.salaryMode ??
            job.salary_mode,
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
  }, [backendUrl, userCredentials]);

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
    const keywordFromUrl = searchParams.get("search") || ""; // read 'search' param (hero job title)
    const tpoIdFromUrl = searchParams.get("tpoId");
    const categoryFromUrl = searchParams.get("category");
    const locationFromUrl = searchParams.get("location");
    const normalizedSearchKeyword = keywordFromUrl
      .replace(/dot/g, ".")      // "dot" → "."
      .replace(/-/g, " ");

    if (normalizedSearchKeyword) {
      setSearchInput(normalizedSearchKeyword);
    }
    setTpoId(tpoIdFromUrl);
    // Apply category from URL (e.g. from Browse Category or hero)
    if (categoryFromUrl) {
      const decodedCategory = decodeURIComponent(categoryFromUrl.trim());
      if (decodedCategory && decodedCategory !== "All Categories") {
        setCategory([decodedCategory]);
      }
    }
    // Apply location from URL (e.g. from hero search)
    if (locationFromUrl) {
      setLocation(decodeURIComponent(locationFromUrl.trim()));
    }
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

  const handleJobClick = async (jobId: string, jobOverride?: Job) => {
    const job = jobOverride ?? jobsData.find((j) => j.jobId === jobId);
    const jobTitle = job?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "job";
    const location = job?.location?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "location";

    const experienceMin = job?.minExperience != null ? String(job.minExperience) : undefined;
    const experienceMax = job?.maxExperience != null ? String(job.maxExperience) : undefined;
    let experience = undefined;

    if (experienceMin && experienceMax) {
      experience = `${experienceMin}-to-${experienceMax}-years`;
    } else if (experienceMin) {
      experience = `${experienceMin}-years`;
    } else if (experienceMax) {
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
                        jobId={job.jobId || job.id}
                        savedJob={job.savedJob}
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
                        salary_mode={getSalaryMode(job)}
                        location={job.location || "Location Not Specified"}
                        postedTime={job.createdAt || "Not Disclosed"}
                        isSubJob={job.type === "sub" || job.isSubJob === true}
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
                              className={`w-8 h-8 p-0 font-medium ${currentPage === pageNum
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
                <div className="py-10 px-4 sm:px-6">
                  <div className="max-w-md mx-auto text-center rounded-xl border border-gray-200/60 bg-gray-50/80 py-6 px-5 sm:py-8 sm:px-6">
                    <div
                      className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                    >
                      <Search className="w-6 h-6" style={{ color: EARLYJOBS_ORANGE }} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1.5">No matching jobs right now</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We couldn’t find any jobs matching your criteria. Try broadening your search or filters—or check out some recent openings below.
                    </p>
                  </div>
                  {suggestedLoading ? (
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      <span className="text-sm">Loading suggestions…</span>
                    </div>
                  ) : suggestedJobs.length > 0 ? (
                    <div className="mt-10 text-left">
                      <div className="flex items-center gap-2 mb-5">
                        <Briefcase className="w-5 h-5 text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-900">Suggested for you</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-5">Recent openings you might like</p>
                      <div className="space-y-4">
                        {suggestedJobs.map((job) => (
                          <div key={job.id || job.jobId} className="animate-fade-in-up">
                            <JobCard
                              jobId={job.jobId || job.id}
                              savedJob={job.savedJob}
                              company={job.companyName}
                              brandName={job.brandName}
                              logo={job.companyLogoUrl}
                              title={job.title || "Job Title Not Available"}
                              employmentType={job.employmentType || "Full Time"}
                              workType={job.workType}
                              noOfOpenings={job.noOfOpenings || 0}
                              min_salary={job.minSalary != null ? String(job.minSalary) : undefined}
                              max_salary={job.maxSalary != null ? String(job.maxSalary) : undefined}
                              min_experience={job.minExperience != null ? String(job.minExperience) : undefined}
                              max_experience={job.maxExperience != null ? String(job.maxExperience) : undefined}
                              salary_mode={getSalaryMode(job)}
                              location={job.location || "Location Not Specified"}
                              postedTime={job.createdAt || "Not Disclosed"}
                              isSubJob={job.type === "sub" || job.isSubJob === true}
                              onJobClick={() => handleJobClick(job.jobId, job)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobsClient;
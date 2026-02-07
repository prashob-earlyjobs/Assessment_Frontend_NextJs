"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Menu, X, ChevronLeft, ChevronRight, Search, Filter, Star, Award, Briefcase, MapPin, TrendingUp } from "lucide-react";
import Footer from "./footer";
import Navbar from "./navbar";

export default function BrowseCandidatesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const router = useRouter();

  // Debounce search input before calling API (prevents request on every keystroke)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
        });
        
        // Add scoreFilter if it's selected and not "all"
        if (scoreFilter && scoreFilter !== "all") {
          params.append("scoreFilter", scoreFilter);
        }

        // Server-side search
        if (debouncedSearchTerm) {
          // Note: different endpoints in this codebase use different keys; send both.
          params.append("search", debouncedSearchTerm);
        }

        // Use fetch (not axios) for public endpoint - avoids auth interceptor redirect to login
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const url = `${baseUrl}/browseCandidates/candidates?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch candidates (Status: ${res.status})`);
        }
        const json = await res.json();

        // Handle multiple possible response shapes safely
        const responseData = json?.data ?? json;
        const list =
          responseData?.completedInterviews ||
          responseData?.candidates ||
          responseData?.interviews ||
          responseData ||
          [];

        const arr = Array.isArray(list) ? list : [];
        const processedCandidates = arr.map((candidate) => ({
          ...candidate,
          firstAssessmentTitle: candidate?.interviewTitle || candidate?.firstAssessmentTitle || "Assessment",
          // Ensure we always have an id to navigate with (this page expects interview id)
          _id: candidate?._id || candidate?.interviewId || candidate?.id,
        }));

        setCandidates(processedCandidates);

        const total =
          responseData?.total ??
          responseData?.totalCount ??
          responseData?.totalCandidates ??
          processedCandidates.length;
        setTotalCandidates(Number(total) || 0);
        setTotalPages(Math.max(1, Math.ceil((Number(total) || 0) / itemsPerPage)));

          // Set pagination from API response
        //   const apiTotal = data.total || data.totalCount || data.totalCandidates || processedCandidates.length;
        //   setTotalCandidates(apiTotal);
        //   setTotalPages(Math.ceil(apiTotal / itemsPerPage));
        // } else {
        //   setCandidates([]);
        //   setTotalCandidates(0);
        //   setTotalPages(1);
        // }
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to load candidates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

 
    fetchCandidates();
  }, [currentPage, itemsPerPage, scoreFilter, debouncedSearchTerm]);

  // Reset to page 1 when search term or score filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, scoreFilter]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMobileMenuItemClick = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2) || "NA";
  };

  const calculateExperience = (candidate) => {
    if (candidate?.experience?.length > 0) {
      const totalExperience = candidate.experience.reduce((acc, exp) => {
        const from = new Date(exp.from);
        const to = exp.to ? new Date(exp.to) : new Date();
        const years = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 365);
        return acc + Math.round(years);
      }, 0);
      return `${totalExperience} years`;
    }
    const accountAge = new Date().getFullYear() - new Date(candidate?.createdAt).getFullYear();
    return `${Math.max(1, accountAge)} years`;
  };

  const getSkillsDisplay = (candidate) => {

    if (candidate?.skills?.length > 0) {  
      return candidate.skills.slice(0, 4).map((skill) => skill.name );
    }
    return ["Professional", "Reliable", "Dedicated"];
  };

  const getCommitmentBadges = (candidate) => {
    const workMode = candidate?.profile?.professionalInformation?.workMode || "Full Time";
    const badges = [workMode];
    if (workMode !== "Contract") {
      badges.push("Contract");
    }
    return badges;
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const generateAssessmentSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const formatName = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleViewProfile = (candidate) => {
    const candidateId = candidate?._id || candidate?.interviewId || candidate?.id;
    if (!candidateId) {
      toast.error("Unable to open profile: interview id missing");
      console.error("Missing candidate/interview id:", candidate);
      return;
    }

    const rawName =
      candidate?.name ||
      candidate?.candidate?.firstName ||
      candidate?.candidate?.lastName ||
      "candidate";
    const nameSlug = generateSlug(String(rawName));
    const rawTitle =
      candidate?.firstAssessmentTitle ||
      candidate?.firstAssessmentRole ||
      candidate?.interviewTitle ||
      "assessment";
    const assessmentSlug = generateAssessmentSlug(String(rawTitle));

    const path = `/browse-interviewed-candidates/${nameSlug}-${assessmentSlug}/${candidateId}`;
    console.log("Navigating to candidate profile:", path, { candidate });
    router.push(path);
  };

  // Results are now filtered server-side using the `search` query param
  const filteredCandidates = useMemo(() => candidates, [candidates]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate display values
  const displayTotal = useMemo(() => {
    return totalCandidates;
  }, [totalCandidates]);

  const actualTotalPages = useMemo(() => {
    return totalPages;
  }, [totalPages]);

  return (
    <>
      <Navbar />
      <header className="bg-white shadow-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                onClick={() => router.push("/")}
                alt="EarlyJobs.ai"
                className="h-12 lg:h-14 cursor-pointer"
              />
            </div>
            <nav className="hidden md:flex space-x-8 items-center"></nav>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-orange-600 focus:outline-none p-3"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/browse-interviewed-candidates")}
                >
                  Browse Candidates
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/college-partnerships")}
                >
                  Colleges
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/recruiter")}
                >
                  Recruiter
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/talent-pool")}
                >
                  Talent Pool
                </Button>
              </div>
            </div>
          )}
        </div>
      </header> 
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
        {/* Enhanced Header Section */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="flex flex-col space-y-6">
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-1 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
                      Discover Top Talent
                    </h1>
                    <p className="text-base lg:text-lg text-gray-600 mt-2 font-medium">
                      Connect with{" "}
                      {/* <span className="text-orange-600 font-semibold">{totalCandidates}+</span>{" "} */}
                      pre-assessed professionals ready to join your team
                    </p>
                  </div>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search by skills, technologies, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white placeholder-gray-500 text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
                    aria-label="Search candidates by skills"
                  />
                </div>

                {/* Score Filter */}
                <div className="w-full lg:w-64 relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                  <Select value={scoreFilter} onValueChange={setScoreFilter}>
                    <SelectTrigger className="w-full h-[56px] pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-gray-300 transition-all font-medium">
                      <SelectValue placeholder="Filter by Score Range" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-gray-100 shadow-xl">
                      <SelectItem value="all" className="font-medium">
                        <span className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-gray-400" />
                          All Scores
                        </span>
                      </SelectItem>
                      <SelectItem value="7+" className="font-medium">
                        <span className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-orange-600" />
                          Score: 7+
                        </span>
                      </SelectItem>

                      <SelectItem value="4-6" className="font-medium">
                        <span className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-orange-500" />
                          Score: 4-6
                        </span>
                      </SelectItem>
                      
                      <SelectItem value="1-3" className="font-medium">
                        <span className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-orange-400" />
                          Score: 1-3
                        </span>
                      </SelectItem>
                
                      
                    </SelectContent>
                  </Select>
                </div>
              </div>

           
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border-2 border-gray-100 shadow-sm overflow-hidden"
                >
                  <div className="animate-pulse">
                    {/* Card Header Skeleton */}
                    <div className="p-6 pb-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300"></div>
                          <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded-lg w-2/3"></div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body Skeleton */}
                    <div className="p-6 space-y-5">
                      {/* Bio Skeleton */}
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded-lg w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-lg w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded-lg w-4/6"></div>
                      </div>

                      {/* Skills Skeleton */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-8 bg-gray-300 rounded-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                          <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
                          <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                          <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                        </div>
                      </div>

                      {/* Availability Skeleton
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-8 bg-gray-300 rounded-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                          <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                        </div>
                      </div> */}
                    </div>

                    {/* Card Footer Skeleton */}
                    <div className="p-6 pt-0">
                      <div className="h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-8">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                  <X className="h-16 w-16 text-red-500" />
                </div>
                <div className="absolute -bottom-2 -right-2 h-12 w-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white font-bold text-lg">!</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something Went Wrong</h3>
              <p className="text-gray-600 text-center max-w-md mb-2">
                We encountered an error while loading candidates.
              </p>
              <p className="text-sm text-red-600 font-medium mb-6 text-center max-w-md">
                {error}
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.location.reload()}
                >
                  <ChevronRight className="h-5 w-5 mr-2 rotate-180" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 px-8 py-3 rounded-xl font-bold transition-all"
                  onClick={() => router.push("/")}
                >
                  Go Home
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, candidateIndex) => (
                  <div
                    key={candidate._id || candidate.id || `candidate-${candidateIndex}-${candidate.name || 'unknown'}`}
                    className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Card Header with Avatar and Name */}
                    <div className="relative p-6 pb-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-2xl shadow-md ring-4 ring-white group-hover:ring-gray-100 transition-all border border-gray-200">
                            {candidate.avatar ? (
                              <img
                                src={candidate.avatar}
                                alt={formatName(candidate.name)}
                                className="h-full w-full rounded-2xl object-cover"
                              />
                            ) : (
                              getInitials(candidate.name)
                            )}
                          </div>
                          {/* Verified Badge */}
                          <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                            <Award className="h-3.5 w-3.5 text-white" />
                          </div>
                        </div>

                        {/* Name and Basic Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <h2 className="font-bold text-xl text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                              {formatName(candidate.name)}
                            </h2>
                            {/* Compact Score Badge */}
                            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1 shadow-sm flex-shrink-0">
                              <Star className="h-3 w-3 text-orange-500 fill-orange-500" />
                              <span className="text-xs font-bold text-gray-900">{candidate.score??0}.0</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Briefcase className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">{calculateExperience(candidate)}</span>
                          </div>
                          {candidate.profile?.location && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="truncate">{candidate.profile.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-5">
                      {/* Bio */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
                        {candidate.profile?.bio
                          ? candidate.profile.bio
                          : `${candidate.role?.charAt(0).toUpperCase() + candidate.role?.slice(1)} with experience in various projects and technologies. Ready to contribute and grow with your team.`}
                      </p>

                      {/* Skills Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Skills</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {getSkillsDisplay(candidate).map((interviewSkills, skillIndex) => {
                            // Create a unique key by combining candidate ID, candidate index, skill index, and skill
                            // Handle cases where _id might be missing or skills might be duplicated
                            const candidateId = candidate._id || candidate.id || `candidate-${candidateIndex}`;
                            const skillKey = `${candidateId}-c${candidateIndex}-skill-${skillIndex}-${String(interviewSkills).replace(/\s+/g, '-')}`;
                            
                            return (
                              <span
                                key={skillKey}
                                className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 text-orange-800 border border-orange-200/50 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hover:scale-105 shadow-sm"
                              >
                                {interviewSkills}
                              </span>
                            );
                          })}
                          {candidate.profile?.skills?.length > 4 && (
                            <span className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all">
                              +{candidate.profile.skills.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Commitment Badges */}
                      {/* <div className="space-y-3"> */}
                        {/* <div className="flex items-center gap-2">
                          <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Availability</h4>
                        </div> */}
                        {/* <div className="flex flex-wrap gap-2">
                          {getCommitmentBadges(candidate).map((commitment, index) => (
                            <span
                              key={index}
                              className={
                                index === 0
                                  ? "inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all"
                                  : "inline-flex items-center gap-1.5 border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                              }
                            >
                              {commitment}
                            </span>
                          ))}
                        </div> */}
                      {/* </div> */}
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 pt-0">
                      <Button
                        onClick={() => handleViewProfile(candidate)}
                        className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] relative overflow-hidden hover:opacity-90"
                        style={{ backgroundColor: '#f1674a' }}
                        aria-label={`View profile of ${formatName(candidate.name)}`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          View Full Profile
                          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6">
                      <Search className="h-16 w-16 text-orange-400" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <X className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Candidates Found</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    We couldn't find any candidates matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setScoreFilter("");
                    }}
                    className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Pagination Controls */}
          {actualTotalPages > 1 && (
            <div className="mt-12 mb-8">
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Page Info */}
                  <div className="text-sm font-medium text-gray-600">
                    Showing{" "}
                    <span className="text-orange-600 font-bold">
                      {((currentPage - 1) * itemsPerPage) + 1}
                    </span>
                    {" "}-{" "}
                    <span className="text-orange-600 font-bold">
                      {Math.min(currentPage * itemsPerPage, displayTotal)}
                    </span>
                    {" "}of{" "}
                    <span className="text-orange-600 font-bold">{displayTotal}</span>
                    {" "}candidates
                  </div>

                  {/* Pagination Buttons */}
                  <div className="flex items-center gap-2">
                    {/* First Page Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1 || loading}
                      className="h-10 px-3 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg font-semibold transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <ChevronLeft className="w-4 h-4 -ml-2" />
                    </Button>

                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                      className="h-10 px-4 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg font-semibold transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>

                    {/* Page Number Buttons */}
                    <div className="hidden sm:flex items-center gap-2">
                      {Array.from({ length: Math.min(5, actualTotalPages) }, (_, i) => {
                        let pageNum;
                        if (actualTotalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= actualTotalPages - 2) {
                          pageNum = actualTotalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            disabled={loading}
                            className={`h-10 min-w-[40px] rounded-lg font-bold transition-all ${
                              currentPage === pageNum
                                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg border-0"
                                : "bg-white border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    {/* Current Page Indicator (Mobile) */}
                    <div className="sm:hidden px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold">
                      {currentPage} / {actualTotalPages}
                    </div>

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === actualTotalPages || loading}
                      className="h-10 px-4 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg font-semibold transition-all"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>

                    {/* Last Page Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(actualTotalPages)}
                      disabled={currentPage === actualTotalPages || loading}
                      className="h-10 px-3 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg font-semibold transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <ChevronRight className="w-4 h-4 -ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
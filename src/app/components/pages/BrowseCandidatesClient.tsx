"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Menu, X } from "lucide-react";
import Footer from "./footer";
import Navbar from "./navbar";

export default function BrowseCandidatesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/candidates`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to fetch candidates (Status: ${response.status})`);
        }
        const data = await response.json();
        if (data.success) {
          const filteredCandidates = [];
          for (const candidate of data.data) {
            if (candidate.assessmentsPaid && candidate.assessmentsPaid.length > 0) {
              let hasValidResults = false;
              let firstAssessmentTitle = "unknown-assessment"; // Default fallback title

              // Fetch assessment titles for the candidate
              try {
                const titleUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/assessments/${candidate._id}`;
                const titleResponse = await fetch(titleUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (titleResponse.ok) {
                  const titleData = await titleResponse.json();
                  const titles = titleData.data.reduce((acc, assessment) => {
                    acc[assessment._id] = assessment.title;
                    return acc;
                  }, {});
                  // Get the title of the first assessment from assessmentsPaid
                  if (candidate.assessmentsPaid[0]?.assessmentId) {
                    firstAssessmentTitle = titles[candidate.assessmentsPaid[0].assessmentId] || "unknown-assessment";
                  }
                }
              } catch (err) {
                console.warn(`Error fetching assessment titles for candidate ${candidate._id}: ${err.message}`);
              }

              for (const assessment of candidate.assessmentsPaid) {
                const interviewId = assessment.interviewId;
                if (!interviewId) continue;

                try {
                  const resultUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getResultForCandidateAssessment/${interviewId}`;
                  const resultResponse = await fetch(resultUrl, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  if (resultResponse.ok) {
                    const resultText = await resultResponse.text();
                    const resultData = resultText ? JSON.parse(resultText) : {};
                    if (resultData.success && resultData.data?.report?.reportSkills) {
                      hasValidResults = true;
                      break;
                    }
                  }
                } catch (err) {
                  console.warn(`Error fetching results for candidate ${candidate._id}, interview ${interviewId}: ${err.message}`);
                }
              }
              if (hasValidResults) {
                filteredCandidates.push({ ...candidate, firstAssessmentTitle });
              }
            }
          }
          setCandidates(filteredCandidates);
        } else {
          throw new Error(data.message || "Error fetching candidates");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to load candidates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

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
    if (candidate?.profile?.skills?.length > 0) {
      return candidate.profile.skills.slice(0, 4);
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

  const handleViewProfile = (candidate) => {
    const nameSlug = generateSlug(candidate.name);
    const assessmentSlug = generateAssessmentSlug(candidate.firstAssessmentTitle);
    console.log("Navigating to candidate profile:", `/browse-interviewed-candidates/${nameSlug}/${assessmentSlug}/${candidate._id}`);
    router.push(`/browse-interviewed-candidates/${nameSlug}-${assessmentSlug}/${candidate._id}`);
  };

  const filteredCandidates = useMemo(() => {
    if (!searchTerm.trim()) return candidates;
    return candidates.filter((candidate) =>
      candidate?.profile?.skills?.some((skill) =>
        skill?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [candidates, searchTerm]);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Candidate Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Discover talented professionals ready to join your team
              </p>
            </div>
            <div className="w-full lg:w-96">
              <input
                type="text"
                placeholder="Search by skills (e.g., Sales, Management, React, Data Science...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                aria-label="Search candidates by skills"
              />
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border-0 bg-white shadow-lg overflow-hidden"
                >
                  <div className="p-6 flex flex-col h-full animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="flex flex-wrap gap-2">
                          <div className="h-6 bg-gray-200 rounded w-16"></div>
                          <div className="h-6 bg-gray-200 rounded w-20"></div>
                          <div className="h-6 bg-gray-200 rounded w-14"></div>
                          <div className="h-6 bg-gray-200 rounded w-18"></div>
                        </div>
                      </div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="flex flex-wrap gap-2">
                          <div className="h-7 bg-gray-200 rounded w-20"></div>
                          <div className="h-7 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-11 bg-gray-200 rounded-lg mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">Error: {error}</p>
              <Button
                className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    className="group relative overflow-hidden rounded-2xl border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-orange-100">
                            {candidate.avatar ? (
                              <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              getInitials(candidate.name)
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="font-bold text-lg text-gray-900 truncate">
                              {candidate.name}
                            </h2>
                            <span className="text-gray-500 text-sm font-medium">
                              | Exp: {calculateExperience(candidate)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                            {candidate.profile?.bio
                              ? candidate.profile.bio.substring(0, 120) +
                                (candidate.profile.bio.length > 120 ? "..." : "")
                              : `${candidate.role?.charAt(0).toUpperCase() + candidate.role?.slice(1)} with experience in various projects and technologies.`}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">Expert in</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {getSkillsDisplay(candidate).map((skill, index) => (
                              <span
                                key={index}
                                className="bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-200 text-xs px-2.5 py-1 rounded-md font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.profile?.skills?.length > 4 && (
                              <span className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium">
                                +{candidate.profile.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">Commitment</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {getCommitmentBadges(candidate).map((commitment, index) => (
                              <span
                                key={index}
                                className={
                                  index === 0
                                    ? "bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                                    : "border border-orange-200 text-orange-700 hover:bg-orange-50 px-3 py-1 rounded-md text-sm font-medium"
                                }
                              >
                                {commitment}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleViewProfile(candidate)}
                        className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        aria-label={`View profile of ${candidate.name}`}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-full py-12">
                  <p className="text-lg text-gray-600">No candidates match your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
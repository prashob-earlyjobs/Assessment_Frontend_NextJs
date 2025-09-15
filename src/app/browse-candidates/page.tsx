"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "../context";
import { toast } from "sonner";
import { userLogout } from "../components/services/servicesapis";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import Footer from "../components/pages/footer";
import Navbar from "../components/pages/navbar";
import InterestedCandidateForm from "../components/InterestedCandidateForm";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [recording, setRecording] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInterestDialogOpen, setIsInterestDialogOpen] = useState(false);
  const router = useRouter();
  const { userCredentials, setUserCredentials } = useUser();

  useEffect(() => {
    console.log('userCredentials:', userCredentials);
  }, [userCredentials]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/candidates`;
        console.log('Fetching candidates from:', url);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log('Candidates response status:', response.status);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Candidates error response:', errorData);
          throw new Error(errorData.message || `Failed to fetch candidates (Status: ${response.status})`);
        }
        const data = await response.json();
        console.log('Candidates data:', data);
        if (data.success) {
          setCandidates(data.data);
        } else {
          throw new Error(data.message || "Error fetching candidates");
        }
      } catch (err) {
        setError(err.message);
        console.error('Fetch candidates error:', err);
        toast.error(err.message || "Failed to load candidates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchCandidateData = async () => {
      if (selectedCandidate) {
        console.log('Selected candidate:', selectedCandidate);
        console.log('Selected candidate assessmentsPaid:', selectedCandidate.assessmentsPaid);
        try {
          setAssessmentResults([]);
          setRecording([]);
          setTranscript([]);
          setError(null);
          setLoading(true);

          if (!selectedCandidate.assessmentsPaid || selectedCandidate.assessmentsPaid.length === 0) {
            throw new Error("No assessments available for this candidate");
          }

          const results = [];
          const recordings = [];
          const transcripts = [];

          for (const assessment of selectedCandidate.assessmentsPaid) {
            const interviewId = assessment.interviewId;
            if (!interviewId) {
              console.warn(`No interviewId for assessment ${assessment._id}`);
              continue;
            }

            try {
              const resultUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getResultForCandidateAssessment/${interviewId}`;
              console.log('Fetching results from:', resultUrl);
              const resultResponse = await fetch(resultUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log('Results response status:', resultResponse.status);
              if (!resultResponse.ok) {
                const errorData = await resultResponse.json().catch(() => ({}));
                console.error('Results error response:', errorData);
                throw new Error(errorData.message || `Failed to fetch assessment results for interview ${interviewId} (Status: ${resultResponse.status})`);
              }
              const resultText = await resultResponse.text();
              const resultData = resultText ? JSON.parse(resultText) : {};
              console.log('Results data:', resultData);
              if (resultData.success && resultData.data?.report?.reportSkills) {
                results.push({
                  interviewId,
                  skills: resultData.data.report.reportSkills.map((skill) => ({
                    assessmentTitle: skill.skill || assessment.assessmentIdVelox || 'Unknown',
                    score: skill.score != null ? skill.score : 'N/A',
                    status: resultData.data.status === 2 ? 'Completed' : 'In Progress',
                    timeConsumed: skill.timeConsumed != null ? skill.timeConsumed : 'N/A',
                    strengths: skill.summary?.strengths || [],
                    weaknesses: skill.summary?.weakness || [],
                    improvementAreas: skill.summary?.candidateImprovementAreas || [],
                    communicationSummary: skill.summary?.communicationSummary || [],
                  })),
                  proctoringEvents: resultData.data.proctoringEventsData?.proctoringEvents || {},
                });
              }
            } catch (err) {
              console.warn(`Error fetching results for interview ${interviewId}: ${err.message}`);
            }

            try {
              const recordingUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getRecording/${interviewId}`;
              console.log('Fetching recording from:', recordingUrl);
              const recordingResponse = await fetch(recordingUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log('Recording response status:', recordingResponse.status);
              if (!recordingResponse.ok) {
                const errorData = await recordingResponse.json().catch(() => ({}));
                console.error('Recording error response:', errorData);
                throw new Error(errorData.message || `Failed to fetch recording for interview ${interviewId} (Status: ${recordingResponse.status})`);
              }
              const recordingData = await recordingResponse.json();
              console.log('Recording data:', recordingData);
              if (recordingData.success && recordingData.data) {
                recordings.push({
                  interviewId,
                  url: recordingData.data,
                  type: 'video',
                });
              }
            } catch (err) {
              console.warn(`Error fetching recording for interview ${interviewId}: ${err.message}`);
            }

            try {
              const transcriptUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getTranscript/${interviewId}`;
              console.log('Fetching transcript from:', transcriptUrl);
              const transcriptResponse = await fetch(transcriptUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log('Transcript response status:', transcriptResponse.status);
              if (!transcriptResponse.ok) {
                const errorData = await transcriptResponse.json().catch(() => ({}));
                console.error('Transcript error response:', errorData);
                throw new Error(errorData.message || `Failed to fetch transcript for interview ${interviewId} (Status: ${transcriptResponse.status})`);
              }
              const transcriptData = await transcriptResponse.json();
              console.log('Transcript data:', transcriptData);
              if (transcriptData.success && transcriptData.data) {
                transcripts.push(
                  ...transcriptData.data.map((entry) => ({
                    interviewId,
                    start: entry.start || 0,
                    end: entry.end || 0,
                    text: entry.text || 'No transcript text available',
                    speaker: entry.speaker === 0 ? 'Interviewer' : 'Candidate',
                  }))
                );
              }
            } catch (err) {
              console.warn(`Error fetching transcript for interview ${interviewId}: ${err.message}`);
            }
          }

          setAssessmentResults(results);
          setRecording(recordings);
          setTranscript(transcripts);

          if (results.length === 0 && recordings.length === 0 && transcripts.length === 0) {
            throw new Error("No data available for this candidate's assessments");
          }
        } catch (err) {
          setError(err.message);
          console.error('Fetch candidate data error:', err);
          toast.error(err.message || "Failed to load candidate data.");
        } finally {
          setLoading(false);
        }
      }
    };
    if (selectedCandidate) {
      fetchCandidateData();
    }
  }, [selectedCandidate]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (!response.success) {
        throw new Error("Logout failed");
      }
      toast.success("Logged out successfully!");
      setUserCredentials(null);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuItemClick = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const calculateExperience = (candidate) => {
    if (candidate.experience?.length > 0) {
      const totalExperience = candidate.experience.reduce((acc, exp) => {
        const from = new Date(exp.from);
        const to = exp.to ? new Date(exp.to) : new Date();
        const years = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 365);
        return acc + Math.round(years);
      }, 0);
      return `${totalExperience} years`;
    }
    const accountAge = new Date().getFullYear() - new Date(candidate.createdAt).getFullYear();
    return `${Math.max(1, accountAge)} years`;
  };

  const getSkillsDisplay = (candidate) => {
    if (candidate.skills?.length > 0) {
      return candidate.skills.slice(0, 3);
    }
    return ["Professional", "Reliable", "Dedicated"];
  };

  const getCommitmentBadges = (candidate) => {
    const workMode = candidate.profile?.professionalInformation?.workMode || "Full Time";
    const badges = [workMode];
    if (workMode !== "Contract") {
      badges.push("Contract");
    }
    return badges;
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsResultsDialogOpen(true);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    if (!searchTerm) return true;
    return (candidate.skills || []).some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const closeResultsDialog = () => {
    setIsResultsDialogOpen(false);
    setSelectedCandidate(null);
  };

  const formatTime = (seconds) => {
    if (seconds == null || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(Number(seconds) / 60);
    const secs = Math.floor(Number(seconds) % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getScoreBackgroundColor = (score) => {
    if (score === 'N/A') return 'bg-gray-200';
    const numericScore = Number(score);
    if (numericScore < 2) return 'bg-red-500';
    if (numericScore <= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <>
      <Navbar />
      <header className="bg-white shadow-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-1 lg:py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                onClick={() => router.push("/")}
                alt="EarlyJobs.ai"
                className="h-12 lg:h-14 cursor-pointer"
              />
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              {userCredentials ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:bg-red-50 rounded-xl py-2 px-4 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                  </Button>
                  <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userCredentials.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        {userCredentials?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          ?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">{userCredentials.name}</span>
                  </div>
                </div>
              ) : (
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition-colors duration-200 font-semibold"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              )}
            </nav>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-orange-600 focus:outline-none p-3"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100">
              <div className="flex flex-col space-y-2">
                {userCredentials !== null && (
                  <div
                    className="flex items-center space-x-3 cursor-pointer px-4 py-3"
                    onClick={handleProfileClick}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userCredentials.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        {userCredentials?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          ?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userCredentials.name}</p>
                      <p className="text-xs text-gray-500">{userCredentials.profile?.preferredJobRole}</p>
                    </div>
                  </div>
                )}
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/browse-candidates")}
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
                  onClick={() => handleMobileMenuItemClick("/talent-pool")}
                >
                  Talent Pool
                </Button>
                {userCredentials !== null ? (
                  <Button
                    variant="ghost"
                    className="w-full text-left justify-start text-red-600 hover:bg-red-50 rounded-xl py-3 px-4 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="w-full text-left justify-start bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      router.push("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign Up
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto py-15 px-6">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                Candidate Dashboard
              </h1>
              <p className="text-lg text-gray-600">Discover talented professionals ready to join your team</p>
            </div>
            <div className="mb-8">
              <div className="lg:w-[35rem]">
                <input
                  type="text"
                  placeholder="Search by skills (e.g., Sales, Management, React, Data Science...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">Loading candidates...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-lg text-red-600">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
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
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="font-bold text-lg text-gray-900 truncate">{candidate.name}</h2>
                            <span className="text-gray-500 text-sm font-medium">
                              | Exp: {calculateExperience(candidate)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                            {candidate.profile?.bio
                              ? candidate.profile.bio.substring(0, 120) +
                                (candidate.profile.bio.length > 120 ? "..." : "")
                              : `${candidate.role.charAt(0).toUpperCase() + candidate.role.slice(1)} with experience in various projects and technologies.`}
                          </p>
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Expert in</h4>
                              <div className="flex flex-wrap gap-2">
                                {getSkillsDisplay(candidate).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-200 text-xs px-2 py-1 rounded-md font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {candidate.skills?.length > 3 && (
                                  <span className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                                    +{candidate.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Commitment</h4>
                              <div className="flex flex-wrap gap-2 mb-4">
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
                          <button
                            onClick={() => handleViewProfile(candidate)}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            View profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-full py-10">
                  <p className="text-lg text-gray-600">No candidates match your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isResultsDialogOpen && selectedCandidate && (
        <div className="fixed top-0 right-0 h-full bg-white shadow-lg w-full sm:w-[800px] p-6 sm:p-8 z-50 overflow-y-auto overflow-x-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600">Loading candidate data...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-orange-100">
                      {selectedCandidate.avatar ? (
                        <img
                          src={selectedCandidate.avatar}
                          alt={selectedCandidate.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(selectedCandidate.name)
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedCandidate.name}'s Profile Details</h2>
                      <button
                        onClick={closeResultsDialog}
                        className="text-gray-600 hover:text-orange-600"
                      >
                        <X size={28} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                      {selectedCandidate.profile?.bio
                        ? selectedCandidate.profile.bio
                        : `${selectedCandidate.role.charAt(0).toUpperCase() + selectedCandidate.role.slice(1)} with experience in various projects and technologies.`}
                    </p>
                    {/* <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Expert in</h4>
                      <div className="flex flex-wrap gap-2">
                        {getSkillsDisplay(selectedCandidate).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-200 text-xs px-2 py-1 rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {selectedCandidate.skills?.length > 3 && (
                          <span className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                            +{selectedCandidate.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">If your company is interested in selecting this candidate based on their skills and performance, please proceed to express interest.</p>
                <Button
                  onClick={() => setIsInterestDialogOpen(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
                >
                  Express Interest
                </Button>
              </div>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 sm:gap-6 border-b border-gray-200">
                  {["overview", "recording", "transcript", "proctoring"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-base sm:text-lg ${activeTab === tab
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      
                      {tab === "proctoring" ? "Proctoring Summary" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  {activeTab === "overview" && (
                    error ? (
                      <p className="text-red-600 text-base sm:text-lg">Error: {error}</p>
                    ) : assessmentResults.length > 0 ? (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">All Assessment Scores</h3>
                          <div className="flex flex-wrap gap-4 mb-6">
                            {assessmentResults.flatMap((result) =>
                              result.skills.map((skill, skillIndex) => (
                                <div
                                  key={`${result.interviewId}-${skillIndex}`}
                                  className={`text-sm font-semibold text-white px-4 py-2 rounded-full ${getScoreBackgroundColor(skill.score)}`}
                                >
                                  {skill.assessmentTitle}: {skill.score === 'N/A' ? 'N/A' : `${skill.score}/10`}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                        {assessmentResults.map((result, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Assessment Results</h3>
                            {result.skills.length > 0 && (
                              <div className="space-y-4">
                                {result.skills.map((skill, skillIndex) => (
                                  <div key={skillIndex} className="mt-4">
                                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">{skill.assessmentTitle}</h4>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                      <strong>Status:</strong> {skill.status}
                                    </p>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                      <strong>Time Taken:</strong> {formatTime(skill.timeConsumed)}
                                    </p>
                                    <div className="mt-2">
                                      <strong>Scores:</strong>
                                      <ul className="list-disc pl-6 mt-1">
                                        <li>{skill.score === 'N/A' ? 'N/A' : `${skill.score}/10`}</li>
                                      </ul>
                                    </div>
                                    {skill.strengths.length > 0 && (
                                      <div className="mt-3">
                                        <h4 className="text-sm font-semibold text-gray-900">Strengths:</h4>
                                        <ul className="list-disc pl-6 text-gray-600 text-sm sm:text-base break-words">
                                          {skill.strengths.map((strength, i) => (
                                            <li key={i}>{strength}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {skill.weaknesses.length > 0 && (
                                      <div className="mt-3">
                                        <h4 className="text-sm font-semibold text-gray-900">Weaknesses:</h4>
                                        <ul className="list-disc pl-6 text-gray-600 text-sm sm:text-base break-words">
                                          {skill.weaknesses.map((weakness, i) => (
                                            <li key={i}>{weakness}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {skill.improvementAreas.length > 0 && (
                                      <div className="mt-3">
                                        <h4 className="text-sm font-semibold text-gray-900">Improvement Areas:</h4>
                                        <ul className="list-disc pl-6 text-gray-600 text-sm sm:text-base break-words">
                                          {skill.improvementAreas.map((area, i) => (
                                            <li key={i}>{area}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {skill.communicationSummary.length > 0 && (
                                      <div className="mt-3">
                                        <h4 className="text-sm font-semibold text-gray-900">Communication Summary:</h4>
                                        <ul className="list-disc pl-6 text-gray-600 text-sm sm:text-base break-words">
                                          {skill.communicationSummary.map((summary, i) => (
                                            <li key={i}>{summary}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-base">No assessment results available.</p>
                    )
                  )}
                  {activeTab === "recording" && (
                    recording.length > 0 ? (
                      <div className="space-y-6">
                        {recording.map((rec, index) => (
                          <div key={index}>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                              Interview Recording
                            </h3>
                            {rec.type === "video" && rec.url ? (
                              <video controls className="w-full mt-3 rounded-lg">
                                <source src={rec.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <p className="text-gray-600 text-base">Recording format not supported or no URL provided.</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-base">No recordings available.</p>
                    )
                  )}
                  {activeTab === "transcript" && (
                    transcript.length > 0 ? (
                      <div className="space-y-6">
                        {transcript.map((trans, index) => (
                          <div
                            key={index}
                            className={`border-l-4 border-orange-500 pl-4 py-3 rounded-md ${
                              trans.speaker === 'Candidate' ? 'bg-orange-100' : 'bg-gray-100'
                            }`}
                          >
                            <p className="text-gray-600 font-medium text-base sm:text-lg">
                              {trans.speaker} ({formatTime(trans.start)} - {formatTime(trans.end)}):
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base break-words">{trans.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-base">No transcripts available.</p>
                    )
                  )}
                  {activeTab === "proctoring" && (
                    assessmentResults.length > 0 && assessmentResults[0].proctoringEvents ? (
                      <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Proctoring Summary</h3>
                        <div>
                          <p className="text-gray-600 text-sm sm:text-base break-words">
                            <strong>Proctoring Score:</strong> {assessmentResults[0].proctoringEvents.proctoringScore || 'N/A'}/10
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base break-words">
                            <strong>Blur Events:</strong> {assessmentResults[0].proctoringEvents.blurEventCount || 0}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base break-words">
                            <strong>Mute Events:</strong> {assessmentResults[0].proctoringEvents.muteEventCount || 0}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base break-words">
                            <strong>Camera Disable Events:</strong> {assessmentResults[0].proctoringEvents.disableCameraEventCount || 0}
                          </p>
                        </div>
                        {assessmentResults[0].proctoringEvents.proctoringLogs?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Proctoring Events:</h4>
                            <ul className="list-disc pl-6 text-gray-600 text-sm sm:text-base space-y-2 break-words">
                              {assessmentResults[0].proctoringEvents.proctoringLogs.map((log, i) => (
                                <li key={i}>
                                  <strong>{log.event.eventType}</strong> at {formatDateTime(log.event.eventTime.clockTime)} (Interview Time: {formatTime(log.event.eventTime.interviewTime)})
                                  {log.event.metadata && (
                                    <ul className="list-circle pl-6 mt-1">
                                      {log.event.metadata.reason && (
                                        <li>Reason: {log.event.metadata.reason}</li>
                                      )}
                                      {log.event.metadata.detectedPatterns && (
                                        <li>Detected Patterns: {log.event.metadata.detectedPatterns.join(', ')}</li>
                                      )}
                                      {log.event.metadata.ipAddress && (
                                        <li>IP Address: {log.event.metadata.ipAddress}</li>
                                      )}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-base">No proctoring data available.</p>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isInterestDialogOpen && (
        <InterestedCandidateForm
          isOpen={isInterestDialogOpen}
          onClose={() => setIsInterestDialogOpen(false)}
          candidateName={selectedCandidate?.name || ""}
        />
      )}
      <Footer />
    </>
  );
};

export default Index;
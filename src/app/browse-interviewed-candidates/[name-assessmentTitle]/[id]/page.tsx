"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";
import InterestedCandidateForm from "../../../components/InterestedCandidateForm";
import Footer from "../../../components/pages/footer";
import Navbar from "../../../components/pages/navbar";

const CandidateProfile = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [recording, setRecording] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInterestDialogOpen, setIsInterestDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const assessmentsPerPage = 3;
  const router = useRouter();
  const { id } = useParams();

  const [assessmentTitles, setAssessmentTitles] = useState({}); // State for assessment titles

  useEffect(() => {
    const fetchCandidate = async () => {
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
          const candidate = data.data.find((c) => c._id === id);
          if (candidate) {
            setSelectedCandidate(candidate);
          } else {
            throw new Error("Candidate not found");
          }
        } else {
          throw new Error(data.message || "Error fetching candidates");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to load candidate data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCandidate();
    }
  }, [id]);

useEffect(() => {
  const fetchCandidateData = async () => {
    if (selectedCandidate) {
      try {
        setAssessmentResults([]);
        setRecording([]);
        setError(null);
        setLoading(true);

        // Fetch assessment titles first
        const titleUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/assessments/${selectedCandidate._id}`;
        const titleResponse = await fetch(titleUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!titleResponse.ok) {
          throw new Error(`Failed to fetch assessment titles (Status: ${titleResponse.status})`);
        }
        const titleData = await titleResponse.json();
        const titles = titleData.data.reduce((acc, assessment) => {
          acc[assessment._id] = assessment.title;
          return acc;
        }, {});
        setAssessmentTitles(titles);
        if (!selectedCandidate.assessmentsPaid || selectedCandidate.assessmentsPaid.length === 0) {
          throw new Error("No assessments available for this candidate");
        }

        const results = [];
        const recordings = [];

        // Process assessments after titles are fetched
        for (const assessment of selectedCandidate.assessmentsPaid) {
          const interviewId = assessment.interviewId;
          if (!interviewId) {
            console.warn(`No interviewId for assessment ${assessment._id}`);
            continue;
          }

          const assessmentTitle = titles[assessment.assessmentId] || 'Unknown Assessment';
          console.log(`Processing assessment ${assessment.assessmentId} with title: ${assessmentTitle}`);

          // Fetch assessment results
          try {
            const resultUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getResultForCandidateAssessment/${interviewId}`;
            const resultResponse = await fetch(resultUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!resultResponse.ok) {
              const errorData = await resultResponse.json().catch(() => ({}));
              throw new Error(errorData.message || `Failed to fetch assessment results for interview ${interviewId}`);
            }
            const resultText = await resultResponse.text();
            const resultData = resultText ? JSON.parse(resultText) : {};
            if (resultData.success && resultData.data?.report?.reportSkills) {
              const overallScore = resultData.data.report.reportSkills.reduce((sum, skill) => sum + (skill.score || 0), 0) / resultData.data.report.reportSkills.length || 'N/A';
              results.push({
                interviewId,
                assessmentId: assessment.assessmentId,
                assessmentTitle,
                overallScore,
                skills: resultData.data.report.reportSkills.map((skill) => ({
                  assessmentTitle: skill.skill || assessmentTitle,
                  score: skill.score != null ? skill.score : 'N/A',
                  status: resultData.data.status === 2 ? 'Completed' : 'In Progress',
                  timeConsumed: skill.timeConsumed != null ? skill.timeConsumed : 'N/A',
                  strengths: skill.summary?.strengths || [],
                  weaknesses: skill.summary?.weakness || [],
                })),
              });
            }
          } catch (err) {
            console.warn(`Error fetching results for interview ${interviewId}: ${err.message}`);
          }

          // Fetch recordings
          try {
            const recordingUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getRecording/${interviewId}`;
            const recordingResponse = await fetch(recordingUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!recordingResponse.ok) {
              const errorData = await recordingResponse.json().catch(() => ({}));
              throw new Error(errorData.message || `Failed to fetch recording for interview ${interviewId}`);
            }
            const recordingData = await recordingResponse.json();
            if (recordingData.success && recordingData.data) {
              recordings.push({
                interviewId,
                assessmentIdVelox: assessment.assessmentIdVelox,
                assessmentTitle,
                url: recordingData.data,
                type: 'video',
              });
            }
          } catch (err) {
            console.warn(`Error fetching recording for interview ${interviewId}: ${err.message}`);
          }
        }

        setAssessmentResults(results);
        setRecording(recordings);

        // if (results.length === 0 && recordings.length === 0) {
        //   <div>Candidate Didn't finish his</div>
        // }
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (seconds) => {
    if (seconds == null || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(Number(seconds) / 60);
    const secs = Math.floor(Number(seconds) % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreBackgroundColor = (score) => {
    if (score === 'N/A') return 'bg-gray-200';
    const numericScore = Number(score);
    if (numericScore < 2) return 'bg-red-500';
    if (numericScore <= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Pagination logic
  const indexOfLastAssessment = currentPage * assessmentsPerPage;
  const indexOfFirstAssessment = indexOfLastAssessment - assessmentsPerPage;
  const currentAssessments = assessmentResults.slice(indexOfFirstAssessment, indexOfLastAssessment);
  const totalPages = Math.ceil(assessmentResults.length / assessmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-6 text-lg text-gray-600 font-medium">Loading candidate profile...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-xl font-semibold text-red-600 mb-2">Error Loading Profile</p>
              <p className="text-gray-600">{error}</p>
              <Button
                onClick={() => router.push("/browse-interviewed-candidates")}
                className="mt-6 bg-orange-600 hover:bg-orange-700 text-white"
              >
                Back to Candidates
              </Button>
            </div>
          ) : (
            selectedCandidate && (
              <>
                {/* Hero Header Section */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4 sm:gap-6 flex-1">
                      <div className="flex-shrink-0">
                        <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-orange-100">
                          {selectedCandidate.avatar ? (
                            <img
                              src={selectedCandidate.avatar}
                              alt={selectedCandidate.name}
                              className="h-full w-full rounded-2xl object-cover"
                            />
                          ) : (
                            getInitials(selectedCandidate.name)
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{selectedCandidate.name}</h1>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {selectedCandidate.profile?.bio
                            ? selectedCandidate.profile.bio
                            : `${selectedCandidate.role?.charAt(0).toUpperCase() + selectedCandidate.role?.slice(1)} with experience in various projects and technologies.`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push("/browse-interviewed-candidates")}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Close"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                      Review this candidate's assessment results, interview recordings, and certificates. If your company is interested in this candidate, express your interest below.
                    </p>
                    <Button
                      onClick={() => setIsInterestDialogOpen(true)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      Express Interest
                    </Button>
                  </div>
                </div>
                {/* Tabs Navigation */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                  <div className="flex border-b border-gray-200 bg-gray-50">
                    {["overview", "recording", "certificates"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-4 py-4 sm:px-6 font-semibold text-sm sm:text-base transition-all ${
                          activeTab === tab
                            ? "text-orange-600 bg-white border-b-2 border-orange-600"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="p-6 sm:p-8">
                    {activeTab === "overview" && (
                      error ? (
                        <p className="text-red-600 text-base sm:text-lg">Error: {error}</p>
                      ) : currentAssessments.length > 0 ? (
                        <div className="space-y-8">
                          {/* Assessment Scores Overview */}
                          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                              Assessment Scores Overview
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {currentAssessments.map((result) => (
                                <div
                                  key={result.interviewId}
                                  className={`text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-md ${getScoreBackgroundColor(result.overallScore)}`}
                                >
                                  {result.assessmentTitle}: {result.overallScore === 'N/A' ? 'N/A' : `${result.overallScore.toFixed(1)}/10`}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Skills Breakdown */}
                          {currentAssessments.map((result, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                Skills Breakdown: {result.assessmentTitle}
                              </h3>
                              {result.skills.length > 0 && (
                                <div className="space-y-6">
                                  {result.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                      <div className="flex items-start justify-between mb-4">
                                        <h4 className="text-lg font-bold text-gray-900">{skill.assessmentTitle}</h4>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getScoreBackgroundColor(skill.score)}`}>
                                          {skill.score === 'N/A' ? 'N/A' : `${skill.score}/10`}
                                        </span>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                          <span className="font-semibold text-gray-700">Status:</span>
                                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">{skill.status}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                          <span className="font-semibold text-gray-700">Time:</span>
                                          <span className="text-gray-600">{formatTime(skill.timeConsumed)}</span>
                                        </div>
                                      </div>
                                      
                                      {skill.strengths.length > 0 && (
                                        <div className="mb-3">
                                          <h5 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            Strengths
                                          </h5>
                                          <ul className="space-y-1.5">
                                            {skill.strengths.map((strength, i) => (
                                              <li key={i} className="text-sm text-gray-700 pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
                                                {strength}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      
                                      {skill.weaknesses.length > 0 && (
                                        <div>
                                          <h5 className="text-sm font-bold text-orange-700 mb-2 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                            Areas for Improvement
                                          </h5>
                                          <ul className="space-y-1.5">
                                            {skill.weaknesses.map((weakness, i) => (
                                              <li key={i} className="text-sm text-gray-700 pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-orange-600 before:font-bold">
                                                {weakness}
                                              </li>
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
                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="flex justify-center gap-2 pt-4">
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                  key={page}
                                  onClick={() => paginate(page)}
                                  className={`min-w-[40px] h-10 rounded-lg font-semibold transition-all ${
                                    currentPage === page 
                                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md' 
                                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                  }`}
                                >
                                  {page}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
                            <span className="text-3xl">⏳</span>
                          </div>
                          <p className="text-lg font-semibold text-gray-900 mb-2">Assessment In Progress</p>
                          <p className="text-gray-600">This candidate is yet to complete their assessment. Results will be available once completed.</p>
                        </div>
                      )
                    )}
                    {activeTab === "recording" && (
                      recording.length > 0 ? (
                        <div className="space-y-6">
                          {recording.map((rec, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                Interview Recording: {rec.assessmentTitle}
                              </h3>
                              {rec.type === "video" && rec.url ? (
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
                                  <video controls className="w-full bg-black">
                                    <source src={rec.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              ) : (
                                <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
                                  <p className="text-gray-600">Recording format not supported or unavailable.</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <span className="text-3xl">🎥</span>
                          </div>
                          <p className="text-lg font-semibold text-gray-900 mb-2">No Recordings Available</p>
                          <p className="text-gray-600">Interview recordings will appear here once available.</p>
                        </div>
                      )
                    )}
                    {activeTab === "certificates" && (
                      <div>
                        {selectedCandidate.assessmentsPaid?.length > 0 ? (
                          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                Certificate: {assessmentTitles[selectedCandidate.assessmentsPaid[0].assessmentId] || 'Assessment'}
                              </h3>
                            </div>
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                              <div className="w-full h-[500px] sm:h-[600px]">
                                <iframe
                                  src={`https://earlyjobs-assessment-1.s3.ap-south-1.amazonaws.com/${selectedCandidate.assessmentsPaid[0].interviewId}/EJ-CERT-2025-${selectedCandidate.assessmentsPaid[0].interviewId.slice(0, 8)}.pdf`}
                                  title={`Certificate for ${assessmentTitles[selectedCandidate.assessmentsPaid[0].assessmentId] || 'Unknown Assessment'}`}
                                  className="w-full h-full border-0"
                                >
                                  <div className="p-8 text-center">
                                    <p className="text-gray-600 mb-4">Your browser does not support PDFs.</p>
                                    <a 
                                      href={`https://earlyjobs-assessment-1.s3.ap-south-1.amazonaws.com/${selectedCandidate.assessmentsPaid[0].interviewId}/EJ-CERT-2025-${selectedCandidate.assessmentsPaid[0].interviewId.slice(0, 8)}.pdf`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                                    >
                                      Download PDF
                                    </a>
                                  </div>
                                </iframe>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                              <span className="text-3xl">📜</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mb-2">No Certificates Available</p>
                            <p className="text-gray-600">Certificates will appear here once assessments are completed.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )
          )}
          {isInterestDialogOpen && (
            <InterestedCandidateForm
              isOpen={isInterestDialogOpen}
              onClose={() => setIsInterestDialogOpen(false)}
              candidateName={selectedCandidate?.name || ""}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CandidateProfile;
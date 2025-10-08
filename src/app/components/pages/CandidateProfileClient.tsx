"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";
import InterestedCandidateForm from "../InterestedCandidateForm";
import Footer from "./footer";
import Navbar from "./navbar";

export default function CandidateProfileClient({ id }: { id: string }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [recording, setRecording] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInterestDialogOpen, setIsInterestDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [assessmentTitles, setAssessmentTitles] = useState({});
  const assessmentsPerPage = 3;
  const router = useRouter();

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

            const assessmentTitle = titles[assessment.assessmentId] || "Unknown Assessment";
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
                const overallScore =
                  resultData.data.report.reportSkills.reduce((sum, skill) => sum + (skill.score || 0), 0) /
                    resultData.data.report.reportSkills.length || "N/A";
                results.push({
                  interviewId,
                  assessmentId: assessment.assessmentId,
                  assessmentTitle,
                  overallScore,
                  skills: resultData.data.report.reportSkills.map((skill) => ({
                    assessmentTitle: skill.skill || assessmentTitle,
                    score: skill.score != null ? skill.score : "N/A",
                    status: resultData.data.status === 2 ? "Completed" : "In Progress",
                    timeConsumed: skill.timeConsumed != null ? skill.timeConsumed : "N/A",
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
                  type: "video",
                });
              }
            } catch (err) {
              console.warn(`Error fetching recording for interview ${interviewId}: ${err.message}`);
            }
          }

          setAssessmentResults(results);
          setRecording(recordings);
        } catch (err) {
          setError(err.message);
          console.error("Fetch candidate data error:", err);
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
      ?.split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2) || "NA";
  };

  const formatTime = (seconds) => {
    if (seconds == null || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(Number(seconds) / 60);
    const secs = Math.floor(Number(seconds) % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreBackgroundColor = (score) => {
    if (score === "N/A") return "bg-gray-200";
    const numericScore = Number(score);
    if (numericScore < 2) return "bg-red-500";
    if (numericScore <= 6) return "bg-yellow-500";
    return "bg-green-500";
  };

  const indexOfLastAssessment = currentPage * assessmentsPerPage;
  const indexOfFirstAssessment = indexOfLastAssessment - assessmentsPerPage;
  const currentAssessments = assessmentResults.slice(indexOfFirstAssessment, indexOfLastAssessment);
  const totalPages = Math.ceil(assessmentResults.length / assessmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto py-15 px-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600">Loading candidate data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-lg text-red-600">Error: {error}</p>
            </div>
          ) : (
            selectedCandidate && (
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
                          onClick={() => router.push("/browse-candidates")}
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
                    {["overview", "recording", "certificates"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-base sm:text-lg ${
                          activeTab === tab
                            ? "text-orange-600 border-b-2 border-orange-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    {activeTab === "overview" && (
                      error ? (
                        <p className="text-red-600 text-base sm:text-lg">Error: {error}</p>
                      ) : currentAssessments.length > 0 ? (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">All Assessment Scores</h3>
                            <div className="flex flex-wrap gap-4 mb-6">
                              {currentAssessments.map((result) => (
                                <div
                                  key={result.interviewId}
                                  className={`text-sm font-semibold text-white px-4 py-2 rounded-full ${getScoreBackgroundColor(result.overallScore)}`}
                                >
                                  {result.assessmentTitle}: {result.overallScore === "N/A" ? "N/A" : `${result.overallScore.toFixed(1)}/10`}
                                </div>
                              ))}
                            </div>
                          </div>
                          {currentAssessments.map((result, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6">
                              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Skills Breakdown Review for {result.assessmentTitle}</h3>
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
                                          <li>{skill.score === "N/A" ? "N/A" : `${skill.score}/10`}</li>
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
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="flex justify-center mt-4">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <Button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`mx-1 px-3 py-1 ${currentPage === page ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"} rounded`}
                              >
                                {page}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600 text-base">Candidate yet to finish his assignment. We will provide you after completion</p>
                      )
                    )}
                    {activeTab === "recording" && (
                      recording.length > 0 ? (
                        <div className="space-y-6">
                          {recording.map((rec, index) => (
                            <div key={index}>
                              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                Interview Recording for {rec.assessmentTitle}
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
                    {activeTab === "certificates" && (
                      <div className="flex justify-center">
                        {selectedCandidate.assessmentsPaid?.length > 0 && (
                          <div className="group w-full overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="p-6 flex flex-col items-center">
                              <div className="bg-gray-100 border border-gray-300 p-4 rounded-md mb-4 w-full text-center">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{`Certificate for ${assessmentTitles[selectedCandidate.assessmentsPaid[0].assessmentId]}`}</h3>
                              </div>
                              <div className="w-full h-[400px] bg-white border border-gray-300 rounded-md overflow-hidden">
                                <iframe
                                  src={`https://earlyjobs-assessment-1.s3.ap-south-1.amazonaws.com/${selectedCandidate.assessmentsPaid[0].interviewId}/EJ-CERT-2025-${selectedCandidate.assessmentsPaid[0].interviewId.slice(0, 8)}.pdf`}
                                  title={`Certificate for ${assessmentTitles[selectedCandidate.assessmentsPaid[0].assessmentId] || "Unknown Assessment"}`}
                                  className="w-full h-full border-0"
                                >
                                  <p>
                                    Your browser does not support PDFs.{" "}
                                    <a
                                      href={`https://earlyjobs-assessment-1.s3.ap-south-1.amazonaws.com/${selectedCandidate.assessmentsPaid[0].interviewId}/EJ-CERT-2025-${selectedCandidate.assessmentsPaid[0].interviewId.slice(0, 8)}.pdf`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Download PDF
                                    </a>
                                  </p>
                                </iframe>
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedCandidate.assessmentsPaid?.length === 0 && (
                          <div className="text-center py-10">
                            <p className="text-lg text-gray-600">No certificates available.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {isInterestDialogOpen && (
                  <InterestedCandidateForm
                    isOpen={isInterestDialogOpen}
                    onClose={() => setIsInterestDialogOpen(false)}
                    candidateName={selectedCandidate?.name || ""}
                  />
                )}
              </>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
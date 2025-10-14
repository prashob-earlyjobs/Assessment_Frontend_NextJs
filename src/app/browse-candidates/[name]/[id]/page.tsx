"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "../../../components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { X, Award, Video, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import InterestedCandidateForm from "../../../components/InterestedCandidateForm";
import Footer from "../../../components/pages/footer";
import Navbar from "../../../components/pages/navbar";

// TypeScript Interfaces
interface AssessmentPaid {
  _id: string;
  interviewId: string;
  assessmentId: string;
  assessmentIdVelox?: string;
}

interface Candidate {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  profile?: {
    bio?: string;
  };
  assessmentsPaid?: AssessmentPaid[];
}

interface SkillDetail {
  assessmentTitle: string;
  score: number | string;
  status: string;
  timeConsumed: number | string;
  strengths: string[];
  weaknesses: string[];
}

interface AssessmentResult {
  interviewId: string;
  assessmentId: string;
  assessmentTitle: string;
  overallScore: number | string;
  skills: SkillDetail[];
}

interface Recording {
  interviewId: string;
  assessmentIdVelox?: string;
  assessmentTitle: string;
  url: string;
  type: string;
}

type TabType = "overview" | "recording" | "certificates";

const CandidateProfile = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // State Management
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [recording, setRecording] = useState<Recording[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isInterestDialogOpen, setIsInterestDialogOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [assessmentTitles, setAssessmentTitles] = useState<Record<string, string>>({});
  
  const assessmentsPerPage = 3;

  // Helper Functions
  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const formatTime = useCallback((seconds: number | string): string => {
    if (seconds == null || isNaN(Number(seconds))) return '0:00';
    const minutes = Math.floor(Number(seconds) / 60);
    const secs = Math.floor(Number(seconds) % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getScoreBackgroundColor = useCallback((score: number | string): string => {
    if (score === 'N/A') return 'bg-gray-200';
    const numericScore = Number(score);
    if (numericScore < 2) return 'bg-red-500';
    if (numericScore <= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  }, []);

  // Fetch Candidate Data
  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) {
        setError("No candidate ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

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
          const candidate = data.data.find((c: Candidate) => c._id === id);
          if (candidate) {
            setSelectedCandidate(candidate);
          } else {
            throw new Error("Candidate not found");
          }
        } else {
          throw new Error(data.message || "Error fetching candidates");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load candidate data";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  // Fetch Assessment Data and Recordings
  useEffect(() => {
    const fetchAssessmentTitles = async (): Promise<Record<string, string>> => {
      const titleUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/assessments/${selectedCandidate!._id}`;
      const titleResponse = await fetch(titleUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!titleResponse.ok) {
        throw new Error(`Failed to fetch assessment titles (Status: ${titleResponse.status})`);
      }

      const titleData = await titleResponse.json();
      const titles = titleData.data.reduce((acc: Record<string, string>, assessment: any) => {
        acc[assessment._id] = assessment.title;
        return acc;
      }, {});

      return titles;
    };

    const fetchAssessmentResult = async (
      interviewId: string,
      assessmentId: string,
      assessmentTitle: string
    ): Promise<AssessmentResult | null> => {
      try {
        const resultUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getResultForCandidateAssessment/${interviewId}`;
        const resultResponse = await fetch(resultUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!resultResponse.ok) {
          console.warn(`Failed to fetch results for interview ${interviewId}`);
          return null;
        }

        const resultText = await resultResponse.text();
        const resultData = resultText ? JSON.parse(resultText) : {};

        if (resultData.success && resultData.data?.report?.reportSkills) {
          const reportSkills = resultData.data.report.reportSkills;
          const overallScore = reportSkills.reduce((sum: number, skill: any) => sum + (skill.score || 0), 0) / reportSkills.length || 'N/A';

          return {
            interviewId,
            assessmentId,
            assessmentTitle,
            overallScore,
            skills: reportSkills.map((skill: any) => ({
              assessmentTitle: skill.skill || assessmentTitle,
              score: skill.score != null ? skill.score : 'N/A',
              status: resultData.data.status === 2 ? 'Completed' : 'In Progress',
              timeConsumed: skill.timeConsumed != null ? skill.timeConsumed : 'N/A',
              strengths: skill.summary?.strengths || [],
              weaknesses: skill.summary?.weakness || [],
            })),
          };
        }
      } catch (err) {
        console.warn(`Error fetching results for interview ${interviewId}:`, err);
      }

      return null;
    };

    const fetchRecording = async (
      interviewId: string,
      assessmentIdVelox: string | undefined,
      assessmentTitle: string
    ): Promise<Recording | null> => {
      try {
        const recordingUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getRecording/${interviewId}`;
        const recordingResponse = await fetch(recordingUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!recordingResponse.ok) {
          console.warn(`Failed to fetch recording for interview ${interviewId}`);
          return null;
        }

        const recordingData = await recordingResponse.json();

        if (recordingData.success && recordingData.data) {
          return {
            interviewId,
            assessmentIdVelox,
            assessmentTitle,
            url: recordingData.data,
            type: 'video',
          };
        }
      } catch (err) {
        console.warn(`Error fetching recording for interview ${interviewId}:`, err);
      }

      return null;
    };

    const fetchCandidateData = async () => {
      if (!selectedCandidate) return;

      try {
        setAssessmentResults([]);
        setRecording([]);
        setError(null);
        setLoading(true);

        // Fetch assessment titles
        const titles = await fetchAssessmentTitles();
        setAssessmentTitles(titles);

        if (!selectedCandidate.assessmentsPaid || selectedCandidate.assessmentsPaid.length === 0) {
          setLoading(false);
          return;
        }

        const results: AssessmentResult[] = [];
        const recordings: Recording[] = [];

        // Process each assessment
        for (const assessment of selectedCandidate.assessmentsPaid) {
          const { interviewId, assessmentId, assessmentIdVelox } = assessment;

          if (!interviewId) {
            console.warn(`No interviewId for assessment ${assessment._id}`);
            continue;
          }

          const assessmentTitle = titles[assessmentId] || 'Unknown Assessment';

          // Fetch results and recordings in parallel
          const [result, recording] = await Promise.all([
            fetchAssessmentResult(interviewId, assessmentId, assessmentTitle),
            fetchRecording(interviewId, assessmentIdVelox, assessmentTitle),
          ]);

          if (result) results.push(result);
          if (recording) recordings.push(recording);
        }

        setAssessmentResults(results);
        setRecording(recordings);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load assessment data";
        setError(errorMessage);
        console.error('Fetch candidate data error:', err);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [selectedCandidate]);

  // Pagination Logic
  const indexOfLastAssessment = currentPage * assessmentsPerPage;
  const indexOfFirstAssessment = indexOfLastAssessment - assessmentsPerPage;
  const currentAssessments = assessmentResults.slice(indexOfFirstAssessment, indexOfLastAssessment);
  const totalPages = Math.ceil(assessmentResults.length / assessmentsPerPage);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  // Loading Component
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-gray-700 font-medium">Loading candidate profile...</p>
            <p className="text-sm text-gray-500">Please wait while we fetch the data</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error Component
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white flex items-center justify-center">
          <div className="text-center py-10 px-6 max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button
              onClick={() => router.push("/browse-candidates")}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Back to Candidates
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // No Candidate Found
  if (!selectedCandidate) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white flex items-center justify-center">
          <div className="text-center py-10 px-6">
            <p className="text-xl text-gray-600">Candidate not found</p>
            <Button
              onClick={() => router.push("/browse-candidates")}
              className="mt-4 bg-orange-600 hover:bg-orange-700"
            >
              Back to Candidates
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          {selectedCandidate && (
              <>
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-orange-100">
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
                      <div className="absolute -bottom-1 -right-1 bg-green-500 h-6 w-6 rounded-full border-4 border-white"></div>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3">
                        <div>
                          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            {selectedCandidate.name}
                          </h1>
                          <p className="text-lg text-orange-600 font-semibold capitalize">
                            {selectedCandidate.role}
                          </p>
                        </div>
                        <Button
                          onClick={() => router.push("/browse-candidates")}
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-orange-600 hover:bg-orange-50"
                        >
                          <X size={24} />
                        </Button>
                      </div>

                      <p className="text-gray-600 text-base leading-relaxed mb-4">
                        {selectedCandidate.profile?.bio ||
                          `${selectedCandidate.role.charAt(0).toUpperCase() + selectedCandidate.role.slice(1)} with extensive experience in various projects and technologies, demonstrating strong technical skills and professional expertise.`}
                      </p>

                      <div className="flex flex-wrap gap-3 items-center">
                        <Button
                          onClick={() => setIsInterestDialogOpen(true)}
                          className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          <Award className="mr-2 h-4 w-4" />
                          Express Interest
                        </Button>
                        <p className="text-sm text-gray-500">
                          Interested in this candidate? Let them know!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
                  <div className="flex flex-wrap border-b border-gray-200">
                    {[
                      { key: "overview", label: "Overview", icon: Award },
                      { key: "recording", label: "Recordings", icon: Video },
                      { key: "certificates", label: "Certificates", icon: FileText },
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => handleTabChange(key as TabType)}
                        className={`flex items-center gap-2 px-6 py-4 font-semibold text-base transition-all ${
                          activeTab === key
                            ? "text-orange-600 border-b-3 border-orange-600 bg-orange-50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </button>
                    ))}
                  </div>
                  {/* Tab Content */}
                  <div className="p-6 sm:p-8">
                    {activeTab === "overview" && (
                      currentAssessments.length > 0 ? (
                        <div className="space-y-8">
                          {/* Assessment Scores Overview */}
                          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <Award className="h-6 w-6 text-orange-600" />
                              Assessment Scores Overview
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {currentAssessments.map((result) => (
                                <div
                                  key={result.interviewId}
                                  className={`${getScoreBackgroundColor(result.overallScore)} text-white px-5 py-3 rounded-xl shadow-md font-bold text-sm`}
                                >
                                  <div className="font-semibold">{result.assessmentTitle}</div>
                                  <div className="text-lg">
                                    {result.overallScore === 'N/A' ? 'N/A' : `${typeof result.overallScore === 'number' ? result.overallScore.toFixed(1) : result.overallScore}/10`}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Detailed Skills Breakdown */}
                          {currentAssessments.map((result, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                                Skills Breakdown: {result.assessmentTitle}
                              </h3>
                              {result.skills.length > 0 && (
                                <div className="space-y-6">
                                  {result.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                                        <h4 className="text-xl font-bold text-gray-900">{skill.assessmentTitle}</h4>
                                        <div className={`${getScoreBackgroundColor(skill.score)} text-white px-4 py-2 rounded-lg font-bold text-center`}>
                                          Score: {skill.score === 'N/A' ? 'N/A' : `${skill.score}/10`}
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                          <span className="font-semibold">Status:</span>
                                          <span className={`px-3 py-1 rounded-full text-sm ${skill.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {skill.status}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                          <span className="font-semibold">Time Taken:</span>
                                          <span>{formatTime(skill.timeConsumed)}</span>
                                        </div>
                                      </div>

                                      {skill.strengths.length > 0 && (
                                        <div className="mb-4">
                                          <h5 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                                            <span className="text-xl">✓</span> Strengths
                                          </h5>
                                          <ul className="space-y-1 ml-6">
                                            {skill.strengths.map((strength, i) => (
                                              <li key={i} className="text-gray-700 list-disc">{strength}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                      {skill.weaknesses.length > 0 && (
                                        <div>
                                          <h5 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                                            <span className="text-xl">!</span> Areas for Improvement
                                          </h5>
                                          <ul className="space-y-1 ml-6">
                                            {skill.weaknesses.map((weakness, i) => (
                                              <li key={i} className="text-gray-700 list-disc">{weakness}</li>
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
                            <div className="flex justify-center items-center gap-2 mt-8">
                              <Button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                variant="outline"
                                size="sm"
                                className="disabled:opacity-50"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                  key={page}
                                  onClick={() => paginate(page)}
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="sm"
                                  className={currentPage === page ? 'bg-orange-600 hover:bg-orange-700' : ''}
                                >
                                  {page}
                                </Button>
                              ))}

                              <Button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                size="sm"
                                className="disabled:opacity-50"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assessments Completed</h3>
                          <p className="text-gray-600">
                            This candidate has not completed their assessment yet. Check back later for results.
                          </p>
                        </div>
                      )
                    )}
                    {/* Recording Tab */}
                    {activeTab === "recording" && (
                      recording.length > 0 ? (
                        <div className="space-y-6">
                          {recording.map((rec, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                  <Video className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900">
                                    {rec.assessmentTitle}
                                  </h3>
                                  <p className="text-sm text-gray-500">Interview Recording</p>
                                </div>
                              </div>
                              {rec.type === "video" && rec.url ? (
                                <div className="mt-4">
                                  <video 
                                    controls 
                                    className="w-full rounded-lg shadow-lg border border-gray-200"
                                    controlsList="nodownload"
                                  >
                                    <source src={rec.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                  <p className="text-gray-600">Recording format not supported or no URL provided.</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Video className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recordings Available</h3>
                          <p className="text-gray-600">
                            Interview recordings for this candidate are not available at this time.
                          </p>
                        </div>
                      )
                    )}

                    {/* Certificates Tab */}
                    {activeTab === "certificates" && (
                      <div>
                        {selectedCandidate.assessmentsPaid && selectedCandidate.assessmentsPaid.length > 0 ? (
                          <div className="grid grid-cols-1 gap-6">
                            {selectedCandidate.assessmentsPaid.map((assessment, index) => (
                              <div 
                                key={index}
                                className="group overflow-hidden rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                              >
                                <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                      <FileText className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                      <h3 className="text-xl font-bold text-white">
                                        {assessmentTitles[assessment.assessmentId] || 'Certificate'}
                                      </h3>
                                      <p className="text-orange-100 text-sm">Official Certification</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="p-6">
                                  <div className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-inner" style={{ height: '600px' }}>
                                    <iframe
                                      src={`https://earlyjobs-assessment-1.s3.ap-south-1.amazonaws.com/${assessment.interviewId}/EJ-CERT-2025-${assessment.interviewId.slice(0, 8)}.pdf`}
                                      title={`Certificate for ${assessmentTitles[assessment.assessmentId] || 'Unknown Assessment'}`}
                                      className="w-full h-full"
                                    >
                                      <p>Your browser does not support PDFs. 
                                        <a 
                                          href={`https://earlyjobs-assessment-1.s3.ap-south-1.amazonaws.com/${assessment.interviewId}/EJ-CERT-2025-${assessment.interviewId.slice(0, 8)}.pdf`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-orange-600 underline ml-1"
                                        >
                                          Download PDF
                                        </a>
                                      </p>
                                    </iframe>
                                  </div>
                                  
                                  <div className="mt-4 flex justify-center">
                                    <a
                                      href={`https://earlyjobs-assessment-1.s3.ap-south-1.amazonaws.com/${assessment.interviewId}/EJ-CERT-2025-${assessment.interviewId.slice(0, 8)}.pdf`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                      <FileText className="h-4 w-4" />
                                      Download Certificate
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FileText className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Available</h3>
                            <p className="text-gray-600">
                              This candidate does not have any certificates yet.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

          {/* Interest Dialog */}
          {isInterestDialogOpen && selectedCandidate && (
            <InterestedCandidateForm
              isOpen={isInterestDialogOpen}
              onClose={() => setIsInterestDialogOpen(false)}
              candidateName={selectedCandidate.name}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CandidateProfile;
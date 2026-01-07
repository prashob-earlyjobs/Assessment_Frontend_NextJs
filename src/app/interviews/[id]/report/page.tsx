"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";
import {
  ArrowLeft,
  Video,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Lightbulb,
  Loader2,
  AlertCircle,
  Play,
  Download,
  User,
  Mail,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import {
  getInterviewReport,
  getRecording,
  getUserInterviews,
} from "@/app/components/services/servicesapis";
import { useUser } from "@/app/context";
import Header from "@/app/components/pages/header";
import Footer from "@/app/components/pages/footer";
import ProtectedRoute from "@/app/components/services/protectedRoute";

interface InterviewReport {
  technical: {
    positives: string[];
    negatives: string[];
  };
  communication: {
    positives: string[];
    negatives: string[];
  };
  recommendations: string[];
}

const InterviewReportPage = () => {
  const navigate = useRouter();
  const params = useParams();
  const interviewId = params?.id as string;
  const { userCredentials } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [overallScore, setOverallScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!interviewId) {
        setError("Interview ID is required");
        setLoading(false);
        return;
      }

      if (!userCredentials?._id) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // // First, fetch the interview to get the sessionId
        // const interviewsResponse = await getUserInterviews(userCredentials._id);
        
        // if (!interviewsResponse.success) {
        //   throw new Error("Failed to fetch interview data");
        // }

        // const interviews = interviewsResponse.interviews || interviewsResponse.data || [];
        // console.log("Interviews:==>", interviews);
        // console.log("InterviewId:==>", interviewId);
        // const interview = interviews.find((int: any) => 
        //   int.interviewId === interviewId || 
        //   int.assessmentId === interviewId || 
        //   int._id === interviewId
        // );

        // if (!interview || !interview.sessionId) {
        //   throw new Error("Interview not found or session ID not available");
        // }

        setSessionId(interviewId);

        // Fetch interview report from backend API using sessionId
        const response = await getInterviewReport(interviewId);
      
        if (!response.success) {
          throw new Error(response.message || "Failed to fetch interview report");
        }

        // Extract report data from response
        const reportData = response.data.report;
        console.log("ReportData:==>", response.data.report.technical);
        
        // Extract overall score
        const score = response.data?.overallScore || 
          response.data?.score || 
          reportData?.overallScore || 
          reportData?.score || 
          null;
        setOverallScore(score ? parseFloat(score) : null);
        
        // Extract technical and communication feedback
        const technicalPositive = reportData?.technical?.positives || [];
        const technicalNegative = reportData?.technical?.negatives || [];
        const communicationPositive = reportData?.communication?.positives || [];
        const communicationNegative = reportData?.communication?.negatives || [];
        const recommendations = reportData?.recommendations || [];

        setReport({
          technical: {
            positives: Array.isArray(technicalPositive) ? technicalPositive : [],
            negatives: Array.isArray(technicalNegative) ? technicalNegative : [],
          },
          communication: {
            positives: Array.isArray(communicationPositive) ? communicationPositive : [],
            negatives: Array.isArray(communicationNegative) ? communicationNegative : [],
          },
          recommendations: Array.isArray(recommendations) ? recommendations : [],
        });

        // Extract transcript from response
        const transcriptData = response.data?.transcript || 
          response.data?.transcripts || 
          reportData?.transcript || 
          [];
        setTranscript(Array.isArray(transcriptData) ? transcriptData : []);
      } catch (error: any) {
        console.error("Error fetching report:", error);
        setError(error.message || "Failed to fetch interview report");
        toast.error(error.message || "Failed to fetch interview report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [interviewId, userCredentials]);

  const handleFetchRecording = async () => {
    if (!sessionId) return;

    try {
      setVideoLoading(true);
      const response = await getRecording(sessionId);
      
      if (response.success && response.data?.recordingUrl) {
        setVideoUrl(response.data.recordingUrl);
      } else if (response.data?.recording) {
        setVideoUrl(response.data.recording);
      } else {
        throw new Error("Recording not available");
      }
    } catch (error: any) {
      console.error("Error fetching recording:", error);
      toast.error("Failed to load recording");
    } finally {
      setVideoLoading(false);
    }
  };


  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-orange-600 mb-4" />
              <p className="text-lg text-gray-600">Loading interview report...</p>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !report) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
            <div className="flex flex-col items-center justify-center py-20">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Report</h3>
              <p className="text-gray-600 mb-6">{error || "Report not available"}</p>
              <Button
                onClick={() => navigate.push("/interviews")}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Back to Interviews
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={() => navigate.push("/interviews")}
              variant="ghost"
              className="rounded-lg flex items-center justify-center w-9 h-9 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Interview Report
            </h1>
            <p className="text-lg text-gray-600">
              Detailed feedback and analysis of your interview performance
            </p>
          </div>

          {/* Candidate Info and Overall Score Section */}
          <Card className="rounded-2xl border-0 shadow-lg mb-8 bg-gradient-to-br from-white to-orange-50/30 text-gray-900">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Candidate Basic Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {userCredentials?.name?.charAt(0)?.toUpperCase() || 
                     userCredentials?.name?.charAt(0)?.toUpperCase() || 
                     'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {userCredentials?.name || 
                       
                       'Candidate'}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {userCredentials?.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{userCredentials.email}</span>
                        </div>
                      )}
                      {userCredentials?.mobile && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{userCredentials.mobile}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Overall Score */}
                {overallScore !== null && (
                  <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Trophy className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Overall Score</span>
                    </div>
                    <div className={`px-6 py-3 rounded-xl font-bold text-2xl shadow-lg ${
                      overallScore >= 7 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                        : overallScore >= 4 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    }`}>
                      {overallScore.toFixed(1)}/10
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
              <TabsTrigger 
                value="overview" 
                className="text-sm sm:text-base py-2 sm:py-3 text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:bg-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="recording" 
                className="text-sm sm:text-base py-2 sm:py-3 text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:bg-white"
              >
                Recording
              </TabsTrigger>
              <TabsTrigger 
                value="transcript" 
                className="text-sm sm:text-base py-2 sm:py-3 text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:bg-white"
              >
                Transcript
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 text-gray-900">
              {/* Technical Feedback */}
              <Card className="rounded-2xl border-0 shadow-lg text-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                    Technical Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Technical Positive */}
                  {report.technical.positives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Positive Points
                      </h3>
                      <ul className="space-y-2">
                        {report.technical.positives.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technical Negative */}
                  {report.technical.negatives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        Areas for Improvement
                      </h3>
                      <ul className="space-y-2">
                        {report.technical.negatives.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                          >
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                
                  {report.technical.positives.length === 0 && report.technical.negatives.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No technical feedback available</p>
                  )}
                </CardContent>
              </Card>

              {/* Communication Feedback */}
              <Card className="rounded-2xl border-0 shadow-lg text-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    Communication Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Communication Positive */}
                  {report.communication.positives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Positive Points
                      </h3>
                      <ul className="space-y-2">
                        {report.communication.positives.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Communication Negative */}
                  {report.communication.negatives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        Areas for Improvement
                      </h3>
                      <ul className="space-y-2">
                        {report.communication.negatives.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                          >
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {report.communication.positives.length === 0 && report.communication.negatives.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No communication feedback available</p>
                  )}
                </CardContent>
              </Card>

              {/* Recommendations */}
              {report.recommendations.length > 0 && (
                <Card className="rounded-2xl border-0 shadow-lg text-gray-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.recommendations.map((recommendation, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                        >
                          <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Recording Tab */}
            <TabsContent value="recording" className="space-y-6 text-gray-900">
              <Card className="rounded-2xl border-0 shadow-lg text-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Video className="h-5 w-5 text-orange-600" />
                    Interview Recording
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!videoUrl ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Video className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Recording not loaded</p>
                      <Button
                        onClick={handleFetchRecording}
                        disabled={videoLoading}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        {videoLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Load Recording
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          src={videoUrl}
                          controls
                          className="w-full h-full"
                          onError={() => {
                            toast.error("Failed to load video");
                            setVideoUrl(null);
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = videoUrl;
                            link.download = `interview-recording-${interviewId}.mp4`;
                            link.click();
                          }}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

            </TabsContent>

            {/* Transcript Tab */}
            <TabsContent value="transcript" className="space-y-6 text-gray-900">
              <Card className="rounded-2xl border-0 shadow-lg text-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    Interview Transcript
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {transcript.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-600">Transcript not available for this interview</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {transcript.map((item, index) => (
                        <div key={index} className="space-y-3">
                          {/* Question (Interviewer) */}
                          {item.question && (
                            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-blue-700 flex items-center gap-2">
                                  <MessageSquare className="h-3 w-3" />
                                  AI Interviewer
                                </span>
                                {item.timestamp && (
                                  <span className="text-xs text-gray-500">
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.question}</p>
                            </div>
                          )}
                          
                          {/* Answer (Candidate) */}
                          {item.answer && (
                            <div className="p-4 rounded-lg bg-green-50 border border-green-200 ml-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-green-700 flex items-center gap-2">
                                  <User className="h-3 w-3" />
                                  You
                                </span>
                                {item.timestamp && (
                                  <span className="text-xs text-gray-500">
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default InterviewReportPage;


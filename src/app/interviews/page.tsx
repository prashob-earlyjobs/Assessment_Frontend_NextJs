"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Code,
  Users,
  BarChart3,
  Palette,
  Lightbulb,
  Server,
  Clock,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Brain,
  Sparkles,
  Loader2,
  AlertCircle,
  Info,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { getUserInterviews, getAssessmentById } from "@/app/components/services/servicesapis";
import { useUser } from "@/app/context";
import Header from "@/app/components/pages/header";
import Footer from "@/app/components/pages/footer";
import ProtectedRoute from "@/app/components/services/protectedRoute";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

interface InterviewCard {
  sessionId: string;
  id: string;
  title: string;
  category: string;
  subCategory: string;
  description: string;
  difficulty?: "HARD" | "MEDIUM" | "EASY";
  status?: "created" | "COMPLETED" | "completed" | "in_progress" | "IN_PROGRESS";
  duration?: string;
  completedAt?: string;
  icon: React.ReactNode;
  iconBg: string;
}

const InterviewsPage = () => {
  const navigate = useRouter();
  const { userCredentials } = useUser();
  const [interviews, setInterviews] = useState<InterviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<InterviewCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Icon mapping based on category
  const getIconForCategory = (category: string, subCategory: string) => {
    const categoryLower = category.toLowerCase();
    const subCategoryLower = subCategory.toLowerCase();
    
    if (categoryLower.includes("tech") || categoryLower.includes("engineering") || subCategoryLower.includes("engineering")) {
      return <Code className="h-6 w-6 text-orange-600" />;
    } else if (categoryLower.includes("hr") || categoryLower.includes("behavioral") || subCategoryLower.includes("soft")) {
      return <Users className="h-6 w-6 text-gray-600" />;
    } else if (categoryLower.includes("data") || subCategoryLower.includes("analytics")) {
      return <BarChart3 className="h-6 w-6 text-orange-600" />;
    } else if (categoryLower.includes("design") || subCategoryLower.includes("ux") || subCategoryLower.includes("ui")) {
      return <Palette className="h-6 w-6 text-orange-600" />;
    } else if (categoryLower.includes("product") || subCategoryLower.includes("strategy")) {
      return <Lightbulb className="h-6 w-6 text-orange-600" />;
    } else if (categoryLower.includes("ops") || categoryLower.includes("devops") || subCategoryLower.includes("infrastructure")) {
      return <Server className="h-6 w-6 text-gray-600" />;
    }
    return <Brain className="h-6 w-6 text-orange-600" />;
  };

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const diffInWeeks = Math.floor(diffInDays / 7);
      
      if (diffInWeeks > 0) {
        return `${diffInWeeks}w ago`;
      } else if (diffInDays > 0) {
        return `${diffInDays}d ago`;
      } else {
        return "Today";
      }
    } catch {
      return dateString;
    }
  };

  // Transform API data to InterviewCard format
  const transformInterviewData = async (interview: any): Promise<InterviewCard | null> => {
    try {
      let interviewDetails = null;
      console.log("Interview details:", interview);
      if (interview.assessmentId) {
       
      }

      const category =  "General";
      const subCategory = "Assessment";
      const title = interview.role || "Interview Assessment";
      const description = interview.jobDescription || "Complete this interview to showcase your skills.";
      const difficulty ="MEDIUM";
      const timeLimit =  interview.duration;
      // Normalize status: convert "completed" to "COMPLETED" for consistency
      const status = interview.status === "completed" ? "COMPLETED" : interview.status;
      const completedAt = interview.createdAt ? formatRelativeTime(interview.createdAt) : undefined;

      return {
        id: interview.interviewId || interview.assessmentId || interview._id,
        sessionId: interview.sessionId,
        title,
        category,
        subCategory,
        description,
        difficulty: difficulty as "HARD" | "MEDIUM" | "EASY",
        status: status as "created" | "COMPLETED" | "completed" | undefined,
        duration: `${timeLimit}m`,
        completedAt,
        icon: getIconForCategory(category, subCategory),
        iconBg: "bg-gray-100",
      };
    } catch (error) {
      console.error("Error transforming interview:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!userCredentials?._id) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await getUserInterviews(userCredentials._id);
        console.log("Interviews response:", response);
        if (!response.success) {
          throw new Error(response.message || "Failed to fetch interviews");
        }
        
        if (response.interviews && response.interviews.length > 0) {
          // Transform all interviews
          const transformedInterviews = await Promise.all(
            response.interviews.map((interview: any) => transformInterviewData(interview))
          );
          
          // Filter out null values and set state
          const validInterviews = transformedInterviews.filter(
            (interview): interview is InterviewCard => interview !== null
          );
          
          setInterviews(validInterviews);
        } else {
          setInterviews([]);
        }
      } catch (error: any) {
        console.error("Error fetching interviews:", error);
        setError(error.message || "Failed to fetch interviews. Please try again later.");
        toast.error(error.message || "Failed to fetch interviews");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [userCredentials]);

  const handleStart = (interviewId: string) => {
    // Find the interview by ID and open the info popup
    const interview = interviews.find((i) => i.id === interviewId);
    if (interview) {
      setSelectedInterview(interview);
      setIsDialogOpen(true);
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const baseClasses = "text-xs font-bold px-3 py-1.5 rounded-full shadow-sm";
    switch (difficulty) {
      case "HARD":
        return (
          <Badge className={`${baseClasses} bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200`}>
            HARD
          </Badge>
        );
      case "MEDIUM":
        return (
          <Badge className={`${baseClasses} bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200`}>
            MEDIUM
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCompletedBadge = () => {
    return (
      <Badge className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-green-100 to-emerald-50 text-green-700 border border-green-200 shadow-sm">
        COMPLETED
      </Badge>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={() => navigate.push("/dashboard")}
              variant="ghost"
              className="rounded-lg flex items-center justify-center w-9 h-9 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Interview Assessments
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Showcase your skills and advance your career with our comprehensive interview assessments
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 lg:p-7 relative overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Top Section: Icon and Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <Skeleton className="w-16 h-16 rounded-2xl" />
                    <Skeleton className="w-16 h-6 rounded-full" />
                  </div>

                  {/* Title */}
                  <Skeleton className="h-7 w-3/4 mb-3 rounded-lg" />
                  <Skeleton className="h-6 w-1/2 mb-5 rounded-lg" />

                  {/* Category */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-1 w-1 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>

                  {/* Description */}
                  <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                  </div>

                  {/* Bottom Section: Time/Status and Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <Skeleton className="h-4 w-16 rounded" />
                    </div>
                    <Skeleton className="h-10 w-24 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Interviews</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Retry
              </Button>
            </div>
          ) : interviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Brain className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Interviews Available</h3>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                You don't have any interview assessments yet. Complete your profile to get started!
              </p>
              <Button
                onClick={() => navigate.push("/assessments")}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Browse Assessments
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {interviews.map((interview, index) => (
                <div
                  key={interview.id}
                  className="group bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 lg:p-7 relative overflow-hidden hover:border-orange-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-orange-50/60 group-hover:via-purple-50/40 group-hover:to-blue-50/30 transition-all duration-500 pointer-events-none rounded-2xl" />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Top Section: Icon and Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`${interview.iconBg} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md ${(interview.status === "COMPLETED" || interview.status === "completed") ? "" : "group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-orange-50"}`}>
                        <div className="relative">
                          {interview.icon}
                          {interview.status !== "COMPLETED" && interview.status !== "completed" && (
                            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInterview(interview);
                            setIsDialogOpen(true);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-orange-600"
                          title="View details"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                        <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          {(interview.status === "COMPLETED" || interview.status === "completed")
                            ? getCompletedBadge()
                            : interview.difficulty
                            ? getDifficultyBadge(interview.difficulty)
                            : null}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 leading-tight">
                      {interview.title}
                    </h3>

                    {/* Category */}
                    <div className="flex items-center gap-2.5 mb-5">
                      <Badge 
                        variant="outline" 
                        className="text-xs px-3 py-1.5 border-gray-200 text-gray-700 font-medium group-hover:border-orange-300 group-hover:text-orange-700 group-hover:bg-orange-50/50 transition-all duration-300"
                      >
                        {interview.category}
                      </Badge>
                      <span className="text-gray-300 group-hover:text-orange-400 transition-colors duration-300">•</span>
                      <span className="text-sm text-gray-600 font-medium">{interview.subCategory}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-6 min-h-[3.5rem] max-h-[4.5rem] line-clamp-3 overflow-hidden text-ellipsis group-hover:text-gray-800 transition-colors duration-300">
                      {interview.description}
                    </p>

                    {/* Bottom Section: Time/Status and Action */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 group-hover:border-gradient-to-r group-hover:from-orange-200 group-hover:to-purple-200 group-hover:border-orange-200 transition-all duration-500">
                      <div className="flex items-center gap-2.5 text-sm font-medium">
                        {interview.status === "COMPLETED" || interview.status === "completed" ? (
                          <>
                            <span className="text-gray-700">{interview.completedAt}</span>
                          </>
                        ) : (
                          <>
                            <div className="p-1.5 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors duration-300">
                              <Clock className="h-4 w-4 text-orange-600" />
                            </div>
                            <span className="text-gray-700 group-hover:text-orange-600 transition-colors duration-300">{interview.duration}</span>
                          </>
                        )}
                      </div>
                      {interview.status === "COMPLETED" || interview.status === "completed" ? (
                        <Button
                          onClick={() => navigate.push(`/interviews/${interview.sessionId}/report`)}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 h-auto font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group-hover:scale-105 flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Show Report</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      ) : ["session_created","invitation_sent"].includes(interview.status) ? (
                        <Button
                          onClick={() => handleStart(interview.id)}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 h-auto font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group-hover:scale-105"
                        >
                          <span className="flex items-center gap-2">
                            Start
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
      {/* Interview Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Interview Details
            </DialogTitle>
          </DialogHeader>
          {selectedInterview && (
            <div className="space-y-6 mt-4">
              {/* Title and Status */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedInterview.title}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge 
                      variant="outline" 
                      className="text-xs px-3 py-1.5 border-gray-200 text-gray-700 font-medium"
                    >
                      {selectedInterview.category}
                    </Badge>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-600 font-medium">{selectedInterview.subCategory}</span>
                    {selectedInterview.difficulty && (
                      <>
                        <span className="text-gray-300">•</span>
                        {getDifficultyBadge(selectedInterview.difficulty)}
                      </>
                    )}
                  </div>
                </div>
                {(selectedInterview.status === "COMPLETED" || selectedInterview.status === "completed") && getCompletedBadge()}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedInterview.description}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                {selectedInterview.duration && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 mb-1">Duration</h4>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-700">{selectedInterview.duration}</span>
                    </div>
                  </div>
                )}
                {selectedInterview.completedAt && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 mb-1">Completed</h4>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{selectedInterview.completedAt}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-200">
                {["session_created","invitation_sent"].includes(selectedInterview.status) ? (
                  <Button
                    onClick={() => {
                      setIsDialogOpen(false);
                      navigate.push(`${process.env.NEXT_PUBLIC_AI_ASSESSMENT_URL}interview?sessionId=${selectedInterview.sessionId}`);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      Start Interview
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                ) : (selectedInterview.status === "COMPLETED" || selectedInterview.status === "completed") ? (
                  <Button
                    onClick={() => {
                      setIsDialogOpen(false);
                      navigate.push(`/interviews/${selectedInterview.id}/report`);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      View Report
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                ) : (selectedInterview.status === "in_progress" || selectedInterview.status === "IN_PROGRESS") ? (
                  <Button
                    onClick={() => {
                      setIsDialogOpen(false);
                      navigate.push(`/interviews/${selectedInterview.id}/report`);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      View Report
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                ): null}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
};

export default InterviewsPage;

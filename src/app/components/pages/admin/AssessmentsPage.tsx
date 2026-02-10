"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { AddAssessmentModal } from "../../../components/admin/AddAssessmentModal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Plus, Search, Edit, Trash, BarChart, Eye, Copy, Calendar, User, CheckCircle, Loader2 } from "lucide-react";
import { Assessment } from "../../../types/admin";
import {
  addAssessment,
  editAssessment,
  getAssessmentsfromAdminSearch,
  getCandidatesForAssessment,
  getResultForCandidateAssessment,
  getRecording,
  getTranscript,
  uploadPhoto,
  createCertificate,
  updateCertificateLink,
} from "../../../components/services/servicesapis";
import { toast } from "sonner";
import EditAssessmentModal from "../../../components/admin/EditAssessmentModal";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { useAdmin } from "../../../context/AdminContext";
import UserResultsSidebar from "../../../components/userResultSidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../components/ui/tooltip";
import {
  Clock,
  CalendarDays,
  Link2,
  RefreshCcw,
  BookOpen,
} from "lucide-react";
import html2pdf from "html2pdf.js";

// Utility to wait for images to load
const waitForImages = (element: HTMLElement): Promise<void> => {
  return new Promise((resolve) => {
    const images = element.getElementsByTagName("img");
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      resolve();
      return;
    }

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        resolve();
      }
    };

    Array.from(images).forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve();
        }
      } else {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", (err) => {
          console.error(`Failed to load image: ${img.src}`, err);
          onImageLoad(); // Continue to avoid hanging
        });
      }
    });
  });
};

// Preload images
const preloadImages = async (imageUrls: string[]): Promise<void> => {
  await Promise.all(
    imageUrls.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = (err) => {
          console.error(`Preload failed for ${src}`, err);
         
        };
      });
    })
  );
};

const LIMIT = 10;

interface CertificateProps {
  candidateName: string;
  assessmentName: string;
  score: number;
  date: string;
  commScore: number;
  proctScore: number;
  skillsVerified: string[];
  certificateId: string;
  interviewId?: string;
  userId?:string,
  isPDFGenerating?: boolean;
}

const AssessmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssessmentForEdit, setSelectedAssessmentForEdit] = useState<Assessment | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [page, setPage] = useState(1);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const { currentUser } = useAdmin();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [result, setResult] = useState(null);
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [certificateData, setCertificateData] = useState<CertificateProps | null>(null);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Preload images on component mount
  useEffect(() => {
    const imageUrls = [
      "/images/logo.png",
      "/images/qrcode_earlyjobs.png",
      "/images/signature.png",
    ];
    preloadImages(imageUrls).catch((err) => console.error("Image preload failed:", err));
  }, []);

  useEffect(() => {
    const resetSearchAndFilter = async () => {
      try {
        if (!selectedAssessment?.assessmentId) {
          setCandidates([]);
          return;
        }
        const response = await getCandidatesForAssessment(selectedAssessment.assessmentId);
        if (!response.success) {
          throw new Error(response.message);
        }
        setAssessment(response.data || []);
        setCandidates(response.data.interviewCandidates || []);
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
        setCandidates([]);
      }
    };

    resetSearchAndFilter();
  }, [selectedAssessment, searchTerm]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 75) return "text-blue-600 bg-blue-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const handleViewDetails = async (candidate) => {
    setSelectedCandidate(candidate);
    try {
      // Fetch assessment results
      const response = await getResultForCandidateAssessment(candidate.interviewId);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch assessment results");
      }
      setResult(response);

      // Fetch recording
      const recordingResponse = await getRecording(candidate.interviewId);
      if (!recordingResponse.success) {
        throw new Error(recordingResponse.message);
      }
      setRecording(recordingResponse.data);

      // Fetch transcript
      const transcriptResponse = await getTranscript(candidate.interviewId);
      if (!transcriptResponse.success) {
        throw new Error(transcriptResponse.message);
      }
      setTranscript(transcriptResponse.data);

      // Show the sidebar
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      toast.error(error.message || "Failed to fetch candidate details.");
    }
  };

  const handleCreateCertificate = async (candidate) => {
    setSelectedCandidate(candidate);
    try {
      // Fetch assessment results
      const response = await getResultForCandidateAssessment(candidate.interviewId);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch assessment results");
      }
      setResult(response);

      // // Fetch recording
      // const recordingResponse = await getRecording(candidate.interviewId);
      // if (!recordingResponse.success) {
      //   throw new Error(recordingResponse.message);
      // }
      // setRecording(recordingResponse.data);

      // // Fetch transcript
      // const transcriptResponse = await getTranscript(candidate.interviewId);
      // if (!transcriptResponse.success) {
      //   throw new Error(transcriptResponse.message);
      // }
      // setTranscript(transcriptResponse.data);

      // Construct certificate data using selectedAssessment.title
      const skillsVerified = response.data?.report?.reportSkills
        .filter((skill) => skill.score > 4)
        .map((skill) => skill.skill);
      const certificateId = `EJ-CERT-${new Date().getFullYear()}-${candidate.interviewId.slice(0, 8)}`;
      const newCertificateData: CertificateProps = {
        candidateName: `${candidate.firstName} ${candidate.lastName || ""}`,
        assessmentName: selectedAssessment?.title || "Unknown Assessment",
        score: response.data?.report?.score || 0,
        commScore: response.data?.report?.communicationScore || 0,
        proctScore: response.data?.proctoringEventsData?.proctoringEvents?.proctoringScore || 0,
        date: new Date().toLocaleDateString(),
        skillsVerified,
        certificateId,
        userId: candidate._id,
        interviewId: candidate.interviewId,
        isPDFGenerating: false,
      };
      setCertificateData(newCertificateData);
      setShowCertificateDialog(true);
    } catch (error) {
      console.error("Error preparing certificate:", error);
      toast.error(error.message || "Failed to prepare certificate data.");
    }
  };

  const handleSaveCertificate = async () => {
    if (!certificateData || !selectedCandidate) {
      toast.error("No certificate data available.");
      return;
    }

    
   

    setIsSaving(true);
    setCertificateData((prev) => ({ ...prev, isPDFGenerating: true }));

    const certificateElement = document.getElementById("certificate-container");
    if (certificateElement) {
      try {
        // Wait for DOM rendering and images to load
        await new Promise((resolve) => setTimeout(resolve, 500));
        await waitForImages(certificateElement);
        
        
        const opt = {
          margin: [0, 0, 0, 0],
          filename: `${certificateData.certificateId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: true,
            windowWidth: 1584, 
            windowHeight: 1224,
          },
          jsPDF: {
            unit: "in",
            format: [11, 8.5],
            orientation: "landscape",
          },
        };

        const blob = await html2pdf().set(opt).from(certificateElement).output("blob");
        if (blob.size === 0) {
          throw new Error("Generated PDF is empty");
        }

        const file = new File([blob], `${certificateData.certificateId}.pdf`, { type: "application/pdf" });

        const response = await uploadPhoto(file, certificateData.interviewId);
        let uploadedUrl = typeof response === "string" ? response : response.fileUrl;

        if (!uploadedUrl) {
          throw new Error("No URL returned from upload");
        }

         const backendUrl= process.env.NEXT_PUBLIC_BACKEND_URL;
        const candidateDetailsResponse=  await fetch(`${backendUrl}/candidate/id-by-interview/${certificateData.interviewId}`)
        const data= await candidateDetailsResponse.json();
        const userId = data.userId;

        const certificatePayload = {
        userid: userId,
        interviewid: certificateData.interviewId,
        certificateno: certificateData.certificateId,
        assessmentid: selectedAssessment?._id,
        certificatelink: uploadedUrl
      };

      const certificateResponse = await createCertificate(certificatePayload);
      const certificateDbId = certificateResponse.data.certificate._id;

        // Log certificate data to console after successful upload
        console.log("Certificate Data:", certificateData);
       
       

        const updateResponse = await updateCertificateLink({
          userId: userId,
          interviewId: certificateData.interviewId,
          certificateId: certificateDbId,
        });

        if (!updateResponse.success) {
          throw new Error("Failed to update certificate link");
        }

        toast.success("Certificate created and uploaded successfully!");
        setShowCertificateDialog(false);
      } catch (error) {
        console.error("Error creating certificate:", error);
        toast.error("Failed to create certificate. Please try again.");
      } finally {
        setIsSaving(false);
        setCertificateData((prev) => ({ ...prev, isPDFGenerating: false }));
      }
    } else {
      console.error("Certificate element not found.");
      toast.error("Certificate element not found.");
      setIsSaving(false);
      setCertificateData((prev) => ({ ...prev, isPDFGenerating: false }));
    }
  };

  const lastAssessmentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchAssessments = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: LIMIT,
          type: "",
          searchQuery: searchTerm,
        };
        const response = await getAssessmentsfromAdminSearch(params);
        const fetched = response.data.assessments;

        setAssessments((prev) => {
          if (page === 1) return fetched;
          return [...prev, ...fetched];
        });
        setHasMore(fetched.length === LIMIT);
      } catch (err) {
        toast.error("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
    setAssessments([]);
    setHasMore(true);
  }, [searchTerm]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "mcq":
        return "bg-blue-100 text-blue-800";
      case "coding":
        return "bg-purple-100 text-purple-800";
      case "video":
        return "bg-orange-100 text-orange-800";
      case "mixed":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCopyToClipboard = (assessment) => {
    const title = assessment?.title.replace(/\s+/g, "-").toLowerCase();
    const inviteLink = `https://earlyjobs.ai/assessment/${title}/${assessment.shortId ? assessment.shortId : assessment._id}/${
      currentUser.role === "franchise_admin" ? currentUser.franchiseId : ""
    }`;

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite link copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy invite link.");
    });
  };

  const handleEditAssessment = (assessment: Assessment) => {
    setSelectedAssessmentForEdit(assessment);
    setShowEditModal(true);
  };

  const handleUpdateAssessment = async (updatedAssessment: Assessment) => {
    if (!selectedAssessmentForEdit?._id) return toast.error("This assessment does not exist.");
    try {
      const response = await editAssessment(updatedAssessment, selectedAssessmentForEdit._id);
      if (!response.success) {
        throw new Error(response.message);
      }
      setAssessments((prev) =>
        prev.map((a) => (a._id === response.data._id ? response.data : a))
      );
      toast.success("Assessment updated successfully!");
      setShowEditModal(false);
      setSelectedAssessmentForEdit(null);
    } catch (error) {
      toast.error(`Failed to update assessment: ${error.message}`);
    }
  };

  const handleViewAnalytics = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
            <p className="text-gray-600 mt-2">Create and manage skill assessments for candidates.</p>
          </div>
          {currentUser.role === "super_admin" && (
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assessment
            </Button>
          )}
        </div>

        {!selectedAssessment && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Assessments</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search assessments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-300"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments.map((assessment, index) => {
                  const isLast = index === assessments.length - 1;
                  return (
                    <div
                      key={assessment._id}
                      className="border border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors"
                      ref={isLast ? lastAssessmentRef : null}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge className={getDifficultyColor(assessment.difficulty)}>
                              {assessment.difficulty}
                            </Badge>
                            <Badge className={getTypeColor(assessment.type)}>
                              {assessment.type?.toUpperCase()}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 text-blue-800 border-blue-300"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              {assessment.category || "Uncategorized"}
                            </Badge>
                          </div>
                          {assessment?.tags?.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-800 ml-1">
                              {tag}
                            </Badge>
                          ))}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CardDescription className="text-sm text-gray-600 mt-3 max-h-[64px] bg-white leading-snug line-clamp-3 cursor-default">
                                {assessment.description}
                              </CardDescription>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-sm bg-white text-gray-600">
                              {assessment.description}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {currentUser.role === "super_admin" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewAnalytics(assessment)}
                            >
                              <BarChart className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditAssessment(assessment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyToClipboard(assessment)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-300">
                        <div className="text-center">
                          <p className="text-2xl font-semibold text-gray-900">{assessment.timeLimit}</p>
                          <p className="text-sm text-gray-500">Minutes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-semibold text-gray-900">{assessment.pricing.basePrice}<span className="text-sm text-gray-500">Rs</span></p>
                          <p className="text-sm text-gray-500">Base Price</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-semibold text-gray-900">{assessment.pricing.discountedPrice}<span className="text-sm text-gray-500">Rs</span></p>
                          <p className="text-sm text-gray-500">Discounted Price</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {loading && <div className="text-center py-4">Loading...</div>}
                {!hasMore && assessments.length > 0 && (
                  <div className="text-center py-4 text-gray-500">No more assessments to load</div>
                )}
                {!loading && assessments.length === 0 && (
                  <div className="text-center py-4 text-gray-500">No assessments found</div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        {selectedAssessment && (
          <Card>
            <CardHeader>
              <Button
                onClick={() => setSelectedAssessment(null)}
                className="w-12 bg-gray-600 hover:bg-gray-700"
              >
                Back
              </Button>
              <div className="flex justify-between items-center">
                <CardTitle>{assessment?.title}</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 flex flex-wrap gap-[10px]">
                {candidates.length > 0 ? (
                  candidates.map((candidate) => (
                    <div
                      key={candidate.interviewId}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      style={{
                        margin: "0px",
                        width:
                          window.innerWidth >= 1024 && window.innerWidth <= 1704
                            ? "100%"
                            : window.innerWidth >= 1704
                            ? "auto"
                            : undefined,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="text-sm">
                              {candidate.firstName[0].toUpperCase() + (candidate.lastName ? candidate.lastName[0].toUpperCase() : "")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {candidate.firstName} {candidate.lastName}{" "}
                                <span>
                                  {" "}
                                  <Badge
                                    className={
                                      candidate.status !== 0
                                        ? candidate.status === 2
                                          ? "bg-green-100 text-green-800 mb-2"
                                          : "bg-blue-100 text-blue-800 mb-2"
                                        : "bg-red-100 text-red-800 mb-2"
                                    }
                                  >
                                    {candidate.status !== 0 ? (candidate.status === 2 ? "Selected" : "Completed") : "Pending"}
                                  </Badge>
                                </span>
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{candidate.email}</p>
                            <p className="text-sm text-gray-500">Phone: {candidate.phone}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(candidate)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleCreateCertificate(candidate)}>
                            Create Certificate
                          </Button>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Score:</span>
                              <Badge className={getScoreColor(candidate.score)}>
                                {candidate.score}/10
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500">
                              Interview Time: {Math.round((candidate?.interviewTime || 0) / 60)} min
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white rounded-2xl shadow-md border border-gray-100 max-w-[624px]">
                          <div>
                            <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <CalendarDays className="w-5 h-5 text-purple-600" />
                              Assessment Timing
                            </h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 mt-[2px] text-gray-500" />
                                <p>
                                  <span className="font-medium text-gray-800">Start:</span>{" "}
                                  {new Date(candidate.startTime).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "Asia/Kolkata",
                                    timeZoneName: "short",
                                  })}
                                </p>
                              </div>
                              <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 mt-[2px] text-gray-500" />
                                <p>
                                  <span className="font-medium text-gray-800">End:</span>{" "}
                                  {new Date(candidate.endTime).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "Asia/Kolkata",
                                    timeZoneName: "short",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <RefreshCcw className="w-5 h-5 text-blue-600" />
                              Status Info
                            </h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-start gap-2">
                                <Link2 className="w-4 h-4 mt-[2px] text-gray-500" />
                                <p>
                                  <span className="font-medium text-gray-800">Link Expiry:</span>{" "}
                                  {new Date(candidate.linkExpiryTime).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "Asia/Kolkata",
                                    timeZoneName: "short",
                                  })}
                                </p>
                              </div>
                              <div className="flex items-start gap-2">
                                <RefreshCcw className="w-4 h-4 mt-[2px] text-gray-500" />
                                <p>
                                  <span className="font-medium text-gray-800">Last Updated:</span>{" "}
                                  {new Date(candidate.lastStatusUpdatedTime).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "Asia/Kolkata",
                                    timeZoneName: "short",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center space-y-4 my-8">
                      <p className="text-gray-500 font-medium">No candidates found</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        {showDetails && selectedCandidate && (
          <UserResultsSidebar
            result={result}
            selectedCandidate={selectedCandidate}
            recording={recording}
            transcript={transcript}
            onClose={() => {
              setShowDetails(false);
              setResult(null);
              setRecording(null);
              setTranscript([]);
              setSelectedCandidate(null);
            }}
          />
        )}
        {certificateData && (
          <AlertDialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
            <AlertDialogContent
              style={{
                maxWidth: "95vw",
                width: "900px",
                maxHeight: "90vh",
                height: "auto",
                padding: "0",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <AlertDialogHeader style={{ padding: "1rem", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <AlertDialogTitle>Certificate Preview</AlertDialogTitle>
                <AlertDialogDescription>
                  Review the certificate below. Click "Save Certificate" to generate and upload the PDF.
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <div
                id="certificate-container"
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  overflow: "auto",
                  padding: "1rem",
                  backgroundColor: "#FFFFFF",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <Certificate {...certificateData} />
              </div>
              
              <AlertDialogFooter style={{ padding: "1rem", backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", justifyContent: "flex-end" }}>
                <AlertDialogCancel style={{ marginRight: "0.5rem" }}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSaveCertificate} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Certificate"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <AddAssessmentModal open={showAddModal} onOpenChange={setShowAddModal} />
      <EditAssessmentModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSave={handleUpdateAssessment}
        initialData={selectedAssessmentForEdit}
      />
    </AdminLayout>
  );
};

const Certificate: React.FC<CertificateProps> = ({
  candidateName,
  assessmentName,
  score,
  date,
  commScore,
  proctScore,
  skillsVerified,
  certificateId,
  isPDFGenerating,
}) => {
  return (
    <div className="w-full h-full" id="certificate" style={{ overflow: "hidden", backgroundColor: "#FFFFFF" }}>
      <div className="border-8 relative h-full p-4" style={{ borderColor: "#F97316" }}>
        {/* Border Decorations */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4" style={{ borderColor: "#F97316" }}></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4" style={{ borderColor: "#F97316" }}></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4" style={{ borderColor: "#F97316" }}></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4" style={{ borderColor: "#F97316" }}></div>

        {/* Header */}
        <div className="text-center mb-4">
          <img
            src="/images/logo.png"
            alt="EarlyJobs Logo"
            className="h-16 w-auto mx-auto mb-3"
          />
          <h1 className={`text-4xl font-bold ${isPDFGenerating && "mb-[1rem]"}`} style={{ color: "#1F2937" }}>
            CERTIFICATE OF ACHIEVEMENT
          </h1>
          <div className="w-32 h-1 mx-auto mb-4" style={{ background: "linear-gradient(to right, #F97316, #9333EA)" }} />
        </div>

        {/* Main Content */}
        <div className="text-center mb-6">
          <p className="text-lg mb-2" style={{ color: "#4B5563" }}>This is to certify that</p>
          <h2 className="text-3xl font-bold border-b-2 pb-2 inline-block mb-2" style={{ color: "#1F2937", borderColor: "#D1D5DB" }}>
            {candidateName}
          </h2>
          <p className="text-lg mb-2" style={{ color: "#4B5563" }}>has successfully completed the</p>
          <h3 className="text-2xl font-semibold mb-2" style={{ color: "#F97316" }}>{assessmentName}</h3>
          <p className="text-lg mb-2" style={{ color: "#4B5563" }}>with a score of</p>

          {/* Score badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 px-4 py-2 rounded-full w-fit mx-auto mb-6">
            <Badge
              className={`px-3 ${isPDFGenerating ? "" : "py-1"} rounded-full flex items-center gap-1 border`} 
              style={{ backgroundColor: "#FFFFFF", color: "#15803D", borderColor: "#16A34A" }}
            >
              <span className={`text-sm font-medium ${isPDFGenerating && "mb-[1rem]"}`} style={{ color: "#15803D" }}>
                Overall Score:
              </span>
              <span className={`text-sm font-bold ${isPDFGenerating && "mb-[1rem]"}`} style={{ color: "#16A34A" }}>
                {score}/10
              </span>
            </Badge>
            <Badge
              className="px-3 py-1 rounded-full flex items-center gap-1 border"
              style={{ backgroundColor: "#FFFFFF", color: "#15803D", borderColor: "#16A34A" }}
            >
              <span className={`text-sm font-medium ${isPDFGenerating && "mb-[1rem]"}`} style={{ color: "#15803D" }}>
                Communication:
              </span>
              <span className={`text-sm font-bold ${isPDFGenerating && "mb-[1rem]"}`} style={{ color: "#16A34A" }}>
                {commScore}/10
              </span>
            </Badge>
            <Badge
              className="px-3 py-1 rounded-full flex items-center gap-1 border"
              style={{ backgroundColor: "#FFFFFF", color: "#15803D", borderColor: "#16A34A" }}
            >
              <span className={`text-sm font-medium ${isPDFGenerating && "mb-[1rem]"}`} style={{ color: "#15803D" }}>
                Proctoring:
              </span>
              <span className={`text-sm font-bold ${isPDFGenerating && "mb-[1rem]"}`} style={{ color: "#16A34A" }}>
                {proctScore}/10
              </span>
            </Badge>
          </div>
        </div>

        {/* Skills Verified */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2" style={{ color: "#374151" }}>
            <CheckCircle className="h-5 w-5" style={{ color: "#16A34A" }} />
            <span className={`${isPDFGenerating && "mb-[1rem]"}`}>Skills Verified</span>
          </h4>
          <div className="flex flex-wrap justify-center gap-2 max-w-[9in] mx-auto">
            {skillsVerified?.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1"
                style={{ backgroundColor: "#EDE9FE", color: "#9333EA" }}
              >
                <span className={`${isPDFGenerating && "mb-[0.5rem]"}`}>{skill}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex justify-between items-end mt-12 px-12 ${isPDFGenerating && "mt-[1rem]"}`}
          style={{ position: "absolute", display: "flex", width: "100%", bottom: "24px" }}
        >
          <div className="text-center">
            <div className="w-48 border-b-2 mb-2 mx-auto" style={{ borderColor: "#9CA3AF" }}></div>
            <p className="text-sm" style={{ color: "#4B5563" }}>Authorized Signature</p>
            <p className={`text-xs ${isPDFGenerating && "mb-[0.5rem]"}`} style={{ color: "#6B7280" }}>
              EarlyJobs Certification Authority
            </p>
          </div>
          <div className="text-right space-y-2" style={{ color: "#4B5563" }}>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: "#4B5563" }} />
              <span className={`text-sm ${isPDFGenerating && "mb-[0.5rem]"}`} style={{ color: "#4B5563" }}>Date: {date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" style={{ color: "#4B5563" }} />
              <span className={`text-sm ${isPDFGenerating && "mb-[0.5rem]"}`} style={{ color: "#4B5563" }}>
                Certificate ID: {certificateId}
              </span>
            </div>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="absolute top-8 right-8 w-16 h-16 flex items-center justify-center">
          <img
            src="/images/qrcode_earlyjobs.png"
            className="border rounded-md"
            alt="QR Code"
            style={{ borderColor: "#D1D5DB" }}
          />
        </div>
        <div className={`absolute ${isPDFGenerating && "mb-[0.5rem]"} bottom-[4.5rem] left-[4.5rem]`}>
          <img
            src="/images/signature.png"
            alt="Signature of Cofounder"
            className="max-w-[11rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentsPage;
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../../../components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import InterestedCandidateForm from "../../../components/InterestedCandidateForm";
import Footer from "../../../components/pages/footer";
import Navbar from "../../../components/pages/navbar";
import html2pdf from "html2pdf.js";
import {
  getResultForCandidateAssessment,
  createCertificate,
  uploadPhoto,
  updateCertificateLink,
} from "../../../components/services/servicesapis";
import axiosInstance from "@/app/components/services/apiinterseptor";

const CandidateProfile = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [recording, setRecording] = useState([]);
  const [certificates, setCertificates] = useState([]); // State for certificates from database
  const [activeTab, setActiveTab] = useState("overview");
  const [isInterestDialogOpen, setIsInterestDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const assessmentsPerPage = 3;
  const router = useRouter();
  const { id } = useParams();
  const [isGeneratingCertificates, setIsGeneratingCertificates] = useState(false);
  const [generatingCertificateId, setGeneratingCertificateId] = useState(null);
  const hasCheckedCertificatesRef = useRef(false); // Track if we've already checked certificates
  const certificatesCheckInProgressRef = useRef(false); // Prevent concurrent checks

  const [assessmentTitles, setAssessmentTitles] = useState({}); // State for assessment titles

  // Utility to wait for images to load
  const waitForImages = (element: HTMLElement | null): Promise<void> => {
    if (!element) return Promise.resolve();
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
          img.addEventListener("error", () => {
            console.error(`Failed to load image: ${img.src}`);
            onImageLoad(); // Continue to avoid hanging
          });
        }
      });
    });
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);

        const interviewId = Array.isArray(id) ? id[0] : id;
        const response = await axiosInstance.get(`/interviews/getInterviewReport/${interviewId}`).catch((error) => {
          throw new Error(error.response?.data?.message || `Failed to fetch candidates (Status: ${error.response?.status})`);
        });

        console.log("Response received record:", response?.data?.data);
        
        
        
        const data =  response?.data?.data;
       
          const candidate = data;

          if (candidate) {
            setSelectedCandidate(candidate);
          } else {
            throw new Error("Candidate not found");
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

  // useEffect(() => {
  //   const fetchCandidateData = async () => {
  //     if (selectedCandidate) {
  //       try {
  //         setAssessmentResults([]);
  //         setRecording([]);
  //         setError(null);
  //         setLoading(true);

  //         // Fetch assessment titles first
  //         const titleUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/assessments/${selectedCandidate._id}`;
  //         const titleResponse = await fetch(titleUrl, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         if (!titleResponse.ok) {
  //           throw new Error(
  //             `Failed to fetch assessment titles (Status: ${titleResponse.status})`
  //           );
  //         }
  //         const titleData = await titleResponse.json();
  //         const titles = titleData.data.reduce((acc, assessment) => {
  //           acc[assessment._id] = assessment.title;
  //           return acc;
  //         }, {});
  //         setAssessmentTitles(titles);
  //         if (
  //           !selectedCandidate.assessmentsPaid ||
  //           selectedCandidate.assessmentsPaid.length === 0
  //         ) {
  //           throw new Error("No assessments available for this candidate");
  //         }

  //         const results = [];
  //         const recordings = [];

  //         // Process assessments after titles are fetched
  //         for (const assessment of selectedCandidate.assessmentsPaid) {
  //           const interviewId = assessment.interviewId;
  //           if (!interviewId) {
  //             console.warn(`No interviewId for assessment ${assessment._id}`);
  //             continue;
  //           }

  //           const assessmentTitle =
  //             titles[assessment.assessmentId] || "Unknown Assessment";
  //           console.log(
  //             `Processing assessment ${assessment.assessmentId} with title: ${assessmentTitle}`
  //           );

  //           // Fetch assessment results
  //           try {
  //             const resultUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getResultForCandidateAssessment/${interviewId}`;
  //             const resultResponse = await fetch(resultUrl, {
  //               method: "GET",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //             });
  //             if (!resultResponse.ok) {
  //               const errorData = await resultResponse.json().catch(() => ({}));
  //               throw new Error(
  //                 errorData.message ||
  //                   `Failed to fetch assessment results for interview ${interviewId}`
  //               );
  //             }
  //             const resultText = await resultResponse.text();
  //             const resultData = resultText ? JSON.parse(resultText) : {};
  //             if (resultData.success && resultData.data?.report?.reportSkills) {
  //               const report = resultData.data.report;
  //               const overallScore =
  //                 report.reportSkills.reduce(
  //                   (sum, skill) => sum + (skill.score || 0),
  //                   0
  //                 ) / report.reportSkills.length || "N/A";
  //               results.push({
  //                 interviewId,
  //                 assessmentId: assessment.assessmentId,
  //                 assessmentTitle,
  //                 overallScore,
  //                 reportScore: report.score || null,
  //                 communicationScore: report.communicationScore || null,
  //                 proctoringScore: resultData.data.proctoringEventsData?.proctoringEvents?.proctoringScore || null,
  //                 status: resultData.data.status === 2 ? "Completed" : "In Progress",
  //                 interviewSummary: report.overallSummary?.interviewSummary || [],
  //                 communicationSummary: report.overallSummary?.communicationSummary || [],
  //                 skills: report.reportSkills.map((skill) => ({
  //                   assessmentTitle: skill.skill || assessmentTitle,
  //                   score: skill.score != null ? skill.score : "N/A",
  //                   status:
  //                     resultData.data.status === 2
  //                       ? "Completed"
  //                       : "In Progress",
  //                   timeConsumed:
  //                     skill.timeConsumed != null ? skill.timeConsumed : "N/A",
  //                   strengths: skill.summary?.strengths || [],
  //                   weaknesses: skill.summary?.weakness || [],
  //                 })),
  //               });
  //             }
  //           } catch (err) {
  //             console.warn(
  //               `Error fetching results for interview ${interviewId}: ${err.message}`
  //             );
  //           }

  //           // Fetch recordings
  //           try {
  //             const recordingUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/getRecording/${interviewId}`;
  //             const recordingResponse = await fetch(recordingUrl, {
  //               method: "GET",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //             });
  //             if (!recordingResponse.ok) {
  //               const errorData = await recordingResponse
  //                 .json()
  //                 .catch(() => ({}));
  //               throw new Error(
  //                 errorData.message ||
  //                   `Failed to fetch recording for interview ${interviewId}`
  //               );
  //             }
  //             const recordingData = await recordingResponse.json();
  //             if (recordingData.success && recordingData.data) {
  //               recordings.push({
  //                 interviewId,
  //                 assessmentIdVelox: assessment.assessmentIdVelox,
  //                 assessmentTitle,
  //                 url: recordingData.data,
  //                 type: "video",
  //               });
  //             }
  //           } catch (err) {
  //             console.warn(
  //               `Error fetching recording for interview ${interviewId}: ${err.message}`
  //             );
  //           }
  //         }

  //         setAssessmentResults(results);
  //         setRecording(recordings);

  //         // if (results.length === 0 && recordings.length === 0) {
  //         //   <div>Candidate Didn't finish his</div>
  //         // }
  //       } catch (err) {
  //         setError(err.message);
  //         console.error("Fetch candidate data error:", err);
  //         toast.error(err.message || "Failed to load candidate data.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   if (selectedCandidate) {
  //     fetchCandidateData();
  //   }
  // }, [selectedCandidate]);

  // Fetch certificates from Certificate collection
  useEffect(() => {
    const fetchCertificates = async () => {
      if (!selectedCandidate || !selectedCandidate._id) return;

      try {
        const userId = selectedCandidate._id;
        const certificatesData = [];

        // First, try to fetch from /certificates/user/:userId endpoint
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          const certificatesResponse = await fetch(
            `${backendUrl}/certificates/user/${userId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (certificatesResponse.ok) {
            const certificatesDataFromApi = await certificatesResponse.json();
            if (certificatesDataFromApi.success && certificatesDataFromApi.data?.certificates) {
              const userCertificates = certificatesDataFromApi.data.certificates;
              
              // Map certificates to display format
              for (const cert of userCertificates) {
                if (cert.certificateLink) {
                  // Find matching assessment by interviewId
                  const matchingAssessment = selectedCandidate.assessmentsPaid?.find(
                    (assessment) => assessment.interviewId === cert.interviewId
                  );

                  certificatesData.push({
                    interviewId: cert.interviewId,
                    assessmentId: matchingAssessment?.assessmentId || cert.assessment?.shortId,
                    assessmentTitle: matchingAssessment 
                      ? (assessmentTitles[matchingAssessment.assessmentId] || cert.assessment?.title || "Unknown Assessment")
                      : (cert.assessment?.title || "Unknown Assessment"),
                    certificateLink: cert.certificateLink,
                    certificateId: cert.certificateNumber || cert._id,
                  });
                }
              }
            }
          }
        } catch (err) {
          console.warn("Error fetching certificates from user endpoint:", err);
        }

        // Fallback: Also check selectedCandidate.certificates array if it exists
        if (certificatesData.length === 0 && selectedCandidate.certificates && Array.isArray(selectedCandidate.certificates) && selectedCandidate.certificates.length > 0) {
          for (const certificateId of selectedCandidate.certificates) {
            if (!certificateId) continue;

            try {
              const certificateUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/certificates/${certificateId}`;
              const certificateResponse = await fetch(certificateUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });

              if (certificateResponse.ok) {
                const certificateData = await certificateResponse.json();
                const certificate = certificateData.data || certificateData;
                
                if (certificate && certificate.certificatelink) {
                  const matchingAssessment = selectedCandidate.assessmentsPaid?.find(
                    (assessment) => assessment.interviewId === certificate.interviewid
                  );

                  certificatesData.push({
                    interviewId: certificate.interviewid,
                    assessmentId: matchingAssessment?.assessmentId || certificate.assessmentid,
                    assessmentTitle: matchingAssessment 
                      ? (assessmentTitles[matchingAssessment.assessmentId] || "Unknown Assessment")
                      : "Unknown Assessment",
                    certificateLink: certificate.certificatelink,
                    certificateId: certificate.certificateno || certificate._id || certificateId,
                  });
                }
              }
            } catch (err) {
              console.warn(`Error fetching certificate ${certificateId}:`, err.message);
            }
          }
        }

        setCertificates(certificatesData);
        console.log(`Fetched ${certificatesData.length} certificates`);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setCertificates([]);
      }
    };

    if (selectedCandidate && Object.keys(assessmentTitles).length > 0) {
      fetchCertificates();
    }
  }, [selectedCandidate, assessmentTitles]);

  // Reset check flag when tab changes away from certificates
  useEffect(() => {
    if (activeTab !== "certificates") {
      hasCheckedCertificatesRef.current = false;
      certificatesCheckInProgressRef.current = false;
    }
  }, [activeTab]);

  // Auto-generate certificates when certificates tab is clicked
  useEffect(() => {
    const generateMissingCertificates = async () => {
      if (
        activeTab !== "certificates" ||
        !selectedCandidate ||
        !selectedCandidate.assessmentsPaid ||
        selectedCandidate.assessmentsPaid.length === 0 ||
        isGeneratingCertificates ||
        certificatesCheckInProgressRef.current ||
        hasCheckedCertificatesRef.current
      ) {
        return;
      }

      // Mark that we're checking to prevent concurrent calls
      certificatesCheckInProgressRef.current = true;

      try {
        setIsGeneratingCertificates(true);

        // Get userId from candidate
        const userId = selectedCandidate._id;
        if (!userId) {
          toast.error("User ID not found");
          setIsGeneratingCertificates(false);
          return;
        }

        // Fetch all certificates for this user from backend
        let userCertificates = [];
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          const certificatesResponse = await fetch(
            `${backendUrl}/certificates/user/${userId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (certificatesResponse.ok) {
            const certificatesData = await certificatesResponse.json();
            if (certificatesData.success && certificatesData.data?.certificates) {
              userCertificates = certificatesData.data.certificates;
              console.log(`Found ${userCertificates.length} existing certificates for user`);
            }
          } else {
            console.log("No certificates found or error fetching certificates");
          }
        } catch (err) {
          console.warn("Error fetching user certificates:", err);
          // Continue with generation even if fetch fails
        }

        // Check which assessments need certificates
        const assessmentsNeedingCertificates = [];

        for (const assessment of selectedCandidate.assessmentsPaid) {
          const interviewId = assessment.interviewId;
          if (!interviewId) continue;

          // Check if certificate already exists for this interview
          const hasCertificateLocally = certificates.some(
            (cert) => cert.interviewId === interviewId
          );

          // Check if certificate exists in backend data
          const hasCertificateInBackend = userCertificates.some(
            (cert) => cert.interviewId === interviewId
          );

          if (!hasCertificateLocally && !hasCertificateInBackend) {
            // Certificate doesn't exist, add to list for generation
            assessmentsNeedingCertificates.push(assessment);
          }
        }

        // Generate certificates for assessments that need them
        for (const assessment of assessmentsNeedingCertificates) {
          const interviewId = assessment.interviewId;
          if (!interviewId) continue;

          try {
            setGeneratingCertificateId(interviewId);
            toast.info(`Generating certificate for ${assessmentTitles[assessment.assessmentId] || "assessment"}...`);

            // Fetch assessment results
            const resultResponse = await getResultForCandidateAssessment(interviewId);
            if (!resultResponse.success || !resultResponse.data?.report) {
              console.warn(`No results found for interview ${interviewId}`);
              continue;
            }

            const report = resultResponse.data.report;
            const proctoringScore = resultResponse.data?.proctoringEventsData?.proctoringEvents?.proctoringScore || 0;
            const skillsVerified = report.reportSkills
              ?.filter((skill) => skill.score > 4)
              .map((skill) => skill.skill) || [];

            const certificateId = `EJ-CERT-${new Date().getFullYear()}-${interviewId.slice(0, 8)}`;
            const assessmentTitle = assessmentTitles[assessment.assessmentId] || "Unknown Assessment";

            // Get absolute URLs for images
            const logoUrl = window.location.origin + "/images/logo.png";
            const qrCodeUrl = window.location.origin + "/images/qrcode_earlyjobs.png";
            const signatureUrl = window.location.origin + "/images/signature.png";

            // Create certificate HTML element matching the Certificate component structure
            const certificateHTML = `
              <div id="certificate-temp-${interviewId}" style="width: 11in; height: 8.5in; overflow: hidden; background-color: #FFFFFF; position: relative;">
                <div style="width: 100%; height: 100%; overflow: hidden; background-color: #FFFFFF; border: 8px solid #F97316; position: relative; padding: 16px; box-sizing: border-box;">
                    <!-- Border Decorations -->
                    <div style="position: absolute; top: 8px; left: 8px; width: 32px; height: 32px; border-left: 4px solid #F97316; border-top: 4px solid #F97316;"></div>
                    <div style="position: absolute; top: 8px; right: 8px; width: 32px; height: 32px; border-right: 4px solid #F97316; border-top: 4px solid #F97316;"></div>
                    <div style="position: absolute; bottom: 8px; left: 8px; width: 32px; height: 32px; border-left: 4px solid #F97316; border-bottom: 4px solid #F97316;"></div>
                    <div style="position: absolute; bottom: 8px; right: 8px; width: 32px; height: 32px; border-right: 4px solid #F97316; border-bottom: 4px solid #F97316;"></div>

                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 16px;">
                      <img src="${logoUrl}" alt="EarlyJobs Logo" style="height: 64px; width: auto; margin: 0 auto 12px; display: block;" onerror="this.style.display='none';" />
                      <h1 style="font-size: 2.25rem; font-weight: bold; color: #1F2937; margin-bottom: 16px;">CERTIFICATE OF ACHIEVEMENT</h1>
                      <div style="width: 128px; height: 4px; margin: 0 auto 16px; background: linear-gradient(to right, #F97316, #9333EA);"></div>
                    </div>

                    <!-- Main Content -->
                    <div style="text-align: center; margin-bottom: 24px;">
                      <p style="font-size: 1.125rem; color: #4B5563; margin-bottom: 8px;">This is to certify that</p>
                      <h2 style="font-size: 1.875rem; font-weight: bold; color: #1F2937; border-bottom: 2px solid #D1D5DB; padding-bottom: 8px; display: inline-block; margin-bottom: 8px;">${selectedCandidate.name}</h2>
                      <p style="font-size: 1.125rem; color: #4B5563; margin-bottom: 8px;">has successfully completed the</p>
                      <h3 style="font-size: 1.5rem; font-weight: 600; color: #F97316; margin-bottom: 8px;">${assessmentTitle}</h3>
                      <p style="font-size: 1.125rem; color: #4B5563; margin-bottom: 8px;">with a score of</p>
                      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 24px;">
                        <span style="padding: 8px 12px; border-radius: 9999px; background: #FFFFFF; color: #15803D; border: 1px solid #16A34A; font-size: 0.875rem; font-weight: 600;">Overall Score: ${(selectedCandidate?.report?.score || 0).toFixed(1)}/10</span>
                        <span style="padding: 8px 12px; border-radius: 9999px; background: #FFFFFF; color: #15803D; border: 1px solid #16A34A; font-size: 0.875rem; font-weight: 600;">Communication: ${(report.communicationScore || 0).toFixed(1)}/10</span>
                        <span style="padding: 8px 12px; border-radius: 9999px; background: #FFFFFF; color: #15803D; border: 1px solid #16A34A; font-size: 0.875rem; font-weight: 600;">Proctoring: ${proctoringScore.toFixed(1)}/10</span>
                      </div>
                    </div>

                    <!-- Skills Verified -->
                    ${skillsVerified.length > 0 ? `
                    <div style="margin-bottom: 32px;">
                      <h4 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 16px; text-align: center; color: #374151;">Skills Verified</h4>
                      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 9in; margin: 0 auto;">
                        ${skillsVerified.map(skill => `<span style="padding: 4px 12px; border-radius: 4px; background: #EDE9FE; color: #9333EA; font-size: 0.875rem;">${skill}</span>`).join('')}
                      </div>
                    </div>
                    ` : ''}

                    <!-- Footer -->
                    <div style="position: absolute; bottom: 24px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 48px;">
                      <div style="text-align: center;">
                        <div style="width: 192px; border-bottom: 2px solid #9CA3AF; margin: 0 auto 8px;"></div>
                        <p style="font-size: 0.875rem; color: #4B5563;">Authorized Signature</p>
                        <p style="font-size: 0.75rem; color: #6B7280;">EarlyJobs Certification Authority</p>
                      </div>
                      <div style="text-align: right; color: #4B5563;">
                        <p style="font-size: 0.875rem; margin-bottom: 4px;">Date: ${new Date().toLocaleDateString()}</p>
                        <p style="font-size: 0.875rem;">Certificate ID: ${certificateId}</p>
                      </div>
                    </div>

                    <!-- QR Code -->
                    <div style="position: absolute; top: 32px; right: 32px; width: 64px; height: 64px; z-index: 10;">
                      <img src="${qrCodeUrl}" alt="QR Code" style="border: 1px solid #D1D5DB; border-radius: 4px; width: 100%; height: 100%; object-fit: contain; display: block;" onerror="this.style.display='none';" />
                    </div>
                    <!-- Signature -->
                    <div style="position: absolute; bottom: 72px; left: 72px; z-index: 10;">
                      <img src="${signatureUrl}" alt="Signature" style="max-width: 11rem; display: block;" onerror="this.style.display='none';" />
                    </div>
                </div>
              </div>
            `;

            // Create temporary element container
            const tempDiv = document.createElement("div");
            tempDiv.id = `certificate-wrapper-${interviewId}`;
            tempDiv.style.position = "fixed";
            tempDiv.style.top = "0";
            tempDiv.style.left = "0";
            tempDiv.style.width = "11in";
            tempDiv.style.height = "8.5in";
            tempDiv.style.zIndex = "-9999";
            tempDiv.style.pointerEvents = "none";
            tempDiv.style.overflow = "hidden";
            tempDiv.innerHTML = certificateHTML;
            document.body.appendChild(tempDiv);

            const certificateElement = document.getElementById(`certificate-temp-${interviewId}`);
            if (!certificateElement) {
              if (tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
              }
              throw new Error("Failed to create certificate element");
            }

            try {
              // Ensure element is properly styled for html2canvas
              if (certificateElement instanceof HTMLElement) {
                certificateElement.style.position = "relative";
                certificateElement.style.visibility = "visible";
                certificateElement.style.opacity = "1";
                certificateElement.style.display = "block";
                certificateElement.style.width = "11in";
                certificateElement.style.height = "8.5in";
              }

              // Wait for DOM to render
              await new Promise((resolve) => setTimeout(resolve, 500));
              
              // Wait for images to load
              await waitForImages(certificateElement);
              
              // Additional wait to ensure all content is rendered
              await new Promise((resolve) => setTimeout(resolve, 1000));
              
              // Verify element has content before generating PDF
              const hasContent = certificateElement.textContent && certificateElement.textContent.trim().length > 0;
              const imageCount = certificateElement.getElementsByTagName("img").length;
              const loadedImages = Array.from(certificateElement.getElementsByTagName("img")).filter(img => img.complete && img.naturalHeight !== 0).length;
              
              if (!hasContent) {
                throw new Error("Certificate element appears to be empty");
              }
              
              console.log("Certificate element ready for PDF generation", {
                hasContent,
                textLength: certificateElement.textContent?.length || 0,
                totalImages: imageCount,
                loadedImages: loadedImages,
                elementWidth: certificateElement.offsetWidth,
                elementHeight: certificateElement.offsetHeight,
                computedStyle: window.getComputedStyle(certificateElement).display
              });
              
              // Double check that images are loaded
              if (imageCount > 0 && loadedImages < imageCount) {
                console.warn(`Only ${loadedImages}/${imageCount} images loaded, waiting more...`);
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }

              // Generate PDF
              const opt = {
                margin: [0, 0, 0, 0],
                filename: `${certificateId}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: {
                  scale: 2,
                  useCORS: true,
                  allowTaint: false,
                  logging: true,
                  windowWidth: 1584,
                  windowHeight: 1224,
                  backgroundColor: "#FFFFFF",
                },
                jsPDF: {
                  unit: "in",
                  format: [11, 8.5],
                  orientation: "landscape",
                },
              };

              console.log("Starting PDF generation with options:", opt);
              console.log("Certificate element details:", {
                offsetWidth: certificateElement.offsetWidth,
                offsetHeight: certificateElement.offsetHeight,
                scrollWidth: certificateElement.scrollWidth,
                scrollHeight: certificateElement.scrollHeight,
                innerHTML: certificateElement.innerHTML.substring(0, 200) + "..."
              });
              const blob = await html2pdf().set(opt).from(certificateElement).output("blob");
              console.log("PDF generated, size:", blob.size);
              if (blob.size === 0) {
                throw new Error("Generated PDF is empty");
              }
              if (blob.size < 1000) {
                console.warn("PDF size is very small, might be blank:", blob.size);
              }

              // Clean up temporary element
              if (tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
              }

              // Upload PDF
              const file = new File([blob], `${certificateId}.pdf`, { type: "application/pdf" });
              const uploadResponse = await uploadPhoto(file, interviewId);
              const uploadedUrl = typeof uploadResponse === "string" ? uploadResponse : uploadResponse?.fileUrl;

              if (!uploadedUrl) {
                throw new Error("No URL returned from upload");
              }

              // Get userId
              const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
              const candidateDetailsResponse = await fetch(
                `${backendUrl}/candidate/id-by-interview/${interviewId}`,
                { method: "GET", headers: { "Content-Type": "application/json" } }
              );
              const candidateData = await candidateDetailsResponse.json();
              const userId = candidateData.userId;

              // Create certificate record
              const certificatePayload = {
                userid: userId,
                interviewid: interviewId,
                certificateno: certificateId,
                assessmentid: assessment.assessmentId,
                certificatelink: uploadedUrl,
              };

              const certificateResponse = await createCertificate(certificatePayload);
              const certificateDbId = certificateResponse.data.certificate._id;

              // Update certificate link in candidate
              await updateCertificateLink({
                userId: userId,
                interviewId: interviewId,
                certificateId: certificateDbId,
              });

              toast.success(`Certificate generated for ${assessmentTitle}!`);
            } catch (pdfError) {
              console.error("PDF generation error:", pdfError);
              // Clean up on error
              if (tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
              }
              throw pdfError;
            }
          } catch (err) {
            console.error(`Error generating certificate for ${interviewId}:`, err);
            toast.error(`Failed to generate certificate: ${err.message || "Unknown error"}`);
          } finally {
            setGeneratingCertificateId(null);
          }
        }

        // Mark as checked after completion
        hasCheckedCertificatesRef.current = true;

        // Refresh certificates after generation
        if (assessmentsNeedingCertificates.length > 0) {
          // Refetch candidate data to get updated certificates array
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/candidates`;
          const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              const updatedCandidate = data.data.find((c) => c._id === id);
              if (updatedCandidate) {
                setSelectedCandidate(updatedCandidate);
              }
            }
          }
        }
      } catch (err) {
        console.error("Error in certificate generation:", err);
        toast.error("Failed to generate certificates");
      } finally {
        setIsGeneratingCertificates(false);
        certificatesCheckInProgressRef.current = false;
      }
    };

    generateMissingCertificates();
  }, [activeTab, selectedCandidate?._id, assessmentTitles, id]); // Removed certificates and isGeneratingCertificates from dependencies

  const getInitials = (name) => {
    if (!name) return "NA";
    return String(name)
      .split(" ")
      .filter(Boolean)
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

  const getScoreTextColor = (score) => {
    if (score === "N/A" || score === null || score === undefined) return "text-gray-600";
    const numericScore = Number(score);
    if (numericScore < 2) return "text-red-600";
    if (numericScore <= 6) return "text-yellow-600";
    return "text-green-600";
  };

  // Pagination logic
  const indexOfLastAssessment = currentPage * assessmentsPerPage;
  const indexOfFirstAssessment = indexOfLastAssessment - assessmentsPerPage;
  const currentAssessments = assessmentResults.slice(
    indexOfFirstAssessment,
    indexOfLastAssessment
  );
  const totalPages = Math.ceil(assessmentResults.length / assessmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ---- Normalize API response shape from /interviews/getInterviewReport/:id ----
  const candidateDetails = selectedCandidate?.candidate || {};
  const displayName =
    [candidateDetails?.firstName, candidateDetails?.lastName].filter(Boolean).join(" ") ||
    selectedCandidate?.name ||
    "Candidate";
  const displayEmail = candidateDetails?.email || "";
  const displayPhone = candidateDetails?.phone || "";
  const report = selectedCandidate?.report || {};
  const recommendations = Array.isArray(report?.recommendations) ? report.recommendations : [];

  const normalizePoints = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean).map((v) => String(v));
    if (typeof value === "string") return value.trim() ? [value.trim()] : [];
    return [];
  };

  const extractPosNeg = (section: any): { positives: string[]; negatives: string[] } => {
    const positives =
      normalizePoints(section?.positives) ||
      normalizePoints(section?.positivePoints) ||
      normalizePoints(section?.pros) ||
      normalizePoints(section?.strengths) ||
      normalizePoints(section?.goodPoints) ||
      [];

    const negatives =
      normalizePoints(section?.negatives) ||
      normalizePoints(section?.negativePoints) ||
      normalizePoints(section?.cons) ||
      normalizePoints(section?.weaknesses) ||
      normalizePoints(section?.improvements) ||
      normalizePoints(section?.improvementPoints) ||
      [];

    return { positives, negatives };
  };

  const technical = extractPosNeg(report?.technical);
  const communication = extractPosNeg(report?.communication);

  const recordingUrl =
    selectedCandidate?.finalRecording ||
    selectedCandidate?.videoUrl ||
    (Array.isArray(selectedCandidate?.sequencialVideoUrl) ? selectedCandidate.sequencialVideoUrl?.[0]?.url : null) ||
    (Array.isArray(selectedCandidate?.sequencialVideoUrl) ? selectedCandidate.sequencialVideoUrl?.[0]?.videoUrl : null) ||
    null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-6 text-lg text-gray-600 font-medium">
                  Loading candidate profile...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-xl font-semibold text-red-600 mb-2">
                Error Loading Profile
              </p>
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
                              alt={displayName}
                              className="h-full w-full rounded-2xl object-cover"
                            />
                          ) : (
                            getInitials(displayName)
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                          {displayName}
                        </h1>
                        <div className="space-y-1">
                          {displayEmail && (
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                              <span className="font-semibold text-gray-800">Email:</span> {displayEmail}
                            </p>
                          )}
                          {displayPhone && (
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                              <span className="font-semibold text-gray-800">Phone:</span> {displayPhone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        router.push("/browse-interviewed-candidates")
                      }
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Close"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                      Review this candidate's interview report and recording. If your company is
                      interested in this candidate, express your interest below.
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
                    {["overview", "recording"].map((tab) => (
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
                    {activeTab === "overview" &&
                      (error ? (
                        <p className="text-red-600 text-base sm:text-lg">
                          Error: {error}
                        </p>
                      ) : (
                        <div className="space-y-8">
                          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                              Interview Report
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="bg-white rounded-xl p-4 border border-orange-200">
                                <p className="text-xs text-gray-600 mb-1">Overall Score</p>
                                <p className={`text-2xl font-bold ${getScoreTextColor(report?.score)}`}>
                                  {report?.score ?? 0}/10
                                </p>
                              </div>

                              <div className="bg-white rounded-xl p-4 border border-orange-200">
                                <p className="text-xs text-gray-600 mb-1">Status</p>
                                <p className="text-lg font-semibold text-green-600">
                                  {candidateDetails?.status || "completed"}
                                </p>
                              </div>

                              <div className="bg-white rounded-xl p-4 border border-orange-200">
                                <p className="text-xs text-gray-600 mb-1">Interview ID</p>
                                <p className="text-sm font-semibold text-gray-900 break-all">
                                  {Array.isArray(id) ? id[0] : id}
                                </p>
                              </div>
                            </div>
                          </div>

                          {recommendations.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                Recommendations
                              </h3>
                              <ul className="space-y-2">
                                {recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0">
                                    {String(rec)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {(technical.positives.length > 0 ||
                            technical.negatives.length > 0 ||
                            communication.positives.length > 0 ||
                            communication.negatives.length > 0) && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                  Technical
                                </h3>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-sm font-bold text-green-700 mb-2">Positive Points</h4>
                                    {technical.positives.length > 0 ? (
                                      <ul className="space-y-2">
                                        {technical.positives.map((p, idx) => (
                                          <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
                                            {p}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-sm text-gray-500">No positive points available.</p>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-orange-700 mb-2">Negative Points</h4>
                                    {technical.negatives.length > 0 ? (
                                      <ul className="space-y-2">
                                        {technical.negatives.map((n, idx) => (
                                          <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-orange-600 before:font-bold">
                                            {n}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-sm text-gray-500">No negative points available.</p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                  Communication
                                </h3>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-sm font-bold text-green-700 mb-2">Positive Points</h4>
                                    {communication.positives.length > 0 ? (
                                      <ul className="space-y-2">
                                        {communication.positives.map((p, idx) => (
                                          <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
                                            {p}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-sm text-gray-500">No positive points available.</p>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-orange-700 mb-2">Negative Points</h4>
                                    {communication.negatives.length > 0 ? (
                                      <ul className="space-y-2">
                                        {communication.negatives.map((n, idx) => (
                                          <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-orange-600 before:font-bold">
                                            {n}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-sm text-gray-500">No negative points available.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    {activeTab === "recording" &&
                      (recordingUrl ? (
                        <div className="space-y-6">
                          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                              Interview Recording
                            </h3>
                            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
                              <video controls className="w-full bg-black">
                                <source src={recordingUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <span className="text-3xl">🎥</span>
                          </div>
                          <p className="text-lg font-semibold text-gray-900 mb-2">
                            No Recordings Available
                          </p>
                          <p className="text-gray-600">
                            Interview recordings will appear here once
                            available.
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )
          )}
          {isInterestDialogOpen && (
            <InterestedCandidateForm
              isOpen={isInterestDialogOpen}
              onClose={() => setIsInterestDialogOpen(false)}
              candidateName={displayName}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CandidateProfile;

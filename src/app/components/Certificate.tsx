// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import html2pdf from "html2pdf.js";
// import { Card } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Award, Calendar, User, CheckCircle, Download, Share2, Copy } from "lucide-react";
// import { toast } from "sonner";
// import { uploadPhoto } from "../components/services/servicesapis";
// import {
//   FacebookShareButton,
//   LinkedinShareButton,
//   WhatsappShareButton,
//   FacebookIcon,
//   LinkedinIcon,
//   WhatsappIcon,
// } from "react-share";
// import copy from "copy-to-clipboard";

// interface CertificateProps {
//   candidateName: string;
//   assessmentName: string;
//   score: number;
//   date: string;
//   commScore: number;
//   proctScore: number;
//   skillsVerified: string[];
//   certificateId: string;
//   interviewId?: string;
//   isPDFGenerating?: boolean;
// }

// interface UploadResponse {
//   fileUrl?: string;
//   message?: string;
//   ok?: boolean;
// }

// const ShareCertificate = ({ shareUrl }: { shareUrl: string }) => {
//   const shareText =
//     "I just completed an assessment on earlyjobs.ai! 🎉\n\nCheck it out:";

//   const handleCopy = () => {
//     copy(`${shareUrl}`);
//     toast.success("Link copied to clipboard!");
//   };
//   console.log("shareUrl", shareUrl);

//   return (
//     <div className="flex flex-col items-start gap-3 bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-[12rem]">
//       <p className="text-sm font-semibold text-gray-800">Share via:</p>
//       <div className="flex flex-col gap-3">
//         <LinkedinShareButton
//           url={shareUrl}
//           title={shareText}
//           className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition"
//         >
//           <LinkedinIcon size={32} round />
//           <span className="text-gray-700 font-medium">LinkedIn</span>
//         </LinkedinShareButton>
//         <WhatsappShareButton
//           url={shareUrl}
//           title={shareText}
//           className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition"
//         >
//           <WhatsappIcon size={32} round />
//           <span className="text-gray-700 font-medium">WhatsApp</span>
//         </WhatsappShareButton>
//         <FacebookShareButton
//           url={shareUrl}
//           title={shareText}
//           className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition"
//         >
//           <FacebookIcon size={32} round />
//           <span className="text-gray-700 font-medium">Facebook</span>
//         </FacebookShareButton>
//         <button
//           onClick={handleCopy}
//           className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 p-2 rounded-md transition"
//         > 
//             <Copy className="h-4 w-4 mr-2" />
//            <span className="font-medium">Copy Link</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// const Certificate: React.FC<CertificateProps> = ({
//   candidateName,
//   assessmentName,
//   score,
//   date,
//   commScore,
//   proctScore,
//   skillsVerified,
//   certificateId,
//   isPDFGenerating,
// }) => {
//   return (
//     <div className="w-full h-full bg-white" id="certificate" style={{ overflow: "hidden" }}>
//       <div className="border-8 border-orange-500 relative h-full p-4">
//         {/* Border Decorations */}
//         <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-orange-500"></div>
//         <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-orange-500"></div>
//         <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-orange-500"></div>
//         <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-orange-500"></div>

//         {/* Header */}
//         <div className="text-center mb-4">
//           <img
//             src="/images/logo.png"
//             alt="EarlyJobs Logo"
//             className="h-16 w-auto mx-auto mb-3"
//           />
//           <h1 className={`text-4xl font-bold text-gray-800 ${isPDFGenerating && "mb-[1rem]"}`}>
//             CERTIFICATE OF ACHIEVEMENT
//           </h1>
//           <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-purple-600 mx-auto mb-4" />
//         </div>

//         {/* Main Content */}
//         <div className="text-center mb-6">
//           <p className="text-lg text-gray-600 mb-2">This is to certify that</p>
//           <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 inline-block mb-2">
//             {candidateName}
//           </h2>
//           <p className="text-lg text-gray-600 mb-2">has successfully completed the</p>
//           <h3 className="text-2xl font-semibold text-orange-600 mb-2">{assessmentName}</h3>
//           <p className="text-lg text-gray-600 mb-2">with a score of</p>

//           {/* Score badge */}
//           <div className="flex flex-wrap justify-center items-center gap-2 px-4 py-2 rounded-full w-fit mx-auto mb-6">
//             <Badge
//               className={`bg-white text-green-700 px-3 ${isPDFGenerating ? "" : "py-1"} rounded-full flex items-center gap-1 border border-green-600`}
//             >
//               <span className={`text-sm font-medium ${isPDFGenerating && "mb-[1rem]"}`}>
//                 Overall Score:
//               </span>
//               <span className={`text-sm font-bold text-green-600 ${isPDFGenerating && "mb-[1rem]"}`}>
//                 {score}/10
//               </span>
//             </Badge>
//             <Badge
//               className="bg-white text-green-700 px-3 py-1 rounded-full flex items-center gap-1 border border-green-600"
//             >
//               <span className={`text-sm font-medium ${isPDFGenerating && "mb-[1rem]"}`}>
//                 Communication:
//               </span>
//               <span className={`text-sm font-bold text-green-600 ${isPDFGenerating && "mb-[1rem]"}`}>
//                 {commScore}/10
//               </span>
//             </Badge>
//             <Badge
//               className="bg-white text-green-700 px-3 py-1 rounded-full flex items-center gap-1 border border-green-600"
//             >
//               <span className={`text-sm font-medium ${isPDFGenerating && "mb-[1rem]"}`}>
//                 Proctoring:
//               </span>
//               <span className={`text-sm font-bold text-green-600 ${isPDFGenerating && "mb-[1rem]"}`}>
//                 {proctScore}/10
//               </span>
//             </Badge>
//           </div>
//         </div>

//         {/* Skills Verified */}
//         <div className="mb-8">
//           <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center flex items-center justify-center gap-2">
//             <CheckCircle className="h-5 w-5 text-green-600" />
//             <span className={`${isPDFGenerating && "mb-[1rem]"}`}>Skills Verified</span>
//           </h4>
//           <div className="flex flex-wrap justify-center gap-2 max-w-[9in] mx-auto">
//             {skillsVerified?.map((skill, index) => (
//               <Badge
//                 key={index}
//                 variant="secondary"
//                 className="px-3 py-1 bg-purple-100 text-purple-700"
//               >
//                 <span className={`${isPDFGenerating && "mb-[0.5rem]"}`}>{skill}</span>
//               </Badge>
//             ))}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className={`flex justify-between items-end mt-12 px-12 ${isPDFGenerating && "mt-[1rem]"}`} style={{position: "absolute",
//     display: "flex",
//     width: "100%",
//     bottom: "24px"}}>
//           <div className="text-center">
//             <div className="w-48 border-b-2 border-gray-400 mb-2 mx-auto"></div>
//             <p className="text-sm text-gray-600">Authorized Signature</p>
//             <p className={`text-xs text-gray-500 ${isPDFGenerating && "mb-[0.5rem]"}`}>
//               EarlyJobs Certification Authority
//             </p>
//           </div>
//           <div className="text-right space-y-2 text-gray-600">
//             <div className="flex items-center gap-2">
//               <Calendar className="h-4 w-4" />
//               <span className={`text-sm ${isPDFGenerating && "mb-[0.5rem]"}`}>Date: {date}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <User className="h-4 w-4" />
//               <span className={`text-sm ${isPDFGenerating && "mb-[0.5rem]"}`}>
//                 Certificate ID: {certificateId}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* QR Code Placeholder */}
//         <div className="absolute top-8 right-8 w-16 h-16 flex items-center justify-center">
//           <img
//             src="/images/qrcode_earlyjobs.png"
//             className="border border-gray-300 rounded-md"
//             alt="QR Code"
//           />
//         </div>
//         <div className={`absolute ${isPDFGenerating && "mb-[0.5rem]"} bottom-[4.5rem] left-[4.5rem]`}>
//           <img
//             src="/images/signature.png"
//             alt="Signature of Cofounder"
//             className="max-w-[11rem]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const CertificateWithPDF: React.FC<CertificateProps> = ({
//   candidateName,
//   assessmentName,
//   score,
//   commScore,
//   proctScore,
//   interviewId,
//   date,
//   skillsVerified,
//   certificateId,
// }) => {
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isPDFGenerating, setIsPDFGenerating] = useState(true);
//   const [fileUrl, setFileUrl] = useState<string | null>(null);
//   const [showShareOptions, setShowShareOptions] = useState(false);

//   const certificateData: CertificateProps = {
//     candidateName,
//     assessmentName,
//     score,
//     date,
//     commScore,
//     proctScore,
//     skillsVerified: skillsVerified || [],
//     certificateId,
//     interviewId,
//     isPDFGenerating,
//   };
// useEffect(() => {
//   console.log("fileUrl", fileUrl);
// },[fileUrl])
//   const generateAndDownloadPDF = async () => {
//     if (!certificateRef.current) {
//       toast.error("Certificate content is not available.");
//       return;
//     }
//     setIsPDFGenerating(true);
//     try {
//       const opt = {
//         margin: [0, 0, 0, 0],
//         filename: `${certificateId}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true },
//         jsPDF: {
//           unit: "in",
//           format: [11, 8.5],
//           orientation: "landscape",
//         },
//       };

//       const blob = await html2pdf().set(opt).from(certificateRef.current).output("blob");
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${certificateId}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       toast.success("Certificate PDF downloaded successfully!");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       toast.error("Failed to generate PDF. Please try again.");
//     } finally {
//       setIsPDFGenerating(false);
//     }
//   };

//  const sendPDFToBackend = async () => {
//   if (!certificateRef.current || !interviewId || !certificateId) {
//     toast.error("Missing certificate, interview ID, or certificate ID.");
//     return;
//   }

//   try {
//     setIsPDFGenerating(true); // Set loading state at the start

//     const opt = {
//       margin: [0, 0, 0, 0],
//       filename: `${certificateId}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: {
//         unit: "in",
//         format: [11, 8.5],
//         orientation: "landscape",
//       },
//     };

//     const blob = await html2pdf().set(opt).from(certificateRef.current).output("blob");
//     const file = new File([blob], `${certificateId}.pdf`, { type: "application/pdf" });

//     const response = await uploadPhoto(file, interviewId);

//     if (response) {
//       // Validate response is a string or has a URL property
//       const fileUrl = typeof response === 'string' ? response : response.url;
//       if (!fileUrl || typeof fileUrl !== 'string') {
//         throw new Error("Invalid URL returned from upload");
//       }
//       setFileUrl(fileUrl);
//       toast.success("Certificate PDF uploaded successfully!");
//       return fileUrl;
//     } else {
//       throw new Error("Upload failed: No response from server");
//     }
//   } catch (error) {
//     console.error("Error uploading PDF:", error);
//     toast.error(
//       error instanceof Error ? error.message : "Failed to upload certificate. Please try again."
//     );
//   } finally {
//     setIsPDFGenerating(false); // Always reset loading state
//   }
// };

//   const handleDownloadAndSend = async () => {
//     try {
//       await generateAndDownloadPDF();
//       await sendPDFToBackend();
//     } catch (error) {
//       console.error("Error in handleDownloadAndSend:", error);
//     }
//   };
//   useEffect(() => {
//     sendPDFToBackend();

//   }, []);

//   const toggleShareOptions = () => {
//     if (!fileUrl) {
//       toast.error("Please download the certificate first to share it.");
//       return;
//     }
//     setShowShareOptions(!showShareOptions);
//   };
// try {
//   const url = new URL(fileUrl);
//   const parts = url.pathname.split("/"); // splits path into array

//   // Expected path format: /bucket-name/interviewId/fileName.pdf
//   // So we get last two parts
//   const interviewId = parts[parts.length - 2];
//   const fileWithExt = parts[parts.length - 1];

//   if (fileWithExt.endsWith(".pdf")) {
//     const fileName = fileWithExt.replace(".pdf", "");
//     setFileUrl(`https://earlyjobs.ai/certificate/${interviewId}/${fileName}`);
//   }
// } catch (error) {
//   console.error("Invalid URL:", error);
// }

//   return (
//     <div className="relative">
//       <Card className="shadow-lg">
//         <div
//           ref={certificateRef}
//           className="bg-white"
//           style={{
//             width: "11in",
//             height: "8.5in",
//             padding: "0.5in",
//             boxSizing: "border-box",
//             overflow: "hidden",
//           }}
//         >
//           <Certificate {...certificateData} />
//         </div>
//       </Card>

//       <div className="mt-6 flex justify-center space-x-6">
//         <button
//           onClick={handleDownloadAndSend}
//           className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition flex items-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={isPDFGenerating}
//         >
//           <Download className="h-5 w-5" />
//           <span className="font-semibold">Download Certificate</span>
//         </button>
//         <button
      
//           onClick={() => {toggleShareOptions();setShowShareOptions(!showShareOptions)}}
//           className="bg-purple-600 text-white p-[16px] rounded-full hover:bg-purple-700 transition flex items-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//         >
//           <Share2 className="h-5 w-5" />
//         </button>
//       </div>

//       {showShareOptions && fileUrl && (
//         <div className="mt-6 flex justify-center" style={{
//     position: "absolute",
//     bottom: "63px",
//     right: "18rem"
// }}>
//           <ShareCertificate shareUrl={fileUrl? `${fileUrl}` : ""} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CertificateWithPDF;








"use client";
import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Award, Calendar, User, CheckCircle, Download, Share2, Copy } from "lucide-react";
import { toast } from "sonner";
import { uploadPhoto } from "../components/services/servicesapis";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import copy from "copy-to-clipboard";

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
  isPDFGenerating?: boolean;
}

interface UploadResponse {
  fileUrl?: string;
  message?: string;
  ok?: boolean;
}

const ShareCertificate = ({ shareUrl }: { shareUrl: string }) => {
  const shareText = "I just completed an assessment on earlyjobs.ai! 🎉\n\nCheck it out:";

  const handleCopy = () => {
    copy(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-start gap-3 bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-[12rem]">
      <p className="text-sm font-semibold text-gray-800">Share via:</p>
      <div className="flex flex-col gap-3">
        <LinkedinShareButton
          url={shareUrl}
          title={shareText}
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition"
        >
          <LinkedinIcon size={32} round />
          <span className="text-gray-700 font-medium">LinkedIn</span>
        </LinkedinShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={shareText}
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition"
        >
          <WhatsappIcon size={32} round />
          <span className="text-gray-700 font-medium">WhatsApp</span>
        </WhatsappShareButton>
        <FacebookShareButton
          url={shareUrl}
          title={shareText}
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition"
        >
          <FacebookIcon size={32} round />
          <span className="text-gray-700 font-medium">Facebook</span>
        </FacebookShareButton>
        <button
          onClick={handleCopy}
          className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 p-2 rounded-md transition"
        >
          <Copy className="h-4 w-4 mr-2" />
          <span className="font-medium">Copy Link</span>
        </button>
      </div>
    </div>
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

      {/* Score badge */}
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

const CertificateWithPDF: React.FC<CertificateProps> = ({
  candidateName,
  assessmentName,
  score,
  commScore,
  proctScore,
  interviewId,
  date,
  skillsVerified,
  certificateId,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isPDFGenerating, setIsPDFGenerating] = useState(false); // Start as false
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const certificateData: CertificateProps = {
    candidateName,
    assessmentName,
    score,
    date,
    commScore,
    proctScore,
    skillsVerified: skillsVerified || [],
    certificateId,
    interviewId,
    isPDFGenerating,
  };

  useEffect(() => {
    // Only run URL transformation after fileUrl is set
    if (fileUrl) {
      try {
        const url = new URL(fileUrl);
        const parts = url.pathname.split('/');
        const interviewIdFromUrl = parts[parts.length - 2];
        const fileWithExt = parts[parts.length - 1];
        if (fileWithExt.endsWith('.pdf')) {
          const fileName = fileWithExt.replace('.pdf', '');
          setFileUrl(`https://earlyjobs.ai/certificate/${interviewIdFromUrl}/${fileName}`);
        }
      } catch (error) {
        console.error('Invalid URL:', error);
      }
    }
  }, [fileUrl]);

  const generateAndDownloadPDF = async () => {
    if (!certificateRef.current) {
      toast.error("Certificate content is not available.");
      return;
    }
    setIsPDFGenerating(true);
    try {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${certificateId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "in",
          format: [11, 8.5],
          orientation: "landscape",
        },
      };

      const blob = await html2pdf().set(opt).from(certificateRef.current).output("blob");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Certificate PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsPDFGenerating(false);
    }
  };

  const sendPDFToBackend = async () => {
    if (!certificateRef.current || !interviewId || !certificateId) {
      toast.error("Missing certificate, interview ID, or certificate ID.");
      return;
    }

    try {
      setIsPDFGenerating(true);

      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${certificateId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "in",
          format: [11, 8.5],
          orientation: "landscape",
        },
      };

      const blob = await html2pdf().set(opt).from(certificateRef.current).output("blob");
      const file = new File([blob], `${certificateId}.pdf`, { type: "application/pdf" });

      const response = await uploadPhoto(file, interviewId);
      console.log(response)
      if (response && (typeof response === 'string' || response.fileUrl)) {
        const fileUrl = typeof response === 'string' ? response : response.fileUrl;
        if (!fileUrl || typeof fileUrl !== 'string') {
          throw new Error("Invalid URL returned from upload");
        }
        setFileUrl(fileUrl);
        return fileUrl;
      } else {
        throw new Error("Upload failed: No valid response from server");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload certificate. Please try again."
      );
    } finally {
      setIsPDFGenerating(false);
    }
  };

  const handleDownloadAndSend = async () => {
    try {
      await generateAndDownloadPDF();
      await sendPDFToBackend();
    } catch (error) {
      console.error("Error in handleDownloadAndSend:", error);
    }
  };
  useEffect(() => {
    sendPDFToBackend();
  }, []);

  const toggleShareOptions = () => {
    if (!fileUrl) {
      toast.error("Please download the certificate first to share it.");
      return;
    }
    setShowShareOptions((prev) => !prev);
  };

  return (
    <div className="relative">
      <Card className="shadow-lg">
        <div
          ref={certificateRef}
          className="bg-white"
          style={{
            width: "11in",
            height: "8.5in",
            padding: "0.5in",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <Certificate {...certificateData} />
        </div>
      </Card>

      <div className="mt-6 flex justify-center space-x-6">
        <button
          onClick={handleDownloadAndSend}
          className="bg-[#F97316] text-white px-6 py-3 rounded-xl hover:bg-[#EA580C] transition flex items-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPDFGenerating}
        >
          <Download className="h-5 w-5" />
          <span className="font-semibold">Download Certificate</span>
        </button>
        <button
          onClick={toggleShareOptions}
          className="bg-[#9333EA] text-white p-[16px] rounded-full hover:bg-[#7E22CE] transition flex items-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {showShareOptions && fileUrl && (
        <div
          className="mt-6 flex justify-center"
          style={{ position: "absolute", bottom: "63px", right: "18rem" }}
        >
          <ShareCertificate shareUrl={fileUrl} />
        </div>
      )}
    </div>
  );
};

export default CertificateWithPDF;
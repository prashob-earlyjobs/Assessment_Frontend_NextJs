// app/airesume/page.tsx
"use client"
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Header from "./header";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Upload,
  Plus,
  FileText,
  Download,
  Zap,
  Briefcase,
  Sparkles
} from "lucide-react";

export default function AIResume() {

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF and Word files are supported.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse resume.");
      }

      const resumeData = await response.json();
      router.push(`/resumeBuilderFromPDF?resumeData=${encodeURIComponent(JSON.stringify(resumeData))}`);

      toast.success("Resume parsed successfully! Redirecting to builder...");
      setIsUploadDialogOpen(false);
    } catch (error: any) {
      console.error("Error parsing resume:", error);
      toast.error(error.message || "Failed to parse resume. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Simulate file input change event for upload
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        handleFileUpload({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-25 to-white">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Create Your Perfect Resume in
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {" "}
              Minutes
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Build professional resumes with AI assistance, beautiful templates,
            and instant PDF downloads. Get hired faster with our modern resume
            builder.
          </p>
          <div className="flex justify-center items-center space-x-8 mb-12 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>AI-Powered Suggestions</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-orange-600" />
              <span>Professional Templates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-green-500" />
              <span>Instant PDF Export</span>
            </div>
          </div>
        </div>
       <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
  {/* Upload Existing Resume Card */}
  <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
    <DialogTrigger asChild>
      <Card className="relative overflow-hidden border-0 shadow-md bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
          Upload Existing Resume
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm mb-4">
          Have a resume already? Upload it and we'll extract your information automatically using AI parsing.
        </CardDescription>
        <div className="flex flex-col space-y-2 mb-4 text-sm text-gray-600">
          <span className="flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            PDF Support
          </span>
          <span className="flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            DOCX Support
          </span>
        </div>
        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
          Upload & Parse Resume
          <Upload className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    </DialogTrigger>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center text-xl font-bold text-gray-900">
          Upload Resume
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-6">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Upload your resume (PDF or DOCX) to extract and prefill your information.
          </p>
        </div>
        <div
          className={`flex flex-col items-center justify-center border-2 rounded-xl px-6 py-8 transition-colors duration-200 cursor-pointer ${dragActive ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{ minHeight: "160px" }}
        >
          <Upload className="w-10 h-10 text-orange-500 mb-2" />
          <span className="text-gray-700 font-medium mb-2">
            Drag & drop your resume here, or click to select a file
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isUploading}
          >
            {isUploading ? "Parsing..." : "Upload"}
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Supports PDF and Word (.docx) files. Maximum file size: 5MB.
        </p>
      </div>
    </DialogContent>
  </Dialog>

  {/* Job Description Enhanced (JDE) Card */}
  <Link href="/airesume/jde" className="block">
    <Card className="relative overflow-hidden border-0 shadow-md bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Briefcase className="w-8 h-8 text-white" />
      </div>

      <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
        Job Description Enhanced
      </CardTitle>
      <CardDescription className="text-gray-600 text-sm mb-4">
        Create a resume optimized for specific job descriptions with AI assistance.
      </CardDescription>
      <div className="flex flex-col space-y-2 mb-4 text-sm text-gray-600">
        <span className="flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Job-Tailored AI
        </span>
        <span className="flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          ATS Optimized
        </span>
      </div>
      <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
        Build JDE Resume
        <Briefcase className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  </Link>

  {/* Create New Resume Card */}
  <Link href="/resumeBuilder" className="block">
    <Card className="relative overflow-hidden border-0 shadow-md bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Plus className="w-8 h-8 text-white" />
      </div>
      <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
        Create New Resume
      </CardTitle>
      <CardDescription className="text-gray-600 text-sm mb-4">
        Start fresh with our guided builder. Get AI suggestions and choose from beautiful templates.
      </CardDescription>
      <div className="flex flex-col space-y-2 mb-4 text-sm text-gray-600">
        <span className="flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          AI Assistance
        </span>
        <span className="flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Live Preview
        </span>
      </div>
      <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
        Start Building Resume
        <Plus className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  </Link>
</div>
         <div className="mt-20 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose EarlyJobs-Resume Builder?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-gray-600 text-sm">
                Smart suggestions for professional summaries and job
                descriptions
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Beautiful Templates
              </h4>
              <p className="text-gray-600 text-sm">
                Choose from modern, ATS-friendly resume templates
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Instant Export
              </h4>
              <p className="text-gray-600 text-sm">
                Download your perfect resume as a high-quality PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
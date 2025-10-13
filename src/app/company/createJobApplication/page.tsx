"use client";
import type React from "react";
import { toast } from "react-hot-toast";
import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Plus, X, ArrowRight, ArrowLeft, User, Briefcase, CheckCircle, MapPin, Phone, Mail, Languages, Award, Target, Building, Clock, Loader2, ChevronDown, Check, UploadCloud, Eye } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { createCompanyOnboarding } from "../../components/services/companiesapi";
import { uploadFile } from "../../components/services/companiesapi";

// Update the JobPostingFormData interface
interface JobPostingFormData {
  companyName: string;
  hrName: string;
  hrEmail: string;
  hrContact: string;
  jobTitle: string;
  jobCategory: string;
  shiftTimings: string;
  employmentType: string;
  workType: string;
  jobDescription: string;
  streetAddress: string;
  area: string;
  city: string;
  pincode: string;
  locationLink: string;
  minSalary: number | string;
  maxSalary: number | string;
  skills: string[];
  spokenLanguages: string[];
  noOfOpenings: number | string;
  hiringNeed: string;
  minQualification: string;
  totalExperience: number | string;
  logoUrl: string;
}

interface AddCandidateFormProps {
  onBack: () => void;
  onSubmit?: (data: JobPostingFormData) => void;
  refreshCandidates?: () => void;
  isPublic?: boolean;
}

export default function PublicCompanyOnboard({ onBack, onSubmit, refreshCandidates }: AddCandidateFormProps) {
  
  const { id } = useParams();
  const formTopRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<JobPostingFormData>({
    companyName: "",
    hrName: "",
    hrEmail: "",
    hrContact: "",
    jobTitle: "",
    jobCategory: "",
    shiftTimings: "",
    employmentType: "",
    workType: "",
    jobDescription: "",
    streetAddress: "",
    area: "",
    city: "",
    pincode: "",
    locationLink: "",
    minSalary: "",
    maxSalary: "",
    skills: [],
    spokenLanguages: [],
    noOfOpenings: "",
    hiringNeed: "",
    minQualification: "",
    totalExperience: "",
    logoUrl: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [currentSkill, setCurrentSkill] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [uploadedLogoURL, setUploadedLogoURL] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uploadLogo = async () => {
      setLogoLoading(true);
      try {
        if (logoFile && logoFileName) {
          const response = await uploadFile(logoFile, logoFileName);
          setUploadedLogoURL(response.fileUrl);
          setFormData(prev => ({ ...prev, logoUrl: response.fileUrl }));
        }
      } catch (e) {
        console.log(e);
        toast.error('Failed to upload logo');
      } finally {
        setLogoLoading(false);
      }
    };
    uploadLogo();
  }, [logoFile, logoFileName]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      setLogoFile(file);
    }
  };

  const clearLogo = () => {
    setLogoFileName(null);
    setLogoFile(null);
    setUploadedLogoURL(null);
    setFormData(prev => ({ ...prev, logoUrl: '' }));
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const handlePreviewLogo = () => {
    if (uploadedLogoURL) {
      window.open(uploadedLogoURL, '_blank');
    } else {
      toast.error("Logo URL not available. Please wait for the upload to complete.");
    }
  };

  // Qualification options with modern names
  const qualificationOptions = [
    { value: "10th", label: "Secondary Education (10th Grade)" },
    { value: "12th", label: "Higher Secondary Education (12th Grade)" },
    { value: "ITI", label: "Industrial Training Institute (ITI)" },
    { value: "Diploma", label: "Diploma" },
    { value: "Graduation (10 + 2 + 3)", label: "Bachelor's Degree (3 Years)" },
    { value: "Graduation (10 + 2 + 4)", label: "Bachelor's Degree (4 Years)" },
    { value: "Post Graduation", label: "Master's Degree" },
    { value: "PhD", label: "Doctorate (PhD)" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (showErrors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (errors[field]) {
          delete newErrors[field];
        }
        return newErrors;
      });
    }
  };

  const commonLanguages = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Odia",
    "Punjabi",
    "Assamese",
    "Maithili",
    "Urdu",
    "Nepali",
    "Konkani",
  ];

  const categoryOptions = [
    'Aviation',
    'Banking',
    'Insurance',
    'Oil And Gas',
    'Retail',
    'Education',
    'Consumer Goods',
    'Manufacturing',
    'Information Technology',
    'Health Care',
    'BPO',
    'ITES',
    'Entertainment',
    'Finance',
    'Textile',
    'Media and news',
    'Food processing',
    'Hospitality',
    'Construction',
    'Law',
    'Advertising',
    'E-commerce',
    'Other'
  ];

  const employmentTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship'
  ];

  const shiftTimingOptions = [
    'Day Shift',
    'Night Shift',
    'Rotational Shift',
    'Flexible'
  ];

  const workTypeOptions = [
    'remote',
    'hybrid',
    'on-site'
  ];

  const hiringNeedOptions = [
    'Immediate',
    'Urgent',
    'Within 1 Month',
    'Future'
  ];

  const addToArray = (
    fieldName: keyof JobPostingFormData,
    item: string,
    setItem: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (
      item.trim() !== "" &&
      Array.isArray(formData[fieldName]) &&
      !(formData[fieldName] as string[]).includes(item.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: [...(prev[fieldName] as string[]), item.trim()],
      }));
      setItem("");
      if (showErrors && errors[fieldName as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName as string];
          return newErrors;
        });
      }
    }
  };

  const removeFromArray = (fieldName: keyof JobPostingFormData, index: number) => {
    setFormData((prev) => {
      const newArray = [...(prev[fieldName] as string[])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [fieldName]: newArray,
      };
    });
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+91|91)?[0-9]{10}$/;
    if (cleanPhone.length === 10) {
      return /^[1-9]\d{9}$/.test(cleanPhone);
    }
    if (cleanPhone.startsWith('+91') && cleanPhone.length === 13) {
      const phoneNumber = cleanPhone.substring(3);
      return /^[2-9]\d{9}$/.test(phoneNumber);
    }
    if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
      const phoneNumber = cleanPhone.substring(2);
      return /^[2-9]\d{9}$/.test(phoneNumber);
    }
    return phoneRegex.test(cleanPhone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep1 = (): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.hrName.trim()) newErrors.hrName = "HR name is required";
    if (!formData.hrEmail.trim()) {
      newErrors.hrEmail = "HR email is required";
    } else if (!validateEmail(formData.hrEmail)) {
      newErrors.hrEmail = "Please enter a valid email address";
    }
    if (!formData.hrContact.trim()) {
      newErrors.hrContact = "HR contact number is required";
    } else if (!validatePhone(formData.hrContact)) {
      newErrors.hrContact = "Please enter a valid 10-digit phone number";
    }
    // if (!formData.logoUrl) newErrors.logoUrl = "Company logo is required";
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const validateStep2 = (): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.jobCategory) newErrors.jobCategory = "Job category is required";
    if (!formData.shiftTimings) newErrors.shiftTimings = "Shift timings is required";
    if (!formData.employmentType) newErrors.employmentType = "Employment type is required";
    if (!formData.workType) newErrors.workType = "Work type is required";
    if (!formData.jobDescription.trim()) newErrors.jobDescription = "Job description is required";
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required";
    if (!formData.area.trim()) newErrors.area = "Area is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!formData.locationLink.trim()) newErrors.locationLink = "Location link is required";
    if (!formData.minSalary) newErrors.minSalary = "Minimum salary is required";
    if (!formData.maxSalary) newErrors.maxSalary = "Maximum salary is required";
    if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";
    if (formData.spokenLanguages.length === 0) newErrors.spokenLanguages = "At least one language is required";
    if (!formData.noOfOpenings) newErrors.noOfOpenings = "Number of openings is required";
    if (!formData.hiringNeed) newErrors.hiringNeed = "Hiring need is required";
    if (!formData.minQualification) newErrors.minQualification = "Minimum qualification is required";
    if (!formData.totalExperience) newErrors.totalExperience = "Total experience is required";
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const validateAllFields = () => {
    const step1Validation = validateStep1();
    const step2Validation = validateStep2();
    const combinedErrors = { ...step1Validation.errors, ...step2Validation.errors };
    const isValid = Object.keys(combinedErrors).length === 0;
    return { isValid, errors: combinedErrors };
  };

  const handleNext = () => {
    const validation = validateStep1();
    if (!validation.isValid) {
      setErrors(validation.errors);
      setShowErrors(true);
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }
    setShowErrors(false);
    setDirection(1);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(1);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validation = validateAllFields();
      if (!validation.isValid) {
        setErrors(validation.errors);
        setShowErrors(true);
        const firstErrorField = Object.keys(validation.errors)[0];
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
        // If error is in step 1, go back to step 1
        if (['companyName', 'hrName', 'hrEmail', 'hrContact', 'logoUrl'].includes(firstErrorField)) {
          handleBack();
        }
        return;
      }

      setIsSubmitting(true);

      try {
        const normalizedData: any = {
          ...formData,
          skills: formData.skills.length > 0 ? formData.skills : ["General"],
          spokenLanguages: formData.spokenLanguages.length > 0 ? formData.spokenLanguages : ["English"],
        };

        const response = await createCompanyOnboarding(normalizedData);
        setSuccessMessage("Your job posting has been successfully created! Thank you for posting.");
        setShowSuccessPopup(true);

        if (onSubmit) {
          onSubmit(formData);
        }

        if (refreshCandidates) {
          refreshCandidates();
        }
      } catch (error: any) {
        console.error("Error creating job posting:", error.message);
        if (error.response?.data?.message) {
          if (error.response.data.message.includes("duplicate") || error.response.data.message.includes("already exists")) {
            if (error.response.data.message.toLowerCase().includes("email")) {
              toast.error("This email is already registered. Please use a different email.");
            }
            if (error.response.data.message.toLowerCase().includes("phone") || error.response.data.message.toLowerCase().includes("mobile")) {
              toast.error("This mobile number is already registered. Please use a different number.");
            }
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, refreshCandidates]
  );

  const getInputClassName = (fieldName: string, baseClassName: string = "") => {
    const hasError = showErrors && errors[fieldName];
    const errorClasses = hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50" : "";
    return `${baseClassName} ${errorClasses}`.trim();
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card ref={formTopRef} className="shadow-2xl rounded-3xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden w-full">
            <CardHeader
              className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100"
              style={{ display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: "center", alignItems: "center" }}
            >
              <div>
                <img
                  src='/images/logo.png'
                  alt="TalentHub Logo"
                  className="h-16 lg:h-16 cursor-pointer"
                  onClick={() => window.location.href = '/'}
                />
              </div>

              <div className="flex flex-col justify-start mt-3">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {currentStep === 1 ? "Company Details" : "Job Details"}
                </CardTitle>
                <p className="text-gray-600 font-medium mt-2">
                  {currentStep === 1 ? "Please provide your company information and HR details" : "Please provide the job details"}
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {currentStep === 1 ? (
                    // Step 1: Company Details
                    <div className="space-y-6">
                      {/* Logo Upload Section */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <UploadCloud className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Company Logo *</h3>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <UploadCloud className="h-4 w-4 text-gray-500" />
                            Logo File
                          </Label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Input
                              type="file"
                              ref={logoInputRef}
                              onChange={handleLogoUpload}
                              className="hidden"
                              accept="image/*"
                            />
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => logoInputRef.current?.click()}
                              className="flex items-center gap-3 h-12 px-6 rounded-xl border-2 border-dashed border-orange-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 w-full sm:w-auto font-medium"
                            >
                              <UploadCloud className="h-5 w-5 text-orange-500" />
                              <span className="truncate">
                                {logoFileName ? logoFileName : "Choose Logo File"}
                              </span>
                            </Button>
                            {logoFileName && (
                              <>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={clearLogo}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                                  disabled={logoLoading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={handlePreviewLogo}
                                  className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50 rounded-xl font-medium"
                                  disabled={logoLoading || !uploadedLogoURL}
                                >
                                  <Eye className="h-4 w-4" />
                                  Preview
                                </Button>
                              </>
                            )}
                          </div>
                          {logoFileName && !logoLoading && uploadedLogoURL && (
                            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-medium text-green-800">{logoFileName} uploaded successfully</span>
                            </div>
                          )}
                          {logoLoading && (
                            <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                              <span className="text-sm font-medium text-blue-800">Uploading logo...</span>
                            </div>
                          )}
                          {showErrors && errors.logoUrl && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.logoUrl}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Building className="h-4 w-4 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Company Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="companyName" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            Company Name *
                          </Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            placeholder="Enter Company Name"
                            className={getInputClassName("companyName", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                            required
                          />
                          {showErrors && errors.companyName && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.companyName}
                            </p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="hrName" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            HR Name *
                          </Label>
                          <Input
                            id="hrName"
                            value={formData.hrName}
                            onChange={(e) => handleInputChange("hrName", e.target.value)}
                            placeholder="Enter HR Name"
                            className={getInputClassName("hrName", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                            required
                          />
                          {showErrors && errors.hrName && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.hrName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="hrEmail" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            HR Email *
                          </Label>
                          <Input
                            id="hrEmail"
                            type="email"
                            value={formData.hrEmail}
                            onChange={(e) => handleInputChange("hrEmail", e.target.value)}
                            placeholder="Enter HR Email"
                            className={getInputClassName("hrEmail", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                            required
                          />
                          {showErrors && errors.hrEmail && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.hrEmail}
                            </p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="hrContact" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            HR Contact No. *
                          </Label>
                          <Input
                            id="hrContact"
                            value={formData.hrContact}
                            onChange={(e) => handleInputChange("hrContact", e.target.value)}
                            placeholder="Enter HR Contact No."
                            className={getInputClassName("hrContact", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                            required
                          />
                          {showErrors && errors.hrContact && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.hrContact}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Step 2: Job Details
                    <>
                      {/* Job Information Section */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Job Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="jobTitle" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-gray-500" />
                              Job Title *
                            </Label>
                            <Input
                              id="jobTitle"
                              value={formData.jobTitle}
                              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                              placeholder="Enter Job Title"
                              className={getInputClassName("jobTitle", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              required
                            />
                            {showErrors && errors.jobTitle && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.jobTitle}
                              </p>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="jobCategory" className="text-sm font-bold text-gray-700">Job Category *</Label>
                            <Select
                              value={formData.jobCategory}
                              onValueChange={(value) => handleInputChange("jobCategory", value)}
                            >
                              <SelectTrigger className={getInputClassName("jobCategory", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                {categoryOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {showErrors && errors.jobCategory && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.jobCategory}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="shiftTimings" className="text-sm font-bold text-gray-700">Shift Timings *</Label>
                            <Select
                              value={formData.shiftTimings}
                              onValueChange={(value) => handleInputChange("shiftTimings", value)}
                            >
                              <SelectTrigger className={getInputClassName("shiftTimings", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                                <SelectValue placeholder="Select Shift Timings" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                {shiftTimingOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {showErrors && errors.shiftTimings && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.shiftTimings}
                              </p>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="employmentType" className="text-sm font-bold text-gray-700">Employment Type *</Label>
                            <Select
                              value={formData.employmentType}
                              onValueChange={(value) => handleInputChange("employmentType", value)}
                            >
                              <SelectTrigger className={getInputClassName("employmentType", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                                <SelectValue placeholder="Select Employment Type" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                {employmentTypeOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {showErrors && errors.employmentType && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.employmentType}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="workType" className="text-sm font-bold text-gray-700">Work Type *</Label>
                            <Select
                              value={formData.workType}
                              onValueChange={(value) => handleInputChange("workType", value)}
                            >
                              <SelectTrigger className={getInputClassName("workType", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                                <SelectValue placeholder="Select Work Type" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                {workTypeOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {showErrors && errors.workType && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.workType}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="jobDescription" className="text-sm font-bold text-gray-700">Job Description *</Label>
                          <Textarea
                            id="jobDescription"
                            value={formData.jobDescription}
                            onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                            placeholder="Enter Job Description"
                            rows={4}
                            className={getInputClassName("jobDescription", "resize-none rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                            required
                          />
                          {showErrors && errors.jobDescription && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.jobDescription}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Location Details Section */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Location Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="streetAddress" className="text-sm font-bold text-gray-700">Street Address *</Label>
                            <Input
                              id="streetAddress"
                              value={formData.streetAddress}
                              onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                              placeholder="Enter Street Address"
                              className={getInputClassName("streetAddress", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              required
                            />
                            {showErrors && errors.streetAddress && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.streetAddress}
                              </p>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="area" className="text-sm font-bold text-gray-700">Area *</Label>
                            <Input
                              id="area"
                              value={formData.area}
                              onChange={(e) => handleInputChange("area", e.target.value)}
                              placeholder="Enter Area"
                              className={getInputClassName("area", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              required
                            />
                            {showErrors && errors.area && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.area}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="city" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              City *
                            </Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              placeholder="Enter City"
                              className={getInputClassName("city", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              required
                            />
                            {showErrors && errors.city && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.city}
                              </p>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="pincode" className="text-sm font-bold text-gray-700">Pincode *</Label>
                            <Input
                              id="pincode"
                              value={formData.pincode}
                              onChange={(e) => handleInputChange("pincode", e.target.value)}
                              placeholder="Enter Pincode"
                              className={getInputClassName("pincode", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              required
                            />
                            {showErrors && errors.pincode && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.pincode}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="locationLink" className="text-sm font-bold text-gray-700">Location Link *</Label>
                          <Input
                            id="locationLink"
                            value={formData.locationLink}
                            onChange={(e) => handleInputChange("locationLink", e.target.value)}
                            placeholder="Enter Location Link"
                            className={getInputClassName("locationLink", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                            required
                          />
                          {showErrors && errors.locationLink && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.locationLink}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Salary Section */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Award className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Salary Details</h3>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-bold text-gray-700">Salary * (Monthly)</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label htmlFor="minSalary" className="text-sm font-bold text-gray-700">Minimum - INR *</Label>
                              <Input
                                id="minSalary"
                                type="number"
                                min="0"
                                value={formData.minSalary}
                                onChange={(e) => handleInputChange("minSalary", e.target.value)}
                                placeholder="₹ - INR"
                                className={getInputClassName("minSalary", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                                required
                              />
                              {showErrors && errors.minSalary && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <X className="h-4 w-4" />
                                  {errors.minSalary}
                                </p>
                              )}
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="maxSalary" className="text-sm font-bold text-gray-700">Maximum - INR *</Label>
                              <Input
                                id="maxSalary"
                                type="number"
                                min="0"
                                value={formData.maxSalary}
                                onChange={(e) => handleInputChange("maxSalary", e.target.value)}
                                placeholder="₹ - INR"
                                className={getInputClassName("maxSalary", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                                required
                              />
                              {showErrors && errors.maxSalary && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                  <X className="h-4 w-4" />
                                  {errors.maxSalary}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Target className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Skills *</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              placeholder="Ex: MS Excel"
                              className={getInputClassName("skills", "h-12 flex-1 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addToArray("skills", currentSkill, setCurrentSkill);
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => addToArray("skills", currentSkill, setCurrentSkill)}
                              className="h-12 px-6 rounded-xl border-orange-300 text-orange-600 hover:bg-orange-50 font-medium"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">Type a Skill and click 'Add' button to add it to the list</p>
                          {showErrors && errors.skills && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.skills}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-4">
                            {formData.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="gap-2 py-2 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-medium">
                                {skill}
                                <X
                                  className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                                  onClick={() => removeFromArray("skills", index)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Languages Section */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Languages className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Spoken Languages *</h3>
                        </div>
                        <div className="space-y-4">
                          <Select
                            value={selectedLanguage}
                            onValueChange={(value) => {
                              if (value && !formData.spokenLanguages.includes(value)) {
                                setFormData((prev) => ({
                                  ...prev,
                                  spokenLanguages: [...prev.spokenLanguages, value],
                                }));
                                setSelectedLanguage("");
                                if (showErrors && errors.spokenLanguages) {
                                  setErrors((prev) => {
                                    const newErrors = { ...prev };
                                    delete newErrors.spokenLanguages;
                                    return newErrors;
                                  });
                                }
                              }
                            }}
                          >
                            <SelectTrigger className={getInputClassName("spokenLanguages", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                              <SelectValue placeholder="Select a language to add" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              {commonLanguages
                                .filter(lang => !formData.spokenLanguages.includes(lang))
                                .map((lang) => (
                                  <SelectItem key={lang} value={lang}>
                                    {lang}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          {showErrors && errors.spokenLanguages && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <X className="h-4 w-4" />
                              {errors.spokenLanguages}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-4">
                            {formData.spokenLanguages.map((language, index) => (
                              <Badge key={index} variant="secondary" className="gap-2 py-2 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-medium">
                                {language}
                                <X
                                  className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                                  onClick={() => removeFromArray("spokenLanguages", index)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Additional Job Details */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Additional Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="noOfOpenings" className="text-sm font-bold text-gray-700">No of Openings *</Label>
                            <Input
                              id="noOfOpenings"
                              type="number"
                              min="1"
                              value={formData.noOfOpenings}
                              onChange={(e) => handleInputChange("noOfOpenings", e.target.value)}
                              placeholder="Enter No of Openings"
                              className={getInputClassName("noOfOpenings", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              required
                            />
                            {showErrors && errors.noOfOpenings && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.noOfOpenings}
                              </p>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="hiringNeed" className="text-sm font-bold text-gray-700">Hiring Need *</Label>
                            <Select
                              value={formData.hiringNeed}
                              onValueChange={(value) => handleInputChange("hiringNeed", value)}
                            >
                              <SelectTrigger className={getInputClassName("hiringNeed", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                                <SelectValue placeholder="Select Hiring Need" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                {hiringNeedOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {showErrors && errors.hiringNeed && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.hiringNeed}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="minQualification" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                              <Award className="h-4 w-4 text-gray-500" />
                              Minimum Qualification *
                            </Label>
                            <Select
                              value={formData.minQualification}
                              onValueChange={(value) => handleInputChange("minQualification", value)}
                            >
                              <SelectTrigger className={getInputClassName("minQualification", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                                <SelectValue placeholder="Select Qualification" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl max-h-60">
                                {qualificationOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    <div className="flex flex-col">
                                      <span className="font-medium">{option.label}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {showErrors && errors.minQualification && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.minQualification}
                              </p>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="totalExperience" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              Total Experience (In years) *
                            </Label>
                            <Input
                              id="totalExperience"
                              type="number"
                              min="0"
                              value={formData.totalExperience}
                              onChange={(e) => handleInputChange("totalExperience", e.target.value)}
                              placeholder="Enter Total Experience (In years)"
                              className={getInputClassName("totalExperience", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                              required
                            />
                            {showErrors && errors.totalExperience && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <X className="h-4 w-4" />
                                {errors.totalExperience}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center items-center mt-12 pt-8 border-t-2 border-gray-200">
                {currentStep === 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="gap-2 px-4 py-2 h-auto rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex justify-between w-full">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="gap-2 px-4 py-2 h-auto rounded-lg font-semibold text-base border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gap-2 px-4 py-2 h-auto rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating Job Posting...
                        </>
                      ) : (
                        <>
                          Submit
                          <Plus className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
              style={{ margin: '0' }}
              onClick={() => setShowSuccessPopup(false)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Job Posting Created Successfully!</h3>
                <p className="text-gray-600 mb-4">{successMessage}</p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowSuccessPopup(false);
                      setSuccessMessage(null);
                      setFormData({
                        companyName: "",
                        hrName: "",
                        hrEmail: "",
                        hrContact: "",
                        jobTitle: "",
                        jobCategory: "",
                        shiftTimings: "",
                        employmentType: "",
                        workType: "",
                        jobDescription: "",
                        streetAddress: "",
                        area: "",
                        city: "",
                        pincode: "",
                        locationLink: "",
                        minSalary: "",
                        maxSalary: "",
                        skills: [],
                        spokenLanguages: [],
                        noOfOpenings: "",
                        hiringNeed: "",
                        minQualification: "",
                        totalExperience: "",
                        logoUrl: "",
                      });
                      setCurrentStep(1);
                    }}
                    className="rounded-xl border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Add Another Job
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Creating Job Posting...</h3>
              <p className="text-gray-600 mb-4">
                We're processing your job information.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                You'll be redirected shortly...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
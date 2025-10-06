"use client"
import type React from "react";
import { toast } from "react-hot-toast";
import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../components/ui/command";
import { Plus, X, UploadCloud, ArrowRight, ArrowLeft, ArrowLeftCircle, User, Briefcase, CheckCircle, MapPin, Phone, Mail, Calendar, FileText, Languages, Award, Target, Building, Clock, Loader2, Search, ChevronDown, Check, Eye } from 'lucide-react';
import { createApplication, createTalentPoolcandidatePublic, ILocationDetails } from "../../../components/services/candidateapi";
//import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { generateGeminiContentFromResume, uploadFile } from "../../../components/services/usersapi";

// Job interface for API response
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  workType?: string;
  id?: string;
}

interface GetJobsResponse {
  jobs: Job[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
}

// Update the CandidateFormData interface to match backend expectations
interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  fatherName: string;
  dateOfBirth: string; // ISO 8601 date string
  gender: 'Male' | 'Female' | 'Other';
  aadharNumber?: string; // Made optional
  highestQualification: string;
  currentLocationDetails: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    fullAddress: string;
  };
  spokenLanguages: string[];
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  preferredJobCategories: string[];
  preferredEmploymentTypes: string[];
  preferredWorkTypes: ('remote' | 'hybrid' | 'on-site')[];
}

interface AddCandidateFormProps {

  onSubmit?: (data: CandidateFormData) => void;
  refreshCandidates?: () => void;
  isPublic?: boolean;
}

export interface ICreateTallentPoolFormData {
  name: string;
  email: string;
  phone: string;
  fatherName: string;
  dateOfBirth: string; // ISO 8601 date string
  gender: 'Male' | 'Female' | 'Other';
  aadharNumber?: string;
  highestQualification: string;
  currentLocationDetails: ILocationDetails;
  spokenLanguages: string[];
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  preferredJobCategories: string[];
  preferredEmploymentTypes: string[];
  preferredWorkTypes: ('remote' | 'hybrid' | 'on-site')[];
  resume?: string;
}

export default function PublicTalentPoolForm({  onSubmit, refreshCandidates }: AddCandidateFormProps) {
  //const navigate = useNavigate();
  const { id } = useParams();
  const apiClient = createApplication;
  const formTopRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<CandidateFormData>({
    name: "",
    email: "",
    phone: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "Male",
    aadharNumber: "",
    highestQualification: "",
    currentLocationDetails: {
      street: "",
      area: "",
      city: "",
      pincode: "",
      fullAddress: "",
    },
    spokenLanguages: [],
    totalExperienceYears: 0,
    totalExperienceMonths: 0,
    skills: [],
    preferredJobCategories: [],
    preferredEmploymentTypes: [],
    preferredWorkTypes: [],
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentJobCategory, setCurrentJobCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [uploadedURL, setUploadedURL] = useState<string | null>(null);

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [jobSearchTerm, setJobSearchTerm] = useState("");

  // Searchable dropdown states
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openEmploymentTypeDropdown, setOpenEmploymentTypeDropdown] = useState(false);

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
    setFormData((prev) => {
      const newFormData = { ...prev } as any;
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        newFormData[parent] = { ...newFormData[parent], [child]: value };
      } else {
        newFormData[field] = value;
      }
      return newFormData as CandidateFormData;
    });

    if (showErrors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (errors[field]) {
          delete newErrors[field];
        }
        if (field.includes(".")) {
          const [parent, child] = field.split(".");
          delete newErrors[child];
          delete newErrors[`${parent}.${child}`];
        }
        if (field === "currentLocationDetails.city") {
          delete newErrors["city"];
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

  const addToArray = (
    fieldName: keyof CandidateFormData,
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

  const removeFromArray = (fieldName: keyof CandidateFormData, index: number) => {
    setFormData((prev) => {
      const newArray = [...(prev[fieldName] as string[])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [fieldName]: newArray,
      };
    });
  };

  const handleCategorySelect = (category: string) => {
    if (!formData.preferredJobCategories.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        preferredJobCategories: [...prev.preferredJobCategories, category]
      }));
      if (showErrors && errors.preferredJobCategories) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.preferredJobCategories;
          return newErrors;
        });
      }
    }
    setOpenCategoryDropdown(false);
  };

  const handleEmploymentTypeSelect = (type: string) => {
    if (!formData.preferredEmploymentTypes.includes(type)) {
      setFormData((prev) => ({
        ...prev,
        preferredEmploymentTypes: [...prev.preferredEmploymentTypes, type]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredEmploymentTypes: prev.preferredEmploymentTypes.filter(t => t !== type)
      }));
    }
    if (showErrors && errors.preferredEmploymentTypes && formData.preferredEmploymentTypes.length === 0) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.preferredEmploymentTypes;
        return newErrors;
      });
    }
  };

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resloading, setResloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchResume=async ()=>{
      setResloading(true);

      try{
        if (resumeFile && resumeFileName){
          
          const response =await uploadFile(resumeFile,resumeFileName);
          console.log(response);
          setUploadedURL(response.fileUrl);
        }
        if(resumeFile){
                  const response =await generateGeminiContentFromResume(resumeFile);
                  console.log(response);
                  setFormData((prev) => ({
                    ...prev,
                    ...response.data,
        
        }))}
      }
      catch(e){
        console.log(e);
      }
      finally{
        setResloading(false);
      }
    };
  fetchResume()
    
  },[resumeFile,resumeFileName])

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeFile(file);
    }
  };

  const clearResume = () => {
    setResumeFileName(null);
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateAadhar = (aadhar: string): boolean => {
    if (!aadhar.trim()) return true; // Aadhar is optional, so empty is valid
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar.replace(/\s/g, ''));
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
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ? age - 1
        : age;
      if (actualAge < 16) {
        newErrors.dateOfBirth = "Candidate must be at least 16 years old";
      }
    }
    if (!formData.currentLocationDetails.city.trim()) newErrors.city = "City is required";
    if (formData.spokenLanguages.length === 0) newErrors.spokenLanguages = "At least one language is required";
    if (formData.aadharNumber && !validateAadhar(formData.aadharNumber)) {
      newErrors.aadharNumber = "Please enter a valid 12-digit Aadhar number";
    }
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const validateStep2 = (): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    if (!formData.highestQualification.trim()) newErrors.highestQualification = "Educational qualification is required";
    if (formData.totalExperienceYears === undefined || formData.totalExperienceYears < 0) {
      newErrors.totalExperienceYears = "Work experience (years) is required";
    }
    if (formData.totalExperienceMonths === undefined || formData.totalExperienceMonths < 0 || formData.totalExperienceMonths > 11) {
      newErrors.totalExperienceMonths = "Additional months is required and should be between 0-11";
    }
    if (formData.preferredEmploymentTypes.length === 0) newErrors.preferredEmploymentTypes = "At least one employment type is required";
    if (formData.preferredWorkTypes.length === 0) newErrors.preferredWorkTypes = "At least one work type is required";
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const validateAllFields = () => {
    const step1Validation = validateStep1();
    const step2Validation = validateStep2();
    const combinedErrors = { ...step1Validation.errors, ...step2Validation.errors };
    const isValid = Object.keys(combinedErrors).length === 0;
    return { isValid, errors: combinedErrors };
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
        return;
      }

      setIsSubmitting(true);

      try {
        const normalizedData: ICreateTallentPoolFormData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          fatherName: formData.fatherName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          ...(formData.aadharNumber && formData.aadharNumber.trim() && { aadharNumber: formData.aadharNumber }),
          highestQualification: formData.highestQualification,
          currentLocationDetails: formData.currentLocationDetails,
          totalExperienceYears: formData.totalExperienceYears,
          totalExperienceMonths: formData.totalExperienceMonths,
          skills: formData.skills.length > 0 ? formData.skills : ["General"],
          spokenLanguages: formData.spokenLanguages.length > 0 ? formData.spokenLanguages : ["English"],
          preferredJobCategories: formData.preferredJobCategories.length > 0 ? formData.preferredJobCategories : ["General"],
          preferredEmploymentTypes: formData.preferredEmploymentTypes.length > 0 ? formData.preferredEmploymentTypes : ["Full-time"],
          preferredWorkTypes: formData.preferredWorkTypes.length > 0 ? formData.preferredWorkTypes : ["on-site"],
          resume: uploadedURL || undefined,
        };

        const response = await createTalentPoolcandidatePublic(id ?? "", normalizedData, resumeFile || undefined);
        setSuccessMessage("Your profile has been successfully created! Thank you for registering.");
        setShowSuccessPopup(true);

        if (onSubmit) {
          onSubmit(formData);
        }

        if (refreshCandidates) {
          refreshCandidates();
        }
      } catch (error: any) {
        console.error("Error creating application:", error.message);
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
    [formData, onSubmit, refreshCandidates, resumeFile]
  );

  const getInputClassName = (fieldName: string, baseClassName: string = "") => {
    const hasError = showErrors && errors[fieldName];
    const errorClasses = hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50" : "";
    return `${baseClassName} ${errorClasses}`.trim();
  };
  const handlePreviewResume = () => {
    if (uploadedURL) {
      try {
        window.open(uploadedURL, '_blank');
      } catch (e) {
        console.error("Error opening resume:", e);
        toast.error("Failed to preview resume. Please try again.");
      }
    } else {
      toast.error("Resume URL not available. Please wait for the upload to complete.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="shadow-2xl rounded-3xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden w-full">
            <CardHeader
              className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100"
              style={{ display: 'flex', flexDirection: 'row', gap: '40px', justifyContent:"center" , alignItems:"center" }}
            >
              <div>
                <img
                  src='/images/logo.png'
                  alt="TalentHub Logo"
                  className="w-auto lg:h-16"
                />
              </div>

              <div className="flex flex-col justify-start mt-3">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Professional, Personal & Contact Information
                </CardTitle>
                <p className="text-gray-600 font-medium mt-2">
                  Please provide your basic information and contact details
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Resume Upload Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Resume Upload</h3>
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <UploadCloud className="h-4 w-4 text-gray-500" />
                    Resume File
                  </Label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleResumeUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-3 h-12 px-6 rounded-xl border-2 border-dashed border-orange-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 w-full sm:w-auto font-medium"
                    >
                      <UploadCloud className="h-5 w-5 text-orange-500" />
                      <span className="truncate">
                        {resumeFileName ? resumeFileName : "Choose Resume File (Optional)"}
                      </span>
                    </Button>
                   {resumeFileName && (
                      <>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={clearResume}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                          disabled={resloading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handlePreviewResume}
                          className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50 rounded-xl font-medium"
                          disabled={resloading || !uploadedURL}
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </Button>
                      </>
                    )}
                  </div>
                  {resumeFileName && !resloading && uploadedURL && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">{resumeFileName} uploaded successfully</span>
                    </div>
                  )}
                  {resloading && (
                    <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                      <span className="text-sm font-medium text-blue-800">Uploading resume...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <User className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter candidate's full name"
                      className={getInputClassName("name", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                      required
                    />
                    {showErrors && errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="fatherName" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      Father's Name *
                    </Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Enter father's name"
                      className={getInputClassName("fatherName", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                    />
                    {showErrors && errors.fatherName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors.fatherName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="candidate@example.com"
                      className={getInputClassName("email", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                      required
                    />
                    {showErrors && errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="9876543210"
                      className={getInputClassName("phone", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                      required
                    />
                    {showErrors && errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="dateOfBirth" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className={getInputClassName("dateOfBirth", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                      max="2009-08-20"
                      defaultValue="2009-08-20"
                    />
                    {showErrors && errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="gender" className="text-sm font-bold text-gray-700">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value as "Male" | "Female" | "Other")}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="aadharNumber" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      Aadhar Number (Optional)
                    </Label>
                    <Input
                      id="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                      placeholder="Enter Aadhar number (optional)"
                      className={getInputClassName("aadharNumber", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                    />
                    {showErrors && errors.aadharNumber && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors.aadharNumber}
                      </p>
                    )}
                  </div>
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
                    <Label htmlFor="street" className="text-sm font-bold text-gray-700">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.currentLocationDetails.street}
                      onChange={(e) => handleInputChange("currentLocationDetails.street", e.target.value)}
                      placeholder="Enter street address"
                      className={getInputClassName("currentLocationDetails.street", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                    />
                    {showErrors && errors["currentLocationDetails.street"] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors["currentLocationDetails.street"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="area" className="text-sm font-bold text-gray-700">Area/Locality</Label>
                    <Input
                      id="area"
                      value={formData.currentLocationDetails.area}
                      onChange={(e) => handleInputChange("currentLocationDetails.area", e.target.value)}
                      placeholder="Enter area or locality"
                      className={getInputClassName("currentLocationDetails.area", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                    />
                    {showErrors && errors["currentLocationDetails.area"] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors["currentLocationDetails.area"]}
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
                      value={formData.currentLocationDetails.city}
                      onChange={(e) => handleInputChange("currentLocationDetails.city", e.target.value)}
                      placeholder="Enter city name"
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
                    <Label htmlFor="pincode" className="text-sm font-bold text-gray-700">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.currentLocationDetails.pincode}
                      onChange={(e) => handleInputChange("currentLocationDetails.pincode", e.target.value)}
                      placeholder="Enter pincode"
                      className={getInputClassName("currentLocationDetails.pincode", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                    />
                    {showErrors && errors["currentLocationDetails.pincode"] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors["currentLocationDetails.pincode"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="fullAddress" className="text-sm font-bold text-gray-700">Complete Address</Label>
                  <Textarea
                    id="fullAddress"
                    value={formData.currentLocationDetails.fullAddress}
                    onChange={(e) => handleInputChange("currentLocationDetails.fullAddress", e.target.value)}
                    placeholder="Enter complete address with landmarks"
                    rows={4}
                    className={getInputClassName("currentLocationDetails.fullAddress", "resize-none rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                  />
                  {showErrors && errors["currentLocationDetails.fullAddress"] && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="h-4 w-4" />
                      {errors["currentLocationDetails.fullAddress"]}
                    </p>
                  )}
                </div>
              </div>

              {/* Languages Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Languages className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Spoken Languages</h3>
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-gray-700">Select Languages *</Label>
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
            </CardContent>

            <CardContent className="p-8 space-y-8">
              {/* Professional Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Award className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Educational Background</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="highestQualification" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-500" />
                      Educational Qualification *
                    </Label>
                    <Select
                      value={formData.highestQualification}
                      onValueChange={(value) => handleInputChange("highestQualification", value)}
                    >
                      <SelectTrigger className={getInputClassName("highestQualification", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}>
                        <SelectValue placeholder="Select your highest qualification" />
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
                    {showErrors && errors.highestQualification && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        {errors.highestQualification}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="experienceYears" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        Work Experience (Years) *
                      </Label>
                      <Input
                        id="experienceYears"
                        type="number"
                        min="0"
                        value={formData.totalExperienceYears || ""}
                        onChange={(e) => handleInputChange("totalExperienceYears", Number.parseInt(e.target.value) || 0)}
                        className={getInputClassName("totalExperienceYears", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                        required
                      />
                      {showErrors && errors.totalExperienceYears && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <X className="h-4 w-4" />
                          {errors.totalExperienceYears}
                        </p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="experienceMonths" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        Additional Months *
                      </Label>
                      <Input
                        id="experienceMonths"
                        type="number"
                        min="0"
                        max="11"
                        value={formData.totalExperienceMonths || ""}
                        onChange={(e) => handleInputChange("totalExperienceMonths", Number.parseInt(e.target.value) || 0)}
                        className={getInputClassName("totalExperienceMonths", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                      />
                      {showErrors && errors.totalExperienceMonths && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <X className="h-4 w-4" />
                          {errors.totalExperienceMonths}
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
                  <h3 className="text-xl font-bold text-gray-900">Skills & Expertise</h3>
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-gray-700">Technical & Professional Skills</Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="Add a skill (e.g., React, Python, Digital Marketing, Project Management)"
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
                      Add Skill
                    </Button>
                  </div>
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

              {/* Job Categories Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Target className="h-4 w-4 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Employment Preferences</h3>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700">Preferred Industries & Job Categories</Label>
                    <Popover open={openCategoryDropdown} onOpenChange={setOpenCategoryDropdown}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCategoryDropdown}
                          className="h-12 w-full justify-between rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium hover:bg-white/80"
                        >
                          <span className="text-gray-500">Select job categories...</span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search categories..." className="h-9" />
                          <CommandEmpty>No categories found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {categoryOptions.map((category) => (
                                <CommandItem
                                  key={category}
                                  value={category}
                                  onSelect={() => handleCategorySelect(category)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span>{category}</span>
                                    {formData.preferredJobCategories.includes(category) && (
                                      <Check className="h-4 w-4 text-orange-600" />
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {formData.preferredJobCategories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="gap-2 py-2 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-medium">
                          {category}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                            onClick={() => removeFromArray("preferredJobCategories", index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6 mr-3">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-sm font-bold text-gray-700">Preferred Employment Types *</Label>
                      <Popover open={openEmploymentTypeDropdown} onOpenChange={setOpenEmploymentTypeDropdown}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openEmploymentTypeDropdown}
                            className="h-12 w-full justify-between rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium hover:bg-white/80"
                          >
                            <span className="text-gray-500">
                              {formData.preferredEmploymentTypes.length > 0
                                ? `${formData.preferredEmploymentTypes.length} employment type(s) selected`
                                : "Select employment types..."}
                            </span>
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search employment types..." className="h-9" />
                            <CommandEmpty>No employment types found.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {employmentTypeOptions.map((type) => (
                                  <CommandItem
                                    key={type}
                                    value={type}
                                    onSelect={() => handleEmploymentTypeSelect(type)}
                                    className="cursor-pointer"
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span>{type}</span>
                                      {formData.preferredEmploymentTypes.includes(type) && (
                                        <Check className="h-4 w-4 text-orange-600" />
                                      )}
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {formData.preferredEmploymentTypes.map((type, index) => (
                          <Badge key={index} variant="secondary" className="gap-2 py-2 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-medium">
                            {type}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                              onClick={() => removeFromArray("preferredEmploymentTypes", index)}
                            />
                          </Badge>
                        ))}
                      </div>
                      {showErrors && errors.preferredEmploymentTypes && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <X className="h-4 w-4" />
                          {errors.preferredEmploymentTypes}
                        </p>
                      )}
                    </div>
                    <div className="space-y-4">
                      <Label className="text-sm font-bold text-gray-700">Preferred Work Types *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(['remote', 'hybrid', 'on-site'] as const).map((type) => (
                          <div key={type} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 cursor-pointer">
                            <Checkbox
                              id={type}
                              checked={formData.preferredWorkTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    preferredWorkTypes: [...prev.preferredWorkTypes, type],
                                  }));
                                } else {
                                  setFormData((prev) => ({
                                    ...prev,
                                    preferredWorkTypes: prev.preferredWorkTypes.filter((t) => t !== type),
                                  }));
                                }
                                if (checked && showErrors && errors.preferredWorkTypes) {
                                  setErrors((prev) => {
                                    const newErrors = { ...prev };
                                    delete newErrors.preferredWorkTypes;
                                    return newErrors;
                                  });
                                }
                              }}
                              className="w-6 h-6 rounded border border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 flex-shrink-0"
                              style={{ minHeight: '24px', minWidth: '24px' }}
                            />
                            <Label htmlFor={type} className="text-sm font-medium cursor-pointer capitalize flex-1">
                              {type.replace("-", " ")}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {showErrors && errors.preferredWorkTypes && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <X className="h-4 w-4" />
                          {errors.preferredWorkTypes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center items-center mt-12 pt-8 border-t-2 border-gray-200">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 px-4 py-2 h-auto rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    Submit
                    <Plus className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
              {showSuccessPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                  style={{margin: '0'}}
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Created Successfully!</h3>
                    <p className="text-gray-600 mb-4">{successMessage}</p>
                    <div className="flex justify-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowSuccessPopup(false);
                          setSuccessMessage(null);
                          // Reset form
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            fatherName: "",
                            dateOfBirth: "",
                            gender: "Male",
                            aadharNumber: "",
                            highestQualification: "",
                            currentLocationDetails: {
                              street: "",
                              area: "",
                              city: "",
                              pincode: "",
                              fullAddress: "",
                            },
                            spokenLanguages: [],
                            totalExperienceYears: 0,
                            totalExperienceMonths: 0,
                            skills: [],
                            preferredJobCategories: [],
                            preferredEmploymentTypes: [],
                            preferredWorkTypes: [],
                          });
                          clearResume();
                        }}
                        className="rounded-xl border-orange-300 text-orange-600 hover:bg-orange-50"
                      >
                        Add Another Candidate
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Creating Profile...</h3>
                  <p className="text-gray-600 mb-4">
                    We're processing your candidate information and setting up their profile.
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    You'll be redirected to view candidates shortly...
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
  );
}

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
import { Plus, X, ArrowRight, User, Briefcase, CheckCircle, MapPin, Phone, Mail, Languages, Award, Target, Building, Clock, Loader2, ChevronDown, UploadCloud, Eye, Globe, Tag } from 'lucide-react';
import { useSearchParams } from "next/navigation";
import { createCompanyOnboarding, updateCompanyOnboarding, uploadFile } from "../../components/services/companiesapi";
import Navbar from "../../components/pages/navbar";
import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";

// Default logo URL
const DEFAULT_LOGO_URL = "https://res.cloudinary.com/dqsq020p0/image/upload/v1767614048/8015003_gdfrmc.png";

// Update the JobPostingFormData interface
interface JobPostingFormData {
  companyName: string;
  brandName: string;
  website: string;
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

// Define props interface, making them optional since this is a page
interface AddCandidateFormProps {
  onBack?: () => void;
  onSubmit?: (data: JobPostingFormData) => void;
  refreshCandidates?: () => void;
  isPublic?: boolean;
}

// Default export as a page component
export default function PublicCompanyOnboard({ onBack, onSubmit, refreshCandidates, isPublic }: AddCandidateFormProps = {}) {
  const searchParams = useSearchParams();
  const formTopRef = useRef<HTMLDivElement>(null);
  
  // Initialize form data - will be populated from URL params on mount
  const [formData, setFormData] = useState<JobPostingFormData>({
    companyName: "",
    brandName: "",
    website: "",
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
    logoUrl: DEFAULT_LOGO_URL,
  });
  
  // Store record ID from URL params
  const [recordId, setRecordId] = useState<string | null>(null);

  // Update form data from URL query parameters when component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined' && searchParams) {
      const name = searchParams.get('name') || "";
      const companyName = searchParams.get('companyName') || "";
      const email = searchParams.get('email') || "";
      const mobile = searchParams.get('mobile') || "";
      const id = searchParams.get('recordId') || null;
      
      if (id) {
        setRecordId(id);
        console.log("Record ID from URL:", id);
      }
      
      if (name || companyName || email || mobile) {
        setFormData(prev => ({
          ...prev,
          companyName: companyName || prev.companyName,
          hrName: name || prev.hrName,
          hrEmail: email || prev.hrEmail,
          hrContact: mobile ? mobile.replace(/\D/g, "") : prev.hrContact,
        }));
      }
    }
  }, [searchParams]);
  const [hrContactCountryCode, setHrContactCountryCode] = useState("+91");

  // Common country codes
  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
  ];


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
    setFormData(prev => ({ ...prev, logoUrl: DEFAULT_LOGO_URL }));
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
    // For hrContact, store only digits
    if (field === "hrContact") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 15); // Max 15 digits
      setFormData((prev) => ({
        ...prev,
        [field]: digitsOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

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

  const validateWebsite = (website: string): boolean => {
    if (!website || !website.trim()) return false;
    
    const trimmedWebsite = website.trim();
    
    // Remove protocol if present for validation (accepts with or without https://)
    let urlToValidate = trimmedWebsite;
    if (trimmedWebsite.startsWith('http://') || trimmedWebsite.startsWith('https://')) {
      urlToValidate = trimmedWebsite.replace(/^https?:\/\//, '');
    }
    
    // Remove trailing slash if present
    urlToValidate = urlToValidate.replace(/\/$/, '');
    
    // Remove www. prefix if present for validation (www. is optional)
    if (urlToValidate.toLowerCase().startsWith('www.')) {
      urlToValidate = urlToValidate.substring(4);
    }
    
    // Remove path, query params, and fragments for domain validation
    urlToValidate = urlToValidate.split('/')[0].split('?')[0].split('#')[0];
    
    // Basic validation checks
    if (!urlToValidate || urlToValidate.length === 0) {
      return false;
    }
    
    // Must have at least one dot
    if (!urlToValidate.includes('.')) {
      return false;
    }
    
    // Check that domain doesn't start or end with dot or hyphen
    if (urlToValidate.startsWith('.') || urlToValidate.endsWith('.') || 
        urlToValidate.startsWith('-') || urlToValidate.endsWith('-')) {
      return false;
    }
    
    // Check for consecutive dots
    if (urlToValidate.includes('..')) {
      return false;
    }
    
    // Split domain into parts
    const parts = urlToValidate.split('.');
    
    // Must have at least 2 parts (domain + TLD)
    if (parts.length < 2) {
      return false;
    }
    
    // Validate each part
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      // Each part must not be empty
      if (!part || part.length === 0) {
        return false;
      }
      
      // Each part must be alphanumeric with optional hyphens (but not starting/ending with hyphen)
      if (!/^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?$/.test(part)) {
        return false;
      }
      
      // Last part (TLD) must be at least 2 characters
      if (i === parts.length - 1 && part.length < 2) {
        return false;
      }
    }
    
    // All checks passed
    return true;
  };

  const normalizeHrContact = (rawNumber: string, countryCode: string) => {
    // remove non‑digits first
    let digits = rawNumber.replace(/\D/g, "");

    // normalise common prefixes for India so users can paste +91/91/0 numbers
    if (countryCode === "+91") {
      if (digits.startsWith("91") && digits.length === 12) {
        digits = digits.slice(2);
      } else if (digits.startsWith("0") && digits.length === 11) {
        digits = digits.slice(1);
      }
    }

    return digits;
  };

  const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    
    // Company details validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters";
    }
    
    // Website field is optional - no validation required
    
    if (!formData.hrName.trim()) {
      newErrors.hrName = "HR name is required";
    } else if (formData.hrName.trim().length < 2) {
      newErrors.hrName = "HR name must be at least 2 characters";
    }
    
    if (!formData.hrEmail.trim()) {
      newErrors.hrEmail = "HR email is required";
    } else if (!validateEmail(formData.hrEmail)) {
      newErrors.hrEmail = "Please enter a valid email address";
    }
    
    const hrContactDigits = normalizeHrContact(formData.hrContact, hrContactCountryCode);
    if (!hrContactDigits.trim()) {
      newErrors.hrContact = "HR contact number is required";
    } else if (hrContactCountryCode === "+91") {
      if (hrContactDigits.length !== 10) {
        newErrors.hrContact = "Please enter a valid 10-digit phone number";
      } else if (!/^[6-9]/.test(hrContactDigits)) {
        newErrors.hrContact = "Indian mobile number should start with 6, 7, 8, or 9";
      }
    } else {
      if (hrContactDigits.length < 7) {
        newErrors.hrContact = "Please enter a valid phone number (minimum 7 digits)";
      } else if (hrContactDigits.length > 15) {
        newErrors.hrContact = "Phone number is too long (maximum 15 digits)";
      }
    }
    
    // Job details validation
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    } else if (formData.jobTitle.trim().length < 3) {
      newErrors.jobTitle = "Job title must be at least 3 characters";
    }
    
    if (!formData.jobCategory) {
      newErrors.jobCategory = "Job category is required";
    }
    
    if (!formData.shiftTimings) {
      newErrors.shiftTimings = "Shift timings is required";
    }
    
    if (!formData.employmentType) {
      newErrors.employmentType = "Employment type is required";
    }
    
    if (!formData.workType) {
      newErrors.workType = "Work type is required";
    }
    
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
    } else if (formData.jobDescription.trim().length < 20) {
      newErrors.jobDescription = "Job description must be at least 20 characters";
    }
    
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    } else if (formData.streetAddress.trim().length < 5) {
      newErrors.streetAddress = "Street address must be at least 5 characters";
    }
    
    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters";
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }
    
    // Location link is optional; validate only if provided
    if (formData.locationLink.trim()) {
      try {
        new URL(formData.locationLink);
      } catch {
        newErrors.locationLink = "Please enter a valid URL (e.g., https://maps.google.com/...)";
      }
    }
    
    // Salary validation
    const minSalary = typeof formData.minSalary === 'string' ? parseFloat(formData.minSalary) : formData.minSalary;
    const maxSalary = typeof formData.maxSalary === 'string' ? parseFloat(formData.maxSalary) : formData.maxSalary;
    
    if (!formData.minSalary || minSalary === 0 || isNaN(minSalary)) {
      newErrors.minSalary = "Minimum salary is required";
    } else if (minSalary < 0) {
      newErrors.minSalary = "Minimum salary cannot be negative";
    }
    
    if (!formData.maxSalary || maxSalary === 0 || isNaN(maxSalary)) {
      newErrors.maxSalary = "Maximum salary is required";
    } else if (maxSalary < 0) {
      newErrors.maxSalary = "Maximum salary cannot be negative";
    } else if (minSalary && maxSalary < minSalary) {
      newErrors.maxSalary = "Maximum salary must be greater than minimum salary";
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }
    
    if (formData.spokenLanguages.length === 0) {
      newErrors.spokenLanguages = "At least one language is required";
    }
    
    const noOfOpenings = typeof formData.noOfOpenings === 'string' ? parseInt(formData.noOfOpenings) : formData.noOfOpenings;
    if (!formData.noOfOpenings || noOfOpenings === 0 || isNaN(noOfOpenings)) {
      newErrors.noOfOpenings = "Number of openings is required";
    } else if (noOfOpenings < 1) {
      newErrors.noOfOpenings = "Number of openings must be at least 1";
    }
    
    if (!formData.hiringNeed) {
      newErrors.hiringNeed = "Hiring need is required";
    }
    
    if (!formData.minQualification) {
      newErrors.minQualification = "Minimum qualification is required";
    }
    
    const totalExperience = typeof formData.totalExperience === 'string' ? parseFloat(formData.totalExperience) : formData.totalExperience;
    if (formData.totalExperience === "" || formData.totalExperience === null || formData.totalExperience === undefined) {
      newErrors.totalExperience = "Total experience is required";
    } else if (isNaN(totalExperience) || totalExperience < 0) {
      newErrors.totalExperience = "Total experience must be a valid number (0 or greater)";
    }
    
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };


  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validation = validateForm();
      if (!validation.isValid) {
        setErrors(validation.errors);
        setShowErrors(true);
        
        // Show toast message for the first error
        const firstErrorField = Object.keys(validation.errors)[0];
        const firstErrorMessage = validation.errors[firstErrorField];
        toast.error(firstErrorMessage || "Please fill in all required fields correctly");
        
        // Scroll to first error field
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
        return;
      }

      setIsSubmitting(true);

      try {
        // Normalize website URL - add https:// if no protocol is present
        let normalizedWebsite = formData.website.trim();
        if (normalizedWebsite && !normalizedWebsite.startsWith('http://') && !normalizedWebsite.startsWith('https://')) {
          normalizedWebsite = `https://${normalizedWebsite}`;
        }
        
        const normalizedHrContact = normalizeHrContact(formData.hrContact, hrContactCountryCode);
        const normalizedData: any = {
          ...formData,
          website: normalizedWebsite,
          hrContact: normalizedHrContact,
          hrContactCountryCode,
          skills: formData.skills.length > 0 ? formData.skills : ["General"],
          spokenLanguages: formData.spokenLanguages.length > 0 ? formData.spokenLanguages : ["English"],
        };

        // Use default logo if no logo is uploaded
        if (!normalizedData.logoUrl || normalizedData.logoUrl.trim() === "") {
          normalizedData.logoUrl = DEFAULT_LOGO_URL;
        }

        // If recordId exists, update the existing record; otherwise create a new one
        let response;
        if (recordId) {
          console.log("Updating existing record with ID:", recordId);
          response = await updateCompanyOnboarding(recordId, normalizedData);
          setSuccessMessage("Your job posting has been successfully updated! Thank you for posting.");
        } else {
          console.log("Creating new record");
          response = await createCompanyOnboarding(normalizedData);
          setSuccessMessage("Your job posting has been successfully created! Thank you for posting.");
        }
        
        setShowSuccessPopup(true);

        if (onSubmit) {
          onSubmit(formData);
        }

        if (refreshCandidates) {
          refreshCandidates();
        }
      } catch (error: any) {
        console.error("Error creating/updating job posting:", error);
        
        // Extract error message from various error response shapes
        let errorMessage = "Failed to publish job posting. Please try again.";
        
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        // Handle specific error cases
        if (errorMessage.toLowerCase().includes("duplicate") || errorMessage.toLowerCase().includes("already exists")) {
          if (errorMessage.toLowerCase().includes("email")) {
            toast.error("This email is already registered. Please use a different email.");
          } else if (errorMessage.toLowerCase().includes("phone") || errorMessage.toLowerCase().includes("mobile")) {
            toast.error("This mobile number is already registered. Please use a different number.");
          } else {
            toast.error(errorMessage);
          }
        } else if (error?.response?.status === 400) {
          toast.error(errorMessage || "Invalid data provided. Please check all fields and try again.");
        } else if (error?.response?.status === 404) {
          toast.error("Record not found. Please refresh and try again.");
        } else if (error?.response?.status === 409) {
          toast.error(errorMessage || "A record with this information already exists.");
        } else if (error?.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(errorMessage);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      <Navbar />
      <Header />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <Card ref={formTopRef} className="shadow-xl rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-200 py-6 sm:py-8">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Post Your <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Job Opening</span>
                </CardTitle>
                <p className="text-sm sm:text-base text-gray-600">
                  Fill in the details below to reach thousands of qualified candidates
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 lg:p-10 space-y-10">
              {/* Company Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b-2 border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Company Details</h3>
                    <p className="text-sm text-gray-500">Information about your organization</p>
                  </div>
                </div>

                {/* Logo Upload Section */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <UploadCloud className="h-4 w-4 text-orange-500" />
                    Company Logo <span className="text-gray-400 font-normal">(Optional)</span>
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
                      disabled={logoLoading}
                      className="flex items-center gap-3 h-12 px-6 rounded-lg border-2 border-dashed border-orange-300 hover:border-orange-400 hover:bg-orange-50 transition-all font-medium"
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
                          disabled={logoLoading}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handlePreviewLogo}
                          disabled={logoLoading || !uploadedLogoURL}
                          className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50 rounded-lg font-medium"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </Button>
                      </>
                    )}
                  </div>
                  {logoFileName && !logoLoading && uploadedLogoURL && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">{logoFileName} uploaded successfully</span>
                    </div>
                  )}
                  {logoLoading && (
                    <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                      <span className="text-sm font-medium text-blue-800">Uploading logo...</span>
                    </div>
                  )}
                </div>

                {/* Company Information Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Building className="h-4 w-4 text-orange-500" />
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="e.g., Tech Solutions Pvt Ltd"
                      className={getInputClassName("companyName", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                      required
                    />
                    {showErrors && errors.companyName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brandName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Building className="h-4 w-4 text-orange-500" />
                      Brand Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="brandName"
                      value={formData.brandName}
                      onChange={(e) => handleInputChange("brandName", e.target.value)}
                      placeholder="e.g., EarlyJobs"
                      className={getInputClassName("brandName", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                      required
                    />
                    {showErrors && errors.brandName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.brandName}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-orange-500" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="e.g., https://www.earlyjobs.ai (optional)"
                      className={getInputClassName("website", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                    />
                    {showErrors && errors.website && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.website}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hrName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-orange-500" />
                      HR Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="hrName"
                      value={formData.hrName}
                      onChange={(e) => handleInputChange("hrName", e.target.value)}
                      placeholder="e.g., John Doe"
                      className={getInputClassName("hrName", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                      required
                    />
                    {showErrors && errors.hrName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.hrName}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hrEmail" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-orange-500" />
                      HR Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="hrEmail"
                      type="email"
                      value={formData.hrEmail}
                      onChange={(e) => handleInputChange("hrEmail", e.target.value)}
                      placeholder="e.g., hr@company.com"
                      className={getInputClassName("hrEmail", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                      required
                    />
                    {showErrors && errors.hrEmail && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.hrEmail}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hrContact" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      HR Contact Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Select
                        value={hrContactCountryCode}
                        onValueChange={setHrContactCountryCode}
                      >
                        <SelectTrigger className="w-32 h-12 text-base border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg">
                          <SelectValue>
                            {countryCodes.find(c => c.code === hrContactCountryCode)?.flag} {hrContactCountryCode}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="rounded-lg max-h-60">
                          {countryCodes.map((country) => (
                            <SelectItem key={country.code} value={country.code} className="cursor-pointer">
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                                <span className="text-gray-500 text-sm">({country.country})</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="hrContact"
                        type="tel"
                        value={formData.hrContact}
                        onChange={(e) => handleInputChange("hrContact", e.target.value)}
                        placeholder={hrContactCountryCode === "+91" ? "Enter 10-digit number" : "Enter mobile number"}
                        className={getInputClassName("hrContact", "flex-1 h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {hrContactCountryCode === "+91" ? "Enter 10-digit mobile number" : "Enter your mobile number"}
                    </p>
                    {showErrors && errors.hrContact && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.hrContact}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b-2 border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Job Information</h3>
                    <p className="text-sm text-gray-500">Basic details about the position</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-orange-500" />
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      placeholder="e.g., Senior Software Engineer"
                      className={getInputClassName("jobTitle", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                      required
                    />
                    {showErrors && errors.jobTitle && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.jobTitle}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobCategory" className="text-sm font-semibold text-gray-700">
                      Job Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.jobCategory}
                      onValueChange={(value) => handleInputChange("jobCategory", value)}
                    >
                      <SelectTrigger className={getInputClassName("jobCategory", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg max-h-60">
                        {categoryOptions.map((option) => (
                          <SelectItem key={option} value={option} className="cursor-pointer">{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {showErrors && errors.jobCategory && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.jobCategory}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="shiftTimings" className="text-sm font-semibold text-gray-700">
                      Shift Timings <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.shiftTimings}
                      onValueChange={(value) => handleInputChange("shiftTimings", value)}
                    >
                      <SelectTrigger className={getInputClassName("shiftTimings", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}>
                        <SelectValue placeholder="Select shift timing" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {shiftTimingOptions.map((option) => (
                          <SelectItem key={option} value={option} className="cursor-pointer">{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {showErrors && errors.shiftTimings && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.shiftTimings}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employmentType" className="text-sm font-semibold text-gray-700">
                      Employment Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleInputChange("employmentType", value)}
                    >
                      <SelectTrigger className={getInputClassName("employmentType", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {employmentTypeOptions.map((option) => (
                          <SelectItem key={option} value={option} className="cursor-pointer">{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {showErrors && errors.employmentType && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.employmentType}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="workType" className="text-sm font-semibold text-gray-700">
                      Work Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.workType}
                      onValueChange={(value) => handleInputChange("workType", value)}
                    >
                      <SelectTrigger className={getInputClassName("workType", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {workTypeOptions.map((option) => (
                          <SelectItem key={option} value={option} className="cursor-pointer capitalize">{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {showErrors && errors.workType && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                        <X className="h-3 w-3" />
                        {errors.workType}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobDescription" className="text-sm font-semibold text-gray-700">
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="jobDescription"
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                    placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                    rows={6}
                    className={getInputClassName("jobDescription", "resize-none rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                    required
                  />
                  {showErrors && errors.jobDescription && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                      <X className="h-3 w-3" />
                      {errors.jobDescription}
                    </p>
                  )}
                </div>
              </div>

              {/* Location Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b-2 border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Location Details</h3>
                    <p className="text-sm text-gray-500">Where will the employee work?</p>
                  </div>
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
                          <Label htmlFor="locationLink" className="text-sm font-bold text-gray-700">Location Link (optional)</Label>
                          <Input
                            id="locationLink"
                            value={formData.locationLink}
                            onChange={(e) => handleInputChange("locationLink", e.target.value)}
                            placeholder="Enter Location Link"
                            className={getInputClassName("locationLink", "h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
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
                <div className="flex items-center gap-4 pb-4 border-b-2 border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Salary Details</h3>
                    <p className="text-sm text-gray-500">Compensation range for this position</p>
                  </div>
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
                <div className="flex items-center gap-4 pb-4 border-b-2 border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Required Skills</h3>
                    <p className="text-sm text-gray-500">Add skills needed for this role</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Input
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        placeholder="e.g., JavaScript, Project Management, Sales..."
                        className={getInputClassName("skills", "h-12 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addToArray("skills", currentSkill, setCurrentSkill);
                          }
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => addToArray("skills", currentSkill, setCurrentSkill)}
                      className="h-12 px-6 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 italic">Press Enter or click "Add Skill" to add skills to the list</p>
                  {showErrors && errors.skills && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                      <X className="h-3 w-3" />
                      {errors.skills}
                    </p>
                  )}
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                      {formData.skills.map((skill, index) => (
                        <Badge key={index} className="gap-2 py-2 px-4 bg-orange-500 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all">
                          {skill}
                          <X
                            className="h-3 w-3 cursor-pointer hover:bg-white/20 rounded-full transition-colors"
                            onClick={() => removeFromArray("skills", index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                      </div>

              {/* Languages Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b-2 border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Languages className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Language Requirements</h3>
                    <p className="text-sm text-gray-500">Languages the candidate should speak</p>
                  </div>
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
                <div className="flex items-center gap-4 pb-4 border-b-2 border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Additional Details</h3>
                    <p className="text-sm text-gray-500">Experience and qualification requirements</p>
                  </div>
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

              {/* Submit Section */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 pt-8 border-t-2 border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto gap-3 px-10 py-6 text-lg rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Creating Job Posting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Publish Job Posting</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                <p>By submitting, you agree to our <a href="/terms-and-conditions" className="text-orange-600 hover:text-orange-700 underline font-medium">Terms & Conditions</a></p>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            style={{ margin: '0' }}
            onClick={() => setShowSuccessPopup(false)}
          >
            <div
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
                      brandName: "",
                      website: "",
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
                      logoUrl: DEFAULT_LOGO_URL,
                    });
                  }}
                  className="rounded-xl border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Add Another Job
                </Button>
              </div>
            </div>
          </div>
        )}

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
      <Footer />
    </div>
  );
}
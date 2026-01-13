"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Briefcase, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Zap, 
  Shield,
  Clock,
  Phone,
  Building2,
  User,
  Loader2,
  Target,
  Search,
  MessageSquare,
  Database,
  GraduationCap,
  TrendingUp,
  Play,
  ChevronDown,
  Star,
  MapPin,
  FileText,
  Filter,
  Download,
  Mail,
  MessageCircle,
  Sparkles,
  Award,
  BarChart3
} from "lucide-react";
import Navbar from "../components/pages/navbar";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import { sendOtptoMobile, verifyOtpMobile } from "../components/services/servicesapis";
import { createCompanyOnboarding, updateCompanyOnboarding } from "../components/services/companiesapi";

// Default logo URL
const DEFAULT_LOGO_URL = "https://res.cloudinary.com/dqsq020p0/image/upload/v1767614048/8015003_gdfrmc.png";

// Extract a readable error message from varied backend error shapes
const getBackendErrorMessage = (error: any, fallback: string) => {
  // Handle axios error response
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  // Handle direct error object
  if (error?.data?.message) return error.data.message;
  if (error?.data?.error) return error.data.error;
  // Handle error message string
  if (typeof error?.message === "string" && error.message.trim().length > 0) return error.message;
  // Handle error string directly
  if (typeof error === "string" && error.trim().length > 0) return error;
  return fallback;
};

const FreeJobPostingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    mobile: "",
  });

  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isOtpTimerActive, setIsOtpTimerActive] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  useEffect(() => {
    if (isOtpTimerActive && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpTimer === 0 && isOtpTimerActive) {
      setIsOtpTimerActive(false);
    }
  }, [otpTimer, isOtpTimerActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "mobile") {
      // Only allow digits, limit to 10 digits for Indian numbers
      const raw = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: raw });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOtpInputChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    if (numericValue && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpInputKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      otpInputRefs.current[5]?.focus();
    } else if (pastedData.length > 0) {
      otpInputRefs.current[pastedData.length - 1]?.focus();
    }
  };

  const sendOtp = async (): Promise<boolean> => {
    // Validate form fields first - show specific error messages
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (formData.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      return false;
    }
    if (!formData.companyName.trim()) {
      toast.error("Please enter company name");
      return false;
    }
    if (formData.companyName.trim().length < 2) {
      toast.error("Company name must be at least 2 characters long");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }
    const mobileDigits = formData.mobile.replace(/\D/g, "");
    if (!formData.mobile || mobileDigits.length === 0) {
      toast.error("Please enter your mobile number");
      return false;
    }
    // Validate mobile number based on country code
    if (countryCode === "+91") {
      if (mobileDigits.length !== 10) {
        toast.error("Please enter a valid 10-digit mobile number");
        return false;
      }
      // Check if it starts with valid Indian mobile prefix (6-9)
      if (!/^[6-9]/.test(mobileDigits)) {
        toast.error("Please enter a valid Indian mobile number (should start with 6, 7, 8, or 9)");
        return false;
      }
    } else {
      // For other countries, require at least 7 digits (minimum international standard)
      if (mobileDigits.length < 7) {
        toast.error("Please enter a valid mobile number (minimum 7 digits required)");
        return false;
      }
      // Maximum 15 digits (international standard)
      if (mobileDigits.length > 15) {
        toast.error("Mobile number is too long (maximum 15 digits allowed)");
        return false;
      }
    }

    setIsSubmitting(true);
    try {
      // First, save the landing page data to MongoDB with valid placeholder values
      const onboardingData: any = {
        companyName: formData.companyName.trim(),
        brandName: formData.companyName.trim(), // Use company name as brand name
        website: "", // Will be filled later
        hrName: formData.name.trim(),
        hrEmail: formData.email.trim(),
        hrContact: formData.mobile.replace(/\D/g, ""),
        jobTitle: "", // Will be filled later
        jobCategory: "Other", // Valid default value
        shiftTimings: "Day Shift", // Valid default value
        employmentType: "Full-time", // Valid default value
        workType: "on-site", // Valid default value
        jobDescription: "", // Will be filled later
        streetAddress: "", // Will be filled later
        area: "", // Will be filled later
        city: "", // Will be filled later
        pincode: "", // Will be filled later
        locationLink: "", // Empty location link
        minSalary: 0, // Default value
        maxSalary: 0, // Default value
        skills: [], // Empty array, will be filled later
        spokenLanguages: [], // Empty array, will be filled later
        noOfOpenings: 1, // Minimum required value (backend validation requires at least 1)
        hiringNeed: "Future", // Valid default value
        minQualification: "10th", // Valid default value
        totalExperience: 0, // Default value
        logoUrl: DEFAULT_LOGO_URL, // Default logo
        _silentSave: true, // Flag for silent save
      };
      
      console.log("Saving landing page data to database...", {
        companyName: onboardingData.companyName,
        hrName: onboardingData.hrName,
        hrEmail: onboardingData.hrEmail,
        hrContact: onboardingData.hrContact,
      });
      
      // Save to database - if this fails, don't proceed with OTP
      let recordId: string | null = null;
      try {
        const saveResponse = await createCompanyOnboarding(onboardingData);
        console.log("✅ Landing page data saved to database:", saveResponse);
        // Extract ID from response (could be in data._id, data.id, or data.data._id depending on backend)
        recordId = saveResponse?.data?._id || saveResponse?._id || saveResponse?.data?.id || saveResponse?.id || null;
        if (recordId) {
          console.log("Record ID saved:", recordId);
        }
      } catch (saveError: any) {
        console.error("❌ Error saving landing page data:", saveError);
        const message = getBackendErrorMessage(
          saveError,
          "Failed to save your details. Please try again."
        );
        toast.error(message);
        return false; // Stop here, don't send OTP
      }

      // Send OTP only if data was saved successfully
      const phoneNumber = formData.mobile.replace(/\D/g, "");
      const response = await sendOtptoMobile({
        phoneNumber,
        email: formData.email.trim(),
      });

      if (!response.success) {
        const message = getBackendErrorMessage(response, "Failed to send OTP. Please try again.");
        toast.error(message);
        return false; // Stop here, don't proceed
      }

      // Success - set OTP sent state
      setOtpSent(true);
      setIsOtpTimerActive(true);
      setOtpTimer(60);
      
      // Store record ID in state for later use
      if (recordId) {
        // Store in a ref or state to use in verifyOtp
        (window as any).__pendingRecordId = recordId;
      }
      
      toast.success("OTP sent to your mobile number!");
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
      return true; // Success
    } catch (error: any) {
      console.error("❌ Error in sendOtp:", error);
      const message = getBackendErrorMessage(error, "Error sending OTP. Please try again.");
      toast.error(message);
      return false; // Failed
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    try {
      const success = await sendOtp();
      if (!success) {
        // Error already shown in sendOtp
        return;
      }
    } catch (error: any) {
      console.error("❌ Error in resendOtp:", error);
      const message = getBackendErrorMessage(error, "Failed to resend OTP. Please try again.");
      toast.error(message);
    }
  };

  const verifyOtp = async (): Promise<boolean> => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return false;
    }

    setIsVerifying(true);
    try {
      const phoneNumber = formData.mobile.replace(/\D/g, "");
      const response = await verifyOtpMobile({
        phoneNumber,
        email: formData.email.trim(),
        otp: otpString,
      });

      // Check if response is an error (verifyOtpMobile returns error object on failure)
      if (response?.response || response?.isAxiosError) {
        // This is an axios error
        const message = getBackendErrorMessage(response, "Invalid OTP. Please try again.");
        toast.error(message);
        return false;
      }

      // Normalize success and message from varied response shapes
      const isSuccess = response?.success === true || response?.data?.success === true;
      if (!isSuccess) {
        const message = getBackendErrorMessage(response, "Invalid OTP. Please try again.");
        toast.error(message);
        return false;
      }

      toast.success("Mobile number verified successfully!");
      
      // Get the record ID that was saved when form was submitted
      const recordId = (window as any).__pendingRecordId || null;
      
      // Update isOtpVerified to true if recordId exists
      if (recordId) {
        try {
          console.log("Updating isOtpVerified to true for record:", recordId);
          await updateCompanyOnboarding(recordId, {
            isOtpVerified: true,
            _silentSave: true, // Silent save to avoid showing toast
          });
          console.log("✅ isOtpVerified updated successfully");
        } catch (updateError: any) {
          console.error("❌ Error updating isOtpVerified:", updateError);
          // Don't block the flow if update fails, but log the error
          // The user can still proceed to the job posting page
        }
      }
      
      // Redirect with query parameters to pre-fill the form
      const params = new URLSearchParams({
        name: formData.name.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.replace(/\D/g, ""), // Store only digits
      });
      
      // Add record ID if available
      if (recordId) {
        params.append('recordId', recordId);
      }
      
      // Clear the stored record ID
      if ((window as any).__pendingRecordId) {
        delete (window as any).__pendingRecordId;
      }
      
      setTimeout(() => {
        window.location.href = `/freejobposting/job-posting?${params.toString()}`;
      }, 1000);
      return true;
    } catch (error: any) {
      console.error("❌ Error in verifyOtp:", error);
      const message = getBackendErrorMessage(error, "Invalid OTP. Please try again.");
      toast.error(message);
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!otpSent) {
        const success = await sendOtp();
        if (!success) {
          // Error already shown in sendOtp, form submission prevented
          return;
        }
      } else {
        const success = await verifyOtp();
        if (!success) {
          // Error already shown in verifyOtp, form submission prevented
          return;
        }
      }
    } catch (error: any) {
      console.error("❌ Error in handleSubmit:", error);
      const message = getBackendErrorMessage(error, "An error occurred. Please try again.");
      toast.error(message);
    }
  };

  const faqs = [
    {
      question: "Why should I use EarlyJobs over others?",
      answer: "EarlyJobs offers AI-powered matching, verified candidates, and a comprehensive platform from fresher to experienced hiring. With millions of qualified candidates and advanced filtering, you get better quality hires faster."
    },
    {
      question: "What happens if I don't receive enough candidates?",
      answer: "EarlyJobs provides multiple ways to reach candidates - job postings, database search, and AI-suggested candidates. If you need more visibility, you can use premium job boosts or contact our team for enterprise solutions."
    },
    {
      question: "In which cities can I hire via EarlyJobs?",
      answer: "EarlyJobs operates across 300+ cities in India, covering major metros, tier 2, and tier 3 cities. Our franchise network ensures local support and access to regional talent pools."
    },
    {
      question: "I want to hire more than 10 candidates, do you have any bulk-hiring plans?",
      answer: "Yes! EarlyJobs offers enterprise plans for bulk hiring with features like bulk WhatsApp invites, ATS integration, dedicated account manager, and custom pricing. Contact our sales team for details."
    }
  ];

  return (
    <>
      <Navbar />
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Trusted by 200+ Employers</span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Hire your{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      dream team
                    </span>{" "}
                    with EarlyJobs
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                    Streamline your recruitment with AI-driven precision. Single solution from fresher to experienced hiring.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      4M+
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Qualified Candidates</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                      300+
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Cities Covered</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                      80%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Hired in 48hrs</div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm">100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">No Credit Card</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Zap className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">Quick Setup</span>
                  </div>
                </div>
              </div>

              {/* Right - Registration Form */}
              <div className="lg:pl-8">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 lg:p-10">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Get Started Today
                      </h2>
                      <p className="text-gray-600">
                        Fill in your details to start hiring top talent
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-orange-500" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          minLength={2}
                          maxLength={100}
                          disabled={otpSent || isSubmitting}
                          className="h-12 text-base border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all"
                        />
                      </div>

                      {/* Company Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-orange-500" />
                          Company Name
                        </Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Enter your company name"
                          minLength={2}
                          maxLength={100}
                          disabled={otpSent || isSubmitting}
                          className="h-12 text-base border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-orange-500" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          maxLength={255}
                          disabled={otpSent || isSubmitting}
                          className="h-12 text-base border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all"
                        />
                      </div>

                      {/* Mobile Number Field */}
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-orange-500" />
                          Mobile Number
                        </Label>
                        <div className="flex gap-2">
                          <Select
                            value={countryCode}
                            onValueChange={setCountryCode}
                            disabled={otpSent || isSubmitting}
                          >
                            <SelectTrigger className="w-32 h-12 text-base border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl">
                              <SelectValue>
                                {countryCodes.find(c => c.code === countryCode)?.flag} {countryCode}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="rounded-xl max-h-60">
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
                            id="mobile"
                            name="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder={countryCode === "+91" ? "Enter 10-digit mobile number" : "Enter mobile number"}
                            maxLength={countryCode === "+91" ? 10 : 15}
                            disabled={otpSent || isSubmitting}
                            className="flex-1 h-12 text-base border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {countryCode === "+91" ? "Enter 10-digit mobile number" : "Enter your mobile number"}
                        </p>
                      </div>

                      {/* OTP Section */}
                      {otpSent && (
                        <div className="space-y-4 p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200">
                          <div className="flex items-center gap-2 text-orange-700">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">OTP sent to {countryCode} {formData.mobile} and {formData.email}</span>
                          </div>
                          <div>
                            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                              Enter 6-Digit OTP
                            </Label>
                            <div className="flex gap-2 sm:gap-3">
                              {otp.map((digit, index) => (
                                <Input
                                  key={index}
                                  ref={(el) => {
                                    otpInputRefs.current[index] = el;
                                  }}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  value={digit}
                                  onChange={(e) => handleOtpInputChange(index, e.target.value)}
                                  onKeyDown={(e) => handleOtpInputKeyDown(index, e)}
                                  onPaste={handleOtpInputPaste}
                                  className="w-full h-14 text-center text-2xl font-bold border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all"
                                  required
                                />
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="submit"
                              disabled={isVerifying || otp.join("").length !== 6}
                              className="h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isVerifying ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Verifying...
                                </>
                              ) : (
                                <>
                                  Verify
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                              )}
                            </Button>
                            <Button
                              type="button"
                              onClick={resendOtp}
                              disabled={isOtpTimerActive || isSubmitting}
                              variant="outline"
                              className="h-12 border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 rounded-xl transition-all"
                            >
                              {isOtpTimerActive ? `Resend (${otpTimer}s)` : "Resend OTP"}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      {!otpSent && (
                        <Button
                          type="submit"
                          disabled={isSubmitting || !formData.name.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.mobile.trim()}
                          className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg rounded-xl shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Sending OTP...
                            </>
                          ) : (
                            <>
                              Continue
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      )}

                      <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
                        By continuing, you agree to our{" "}
                        <a href="/terms-and-conditions" className="text-orange-500 hover:text-orange-600 font-medium underline">
                          Terms of Service
                        </a>{" "}
                        &{" "}
                        <a href="/privacy-policy" className="text-orange-500 hover:text-orange-600 font-medium underline">
                          Privacy Policy
                        </a>
                      </p>
                    </form>
                  </CardContent>
                </Card>

                <p className="text-center text-sm text-gray-600 mt-6 flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-orange-500" />
                  Trusted by 1000+ enterprises and 7 lakhs+ MSMEs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with Enhanced Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                A single platform for all your hiring needs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features to help you find, engage, and hire the best talent faster
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* AI-Powered Matching */}
              <div className="group relative bg-gradient-to-br from-orange-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get applications from relevant, high-intent candidates with smart AI matching and filtering
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Smart candidate matching</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Real-time WhatsApp alerts</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Advanced job filters</span>
                  </li>
                </ul>
              </div>

              {/* Candidate Database */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Candidate Database</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Quickly search and hire active jobseekers from our extensive database across India
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>AI-powered search</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Unlimited profile views</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>22+ advanced filters</span>
                  </li>
                </ul>
              </div>

              {/* AI Assessment */}
              <div className="group relative bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Assessment</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Evaluate candidates with tailored tests and AI-powered skill assessments
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Custom assessments</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Automated screening</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Detailed reports</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-3xl p-10 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Suggested Candidates</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                  Get AI-recommended candidates matching your requirements
                </h3>
                <p className="text-lg sm:text-xl opacity-90 mb-8">
                  Our AI analyzes your job postings and suggests the best-fit candidates from our database
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 rounded-xl font-semibold px-8 shadow-xl">
                    Explore Database
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Why hire from EarlyJobs?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of businesses revolutionizing their hiring process
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                  5L+
                </div>
                <div className="text-gray-600 font-medium">New candidates join every month</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">
                  199+
                </div>
                <div className="text-gray-600 font-medium">Job categories to choose from</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-2">
                  5X
                </div>
                <div className="text-gray-600 font-medium">More walk-ins than competitors</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  79%
                </div>
                <div className="text-gray-600 font-medium">Get candidates within 24 hours</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* FAQ Section with Modern Design */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about hiring with EarlyJobs
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-orange-200 transition-all shadow-sm hover:shadow-md"
                >
                  <button
                    className="w-full px-6 sm:px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900 pr-4 text-lg">{faq.question}</span>
                    <div className={`w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${expandedFaq === index ? "rotate-180" : ""}`}>
                      <ChevronDown className="w-5 h-5 text-orange-600" />
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 sm:px-8 py-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-500"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to hire your next great candidate?
            </h2>
            <p className="text-xl sm:text-2xl mb-10 opacity-90">
              Join 7+ lakh employers who are hiring smarter with EarlyJobs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 rounded-xl text-lg px-10 py-7 font-semibold shadow-2xl hover:scale-105 transition-all"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 rounded-xl text-lg px-10 py-7 font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FreeJobPostingPage;

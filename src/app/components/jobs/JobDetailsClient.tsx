"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { X, Bookmark,Globe, Share2, Briefcase, IndianRupee, User, Clock, MapPin, Plus, Trash2, ChevronDown, Copy, Linkedin, Facebook, Instagram, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface JobDetailsData {
  id: string;
  title: string;
  job_id: string;
  company_name: string;
  company_logo_url?: string;
  employment_type?: string;
  work_type?: string;
  min_salary?: string | number;
  max_salary?: string | number;
  salary_mode?: string;
  min_experience?: number | string;
  max_experience?: number | string;
  city?: string;
  location?: string;
  skills?: string | string[];
  created_at?: string;
  description?: string;
  category?: string;
  commission_fee?: number;
  commission_type?: string;
  no_of_openings?: number;
  status?: string;
  hiring_need?: string;
  shift_timings?: string;
  language?: string;
  min_age?: number;
  max_age?: number;
  qualification?: string;
  currency?: string;
  street?: string;
  area?: string;
  pincode?: string;
  keywords?: string;
  location_link?: string;
}
interface ICreateApplicantRequestBody {
  fullName: string;
  phone: string;
  email: string;
  fatherName: string;
  dateOfBirth: string; // ISO 8601 date string, e.g., "1995-08-22"
  gender: 'Male' | 'Female' | 'Other';
  aadharNumber?: string; // Optional
  highestQualification: string;
  currentLocationDetails: string; // The full address object
  spokenLanguages: string[];
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  jobId: string; 
}

interface JobDetailsClientProps {
  jobid: string;
  currentUrl: string;
}

const JobDetailsClient = ({ jobid, currentUrl }: JobDetailsClientProps) => {
  const [jobData, setJobData] = useState<JobDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    aadharNumber: '',
    highestQualification: '',
    currentLocation: '',
    experienceYears: '',
    experienceMonths: '',
    skills: [] as string[],
    newSkill: '',
    spokenLanguages: [] as string[],
    showLanguageDropdown: false
  });

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0.slice(0,-4);
        
        const response = await fetch(`${backendUrl}/api/public/jobs/${jobid}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch job details: ${response.status}`);
        }
        
        const data = await response.json();
        setJobData(data.data);
        console.log(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobid]);

  // Handle click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setApplicationForm(prev => ({ ...prev, showLanguageDropdown: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-earlyjobs-orange" />
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error: {error || 'Job not found'}</p>
            <a 
              href="/jobs"
              className="inline-block mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Jobs
            </a>
          </div>
        </div>
      </div>
    );
  }

  const formatRelativeTime = (dateString: string): string => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffInMs = now.getTime() - postedDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths > 0) {
      return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    } else if (diffInWeeks > 0) {
      return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
    } else if (diffInDays > 0) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  const parseNumber = (value?: string | number | null): number | null => {
    if (value === null || value === undefined) return null;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (typeof value !== "string") return null;
    if (value.trim() === "") return null;
    const num = parseFloat(value);
    return Number.isFinite(num) ? num : null;
  };

  const toLPA = (amount: number, mode?: string): number => {
    const yearly = mode?.toLowerCase() === "monthly" ? amount * 12 : amount;
    return yearly / 100000;
  };

  const formatSalary = (minSalary?: string | number, maxSalary?: string | number, salaryMode?: string): string => {
    const minParsed = parseNumber(minSalary);
    const maxParsed = parseNumber(maxSalary);
    
    if (minParsed == null && maxParsed == null) return "Not Disclosed";
    
    const minLpa = minParsed != null ? toLPA(minParsed, salaryMode) : null;
    const maxLpa = maxParsed != null ? toLPA(maxParsed, salaryMode) : null;
    
    if (minLpa != null && maxLpa != null) {
      return `${minLpa >= 10 ? minLpa.toFixed(0) : minLpa.toFixed(1)} - ${maxLpa >= 10 ? maxLpa.toFixed(0) : maxLpa.toFixed(1)} LPA`;
    } else if (minLpa != null) {
      return `${minLpa >= 10 ? minLpa.toFixed(0) : minLpa.toFixed(1)} LPA`;
    } else if (maxLpa != null) {
      return `${maxLpa >= 10 ? maxLpa.toFixed(0) : maxLpa.toFixed(1)} LPA`;
    }
    
    return "Not Disclosed";
  };

  const formatExperience = (minExp?: number | string, maxExp?: number | string): string => {
    const toStr = (v?: number | string) =>
      v === undefined || v === null || v === "_" || v === "" ? null : String(v);
    const minS = toStr(minExp);
    const maxS = toStr(maxExp);

    if (minS && maxS) return `${minS} - ${maxS} years`;
    if (minS) return `${minS} years`;
    if (maxS) return `${maxS} years`;
    return "Not specified";
  };

  const handleAddSkill = () => {
    if (applicationForm.newSkill.trim() && !applicationForm.skills.includes(applicationForm.newSkill.trim())) {
      setApplicationForm(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setApplicationForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setApplicationForm(prev => ({
      ...prev,
      spokenLanguages: prev.spokenLanguages.includes(language)
        ? prev.spokenLanguages.filter(lang => lang !== language)
        : [...prev.spokenLanguages, language]
    }));
  };

  const handleSubmitApplication = async () => {
  // Form validation
  if (!applicationForm.fullName.trim()) {
    toast.error("Full Name is required");
    return;
  }
  if (!applicationForm.fatherName.trim()) {
    toast.error("Father Name is required");
    return;
  }
  if (!applicationForm.email.trim()) {
    toast.error("Email ID is required");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(applicationForm.email.trim())) {
    toast.error("Please enter a valid email address");
    return;
  }
  if (!applicationForm.phone.trim()) {
    toast.error("Phone Number is required");
    return;
  }
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(applicationForm.phone.trim())) {
    toast.error("Please enter a valid 10-digit phone number");
    return;
  }
  if (!applicationForm.dateOfBirth) {
    toast.error("Date of Birth is required");
    return;
  }
  if (!applicationForm.gender) {
    toast.error("Gender is required");
    return;
  }
  if (!applicationForm.highestQualification) {
    toast.error("Highest Qualification is required");
    return;
  }
  if (!applicationForm.currentLocation.trim()) {
    toast.error("Current Location is required");
    return;
  }
  if (!applicationForm.experienceYears.trim() && !applicationForm.experienceMonths.trim()) {
    toast.error("Experience (Years or Months) is required");
    return;
  }
  if (applicationForm.skills.length === 0) {
    toast.error("At least one skill is required");
    return;
  }
  if (applicationForm.spokenLanguages.length === 0) {
    toast.error("At least one spoken language is required");
    return;
  }

  // Convert experience fields to numbers
  const totalExperienceYears = applicationForm.experienceYears.trim()
    ? parseInt(applicationForm.experienceYears, 10)
    : 0;
  const totalExperienceMonths = applicationForm.experienceMonths.trim()
    ? parseInt(applicationForm.experienceMonths, 10)
    : 0;

  if (isNaN(totalExperienceYears) || isNaN(totalExperienceMonths)) {
    toast.error("Experience Years and Months must be valid numbers");
    return;
  }

  // Capitalize gender
  const capitalizedGender = applicationForm.gender.charAt(0).toUpperCase() + applicationForm.gender.slice(1);

  try {
    const candidateDetails: ICreateApplicantRequestBody = {
      jobId: jobData!.job_id, 
      fullName: applicationForm.fullName,
      email: applicationForm.email,
      fatherName: applicationForm.fatherName,
      phone: applicationForm.phone,
      dateOfBirth: applicationForm.dateOfBirth,
      gender: capitalizedGender as 'Male' | 'Female' | 'Other',
      aadharNumber: applicationForm.aadharNumber || undefined, // Send undefined if empty
      highestQualification: applicationForm.highestQualification,
      currentLocationDetails: applicationForm.currentLocation,
      spokenLanguages: applicationForm.spokenLanguages,
      totalExperienceYears,
      totalExperienceMonths,
      skills: applicationForm.skills,
    };

    const url = `https://kind-abnormally-redfish.ngrok-free.app/api/public/jobs/apply`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidateDetails),
    };
    console.log("Submitting application:", candidateDetails);

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Application submitted successfully!");
        setShowApplyModal(false);
        setApplicationForm({
          fullName: '',
          fatherName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          aadharNumber: '',
          highestQualification: '',
          currentLocation: '',
          experienceYears: '',
          experienceMonths: '',
          skills: [],
          newSkill: '',
          spokenLanguages: [],
          showLanguageDropdown: false,
        });
      }
    } else {
      toast.error(data.error || "Failed to submit application");
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to submit application");
  }
};

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Job URL copied to clipboard!");
      setShowShareDropdown(false);
    } catch (error) {
      toast.info(`Copy this URL: ${currentUrl}`);
    }
  };

  const shareToLinkedIn = () => {
    const shareText = `Check out this ${jobData!.title} position at ${jobData!.company_name}!`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(jobData!.title || "Job Opportunity")}&summary=${encodeURIComponent(shareText)}`;
    
    window.open(linkedinUrl, '_blank');
    toast.success("Opening LinkedIn sharing dialog...");
    setShowShareDropdown(false);
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    
    window.open(facebookUrl, '_blank');
    toast.success("Opening Facebook sharing dialog...");
    setShowShareDropdown(false);
  };

  const shareToInstagram = () => {
    const shareText = `Check out this ${jobData!.title} position at ${jobData!.company_name}!`;
    const instagramText = `${shareText}\n\n${currentUrl}`;
    
    try {
      navigator.clipboard.writeText(instagramText);
      toast.info("Job details copied! You can now paste this in Instagram.");
    } catch (error) {
      toast.info(`Copy this for Instagram:\n\n${instagramText}`);
    }
    
    setShowShareDropdown(false);
  };

  // Close share dropdown when clicking outside
  const handleClickOutsideShare = (event: React.MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.share-dropdown')) {
      setShowShareDropdown(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" onClick={handleClickOutsideShare}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-earlyjobs-text mb-4 sm:mb-6">
          {jobData.title} Job in {(jobData.city && jobData.city.trim()) } at {jobData.company_name}
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <Card className="p-4 sm:p-6">
              {/* Job Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex gap-3 sm:gap-4">
                  <img 
                    src={jobData.company_logo_url } 
                    alt={`${jobData.company_name} logo`} 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded object-contain bg-gray-50 p-2"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-earlyjobs-text mb-1">
                      {jobData.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">{jobData.company_name}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative share-dropdown">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 sm:flex-none"
                      onClick={() => setShowShareDropdown(!showShareDropdown)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    
                    {showShareDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={copyUrlToClipboard}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy URL
                          </button>
                          <button
                            onClick={shareToLinkedIn}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                            Share on LinkedIn
                          </button>
                          <button
                            onClick={shareToFacebook}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                            Share on Facebook
                          </button>
                          <button
                            onClick={shareToInstagram}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Instagram className="w-4 h-4 mr-2 text-pink-600" />
                            Copy for Instagram
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button 
                    className="bg-white hover:bg-gray-50 flex-1 sm:flex-none shadow-lg hover:shadow-xl transition-all duration-200 font-medium px-6 py-2 border-2 border-earlyjobs-orange"
                    style={{ color: '#ff6b35' }}
                    onClick={() => setShowApplyModal(true)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
              
              {/* Job Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{jobData.employment_type || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{jobData.work_type || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{formatSalary(jobData.min_salary, jobData.max_salary, jobData.salary_mode)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{formatExperience(jobData.min_experience, jobData.max_experience)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">Posted {jobData.created_at ? formatRelativeTime(jobData.created_at) : 'Recently'}</span>
                </div>
              </div>
              
              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Location</h3>
                <div className="flex items-center gap-3">
                  <Badge 
                    className={`bg-earlyjobs-light-orange text-earlyjobs-orange border-earlyjobs-orange/20 cursor-pointer hover:bg-earlyjobs-navy hover:text-white transition-colors text-xs sm:text-sm ${
                      jobData.location_link ? 'cursor-pointer hover:bg-earlyjobs-navy hover:text-white transition-colors' : ''
                    }`}
                    onClick={jobData.location_link ? () => window.open(jobData.location_link, '_blank') : undefined}
                  >
                    {jobData.street && jobData.area && jobData.city && jobData.pincode 
                      ? `${jobData.area}, ${jobData.city} ${jobData.pincode}`
                      : jobData.location || 'Remote'
                    }
                  </Badge>
                </div>
              </div>
              
              {/* Skills Required */}
              {(() => {
                const skillsArray = Array.isArray(jobData.skills)
                  ? jobData.skills
                  : typeof jobData.skills === 'string'
                    ? jobData.skills.split(',').map((s) => s.trim()).filter(Boolean)
                    : [];
                return skillsArray.length > 0 ? (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Skills Required</h3>
                    <div className="flex gap-2 flex-wrap">
                      {skillsArray.map((skill, index) => (
                        <Badge 
                          key={index}
                          className="bg-earlyjobs-light-orange text-earlyjobs-orange border-earlyjobs-orange/20 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
              
              {/* About this Job (HTML Description) */}
              {jobData.description && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">About this Job</h3>
                  <div className="prose prose-sm max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobData.description.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ""),
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Keywords */}
              {jobData.keywords && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Keywords</h3>
                  <div className="flex gap-2 flex-wrap">
                    {jobData.keywords.split(',').map((keyword, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-xs bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      >
                        {keyword.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          {/* Right Sidebar */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg mb-4">Job Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium">{jobData.company_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{jobData.city || 'Remote'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{jobData.employment_type || 'Full-time'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{formatExperience(jobData.min_experience, jobData.max_experience)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary:</span>
                  <span className="font-medium">{formatSalary(jobData.min_salary, jobData.max_salary, jobData.salary_mode)}</span>
                </div>
              </div>
            </div>
            
            {/* Assessment Promotion */}
            <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
              <div className="text-center">
                <h3 className="font-semibold text-earlyjobs-text mb-3">
                  Want to prove your skills?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Take our EarlyJobs Assessments and boost your chances of getting hired!
                </p>
                <Button 
                  className="bg-white hover:bg-gray-50 font-medium px-6 py-2 border-2 border-earlyjobs-orange"
                  style={{ color: '#ff6b35' }}
                  onClick={() => window.open('/assessments', '_blank')}
                >
                  Get Assessments
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
              <div className="text-center">
                <h3 className="font-semibold text-earlyjobs-text mb-3">
                  Build a Standout Resume!
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Use our AI Resume Builder to create a professional resume and increase your chances of landing your dream job!
                </p>
                <Button 
                  className="bg-white hover:bg-gray-50 font-medium px-6 py-2 border-2 border-earlyjobs-orange"
                  style={{ color: '#ff6b35' }}
                  onClick={() => window.open('/airesume', '_blank')}
                >
                  Create AI Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-earlyjobs-text">
                Apply for {jobData?.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApplyModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Full Name */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ex: John Doe"
                    value={applicationForm.fullName}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                </div>

                {/* Father Name */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ex: John Doe"
                    value={applicationForm.fatherName}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, fatherName: e.target.value }))}
                    required
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Ex: example@email.com"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ex: 9876543210"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                </div>

                {/* Date of Birth */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={applicationForm.dateOfBirth}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    required
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                </div>

                {/* Gender */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <Select value={applicationForm.gender} onValueChange={(value) => setApplicationForm(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger className="border-gray-200/50 focus:border-gray-300/70">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Aadhar Number */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number
                  </label>
                  <Input
                    placeholder="Ex: 123456789012"
                    value={applicationForm.aadharNumber}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, aadharNumber: e.target.value }))}
                    maxLength={12}
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                </div>

                {/* Highest Qualification */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <Select value={applicationForm.highestQualification} onValueChange={(value) => setApplicationForm(prev => ({ ...prev, highestQualification: value }))}>
                    <SelectTrigger className="border-gray-200/50 focus:border-gray-300/70">
                      <SelectValue placeholder="Select Highest Qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th</SelectItem>
                      <SelectItem value="12th">12th</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Location */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Location <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter location"
                    value={applicationForm.currentLocation}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, currentLocation: e.target.value }))}
                    required
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                </div>

                {/* Experience */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Ex: 2"
                        value={applicationForm.experienceYears}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, experienceYears: e.target.value }))}
                        required
                        className="border-gray-200/50 focus:border-gray-300/70"
                      />
                      <span className="text-sm text-gray-500">Years</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Ex: 5"
                        value={applicationForm.experienceMonths}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, experienceMonths: e.target.value }))}
                        required
                        className="border-gray-200/50 focus:border-gray-300/70"
                      />
                      <span className="text-sm text-gray-500">Months</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <Input
                    placeholder="Ex: MS Excel"
                    value={applicationForm.newSkill}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, newSkill: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="border-gray-200/50 focus:border-gray-300/70"
                  />
                  <Button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-earlyjobs-navy hover:bg-earlyjobs-navy/90"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Type a Skill and click 'Add' button to add it to the list
                </p>
                <div className="flex flex-wrap gap-2">
                  {applicationForm.skills.map((skill, index) => (
                    <Badge key={index} className="bg-earlyjobs-light-orange text-earlyjobs-orange">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(skill)}
                        className="h-4 w-4 p-0 ml-1 hover:bg-earlyjobs-orange hover:text-white"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Spoken Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spoken Languages <span className="text-red-500">*</span>
                </label>
                <div className="relative language-dropdown">
                  <div 
                    className="flex items-center justify-between w-full px-3 py-2 border border-gray-200/50 rounded-md bg-white cursor-pointer hover:border-gray-300/70 transition-colors"
                    onClick={() => setApplicationForm(prev => ({ ...prev, showLanguageDropdown: !prev.showLanguageDropdown }))}
                  >
                    <span className={applicationForm.spokenLanguages.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                      {applicationForm.spokenLanguages.length > 0 
                        ? `${applicationForm.spokenLanguages.length} language(s) selected`
                        : 'Select languages'
                      }
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  {applicationForm.showLanguageDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi'].map((language) => (
                        <div 
                          key={language} 
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleLanguageToggle(language)}
                        >
                          <Checkbox
                            id={language}
                            checked={applicationForm.spokenLanguages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language)}
                          />
                          <label htmlFor={language} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6">
              <Button
                onClick={() => setShowApplyModal(false)}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <Button
                variant="outline"
                className="bg-earlyjobs-navy hover:bg-earlyjobs-navy/90 w-full sm:w-auto"
                onClick={handleSubmitApplication}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsClient;

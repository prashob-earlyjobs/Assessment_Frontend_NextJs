"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Upload,
  Save,
  ArrowLeft,
  Plus,
  X,
  FileText,
  Globe,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import {
  isUserLoggedIn,
  updateProfile,
  uploadPhoto,
  uploadResume,
} from "../../components/services/servicesapis";

const Profile = () => {
  const navigate = useRouter();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState("personal");
  const isManualScrollRef = useRef(false);
  const sectionRefs = {
    personal: useRef<HTMLDivElement>(null),
    address: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    workExperience: useRef<HTMLDivElement>(null),
    languages: useRef<HTMLDivElement>(null),
  };

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  // Helper function to format date for HTML date input (YYYY-MM-DD)
  const formatDateForInput = (date: string | null | undefined): string => {
    if (!date) return "";
    try {
      // If date is already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
      }
      // Handle ISO date strings (e.g., "2024-01-15T00:00:00.000Z" or "2024-01-15T00:00:00")
      // Extract just the date part if it's an ISO string
      if (date.includes('T')) {
        const datePart = date.split('T')[0];
        if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
          return datePart;
        }
      }
      // Parse the date and format it
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return "";
      }
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error, "Date value:", date);
      return "";
    }
  };

  // Helper function to format work experience dates
  const formatWorkExperienceDates = (workExp: Array<any>) => {
    if (!Array.isArray(workExp)) return workExp;
    return workExp.map((exp) => ({
      ...exp,
      id: exp._id,
      startDate: formatDateForInput(exp.startDate),
      endDate: formatDateForInput(exp.endDate),
    }));
  };

  // Helper function to sort work experience by start date (most recent first)
  // Currently working experiences are placed at the top
  const sortWorkExperience = (workExp: Array<{
    id: string;
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string;
    location: string;
  }>) => {
    if (!Array.isArray(workExp) || workExp.length === 0) return workExp;
    
    return [...workExp].sort((a, b) => {
      // First, prioritize currently working experiences
      if (a.currentlyWorking && !b.currentlyWorking) return -1;
      if (!a.currentlyWorking && b.currentlyWorking) return 1;
      
      // If both have start dates, sort by start date (most recent first)
      if (a.startDate && b.startDate) {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        // Check for invalid dates
        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1; // Put invalid dates at the end
        if (isNaN(dateB)) return -1;
        return dateB - dateA; // Most recent first
      }
      
      // If only one has a start date, prioritize it
      if (a.startDate && !b.startDate) return -1;
      if (!a.startDate && b.startDate) return 1;
      
      // If neither has a start date, maintain original order
      return 0;
    });
  };

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
    profile: {
      resumeUrl: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      professionalInformation: {
        currentJobTitle: "",
        expectedSalaryAnnual: "",
        noticePeriod: 0,
        workMode: "",
        experience: 0,
        workExperience: [] as Array<{
          id: string;
          company: string;
          jobTitle: string;
          startDate: string;
          endDate: string;
          currentlyWorking: boolean;
          description: string;
          location: string;
        }>,
        education: [
          {
            id: Date.now().toString(),
            degree: "",
            institution: "",
            year: "",
            percentage: "",
            fieldOfStudy: "",
          },
        ],
      },
      gender: "",
      dateOfBirth: "",
      bio: "",
      prefJobLocations: [] as string[],
      preferredJobRole: "",
      skills: [] as string[],
      languages: [] as Array<{
        id: string;
        name: string;
        read: boolean;
        write: boolean;
        speak: boolean;
      }>,
    },
    avatar: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await isUserLoggedIn();
        if (!response.success) {
          toast.error("You need to log in first!");
          navigate.push("/login");
          return;
        }
        const userData = {
          ...response.user,
          profile: {
            ...response.user.profile,
            professionalInformation: {
              ...response.user.profile.professionalInformation,
              education: Array.isArray(
                response.user.profile.professionalInformation.education
              )
                ? response.user.profile.professionalInformation.education
                : [
                  {
                    id: Date.now().toString(),
                    degree: "",
                    institution: "",
                    year: "",
                    percentage: "",
                    fieldOfStudy: "",
                  },
                ],
              workExperience: sortWorkExperience(
                formatWorkExperienceDates(
                  Array.isArray(response.user.profile.professionalInformation?.workExperience)
                    ? response.user.profile.professionalInformation.workExperience
                    : Array.isArray(response.user.profile.experience)
                    ? response.user.profile.experience
                    : Array.isArray(response.user.profile.workExperience)
                    ? response.user.profile.workExperience
                    : []
                )
              ),
            },
            languages: Array.isArray(response.user.profile.languages)
              ? response.user.profile.languages.map((lang: any) => {
                  if (typeof lang === 'string') {
                    return { id: Date.now().toString() + Math.random(), name: lang, read: false, write: false, speak: false };
                  }
                  // Convert old structure with proficiency strings to boolean
                  return {
                    id: lang.id || Date.now().toString() + Math.random(),
                    name: lang.name || '',
                    read: lang.read === true || lang.read === 'true' || lang.read === 'Read' || lang.read === 'read',
                    write: lang.write === true || lang.write === 'true' || lang.write === 'Write' || lang.write === 'write',
                    speak: lang.speak === true || lang.speak === 'true' || lang.speak === 'Speak' || lang.speak === 'speak',
                  };
                })
              : [],
          },
        };
        setProfileData((prev) => ({ ...prev, ...userData }));
      } catch (error) {
        toast.error("Failed to fetch user data. Please try again later.");
      }
    };
    fetchUserData();
  }, [navigate]);

  // Scroll spy effect to track active section
  useEffect(() => {
    let scrollHandler: (() => void) | null = null;
    console.log("profileData", profileData);
    const timeoutId = setTimeout(() => {
      scrollHandler = () => {
        if (isManualScrollRef.current) return;
        
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're at the bottom
        if (scrollPosition + windowHeight >= documentHeight - 50) {
          setActiveSection("languages");
          return;
        }
        
        let currentSection = "personal";
        let minDistance = Infinity;
        
        // Find the section whose top is closest to the viewport top
        Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
          if (ref.current) {
            const { offsetTop } = ref.current;
            const distance = Math.abs(offsetTop - scrollPosition - 150);
            
            // Only consider sections that are above or just entering the viewport
            if (offsetTop <= scrollPosition + 200 && distance < minDistance) {
              minDistance = distance;
              currentSection = sectionId;
            }
          }
        });
        
        setActiveSection(currentSection);
      };

      scrollHandler();
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [profileData]);

  const scrollToSection = (section: string) => {
    // Set active section immediately for visual feedback
    isManualScrollRef.current = true;
    setActiveSection(section);
    
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Focus the first available input after scroll
      setTimeout(() => {
        const sectionElement = ref.current;
        if (sectionElement) {
          // Find first input, textarea, or select element
          const firstInput = sectionElement.querySelector<HTMLInputElement>(
            'input:not([type="hidden"]):not([type="file"]), textarea, select'
          );
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 500);
      
      // Reset manual scroll flag after scroll completes
      setTimeout(() => {
        isManualScrollRef.current = false;
      }, 1000);
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "skills", label: "Skills", icon: GraduationCap },
    { id: "education", label: "Education", icon: Calendar },
    { id: "workExperience", label: "Work Experience", icon: Building2 },
    { id: "languages", label: "Languages", icon: Globe },
  ];

  const indianLanguages = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Gujarati",
    "Urdu",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punjabi",
    "Assamese",
    "Maithili",
    "Santali",
    "Kashmiri",
    "Nepali",
    "Konkani",
    "Sindhi",
    "Manipuri",
    "Bodo",
    "Dogri",
    "Sanskrit",
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("profile.address.")) {
      const subField = field.split(".")[2];
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          address: {
            ...prev.profile.address,
            [subField]: value,
          },
        },
      }));
    } else if (field.startsWith("profile.professionalInformation.")) {
      const subField = field.split(".")[2];
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          professionalInformation: {
            ...prev.profile.professionalInformation,
            [subField]: value,
          },
        },
      }));
    } else if (field.startsWith("profile.")) {
      const subField = field.split(".")[1];
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [subField]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Photo size should be less than 5MB");
        return;
      }
      try {
        const url = await uploadPhoto(file, profileData.email);
        if (url) {
          setProfileData((prev) => ({ ...prev, avatar: url }));
          toast.success("Photo uploaded successfully!");
        }
      } catch {
        // Error handled in service
      }
    }
  };

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Resume size should be less than 5MB");
        return;
      }
      try {
        const url = await uploadResume(file, profileData.email);
        if (url) {
          setProfileData((prev) => ({ ...prev, profile: { ...prev.profile, resumeUrl: url} }));
          toast.success("Resume uploaded successfully!");
        }
      } catch {
        // Error handled in service
      }
    }
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !profileData.profile.skills.includes(newSkill.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          skills: [...new Set([...prev.profile.skills, newSkill.trim()])],
        },
      }));
      setNewSkill("");
      toast.success("Skill added successfully!");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        skills: prev.profile.skills.filter((skill) => skill !== skillToRemove),
      },
    }));
    toast.success("Skill removed successfully!");
  };

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !profileData.profile.languages.some(lang => lang.name.toLowerCase() === newLanguage.trim().toLowerCase())
    ) {
      const newLangEntry = {
        id: Date.now().toString() + Math.random(),
        name: newLanguage.trim(),
        read: false,
        write: false,
        speak: false,
      };
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          languages: [...prev.profile.languages, newLangEntry],
        },
      }));
      setNewLanguage("");
      toast.success("Language added successfully!");
    }
  };

  const updateLanguage = (id: string, field: string, value: string | boolean) => {
    setProfileData((prev) => {
      // If updating name, check for duplicates
      if (field === "name" && typeof value === "string") {
        const isDuplicate = prev.profile.languages.some(
          (lang) => lang.id !== id && lang.name.toLowerCase() === value.toLowerCase()
        );
        if (isDuplicate) {
          toast.error("This language is already added!");
          return prev;
        }
      }
      
      return {
        ...prev,
        profile: {
          ...prev.profile,
          languages: prev.profile.languages.map((lang) =>
            lang.id === id ? { ...lang, [field]: value } : lang
          ),
        },
      };
    });
  };

  const removeLanguage = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        languages: prev.profile.languages.filter((lang) => lang.id !== id),
      },
    }));
    toast.success("Language removed successfully!");
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
      percentage: "",
      fieldOfStudy: "",
    };
    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        professionalInformation: {
          ...prev.profile.professionalInformation,
          education: [
            ...prev.profile.professionalInformation.education,
            newEducation,
          ],
        },
      },
    }));
    toast.success("New education entry added!");
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        professionalInformation: {
          ...prev.profile.professionalInformation,
          education: prev.profile.professionalInformation.education.map((edu) =>
            edu.id === id ? { ...edu, [field]: value } : edu
          ),
        },
      },
    }));
  };

  const removeEducation = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        professionalInformation: {
          ...prev.profile.professionalInformation,
          education: prev.profile.professionalInformation.education.filter(
            (edu) => edu.id !== id
          ),
        },
      },
    }));
    toast.success("Education entry removed successfully!");
  };

  const addWorkExperience = () => {
    const newWorkExp = {
      id: Date.now().toString(),
      company: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
      location: "",
    };
    setProfileData((prev) => {
      const currentWorkExp = Array.isArray(prev.profile.professionalInformation.workExperience)
        ? prev.profile.professionalInformation.workExperience
        : [];
      const updatedWorkExp = [...currentWorkExp, newWorkExp];
      return {
        ...prev,
        profile: {
          ...prev.profile,
          professionalInformation: {
            ...prev.profile.professionalInformation,
            workExperience: sortWorkExperience(updatedWorkExp),
          },
        },
      };
    });
    toast.success("New work experience entry added!");
  };

  const updateWorkExperience = (id: string, field: string, value: string | boolean) => {
    setProfileData((prev) => {
      const workExp = Array.isArray(prev.profile.professionalInformation.workExperience)
        ? prev.profile.professionalInformation.workExperience
        : [];
      
      // If "currentlyWorking" is being set to true, uncheck all other entries
      if (field === "currentlyWorking" && value === true) {
        const updatedWorkExp = workExp.map((exp) =>
          exp.id === id 
            ? { ...exp, [field]: value } 
            : { ...exp, currentlyWorking: false }
        );
        return {
          ...prev,
          profile: {
            ...prev.profile,
            professionalInformation: {
              ...prev.profile.professionalInformation,
              workExperience: sortWorkExperience(updatedWorkExp),
            },
          },
        };
      }
      
      // For other fields, update normally
      const updatedWorkExp = workExp.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      );
      return {
        ...prev,
        profile: {
          ...prev.profile,
          professionalInformation: {
            ...prev.profile.professionalInformation,
            workExperience: sortWorkExperience(updatedWorkExp),
          },
        },
      };
    });
  };

  const removeWorkExperience = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        professionalInformation: {
          ...prev.profile.professionalInformation,
          workExperience: Array.isArray(prev.profile.professionalInformation.workExperience)
            ? prev.profile.professionalInformation.workExperience.filter((exp) => exp.id !== id)
            : [],
        },
      },
    }));
    toast.success("Work experience entry removed successfully!");
  };

  const calculateProfileCompletion = () => {
    let completedFields = 0;
    let totalFields = 0;

    // Personal Information (11 fields including the moved fields)
    totalFields += 11;
    if (profileData.name?.trim()) completedFields++;
    if (profileData.email?.trim()) completedFields++;
    if (profileData.mobile?.trim()) completedFields++;
    if (profileData.profile?.dateOfBirth) completedFields++;
    if (profileData.profile?.gender) completedFields++;
    if (profileData.profile?.bio?.trim()) completedFields++;
    if (profileData.avatar) completedFields++;
    if (profileData.profile?.resumeUrl) completedFields++;
    if (profileData.profile?.professionalInformation?.experience) completedFields++;
    if (profileData.profile?.professionalInformation?.expectedSalaryAnnual) completedFields++;
    if (profileData.profile?.professionalInformation?.workMode) completedFields++;

    // Address Information (5 fields)
    totalFields += 5;
    if (profileData.profile?.address?.street?.trim()) completedFields++;
    if (profileData.profile?.address?.city?.trim()) completedFields++;
    if (profileData.profile?.address?.state?.trim()) completedFields++;
    if (profileData.profile?.address?.zipCode?.trim()) completedFields++;
    if (profileData.profile?.address?.country?.trim()) completedFields++;

    // Skills (1 field - at least one skill)
    totalFields += 1;
    if (profileData.profile?.skills?.length > 0) completedFields++;

    // Education (1 field - at least one complete education entry)
    totalFields += 1;
    const hasCompleteEducation = profileData.profile?.professionalInformation?.education?.some(
      (edu) => edu.degree?.trim() && edu.institution?.trim() && (typeof edu.year === 'string' ? edu.year.trim() : edu.year)
    );
    if (hasCompleteEducation) completedFields++;

    // Work Experience (1 field - at least one complete work experience entry)
    totalFields += 1;
    const hasCompleteWorkExp = Array.isArray(profileData.profile?.professionalInformation?.workExperience) &&
      profileData.profile.professionalInformation.workExperience.some(
        (exp) => exp.company?.trim() && exp.jobTitle?.trim() && exp.startDate
      );
    if (hasCompleteWorkExp) completedFields++;

    // Languages (1 field - at least one language with name)
    totalFields += 1;
    if (profileData.profile?.languages?.length > 0 && 
        profileData.profile.languages.some(lang => lang.name?.trim())) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  const handleSave = async () => {
    try {
      const payload = { ...profileData,email:profileData.email,mobile:profileData.mobile };
      
      // Validate education entries: check if any entry has empty fields
      if (payload.profile?.professionalInformation?.education) {
        // Helper function to check if a field has a value
        const hasValue = (field: any) => {
          if (field === null || field === undefined) return false;
          const strValue = typeof field === 'string' ? field.trim() : String(field).trim();
          return strValue !== '';
        };
        
        // Check each education entry for incomplete fields
        for (const edu of payload.profile.professionalInformation.education) {
          const hasDegree = hasValue(edu.degree);
          const hasInstitution = hasValue(edu.institution);
          const hasYear = hasValue(edu.year);
          const hasPercentage = hasValue(edu.percentage);
          const hasFieldOfStudy = hasValue(edu.fieldOfStudy);
          
          // Check if any field is filled (not completely empty)
          const hasAnyField = hasDegree || hasInstitution || hasYear || hasPercentage || hasFieldOfStudy;
          
          // If any field is filled but not all fields are filled, show error
          if (hasAnyField && (!hasDegree || !hasInstitution || !hasYear || !hasPercentage || !hasFieldOfStudy)) {
            toast.error("Please fill all fields in Education section or leave all fields empty");
            return;
          }
        }
        
        // Filter education entries: only include fully filled entries, exclude completely empty ones
        payload.profile.professionalInformation.education = payload.profile.professionalInformation.education
          .map((edu: any) => {
            const { id, ...eduWithoutId } = edu;
            return eduWithoutId;
          })
          .filter((edu: any) => {
            // Only include if all fields are filled (exclude completely empty entries)
            return hasValue(edu.degree) && 
                   hasValue(edu.institution) && 
                   hasValue(edu.year) && 
                   hasValue(edu.percentage) && 
                   hasValue(edu.fieldOfStudy);
          });
        
        // If no valid education entries remain, set to empty array
        if (payload.profile.professionalInformation.education.length === 0) {
          payload.profile.professionalInformation.education = [];
        }
      }
      
      // Validate work experience entries: check if any entry has empty required fields
      if (payload.profile?.professionalInformation?.workExperience) {
        // Helper function to check if a field has a value
        const hasValue = (field: any) => {
          if (field === null || field === undefined) return false;
          const strValue = typeof field === 'string' ? field.trim() : String(field).trim();
          return strValue !== '';
        };
        
        // Check that only one entry has "Currently Working" checked
        const currentlyWorkingEntries = payload.profile.professionalInformation.workExperience.filter(
          (exp: any) => exp.currentlyWorking === true
        );
        if (currentlyWorkingEntries.length > 1) {
          toast.error("Only one work experience entry can be marked as 'Currently Working Here'");
          return;
        }
        
        // Check each work experience entry for incomplete required fields and date validations
        for (let i = 0; i < payload.profile.professionalInformation.workExperience.length; i++) {
          const exp = payload.profile.professionalInformation.workExperience[i];
          const hasCompany = hasValue(exp.company);
          const hasJobTitle = hasValue(exp.jobTitle);
          const hasStartDate = hasValue(exp.startDate);
          const hasEndDate = hasValue(exp.endDate);
          const hasLocation = hasValue(exp.location);
          const currentlyWorking = exp.currentlyWorking === true;
          
          // Check if any required field is filled (not completely empty)
          const hasAnyRequiredField = hasCompany || hasJobTitle || hasStartDate || hasEndDate || hasLocation;
          
          // Required fields: company, jobTitle, startDate, location, and endDate (unless currentlyWorking)
          const allRequiredFieldsFilled = hasCompany && 
                                         hasJobTitle && 
                                         hasStartDate && 
                                         hasLocation && 
                                         (currentlyWorking || hasEndDate);
          
          // If any required field is filled but not all required fields are filled, show error
          if (hasAnyRequiredField && !allRequiredFieldsFilled) {
            toast.error("Please fill all required fields in Work Experience section or leave all fields empty");
            return;
          }
          
          // Date validations (only if entry has required fields filled)
          if (allRequiredFieldsFilled) {
            // Validate start date and end date relationship
            if (hasStartDate && hasEndDate && !currentlyWorking) {
              const startDate = new Date(exp.startDate);
              const endDate = new Date(exp.endDate);
              
              // Check if start date is after end date
              if (startDate > endDate) {
                toast.error(`Work Experience ${i + 1}: Start date must be before end date`);
                return;
              }
              
              // Check if end date is in the future
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (endDate > today) {
                toast.error(`Work Experience ${i + 1}: End date cannot be in the future`);
                return;
              }
            }
            
            // Validate start date is not in the future (unless currently working)
            if (hasStartDate) {
              const startDate = new Date(exp.startDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              // Allow start date to be today or in the future only if currently working
              if (startDate > today && !currentlyWorking) {
                toast.error(`Work Experience ${i + 1}: Start date cannot be in the future unless marked as currently working`);
                return;
              }
            }
          }
        }
        
        // Filter work experience entries: only include fully filled entries, exclude completely empty ones
        payload.profile.professionalInformation.workExperience = payload.profile.professionalInformation.workExperience
          .map((exp: any) => {
            const { id, ...expWithoutId } = exp;
            return expWithoutId;
          })
          .filter((exp: any) => {
            // Only include if all required fields are filled (description is optional)
            const hasCompany = hasValue(exp.company);
            const hasJobTitle = hasValue(exp.jobTitle);
            const hasStartDate = hasValue(exp.startDate);
            const hasEndDate = hasValue(exp.endDate);
            const hasLocation = hasValue(exp.location);
            const currentlyWorking = exp.currentlyWorking === true;
            
            return hasCompany && 
                   hasJobTitle && 
                   hasStartDate && 
                   hasLocation && 
                   (currentlyWorking || hasEndDate);
          });
        
        // If no valid work experience entries remain, set to empty array
        if (payload.profile.professionalInformation.workExperience.length === 0) {
          payload.profile.professionalInformation.workExperience = [];
        }
      }
      
      // Remove id from language objects before sending to backend
      if (payload.profile?.languages) {
        payload.profile.languages = payload.profile.languages.map((lang: any) => {
          const { id, ...langWithoutId } = lang;
          return langWithoutId;
        });
      }
      console.log(payload,"payload");
      const response = await updateProfile(payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to update profile");
      }

      const updatedUserData = {
        ...response.data.user,
        avatar: profileData.avatar,
        resumeUrl: profileData.profile.resumeUrl,
        profile: {
          ...response.data.user.profile,
          professionalInformation: {
            ...response.data.user.profile.professionalInformation,
            education: Array.isArray(
              response.data.user.profile.professionalInformation.education
            )
              ? response.data.user.profile.professionalInformation.education
              : [
                {
                  id: Date.now().toString(),
                  degree: "",
                  institution: "",
                  year: "",
                  percentage: "",
                  fieldOfStudy: "",
                },
              ],
            workExperience: sortWorkExperience(
              formatWorkExperienceDates(
                Array.isArray(response.data.user.profile.professionalInformation?.workExperience)
                  ? response.data.user.profile.professionalInformation.workExperience
                  : Array.isArray(response.data.user.profile.workExperience)
                  ? response.data.user.profile.workExperience
                  : Array.isArray(response.data.user.profile.experience)
                  ? response.data.user.profile.experience
                  : profileData.profile.professionalInformation.workExperience || []
              )
            ),
          },
        },
      };

      setProfileData(updatedUserData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  const profileCompletion = calculateProfileCompletion();
  const progressColor = profileCompletion > 91 ? "#10B981" : "#EB7054"; // Green if above 91%, orange otherwise
  const progressTextColor = profileCompletion > 91 ? "text-green-600" : "text-orange-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="rounded-2xl"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <img
                src="/images/logo.png"
                alt="EarlyJobs Logo"
                className="h-12 sm:h-[5rem] w-auto max-w-full"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Update Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full items-start">
          {/* Fixed Quick Links Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="lg:fixed lg:top-32 lg:left-6 xl:left-[calc((100vw-80rem)/2+1.5rem)] lg:w-64 lg:z-40">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Links</h3>
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                          isActive
                            ? "bg-orange-50 text-orange-600 border-l-4 border-orange-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                        <span className="text-sm">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full min-w-0 overflow-x-hidden">
            <div className="grid gap-6 sm:gap-8 w-full">
          <Card ref={sectionRefs.personal} id="personal" className="rounded-3xl border-0 shadow-lg scroll-mt-24 w-full max-w-full overflow-x-hidden">
            <CardHeader className="px-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2">
                <User className="h-6 w-6 text-orange-600" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>Update your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 overflow-x-hidden px-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => photoInputRef.current?.click()}
                >
                  {/* Circular Progress Indicator */}
                  <svg className="transform -rotate-90" width="96" height="96">
                    {/* Background circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="6"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      fill="none"
                      stroke={progressColor}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 44}`}
                      strokeDashoffset={`${2 * Math.PI * 44 * (1 - profileCompletion / 100)}`}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  {/* Profile Picture */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={profileData.avatar || "/placeholder-avatar.jpg"}
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xl">
                        {profileData.name.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {/* Upload Icon - Only visible on hover */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="bg-orange-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                      <Upload className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {/* Completion Percentage */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 py-1 shadow-md border border-gray-200 z-30">
                    <span className={`text-xs font-semibold ${progressTextColor}`}>
                      {profileCompletion}%
                    </span>
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{profileData.name || "User"}</h3>
                  <p className="text-xs text-gray-500">Click photo to upload</p>
                  <p className="text-xs text-gray-500">Max size: 5MB</p>
                </div>
              </div>

              <div className="p-4 border border-dashed border-gray-300 rounded-2xl w-full max-w-full overflow-x-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-orange-500" />
                    <div>
                      <h3 className="font-medium">Upload Resume</h3>
                      <p className="text-sm text-gray-500">
                        {profileData.profile.resumeUrl ? (
                          <a
                            href={profileData.profile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:underline"
                          >
                            View Current Resume
                          </a>
                        ) : (
                          "Upload your resume (PDF, DOC, DOCX)"
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-2xl border-gray-300 hover:bg-orange-100 focus:bg-orange-200 w-full sm:w-auto"
                    onClick={() => resumeInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {profileData.profile.resumeUrl ? "Update Resume" : "Upload Resume"}
                  </Button>
                </div>
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX (Max: 5MB)
                </p>
              </div>

                 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 shadow-none w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    readOnly
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="rounded-lg cursor-not-allowed bg-gray-100 border-gray-300 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Phone Number</Label>
                  <Input
                    id="mobile"
                    value={profileData.mobile}
                    readOnly
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    className="rounded-lg cursor-not-allowed bg-gray-100 border-gray-300 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    readOnly
                    value={profileData.profile.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("profile.dateOfBirth", e.target.value)
                    }
                    className="rounded-lg cursor-not-allowed bg-gray-100 border-gray-300 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={profileData.profile.gender}
                    onValueChange={(value) =>
                      handleInputChange("profile.gender", value)
                    }
                    disabled
                  >
                    <SelectTrigger className="rounded-lg border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 shadow-none">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.profile.bio}
                  onChange={(e) => handleInputChange("profile.bio", e.target.value)}
                  className="rounded-lg min-h-[100px] border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 shadow-none w-full"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={
                      profileData.profile.professionalInformation?.experience || ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      // Prevent negative values
                      if (value === "" || (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))) {
                        handleInputChange(
                          "profile.professionalInformation.experience",
                          value
                        );
                      }
                    }}
                    onKeyDown={(e) => {
                      // Prevent negative sign, minus key, and arrow down at minimum
                      if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+") {
                        e.preventDefault();
                      }
                    }}
                    className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedSalary">Expected Salary (Annual)</Label>
                  <Input
                    id="expectedSalary"
                    type="number"
                    min="0"
                    value={
                      profileData.profile.professionalInformation?.expectedSalaryAnnual || ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      // Prevent negative values
                      if (value === "" || (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))) {
                        handleInputChange(
                          "profile.professionalInformation.expectedSalaryAnnual",
                          value
                        );
                      }
                    }}
                    onKeyDown={(e) => {
                      // Prevent negative sign, minus key, and arrow down at minimum
                      if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+") {
                        e.preventDefault();
                      }
                    }}
                    className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                    placeholder="80000"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="workMode">Preferred Work Mode</Label>
                  <Select
                    value={
                      profileData.profile.professionalInformation?.workMode || ""
                    }
                    onValueChange={(value) =>
                      handleInputChange(
                        "profile.professionalInformation.workMode",
                        value
                      )
                    }
                  >
                    <SelectTrigger className="rounded-lg border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 shadow-none">
                      <SelectValue placeholder="Select Work Mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-lg shadow-lg border-gray-200">
                      <SelectItem value="Remote" className="hover:bg-orange-100">Remote</SelectItem>
                      <SelectItem value="Onsite" className="hover:bg-orange-100">Onsite</SelectItem>
                      <SelectItem value="Hybrid" className="hover:bg-orange-100">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card ref={sectionRefs.address} id="address" className="rounded-3xl border-0 shadow-lg scroll-mt-24 w-full max-w-full overflow-x-hidden">
            <CardHeader className="px-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-orange-600" />
                <span>Address Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-hidden px-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={profileData.profile.address?.street}
                    onChange={(e) =>
                      handleInputChange("profile.address.street", e.target.value)
                    }
                    className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profileData.profile.address?.city}
                    onChange={(e) =>
                      handleInputChange("profile.address.city", e.target.value)
                    }
                    className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profileData.profile.address?.state}
                    onChange={(e) =>
                      handleInputChange("profile.address.state", e.target.value)
                    }
                    className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={profileData.profile.address?.zipCode}
                    onChange={(e) =>
                      handleInputChange("profile.address.zipCode", e.target.value)
                    }
                    className="rounded-lg border-gray-300 focus:border-orange-500 "
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profileData.profile.address?.country}
                    onChange={(e) =>
                      handleInputChange("profile.address.country", e.target.value)
                    }
                    className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card ref={sectionRefs.skills} id="skills" className="rounded-3xl border-0 shadow-lg scroll-mt-24 w-full max-w-full overflow-x-hidden">
            <CardHeader className="px-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-orange-600" />
                <span>Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 overflow-x-hidden px-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {profileData.profile.skills?.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="rounded-full px-3 py-1 bg-orange-100 text-orange-800"
                  >
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="rounded-lg border-gray-300 focus:border-orange-500 flex-1"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill} className="rounded-2xl w-full sm:w-auto">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card ref={sectionRefs.education} id="education" className="rounded-3xl border-0 shadow-lg scroll-mt-24 w-full max-w-full overflow-x-hidden">
            <CardHeader className="px-4 sm:p-6">
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-orange-600" />
                  <span>Education</span>
                </div>
                <Button
                  onClick={addEducation}
                  variant="outline"
                  className="rounded-2xl w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 overflow-x-hidden px-4 sm:p-6 pt-0">
              {Array.isArray(
                profileData.profile.professionalInformation.education
              ) &&
                profileData.profile.professionalInformation.education?.map(
                  (edu) => (
                    <div
                      key={edu.id}
                      className="p-4 border rounded-2xl relative bg-white shadow-md transition-all duration-200 border-gray-300 hover:shadow-lg w-full max-w-full overflow-x-hidden"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree || ""}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                            className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                            placeholder="Bachelor of Computer Science"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution || ""}
                            onChange={(e) =>
                              updateEducation(edu.id, "institution", e.target.value)
                            }
                            className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                            placeholder="University Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Year of Graduation</Label>
                          <Input
                            type="number"
                            value={edu.year || ""}
                            onChange={(e) =>
                              updateEducation(edu.id, "year", e.target.value)
                            }
                            className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                            placeholder="2023"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Percentage/CGPA</Label>
                          <Input
                            value={edu.percentage || ""}
                            type="number"
                            onChange={(e) =>
                              updateEducation(edu.id, "percentage", e.target.value)
                            }
                            className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                            placeholder="85% or 8.5 CGPA"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.fieldOfStudy || ""}
                            onChange={(e) =>
                              updateEducation(edu.id, "fieldOfStudy", e.target.value)
                            }
                            className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                            placeholder="Computer Science, Electrical Engineering, etc."
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              {profileData.profile.professionalInformation.education.length ===
                0 && (
                  <p className="text-center text-gray-500">
                    No education entries added yet.
                  </p>
                )}
            </CardContent>
          </Card>

          <Card ref={sectionRefs.workExperience} id="workExperience" className="rounded-3xl border-0 shadow-lg scroll-mt-24 w-full max-w-full overflow-x-hidden">
            <CardHeader className="px-4 sm:p-6">
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                  <span>Work Experience</span>
                </div>
                <Button
                  onClick={addWorkExperience}
                  variant="outline"
                  className="rounded-2xl w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Work Experience
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 overflow-x-hidden px-4 sm:p-6 pt-0">
              {Array.isArray(profileData.profile.professionalInformation?.workExperience) &&
                profileData.profile.professionalInformation.workExperience.length > 0 &&
                sortWorkExperience(profileData.profile.professionalInformation.workExperience)?.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 border rounded-2xl relative bg-white shadow-md transition-all duration-200 border-gray-300 hover:shadow-lg w-full max-w-full overflow-x-hidden"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWorkExperience(exp.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input
                          value={exp.company || ""}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "company", e.target.value)
                          }
                          className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={exp.jobTitle || ""}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "jobTitle", e.target.value)
                          }
                          className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={exp.location || ""}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "location", e.target.value)
                          }
                          className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={formatDateForInput(exp.startDate)}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "startDate", e.target.value)
                          }
                          max={exp.currentlyWorking ? undefined : new Date().toISOString().split('T')[0]}
                          className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={formatDateForInput(exp.endDate)}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "endDate", e.target.value)
                          }
                          min={formatDateForInput(exp.startDate) || undefined}
                          max={new Date().toISOString().split('T')[0]}
                          className="rounded-lg border-gray-300 focus:border-orange-500 w-full"
                          disabled={exp.currentlyWorking}
                        />
                      </div>
                      <div className="space-y-2 flex items-end">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`currently-working-${exp.id}`}
                            checked={exp.currentlyWorking || false}
                            onChange={(e) =>
                              updateWorkExperience(exp.id, "currentlyWorking", e.target.checked)
                            }
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 accent-orange-600 cursor-pointer"
                          />
                          <Label htmlFor={`currently-working-${exp.id}`} className="cursor-pointer">
                            Currently Working Here
                          </Label>
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={exp.description || ""}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "description", e.target.value)
                          }
                          className="rounded-lg border-gray-300 focus:border-orange-500 min-h-[100px]"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              {(!Array.isArray(profileData.profile.professionalInformation?.workExperience) ||
                profileData.profile.professionalInformation.workExperience.length === 0) && (
                <p className="text-center text-gray-500">
                  No work experience entries added yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card ref={sectionRefs.languages} id="languages" className="rounded-3xl border-0 shadow-lg scroll-mt-24 w-full max-w-full overflow-x-hidden">
            <CardHeader className="px-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-orange-600" />
                <span>Languages</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 overflow-x-hidden px-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Language</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Read</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Write</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Speak</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700 w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.profile.languages?.map((language) => (
                      <tr key={language.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <Select
                            key={`language-select-${language.id}`}
                            value={language.name || ""}
                            onValueChange={(selectedValue) => {
                              // Capture the specific language id to ensure we update only this one
                              const currentLangId = language.id;
                              updateLanguage(currentLangId, "name", selectedValue);
                            }}
                          >
                            <SelectTrigger 
                              id={`language-trigger-${language.id}`}
                              className="rounded-lg border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 shadow-none w-full max-w-full"
                            >
                              <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent key={`language-content-${language.id}`} className="max-h-[300px]">
                              {indianLanguages.map((lang) => (
                                <SelectItem key={`${language.id}-${lang}`} value={lang}>
                                  {lang}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            id={`read-${language.id}`}
                            checked={language.read || false}
                            onChange={(e) =>
                              updateLanguage(language.id, "read", e.target.checked)
                            }
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 accent-orange-600 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            id={`write-${language.id}`}
                            checked={language.write || false}
                            onChange={(e) =>
                              updateLanguage(language.id, "write", e.target.checked)
                            }
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 accent-orange-600 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            id={`speak-${language.id}`}
                            checked={language.speak || false}
                            onChange={(e) =>
                              updateLanguage(language.id, "speak", e.target.checked)
                            }
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 accent-orange-600 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLanguage(language.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {profileData.profile.languages.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No languages added yet.
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Select
                  value=""
                  onValueChange={(value) => {
                    setNewLanguage(value);
                    // Auto-add language when selected
                    if (
                      value.trim() &&
                      !profileData.profile.languages.some(lang => lang.name.toLowerCase() === value.trim().toLowerCase())
                    ) {
                      const newLangEntry = {
                        id: Date.now().toString() + Math.random(),
                        name: value.trim(),
                        read: false,
                        write: false,
                        speak: false,
                      };
                      setProfileData((prev) => ({
                        ...prev,
                        profile: {
                          ...prev.profile,
                          languages: [...prev.profile.languages, newLangEntry],
                        },
                      }));
                      setNewLanguage("");
                      toast.success("Language added successfully!");
                    }
                  }}
                >
                  <SelectTrigger className="rounded-lg border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 shadow-none flex-1 w-full">
                    <SelectValue placeholder="Select a language to add" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {indianLanguages
                      .filter(lang => !profileData.profile.languages?.some(l => l.name.toLowerCase() === lang.toLowerCase()))
                      .map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              className="rounded-2xl px-8 py-3 text-lg bg-orange-600 text-white hover:bg-orange-700"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Profile
            </Button>
          </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
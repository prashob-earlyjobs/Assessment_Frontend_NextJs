"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import {
    User,
    UserCircle,
    Globe,
    Settings as SettingsIcon,
    Upload,
    Save,
    Loader2,
    Link as LinkIcon,
    Lock,
    Bell,
    Shield,
    FileText,
    X,
    Plus,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../../context";
import { updateProfile, uploadPhoto, uploadResume } from "../../components/services/servicesapis";
import { PRIMARY_COLOR, PRIMARY_COLOR_DARK } from "../../../constants/theme";
import Header from "./header";
import Footer from "./footer";
import NavbarV2 from "../v2/navbar/navbar.v2";

const Settings = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userCredentials, setUserCredentials } = useUser();
    
    // Get initial tab from query params or default to "personal"
    const tabFromUrl = searchParams.get("tab");
    const validTabs = ["personal", "profile", "social", "account"];
    const initialTab = tabFromUrl && validTabs.includes(tabFromUrl) ? tabFromUrl : "personal";
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadingResume, setIsUploadingResume] = useState(false);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const resumeInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [resumeDragActive, setResumeDragActive] = useState(false);

    // Personal Tab Data
    const [personalData, setPersonalData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        address: {
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
        },
        title: "",
        experience: "",
        education: "",
        personalWebsite: "",
        profilePhoto: "",
        resumeUrl: "",
        resumeFileName: "",
    });

    // Profile Tab Data
    const [profileData, setProfileData] = useState({
        bio: "",
        expectedRole: "",
        preferredWorkMode: "",
        expectedSalary: "",
        totalExperience: "",
        workExperience: [] as Array<{
            id: string;
            companyName: string;
            role: string;
            location: string;
            startDate: string;
            endDate: string;
            currentlyWorking: boolean;
        }>,
        education: [] as Array<{
            id: string;
            degree: string;
            institution: string;
            year: string;
            percentage: string;
            fieldOfStudy: string;
        }>,
        skills: [] as string[],
        languages: [] as Array<{
            id: string;
            language: string;
            read: boolean;
            write: boolean;
            speak: boolean;
        }>,
    });

    // Social Links Data
    const [socialLinks, setSocialLinks] = useState({
        linkedin: "",
        twitter: "",
        github: "",
        portfolio: "",
    });

    // Account Settings Data
    const [accountSettings, setAccountSettings] = useState({
        emailNotifications: true,
        smsNotifications: true,
        jobAlerts: true,
        marketingEmails: false,
    });

    useEffect(() => {
        if (userCredentials) {
            setPersonalData({
                fullName: userCredentials.name || "",
                email: userCredentials.email || "",
                phone: userCredentials.mobile || "",
                gender: userCredentials.profile?.gender || "",
                address: {
                    street: userCredentials.profile?.address?.street || "",
                    city: userCredentials.profile?.address?.city || "",
                    state: userCredentials.profile?.address?.state || "",
                    country: userCredentials.profile?.address?.country || "",
                    zipCode: userCredentials.profile?.address?.zipCode || "",
                },
                title: userCredentials.profile?.preferredJobRole || "",
                experience: "",
                education: "",
                personalWebsite: "",
                profilePhoto: userCredentials.avatar || "",
                resumeUrl: userCredentials.profile?.resumeUrl || "",
                resumeFileName: "",
            });
            setProfileData({
                bio: userCredentials.profile?.bio || "",
                expectedRole: userCredentials.profile?.preferredJobRole || "",
                preferredWorkMode: (userCredentials.profile as any)?.professionalInformation?.workMode || "",
                expectedSalary: (userCredentials.profile as any)?.professionalInformation?.expectedSalaryAnnual || "",
                totalExperience: (userCredentials.profile as any)?.professionalInformation?.experience?.toString() || "",
                workExperience: ((userCredentials.profile as any)?.professionalInformation?.workExperience || []).map((exp: any) => ({
                    id: exp.id || Date.now().toString(),
                    companyName: exp.company || "",
                    role: exp.jobTitle || "",
                    location: exp.location || "",
                    startDate: exp.startDate || "",
                    endDate: exp.endDate || "",
                    currentlyWorking: exp.currentlyWorking || false,
                })),
                education: ((userCredentials.profile as any)?.professionalInformation?.education || userCredentials.profile?.education || []).map((edu: any) => ({
                    id: edu.id || Date.now().toString(),
                    degree: edu.degree || "",
                    institution: edu.institution || "",
                    year: edu.year || "",
                    percentage: edu.percentage || "",
                    fieldOfStudy: edu.fieldOfStudy || "",
                })),
                skills: userCredentials.profile?.skills || [],
                languages: (userCredentials.profile as any)?.languages || [],
            });
            
            // Load Social Links
            const socialLinksData = (userCredentials.profile as any)?.socialLinks || {};
            setSocialLinks({
                linkedin: socialLinksData.linkedin || "",
                twitter: socialLinksData.twitter || "",
                github: socialLinksData.github || "",
                portfolio: socialLinksData.portfolio || "",
            });
            
            // Load Account Settings
            const preferencesData = (userCredentials.profile as any)?.preferences || {};
            setAccountSettings({
                emailNotifications: preferencesData.emailNotifications !== undefined ? preferencesData.emailNotifications : true,
                smsNotifications: preferencesData.smsNotifications !== undefined ? preferencesData.smsNotifications : true,
                jobAlerts: preferencesData.jobAlerts !== undefined ? preferencesData.jobAlerts : true,
                marketingEmails: preferencesData.marketingEmails !== undefined ? preferencesData.marketingEmails : false,
            });
        }
    }, [userCredentials]);

    const handlePhotoUpload = async (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Photo size should be less than 5MB");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        setIsUploading(true);
        try {
            const url = await uploadPhoto(file, userCredentials?.email || "");
            if (url) {
                setPersonalData((prev) => ({ ...prev, profilePhoto: url }));
                toast.success("Photo uploaded successfully!");
            }
        } catch (error) {
            toast.error("Failed to upload photo. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handlePhotoUpload(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handlePhotoUpload(e.dataTransfer.files[0]);
        }
    };

    const handleResumeUpload = async (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Resume size should be less than 5MB");
            return;
        }

        if (file.type !== "application/pdf") {
            toast.error("Please upload a PDF document only");
            return;
        }

        setIsUploadingResume(true);
        try {
            const candidateId = userCredentials?.userId || userCredentials?._id || userCredentials?.email || "";
            const url = await uploadResume(file, candidateId);
            if (url) {
                setPersonalData((prev) => ({ 
                    ...prev, 
                    resumeUrl: url,
                    resumeFileName: file.name 
                }));
                toast.success("Resume uploaded successfully!");
            }
        } catch (error) {
            toast.error("Failed to upload resume. Please try again.");
        } finally {
            setIsUploadingResume(false);
        }
    };

    const handleResumeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleResumeUpload(file);
        }
    };

    const handleResumeDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setResumeDragActive(true);
        } else if (e.type === "dragleave") {
            setResumeDragActive(false);
        }
    };

    const handleResumeDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setResumeDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleResumeUpload(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveResume = () => {
        setPersonalData((prev) => ({ 
            ...prev, 
            resumeUrl: "",
            resumeFileName: "" 
        }));
        if (resumeInputRef.current) {
            resumeInputRef.current.value = "";
        }
        toast.success("Resume removed");
    };

    // Sync activeTab with URL query parameter on mount and when URL changes
    console.log("activeTab", activeTab);
    useEffect(() => {
        const tabFromUrl = searchParams.get("tab");
        const validTabs = ["personal", "profile", "social", "account"];
        if (tabFromUrl && validTabs.includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        }
    }, [searchParams]);

    // Handle tab change and update URL
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`/settings?tab=${tabId}`, { scroll: false });
    };

    // Helper function to check if a field has a value
    const hasValue = (field: any) => {
        if (field === null || field === undefined) return false;
        const strValue = typeof field === 'string' ? field.trim() : String(field).trim();
        return strValue !== '';
    };

    // Personal Tab Save Function
    const handleSaveChangesPersonal = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            // Validate Personal tab required fields
            if (!hasValue(personalData.fullName)) {
                toast.error("Full name is required.");
                setIsLoading(false);
                return;
            }

            if (!hasValue(personalData.email)) {
                toast.error("Email is required.");
                setIsLoading(false);
                return;
            }

            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
                toast.error("Please enter a valid email address.");
                setIsLoading(false);
                return;
            }

            if (!hasValue(personalData.phone)) {
                toast.error("Phone number is required.");
                setIsLoading(false);
                return;
            }

            // Validate phone format (10 digits)
            if (!/^[6-9]\d{9}$/.test(personalData.phone.replace(/\s/g, ''))) {
                toast.error("Please enter a valid 10-digit phone number.");
                setIsLoading(false);
                return;
            }

            if (!hasValue(personalData.gender)) {
                toast.error("Gender is required.");
                setIsLoading(false);
                return;
            }

            // Validate address fields
            if (!hasValue(personalData.address.street)) {
                toast.error("Street address is required.");
                setIsLoading(false);
                return;
            }

            if (!hasValue(personalData.address.city)) {
                toast.error("City is required.");
                setIsLoading(false);
                return;
            }

            if (!hasValue(personalData.address.state)) {
                toast.error("State is required.");
                setIsLoading(false);
                return;
            }

            if (!hasValue(personalData.address.country)) {
                toast.error("Country is required.");
                setIsLoading(false);
                return;
            }

            if (!hasValue(personalData.address.zipCode)) {
                toast.error("Zip/Postal code is required.");
                setIsLoading(false);
                return;
            }

            // Build payload for Personal tab
            const payload = {
                name: personalData.fullName,
                email: personalData.email,
                mobile: personalData.phone,
                avatar: personalData.profilePhoto,
                profile: {
                    ...userCredentials?.profile,
                    gender: personalData.gender,
                    resumeUrl: personalData.resumeUrl,
                    address: {
                        ...userCredentials?.profile?.address,
                        street: personalData.address.street,
                        city: personalData.address.city,
                        state: personalData.address.state,
                        country: personalData.address.country,
                        zipCode: personalData.address.zipCode,
                    },
                },
            };

            console.log("Personal tab payload:", payload);
            const response = await updateProfile(payload);

            if (!response.success) {
                throw new Error(response.message || "Failed to update personal information");
            }

            const updatedUserData = {
                ...response.data.user,
                avatar: personalData.profilePhoto,
                resumeUrl: personalData.resumeUrl,
            };

            setUserCredentials(updatedUserData);
            toast.success("Personal information saved successfully!");
        } catch (error: any) {
            console.error("Error saving personal information:", error);
            toast.error(error?.response?.data?.message || error?.message || "Error saving personal information");
        } finally {
            setIsLoading(false);
        }
    };

    // Profile Tab Save Function
    const handleSaveChangesProfile = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            // Validate Profile tab required fields
            if (!hasValue(profileData.expectedRole)) {
                toast.error("Expected Role is required. Please enter your expected role.");
                setIsLoading(false);
                return;
            }

            if (!Array.isArray(profileData.skills) || profileData.skills.length === 0) {
                toast.error("Skills are required. Please add at least one skill.");
                setIsLoading(false);
                return;
            }

            // Validate work experience entries
            if (profileData.workExperience && profileData.workExperience.length > 0) {
                // Check that only one entry has "Currently Working" checked
                const currentlyWorkingEntries = profileData.workExperience.filter(
                    (exp) => exp.currentlyWorking === true
                );
                if (currentlyWorkingEntries.length > 1) {
                    toast.error("Only one work experience entry can be marked as 'Currently Working Here'");
                    setIsLoading(false);
                    return;
                }

                // Check each work experience entry for incomplete required fields and date validations
                for (let i = 0; i < profileData.workExperience.length; i++) {
                    const exp = profileData.workExperience[i];
                    const hasCompany = hasValue(exp.companyName);
                    const hasJobTitle = hasValue(exp.role);
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
                        toast.error(`Work Experience ${i + 1}: Please fill all required fields or leave all fields empty`);
                        setIsLoading(false);
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
                                setIsLoading(false);
                                return;
                            }

                            // Check if end date is in the future
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            if (endDate > today) {
                                toast.error(`Work Experience ${i + 1}: End date cannot be in the future`);
                                setIsLoading(false);
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
                                setIsLoading(false);
                                return;
                            }
                        }
                    }
                }
            }

            // Validate education entries
            if (profileData.education && profileData.education.length > 0) {
                // Check each education entry for incomplete fields
                for (const edu of profileData.education) {
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
                        setIsLoading(false);
                        return;
                    }
                }
            }

            // Transform work experience data
            const workExperienceData = profileData.workExperience
                .map((exp) => ({
                    company: exp.companyName,
                    jobTitle: exp.role,
                    startDate: exp.startDate || "",
                    endDate: exp.currentlyWorking ? "" : (exp.endDate || ""),
                    currentlyWorking: exp.currentlyWorking,
                    description: "",
                    location: exp.location || "",
                }))
                .filter((exp) => {
                    // Only include if all required fields are filled
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
                })
                .map((exp: any) => {
                    const { id, ...expWithoutId } = exp;
                    return expWithoutId;
                });

            // Transform education data
            const educationData = profileData.education
                .map((edu: any) => {
                    const { id, ...eduWithoutId } = edu;
                    return eduWithoutId;
                })
                .filter((edu: any) => {
                    // Only include if all fields are filled
                    return hasValue(edu.degree) &&
                        hasValue(edu.institution) &&
                        hasValue(edu.year) &&
                        hasValue(edu.percentage) &&
                        hasValue(edu.fieldOfStudy);
                });

            // Transform languages data (remove id field)
            const languagesData = profileData.languages
                .filter((lang) => lang.language)
                .map((lang: any) => {
                    const { id, ...langWithoutId } = lang;
                    return {
                        name: langWithoutId.language,
                        read: langWithoutId.read,
                        write: langWithoutId.write,
                        speak: langWithoutId.speak,
                    };
                });

            // Build payload for Profile tab
            const payload = {
                name: userCredentials?.name || "",
                email: userCredentials?.email || "",
                mobile: userCredentials?.mobile || "",
                avatar: userCredentials?.avatar || "",
                profile: {
                    ...userCredentials?.profile,
                    preferredJobRole: profileData.expectedRole,
                    bio: profileData.bio,
                    skills: profileData.skills,
                    languages: languagesData,
                    professionalInformation: {
                        ...(userCredentials?.profile as any)?.professionalInformation,
                        currentJobTitle: profileData.expectedRole,
                        expectedSalaryAnnual: profileData.expectedSalary,
                        workMode: profileData.preferredWorkMode,
                        experience: profileData.totalExperience ? parseInt(profileData.totalExperience) : 0,
                        workExperience: workExperienceData,
                        education: educationData,
                    },
                },
            };

            console.log("Profile tab payload:", payload);
            const response = await updateProfile(payload);

            if (!response.success) {
                throw new Error(response.message || "Failed to update profile");
            }

            const updatedUserData = {
                ...response.data.user,
            };

            setUserCredentials(updatedUserData);
            toast.success("Profile information saved successfully!");
        } catch (error: any) {
            console.error("Error saving profile:", error);
            toast.error(error?.response?.data?.message || error?.message || "Error saving profile information");
        } finally {
            setIsLoading(false);
        }
    };

    // Social Links Tab Save Function
    const handleSaveChangesSocial = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            // Build payload for Social Links tab
            const payload = {
                name: userCredentials?.name || "",
                email: userCredentials?.email || "",
                mobile: userCredentials?.mobile || "",
                avatar: userCredentials?.avatar || "",
                profile: {
                    ...userCredentials?.profile,
                    socialLinks: {
                        linkedin: socialLinks.linkedin,
                        twitter: socialLinks.twitter,
                        github: socialLinks.github,
                        portfolio: socialLinks.portfolio,
                    },
                },
            };

            console.log("Social Links tab payload:", payload);
            const response = await updateProfile(payload);

            if (!response.success) {
                throw new Error(response.message || "Failed to update social links");
            }

            const updatedUserData = {
                ...response.data.user,
            };

            setUserCredentials(updatedUserData);
            toast.success("Social links saved successfully!");
        } catch (error: any) {
            console.error("Error saving social links:", error);
            toast.error(error?.response?.data?.message || error?.message || "Error saving social links");
        } finally {
            setIsLoading(false);
        }
    };

    // Account Settings Tab Save Function
    const handleSaveChangesAccount = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            // Build payload for Account Settings tab
            const payload = {
                name: userCredentials?.name || "",
                email: userCredentials?.email || "",
                mobile: userCredentials?.mobile || "",
                avatar: userCredentials?.avatar || "",
                profile: {
                    ...userCredentials?.profile,
                    preferences: {
                        emailNotifications: accountSettings.emailNotifications,
                        smsNotifications: accountSettings.smsNotifications,
                        jobAlerts: accountSettings.jobAlerts,
                        marketingEmails: accountSettings.marketingEmails,
                    },
                },
            };

            console.log("Account Settings tab payload:", payload);
            const response = await updateProfile(payload);

            if (!response.success) {
                throw new Error(response.message || "Failed to update account settings");
            }

            const updatedUserData = {
                ...response.data.user,
            };

            setUserCredentials(updatedUserData);
            toast.success("Account settings saved successfully!");
        } catch (error: any) {
            console.error("Error saving account settings:", error);
            toast.error(error?.response?.data?.message || error?.message || "Error saving account settings");
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: "personal", label: "Personal", icon: User },
        { id: "profile", label: "Profile", icon: UserCircle },
        { id: "social", label: "Social Links", icon: Globe },
        { id: "account", label: "Account Setting", icon: SettingsIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarV2 />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Setting</h1>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${isActive
                                            ? "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }
                                        style={isActive ? { borderBottomColor: PRIMARY_COLOR, color: PRIMARY_COLOR } : {}}
                  `}
                                >
                                    <Icon className={`h-5 w-5 ${isActive ? "" : "text-gray-400"}`} style={isActive ? { color: PRIMARY_COLOR } : {}} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Personal Tab */}
                {activeTab === "personal" && (
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>

                            <section className="flex justify-around">
                                {/* Profile Picture - Just Below Heading */}
                                 <div className="w1/3">
                                 <Label htmlFor="profilePhoto" className="text-gray-900 block mb-1">Profile Picture</Label>
                                    <div
                                        className={`
                    border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors aspect-square w-full max-w-[200px] mx-auto flex items-center justify-center
                    ${dragActive
                                                ? "border-gray-300 hover:border-gray-400 bg-white"
                                                : "border-gray-300 hover:border-gray-400 bg-white"
                                            }
                                            style={dragActive ? { borderColor: PRIMARY_COLOR, backgroundColor: "#FFF7ED" } : {}}
                  `}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => photoInputRef.current?.click()}
                                    >
                                        <input
                                            ref={photoInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInput}
                                            className="hidden"
                                        />

                                        {personalData.profilePhoto ? (
                                            <div className="space-y-4">
                                                <img
                                                    src={personalData.profilePhoto}
                                                    alt="Profile"
                                                    className="w-32 h-32 mx-auto rounded-full object-cover"
                                                />
                                                <div>
                                                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-600">
                                                        Click or drag to change photo
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                                        Browse photo or drop here
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        A photo larger than 400 pixels work best. Max photo size 5 MB.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {isUploading && (
                                            <div className="mt-4">
                                                <Loader2 className="h-6 w-6 mx-auto animate-spin" style={{ color: PRIMARY_COLOR }} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-2/3">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="text-gray-900">Full name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="fullName"
                                            value={personalData.fullName}
                                            onChange={(e) =>
                                                setPersonalData({ ...personalData, fullName: e.target.value })
                                            }
                                            placeholder="Enter your full name"
                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-900">Email <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={personalData.email}
                                            onChange={(e) =>
                                                setPersonalData({ ...personalData, email: e.target.value })
                                            }
                                            placeholder="your@email.com"
                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-900">Phone <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={personalData.phone}
                                            onChange={(e) =>
                                                setPersonalData({ ...personalData, phone: e.target.value })
                                            }
                                            placeholder="9876543210"
                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender" className="text-gray-900">Gender <span className="text-red-500">*</span></Label>
                                        <Select
                                            value={personalData.gender}
                                            onValueChange={(value) =>
                                                setPersonalData({ ...personalData, gender: value })
                                            }
                                        >
                                            <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                                                <SelectValue placeholder="Select gender..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white text-gray-900">
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Address Fields */}
                                    <div className="space-y-2 md:col-span-2 mt-4">
                                        <Label className="text-gray-900">Address <span className="text-red-500">*</span></Label>
                                        <div className="space-y-4">
                                            <Input
                                                id="street"
                                                value={personalData.address.street}
                                                onChange={(e) =>
                                                    setPersonalData({
                                                        ...personalData,
                                                        address: { ...personalData.address, street: e.target.value },
                                                    })
                                                }
                                                placeholder="Street address"
                                                className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                required
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="city" className="text-gray-900 text-sm">City <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="city"
                                                        value={personalData.address.city}
                                                        onChange={(e) =>
                                                            setPersonalData({
                                                                ...personalData,
                                                                address: { ...personalData.address, city: e.target.value },
                                                            })
                                                        }
                                                        placeholder="City"
                                                        className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="state" className="text-gray-900 text-sm">State <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="state"
                                                        value={personalData.address.state}
                                                        onChange={(e) =>
                                                            setPersonalData({
                                                                ...personalData,
                                                                address: { ...personalData.address, state: e.target.value },
                                                            })
                                                        }
                                                        placeholder="State"
                                                        className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="country" className="text-gray-900 text-sm">Country <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="country"
                                                        value={personalData.address.country}
                                                        onChange={(e) =>
                                                            setPersonalData({
                                                                ...personalData,
                                                                address: { ...personalData.address, country: e.target.value },
                                                            })
                                                        }
                                                        placeholder="Country"
                                                        className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zipCode" className="text-gray-900 text-sm">Zip/Postal Code <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="zipCode"
                                                        value={personalData.address.zipCode}
                                                        onChange={(e) =>
                                                            setPersonalData({
                                                                ...personalData,
                                                                address: { ...personalData.address, zipCode: e.target.value },
                                                            })
                                                        }
                                                        placeholder="Zip/Postal Code"
                                                        className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="website" className="text-gray-900">Personal Website</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="website"
                                                type="url"
                                                value={personalData.personalWebsite}
                                                onChange={(e) =>
                                                    setPersonalData({
                                                        ...personalData,
                                                        personalWebsite: e.target.value,
                                                    })
                                                }
                                                placeholder="Website url..."
                                                className="pl-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* CV/Resume Upload */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="resume" className="text-gray-900">Your CV/Resume</Label>
                                        <div
                                            className={`
                                                border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors max-w-md
                                                ${
                                                    resumeDragActive
                                                ? "border-gray-300 hover:border-gray-400 bg-white"
                                                : "border-gray-300 hover:border-gray-400 bg-white"
                                            }
                                            style={resumeDragActive ? { borderColor: PRIMARY_COLOR, backgroundColor: "#FFF7ED" } : {}}
                                            `}
                                            onDragEnter={handleResumeDrag}
                                            onDragLeave={handleResumeDrag}
                                            onDragOver={handleResumeDrag}
                                            onDrop={handleResumeDrop}
                                            onClick={() => resumeInputRef.current?.click()}
                                        >
                                            <input
                                                ref={resumeInputRef}
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleResumeFileInput}
                                                className="hidden"
                                            />
                                            
                                            {personalData.resumeUrl ? (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <FileText className="h-6 w-6 flex-shrink-0" style={{ color: PRIMARY_COLOR }} />
                                                        <div className="text-left flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {personalData.resumeFileName || "Resume.pdf"}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Click to replace or drag a new file
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRemoveResume();
                                                            }}
                                                            className="ml-2 p-1 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                                                        >
                                                            <X className="h-4 w-4 text-red-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <Upload className="h-6 w-6 mx-auto text-gray-400" />
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-700 mb-1">
                                                            Browse resume or drop here
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            PDF document only. Max file size 5 MB.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {isUploadingResume && (
                                                <div className="mt-2">
                                                    <Loader2 className="h-5 w-5 mx-auto animate-spin" style={{ color: PRIMARY_COLOR }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>


                            {/* Form Fields */}
                           

                            <div className="mt-8 flex justify-end">
                                <Button
                                    onClick={handleSaveChangesPersonal}
                                    disabled={isLoading}
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                    className="hover:opacity-90 text-white px-8"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                            
                            <div className="w-f space-y-6">
                                {/* About & Preferences */}
                                <div className="space-y-4 p-4  rounded-lg bg-gray-50">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">About & Preferences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="bio" className="text-gray-900">Bio / Summary</Label>
                                            <textarea
                                                id="bio"
                                                value={profileData.bio}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, bio: e.target.value })
                                                }
                                                placeholder="Tell us about yourself..."
                                                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white text-gray-900 placeholder:text-gray-400"
                                                style={{ "--tw-ring-color": PRIMARY_COLOR } as React.CSSProperties}
                                                onFocus={(e) => { e.target.style.borderColor = PRIMARY_COLOR; e.target.style.boxShadow = `0 0 0 2px ${PRIMARY_COLOR}33`; }}
                                                onBlur={(e) => { e.target.style.borderColor = "#d1d5db"; e.target.style.boxShadow = ""; }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="expectedRole" className="text-gray-900">Expected Role</Label>
                                            <Input
                                                id="expectedRole"
                                                value={profileData.expectedRole}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, expectedRole: e.target.value })
                                                }
                                                placeholder="e.g., Software Engineer"
                                                className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="workMode" className="text-gray-900">Preferred Work Mode</Label>
                                            <Select
                                                value={profileData.preferredWorkMode}
                                                onValueChange={(value) =>
                                                    setProfileData({ ...profileData, preferredWorkMode: value })
                                                }
                                            >
                                                <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                                                    <SelectValue placeholder="Select work mode..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white text-gray-900">
                                                    <SelectItem value="onsite">Onsite</SelectItem>
                                                    <SelectItem value="remote">Remote</SelectItem>
                                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="expectedSalary" className="text-gray-900">Expected Salary (Annual)</Label>
                                            <Input
                                                id="expectedSalary"
                                                type="number"
                                                value={profileData.expectedSalary}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, expectedSalary: e.target.value })
                                                }
                                                placeholder="e.g., 500000"
                                                className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="totalExperience" className="text-gray-900">Total Experience (Years)</Label>
                                            <Input
                                                id="totalExperience"
                                                type="number"
                                                value={profileData.totalExperience}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, totalExperience: e.target.value })
                                                }
                                                placeholder="e.g., 5"
                                                className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Work Experience */}
                                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-semibold text-gray-900">Work Experience</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setProfileData({
                                                    ...profileData,
                                                    workExperience: [
                                                        ...profileData.workExperience,
                                                        {
                                                            id: Date.now().toString(),
                                                            companyName: "",
                                                            role: "",
                                                            location: "",
                                                            startDate: "",
                                                            endDate: "",
                                                            currentlyWorking: false,
                                                        },
                                                    ],
                                                });
                                            }}
                                            className="bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Experience
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {profileData.workExperience.map((exp, index) => (
                                            <div key={exp.id} className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Experience {index + 1}</span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setProfileData({
                                                                ...profileData,
                                                                workExperience: profileData.workExperience.filter((e) => e.id !== exp.id),
                                                            });
                                                        }}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Company</Label>
                                                        <Input
                                                            value={exp.companyName}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.workExperience];
                                                                updated[index].companyName = e.target.value;
                                                                setProfileData({ ...profileData, workExperience: updated });
                                                            }}
                                                            placeholder="Company name"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Job Title</Label>
                                                        <Input
                                                            value={exp.role}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.workExperience];
                                                                updated[index].role = e.target.value;
                                                                setProfileData({ ...profileData, workExperience: updated });
                                                            }}
                                                            placeholder="Job title"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Location</Label>
                                                        <Input
                                                            value={exp.location}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.workExperience];
                                                                updated[index].location = e.target.value;
                                                                setProfileData({ ...profileData, workExperience: updated });
                                                            }}
                                                            placeholder="City, State"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Start Date</Label>
                                                        <Input
                                                            type="date"
                                                            value={exp.startDate}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.workExperience];
                                                                updated[index].startDate = e.target.value;
                                                                setProfileData({ ...profileData, workExperience: updated });
                                                            }}
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">End Date</Label>
                                                        <Input
                                                            type="date"
                                                            value={exp.endDate}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.workExperience];
                                                                updated[index].endDate = e.target.value;
                                                                setProfileData({ ...profileData, workExperience: updated });
                                                            }}
                                                            disabled={exp.currentlyWorking}
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 flex items-end">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={exp.currentlyWorking}
                                                                onChange={(e) => {
                                                                    const updated = [...profileData.workExperience];
                                                                    updated[index].currentlyWorking = e.target.checked;
                                                                    if (e.target.checked) {
                                                                        updated[index].endDate = "";
                                                                    }
                                                                    setProfileData({ ...profileData, workExperience: updated });
                                                                }}
                                                                style={{ accentColor: PRIMARY_COLOR }}
                                                                className="w-4 h-4 border-gray-300 rounded"
                                                            />
                                                            <span className="text-sm text-gray-700">Currently working here</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {profileData.workExperience.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">No work experience added yet.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Education Details */}
                                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-semibold text-gray-900">Education Details</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setProfileData({
                                                    ...profileData,
                                                    education: [
                                                        ...profileData.education,
                                                        {
                                                            id: Date.now().toString(),
                                                            degree: "",
                                                            institution: "",
                                                            year: "",
                                                            percentage: "",
                                                            fieldOfStudy: "",
                                                        },
                                                    ],
                                                });
                                            }}
                                            className="bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Education
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {profileData.education.map((edu, index) => (
                                            <div key={edu.id} className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Education {index + 1}</span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setProfileData({
                                                                ...profileData,
                                                                education: profileData.education.filter((e) => e.id !== edu.id),
                                                            });
                                                        }}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Degree</Label>
                                                        <Input
                                                            value={edu.degree}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.education];
                                                                updated[index].degree = e.target.value;
                                                                setProfileData({ ...profileData, education: updated });
                                                            }}
                                                            placeholder="e.g., B.Tech"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Institution</Label>
                                                        <Input
                                                            value={edu.institution}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.education];
                                                                updated[index].institution = e.target.value;
                                                                setProfileData({ ...profileData, education: updated });
                                                            }}
                                                            placeholder="Institution name"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Year of Graduation</Label>
                                                        <Input
                                                            value={edu.year}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.education];
                                                                updated[index].year = e.target.value;
                                                                setProfileData({ ...profileData, education: updated });
                                                            }}
                                                            placeholder="e.g., 2020"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Percentage/CGPA</Label>
                                                        <Input
                                                            value={edu.percentage}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.education];
                                                                updated[index].percentage = e.target.value;
                                                                setProfileData({ ...profileData, education: updated });
                                                            }}
                                                            placeholder="e.g., 85% or 8.5"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label className="text-gray-900">Field of Study</Label>
                                                        <Input
                                                            value={edu.fieldOfStudy}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.education];
                                                                updated[index].fieldOfStudy = e.target.value;
                                                                setProfileData({ ...profileData, education: updated });
                                                            }}
                                                            placeholder="e.g., Computer Science"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {profileData.education.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">No education details added yet.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Skills</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {profileData.skills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                                                    style={{ backgroundColor: "#FFF7ED", color: PRIMARY_COLOR }}
                                                >
                                                    <span>{skill}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setProfileData({
                                                                ...profileData,
                                                                skills: profileData.skills.filter((_, i) => i !== index),
                                                            });
                                                        }}
                                                        className="hover:text-blue-900"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add a skill and press Enter"
                                                className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        const input = e.target as HTMLInputElement;
                                                        const skill = input.value.trim();
                                                        if (skill && !profileData.skills.includes(skill)) {
                                                            setProfileData({
                                                                ...profileData,
                                                                skills: [...profileData.skills, skill],
                                                            });
                                                            input.value = "";
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-semibold text-gray-900">Languages Known</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setProfileData({
                                                    ...profileData,
                                                    languages: [
                                                        ...profileData.languages,
                                                        {
                                                            id: Date.now().toString(),
                                                            language: "",
                                                            read: false,
                                                            write: false,
                                                            speak: false,
                                                        },
                                                    ],
                                                });
                                            }}
                                            className="bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Language
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {profileData.languages.map((lang, index) => (
                                            <div key={lang.id} className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Language {index + 1}</span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setProfileData({
                                                                ...profileData,
                                                                languages: profileData.languages.filter((l) => l.id !== lang.id),
                                                            });
                                                        }}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Language</Label>
                                                        <Input
                                                            value={lang.language}
                                                            onChange={(e) => {
                                                                const updated = [...profileData.languages];
                                                                updated[index].language = e.target.value;
                                                                setProfileData({ ...profileData, languages: updated });
                                                            }}
                                                            placeholder="e.g., English"
                                                            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-gray-900">Proficiency</Label>
                                                        <div className="flex gap-4 mt-2">
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={lang.read}
                                                                    onChange={(e) => {
                                                                        const updated = [...profileData.languages];
                                                                        updated[index].read = e.target.checked;
                                                                        setProfileData({ ...profileData, languages: updated });
                                                                    }}
                                                                    style={{ accentColor: PRIMARY_COLOR }}
                                                                className="w-4 h-4 border-gray-300 rounded"
                                                                />
                                                                <span className="text-sm text-gray-700">Read</span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={lang.write}
                                                                    onChange={(e) => {
                                                                        const updated = [...profileData.languages];
                                                                        updated[index].write = e.target.checked;
                                                                        setProfileData({ ...profileData, languages: updated });
                                                                    }}
                                                                    style={{ accentColor: PRIMARY_COLOR }}
                                                                className="w-4 h-4 border-gray-300 rounded"
                                                                />
                                                                <span className="text-sm text-gray-700">Write</span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={lang.speak}
                                                                    onChange={(e) => {
                                                                        const updated = [...profileData.languages];
                                                                        updated[index].speak = e.target.checked;
                                                                        setProfileData({ ...profileData, languages: updated });
                                                                    }}
                                                                    style={{ accentColor: PRIMARY_COLOR }}
                                                                className="w-4 h-4 border-gray-300 rounded"
                                                                />
                                                                <span className="text-sm text-gray-700">Speak</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {profileData.languages.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">No languages added yet.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button
                                        onClick={handleSaveChangesProfile}
                                        disabled={isLoading}
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                        className="hover:opacity-90 text-white px-8"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Social Links Tab */}
                {activeTab === "social" && (
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Social Links</h2>
                            <div className="space-y-6 w-[80%] mx-auto">
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin" className="text-gray-900">LinkedIn</Label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="linkedin"
                                            type="url"
                                            value={socialLinks.linkedin}
                                            onChange={(e) =>
                                                setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                                            }
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            className="pl-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                             

                                <div className="space-y-2">
                                    <Label htmlFor="portfolio" className="text-gray-900">Portfolio</Label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="portfolio"
                                            type="url"
                                            value={socialLinks.portfolio}
                                            onChange={(e) =>
                                                setSocialLinks({ ...socialLinks, portfolio: e.target.value })
                                            }
                                            placeholder="https://yourportfolio.com"
                                            className="pl-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleSaveChangesSocial}
                                        disabled={isLoading}
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                        className="hover:opacity-90 text-white px-8"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Account Setting Tab */}
                {activeTab === "account" && (
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                            <div className="space-y-6 max-w-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-gray-900">Email Notifications</Label>
                                        <p className="text-sm text-gray-500">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={accountSettings.emailNotifications}
                                        onChange={(e) =>
                                            setAccountSettings({
                                                ...accountSettings,
                                                emailNotifications: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 rounded"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-gray-900">SMS Notifications</Label>
                                        <p className="text-sm text-gray-500">
                                            Receive notifications via SMS
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={accountSettings.smsNotifications}
                                        onChange={(e) =>
                                            setAccountSettings({
                                                ...accountSettings,
                                                smsNotifications: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 rounded"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-gray-900">Job Alerts</Label>
                                        <p className="text-sm text-gray-500">
                                            Get notified about new job matches
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={accountSettings.jobAlerts}
                                        onChange={(e) =>
                                            setAccountSettings({
                                                ...accountSettings,
                                                jobAlerts: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 rounded"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-gray-900">Marketing Emails</Label>
                                        <p className="text-sm text-gray-500">
                                            Receive promotional emails and updates
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={accountSettings.marketingEmails}
                                        onChange={(e) =>
                                            setAccountSettings({
                                                ...accountSettings,
                                                marketingEmails: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 rounded"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleSaveChangesAccount}
                                        disabled={isLoading}
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                        className="hover:opacity-90 text-white px-8"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Settings;

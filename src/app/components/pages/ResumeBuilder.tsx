"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import type React from "react"
import Cookies from "js-cookie"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import ATSScoreCard from "../ui/ats-score"
import {
  ArrowLeft,
  FileText,
  Download,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FolderOpen,
  Camera,
  GripVertical,
  Settings,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  Target,
  Trophy,
  Users,
} from "lucide-react"

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  github: string
}

interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
}

interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
}

interface Extracurricular {
  id: string
  activity: string
  role: string
  description: string
  startDate: string
  endDate: string
}

interface ResumeData {
  personalInfo: PersonalInfo
  professionalSummary: string
  education: Education[]
  workExperience: WorkExperience[]
  skills: string[]
  certifications: string[]
  projects: Project[]
  achievements: Achievement[]
  extracurriculars: Extracurricular[]
  profilePicture: string | null
}

interface SectionOrder {
  id: string
  name: string
  visible: boolean
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    color: "bg-orange-500",
    headerBg: "bg-gradient-to-r from-orange-500 to-orange-600",
    headerText: "text-white",
    sectionHeader: "text-orange-600 border-orange-200",
    accent: "text-orange-500",
    preview: "Clean and contemporary with orange accents",
  },
  {
    id: "classic",
    name: "Classic",
    color: "bg-[#DEDEFF]",
    headerBg: "bg-[#DEDEFF]",
    headerText: "text-gray-900",
    sectionHeader: "text-gray-800 border-gray-200",
    accent: "text-gray-600",
    preview: "Traditional and professional",
  },
  {
    id: "creative",
    name: "Creative",
    color: "bg-purple-600",
    headerBg: "bg-gradient-to-r from-purple-600 to-pink-500",
    headerText: "text-white",
    sectionHeader: "text-purple-600 border-purple-200",
    accent: "text-purple-600",
    preview: "Bold design with creative elements",
  },
  {
    id: "minimal",
    name: "Minimal",
    color: "bg-blue-400",
    headerBg: "bg-white border-b-4 border-blue-400",
    headerText: "text-gray-800",
    sectionHeader: "text-blue-400 border-blue-100",
    accent: "text-blue-400",
    preview: "Clean and simple layout",
  },
  {
    id: "professional",
    name: "Professional",
    color: "bg-green-700",
    headerBg: "bg-green-700",
    headerText: "text-white",
    sectionHeader: "text-green-700 border-green-200",
    accent: "text-green-600",
    preview: "Corporate-friendly design",
  },
]

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const token = Cookies.get("accessToken")
const apiService = {
  async saveResume(resumeData: ResumeData, activeTemplate: string, sectionOrder: SectionOrder[]) {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...resumeData,
        template: activeTemplate,
        sectionOrder: sectionOrder,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to save resume")
    }

    return response.json()
  },

  //  async loadResume() {
  //   const response = await fetch(`${API_BASE_URL}/resume/save`, {
  //     headers: {
  //       "user-id": "default-user", // In real app, get from auth context
  //     },
  //   })

  //   if (!response.ok) {
  //     if (response.status === 404) {
  //       return null // No resume found
  //     }
  //     throw new Error("Failed to load resume")
  //   }

  //   return response.json()
  // },

  async updateResume(id: string, resumeData: ResumeData, activeTemplate: string, sectionOrder: SectionOrder[]) {
    const response = await fetch(`${API_BASE_URL}/resume/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...resumeData,
        template: activeTemplate,
        sectionOrder: sectionOrder,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to update resume")
    }

    return response.json()
  },

  async analyzeATS(resumeData: ResumeData) {
    const response = await fetch(`${API_BASE_URL}/ats/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(resumeData),
    })

    if (!response.ok) {
      throw new Error("Failed to analyze ATS score")
    }

    return response.json()
  },

 async generatePDF(id: string, htmlContent: string) {
  console.log("Generate PDF for resume:", id);

  const response = await fetch(`${API_BASE_URL}/resumes/${id}/generate-pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ html: htmlContent }),
  });

  if (!response.ok) {
    const errorText = await response.text(); // show backend error
    console.error("Backend response:", errorText);
    throw new Error("Failed to generate PDF");
  }

  return await response.blob(); // PDF blob
}


}

export default function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState("modern")
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [isReorderMode, setIsReorderMode] = useState(false)
  const [viewMode, setViewMode] = useState<"preview" | "ats">("preview")
  const [draggedSection, setDraggedSection] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false)

  // Section collapse states
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set([
      "summary",
      "education",
      "experience",
      "skills",
      "certifications",
      "projects",
      "achievements",
      "extracurriculars",
    ]),
  )

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      github: "",
    },
    professionalSummary: "",
    education: [],
    workExperience: [],
    skills: [],
    certifications: [],
    projects: [],
    achievements: [],
    extracurriculars: [],
    profilePicture: null,
  })

  const [sectionOrder, setSectionOrder] = useState<SectionOrder[]>([
    { id: "summary", name: "Professional Summary", visible: true },
    { id: "experience", name: "Work Experience", visible: true },
    { id: "education", name: "Education", visible: true },
    { id: "skills", name: "Skills", visible: true },
    { id: "projects", name: "Projects", visible: true },
    { id: "certifications", name: "Certifications", visible: true },
    { id: "achievements", name: "Achievements", visible: false },
    { id: "extracurriculars", name: "Extracurricular Activities", visible: false },
  ])

  const [currentSkill, setCurrentSkill] = useState("")
  const [currentCertification, setCurrentCertification] = useState("")
  const [atsScore, setATSScore] = useState<any>(null)
  const [atsLoading, setATSLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedResumeId, setSavedResumeId] = useState<string | null>(null)

  // useEffect(() => {
  //   const loadExistingResume = async () => {
  //     try {
  //       const result = await apiService.loadResume()
  //       if (result && result.success && result.data) {
  //         const resume = result.data
  //         setResumeData({
  //           personalInfo: resume.personalInfo || resumeData.personalInfo,
  //           professionalSummary: resume.professionalSummary || "",
  //           education: resume.education || [],
  //           workExperience: resume.workExperience || [],
  //           skills: resume.skills || [],
  //           certifications: resume.certifications || [],
  //           projects: resume.projects || [],
  //           achievements: resume.achievements || [],
  //           extracurriculars: resume.extracurriculars || [],
  //           profilePicture: resume.profilePicture || null,
  //         })

  //         if (resume.template) {
  //           setActiveTemplate(resume.template)
  //         }

  //         if (resume.sectionOrder) {
  //           setSectionOrder(resume.sectionOrder)
  //         }

  //         if (resume.atsScore) {
  //           setATSScore(resume.atsScore)
  //         }

  //         setSavedResumeId(resume._id)
  //       }
  //     } catch (error) {
  //       console.error("Failed to load resume:", error)
  //       // Continue with empty resume if loading fails
  //     }
  //   }

  //   loadExistingResume()
  // }, [])

  const handleSave = async () => {
  setIsSaving(true)
  try {
    let result
    if (savedResumeId) {
      // Update existing resume
      result = await apiService.updateResume(savedResumeId, resumeData, activeTemplate, sectionOrder)
    } else {
      // Create new resume
      result = await apiService.saveResume(resumeData, activeTemplate, sectionOrder)
    }

    if (result.success) {
      const resumeId = result.data?._id || result.resume?._id || result._id
      if (resumeId) {
        setSavedResumeId(resumeId)   // ✅ now always set
      }
      console.log("Resume saved successfully!")
    }
  } catch (error) {
    console.error("Failed to save resume:", error)
  } finally {
    setIsSaving(false)
  }
}


  const analyzeATS = async () => {
    setATSLoading(true)
    try {
      const result = await apiService.analyzeATS(resumeData)
      if (result.success && result.data.atsScore) {
        setATSScore(result.data.atsScore)
      }
    } catch (error) {
      console.error("Failed to analyze ATS score:", error)
      // Fallback to frontend calculation if backend fails
      // ... existing frontend ATS calculation code ...
    } finally {
      setATSLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!savedResumeId) {

      await handleSave()
      if (!savedResumeId) {
        console.error("Failed to save resume before PDF generation")
        return
      }
    }

    try {
      // Generate HTML content from the current resume preview
      const previewElement = document.querySelector("#resume-preview")
      const htmlContent = previewElement?.innerHTML || ""

      if (!htmlContent) {
        console.error("No preview content found for PDF generation")
        return
      }

      const pdfBlob = await apiService.generatePDF(savedResumeId, htmlContent)

      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      console.log("PDF generated successfully!")
    } catch (error) {
      console.error("Failed to generate PDF:", error)
      // Show error message or toast
    }
  }

  // Section toggle function - Open one section, close all others
  const toggleSection = useCallback((sectionId: string) => {
    setCollapsedSections((prev) => {
      const allSections = new Set<string>([
        "personal",
        "summary",
        "education",
        "experience",
        "skills",
        "certifications",
        "projects",
        "achievements",
        "extracurriculars",
      ])
      // If the section is already open, close it (all sections collapsed)
      if (!prev.has(sectionId)) {
        return allSections // Close all sections
      }
      // Open the selected section by excluding it from the collapsed set
      allSections.delete(sectionId)
      return allSections
    })
  }, [])

  // Drag and drop functions
  const handleDragStart = useCallback((e: React.DragEvent, sectionId: string) => {
    setDraggedSection(sectionId)
    e.dataTransfer.effectAllowed = "move"
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, targetSectionId: string) => {
      e.preventDefault()
      if (!draggedSection || draggedSection === targetSectionId) return

      setSectionOrder((prev) => {
        const newOrder = [...prev]
        const draggedIndex = newOrder.findIndex((s) => s.id === draggedSection)
        const targetIndex = newOrder.findIndex((s) => s.id === targetSectionId)

        if (draggedIndex === -1 || targetIndex === -1) return prev

        // Remove dragged item and insert at target position
        const [draggedItem] = newOrder.splice(draggedIndex, 1)
        newOrder.splice(targetIndex, 0, draggedItem)

        return newOrder
      })
      setDraggedSection(null)
    },
    [draggedSection],
  )

  const handleDragEnd = useCallback(() => {
    setDraggedSection(null)
  }, [])

  // Update personal info
  const updatePersonalInfo = useCallback((field: keyof PersonalInfo, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }, [])

  // Update professional summary
  const updateProfessionalSummary = useCallback((value: string) => {
    setResumeData((prev) => ({ ...prev, professionalSummary: value }))
  }, [])

  // Profile picture upload
  const handleProfilePictureUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setResumeData((prev) => ({
          ...prev,
          profilePicture: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Education functions
  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }, [])

  const updateEducation = useCallback((id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }, [])

  const removeEducation = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }, [])

  // Work experience functions
  const addWorkExperience = useCallback(() => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newWork],
    }))
  }, [])

  const updateWorkExperience = useCallback((id: string, field: keyof WorkExperience, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((work) => (work.id === id ? { ...work, [field]: value } : work)),
    }))
  }, [])

  const removeWorkExperience = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((work) => work.id !== id),
    }))
  }, [])

  // Project functions
  const addProject = useCallback(() => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }, [])

  const updateProject = useCallback((id: string, field: keyof Project, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    }))
  }, [])

  const removeProject = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }, [])

  // Skills functions
  const addSkill = useCallback(
    (skill: string) => {
      if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
        setResumeData((prev) => ({
          ...prev,
          skills: [...prev.skills, skill.trim()],
        }))
        setCurrentSkill("")
      }
    },
    [resumeData.skills],
  )

  const removeSkill = useCallback((skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }, [])

  // Certifications functions
  const addCertification = useCallback(
    (cert: string) => {
      if (cert.trim() && !resumeData.certifications.includes(cert.trim())) {
        setResumeData((prev) => ({
          ...prev,
          certifications: [...prev.certifications, cert.trim()],
        }))
        setCurrentCertification("")
      }
    },
    [resumeData.certifications],
  )

  const removeCertification = useCallback((certToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert !== certToRemove),
    }))
  }, [])

  const addAchievement = useCallback(() => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
    }
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }))
  }, [])

  const updateAchievement = useCallback((id: string, field: keyof Achievement, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement,
      ),
    }))
  }, [])

  const removeAchievement = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((achievement) => achievement.id !== id),
    }))
  }, [])

  const addExtracurricular = useCallback(() => {
    const newExtracurricular: Extracurricular = {
      id: Date.now().toString(),
      activity: "",
      role: "",
      description: "",
      startDate: "",
      endDate: "",
    }
    setResumeData((prev) => ({
      ...prev,
      extracurriculars: [...prev.extracurriculars, newExtracurricular],
    }))
  }, [])

  const updateExtracurricular = useCallback((id: string, field: keyof Extracurricular, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      extracurriculars: prev.extracurriculars.map((extra) => (extra.id === id ? { ...extra, [field]: value } : extra)),
    }))
  }, [])

  const removeExtracurricular = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      extracurriculars: prev.extracurriculars.filter((extra) => extra.id !== id),
    }))
  }, [])

  const addNewSection = useCallback(
    (sectionType: "achievements" | "extracurriculars") => {
      console.log("[v0] Adding new section:", sectionType)
      setSectionOrder((prev) =>
        prev.map((section) => (section.id === sectionType ? { ...section, visible: true } : section)),
      )
      setCollapsedSections((prev) => {
        const newSet = new Set(prev)
        newSet.delete(sectionType)
        return newSet
      })

      if (sectionType === "achievements") {
        addAchievement()
      } else if (sectionType === "extracurriculars") {
        addExtracurricular()
      }

      setIsAddSectionDialogOpen(false)
    },
    [addAchievement, addExtracurricular],
  )

  // ATS Analysis function
  // const analyzeATS = useCallback(async () => {
  //   if (atsLoading) return; // Prevent duplicate calls

  //   setATSLoading(true);
  //   try {
  //     const response = await fetch("/api/ats/analyze", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         personalInfo: resumeData.personalInfo,
  //         professionalSummary: resumeData.professionalSummary,
  //         education: resumeData.education,
  //         workExperience: resumeData.workExperience,
  //         skills: resumeData.skills,
  //         certifications: resumeData.certifications,
  //         projects: resumeData.projects,
  //         template: activeTemplate,
  //         sectionOrder,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     if (result.success) {
  //       setATSScore(result.data.atsScore);
  //     } else {
  //       throw new Error(result.message || "Analysis failed");
  //     }
  //   } catch (error) {
  //     console.error("Error analyzing ATS score:", error);
  //     // Reset ATS score on error
  //     setATSScore(null);
  //   } finally {
  //     setATSLoading(false);
  //   }
  // }, [resumeData, activeTemplate, sectionOrder, atsLoading]);

  // Save resume function
  // const saveResume = useCallback(async () => {
  //   if (isSaving) return; // Prevent duplicate calls

  //   setIsSaving(true);
  //   try {
  //     const resumePayload = {
  //       personalInfo: resumeData.personalInfo,
  //       professionalSummary: resumeData.professionalSummary,
  //       education: resumeData.education,
  //       workExperience: resumeData.workExperience,
  //       skills: resumeData.skills,
  //       certifications: resumeData.certifications,
  //       projects: resumeData.projects,
  //       profilePicture: resumeData.profilePicture,
  //       template: activeTemplate,
  //       sectionOrder,
  //     };

  //     const response = await fetch(
  //       savedResumeId ? `/api/resumes/${savedResumeId}` : "/api/resumes",
  //       {
  //         method: savedResumeId ? "PUT" : "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(resumePayload),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     if (result.success) {
  //       setSavedResumeId(result.data._id);
  //       if (result.data.atsScore) {
  //         setATSScore(result.data.atsScore);
  //       }
  //     } else {
  //       throw new Error(result.message || "Save failed");
  //     }
  //   } catch (error) {
  //     console.error("Error saving resume:", error);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // }, [resumeData, activeTemplate, sectionOrder, savedResumeId, isSaving]);

  // Auto-save on data changes
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (resumeData.personalInfo.fullName && resumeData.personalInfo.email) {
  //       saveResume();
  //     }
  //   }, 2000); // Auto-save after 2 seconds of inactivity

  //   return () => clearTimeout(timer);
  // }, [resumeData, saveResume]);

  // PDF Download function
  // const downloadPDF = useCallback(async () => {
  //   // Check if resume has meaningful content
  //   const hasContent =
  //     resumeData.personalInfo.fullName ||
  //     resumeData.professionalSummary ||
  //     resumeData.education.length > 0 ||
  //     resumeData.workExperience.length > 0 ||
  //     resumeData.skills.length > 0 ||
  //     resumeData.certifications.length > 0 ||
  //     resumeData.projects.length > 0;

  //   if (!hasContent) {
  //     alert("Please add some content to your resume before downloading.");
  //     return;
  //   }

  //   const element = document.getElementById("resume-preview");
  //   if (!element) {
  //     alert("Resume preview not found. Please ensure the preview is visible.");
  //     return;
  //   }

  //   try {
  //     // Import html2pdf dynamically
  //     const html2pdf = (await import("html2pdf.js")).default;

  //     // Ensure the element is fully rendered
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     // Configure PDF options
  //     const options = {
  //       margin: [0.5, 0.5, 0.5, 0.5],
  //       filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}.pdf`,
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: {
  //         scale: 2,
  //         useCORS: true,
  //         letterRendering: true,
  //         scrollX: 0,
  //         scrollY: 0,
  //         windowWidth: element.scrollWidth,
  //         windowHeight: element.scrollHeight,
  //         backgroundColor: "#ffffff",
  //         logging: true,
  //       },
  //       jsPDF: {
  //         unit: "in",
  //         format: "a4",
  //         orientation: "portrait",
  //         compress: true,
  //       },
  //     };

  //     // Generate and download PDF
  //     await html2pdf().set(options).from(element).save();
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     alert("Failed to generate PDF. Please check the console for details or try again.");
  //   }
  // }, [resumeData]);

  const sections = [
    {
      id: "personal",
      name: "Personal Information",
      icon: User,
      required: true,
    },
    {
      id: "summary",
      name: "Professional Summary",
      icon: FileText,
      required: false,
    },
    {
      id: "experience",
      name: "Work Experience",
      icon: Briefcase,
      required: false,
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      required: false,
    },
    { id: "skills", name: "Skills", icon: Code, required: false },
    {
      id: "certifications",
      name: "Certifications (Optional)",
      icon: Award,
      required: false,
    },
    { id: "projects", name: "Projects (Optional)", icon: FolderOpen, required: false },
    { id: "achievements", name: "Achievements (Optional)", icon: Trophy, required: false },
    { id: "extracurriculars", name: "Extracurricular Activities (Optional)", icon: Users, required: false },
  ]

  const getCurrentTemplate = () => {
    return templates.find((t) => t.id === activeTemplate) || templates[0]
  }

  const currentTemplate = getCurrentTemplate()

  // Render section content for live preview
  const renderSectionContent = useCallback(
    (sectionConfig: SectionOrder) => {
      const sectionId = sectionConfig.id

      if (sectionId === "summary" && resumeData.professionalSummary) {
        return (
          <div key="summary">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.professionalSummary}</p>
          </div>
        )
      }

      if (sectionId === "experience" && resumeData.workExperience.length > 0) {
        return (
          <div key="experience">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>Work Experience</h2>
            <div className="space-y-4">
              {resumeData.workExperience.map((work) => (
                <div key={work.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{work.position || "Software Developer Intern"}</h3>
                      <p className={`${currentTemplate.accent} font-medium`}>{work.company || "Company Name"}</p>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {work.startDate && work.endDate
                        ? `${work.startDate} - ${work.endDate}`
                        : work.startDate || work.endDate || "2023-08 - Present"}
                    </span>
                  </div>
                  {work.description && <p className="text-gray-700 text-sm leading-relaxed">{work.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (sectionId === "education" && resumeData.education.length > 0) {
        return (
          <div key="education">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className={`${currentTemplate.accent} font-medium`}>{edu.school}</p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {edu.startDate && edu.endDate
                      ? `${edu.startDate} - ${edu.endDate}`
                      : edu.startDate || edu.endDate || "Date Range"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (sectionId === "skills" && resumeData.skills.length > 0) {
        return (
          <div key="skills">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )
      }

      if (sectionId === "projects" && resumeData.projects.length > 0) {
        return (
          <div key="projects">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>Projects</h2>
            <div className="space-y-4">
              {resumeData.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{project.name || "Project Name"}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        className={`${currentTemplate.accent} text-sm hover:underline`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (sectionId === "certifications" && resumeData.certifications.length > 0) {
        return (
          <div key="certifications">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>Certifications</h2>
            <div className="space-y-2">
              {resumeData.certifications.map((cert) => (
                <div key={cert} className="flex items-center">
                  <div className={`w-2 h-2 ${currentTemplate.accent.replace("text-", "bg-")} rounded-full mr-3`}></div>
                  <span className="text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (sectionId === "achievements" && resumeData.achievements.length > 0) {
        return (
          <div key="achievements">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>Achievements</h2>
            <div className="space-y-2">
              {resumeData.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center">
                  <div className={`w-2 h-2 ${currentTemplate.accent.replace("text-", "bg-")} rounded-full mr-3`}></div>
                  <span className="text-gray-700">
                    {achievement.title} - {achievement.description} ({achievement.date})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (sectionId === "extracurriculars" && resumeData.extracurriculars.length > 0) {
        return (
          <div key="extracurriculars">
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-3 border-b pb-1`}>
              Extracurricular Activities
            </h2>
            <div className="space-y-2">
              {resumeData.extracurriculars.map((extra) => (
                <div key={extra.id} className="flex items-center">
                  <div className={`w-2 h-2 ${currentTemplate.accent.replace("text-", "bg-")} rounded-full mr-3`}></div>
                  <span className="text-gray-700">
                    {extra.activity} - {extra.role} ({extra.startDate} - {extra.endDate}): {extra.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      return null
    },
    [resumeData, currentTemplate],
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/airesume">
                <Button variant="ghost" size="sm" className="p-2 md:px-3">
                  <ArrowLeft className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Back to Home</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900 hidden sm:block">AI Resume Builder</h1>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-3">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <RotateCcw className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Clear All</span>
              </Button>
              <Button onClick={handleDownloadPDF} size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                <Download className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Download PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-3 md:px-4 py-3 md:py-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Left Panel - Collapsible Sections with Scroll */}
          <div className="space-y-3 md:space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
            {sections.map((section) => {
              const Icon = section.icon
              const isCollapsed = collapsedSections.has(section.id)

              return (
                <Collapsible key={section.id} open={!isCollapsed} onOpenChange={() => toggleSection(section.id)}>
                  <Card className="border-gray-200">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 border border-transparent p-3 md:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center text-gray-600 flex-shrink-0">
                              <Icon className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="font-medium text-gray-800 text-sm md:text-base truncate">
                              {section.name}
                            </span>
                            {section.required && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-orange-100 text-orange-700 hidden sm:inline-flex"
                              >
                                Required
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                            {isCollapsed ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0 px-3 md:px-6 pb-3 md:pb-6 space-y-4">
                        {/* Personal Info Section */}
                        {section.id === "personal" && (
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                {resumeData.profilePicture ? (
                                  <img
                                    src={resumeData.profilePicture || "/placeholder.svg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <User className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleProfilePictureUpload}
                                accept="image/*"
                                className="hidden"
                              />
                              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                <Camera className="w-4 h-4 mr-2" />
                                Upload Photo
                              </Button>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <Label htmlFor="fullName" className="text-sm font-medium">
                                  Full Name *
                                </Label>
                                <Input
                                  id="fullName"
                                  placeholder="JohnDoe"
                                  value={resumeData.personalInfo.fullName}
                                  onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                                  className="h-9 text-sm"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email" className="text-sm font-medium">
                                  Email Address *
                                </Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="johndoe68@gmail.com"
                                  value={resumeData.personalInfo.email}
                                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                                  className="h-9 text-sm"
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                  id="phone"
                                  placeholder="987654321"
                                  value={resumeData.personalInfo.phone}
                                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                  id="location"
                                  placeholder="Hyderabad"
                                  value={resumeData.personalInfo.location}
                                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="website">Website</Label>
                                <Input
                                  id="website"
                                  placeholder="https://johndoe.netlify.app/"
                                  value={resumeData.personalInfo.website}
                                  onChange={(e) => updatePersonalInfo("website", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input
                                  id="linkedin"
                                  placeholder="https://www.linkedin.com/in/johndoe/"
                                  value={resumeData.personalInfo.linkedin}
                                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="github">GitHub</Label>
                                <Input
                                  id="github"
                                  placeholder="https://github.com/JohnDoe"
                                  value={resumeData.personalInfo.github}
                                  onChange={(e) => updatePersonalInfo("github", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Professional Summary Section */}
                        {section.id === "summary" && (
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
                              className="min-h-[100px] md:min-h-[120px] text-sm"
                              value={resumeData.professionalSummary}
                              onChange={(e) => updateProfessionalSummary(e.target.value)}
                            />
                          </div>
                        )}

                        {/* Education Section */}
                        {section.id === "education" && (
                          <div className="space-y-4">
                            {resumeData.education.map((edu) => (
                              <Card key={edu.id} className="border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-1 gap-3">
                                      <div>
                                        <Label>School/University</Label>
                                        <Input
                                          placeholder="University of California"
                                          value={edu.school}
                                          onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>Degree</Label>
                                        <Input
                                          placeholder="Bachelor of Science"
                                          value={edu.degree}
                                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>Field of Study</Label>
                                        <Input
                                          placeholder="Computer Science"
                                          value={edu.field}
                                          onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>GPA (Optional)</Label>
                                        <Input
                                          placeholder="3.8"
                                          value={edu.gpa}
                                          onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>Start Date</Label>
                                        <Input
                                          type="month"
                                          value={edu.startDate}
                                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>End Date</Label>
                                        <Input
                                          type="month"
                                          value={edu.endDate}
                                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="w-fit"
                                      onClick={() => removeEducation(edu.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Remove
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Education
                            </Button>
                          </div>
                        )}

                        {/* Work Experience Section */}
                        {section.id === "experience" && (
                          <div className="space-y-4">
                            {resumeData.workExperience.map((work) => (
                              <Card key={work.id} className="border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-1 gap-3">
                                      <div>
                                        <Label>Company</Label>
                                        <Input
                                          placeholder="Tech Corp"
                                          value={work.company}
                                          onChange={(e) => updateWorkExperience(work.id, "company", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>Position</Label>
                                        <Input
                                          placeholder="Software Engineer"
                                          value={work.position}
                                          onChange={(e) => updateWorkExperience(work.id, "position", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>Start Date</Label>
                                        <Input
                                          type="month"
                                          value={work.startDate}
                                          onChange={(e) => updateWorkExperience(work.id, "startDate", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>End Date</Label>
                                        <Input
                                          type="month"
                                          value={work.endDate}
                                          onChange={(e) => updateWorkExperience(work.id, "endDate", e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="flex items-center justify-between">Job Description</Label>
                                      <Textarea
                                        placeholder="Describe your key responsibilities and achievements..."
                                        className="min-h-[100px]"
                                        value={work.description}
                                        onChange={(e) => updateWorkExperience(work.id, "description", e.target.value)}
                                      />
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="w-fit"
                                      onClick={() => removeWorkExperience(work.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Remove
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            <Button onClick={addWorkExperience} variant="outline" className="w-full bg-transparent">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Work Experience
                            </Button>
                          </div>
                        )}

                        {/* Skills Section */}
                        {section.id === "skills" && (
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              <Input
                                placeholder="Add a skill"
                                value={currentSkill}
                                onChange={(e) => setCurrentSkill(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addSkill(currentSkill)
                                  }
                                }}
                                className="flex-1"
                              />
                              <Button onClick={() => addSkill(currentSkill)} className="w-full sm:w-auto">
                                <Plus className="w-4 h-4 sm:mr-0" />
                                <span className="ml-2 sm:hidden">Add Skill</span>
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {resumeData.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="px-3 py-1">
                                  {skill}
                                  <button
                                    className="ml-2 text-gray-500 hover:text-red-500"
                                    onClick={() => removeSkill(skill)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Certifications Section */}
                        {section.id === "certifications" && (
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              <Input
                                placeholder="Add a certification"
                                value={currentCertification}
                                onChange={(e) => setCurrentCertification(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addCertification(currentCertification)
                                  }
                                }}
                                className="flex-1"
                              />
                              <Button
                                onClick={() => addCertification(currentCertification)}
                                className="w-full sm:w-auto"
                              >
                                <Plus className="w-4 h-4 sm:mr-0" />
                                <span className="ml-2 sm:hidden">Add Certification</span>
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {resumeData.certifications.map((cert) => (
                                <div key={cert} className="flex items-center justify-between p-3 border rounded-lg">
                                  <span>{cert}</span>
                                  <Button variant="ghost" size="sm" onClick={() => removeCertification(cert)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Projects Section */}
                        {section.id === "projects" && (
                          <div className="space-y-4">
                            {resumeData.projects.map((project) => (
                              <Card key={project.id} className="border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-1 gap-3">
                                      <div>
                                        <Label>Project Name</Label>
                                        <Input
                                          placeholder="E-commerce Website"
                                          value={project.name}
                                          onChange={(e) => updateProject(project.id, "name", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>Technologies Used</Label>
                                        <Input
                                          placeholder="React, Node.js, MongoDB"
                                          value={project.technologies}
                                          onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Description</Label>
                                      <Textarea
                                        placeholder="Describe the project, your role, and key achievements..."
                                        className="min-h-[80px]"
                                        value={project.description}
                                        onChange={(e) => updateProject(project.id, "description", e.target.value)}
                                      />
                                    </div>
                                    <div>
                                      <Label>Project Link (Optional)</Label>
                                      <Input
                                        placeholder="https://github.com/username/project"
                                        value={project.link}
                                        onChange={(e) => updateProject(project.id, "link", e.target.value)}
                                      />
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="w-fit"
                                      onClick={() => removeProject(project.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Remove
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Project
                            </Button>
                          </div>
                        )}
                        {section.id === "achievements" && (
                          <div className="space-y-4">
                            {resumeData.achievements.map((achievement) => (
                              <Card key={achievement.id} className="border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-1 gap-3">
                                      <div>
                                        <Label>Achievement Title</Label>
                                        <Input
                                          placeholder="Employee of the Month"
                                          value={achievement.title}
                                          onChange={(e) => updateAchievement(achievement.id, "title", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <Label>Date</Label>
                                        <Input
                                          type="month"
                                          value={achievement.date}
                                          onChange={(e) => updateAchievement(achievement.id, "date", e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Description</Label>
                                      <Textarea
                                        placeholder="Describe your achievement and its impact..."
                                        className="min-h-[80px]"
                                        value={achievement.description}
                                        onChange={(e) =>
                                          updateAchievement(achievement.id, "description", e.target.value)
                                        }
                                      />
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="w-fit"
                                      onClick={() => removeAchievement(achievement.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Remove
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            <Button onClick={addAchievement} variant="outline" className="w-full bg-transparent">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Achievement
                            </Button>
                          </div>
                        )}

                        {section.id === "extracurriculars" && (
                          <div className="space-y-4">
                            {resumeData.extracurriculars.map((extracurricular) => (
                              <Card key={extracurricular.id} className="border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-1 gap-3">
                                      <div>
                                        <Label>Activity</Label>
                                        <Input
                                          placeholder="Student Council"
                                          value={extracurricular.activity}
                                          onChange={(e) =>
                                            updateExtracurricular(extracurricular.id, "activity", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <Label>Role</Label>
                                        <Input
                                          placeholder="President"
                                          value={extracurricular.role}
                                          onChange={(e) =>
                                            updateExtracurricular(extracurricular.id, "role", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <Label>Start Date</Label>
                                        <Input
                                          type="month"
                                          value={extracurricular.startDate}
                                          onChange={(e) =>
                                            updateExtracurricular(extracurricular.id, "startDate", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <Label>End Date</Label>
                                        <Input
                                          type="month"
                                          value={extracurricular.endDate}
                                          onChange={(e) =>
                                            updateExtracurricular(extracurricular.id, "endDate", e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Description</Label>
                                      <Textarea
                                        placeholder="Describe your role and responsibilities..."
                                        className="min-h-[80px]"
                                        value={extracurricular.description}
                                        onChange={(e) =>
                                          updateExtracurricular(extracurricular.id, "description", e.target.value)
                                        }
                                      />
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="w-fit"
                                      onClick={() => removeExtracurricular(extracurricular.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Remove
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            <Button onClick={addExtracurricular} variant="outline" className="w-full bg-transparent">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Extracurricular Activity
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )
            })}
          </div>

          {/* Right Panel - Preview with Scroll */}
          <div className="space-y-4 md:space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto lg:sticky lg:top-24">
            {/* Header Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">{viewMode === "preview" ? "Resume Preview" : "ATS Analysis"}</h2>

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === "preview" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("preview")}
                    className={`h-7 md:h-8 px-2 md:px-3 text-xs ${viewMode === "preview" ? "bg-orange-500 hover:bg-orange-600 text-white" : "text-gray-700"}`}
                  >
                    <Eye className="w-3 h-3 md:mr-1" />
                    <span className="hidden sm:inline">Preview</span>
                  </Button>
                  <Button
                    variant={viewMode === "ats" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("ats")}
                    className={`h-7 md:h-8 px-2 md:px-3 text-xs ${viewMode === "ats" ? "bg-orange-500 hover:bg-orange-600 text-white" : "text-gray-700"}`}
                  >
                    <Target className="w-3 h-3 md:mr-1" />
                    <span className="hidden sm:inline">ATS Score</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Choose a Template</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${activeTemplate === template.id ? "border-orange-500 bg-orange-50" : "border-gray-200"
                            }`}
                          onClick={() => {
                            setActiveTemplate(template.id)
                            setIsTemplateDialogOpen(false)
                          }}
                        >
                          <div
                            className={`w-full h-32 rounded mb-3 ${template.color} flex items-center justify-center text-white font-medium`}
                          >
                            {template.name}
                          </div>
                          <h3 className="font-medium text-sm">{template.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{template.preview}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                {viewMode === "preview" && (
                  <Button
                    variant={isReorderMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsReorderMode(!isReorderMode)}
                  >
                    {isReorderMode ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Order
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reorder
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Reorder Instructions */}
            {isReorderMode && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-700">
                  <strong>Reorder Mode:</strong> Drag and drop sections below to reorder them. Personal Information
                  cannot be moved.
                </p>
              </div>
            )}

            {/* ATS Score Analysis */}
            {viewMode === "ats" && (
              <ATSScoreCard
                score={
                  atsScore || {
                    totalScore: 0,
                    contactInfoScore: 0,
                    keywordsScore: 0,
                    formatScore: 0,
                    experienceScore: 0,
                    skillsScore: 0,
                    suggestions: ["Start building your resume to see ATS analysis"],
                    lastUpdated: new Date(),
                  }
                }
                loading={atsLoading}
                onAnalyze={analyzeATS}
                onViewSuggestions={() => {
                  // Could open a detailed suggestions modal
                  alert("Detailed suggestions modal would open here")
                }}
              />
            )}

            {/* Live Preview */}
            {viewMode === "preview" && (
              <Card>
                <CardContent className="p-0">
                  <div id="resume-preview" className="bg-white rounded-lg min-h-[700px] shadow-sm overflow-hidden">
                    {/* Resume Preview Content with Live Updates */}
                    <div className="space-y-6">
                      {/* Header - Always at top, not draggable */}
                      <div className={`${currentTemplate.headerBg} ${currentTemplate.headerText} p-6`}>
                        <div className="flex items-center space-x-4">
                          {resumeData.profilePicture && (
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0">
                              <img
                                src={resumeData.profilePicture || "/placeholder.svg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h1 className="text-3xl font-bold">{resumeData.personalInfo.fullName || "John Doe"}</h1>
                            <p className="text-lg opacity-90 mt-1">
                              {resumeData.workExperience[0]?.position || "Software Developer"}
                            </p>
                            <div className="flex flex-wrap items-center space-x-4 text-sm mt-3 opacity-90">
                              <span>{resumeData.personalInfo.email || "johndoe68@gmail.com"}</span>
                              <span>{resumeData.personalInfo.phone || "123456789"}</span>
                              <span>{resumeData.personalInfo.location || "Hyderabad"}</span>
                            </div>
                            <div className="flex flex-wrap items-center space-x-4 text-sm mt-1 opacity-90">
                              {resumeData.personalInfo.linkedin && (
                                <span>
                                  <strong>LinkedIn:</strong> {resumeData.personalInfo.linkedin}
                                </span>
                              )}
                              {resumeData.personalInfo.website && (
                                <span>
                                  <strong>Website:</strong> {resumeData.personalInfo.website}
                                </span>
                              )}
                            </div>
                            {resumeData.personalInfo.github && (
                              <div className="text-sm mt-1 opacity-90">
                                <span>
                                  <strong>GitHub:</strong> {resumeData.personalInfo.github}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="px-6 pb-6 space-y-6">
                        {/* Dynamic Sections - Draggable in reorder mode */}
                        {sectionOrder
                          .filter((section) => section.visible)
                          .map((sectionConfig, index) => {
                            const content = renderSectionContent(sectionConfig)
                            if (!content) return null

                            if (isReorderMode) {
                              return (
                                <div
                                  key={sectionConfig.id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, sectionConfig.id)}
                                  onDragOver={handleDragOver}
                                  onDrop={(e) => handleDrop(e, sectionConfig.id)}
                                  onDragEnd={handleDragEnd}
                                  className={`border-2 border-dashed border-orange-300 rounded-lg p-4 cursor-move transition-all hover:border-orange-400 hover:shadow-md ${draggedSection === sectionConfig.id ? "opacity-50" : "opacity-100"
                                    }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <GripVertical className="w-4 h-4 text-orange-500" />
                                      <span className="text-sm font-medium text-orange-700">
                                        Drag to reorder: {sectionConfig.name}
                                      </span>
                                    </div>
                                  </div>
                                  {content}
                                </div>
                              )
                            }

                            return content
                          })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

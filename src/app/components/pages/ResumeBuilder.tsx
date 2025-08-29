"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"
import Link from "next/link"
import { Buffer } from "buffer"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { toast } from "sonner"
import Header from "./header"
import html2pdf from "html2pdf.js"
import { oklch, oklab, rgb } from "culori"
import {
  ArrowLeft,
  FileText,
  Download,
  Pencil,
  Plus,
  Trash2,
  User,
  Sparkles,
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
  Linkedin,
  Github,
  Globe,
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
  description: string[]
  index: number
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
    id: "minimal",
    name: "Minimal",
    color: "bg-white",
    headerBg: "bg-white border-b border-gray-300",
    headerText: "text-black",
    sectionHeader: "text-black border-gray-300",
    accent: "text-black",
    preview: "Clean, professional, black-and-white design",
  }
]

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"

const apiService = {
  async saveResume(resumeData: ResumeData, activeTemplate: string, sectionOrder: SectionOrder[], pdfBuffer: ArrayBuffer) {
    const token = Cookies.get("accessToken")
    const formData = new FormData()
    formData.append("resumeData", JSON.stringify({ ...resumeData, template: activeTemplate, sectionOrder }))
    formData.append("pdf", new Blob([pdfBuffer], { type: "application/pdf" }), `${resumeData.personalInfo.fullName || "resume"}.pdf`)

    const response = await fetch(`${API_BASE_URL}/resumes/fromForm`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to save resume")
    }

    return response.json()
  },

  async fetchResume(id: string) { 
    const token = Cookies.get("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in.")
    }
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: "GET", 
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`)
    }

    return response.json()
  },

async updateResume(id: string, resumeData: ResumeData, activeTemplate: string, sectionOrder: SectionOrder[], pdfBuffer: ArrayBuffer) {
  const token = Cookies.get('accessToken');
  if (!token) {
    throw new Error('No access token found. Please log in.');
  }
  const formData = new FormData();
  formData.append('resumeData', JSON.stringify({ ...resumeData, template: activeTemplate, sectionOrder }));
  formData.append('pdf', new Blob([pdfBuffer], { type: 'application/pdf' }), `${resumeData.personalInfo.fullName || 'resume'}.pdf`);

  const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to update resume: ${response.statusText}`);
  }

  return response.json();
}
}

export default function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState("minimal")
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [isReorderMode, setIsReorderMode] = useState(false)
  const [draggedSection, setDraggedSection] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumeId = searchParams.get("resumeId")
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditMode, setIsEditMode] = useState(!!resumeId)

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
    { id: "achievements", name: "Achievements", visible: true },
    { id: "extracurriculars", name: "Extracurricular Activities", visible: true },
  ])

  const [currentSkill, setCurrentSkill] = useState("")
  const [currentCertification, setCurrentCertification] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Load resume data if editing
 useEffect(() => {
  if (resumeId) {
    setIsLoading(true)
    setIsEditMode(true)
    apiService
      .fetchResume(resumeId)
      .then((result) => {
        if (result.success && result.data) {
          setResumeData({
            personalInfo: {
              fullName: result.data.personalInfo?.fullName || "",
              email: result.data.personalInfo?.email || "",
              phone: result.data.personalInfo?.phone || "",
              location: result.data.personalInfo?.location || "",
              linkedin: result.data.personalInfo?.linkedin || "",
              website: result.data.personalInfo?.website || "",
              github: result.data.personalInfo?.github || "",
            },
            professionalSummary: result.data.professionalSummary || "",
            education: result.data.education?.map((edu: any) => ({
              id: edu.id || Date.now().toString(),
              school: edu.school || "",
              degree: edu.degree || "",
              field: edu.field || "",
              startDate: edu.startDate || "",
              endDate: edu.endDate || "",
              gpa: edu.gpa || "",
            })) || [],
            workExperience: result.data.workExperience?.map((work: any) => ({
              id: work.id || Date.now().toString(),
              company: work.company || "",
              position: work.position || "",
              startDate: work.startDate || "",
              endDate: work.endDate || "",
              description: Array.isArray(work.description) ? work.description : ["", "", ""],
              index: work.index || 0,
            })) || [],
            skills: Array.isArray(result.data.skills) ? result.data.skills : [],
            certifications: Array.isArray(result.data.certifications) ? result.data.certifications : [],
            projects: result.data.projects?.map((proj: any) => ({
              id: proj.id || Date.now().toString(),
              name: proj.name || "",
              description: proj.description || "",
              technologies: proj.technologies || "",
              link: proj.link || "",
            })) || [],
            achievements: result.data.achievements?.map((ach: any) => ({
              id: ach.id || Date.now().toString(),
              title: ach.title || "",
              description: ach.description || "",
              date: ach.date || "",
            })) || [],
            extracurriculars: result.data.extracurriculars?.map((extra: any) => ({
              id: extra.id || Date.now().toString(),
              activity: extra.activity || "",
              role: extra.role || "",
              description: extra.description || "",
              startDate: extra.startDate || "",
              endDate: extra.endDate || "",
            })) || [],
            profilePicture: result.data.profilePicture || null,
          })
          setActiveTemplate(result.data.template || "minimal")
          setSectionOrder(result.data.sectionOrder?.length ? result.data.sectionOrder : sectionOrder)
          toast.success("Resume loaded for editing")
        } else {
          toast.error("Failed to load resume data")
          router.push("/resumeList")
        }
      })
      .catch((error) => {
        console.error("Failed to fetch resume:", error)
        toast.error("Failed to load resume. Please try again.")
        router.push("/resumeList")
      })
      .finally(() => {
        setIsLoading(false)
      })
  } else {
    setIsEditMode(false)
  }
}, [resumeId, router])

  const convertOklchToRgb = () => {
    const elements = document.querySelectorAll("#resume-preview *")
    elements.forEach((element: HTMLElement) => {
      const styles = window.getComputedStyle(element)
      const properties = ["color", "background-color", "border-color"]

      properties.forEach((property) => {
        const value = styles.getPropertyValue(property)
        if (value.includes("oklch") || value.includes("oklab")) {
          try {
            let color
            if (value.includes("oklch")) {
              color = oklch(value)
            } else if (value.includes("oklab")) {
              color = oklab(value)
            }
            if (color) {
              const rgbColor = rgb(color)
              const rgbString = `rgb(${Math.round(rgbColor.r * 255)}, ${Math.round(rgbColor.g * 255)}, ${Math.round(rgbColor.b * 255)})`
              element.style.setProperty(property, rgbString)
            }
          } catch (e) {
            console.error("Color conversion failed:", e)
            if (property === "background-color") {
              element.style.setProperty(property, "rgb(255, 255, 255)")
            } else {
              element.style.setProperty(property, "rgb(0, 0, 0)")
            }
          }
        }
      })
    })
  }
const handleSave = async (pdfBuffer: ArrayBuffer) => {
  setIsSaving(true);
  try {
    let result;
    if (resumeId) {
      result = await apiService.updateResume(resumeId, resumeData, activeTemplate, sectionOrder, pdfBuffer);
    } else {
      result = await apiService.saveResume(resumeData, activeTemplate, sectionOrder, pdfBuffer);
    }
    if (result.success) {
      toast.success(resumeId ? 'Resume updated successfully!' : 'Resume saved successfully!');
    }
  } catch (error) {
    console.error(resumeId ? 'Failed to update resume:' : 'Failed to save resume:', error);
    toast.error(resumeId ? 'Failed to update resume. Please try again.' : 'Failed to save resume. Please try again.');
  } finally {
    setIsSaving(false);
  }
};

const handleSaveChanges = async () => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    toast.error('Preview not found. Please try again.');
    return;
  }

  convertOklchToRgb();

  const opt = {
    margin: [0.5, 0.125, 0.5, 0.125],
  };

  try {
    const pdf = await html2pdf().set(opt).from(element).toPdf().output('arraybuffer');
    await handleSave(pdf);
    await html2pdf().set(opt).from(element).save();
    toast.success('Changes saved and PDF downloaded!');
    setTimeout(() => {
      router.push('/resumeList');
    }, 3000);
  } catch (error) {
    console.error('Failed to generate or save PDF:', error);
    toast.error('Failed to generate or save PDF. Please try again.');
  }
};

const handleDownloadPDF = async () => {
  const element = document.getElementById('resume-preview');
  if (isReorderMode) {
    toast.info('Download PDF after saving the order.');
    return;
  }
  if (!element) {
    toast.error('Preview not found. Please try again.');
    return;
  }

  convertOklchToRgb();

  const opt = {
    margin: [0.5, 0.125, 0.5, 0.125],
    filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4, useCORS: false },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  try {
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone) {
      const pdf = await html2pdf().set(opt).from(element).toPdf().output('arraybuffer');
      await handleSave(pdf);
      await html2pdf().set(opt).from(element).save();
      setTimeout(() => {
        router.push('/resumeList');
      }, 3000);
    } else {
      toast.info('Please enter your name, email, and phone number before downloading the resume.');
    }
  } catch (error) {
    console.error('Failed to generate or save PDF:', error);
    toast.error('Failed to generate or save PDF. Please try again.');
  }
};

  const handleAISuggest = async () => {
    setAiLoading(true)
    try {
      const dataSummary = `
      Name: ${resumeData.personalInfo.fullName || "N/A"}
      Email: ${resumeData.personalInfo.email || "N/A"}
      Location: ${resumeData.personalInfo.location || "N/A"}
      Education: ${resumeData.education.map(edu => `${edu.degree} in ${edu.field || "N/A"} from ${edu.school || "N/A"} (${edu.startDate} - ${edu.endDate || "Present"})`).join("; ") || "N/A"}
      Work Experience: ${resumeData.workExperience.map(work => `${work.position || "N/A"} at ${work.company || "N/A"} (${work.startDate} - ${work.endDate || "Present"}): ${work.description.join("; ") || "N/A"}`).join("; ") || "N/A"}
      Skills: ${resumeData.skills.join(", ") || "N/A"}
      Certifications: ${resumeData.certifications.join(", ") || "N/A"}
      Projects: ${resumeData.projects.map(proj => `${proj.name || "N/A"}: ${proj.description || "N/A"} (Technologies: ${proj.technologies || "N/A"})`).join("; ") || "N/A"}
      Achievements: ${resumeData.achievements.map(ach => `${ach.title || "N/A"} (${ach.date || "N/A"}): ${ach.description || "N/A"}`).join("; ") || "N/A"}
      Extracurriculars: ${resumeData.extracurriculars.map(extra => `${extra.activity || "N/A"} - ${extra.role || "N/A"} (${extra.startDate} - ${extra.endDate || "Present"}): ${extra.description || "N/A"}`).join("; ") || "N/A"}
    `
      if (!resumeData.personalInfo.fullName && !resumeData.personalInfo.email && (!resumeData.workExperience.length || !resumeData.education.length)) {
        toast.info("Please fill in all required fields to generate a summary.")
        return
      }
      const prompt = `Generate a concise, ATS friendly professional summary (30-45 words) for a resume based on the following information. Highlight key achievements, skills, and career goals, tailored to the provided data. Ensure the summary is professional, engaging, and suitable for a resume: ${dataSummary}`
      
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      const generatedSummary =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

      setResumeData((prev) => ({
        ...prev,
        professionalSummary: generatedSummary,
      }))
      toast.success("AI-generated summary added to textarea!")
    } catch (error) {
      console.error("Failed to generate AI suggestion:", error)
      toast.error("Failed to generate AI suggestion. Please try again.")
    } finally {
      setAiLoading(false)
    }
  }

  const handleAISuggestForWork = async (id: string) => {
    setAiLoading(true)
    try {
      const work = resumeData.workExperience.find((w) => w.id === id)
      if (!work || !work.position || !work.company) {
        toast.info("Please provide position and company first.")
        return
      }

      const prompt = `Generate a concise, ATS-friendly job description (exact 3 points, each not more than 20 words, line by line , without any bullet points) for the position of ${work.position} at ${work.company}. Highlight key responsibilities, achievements, and skills. Ensure it is professional, engaging, and suitable for a resume.`

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      const generatedDescription =
        data.candidates?.[0]?.content?.parts?.[0]?.text
          ?.trim()
          .split("\n")
          .slice(0, 3)
          .map((point: string) =>
            point.trim().replace(/^[-•]\s*/, "").trim()
          ) || []

      setResumeData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((w) =>
          w.id === id ? { ...w, description: generatedDescription } : w
        ),
      }))
      toast.success("AI-generated description added!")
    } catch (error) {
      console.error("Failed to generate AI suggestion:", error)
      toast.error("Failed to generate AI suggestion. Please try again.")
    } finally {
      setAiLoading(false)
    }
  }

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
      if (!prev.has(sectionId)) {
        return allSections
      }
      allSections.delete(sectionId)
      return allSections
    })
  }, [])

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

  const updatePersonalInfo = useCallback((field: keyof PersonalInfo, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }, [])

  const updateProfessionalSummary = useCallback((value: string) => {
    setResumeData((prev) => ({ ...prev, professionalSummary: value }))
  }, [])

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

  const addWorkExperience = useCallback(() => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ["", "", ""],
      index: 0,
    }
    setResumeData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newWork],
    }))
  }, [])

  const updateWorkExperience = useCallback((id: string, field: keyof WorkExperience | 'description', value: string | string[], index?: number) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((work) => {
        if (work.id === id) {
          if (field === 'description' && Array.isArray(value)) {
            return { ...work, description: value }
          } else if (field === 'description' && typeof index === 'number') {
            const newDescription = [...work.description]
            newDescription[index] = value as string
            return { ...work, description: newDescription }
          }
          return { ...work, [field]: value as string }
        }
        return work
      }),
    }))
  }, [])

  const removeWorkExperience = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((work) => work.id !== id),
    }))
  }, [])

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

  const sections = [
    {
      id: "personal",
      name: "Personal Information",
      icon: User,
      required: true,
    },
    {
      id: "experience",
      name: "Work Experience",
      icon: Briefcase,
      required: false,
    },
    {
      id: "summary",
      name: "Professional Summary",
      icon: FileText,
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

  const renderSectionContent = useCallback(
    (sectionConfig: SectionOrder) => {
      const sectionId = sectionConfig.id

      if (sectionId === "experience" && resumeData.workExperience.length > 0) {
        return (
          <div key="experience" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>Work Experience</h2>
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
                  {work.description.some(desc => desc.trim()) && (
                    <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5">
                      {work.description.map((desc, index) => (
                        desc.trim() && <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (sectionId === "summary" && resumeData.professionalSummary) {
        return (
          <div key="summary" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.professionalSummary}</p>
          </div>
        )
      }

      if (sectionId === "education" && resumeData.education.length > 0) {
        return (
          <div key="education" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>Education</h2>
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
          <div key="skills" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>Skills</h2>
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
          <div key="projects" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>Projects</h2>
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
          <div key="certifications" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>Certifications</h2>
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
          <div key="achievements" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>Achievements</h2>
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
          <div key="extracurriculars" className="mb-6" style={{ pageBreakInside: 'avoid' }}>
            <h2 className={`text-xl font-bold ${currentTemplate.sectionHeader} mb-4 border-b pb-2`}>
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
      <Header />
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/airesume">
                <Button variant="ghost" size="sm" className="p-2 md:px-3">
                  <ArrowLeft className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Back to Dashboard</span>
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-1 md:space-x-3">
              <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    <Download className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">{isEditMode ? "Edit and Download" : "Download PDF"}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{isEditMode ? "Save and Download Resume" : "Download Resume"}</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-600">
                    Would you like to {isEditMode ? "save your changes and " : ""}download your resume as a PDF? This action will also save your resume.
                  </p>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDownloadDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={async () => {
                        if (isEditMode) {
                          await handleSaveChanges()
                        } else {
                          await handleDownloadPDF()
                        }
                        setIsDownloadDialogOpen(false)
                      }}
                    >
                      {isEditMode ? "Save Changes" : "Download PDF"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => router.push("/resumeList")}
              >
                <Pencil className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">My Resumes</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-lg font-semibold text-gray-700">Loading resume...</p>
        </div>
      ) : (
        <div className="container mx-auto px-2 sm:px-3 md:px-4 py-3 md:py-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
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
                          {section.id === "personal" && (
                            <div className="space-y-4">
                              <Separator />
                              <div className="grid grid-cols-1 gap-3">
                                <div>
                                  <Label htmlFor="fullName" className="text-sm font-medium">
                                    Full Name *
                                  </Label>
                                  <Input
                                    id="fullName"
                                    placeholder="John Doe"
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

                          {section.id === "summary" && (
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
                                className="min-h-[100px] md:min-h-[120px] text-sm"
                                value={resumeData.professionalSummary}
                                onChange={(e) => updateProfessionalSummary(e.target.value)}
                              />
                              <Button
                                variant="outline"
                                className="bg-orange-500 text-white hover:bg-white hover:border-orange-500 hover:text-orange-600 p-2 h-auto font-medium"
                                onClick={handleAISuggest}
                                disabled={aiLoading}
                              >
                                <Sparkles className="w-4 h-4 mr-2 inline-block" />
                                {aiLoading ? "Generating..." : "AI Suggest"}
                              </Button>
                            </div>
                          )}

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
                                        <div className="space-y-2 mt-2">
                                          {[0, 1, 2].map((index) => (
                                            <Input
                                              key={index}
                                              placeholder={`Description point ${index + 1}`}
                                              value={work.description[index] || ""}
                                              onChange={(e) => updateWorkExperience(work.id, "description", e.target.value, index)}
                                              className="text-sm"
                                            />
                                          ))}
                                        </div>
                                        <Button
                                          variant="outline"
                                          className="bg-orange-500 text-white hover:bg-white hover:border-orange-500 hover:text-orange-600 p-2 h-auto font-medium mt-2"
                                          onClick={() => handleAISuggestForWork(work.id)}
                                          disabled={aiLoading}
                                        >
                                          <Sparkles className="w-4 h-4 mr-2 inline-block" />
                                          {aiLoading ? "Generating..." : "AI Suggest"}
                                        </Button>
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

            <div className="space-y-4 md:space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold">Resume Preview</h2>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <Button
                      variant="default"
                      size="sm"
                      className={`h-7 md:h-8 px-2 md:px-3 text-xs bg-orange-500 text-white`}
                    >
                      <Eye className="w-3 h-3 md:mr-1" />
                      <span className="hidden sm:inline">Preview</span>
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
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${activeTemplate === template.id ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
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
                </div>
              </div>

              {isReorderMode && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-700">
                    <strong>Reorder Mode:</strong> Drag and drop sections below to reorder them. Personal Information
                    cannot be moved.
                  </p>
                </div>
              )}

              <Card>
                <CardContent className="p-0">
                  <div id="resume-preview" style={{ width: "612px" }}>
                    <div className="space-y-6">
                      <div className={`${currentTemplate.headerBg} ${currentTemplate.headerText} p-6 break-inside-avoid`}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <h1 className="text-3xl font-bold">{resumeData.personalInfo.fullName || "John Doe"}</h1>
                            <p className="text-lg opacity-90 mt-1">
                              {resumeData.workExperience[0]?.position || "Software Developer"}
                            </p>
                            <div className="flex items-center space-x-6 text-sm mt-3 opacity-90">
                              <span>{resumeData.personalInfo.email || "johndoe68@gmail.com"}</span>
                              <span>{resumeData.personalInfo.phone || "123456789"}</span>
                              <span>{resumeData.personalInfo.location || "Hyderabad"}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-1 text-sm opacity-90">
                              {resumeData.personalInfo.linkedin && (
                                <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  <Linkedin className="w-4 h-4 mr-1" /> {resumeData.personalInfo.linkedin.slice(27)}
                                </a>
                              )}
                              {resumeData.personalInfo.website && (
                                <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  <Globe className="w-4 h-4 mr-1" /> View Website
                                </a>
                              )}
                              {resumeData.personalInfo.github && (
                                <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  <Github className="w-4 h-4 mr-1" /> {resumeData.personalInfo.github.slice(19)}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 pb-2 space-y-6">
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
                                  className={`border-2 border-dashed border-orange-300 rounded-lg p-4 cursor-move transition-all hover:border-orange-400 hover:shadow-md ${draggedSection === sectionConfig.id ? "opacity-50" : "opacity-100"}`}
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
"use client"
import { useState, useEffect, useMemo } from "react"
import { Button } from "../ui/button"
import { FileText, Download, Search, Upload, Pencil, X } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import Cookies from "js-cookie"
import Header from "./header"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Resume = {
  _id: string
  personalInfo: { fullName?: string }
  createdAt: string
  updatedAt: string
  pdfBuffer?: Buffer
}

export default function ResumeList() {
  const [query, setQuery] = useState("")
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL 

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = Cookies.get("accessToken")
        if (!token) {
          toast.error("Please log in to view your resumes")
          setLoading(false)
          return
        }

        const response = await fetch(`${API_BASE_URL}/resumes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch resumes")
        }

        if (result.success && result.data) {
          const sortedResumes = result.data.sort((a: Resume, b: Resume) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          setResumes(sortedResumes)
        } else {
          setResumes([])
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred while fetching resumes")
        setResumes([])
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return resumes
    return resumes.filter((resume) =>
      (`Resume - ${format(new Date(resume.createdAt), "MM-dd-yyyy")}`)
        .toLowerCase()
        .includes(q)
    )
  }, [query, resumes])

  function bytesToSize(bytes: number) {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB", "TB"] as const
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const handleEdit = (resumeId: string) => {
    router.push(`/resumeBuilder?resumeId=${resumeId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10">
        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Your Resumes
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Search and browse all resumes you’ve stored.
            </p>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search resumes by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-md border border-orange-200 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              />
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-orange-200 bg-orange-50/40 p-10 text-center">
            <FileText className="h-10 w-10 text-orange-500" />
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              Loading resumes...
            </h3>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-orange-200 bg-orange-50/40 p-10 text-center">
            <FileText className="h-10 w-10 text-orange-500" />
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              No resumes found
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Try a different search or create a new resume.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setQuery("")}
                className="inline-flex h-9 items-center rounded-md border border-orange-200 bg-white px-3 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Clear search
              </button>
              <button
                className="inline-flex h-9 items-center rounded-md bg-orange-500 px-3 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                onClick={() => router.push("/resumeBuilder")}
              >
                <Upload className="mr-2 h-4 w-4" /> Create New
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resume) => (
              <div
                key={resume._id}
                className="group rounded-lg border border-orange-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-100 text-orange-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="truncate text-base font-semibold text-slate-900">
                        {`Resume - ${format(new Date(resume.createdAt), "MM-dd-yyyy")}`}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600">
                        Created{" "}
                        {formatDistanceToNow(new Date(resume.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Updated{" "}
                        {formatDistanceToNow(new Date(resume.updatedAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(resume._id)}
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 flex flex-col md:flex-row gap-10 relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-slate-600 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Skill Assessments Section */}
              <div className="flex-1">
                <img
                  src="/images/Herooo.jpg"
                  alt="Skill Assessment Promotion"
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-900">
                  Boost Your Skills with Assessments
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Take our tailored skill assessments to identify your strengths and areas for improvement. Unlock personalized learning paths to elevate your career!
                </p>
                <div className="text-center">
                <Button
                  className="mt-4 bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => router.push("/assessments")}
                >
                  Get Assessment
                </Button>
                </div>
              </div>

              {/* Job Applications Section */}
              <div className="flex-1">
                <img
                  src="/images/PopupImage2.jpg"
                  alt="Job Applications Promotion"
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-900">
                  Apply for Your Dream Job
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Explore thousands of job opportunities tailored to your skills and experience. Submit your resume and start your journey to a new career today!
                </p>
                <div className="text-center">
                <Button
                  className="mt-4 bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => router.push("/jobs")}
                >
                  Browse Jobs
                </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
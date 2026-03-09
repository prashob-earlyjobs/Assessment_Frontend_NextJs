"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, Loader2, Plus, X, Trash2, Pencil } from "lucide-react";
import { getAIBuddyInterviews, createAIBuddySession } from "../services/staticApis";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { useUser } from "../../context";
import { toast } from "sonner";
import NavbarV2 from "../v2/navbar/navbar.v2";
import Footer from "./footer";
import Cookies from "js-cookie";

const getAuthHeaders = () => {
  const token = Cookies.get("accessToken") || localStorage.getItem("accessToken") || "";
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

type NormalizedTile = {
  title: string;
  meta: string;
};

type NormalizedCategory = {
  id?: string;
  main: string;
  subs: string[];
  tiles: NormalizedTile[];
};

const DEFAULT_CATEGORIES: NormalizedCategory[] = [
  {
    main: "Technical",
    subs: ["Frontend", "Backend", "Full‑Stack", "Data & Analytics", "DevOps & Cloud"],
    tiles: [
      { title: "Technical round", meta: "Coding, systems, debugging" },
      { title: "System design", meta: "Scalable architectures" },
    ],
  },
  {
    main: "Behavioral & HR",
    subs: ["Behavioral", "HR Screening", "Culture Fit"],
    tiles: [
      { title: "Behavioral / HR", meta: "Culture fit, mindset" },
      { title: "Manager round", meta: "Leadership & ownership" },
    ],
  },
  {
    main: "Product & Design",
    subs: ["Product Management", "UI/UX Design", "System Thinking"],
    tiles: [
      { title: "Product thinking", meta: "Roadmaps, trade-offs" },
      { title: "Case study", meta: "Problem-solving scenarios" },
    ],
  },
  {
    main: "Freshers & Campus",
    subs: ["Internships", "First Job", "Campus Placements"],
    tiles: [
      { title: "Campus / fresher", meta: "First-job focused" },
      { title: "Data structures", meta: "DS & algorithms focus" },
    ],
  },
];

export default function InterviewBuddyClient() {
  const [assessmentSearch, setAssessmentSearch] = useState("");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
  const [categories, setCategories] = useState<NormalizedCategory[]>(DEFAULT_CATEGORIES);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [interviews, setInterviews] = useState<any[] | null>(null);
  const [interviewsLoading, setInterviewsLoading] = useState(false);
  const [startingRole, setStartingRole] = useState<string | null>(null);
  const [subCatPopup, setSubCatPopup] = useState<{ open: boolean; category: string; categoryId?: string }>({ open: false, category: "" });
  const [subCatName, setSubCatName] = useState("");
  const [subCatSaving, setSubCatSaving] = useState(false);
  const [catPopupOpen, setCatPopupOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const [catSaving, setCatSaving] = useState(false);
  const [assessPopup, setAssessPopup] = useState(false);
  const [assessForm, setAssessForm] = useState({
    assessmentRole: "",
    category: "",
    subCategory: "",
    minExp: 0,
    maxExp: 5,
    jobDescription: "",
    duration: 12,
    skills: [{ name: "", difficulty: "intermediate" as string, timeLimit: 12 }],
  });
  const [assessErrors, setAssessErrors] = useState<Record<string, string>>({});
  const [aiRoleGenerating, setAiRoleGenerating] = useState(false);
  const [assessSaving, setAssessSaving] = useState(false);
  const [editingAssessmentId, setEditingAssessmentId] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const MIN_SEARCH_CHARS = 3;
  const DEBOUNCE_MS = 400;
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    type: "category" | "subcategory" | "assessment";
    label: string;
    category?: string;
    categoryId?: string;
    subCategory?: string;
    assessmentId?: string;
  }>({ open: false, type: "assessment", label: "" });
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { userCredentials } = useUser();

  const handleAddSubcategory = async () => {
    const name = subCatName.trim();
    if (!name) return;
    try {
      setSubCatSaving(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/interview-buddy/addSubCategoryForAIBuddy`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ mainCategory: subCatPopup.category, subCategory: name, categoryId: subCatPopup.categoryId }),
      });
      const data = await res.json();
      if(!res.ok){
        toast.error(data?.message || "Failed to add subcategory");
        return;
      }
      setCategories((prev) =>
        prev.map((cat) =>
          cat.main === subCatPopup.category
            ? { ...cat, subs: [...cat.subs, name] }
            : cat
        )
      );
      toast.success(`Subcategory "${name}" added`);
      setSubCatPopup({ open: false, category: "" });
      setSubCatName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add subcategory");
    } finally {
      setSubCatSaving(false);
    }
  };

  const handleAddCategory = async () => {
    const name = catName.trim();
    if (!name) return;
    try {
      setCatSaving(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/interview-buddy/addCategoryForAIBuddy`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ mainCategory: name }),
      });

      const data = await res.json();
      if (!res.ok){
        console.log(data.message);
        toast.error(data?.message || "Failed to add category");
        return;
      }
      setCategories((prev) => [...prev, { main: name, subs: [], tiles: [] }]);
      toast.success(`Category "${name}" added`);
      setCatPopupOpen(false);
      setCatName("");
    } catch (err) {
      console.error(err.message,"<==");

      toast.error("Failed to add category");
    } finally {
      setCatSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (deleteConfirm.type === "category") {
        const res = await fetch(`${backendUrl}/interview-buddy/deleteCategoryForAIBuddy`, {
          method: "DELETE",
          headers: getAuthHeaders(),
          credentials: "include",
          body: JSON.stringify({ categoryId: deleteConfirm.categoryId }),
        });
        if (!res.ok) throw new Error("Failed to delete category");
        setCategories((prev) => prev.filter((c) => c.main !== deleteConfirm.category));
        if (selectedCategoryKey?.startsWith(deleteConfirm.category + "-")) {
          setSelectedCategoryKey(null);
          setInterviews(null);
        }
        toast.success(`Category "${deleteConfirm.category}" deleted`);
      } else if (deleteConfirm.type === "subcategory") {
        const res = await fetch(`${backendUrl}/interview-buddy/deleteSubCategoryForAIBuddy`, {
          method: "DELETE",
          headers: getAuthHeaders(),
          credentials: "include",
          body: JSON.stringify({ categoryId: deleteConfirm.categoryId, subCategory: deleteConfirm.subCategory }),
        });
        if (!res.ok) throw new Error("Failed to delete subcategory");
        setCategories((prev) =>
          prev.map((c) =>
            c.main === deleteConfirm.category
              ? { ...c, subs: c.subs.filter((s) => s !== deleteConfirm.subCategory) }
              : c
          )
        );
        const deletedKey = `${deleteConfirm.category}-${deleteConfirm.subCategory}`;
        if (selectedCategoryKey === deletedKey) {
          setSelectedCategoryKey(null);
          setInterviews(null);
        }
        toast.success(`Subcategory "${deleteConfirm.subCategory}" deleted`);
      } else if (deleteConfirm.type === "assessment") {
        const aiUrl = process.env.NEXT_PUBLIC_AI_API_URL;
        const res = await fetch(`${aiUrl}api/public/deleteAssessmentForAIBuddy`, {
          method: "DELETE",
          headers: getAuthHeaders(),
          credentials: "include",
          body: JSON.stringify({ assessmentId: deleteConfirm.assessmentId }),
        });
        if (!res.ok) throw new Error("Failed to delete assessment");
        setInterviews((prev) => prev?.filter((iv) => iv._id !== deleteConfirm.assessmentId) || null);
        toast.success("Assessment deleted");
      }
      setDeleteConfirm({ open: false, type: "assessment", label: "" });
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const validateAssessForm = () => {
    const e: Record<string, string> = {};
    if (!assessForm.assessmentRole.trim()) e.assessmentRole = "Role is required";
    if (!assessForm.jobDescription.trim()) e.jobDescription = "Job description is required";
    if (assessForm.jobDescription.trim().length < 20) e.jobDescription = "At least 20 characters";
    if (assessForm.skills.length === 0) e.skills = "Add at least one skill";
    assessForm.skills.forEach((s, i) => {
      if (!s.name.trim()) e[`skill_${i}`] = "Skill name is required";
    });
    return e;
  };

  const handleAddAssessment = async () => {
    const errors = validateAssessForm();
    setAssessErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      setAssessSaving(true);
      const backendUrl = process.env.NEXT_PUBLIC_AI_API_URL;
      const payload = {
        assessmentRole: assessForm.assessmentRole.trim(),
        category: assessForm.category.trim(),
        subCategory: assessForm.subCategory.trim(),
        minExp: assessForm.minExp,
        maxExp: assessForm.maxExp,
        jobDescription: assessForm.jobDescription.trim(),
        duration: assessForm.duration,
        skills: assessForm.skills.map((s) => ({
          name: s.name.trim(),
          difficulty: s.difficulty,
          timeLimit: s.timeLimit,
          hasQuestions: false,
          questions: [],
        })),
      };
      const isEditing = !!editingAssessmentId;
      const url = isEditing
        ? `${backendUrl}api/public/updateAssessmentForAIBuddy`
        : `${backendUrl}api/public/createAssessmentForAIBuddy`;
      const body = isEditing ? { ...payload, assessmentId: editingAssessmentId } : payload;
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(body),
      });
      // if (!res.ok) throw new Error(isEditing ? "Failed to update assessment" : "Failed to create assessment");
      if (!res.ok) {
        const data = await res.json();
        toast.error(data?.message || "Failed to create assessment");
        return;
      }
      toast.success(isEditing ? "Assessment updated" : "Assessment created");
      setAssessPopup(false);
      setEditingAssessmentId(null);
      setAssessForm({
        assessmentRole: "", category: "", subCategory: "",
        minExp: 0, maxExp: 5, jobDescription: "", duration: 12,
        skills: [{ name: "", difficulty: "intermediate", timeLimit: 12 }],
      });
      setAssessErrors({});
      if (selectedCategoryKey) {
        const sub = selectedCategoryKey.split("-").slice(1).join("-");
        if (sub) {
          const response = await getAIBuddyInterviews(sub);
          setInterviews(response.data);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(editingAssessmentId ? "Failed to update assessment" : "Failed to create assessment");
    } finally {
      setAssessSaving(false);
    }
  };

  const handleStartInterview = (interview: any) => {
    const assessmentRole = interview.assessmentRole;
    setStartingRole(assessmentRole);
    const subCategory =
      interview.subCategory ||
      selectedCategoryKey?.split("-").slice(1).join("-") ||
      null;
    if (!userCredentials) {
      const redirectPath = `/interview-buddy/${encodeURIComponent(
        assessmentRole
      )}`;
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "aiBuddyPendingInterview",
            JSON.stringify({
              from: "ai-interview-buddy",
              role: assessmentRole,
              subCategory,
              redirectPath,
            })
          );
        }
      } catch {
        // ignore storage errors
      }
      router.push(
        `/login?source=ai-interview-buddy&redirect=${encodeURIComponent(
          redirectPath
        )}`
      );
      return;
    }
    (async () => {
      try {
        const fullName = userCredentials?.name || "";
        const parts = fullName.trim().split(" ").filter(Boolean);
        const firstName = parts[0] || null;
        const lastName = parts.length > 1 ? parts.slice(1).join(" ") : null;
        const sessionData = await createAIBuddySession({
          role: assessmentRole,
          subCategory,
          firstName,
          lastName,
          email: userCredentials?.email || null,
          phone: userCredentials?.mobile || null,
        });
        const sessionId = sessionData?.data?.sessionId || sessionData?.sessionId || sessionData?.data?._id || null;
        if (sessionId) {
          window.location.href = `${process.env.NEXT_PUBLIC_AI_ASSESSMENT_URL}interview?sessionId=${sessionId}`;
        } else {
          router.push(`/interview-buddy/${encodeURIComponent(assessmentRole)}`);
        }
      } catch (e) {
        console.error("Failed to create AI buddy session", e);
        toast.error("Failed to start interview session");
      } finally {
        setStartingRole(null);
      }
    })();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) return;
        const res = await fetch(`${backendUrl}/static/categoriesForAIBuddy`, {
          method: "GET",
        });
        if (!res.ok) return;
        const data = await res.json();
        const rawCategories: any[] =
          (data && (data.categories || data.data || data.items)) || data || [];

        const normalized: NormalizedCategory[] = rawCategories
          .map((item) => {
            const main =
              item.mainCategory ||
              item.category ||
              item.main ||
              item.name ||
              "General";
            const subs: string[] =
              item.subCategory || // matches API shape
              item.subCategories ||
              item.subs ||
              item.subcategories ||
              item.tags ||
              [];
            const rawTiles =
              item.tiles ||
              item.interviewTypes ||
              item.interviews ||
              item.items ||
              [];
            const tiles: NormalizedTile[] = Array.isArray(rawTiles)
              ? rawTiles.map((t: any) => ({
                title: t.title || t.name || "Interview",
                meta:
                  t.meta ||
                  t.description ||
                  t.subtitle ||
                  t.tagline ||
                  "",
              }))
              : [];

            return {
              id: item._id || item.id || undefined,
              main: String(main),
              subs: subs.map((s) => String(s)),
              tiles,
            };
          })
          .filter((c) => c.main);

        if (normalized.length) {
          setCategories(normalized);
        } else {
          setCategories(DEFAULT_CATEGORIES);
        }
      } catch (err) {
        console.error("Failed to load categoriesForAIBuddy", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Automatically select first category + first subcategory on initial load
  useEffect(() => {
    if (categoriesLoading) return;
    if (selectedCategoryKey) return;
    if (!categories || categories.length === 0) return;

    const firstWithSubs = categories.find((c) => Array.isArray(c.subs) && c.subs.length > 0);
    if (!firstWithSubs) return;

    const firstSub = firstWithSubs.subs[0];
    if (!firstSub) return;

    setSelectedCategoryKey(`${firstWithSubs.main}-${firstSub}`);
  }, [categoriesLoading, categories, selectedCategoryKey]);

  const searchAssessments = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_SEARCH_CHARS) return;
    try {
      setSearchLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_AI_API_URL;
      const res = await fetch(
        `${backendUrl}api/public/searchForAIBuddy?q=${encodeURIComponent(trimmed)}`,
        { method: "GET", headers: getAuthHeaders() }
      );
      if (!res.ok) return;
      const data = await res.json();
      const results = data?.data || data || [];
      if (Array.isArray(results)) {
        setInterviews(results);
      }
    } catch (err) {
      console.error("Search API error:", err);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleAssessmentSearch = (value: string) => {
    setAssessmentSearch(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (value.trim().length === 0) {
      if (selectedCategoryKey) {
        const sub = selectedCategoryKey.split("-").slice(1).join("-");
        if (sub) {
          getAIBuddyInterviews(sub)
            .then((response) => setInterviews(response.data))
            .catch(() => {});
        }
      } else {
        setInterviews(null);
      }
      return;
    }
    if (value.trim().length >= MIN_SEARCH_CHARS) {
      searchTimerRef.current = setTimeout(() => searchAssessments(value), DEBOUNCE_MS);
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const loadInterviews = async () => {
      if (!selectedCategoryKey) {
        setInterviews(null);
        return;
      }
      const subCategory = selectedCategoryKey.split("-").slice(1).join("-");
      if (!subCategory) return;
      try {
        setInterviewsLoading(true);
        const response = await getAIBuddyInterviews(subCategory);
        console.log("AIBuddy interviews data:", response.data);
        setInterviews(response.data);
      } catch (e) {
        console.error("Error loading interviews for AI Buddy", e);
      } finally {
        setInterviewsLoading(false);
      }
    };

    loadInterviews();
  }, [selectedCategoryKey]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth flex flex-col">
      <NavbarV2 pageTitle="AI Interview Buddy" showPageTitle />

      <main className="flex-1">
        <div className="w-full px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 grid gap-5 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1.55fr)]">
          {/* Left: search + categories */}
          <aside className="lg:self-stretch">
            <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm p-4 h-full flex flex-col">
              <div className="relative">
                <input
                  type="text"
                  value={assessmentSearch}
                  onChange={(e) => handleAssessmentSearch(e.target.value)}
                  placeholder="Search assessments (min 3 chars)..."
                  maxLength={50}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500/70 focus:border-slate-400"
                />
                {searchLoading && (
                  <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
                )}
              </div>
              <div className="mt-4">
                <p className="text-[11px] font-semibold text-gray-700 mb-1.5">
                  Browse categories
                </p>
                {categoriesLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-9 rounded-md bg-slate-100 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {categories.map((cat) => (
                      <AccordionItem key={cat.main} value={cat.main}>
                        <div className="flex items-center group/cat">
                          <AccordionTrigger className="px-3 text-sm text-gray-900 flex-1">
                            {cat.main}
                          </AccordionTrigger>
                          {userCredentials?.role === "super_admin" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm({
                                  open: true,
                                  type: "category",
                                  label: cat.main,
                                  category: cat.main,
                                  categoryId: cat.id,
                                });
                              }}
                              className="p-1.5 mr-2 text-gray-300 opacity-0 group-hover/cat:opacity-100 hover:text-red-500 rounded transition-all"
                              title={`Delete ${cat.main}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        <AccordionContent className="px-3">
                          {userCredentials?.role === "super_admin" && (
                            <button
                              type="button"
                              onClick={() => {
                                setSubCatName("");
                                setSubCatPopup({ open: true, category: cat.main, categoryId: cat.id });
                              }}
                              className="w-full flex items-center gap-2 pl-6 pr-2 py-3 mb-1 text-sm rounded-md border border-dashed border-slate-200 text-slate-500 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50/40 transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Add Subcategory
                            </button>
                          )}
                          <ul className="space-y-1 text-sm text-gray-700">
                            {cat.subs.map((sub) => {
                              const key = `${cat.main}-${sub}`;
                              const isSelected = selectedCategoryKey === key;
                              return (
                                <li key={sub} className="list-none flex items-center group/sub">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSelectedCategoryKey(
                                        isSelected ? null : key
                                      )
                                    }
                                    className={`flex-1 text-left pl-6 pr-2 py-3 rounded-md transition-colors ${
                                      isSelected
                                        ? "bg-slate-100 text-slate-900 font-medium"
                                        : "hover:bg-slate-50"
                                    }`}
                                  >
                                    {sub}
                                  </button>
                                  {userCredentials?.role === "super_admin" && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setDeleteConfirm({
                                          open: true,
                                          type: "subcategory",
                                          label: sub,
                                          category: cat.main,
                                          categoryId: cat.id,
                                          subCategory: sub,
                                        })
                                      }
                                      className="p-1 text-gray-300 opacity-0 group-hover/sub:opacity-100 hover:text-red-500 rounded transition-all"
                                      title={`Delete ${sub}`}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                {userCredentials?.role === "super_admin" && (
                  <button
                    type="button"
                    onClick={() => {
                      setCatName("");
                      setCatPopupOpen(true);
                    }}
                    className="mt-2 w-full flex items-center justify-start gap-2 px-3 py-3 text-sm font-medium text-slate-500 rounded-lg border-2 border-dashed border-slate-200 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50/40 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Category
                  </button>
                )}
              </div>

              
            </div>
          </aside>

          {/* Right: interview tiles */}
          <section className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-slate-100/70 via-white to-slate-200/70 blur-2xl opacity-60" />
            <div className="relative rounded-3xl border border-slate-200 bg-white/90 shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    AI Interview Practice
                  </h2>
                  <p className="text-sm text-gray-600">
                    Practice with expert-crafted mock interviews, get instant feedback,
                    and walk into your dream role with confidence.
                  </p>
                </div>
              </div>


              <div className="grid grid-cols-2 md:grid-cols-4 p-4 gap-4 rounded-lg bg-white">
                {interviewsLoading &&
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 animate-pulse"
                    >
                      <div className="h-3 w-3/4 rounded bg-slate-200" />
                      <div className="h-3 w-1/2 rounded bg-slate-200" />
                      <div className="space-y-1 mt-1">
                        <div className="h-2.5 w-full rounded bg-slate-200" />
                        <div className="h-2.5 w-5/6 rounded bg-slate-200" />
                      </div>
                      <div className="h-7 w-full rounded-md bg-slate-200 mt-2" />
                    </div>
                  ))}

                {!interviewsLoading &&
                  interviews &&
                  interviews.length > 0 &&
                  userCredentials?.role === "super_admin" && (
                    <button
                      type="button"
                      onClick={() => {
                        const parts = selectedCategoryKey?.split("-") || [];
                        const cat = parts[0] || "";
                        const sub = parts.slice(1).join("-") || "";
                        setAssessForm((f) => ({ ...f, category: cat, subCategory: sub }));
                        setEditingAssessmentId(null);
                        setAssessErrors({});
                        setAssessPopup(true);
                      }}
                      className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/60 text-slate-500 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50/40 transition-colors cursor-pointer"
                    >
                      <Plus className="h-6 w-6" />
                      <span className="text-xs font-semibold">Add Assessment</span>
                    </button>
                  )}

                {!interviewsLoading &&
                  interviews?.map((interview) => (
                    <div
                      key={interview.assessmentRole}
                      className="flex flex-col justify-between gap-2 p-3 rounded-lg bg-white shadow-sm group/tile relative"
                    >
                      {userCredentials?.role === "super_admin" && (
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/tile:opacity-100 transition-all">
                          <button
                            type="button"
                            onClick={() => {
                              const parts = selectedCategoryKey?.split("-") || [];
                              const cat = parts[0] || "";
                              const sub = parts.slice(1).join("-") || "";
                              setAssessForm({
                                assessmentRole: interview.assessmentRole || "",
                                category: cat,
                                subCategory: sub,
                                minExp: interview.minExp ?? 0,
                                maxExp: interview.maxExp ?? 5,
                                jobDescription: interview.jobDescription || "",
                                duration: interview.duration || 12,
                                skills: interview.skills?.map((s: any) => ({
                                  name: s.name || "",
                                  difficulty: s.difficulty || "intermediate",
                                  timeLimit: s.timeLimit || 12,
                                })) || [{ name: "", difficulty: "intermediate", timeLimit: 12 }],
                              });
                              setEditingAssessmentId(interview._id);
                              setAssessErrors({});
                              setAssessPopup(true);
                            }}
                            className="p-1 rounded-full bg-white text-gray-400 shadow-sm hover:bg-orange-50 hover:text-orange-500 transition-colors"
                            title="Edit assessment"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({
                                open: true,
                                type: "assessment",
                                label: interview.assessmentRole,
                                assessmentId: interview._id,
                              })
                            }
                            className="p-1 rounded-full bg-white text-gray-400 shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                            title="Delete assessment"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      <p className="text-xs font-semibold">
                        {interview.assessmentRole}
                      </p>

                      <p className="text-xs text-gray-600">
                        {interview.duration} minutes
                      </p>

                      <div className="text-xs text-gray-600 line-clamp-3">
                        {interview.skills.map((skill: any) => skill.name).join(", ")}
                      </div>

                      <button
                        type="button"
                        className="relative text-xs w-full rounded-md py-1.5 px-2 border border-gray-300 bg-white overflow-hidden group transition-colors duration-200 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={() => handleStartInterview(interview)}
                        disabled={startingRole === interview.assessmentRole}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-50 via-orange-300/70 to-orange-50 opacity-0 transition-transform transition-opacity duration-600 group-hover:translate-x-full group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <span className="relative z-10 inline-flex items-center justify-center gap-1.5">
                          {startingRole === interview.assessmentRole && (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-700" />
                          )}
                          <span>Start Interview</span>
                        </span>
                      </button>

                    </div>
                  ))}

                {!interviewsLoading && (!interviews || interviews.length === 0) && (
                  <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-800">
                      No mock interviews yet.
                    </p>
                    <p className="mt-1 text-xs text-slate-500 max-w-xs">
                      Pick a category on the left to see AI-powered mock interviews
                      tailored to that area.
                    </p>
                    {userCredentials?.role === "super_admin" && (
                      <button
                        type="button"
                        onClick={() => {
                          const parts = selectedCategoryKey?.split("-") || [];
                          const cat = parts[0] || "";
                          const sub = parts.slice(1).join("-") || "";
                          setAssessForm((f) => ({ ...f, category: cat, subCategory: sub }));
                          setEditingAssessmentId(null);
                          setAssessErrors({});
                          setAssessPopup(true);
                        }}
                        className="mt-4 px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 inline-flex items-center gap-2 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Add Assessment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {subCatPopup.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => setSubCatPopup({ open: false, category: "" })}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-xs mx-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-gray-500 mb-2">
              New subcategory in <span className="font-medium text-gray-800">{subCatPopup.category}</span>
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={subCatName}
                onChange={(e) => setSubCatName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSubcategory()}
                placeholder="Subcategory name"
                autoFocus
                className="flex-1 min-w-0 rounded-md border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:border-orange-400"
              />
              <button
                type="button"
                onClick={handleAddSubcategory}
                disabled={!subCatName.trim() || subCatSaving}
                className="px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                {subCatSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {catPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => setCatPopupOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-xs mx-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-gray-500 mb-2">New category</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                placeholder="Category name"
                autoFocus
                className="flex-1 min-w-0 rounded-md border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:border-orange-400"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                disabled={!catName.trim() || catSaving}
                className="px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                {catSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {assessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => setAssessPopup(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-800">{editingAssessmentId ? "Edit Assessment" : "New Assessment"}</p>
              <button
                type="button"
                onClick={() => setAssessPopup(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Assessment Role */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-gray-500">Assessment Role *</label>
                  <button
                    type="button"
                    onClick={async () => {
                      setAiRoleGenerating(true);
                      try {
                        const aiUrl = process.env.NEXT_PUBLIC_AI_API_URL;
                        if (!aiUrl) {
                          toast.error("AI API URL not configured.");
                          return;
                        }
                        const category = assessForm.category;
                        const subcategory = assessForm.subCategory;
                        const payload = {
                          category: category,
                          subcategory: subcategory,
                          // skills: assessForm.skills.map((s) =>{ return { skill: s.name, difficulty: s.difficulty } }),
                        };
                        const res = await fetch(`${aiUrl}api/public/generateAIContentForAIBuddy`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });
                        if (!res.ok) throw new Error("API request failed");

                        const data = await res.json();
                        const aiData = data?.data || {};
                        const role = (aiData.role || "").trim();
                        const jobDescription = (aiData.jobDescription || "").trim();
                        const skills = Array.isArray(aiData.skills) ? aiData.skills : [];

                        if (!role && !jobDescription && skills.length === 0) {
                          toast.info("No AI content returned.");
                          return;
                        }

                        setAssessForm((f) => {
                          const baseTimeLimit = f.skills[0]?.timeLimit ?? 12;
                          const mappedSkills =
                            skills.length > 0
                              ? skills.map((s: any) => ({
                                  name: s.name || "",
                                  difficulty: s.difficulty || "intermediate",
                                  timeLimit: baseTimeLimit,
                                }))
                              : f.skills;

                          return {
                            ...f,
                            assessmentRole: role || f.assessmentRole,
                            jobDescription: jobDescription || f.jobDescription,
                            skills: mappedSkills,
                          };
                        });

                        toast.success("AI content applied to the form.");
                      } catch (e) {
                        console.error(e);
                        toast.error("Failed to generate suggestion.");
                      } finally {
                        setAiRoleGenerating(false);
                      }
                    }}
                    disabled={aiRoleGenerating}
                    className="group inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-600 hover:bg-orange-500 hover:text-white transition-colors disabled:opacity-60"
                    title="Let AI fill role, description & skills"
                  >
                    {aiRoleGenerating ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                    <span className="transition-colors duration-200">
                      AI suggest
                    </span>
                  </button>
                </div>
                <div
                  className={`mt-1 rounded-md border focus-within:ring-1 focus-within:ring-orange-400/20 ${
                    assessErrors.assessmentRole ? "border-red-300" : "border-gray-200 focus-within:border-orange-400"
                  }`}
                >
                  <input
                    type="text"
                    value={assessForm.assessmentRole}
                    onChange={(e) =>
                      setAssessForm((f) => ({ ...f, assessmentRole: e.target.value }))
                    }
                    placeholder="e.g. IT Infrastructure Manager"
                    className="w-full rounded-md border-0 bg-transparent px-2.5 py-1.5 text-sm focus:outline-none focus:ring-0"
                  />
                </div>
                {assessErrors.assessmentRole && <p className="text-[11px] text-red-500 mt-0.5">{assessErrors.assessmentRole}</p>}
              </div>

              {/* Category & Subcategory (read-only) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Category</label>
                  <div className="mt-1 w-full rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-600">
                    {assessForm.category || "—"}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Subcategory</label>
                  <div className="mt-1 w-full rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-600">
                    {assessForm.subCategory || "—"}
                  </div>
                </div>
              </div>

              {/* Duration (read-only) */}
              <div>
                <label className="text-xs text-gray-500">Duration (min)</label>
                <div className="mt-1 w-full rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-600">
                  {assessForm.duration}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="text-xs text-gray-500">Job Description *</label>
                <textarea
                  rows={3}
                  value={assessForm.jobDescription}
                  onChange={(e) => setAssessForm((f) => ({ ...f, jobDescription: e.target.value }))}
                  placeholder="Describe the role responsibilities..."
                  className={`mt-1 w-full rounded-md border px-2.5 py-1.5 text-sm focus:outline-none focus:border-orange-400 resize-y min-h-[4.5rem] ${assessErrors.jobDescription ? "border-red-300" : "border-gray-200"}`}
                />
                {assessErrors.jobDescription && <p className="text-[11px] text-red-500 mt-0.5">{assessErrors.jobDescription}</p>}
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-gray-500">Skills *</label>
                  <button
                    type="button"
                    onClick={() =>
                      setAssessForm((f) => ({
                        ...f,
                        skills: [...f.skills, { name: "", difficulty: "intermediate", timeLimit: 12 }],
                      }))
                    }
                    className="text-[11px] text-orange-500 hover:text-orange-600 font-medium inline-flex items-center gap-0.5"
                  >
                    <Plus className="h-3 w-3" /> Add skill
                  </button>
                </div>
                {assessErrors.skills && <p className="text-[11px] text-red-500 mb-1">{assessErrors.skills}</p>}
                <div className="space-y-2">
                  {assessForm.skills.map((skill, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...assessForm.skills];
                            updated[i] = { ...updated[i], name: e.target.value };
                            setAssessForm((f) => ({ ...f, skills: updated }));
                          }}
                          placeholder="Skill name"
                          className={`w-full rounded-md border px-2 py-1.5 text-xs focus:outline-none focus:border-orange-400 ${assessErrors[`skill_${i}`] ? "border-red-300" : "border-gray-200"}`}
                        />
                      </div>
                      <select
                        value={skill.difficulty}
                        onChange={(e) => {
                          const updated = [...assessForm.skills];
                          updated[i] = { ...updated[i], difficulty: e.target.value };
                          setAssessForm((f) => ({ ...f, skills: updated }));
                        }}
                        className="rounded-md border border-gray-200 px-1.5 py-1.5 text-xs focus:outline-none focus:border-orange-400 bg-white"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                      {assessForm.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setAssessForm((f) => ({
                              ...f,
                              skills: f.skills.filter((_, idx) => idx !== i),
                            }))
                          }
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setAssessPopup(false)}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 rounded-md border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddAssessment}
                disabled={assessSaving}
                className="px-4 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                {assessSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                {editingAssessmentId ? "Update" : "Create Assessment"}
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirm.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => setDeleteConfirm({ open: false, type: "assessment", label: "" })}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-xs mx-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Delete {deleteConfirm.type === "category" ? "category" : deleteConfirm.type === "subcategory" ? "subcategory" : "assessment"}?
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{deleteConfirm.label}</span>
            </p>
            {(deleteConfirm.type === "category" || deleteConfirm.type === "subcategory") && (
              <p className="text-xs text-red-500 mb-3">
                All interviews under this {deleteConfirm.type} will also be deleted.
              </p>
            )}
            {deleteConfirm.type === "assessment" && <div className="mb-3" />}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm({ open: false, type: "assessment", label: "" })}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 rounded-md border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                {deleting && <Loader2 className="h-3 w-3 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


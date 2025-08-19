"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Cookies from "js-cookie";
import Header from "./header";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const token = Cookies.get("accessToken");

interface Resume {
  _id: string;
  personalInfo?: {
    fullName?: string;
  };
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch(`${API_URL}/resumes`, {
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setResumes(data.data || []);
      } catch (err) {
        console.error("Failed to fetch resumes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      const response = await fetch(`${API_URL}/resumes/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log(token);
        throw new Error("Failed to delete");
      }
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (resume: Resume) => {
    try {
      const response = await fetch(`${API_URL}/resumes/${resume._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...resume,
          personalInfo: {
            ...resume.personalInfo,
            fullName:
              prompt(
                "Edit full name:",
                resume.personalInfo?.fullName || ""
              ) || resume.personalInfo?.fullName,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updated = await response.json();
      setResumes((prev) =>
        prev.map((r) => (r._id === resume._id ? updated.data : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading resumes...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">My Resumes</h1>
        {resumes.length === 0 ? (
          <p className="text-center">No resumes found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="flex flex-col justify-between p-4 border rounded-2xl shadow-sm bg-white hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://placehold.co/120x120?text=Resume"
                    alt="Resume Thumbnail"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span className="font-semibold text-lg">
                    {resume.personalInfo?.fullName || "Untitled Resume"}
                  </span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(resume)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(resume._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
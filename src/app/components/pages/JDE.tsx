"use client";
import { useState } from "react";
import { FileText, Sparkles, ArrowRight, ArrowDown, Zap } from "lucide-react";
import Header from "./header";

const JDE = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Placeholder for toast notifications; replace with your actual toast library (e.g., react-toastify)
  const toast = {
    info: (msg: string) => console.log("Info:", msg),
    success: (msg: string) => console.log("Success:", msg),
    error: (msg: string) => console.log("Error:", msg),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Title:", jobTitle);
    console.log("Job Description:", jobDescription);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("jde-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAISuggestForJobDescription = async () => {
    setAiLoading(true);
    try {
      if (!jobTitle) {
        toast.info("Please provide a job title first.");
        return;
      }

      const prompt = `Generate a concise, ATS-friendly job description paragraph (65-90 words) for the position of ${jobTitle}. Highlight key responsibilities, achievements, and skills. Ensure it is professional, engaging, and suitable for a resume. Avoid bullet points and format as a single paragraph.`;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      const generatedDescription = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

      // Update jobDescription state with the AI-generated paragraph
      setJobDescription(generatedDescription);
      toast.success("AI-generated job description added!");
    } catch (error) {
      console.error("Failed to generate AI suggestion:", error);
      toast.error("Failed to generate AI suggestion. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
       

        {/* JDE Form Section */}
        <section id="jde-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-background">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Create Your JDE Resume
            </h2>
            <p className="text-xl text-muted-foreground">
              Enter your target job details and let our AI optimize your resume for maximum impact
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg border border-orange-100">
              <div className="text-center p-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-orange-500 rounded-full">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Job Description Enhanced Resume
                </h3>
                <p className="text-lg text-gray-600 mt-2">
                  Create a tailored resume that perfectly matches your target job
                </p>
              </div>

              <div className="px-8 pb-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="jobTitle" className="block text-base font-semibold text-gray-900">
                      Job Title
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      placeholder="e.g., Senior Software Engineer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full h-12 px-4 text-base border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="jobDescription" className="block text-base font-semibold text-gray-900">
                      Job Description
                    </label>
                    <textarea
                      id="jobDescription"
                      placeholder="Paste the complete job description here. Include requirements, responsibilities, and qualifications..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full min-h-48 px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Tip: Include the full job posting for better resume optimization
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 group"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Generate Enhanced Resume
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={handleAISuggestForJobDescription}
                      disabled={aiLoading}
                      className={`w-full inline-flex items-center justify-center h-14 text-lg font-semibold border-2 border-orange-500 text-orange-600 bg-white rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ${
                        aiLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      {aiLoading ? "Generating..." : "AI Suggest Description"}
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">🎯</div>
                    <div className="text-sm font-medium text-gray-900">Keyword Optimization</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">📊</div>
                    <div className="text-sm font-medium text-gray-900">ATS Friendly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">⚡</div>
                    <div className="text-sm font-medium text-gray-900">Instant Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default JDE;
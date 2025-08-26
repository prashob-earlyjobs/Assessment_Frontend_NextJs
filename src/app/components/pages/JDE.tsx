"use client";
import { useState } from "react";
import { FileText, Sparkles, ArrowRight, Zap } from "lucide-react";
import Header from "./header";
import { toast } from "sonner";
import Link from "next/link";
const JDE = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jdUrl, setJdUrl] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [urlLoading, setUrlLoading] = useState(false);


    //   const toast = {
    //     info: (msg: string) => console.log("Info:", msg),
    //     success: (msg: string) => console.log("Success:", msg),
    //     error: (msg: string) => console.log("Error:", msg),
    //   };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Job Title:", jobTitle);
        console.log("Job Description:", jobDescription);
        console.log("JD URL:", jdUrl);
    };

    const handleFetchFromUrl = async () => {
        if (!jdUrl) {
            toast.info("Please provide a job description URL.");
            return;
        }

        setUrlLoading(true);
        try {
            const res = await fetch("/api/fetch-jd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: jdUrl }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch job description");
            }

            const data = await res.json();
            const { title, description } = data;

            if (title) setJobTitle(title);
            if (description) setJobDescription(description);

            toast.success("Job details fetched successfully!");
        } catch (error) {
            console.error("Failed to fetch job details:", error);
            toast.error("Failed to fetch job details. Please check the URL and try again.");
        } finally {
            setUrlLoading(false);
        }
    };

    const handleAISuggestForJobDescription = async () => {
        setAiLoading(true);
        try {
            if (!jobTitle) {
                toast.info("Please provide a job title first.");
                return;
            }

            const prompt = `Generate a concise, ATS-friendly job description paragraph  for the position of ${jobTitle}. Highlight key responsibilities, achievements, and skills. Ensure it is professional, engaging, and suitable for a resume. Avoid bullet points and format as a single paragraph.`;

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
                {/* JDE Form Section */}
                <section id="jde-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-background">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Create Your JDE Resume
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Enter your target job details or paste a job description URL to optimize your resume
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
                                        <label htmlFor="jdUrl" className="block text-base font-semibold text-gray-900">
                                            Job Description URL
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                id="jdUrl"
                                                type="url"
                                                placeholder="e.g., https://jobs.example.com/posting"
                                                value={jdUrl}
                                                onChange={(e) => setJdUrl(e.target.value)}
                                                className="w-full h-12 px-4 text-base border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleFetchFromUrl}
                                                disabled={urlLoading}
                                                className={`inline-flex items-center justify-center h-12 px-4 text-base font-semibold border-2 border-orange-500 text-orange-600 bg-white rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ${urlLoading ? "opacity-50 cursor-not-allowed" : "whitespace-nowrap"
                                                    }`}
                                            >
                                                {urlLoading ? "Fetching..." : "Fetch JD"}
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Tip: Paste the URL of the job posting to auto-fill the job title and description
                                        </p>
                                    </div>

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

                                        <Link
                                            href={{
                                                pathname: "/airesumebuilder",
                                                query: { jobTitle, jobDescription },
                                            }}
                                        >
                                            <button
                                                type="submit"

                                                className="w-full inline-flex items-center justify-center h-14 px-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 group"
                                            >
                                                <FileText className="mr-2 h-5 w-5" />
                                                Generate Enhanced Resume
                                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>

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
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Tilt from 'react-parallax-tilt';
import Link from "next/link";
import {
    Upload,
    Sparkles,
    FileText,
    Zap,
    CheckCircle,
    ArrowRight,
    Download,
    Star,
    Users,
    Trophy
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Index() {
    const router = useRouter();
    const [currentText, setCurrentText] = useState(0);
    const heroTexts = [
        "Create a resume that your dream job will notice",
        "Land interviews with AI-powered resumes",
        "Build professional resumes in minutes",
        "Stand out with intelligent resume optimization"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % heroTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100 mt-20 lg:mt-0">
            <style jsx>{`
                @keyframes typing {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
                .animate-typing {
                    animation: typing 3s steps(30, end) forwards;
                }
                .animate-typing::after {
                    content: '|';
                    display: inline-block;
                    margin-left: 4px;
                    font-size: 2rem; /* Larger cursor size */
                    line-height: 1.5rem; /* Adjust line height to align with text */
                    font-weight: bold; /* Make cursor bolder */
                    color: #f97316; /* Orange color to match gradient */
                    animation: blink 0.75s step-end infinite;
                    vertical-align: middle; /* Align cursor with text */
                }
            `}</style>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-18">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-full text-sm font-medium">
                                <Sparkles className="w-4 h-4 mr-2" />
                                AI-Powered Resume Builder
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                <span className="block">Create a resume</span>
                                <span className="block">that your dream job</span>
                                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    will notice
                                </span>
                            </h1>

                            <div className="hidden md:block h-16 flex items-center">
                                <p
                                    key={currentText}
                                    className="text-xl  bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600 animate-typing overflow-hidden whitespace-nowrap"
                                >
                                    {heroTexts[currentText]}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg text-gray-600">
                                Pick a template. Fill in the blanks. Download. Land the job. Simple.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => router.push('/airesume')}
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-md flex items-center justify-center"
                                >
                                    Build your resume
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                                <button
                                    onClick={scrollToFeatures}
                                    className="bg-white hover:bg-gray-100  text-orange-500 px-8 py-4 text-lg font-semibold rounded-md flex items-center justify-center border border-orange-300"
                                >
                                    View Features
                                    
                                </button>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500 font-medium">Trusted by professionals from</p>
                            <div className="flex items-center space-x-8 opacity-60">
                                <div className="text-gray-400 font-semibold">COGENT</div>
                                <div className="text-gray-400 font-semibold">HDFC</div>
                                <div className="text-gray-400 font-semibold">PAYTM</div>
                                <div className="text-gray-400 font-semibold">TP</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Resume Preview */}
                    <Tilt
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        perspective={1000}
                        transitionSpeed={1000}
                        scale={1.02}
                        gyroscope={true}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-300 rounded-3xl blur-3xl opacity-30"></div>
                            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto">
                                {/* Resume Header */}
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                                        <img
                                            src="/images/Resumee.jpg"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" style={{ display: 'none' }}>
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Jashwanth Sheri</h3>
                                        <p className="text-gray-600 text-sm">Student</p>
                                    </div>
                                </div>

                                {/* Resume Sections */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                                        <div className="space-y-1">
                                            <div className="h-2 bg-gray-200 rounded w-full"></div>
                                            <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-medium text-sm text-gray-800">Intern, EarlyJobs</span>
                                                    <span className="text-xs text-gray-500">Jan 2025 - Present</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                                                    <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div>Phone: 9876543210</div>
                                            <div>Email: jashwanth@earlyjobs.in</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tilt>
                </div>

                {/* Features Section */}
                <section className="py-20" id="features">
                    <div className="text-center  mt-20">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Powerful <span className="text-orange-500">EarlyJobs</span> Features to Land Your Dream Job
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Transform your career with intelligent resume building tools designed for success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1: Upload & Parse */}
                        <div onClick={() => router.push('/airesume')}
                            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-lg p-8 text-center cursor-pointer">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload & Parse Resume</h3>
                            <p className="text-gray-600 mb-6">
                                Instantly extract and analyze your existing resume. Our AI understands your experience and optimizes it for maximum impact.
                            </p>
                            <ul className="space-y-2 text-left">
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    Smart content extraction
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    Format recognition
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    Skill identification
                                </li>
                            </ul>
                        </div>

                        {/* Feature 2: JDE Builder */}
                        <div onClick={() => router.push('/airesume/jde')} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-lg p-8 text-center cursor-pointer">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Build through JDE</h3>
                            <p className="text-gray-600 mb-6">
                                Use our Job Description Editor to create targeted resumes. Match your skills perfectly to specific job requirements.
                            </p>
                            <ul className="space-y-2 text-left">
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    Job-specific optimization
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    Keyword matching
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    ATS compatibility
                                </li>
                            </ul>
                        </div>

                        {/* Feature 3: Create New Resume */}
                        <div onClick={() => router.push('/airesume')} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-lg p-8 text-center cursor-pointer">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create New Resume</h3>
                            <p className="text-gray-600 mb-6">
                                Start fresh with AI-guided resume creation. Get professional templates and intelligent suggestions every step of the way.
                            </p>
                            <ul className="space-y-2 text-left">
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    Professional templates
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    AI writing assistance
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                    Real-time optimization
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="mt-20 text-center max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-md">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            Why Choose EarlyJobs-Resume Builder?
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-6 h-6 text-orange-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
                                <p className="text-gray-600 text-sm">
                                    Smart suggestions for professional summaries and job descriptions
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-6 h-6 text-orange-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Beautiful Templates</h4>
                                <p className="text-gray-600 text-sm">
                                    Choose from modern, ATS-friendly resume templates
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Download className="w-6 h-6 text-green-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Instant Export</h4>
                                <p className="text-gray-600 text-sm">
                                    Download your perfect resume as a high-quality PDF
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
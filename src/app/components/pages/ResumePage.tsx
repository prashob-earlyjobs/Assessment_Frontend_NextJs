import { useState, useEffect, useRef } from "react";
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
    Trophy,
    Shield,
    Clock,
    Globe,
    ChevronUp,
    ChevronDown
} from "lucide-react";
import { useRouter } from "next/navigation";

const useScrollAnimation = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return { ref, isVisible };
};

export default function Index() {
    const router = useRouter();
    const [currentText, setCurrentText] = useState(0);
    const [openFaq, setOpenFaq] = useState(null); // State to track which FAQ is open

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

    const faqs = [
        {
            question: "What is EarlyJobs Resume Builder?",
            answer: "EarlyJobs Resume Builder is an AI-powered tool that helps you create professional, ATS-friendly resumes quickly and easily. It analyzes your experience and optimizes content to match job requirements."
        },
        {
            question: "How does the AI-powered feature work?",
            answer: "Our AI uses advanced natural language processing to suggest improvements, match keywords from job descriptions, and generate tailored content for sections like summaries and bullet points."
        },
        {
            question: "Is the resume builder free to use?",
            answer: "Yes, basic features are free. Premium features like unlimited exports and advanced AI suggestions require a subscription starting at a low monthly fee."
        },
        {
            question: "Can I upload my existing resume?",
            answer: "Absolutely! Upload your current resume in PDF or Word format, and our parser will extract and optimize the content automatically."
        },
        {
            question: "What file formats can I export?",
            answer: "You can export your resume as a high-quality PDF, which is optimized for ATS systems and printing."
        },
        {
            question: "Is my data secure and private?",
            answer: "Yes, we prioritize your privacy. All data is encrypted, and resumes are not stored without your consent. We comply with GDPR and other data protection standards."
        },
        {
            question: "How long does it take to build a resume?",
            answer: "Most users can create a complete resume in under 10 minutes, thanks to our intuitive interface and AI assistance."
        },
        {
            question: "Does it support multiple languages?",
            answer: "Currently, our tool supports English primarily, but we're expanding to include Hindi, Spanish, and more languages soon."
        },
        {
            question: "Can I customize the templates?",
            answer: "Yes, choose from various modern templates and customize colors, fonts, and layouts to match your personal style while keeping ATS compatibility."
        },
        {
            question: "What if I need help or support?",
            answer: "We offer 24/7 email support and a comprehensive help center. Premium users get priority chat support."
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index); // Toggle the FAQ or close if already open
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100  lg:mt-0">
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
                    font-size: 2rem;
                    line-height: 1.5rem;
                    font-weight: bold;
                    color: #f97316;
                    animation: blink 0.75s step-end infinite;
                    vertical-align: middle;
                }
            `}</style>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-6 px-6 lg:px-18 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="hidden md:inline-flex items-center bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-full text-sm font-medium">
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
                                    className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600 animate-typing overflow-hidden whitespace-nowrap"
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
                                    className="bg-white hover:bg-gray-100 text-orange-500 px-8 py-4 text-lg font-semibold rounded-md flex items-center justify-center border border-orange-300"
                                >
                                    View Features
                                </button>
                            </div>
                        </div>
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
                                            <div>Phone: 9876******</div>
                                            <div>Email: j*****@earlyjobs.in</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tilt>
                </div>

                {/* Features Section */}
                <section className="py-20" id="features">
                    <div className="text-center mt-20">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Powerful <span className="text-orange-500">EarlyJobs</span> Features to Land Your Dream Job
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Transform your career with intelligent resume building tools designed for success
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mt-10">
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
                        <div onClick={() => router.push('/airesume/jde')} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-lg p-8 text-center cursor-pointer">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create by Job Description</h3>
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

                {/* Why Choose Us Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Why Choose <span className="text-orange-500">EarlyJobs</span> Resume Builder?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Join thousands of professionals who have landed their dream jobs with our intelligent, user-friendly tools. We're committed to your career success.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3 text-center">AI-Powered Optimization</h4>
                                    <p className="text-gray-600 text-sm text-center">
                                        Get smart suggestions for professional summaries, bullet points, and keyword matching to beat ATS systems.
                                    </p>
                                </CardContent>
                            </Card>
                          
                            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Download className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3 text-center">Instant PDF Export</h4>
                                    <p className="text-gray-600 text-sm text-center">
                                        Download your polished resume in seconds as a print-ready PDF, no watermarks on premium plans.
                                    </p>
                                </CardContent>
                            </Card>
                           
                            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3 text-center">Time-Saving</h4>
                                    <p className="text-gray-600 text-sm text-center">
                                        Build and optimize resumes in minutes, not hours. Focus on your job search, not formatting.
                                    </p>
                                </CardContent>
                            </Card>
                            
                        </div>
                        <div className="text-center mt-12">
                            <button
                                onClick={() => router.push('/airesume')}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-md flex items-center justify-center mx-auto"
                            >
                                Start Building Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16  sm:px-6 lg:px-8 bg-background">
                               <div className="max-w-7xl mx-auto">
                                   <div className="text-center mb-10">
                                       <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
                                       <p className="text-gray-600 max-w-2xl mx-auto">
                                           Got questions? We've got answers about our Resume Builder and how they can help you succeed.
                                       </p>
                                   </div>
                                   <div className="grid lg:grid-cols-2 gap-6">
                                       {faqs.slice(0, 10).map((faq, index) => {
                                           const { ref, isVisible } = useScrollAnimation();
                                           return (
                                               <div
                                                   key={index}
                                                   ref={ref}
                                                   className={`transition-all duration-700 delay-${index * 150} ${isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"}`}
                                               >
                                                   <div className="bg-gray-50 rounded-lg shadow-md border-0">
                                                       <button
                                                           className="w-full flex justify-between items-center p-5 text-left text-gray-900 font-semibold text-lg"
                                                           onClick={() => toggleFaq(index)}
                                                       >
                                                           <span>{faq.question}</span>
                                                           {openFaq === index ? (
                                                               <ChevronUp className="w-5 h-5 text-orange-600" />
                                                           ) : (
                                                               <ChevronDown className="w-5 h-5 text-gray-400" />
                                                           )}
                                                       </button>
                                                       {openFaq === index && (
                                                           <div className="p-5 pt-0 text-gray-600">
                                                               <p>{faq.answer}</p>
                                                           </div>
                                                       )}
                                                   </div>
                                               </div>
                                           );
                                       })}
                                   </div>
                               </div>
                           </section>
            </main>
        </div>
    );
}
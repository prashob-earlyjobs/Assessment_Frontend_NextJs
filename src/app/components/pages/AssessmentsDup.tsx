import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, Search, Play, Users, BookOpen, Trophy, Clock, CheckCircle, ArrowRight, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAssessmentsfromSearchLandingPage } from "../services/servicesapis";

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

export default function Assessments() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [watchDemo, setWatchDemo] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const features = [
        {
            icon: <Users className="w-6 sm:w-8 h-6 sm:h-8" />,
            title: "Online Guide",
            description: "Connect with intelligent AI guides that walk you through every step of your career journey, making complex concepts simple and clear."
        },
        {
            icon: <BookOpen className="w-6 sm:w-8 h-6 sm:h-8" />,
            title: "Lifetime Access",
            description: "Once enrolled, access your Assessments anytime, anywhere with lifetime access to all materials and updates."
        },
        {
            icon: <Trophy className="w-6 sm:w-8 h-6 sm:h-8" />,
            title: "300+ Assessments",
            description: "Join our Community and Unlock Access to Over 300+ Skill-Building Assessments to Level Up Your Future!"
        }
    ];

    const courses = [
        {
            id: "apache-spark/EJA0185",
            title: "Apache Spark",
            duration: "15 mins",
            price: "₹999",
            image: "/images/course3.jpg",
            category: "IT & Technical Support",
        },
        {
            id: "team-lead/EJA0023",
            title: "Team Lead",
            duration: "15 Mins",
            price: "₹999",
            image: "/images/course1.jpg",
            category: "Non-Technical"
        },
        {
            id: "big-data-analytics-with-hadoop/EJA0184",
            title: "Big Data Analytics with Hadoop",
            duration: "15 Min",
            price: "₹999",
            image: "/images/course2.jpg",
            category: "Data Science"
        }
    ];

    const faqs = [
        {
            question: "What are the benefits of taking assessments?",
            answer: "Assessments help you identify your strengths, improve your skills, and prepare for job opportunities by providing personalized feedback and actionable insights."
        },
        {
            question: "How long do I have access to the assessments?",
            answer: "Once enrolled, you get lifetime access to all assessment materials and updates, allowing you to revisit content anytime."
        },
        {
            question: "Are the assessments suitable for beginners?",
            answer: "Yes, our assessments cater to all skill levels, from beginners to advanced professionals, with guided support to ensure effective learning."
        },
        {
            question: "Can I get a certificate after completing an assessment?",
            answer: "Yes, upon successful completion, you receive a certificate that you can add to your resume or share on professional platforms."
        },
        {
            question: "How are the assessments structured?",
            answer: "Assessments are structured with interactive modules, quizzes, and practical exercises to ensure a comprehensive learning experience."
        },
        {
            question: "Is there a refund policy for assessments?",
            answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the assessment experience."
        },
        {
            question: "Can I take assessments on my mobile device?",
            answer: "Absolutely, our platform is fully responsive, allowing you to take assessments on mobile, tablet, or desktop devices."
        },
        {
            question: "Are there any prerequisites for enrolling?",
            answer: "Most assessments have no prerequisites, but some advanced ones may recommend prior knowledge, which is detailed in the assessment description."
        },
        {
            question: "How often are new assessments added?",
            answer: "We regularly update our library, adding new assessments every month to keep content fresh and relevant."
        },
        {
            question: "Can I connect with mentors during assessments?",
            answer: "Yes, our platform offers access to AI-guided mentorship and support to help you through your learning journey."
        }
    ];

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
                setIsDropdownOpen(false);
                return;
            }

            try {
                const response = await getAssessmentsfromSearchLandingPage({ searchQuery });
                setSearchResults(response.data.assessments || []);
                setIsDropdownOpen(true);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
                setIsDropdownOpen(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchSearchResults();
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleSearchResultClick = (assessment) => {
        router.push(
            `/assessments/${assessment.title.toLowerCase().replace(/\s+/g, "-")}/${assessment.shortId ? assessment.shortId : assessment._id}`
        );
        setSearchQuery("");
        setIsDropdownOpen(false);
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-400 to-purple-400  pb-6 sm:pt-6 sm:pb-8 lg:pt-0 lg:pb-12 px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                        {/* Left Content */}
                        <div className="animate-fade-in text-center lg:text-left">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
                                Advance Your Career with {" "}
                                <span className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                                   AI-Powered Skill Assessments

                                </span>
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-orange-100 mb-6 max-w-xl mx-auto lg:mx-0">
                               Join thousands of job seekers and access 300+ online assessments, expert mentorship, and career certificates.</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                                <Button
                                    onClick={() => router.push("/assessments")}
                                    className="bg-white text-orange-600 hover:bg-orange-50 font-semibold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    View Assessments
                                    <ArrowRight className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                                <Button
                                    onClick={() => setWatchDemo(!watchDemo)}
                                    className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg"
                                >
                                    Watch Demo
                                    <ArrowRight className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Right Video */}
                        <div className="relative lg:order-last order-first flex justify-center mt-6 lg:mt-0">
                            <div className="relative w-full max-w-[20rem] sm:max-w-[28rem] h-[14rem] sm:h-[20rem] lg:h-[26rem] lg:max-w-[40rem] animate-float">
                                <div className="relative z-20 w-full h-full">
                                    <video
                                        src="/images/Demo.mp4"
                                        autoPlay
                                        muted={!watchDemo}
                                        loop
                                        playsInline
                                        controls={watchDemo}
                                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                                    />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-white rounded-xl p-1.5 sm:p-2 shadow-xl animate-bounce z-30" style={{ animationDelay: "0.5s" }}>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-gray-800">Online</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -left-2 bg-white rounded-xl p-1.5 sm:p-2 shadow-xl animate-bounce z-30" style={{ animationDelay: "1s" }}>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" style={{ animationDuration: "3s" }} />
                                        <span className="text-xs font-semibold text-gray-800">Certificate</span>
                                    </div>
                                </div>
                                <div className="absolute top-1/3 -left-2 sm:-left-4 bg-white rounded-lg p-1.5 sm:p-2 shadow-lg animate-pulse z-30">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                        <div>
                                            <div className="text-xs font-medium text-gray-800">Progress</div>
                                            <div className="w-10 sm:w-12 h-1 sm:h-1.5 bg-gray-200 rounded-full">
                                                <div className="w-7 sm:w-9 h-1 sm:h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-2/3 -right-2 sm:-right-4 bg-white rounded-lg p-1.5 sm:p-2 shadow-lg animate-pulse z-30" style={{ animationDelay: "1.5s" }}>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                                        <div>
                                            <div className="text-xs font-medium text-gray-800">Job Seekers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Courses Section */}
            <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Search Assessments</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">Find the perfect course to advance your career</p>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                                <Input
                                    type="text"
                                    placeholder="What do you want to learn today?"
                                    className="w-full pl-10 sm:pl-12 md:pl-14 pr-4 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg border-2 border-gray-200 shadow-md rounded-xl focus:ring-2 focus:ring-orange-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {isDropdownOpen && searchResults.length > 0 && (
                                    <div className="absolute z-40 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                                        {searchResults.map((result) => (
                                            <div
                                                key={result.assessmentId}
                                                className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-orange-50 cursor-pointer transition-colors"
                                                onClick={() => handleSearchResultClick(result)}
                                            >
                                                <div className="flex items-center justify-between px-2">
                                                    <span className="text-sm sm:text-base text-gray-900 font-medium">{result.title}</span>
                                                    <Badge className="bg-orange-600 text-white text-xs sm:text-sm">{result.category}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">Features From Our Assessments</h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            Discover why job seekers choose <span className="font-semibold text-orange-600">EarlyJobs.ai</span> for their professional development
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {features.map((feature, index) => {
                            const { ref, isVisible } = useScrollAnimation();
                            return (
                                <div
                                    key={index}
                                    ref={ref}
                                    className={`transition-all duration-700 delay-${index * 200} ${isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"}`}
                                >
                                    <div className="bg-white text-center p-4 sm:p-5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-0 shadow-md rounded-lg group">
                                        <div className="pt-3 sm:pt-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-full mb-3 text-orange-600 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Courses Section */}
            <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">Our Popular Assessments</h2>
                        <p className="text-sm sm:text-base text-gray-600">Choose from our most loved assessments by job seekers worldwide</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {courses.map((course, index) => {
                            const { ref, isVisible } = useScrollAnimation();
                            return (
                                <div
                                    key={course.id}
                                    ref={ref}
                                    className={`transition-all duration-700 delay-${index * 150} ${isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"}`}
                                >
                                    <div className="bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border-0 shadow-md rounded-lg group">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-2 left-2 bg-orange-600 text-white px-2 sm:px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group-hover:bg-orange-700 group-hover:scale-105">
                                                {course.category}
                                            </div>
                                        </div>
                                        <div className="p-4 sm:p-5">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                {course.title}
                                            </h3>
                                            <div className="flex items-center gap-3 sm:gap-4 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                                                    <span className="text-xs sm:text-sm text-gray-600">{course.duration}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg sm:text-xl font-bold text-orange-600 group-hover:scale-110 transition-transform">
                                                    {course.price}
                                                </span>
                                                <Button
                                                    onClick={() => router.push(`/assessments/${course.id}`)}
                                                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base transform hover:scale-105 transition-all duration-300"
                                                >
                                                    Enroll Now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            Got questions? We've got answers about our assessments and how they can help you succeed.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                                            className="w-full flex justify-between items-center p-4 sm:p-5 text-left text-gray-900 font-semibold text-base sm:text-lg"
                                            onClick={() => toggleFaq(index)}
                                        >
                                            <span>{faq.question}</span>
                                            {openFaq === index ? (
                                                <ChevronUp className="w-4 sm:w-5 h-4 sm:h-5 text-orange-600" />
                                            ) : (
                                                <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                            )}
                                        </button>
                                        {openFaq === index && (
                                            <div className="p-4 sm:p-5 pt-0 text-gray-600 text-sm sm:text-base">
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

            {/* CTA Section */}
            <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-orange-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Your Job Seeking Journey?</h2>
                    <p className="text-sm sm:text-base text-orange-100 mb-5 max-w-2xl mx-auto">
                        Join over our job seekers and start building the skills you need to advance your career today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center max-w-md sm:max-w-none mx-auto">
                        <Button
                            onClick={() => router.push("/login")}
                            className="bg-white text-orange-600 hover:bg-orange-50 font-semibold py-2 px-4 sm:py-2.5 sm:px-5 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                        >
                            Get Started
                            <ArrowRight className="inline-block ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                        </Button>
                        <Button
                            onClick={() => router.push("/assessments")}
                            className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-2 px-4 sm:py-2.5 sm:px-5 rounded-lg text-sm sm:text-base transition-all duration-300 w-full sm:w-auto"
                        >
                            Browse Assessments
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CheckCircle, Users, Clock, Star, ArrowRight, Play, Zap, Target, Award, Menu, X, LogIn, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import Footer from "../components/pages/footer";
import { useRouter } from "next/navigation";
import Navbar from "../components/pages/navbar";
import { useUser } from "../context";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { toast } from "sonner";
import { userLogout } from "../components/services/servicesapis";
import Link from "next/link";

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

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const router = useRouter();
  const { userCredentials, setUserCredentials } = useUser();

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  useEffect(() => {
    const handleSmoothScroll = (e: any) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setIsOpen(false);
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  // SEO: Set document title and meta tags dynamically
  useEffect(() => {
    document.title = "AI Job Placement in 30 Days | EarlyJobs";
  }, []);

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (!response.success) {
        throw new Error("Logout failed");
      }
      toast.success("Logged out successfully!");
      setUserCredentials(null);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleMobileMenuItemClick = (route: string) => {
    router.push(route);
    setIsMobileMenuOpen(false);
  };

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "Do I need to take a skill assessment?",
      answer: "No — it’s optional. But verified profiles with assessments attract employers faster.",
    },
    {
      question: "How long does it take to join?",
      answer: "About 20–40 minutes depending on whether you add the optional skill assessment.",
    },
    {
      question: "Who can join?",
      answer: "Any professional, fresher or experienced, across industries.",
    },
    {
      question: "What happens after joining?",
      answer: "You get a verified profile badge, appear in employer searches, and start receiving interview opportunities immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEO: Add Head component for meta tags */}
      <Head>
        <title>AI Job Placement in 30 Days | EarlyJobs</title>
        <meta
          name="description"
          content="Join EarlyJobs Talent Pool and land jobs faster with AI-powered matching. Optional skill assessments, verified profiles, and a 30-day placement guarantee."
        />
        <meta name="keywords" content="AI job placement, EarlyJobs, talent pool, job matching, skill assessments, verified profiles, career acceleration" />
        <meta name="author" content="EarlyJobs.ai" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="AI Job Placement in 30 Days | EarlyJobs" />
        <meta
          property="og:description"
          content="Join EarlyJobs Talent Pool and land jobs faster with AI-powered matching. Optional skill assessments, verified profiles, and a 30-day placement guarantee."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.earlyjobs.ai/" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:site_name" content="EarlyJobs.ai" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Job Placement in 30 Days | EarlyJobs" />
        <meta
          name="twitter:description"
          content="Join EarlyJobs Talent Pool and land jobs faster with AI-powered matching. Optional skill assessments, verified profiles, and a 30-day placement guarantee."
        />
        <meta name="twitter:image" content="/images/twitter-image.jpg" />
        <meta name="twitter:site" content="@EarlyJobsAI" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.earlyjobs.ai/" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleOnHover {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
        .animate-scale-on-hover:hover {
          animation: scaleOnHover 0.3s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .image-background {
          position: relative;
          border-radius: 1.5rem;
        }
        .image-background::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ff8c42, #ff4500);
          border-radius: 1.5rem;
          transform: rotate(3deg);
          opacity: 0.2;
          z-index: -1;
        }
        .image-background-opposite {
          position: relative;
          border-radius: 1.5rem;
        }
        .image-background-opposite::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(315deg, #ff8c42, #ff4500);
          border-radius: 1.5rem;
          transform: rotate(-3deg);
          opacity: 0.2;
          z-index: -1;
        }
        .award-icon {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          color: #ff4500;
          z-index: 1;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
          background-color: white;
          padding: 0.5rem;
          border-radius: 9999px;
        }
        .award-icon-wrapper {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          background: white;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        }
        .award-icon-wrapper::after {
          content: attr(data-step);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #ff4500;
          font-size: 1rem;
          font-weight: bold;
        }
      `}</style>
      <Navbar />
      {/* Navigation */}
      <nav className={`sticky top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50 py-3`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div onClick={() => router.push("/")} className="flex items-center">
              <img src="/images/logo.png" alt="EarlyJobs Logo" className="h-12 lg:h-14 w-auto cursor-pointer" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#talent-pool"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                Talent Pool
              </a>
              <a
                href="#process"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                Process
              </a>
              <a
                href="#benefits"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#faq"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                FAQ
              </a>
              {userCredentials ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:bg-red-50 rounded-xl py-2 px-4 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                  </Button>
                  <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userCredentials.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        {userCredentials?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          ?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">{userCredentials.name}</span>
                  </div>
                </div>
              ) : (
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white shadow-md rounded-xl"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-orange-500 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100">
            <div className="flex flex-col space-y-2">
              {userCredentials !== null && (
                <div
                  className="flex items-center space-x-3 cursor-pointer px-4 py-3"
                  onClick={handleProfileClick}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userCredentials.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                      {userCredentials?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        ?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {userCredentials.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userCredentials.profile?.preferredJobRole}
                    </p>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                onClick={() => handleMobileMenuItemClick("/browse-candidates")}
              >
                Browse Candidates
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                onClick={() => handleMobileMenuItemClick("/college-partnerships")}
              >
                Colleges
              </Button>
               <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/recruiter")}
                >
                  Recruiter
                </Button>
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                onClick={() => handleMobileMenuItemClick("/talent-pool")}
              >
                Talent Pool
              </Button>
              {userCredentials !== null ? (
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-red-600 hover:bg-red-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                </Button>
              ) : (
                <Button
                  className="w-full text-left justify-start bg-orange-700 hover:bg-orange-600 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    router.push("/login");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="h-5 h-5 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-orange-200">
            <div className="flex flex-col space-y-4 px-6 py-4">
              <a
                href="#talent-pool"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Talent Pool
              </a>
              <a
                href="#process"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Process
              </a>
              <a
                href="#benefits"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Benefits
              </a>
              <a
                href="#faq"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
              <Button className="bg-orange-500 hover:bg-orange-600 shadow-md rounded-xl w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200">
                🚀 Join 10,000+ Professionals
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Get Hired <span className="text-orange-500">Faster</span><br/> with AI-Powered Job Placement
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                EarlyJobs.ai connects job seekers with top employers through AI-powered matching, verified profiles, and AI skill assessments. Get vetted, showcased, and hired — all in less time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-20 lg:mb-0">
                <Link href="https://dev2.earlyjobs.in/talentpoolform/public/686cf7d6d4e9e2a0cd1013dc"><Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 shadow-button text-lg text-white px-8 py-6 animate-scale-on-hover"  
                >
                  Register Now 
                </Button></Link>
                <a href="#talent-pool" className="hidden md:block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 text-lg px-8 py-6"
                  >
                    Know More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-orange-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-muted-foreground">AI-Powered Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-muted-foreground">30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-muted-foreground">Vetted Opportunities</span>
                </div>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="image-background">
                <img
                  src="/images/Heroimg2.jpg"
                  alt="Professional success story"
                  className="relative rounded-3xl shadow-orange w-full h-auto animate-float"
                />
                <Award className="award-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Pool Section */}
      <section id="talent-pool" className="py-20 bg-gradient-orange-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-orange-500 text-white p-3 text-lg">
              <Users className="w-4 h-4 mr-2" />
              Elite Talent Network
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join our <span className="text-gradient-orange">Talent Pool</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              An AI specialist will evaluate your skills and help pipeline you for interviews.
              We'll mark your profile as vetted and broadcast it to select employers you choose.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="bg-gradient-card shadow-card border-orange-100 animate-scale-on-hover">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-orange flex items-center justify-center">
                    <Zap className="w-9 h-9 text-white bg-orange-400 p-2 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">AI-Powered Evaluation</h3>
                  <p className="text-muted-foreground">
                    Advanced algorithms assess your skills and match you with perfect opportunities
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card shadow-card border-orange-100 animate-scale-on-hover">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-orange flex items-center justify-center">
                    <Target className="w-9 h-9 text-white bg-orange-400 p-2 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Targeted Matching</h3>
                  <p className="text-muted-foreground">
                    Connect with employers actively seeking your specific skill set and experience
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card shadow-card border-orange-100 animate-scale-on-hover">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-orange flex items-center justify-center">
                    <Award className="w-9 h-9 text-white bg-orange-400 p-2 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Verified Profile</h3>
                  <p className="text-muted-foreground">
                    Get a verified badge that showcases your validated skills to top employers
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200 p-3 text-lg">
              <Clock className="w-4 h-4 mr-2" />
              Quick & Easy Process
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get Started
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process gets you from application to interview-ready in just a few simple steps
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-orange text-white flex items-center justify-center font-bold text-xl mr-4">
                    1
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">15 Minutes</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Complete Your Profile
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Add career details, preferences, and a short video intro.
                  Share your goals, roles, and salary expectations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Professional video introduction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Career preferences setup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Salary expectations</span>
                  </li>
                </ul>
              </div>
              <div className="animate-slide-up">
                <div className="image-background-opposite flex justify-center items-center">
                  <img
                    src="/images/Step1.jpg"
                    alt="Profile completion"
                    className="relative rounded-full shadow-card w-48 h-48 object-cover"
                  />
                  <div className="award-icon-wrapper" data-step="1"></div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-orange text-white flex items-center justify-center font-bold text-xl mr-4">
                    2
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">15 Minutes</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Take A Quick Video Skill Assessment (Optional)
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Enhance your profile with a verified skill badge. Not mandatory, but highly recommended to stand out.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Live skill demonstration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>AI-powered evaluation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Instant feedback & scoring</span>
                  </li>
                </ul>
              </div>
              <div className="lg:order-1 animate-slide-up">
                <div className="image-background flex justify-center items-center">
                  <img
                    src="/images/Step2.jpg"
                    alt="Skill assessment"
                    className="relative rounded-full shadow-card w-48 h-48 object-cover"
                  />
                  <div className="award-icon-wrapper" data-step="2"></div>
                </div>
              </div>
            </div>

            {/* Step 3: Get Results */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-orange text-white flex items-center justify-center font-bold text-xl mr-4">
                    3
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">5 Minutes</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Get Results (If completed the assessment)
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Receive a detailed report of your skill assessment, including strengths and areas for improvement.
                  Our AI tailors a career roadmap to optimize your job placement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Comprehensive skill report</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Personalized career roadmap</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Actionable feedback</span>
                  </li>
                </ul>
              </div>
              <div className="animate-slide-up">
                <div className="image-background-opposite flex justify-center items-center">
                  <img
                    src="/images/Step3.jpg"
                    alt="Get results"
                    className="relative rounded-full shadow-card w-48 h-48 object-cover"
                  />
                  <div className="award-icon-wrapper" data-step="3"></div>
                </div>
              </div>
            </div>

            {/* Step 4: Welcome to EarlyJobs Pro */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-orange text-white flex items-center justify-center font-bold text-xl mr-4">
                    4
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">10-20 Minutes</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Welcome to <span className="text-orange-500">EarlyJobs.AI</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AI evaluates your profile, verifies your details, and starts connecting you with employers right away.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Verified profile badge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Immediate job matching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>Priority employer access</span>
                  </li>
                </ul>
              </div>
              <div className="lg:order-1 animate-slide-up">
                <div className="image-background flex justify-center items-center">
                  <img
                    src="/images/Step4.jpg"
                    alt="Job matching"
                    className="relative rounded-full shadow-card w-48 h-48 object-cover"
                  />
                  <div className="award-icon-wrapper" data-step="4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-orange-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-orange-500 p-3 text-white text-xl">
              <Star className="w-4 h-4 mr-2" />
              Why Choose EarlyJobs.ai
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Accelerate Your <span className="text-gradient-orange">Career</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">30-Day Placement</h3>
                <p className="text-sm text-muted-foreground">Faster hiring, less waiting.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Verified Skills</h3>
                <p className="text-sm text-muted-foreground">Build trust with employers instantly.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Top Employers</h3>
                <p className="text-sm text-muted-foreground">Tap into exclusive, high-quality opportunities.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Smarter job connections across industries.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200 p-3 text-xl">
              <Users className="w-4 h-4 mr-2" />
              Talent Pool FAQs
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-gradient-orange">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about joining our Talent Pool and getting started with EarlyJobs.ai
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => {
              const { ref, isVisible } = useScrollAnimation();
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`transition-all duration-700 delay-${index * 150} ${isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"}`}
                >
                  <Card className="bg-white shadow-card border-orange-100">
                    <CardContent
                      className="p-6 cursor-pointer"
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                        {faqOpen === index ? (
                          <ChevronUp className="w-6 h-6 text-orange-500" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-orange-500" />
                        )}
                      </div>
                      {faqOpen === index && (
                        <p className="text-muted-foreground mt-4">{faq.answer}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who've accelerated their careers with EarlyJobs.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/assessments")}
              size="lg"
              variant="secondary"
              className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-6 animate-scale-on-hover"
            >
              <Play className="w-5 h-5 mr-2" />
              Schedule Your Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => router.push("/login")}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
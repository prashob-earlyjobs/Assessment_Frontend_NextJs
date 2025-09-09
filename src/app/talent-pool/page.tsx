"use client";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CheckCircle, Users, Clock, Star, ArrowRight, Play, Zap, Target, Award } from "lucide-react";
import Footer from "../components/pages/footer";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/pages/navbar";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1); // Remove the '#' from href
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setIsOpen(false); // Close mobile menu after clicking
    };

    // Attach event listeners to all nav links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Cleanup event listeners on component unmount
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
      <Navbar/> 
      {/* Navigation */}
      <nav className={`fixed ${isScrolled ? 'top-0' : ''}  w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50 py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div onClick={() => router.push("/")} className="flex items-center">
              <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
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
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-md rounded-xl">
                Sign Up
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-orange-500 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
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
      <section className="pt-35 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200">
                🚀 Join 10,000+ Professionals
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Get Placed <span className="text-gradient-orange">Faster</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our AI-powered platform connects you with top employers across any industry.
                Get vetted, showcased, and hired in 30 days or less!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 shadow-button text-lg text-white px-8 py-6 animate-scale-on-hover"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Schedule a Session
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 text-lg px-8 py-6"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
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
            <Badge className="mb-6 bg-orange-500 text-white">
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
                        <Zap className="w-9 h-9 text-white bg-orange-400 p-2 rounded-full " />
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
                    <Target className="w-9 h-9 text-white bg-orange-400 p-2 rounded-full " />
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
                    <Award className="w-9 h-9 text-white bg-orange-400 p-2 rounded-full " />
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
            <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200">
              <Clock className="w-4 h-4 mr-2" />
              Quick & Easy Process
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Get Started</h2>
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
                  Complete Your Profile With Video Intro
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Use our Video Burst feature to add 20-second video intros about yourself.
                  Share your basic information, preferred role, and salary expectations.
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
                  <div className="award-icon-wrapper" data-step="1">
                  </div>
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
                  Take A Quick Video Skill Assessment
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Meet with one of our AI specialists to finalize your skills assessment.
                  Demonstrate your expertise through practical scenarios.
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
                  <div className="award-icon-wrapper" data-step="2">
                  </div>
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
                  <Badge className="bg-orange-100 text-orange-700">10 Minutes</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Get Results
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
                  <div className="award-icon-wrapper" data-step="3">
                  </div>
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
                  <Badge className="bg-orange-100 text-orange-700">5 Minutes</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Welcome to <span className="text-orange-500">EarlyJobs.AI</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Chat with our EarlyJobs Pro program specialist to finalize your profile.
                  Start receiving matched job opportunities immediately.
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
                  <div className="award-icon-wrapper" data-step="4">
                  </div>
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
            <Badge className="mb-6 bg-orange-500 text-white">
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
                <p className="text-sm text-muted-foreground">Get hired faster than traditional methods</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Verified Skills</h3>
                <p className="text-sm text-muted-foreground">Stand out with validated expertise</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Top Employers</h3>
                <p className="text-sm text-muted-foreground">Access exclusive job opportunities</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Smart matching technology</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

 {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200">
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
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">What is the Talent Pool?</h3>
                <p className="text-muted-foreground">
                  The Talent Pool is our exclusive network of vetted professionals. Once you join, our AI evaluates your skills and matches you with top employers seeking your expertise.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">How long does it take to join?</h3>
                <p className="text-muted-foreground">
                  The process takes about 40 minutes total: 15 minutes for profile creation, 15 minutes for skill assessment, 10 minutes for results, and 5 minutes to finalize with EarlyJobs Pro.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Who can join the Talent Pool?</h3>
                <p className="text-muted-foreground">
                  Professionals from any industry with relevant skills and experience can join. Our AI tailors the evaluation to your specific expertise, ensuring a perfect fit.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-card border-orange-100 animate-scale-on-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">What happens after I join?</h3>
                <p className="text-muted-foreground">
                  After joining, you receive a verified profile badge and immediate access to job opportunities matched to your skills, with priority placement to top employers.
                </p>
              </CardContent>
            </Card>
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
              size="lg"
              variant="secondary"
              className="bg-orange-500 text-white hover:bg-orange-600 text-lg px-8 py-6 animate-scale-on-hover"
            >
              <Play className="w-5 h-5 mr-2" />
              Schedule Your Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              Learn More
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
"use client";
import { useState, useEffect, useRef } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { ChevronRight, GraduationCap, Brain, FileText, UsersRound, HandCoins, Briefcase, Monitor, BadgeCheck, Rocket, ChevronDown, ChevronUp, CheckCircle, Menu, X } from 'lucide-react';
import Footer from '../pages/footer';
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import Navbar from '../pages/navbar';
import { useRouter } from 'next/navigation';
import FeaturedArticles from '../pages/articles';

interface Company {
  name: string;
  logo_url: string;
  _id: string;
}

interface Testimonial {

  designation: string;
  collegeName: string;
  collegeLogo: string;
  review: string;
}

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

const HomeContent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoadingCompanies(true);
      try {
        const res = await fetch(`${backendApiUrl}/public/companies`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        // Validate and filter companies
        const fetchedCompanies: Company[] = Array.isArray(data)
          ? data
              .filter((company: any) => 
                company._id && 
                company.name && 
                typeof company.name === 'string' && 
                /^[a-zA-Z0-9\s&.,()-]{3,}$/.test(company.name) // Filter out gibberish names
              )
              .map((company: any) => ({
                _id: company._id,
                name: company.name,
                logo_url: company.logo_url && company.logo_url !== "" 
                  ? company.logo_url 
                  : 'https://cdn-app.sealsubscriptions.com/shopify/public/img/promo/no-image-placeholder.png' // Fallback logo
              }))
          : [];

        // Remove duplicates by _id
        const uniqueCompanies = Array.from(
          new Map(
            fetchedCompanies.map((company) => [company._id, company])
          ).values()
        );

        setCompanies(uniqueCompanies);
      } catch (err) {
        console.error('Failed to fetch companies:', err);
        setCompanies([]);
        toast.error('Failed to load company data. Please try again later.');
      } finally {
        setIsLoadingCompanies(false);
      }
    };

    if (backendApiUrl) {
      fetchCompanies();
    } else {
      console.error('Backend API URL is not defined');
      setCompanies([]);
      setIsLoadingCompanies(false);
      toast.error('Configuration error. Please contact support.');
    }
  }, [backendApiUrl]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    designation: '',
    collegeName: '',
    collegeWebsite: '',
    location: ''
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) {
      toast.error("Name is required and cannot be empty");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be a 10-digit number");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.designation.trim()) {
      toast.error("Designation is required and cannot be empty");
      return;
    }
    if (!formData.collegeName.trim()) {
      toast.error("College Name is required and cannot be empty");
      return;
    }
    if (formData.collegeWebsite && !formData.collegeWebsite.startsWith('http')) {
      toast.error("College Website must start with 'http' or 'https' if provided");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Location is required and cannot be empty");
      return;
    }

    emailjs.init('HodrwiEGOmoi2sAyC');

    try {
      await emailjs.send('service_9h6jj4g', 'template_qvt72y5', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        designation: formData.designation,
        collegeName: formData.collegeName,
        collegeWebsite: formData.collegeWebsite || 'Not provided',
        location: formData.location
      });
      console.log('Admin email sent successfully');
    } catch (err) {
      console.error('Failed to send admin email:', err);
    }

    try {
      await emailjs.send('service_9h6jj4g', 'template_xiiuysu', {
        name: formData.name,
        email: formData.email
      });
      toast.success("Registration successful! A confirmation email has been sent.");
      console.log('User confirmation email sent successfully');
    } catch (err) {
      console.error('Failed to send user email:', err);
    }

    setFormData({
      name: '',
      phone: '',
      email: '',
      designation: '',
      collegeName: '',
      collegeWebsite: '',
      location: ''
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuItemClick = (route: string) => {
    router.push(route);
    setIsMobileMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      
      designation: "Training and Placement Officer (TPO)",
      collegeName: "Chatrapati Sahu Ji Maharaj University",
      collegeLogo: "https://csjmu.ac.in/wp-content/uploads/2023/11/rating.png",
      review:"Appreciate your valuable workshop on CVs and interviews. Your guidance and commitment truly inspire and enhance students’ career readiness and confidence."},
     {
      
      designation: "Training and Placement Officer (TPO)",
      collegeName: "PCTE Group of Institutes, Ludhiana",
      collegeLogo: "https://pcte.edu.in/wp-content/uploads/2025/04/Logo-1-28_4.png",
      review:"Grateful to work with Jyoti Ranjan Sir from EarlyJobs. His dedication and guidance during the PCTE job fair greatly supported our HR selections." },
     {
  designation: "Faculty Coordinator ,CSE",
  collegeName: "Lamrin Tech Skills University, Punjab",
  collegeLogo: "data:image/png;base64,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",
  review: "Lamrin Tech Skills University recently hosted an online workshop with EarlyJobs on career, resume, and interview skills. The session was engaging, well-structured, and provided practical tips on communication, confidence, and resume building. The trainer was professional and kept students actively involved.",}
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className={`bg-white shadow-md border-b border-orange-100 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 py-1 lg:py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/images/logo.png" onClick={() => router.push("/")} alt="EarlyJobs.ai" className="h-12 lg:h-14 cursor-pointer" />
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <button
                onClick={() => scrollToSection('overview')}
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection('colleges')}
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                For Colleges
              </button>
              <button
                onClick={() => scrollToSection('students')}
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                Students
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                FAQS
              </button>
            </nav>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-orange-600 focus:outline-none p-3"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/browse-interviewed-candidates")}
                >
                  Browse Candidates
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/colleges")}
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
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40 py-8 lg:py-16" id="overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-12 items-start">
            <div className="lg:mt-20 w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Placements at Your College with <span className="text-orange-600">EarlyJobs.ai</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl">
                AI-powered assessments, verified recruiters, and a connected talent pool to get your students placed faster — at zero cost.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "100+", label: "Employers" },
                  { value: "10+", label: "Colleges Partnered" },
                  { value: "5000+", label: "Monthly Openings" },
                  { value: "100%", label: "Placement Assistance" }
                ].map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-8 lg:mt-0 lg:max-w-md">
              <Card className="p-6 shadow-2xl border border-orange-100 w-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">Register Your College Now (Free)</h3>
                  <p className="text-sm sm:text-base text-gray-600">Connect your college with top recruiters</p>
                </div>
                
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-sm sm:text-base rounded-lg w-full"
                    required
                  />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-sm sm:text-base rounded-lg w-full"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-sm sm:text-base rounded-lg w-full"
                    required
                  />
                  <Input
                    type="text"
                    name="designation"
                    placeholder="Your Designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-sm sm:text-base rounded-lg w-full"
                    required
                  />
                  <Input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-sm sm:text-base rounded-lg w-full"
                    required
                  />
                  <Input
                    type="url"
                    name="collegeWebsite"
                    placeholder="College Website (Optional)"
                    value={formData.collegeWebsite}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-sm sm:text-base rounded-lg w-full"
                  />
                  <Input
                    type="text"
                    name="location"
                    placeholder="College Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-sm sm:text-base rounded-lg w-full"
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-base sm:text-lg font-semibold rounded-lg transition-colors duration-200"
                    onClick={handleSubmit}
                  >
                    Register Now <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
                  Expect a call for verification within 24 hrs
                </p>
                <p className="text-xs sm:text-sm text-center mt-2">
                  <span className="text-orange-600 font-semibold">Need Help?</span> Call Us At{' '}
                  <a href="tel:+91 96113 29404" className="text-orange-600 font-semibold hover:underline">
                    +91 96113 29404
                  </a>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-20" id="colleges">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Why Colleges Choose <span className="text-orange-600">EarlyJobs.AI</span> 
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Empower your placement cell with cutting-edge tools and networks</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "AI-Based Skill & Job Assessments", description: "Benchmark every student with industry-standard assessments." },
              { icon: FileText, title: "Resume & Interview Training", description: "ATS-friendly resumes and recruiter-led workshops for students." },
              { icon: UsersRound, title: "Talent Pool Access", description: "Real-time job alerts and updates for your students." },
              { icon: HandCoins, title: "Zero-Cost Partnership", description: "No fees for colleges or students to join our platform." },
              { icon: Briefcase, title: "Recruiter Internship Program", description: "Hands-on HR/recruitment internships for students." },
              { icon: Monitor, title: "Placement Dashboard", description: "SPOC dashboard to track applications, assessments, and offers." }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-md">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20" id="students">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              <span className="text-orange-600">Benefits</span> to Students
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Empowering students with opportunities and skills for success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BadgeCheck, title: "Verified, Skill-Matched Jobs", description: "Access jobs across IT, Core, BFSI, and Startups." },
              { icon: FileText, title: "ATS-Ready Resumes", description: "Professional resumes and interview prep for success." },
              { icon: UsersRound, title: "Talent Pool Access", description: "Real-time job updates through our platform." },
              { icon: Briefcase, title: "Recruitment Internships", description: "Gain hands-on experience with certificates." },
              { icon: Rocket, title: "Faster Placements", description: "Pan-India recruiter network for quick job matches." },
              { icon: GraduationCap, title: "Career Guidance", description: "Mentorship and expert advice to shape your career path." }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-md">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              How <span className="text-orange-600">It Works</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">A seamless process to transform your college placements</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { step: "1", title: "MOU Signing", description: "Sign a zero-cost MOU with EarlyJobs.ai." },
              { step: "2", title: "Student Onboarding", description: "Students register via a portal and complete assessments." },
              { step: "3", title: "Recruiter Assignment", description: "Dedicated recruiters and dashboard setup for your college." },
              { step: "4", title: "Job Matching", description: "AI-driven job matching and hiring sprints for students." },
              { step: "5", title: "Monthly Review", description: "Detailed placement reports and progress tracking." }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
            Trusted by <span className="text-orange-600">Leading Companies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Join our growing network of industry partners</p>
        </div>
        
        {isLoadingCompanies ? (
          <div className="text-center text-gray-600">Loading companies...</div>
        ) : companies.length > 0 ? (
          <div className="relative">
            <div className="flex animate-marquee space-x-6 py-4 [animation-duration:40s]">
              {[...companies, ...companies].map((company, index) => (
                <div 
                  key={`${company._id}-${index}`}
                  className="flex-shrink-0 bg-white border border-orange-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center w-60 h-30"
                >
                  <img 
                    src={company.logo_url} 
                    alt={company.name} 
                    className="h-24 w-auto object-contain max-w-full"
                    onError={(e) => {
                      e.currentTarget.src = 'https://cdn-app.sealsubscriptions.com/shopify/public/img/promo/no-image-placeholder.png';
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        ) : (
          <div className="text-center text-gray-600">No companies available at the moment.</div>
        )}

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 120s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      <section className="bg-gray-50 py-20" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Real <span className="text-orange-600">Impact </span>. Real <span className="text-orange-600">Voices</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
             Our workshops are helping students get job-ready with real skills that matter.
Here’s what colleges and students are saying about their EarlyJobs experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-white border border-orange-100 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.collegeLogo}
                  alt={`${testimonial.collegeName} Logo`}
                  className="h-12 w-auto mb-4 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://cdn-app.sealsubscriptions.com/shopify/public/img/promo/no-image-placeholder.png';
                  }}
                />
                <p className="text-gray-600 text-sm sm:text-base mb-4">{testimonial.review}</p>
                <p className="text-gray-800 text-xl font-bold">{testimonial.collegeName}</p>
                <p className="text-gray-900 text-lg">{testimonial.designation}</p>
               
              </Card>
            ))}
            
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Why <span className="text-orange-600">EarlyJobs.ai</span> is Different
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">A unique approach to transforming placements</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "AI + Human Recruiter Hybrid", description: "Combining AI precision with human expertise." },
              { title: "Local Franchise Network", description: "District-level recruiters for pan-India reach." },
              { title: "Transparent Assessments", description: "Verified certifications for trusted profiles." },
              { title: "Community Talent Pool", description: "A connected network for job opportunities." }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-md">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedArticles />

      <section className="bg-white py-20" id="faqs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Find answers to common questions about EarlyJobs.ai</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                question: "Is there any cost for the college?",
                answer: "No, partnerships with EarlyJobs.ai are completely zero-cost for colleges and students."
              },
              {
                question: "How are students onboarded?",
                answer: "Students are onboarded through a simple registration link shared by your placement cell, followed by access to our portal and assessments."
              },
              {
                question: "What kinds of companies hire through EarlyJobs.ai?",
                answer: "We partner with over 100 verified employers across IT, BFSI, Core, Healthcare, and Startups, ensuring diverse opportunities."
              },
              {
                question: "Can we track student progress?",
                answer: "Yes, colleges get access to a SPOC dashboard with real-time reporting on student applications, assessments, and offers."
              },
              {
                question: "How soon can placements start?",
                answer: "Students can start applying to jobs within 1–2 weeks of onboarding."
              },
              {
                question: "What makes EarlyJobs.ai different from other placement or job portals?",
                answer: "Unlike job boards, we combine AI-powered assessments, ATS-friendly resumes, and a verified recruiter network. This ensures students don’t just apply for jobs — they get matched to the right jobs with higher success rates."
              },
              {
                question: "How does EarlyJobs.ai help improve our college’s placement record?",
                answer: "We provide your placement cell with a transparent dashboard showing student readiness, recruiter engagement, and placement outcomes — helping you track and improve your overall success ratio."
              },
              {
                question: "Will partnering with EarlyJobs.ai reduce the role of our placement cell?",
                answer: "Not at all. We work with your placement team, not in place of it. Your SPOC gets complete control and visibility while we provide tools, recruiters, and assessments to enhance the process."
              },
              {
                question: "How do employers benefit from hiring through EarlyJobs.ai?",
                answer: "Employers save time and cost by accessing a pre-assessed, verified talent pool. This makes them more likely to partner with colleges in our network — giving your students priority access to jobs."
              },
              {
                question: "What happens if students fail or score low in assessments?",
                answer: "Assessments are not just filters, they are growth tools. Every student receives detailed feedback and recommendations, helping them improve their skills and increase their chances of placement."
              }
            ].map((faq, index) => {
              const { ref, isVisible } = useScrollAnimation();
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`transition-all duration-700 delay-${index * 150} ${isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"}`}
                >
                  <div className="bg-gray-50 rounded-lg shadow-md border-0">
                    <button
                      className="w-full flex justify-between items-center p-4 sm:p-5 text-left text-gray-900 font-semibold text-sm sm:text-lg"
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

      <section className="bg-orange-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Ready to Empower Your Students’ Careers?
          </h2>
          <p className="text-lg sm:text-xl text-orange-100 mb-8">
            Join 150+ colleges already transforming placements with EarlyJobs.ai
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="https://calendly.com/prajwal-earlyjobs/30min" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto">
                Book a Free 15-min Call
              </Button>
            </a>
            <Button 
              className="bg-white text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
              onClick={() => scrollToSection('overview')}
            >
              Register College Now
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomeContent;
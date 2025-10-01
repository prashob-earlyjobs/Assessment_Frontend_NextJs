"use client";
import { useState, useEffect, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { ChevronRight,GraduationCap, Brain, FileText, UsersRound, HandCoins, Briefcase, Monitor, BadgeCheck, Rocket, ChevronDown, ChevronUp, CheckCircle, Menu, X, LogOut, LogIn } from 'lucide-react';
import Footer from '../components/pages/footer';
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import Navbar from '../components/pages/navbar';
import { useRouter } from 'next/navigation';
import { useUser } from "../context";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { userLogout } from "../components/services/servicesapis";
import FeaturedArticles from '../components/pages/articles';

interface Company {
  name: string;
  logo_url: string;
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

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { userCredentials, setUserCredentials } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const [companies, setCompanies] = useState<Company[]>([]);

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_QA;

  useEffect(() => {
    fetch(`${backendApiUrl}/companies/companies`)
      .then(res => res.json())
      .then(data => {
        const fetchedCompanies: Company[] = data.companies.map((company: any) => ({
          name: company.name,
          logo_url: company.logo_url
        }));
        setCompanies(fetchedCompanies);
      })
      .catch(err => {
        console.error('Failed to fetch companies:', err);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation rules
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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
                  onClick={() => handleMobileMenuItemClick("/browse-candidates")}
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
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="w-full text-left justify-start bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      router.push("/login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40 py-8 lg:py-16" id="overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className='lg:mt-20'>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Placements at Your College with <span className="text-orange-600">EarlyJobs.ai</span>
              </h1>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl">
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
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-8 lg:ml-15">
              <Card className="p-6 shadow-2xl border border-orange-100 w-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Register Your College Now (Free)</h3>
                  <p className="text-base text-gray-600">Connect your college with top recruiters</p>
                </div>
                
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-base rounded-lg"
                    required
                  />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-base rounded-lg"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-base rounded-lg"
                    required
                  />
                  <Input
                    type="text"
                    name="designation"
                    placeholder="Your Designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-base rounded-lg"
                    required
                  />
                  <Input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-base rounded-lg"
                    required
                  />
                  <Input
                    type="url"
                    name="collegeWebsite"
                    placeholder="College Website (Optional)"
                    value={formData.collegeWebsite}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-base rounded-lg"
                  />
                  <Input
                    type="text"
                    name="location"
                    placeholder="College Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 h-11 text-base rounded-lg"
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold rounded-lg transition-colors duration-200"
                    onClick={handleSubmit}
                  >
                    Register Now <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  Expect a call for verification within 24 hrs
                </p>
                <p className="text-sm text-center mt-2">
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
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why Colleges Choose <span className="text-orange-600">EarlyJobs.AI</span> 
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Empower your placement cell with cutting-edge tools and networks</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="bg-white py-20" id="students">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        <span className="text-orange-600">Benefits</span> to Students
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Empowering students with opportunities and skills for success
      </p>
    </div>

    {/* Single responsive grid */}
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              How <span className="text-orange-600">It Works</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A seamless process to transform your college placements</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Trusted by <span className="text-orange-600">Leading Companies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Join our growing network of industry partners</p>
        </div>
        
        <div className="relative">
          <div className="flex animate-marquee space-x-6 py-4 [animation-duration:40s]">
            {[...companies, ...companies].map((company, index) => (
              <div 
                key={`${company.name}-${index}`}
                className="flex-shrink-0 bg-white border border-orange-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center w-60 h-30"
              >
                <img 
                  src={company.logo_url} 
                  alt={company.name} 
                  className="h-24 w-auto object-contain max-w-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/150x60?text=${company.name}`;
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

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

      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why <span className="text-orange-600">EarlyJobs.ai</span> is Different
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A unique approach to transforming placements</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedArticles/>

      <section className="bg-white py-20" id="faqs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about EarlyJobs.ai</p>
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

      <section className="bg-orange-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Ready to Empower Your Students’ Careers?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join 150+ colleges already transforming placements with EarlyJobs.ai
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://calendly.com/prajwal-earlyjobs/30min" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Book a Free 15-min Call
              </Button>
            </a>
            <Button 
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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

export default Index;
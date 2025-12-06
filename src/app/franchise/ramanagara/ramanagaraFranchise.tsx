"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  MapPin,
  Star,
  Building2,
  Users,
  Award,
  UserPlus,
  Search,
  Briefcase,
  Calendar,
  Clock,
  ChevronRight,
  GraduationCap,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  X,
} from "lucide-react"
import Header from "@/app/components/pages/header"
import Footer from "@/app/components/pages/footer"
import Navbar from "@/app/components/pages/navbar"

const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 border border-orange-200 ${className}`} {...props}>
    {children}
  </div>
)

const Button = ({ className = "", children, ...props }) => (
  <button
    className={`px-6 py-3 rounded-md font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full p-3 border border-orange-300 rounded-md bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all ${className}`}
    {...props}
  />
)

const Label = ({ className = "", children, ...props }) => (
  <label className={`block text-sm font-medium text-orange-900 mb-2 ${className}`} {...props}>
    {children}
  </label>
)

const Popup = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card
        className={`relative max-w-md w-full mx-4 ${type === "success" ? "border-2 border-green-500" : "border-2 border-red-500"}`}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-orange-700 bg-none border-none p-1">
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center p-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${type === "success" ? "bg-orange-100" : "bg-red-100"}`}
          >
            {type === "success" ? (
              <CheckCircle className="w-8 h-8 text-orange-600" />
            ) : (
              <X className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h3
            className={`text-xl font-bold mb-2 ${type === "success" ? "text-orange-700" : "text-red-700"}`}
          >
            {type === "success" ? "Registration Successful!" : "Registration Failed"}
          </h3>
          <p className={`text-center ${type === "success" ? "text-orange-800" : "text-red-800"}`}>
            {message}
          </p>
        </div>
      </Card>
    </div>
  )
}

const RamanagaraFranchise = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    skills: "",
    industry: "",
    city: "Ramanagara",
    resume: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPopup, setShowPopup] = useState(null)
  const [openIndex, setOpenIndex] = useState(0)

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const payload = [
    {
      franchiseId: "ramanagara",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      experience: formData.experience,
      skills: formData.skills,
      industry: formData.industry,
      city: formData.city,
      resume: formData.resume ? "Yes" : "No",
    },
  ];
  console.log('Sending payload:', payload); 

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/franchiseForm/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok && result.created === 1) {
      setSubmitted(true);
      setShowPopup({
        type: "success",
        message:
          "Welcome to the EarlyJobs Ramanagara network! Our team will contact you within 24 hours to discuss your career goals and upcoming opportunities.",
      });
    } else {
      setError(result.error || "Failed to submit form. Please try again.");
      setShowPopup({
        type: "error",
        message: result.error || "Failed to submit form. Please try again.",
      });
    }
  } catch (err) {
    console.error('Frontend error:', err);
    setError("An error occurred. Please try again later.");
    setShowPopup({
      type: "error",
      message: "An error occurred. Please try again later.",
    });
  } finally {
    setLoading(false);
  }
};
  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const closePopup = () => {
    setShowPopup(null)
    if (!error) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        experience: "",
        skills: "",
        industry: "",
        city: "Ramanagara",
        resume: null,
      })
    }
  }

  const steps = [
    {
      icon: UserPlus,
      title: "Register on EarlyJobs Ramanagara Portal",
      description:
        "Create your profile in minutes. Upload your resume, add your skills, and tell us about your career aspirations. Our platform is designed specifically for Ramanagara's dynamic job market and local opportunities.",
      color: "bg-orange-600",
    },
    {
      icon: Search,
      title: "Get Matched with Local Opportunities",
      description:
        "Our smart algorithm connects you with relevant jobs, internships, and skill-building programs in Ramanagara. From IT companies to textile firms, engineering sectors to educational institutions.",
      color: "bg-orange-500",
    },
    {
      icon: Briefcase,
      title: "Attend Interviews & Get Placed",
      description:
        "Participate in our regular interview drives, walk-in sessions, and campus recruitment programs. We provide interview preparation, skill assessment, and continued support until you land your dream job.",
      color: "bg-orange-600",
    },
  ]

  const upcomingEvents = [
    {
      title: "Tech Job Expo 2024 - Ramanagara",
      date: "December 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Ramanagara Trade Center, Main Road",
      companies: "25+ Companies",
      positions: "200+ Open Positions",
      description:
        "Join the largest tech and engineering job expo in Ramanagara featuring top companies from IT, Manufacturing, Textiles, and Education sectors.",
      category: "Job Expo",
      featured: true,
    },
    {
      title: "Campus Placement Drive - Engineering Colleges",
      date: "December 28, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Various College Campuses",
      companies: "15+ Companies",
      positions: "80+ Positions",
      description:
        "Exclusive placement drive for engineering students across Ramanagara colleges with focus on entry-level roles and skill enhancement.",
      category: "Campus Drive",
    },
  ]

  const studentBenefits = [
    "Verified local jobs & internship opportunities in Ramanagara",
    "Skill-building workshops & certification programs",
    "Regular walk-in interview drives in the city",
    "Career guidance & resume building support",
    "Direct connection with hiring managers",
    "Industry-specific training programs",
  ]

  const collegeBenefits = [
    "Enhanced placement statistics & outcomes",
    "Industry partnerships & guest lecture programs",
    "Customized recruitment drives for your students",
    "Faculty development & industry connect programs",
    "Alumni network building & engagement",
    "Campus-to-corporate transition support",
  ]

  const companyBenefits = [
    "Access to pre-vetted local talent pool in Ramanagara",
    "Quick hiring process & reduced recruitment time",
    "Cost-effective recruitment solutions",
    "Campus recruitment support & coordination",
    "Skill assessment & candidate screening",
    "Local market insights & hiring trends",
  ]

  const faqs = [
    {
      question: "What services does EarlyJobs Ramanagara offer?",
      answer:
        "We provide comprehensive recruitment solutions including job placements, internships, skill development programs, campus recruitment drives, and career counseling specifically for the Ramanagara region. Our services connect local talent with opportunities across IT, manufacturing, textiles, education, and emerging sectors in Ramanagara.",
    },
    {
      question: "Is there any registration fee to join EarlyJobs Ramanagara?",
      answer:
        "No, registration is completely free for job seekers and students. We believe in accessible career opportunities for everyone in Ramanagara. Our revenue comes from our employer partners, not from candidates.",
    },
    {
      question: "Which companies hire through EarlyJobs in Ramanagara?",
      answer:
        "We partner with 40+ companies ranging from IT firms, textile manufacturers, engineering companies, educational institutions, and startup ecosystems. Our partners include both multinational corporates and innovative local businesses in Ramanagara.",
    },
    {
      question: "Do you provide training and skill development programs?",
      answer:
        "Yes! We conduct regular workshops on technical skills, soft skills, interview preparation, resume building, and industry-specific certification programs. All training is designed considering the local job market requirements in Ramanagara.",
    },
    {
      question: "How often do you conduct walk-in interviews in Ramanagara?",
      answer:
        "We organize walk-in interview drives at least three times a month at various locations across Ramanagara including trade centers and other convenient venues. We also conduct special campus drives at local colleges and institutions.",
    },
    {
      question: "Can final year students register for placements?",
      answer:
        "We encourage final year students to register early. This gives us time to understand your career goals, provide relevant training, and connect you with suitable opportunities before graduation. Early registration often leads to pre-placement offers.",
    },
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case "Job Expo":
        return "bg-orange-600 text-white"
      case "Campus Drive":
        return "bg-orange-500 text-white"
      case "Workshop":
        return "bg-orange-300 text-orange-900"
      case "Walk-in":
        return "bg-orange-200 text-orange-900"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <>
    <Navbar />
      <Header />
   
    <div className="min-h-screen bg-white text-orange-900">
      {showPopup && <Popup message={showPopup.message} type={showPopup.type} onClose={closePopup} />}

      <section className="relative min-h-screen overflow-hidden py-16">
        <div className="absolute inset-0">
          <img
            src="/images/Ramanagara.webp"
            alt="Ramanagara skyline with professionals and students"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-orange-800/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="text-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="w-4 h-4" />
                Ramanagara, Karnataka
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Unleashing Ramanagara's Potential:
                  <span className="block text-orange-200"> Your Career Starts Here</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium opacity-90">
                  Your Professional Journey Begins Here in Ramanagara
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg md:text-xl">
                  Connecting Ramanagara's innovative talent with leading employers in IT, Manufacturing, Textiles &
                  Education sectors. Develop skills, discover opportunities, and advance your career with EarlyJobs Ramanagara.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-orange-700 hover:bg-orange-800 rounded-md shadow-md"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                {/* <Button className="hover:bg-orange-100 text-orange-900 border border-orange-500 flex justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Today
                </Button> */}
              </div>

              <div className="flex flex-wrap gap-6 pt-4 justify-center text-white">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm">1700+ Successful Placements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm">100+ Partner Companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm">10+ Local Colleges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
              About EarlyJobs Ramanagara
            </h2>
            <p className="text-lg text-orange-800 leading-relaxed mb-8">
              EarlyJobs is India's leading tech-enabled recruitment franchise, and our Ramanagara chapter is dedicated to
              bridging the gap between local talent and exceptional career opportunities. We understand Ramanagara's unique
              ecosystem—from the thriving IT sector to established textile industries, from renowned engineering
              institutions to innovative manufacturing hubs.
            </p>
            <p className="text-lg text-orange-800 leading-relaxed">
              Our mission is simple: <strong className="text-orange-600">Connect. Innovate. Succeed.</strong>{" "}
              We're not just a job portal; we're your career partners, helping students and professionals in Ramanagara
              discover their potential and build meaningful careers right here in our innovative city.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16 px-4">
            <Card className="hover:bg-orange-100 transition-all">
              <Building2 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-700 mb-2">100+</div>
              <p className="text-orange-800">Partner Companies</p>
            </Card>

            <Card className="hover:bg-orange-100 transition-all">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-700 mb-2">1700+</div>
              <p className="text-orange-800">Successful Placements</p>
            </Card>

            <Card className="hover:bg-orange-100 transition-all">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-700 mb-2">10+</div>
              <p className="text-orange-800">College Partnerships</p>
            </Card>

            <Card className="hover:bg-orange-100 transition-all">
              <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-700 mb-2">100%</div>
              <p className="text-orange-800">Local Focus</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
              Benefits for Everyone in the Ramanagara Ecosystem
            </h2>
            <p className="text-lg text-orange-800 max-w-3xl mx-auto">
              Whether you're a student seeking opportunities, a college looking to improve placements, or a company
              searching for talent, EarlyJobs Ramanagara has solutions tailored for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-orange-500 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-2">For Students</h3>
                <p className="text-orange-800">Kickstart your career journey in Ramanagara</p>
              </div>

              <ul className="space-y-3">
                {studentBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-900">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-t-4 border-orange-400 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-2">For Colleges</h3>
                <p className="text-orange-800">Boost your placement success rates</p>
              </div>

              <ul className="space-y-3">
                {collegeBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-900">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-t-4 border-orange-500 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-2">For Companies</h3>
                <p className="text-orange-800">Find the right talent quickly</p>
              </div>

              <ul className="space-y-3">
                {companyBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-900">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="bg-orange-100 rounded-xl p-8 md:p-12 shadow-md">
              <h3 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4">
                Ready to Transform Your Career Journey?
              </h3>
              <p className="text-lg text-orange-800 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful professionals who started their journey with EarlyJobs Ramanagara. Your dream
                career is just a registration away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-orange-700 hover:bg-orange-800"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">Schedule a Callback</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
              How EarlyJobs Ramanagara Works
            </h2>
            <p className="text-lg text-orange-800 max-w-3xl mx-auto">
              Getting started with your career journey in Ramanagara is simple. Follow these three easy steps to unlock
              opportunities in your city.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="hover:bg-orange-100 transition-all">
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>

                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-6`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-orange-700 mb-4">{step.title}</h3>
                    <p className="text-orange-800 leading-relaxed">{step.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {submitted && !showPopup ? (
              <Card className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-orange-700 mb-4">
                  Registration Successful!
                </h2>
                <p className="text-lg text-orange-800 mb-6">
                  Welcome to the EarlyJobs Ramanagara network! Our team will contact you within 24 hours to discuss your
                  career goals and upcoming opportunities.
                </p>
                <div className="bg-orange-50 p-6 rounded-md">
                  <h3 className="text-xl font-semibold text-orange-700 mb-3">
                    What's Next?
                  </h3>
                  <ul className="text-left space-y-2 text-orange-800">
                    <li>✓ Profile verification & skills assessment</li>
                    <li>✓ Job matching based on your preferences</li>
                    <li>✓ Interview preparation support</li>
                    <li>✓ Regular updates on opportunities in Ramanagara</li>
                  </ul>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-orange-700 mb-4">
                    Join EarlyJobs Ramanagara Network
                  </h2>
                  <p className="text-lg text-orange-800">
                    Start your career journey with Ramanagara's most trusted recruitment partner
                  </p>
                </div>

                {error && !showPopup && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role">I am a... *</Label>
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-orange-300 rounded-md bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2"
                      >
                        <option value="">Select your role</option>
                        <option value="student">Current Student</option>
                        <option value="graduate">Recent Graduate</option>
                        <option value="jobseeker">Job Seeker</option>
                        <option value="employer">Employer/HR</option>
                        <option value="college">College Representative</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-orange-300 rounded-md bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2"
                      >
                        <option value="">Select experience</option>
                        <option value="fresher">Fresher (0 years)</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        readOnly
                        className="mt-2 bg-orange-50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">Preferred Industry</Label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-orange-300 rounded-md bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2"
                    >
                      <option value="">Select preferred industry</option>
                      <option value="it">Information Technology</option>
                      <option value="manufacturing">Manufacturing & Engineering</option>
                      <option value="textiles">Textiles & Apparel</option>
                      <option value="education">Education & Training</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="automotive">Automotive</option>
                      <option value="startup">Startups & Innovation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="skills">Key Skills (Optional)</Label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-orange-300 rounded-md bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2 resize-none"
                      placeholder="List your key skills, technologies, or areas of expertise..."
                    />
                  </div>

                  <div className="border-2 border-dashed border-orange-200 rounded-md p-6 text-center text-orange-700">
                    <div className="mb-2">
                      <svg
                        className="w-8 h-8 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload Resume (Optional)
                    </div>
                    <p className="text-sm text-orange-600 mb-2">
                      PDF, DOC, DOCX up to 5MB {formData.resume ? `- ${formData.resume.name}` : ""}
                    </p>
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      onChange={handleInputChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      className="mt-2 text-orange-600 border border-orange-500 hover:bg-orange-100"
                      onClick={() => document.getElementById("resume")?.click()}
                    >
                      Choose File
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg ${loading ? "opacity-70 pointer-events-none" : ""}`}
                  >
                    {loading ? "Registering..." : "Join EarlyJobs Ramanagara Network"}
                  </Button>

                  <p className="text-sm text-orange-700 text-center">
                    By registering, you agree to our Terms of Service and Privacy Policy. We're committed to protecting
                    your privacy and helping you find the right opportunities.
                  </p>
                </form>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-orange-800">
                Got questions? We've got answers. Here are the most common questions about EarlyJobs Ramanagara.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:bg-orange-50 transition-all">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left flex items-center justify-between bg-none border-none"
                  >
                    <h3 className="text-lg font-semibold text-orange-700 pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="mt-4 pt-4 border-t border-orange-200">
                      <p className="text-orange-800 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="mt-16 bg-orange-100 rounded-xl p-8 text-center shadow-md">
              <h3 className="text-2xl font-bold text-orange-700 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-lg text-orange-800 mb-6">
                Our team is here to help you succeed. Reach out to us anytime!
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 text-orange-600 mb-2" />
                  <p className="font-semibold text-orange-700">Call Us</p>
                  <p className="text-orange-800">+91 9663415577</p>
                </div>

                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 text-orange-600 mb-2" />
                  <p className="font-semibold text-orange-700">Email Us</p>
                  <p className="text-orange-800">ramanagara@earlyjobs.ai</p>
                </div>

                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-orange-600 mb-2" />
                  <p className="font-semibold text-orange-700">Visit Us</p>
                  <p className="text-orange-800">
                   Second floor, Near Police station, BM Road, and near Arkavathi bridge, Ijoor, Ramanagara, Karnataka 562159
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default RamanagaraFranchise;
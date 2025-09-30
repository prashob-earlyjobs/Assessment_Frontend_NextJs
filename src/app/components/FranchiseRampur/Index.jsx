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

const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 border border-orange-200 ${className}`} {...props}>
    {children}
  </div>
)

const Button = ({ className = "", children, ...props }) => (
  <button
    className={`px-6 py-3 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full p-3 border border-orange-300 rounded-lg bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all ${className}`}
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

const Rampur = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    skills: "",
    industry: "",
    city: "Rampur",
    resume: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPopup, setShowPopup] = useState(null)
  const [openIndex, setOpenIndex] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://sheetdb.io/api/v1/r54as5htdq8qk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            Timestamp: new Date().toISOString(),
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Role: formData.role,
            Experience: formData.experience,
            Skills: formData.skills,
            Industry: formData.industry,
            City: formData.city,
            Resume: formData.resume ? "Yes" : "No",
          },
        ]),
      })

      const result = await response.json()
      if (response.ok && result.created === 1) {
        setSubmitted(true)
        setShowPopup({
          type: "success",
          message:
            "Welcome to the EarlyJobs Rampur network! Our team will contact you within 24 hours to discuss your career goals and upcoming opportunities.",
        })
      } else {
        setError("Failed to submit form. Please try again.")
        setShowPopup({
          type: "error",
          message: "Failed to submit form. Please try again.",
        })
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
      setShowPopup({
        type: "error",
        message: "An error occurred. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

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
        city: "Rampur",
        resume: null,
      })
    }
  }

  const steps = [
    {
      icon: UserPlus,
      title: "Register on EarlyJobs Rampur Portal",
      description:
        "Create your profile in minutes. Upload your resume, add your skills, and tell us about your career aspirations. Our platform is designed specifically for Rampur's job market and local opportunities.",
      color: "bg-orange-500",
    },
    {
      icon: Search,
      title: "Get Matched with Local Opportunities",
      description:
        "Our smart algorithm connects you with relevant jobs, internships, and skill-building programs in Rampur. From manufacturing companies to retail chains, banking sector to educational institutions.",
      color: "bg-orange-400",
    },
    {
      icon: Briefcase,
      title: "Attend Interviews & Get Placed",
      description:
        "Participate in our regular interview drives, walk-in sessions, and campus recruitment programs. We provide interview preparation, skill assessment, and continued support until you land your dream job.",
      color: "bg-orange-500",
    },
  ]

  const upcomingEvents = [
    {
      title: "Mega Job Fair 2024 - Rampur",
      date: "December 20, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Shyam Hari Complex, Jwala Nagar",
      companies: "20+ Companies",
      positions: "150+ Open Positions",
      description:
        "Join us for the biggest job fair in Rampur featuring top companies from Manufacturing, Banking, Retail, and Education sectors.",
      category: "Job Fair",
      featured: true,
    },
    {
      title: "Campus Recruitment Drive - Local Colleges",
      date: "December 25, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Various College Campuses",
      companies: "10+ Companies",
      positions: "60+ Positions",
      description:
        "Exclusive recruitment drive for students across Rampur colleges with focus on fresher-friendly roles and skill development.",
      category: "Campus Drive",
    },
  ]

  const studentBenefits = [
    "Verified local jobs & internship opportunities in Rampur",
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
    "Access to pre-vetted local talent pool in Rampur",
    "Quick hiring process & reduced recruitment time",
    "Cost-effective recruitment solutions",
    "Campus recruitment support & coordination",
    "Skill assessment & candidate screening",
    "Local market insights & hiring trends",
  ]

  const faqs = [
    {
      question: "What services does EarlyJobs Rampur offer?",
      answer:
        "We provide comprehensive recruitment solutions including job placements, internships, skill development programs, campus recruitment drives, and career counseling specifically for the Rampur region. Our services connect local talent with opportunities across manufacturing, banking, retail, education, and emerging sectors in Rampur.",
    },
    {
      question: "Is there any registration fee to join EarlyJobs Rampur?",
      answer:
        "No, registration is completely free for job seekers and students. We believe in accessible career opportunities for everyone in Rampur. Our revenue comes from our employer partners, not from candidates.",
    },
    {
      question: "Which companies hire through EarlyJobs in Rampur?",
      answer:
        "We partner with 100+ companies ranging from manufacturing units, banks, retail chains, educational institutions, and government organizations. Our partners include both established corporates and growing businesses in the Rampur ecosystem.",
    },
    {
      question: "Do you provide training and skill development programs?",
      answer:
        "Yes! We conduct regular workshops on communication skills, technical training, interview preparation, resume building, and industry-specific certification programs. All training is designed considering the local job market requirements in Rampur.",
    },
    {
      question: "How often do you conduct walk-in interviews in Rampur?",
      answer:
        "We organize walk-in interview drives at least twice a month at various locations across Rampur including Shyam Hari Complex and other convenient venues. We also conduct special campus drives at local colleges and institutions.",
    },
    {
      question: "Can final year students register for placements?",
      answer:
        "We encourage final year students to register early. This gives us time to understand your career goals, provide relevant training, and connect you with suitable opportunities before graduation. Early registration often leads to pre-placement offers.",
    },
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case "Job Fair":
        return "bg-orange-500 text-white"
      case "Campus Drive":
        return "bg-orange-400 text-white"
      case "Workshop":
        return "bg-orange-300 text-orange-900"
      case "Walk-in":
        return "bg-orange-200 text-orange-900"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-white text-orange-900">
      {showPopup && <Popup message={showPopup.message} type={showPopup.type} onClose={closePopup} />}

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/Networking.jpg"
            alt="Rampur skyline with students and professionals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-800/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="text-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="w-4 h-4" />
                Rampur, Uttar Pradesh
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Empowering Rampur's
                  <span className="block text-orange-200">Youth & Career Growth</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium opacity-90">
                  Your Career Journey Starts Here, Right in Rampur
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg md:text-xl">
                  Connecting Rampur's brightest talent with top employers across Manufacturing, Banking, Retail &
                  Education sectors. Build skills, find opportunities, and grow your career with EarlyJobs Rampur.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-orange-600 hover:bg-orange-700 rounded-lg shadow-lg"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                <Button className="hover:bg-orange-100 text-orange-900 border border-orange-500 flex justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Today
                </Button>
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
              About EarlyJobs Rampur
            </h2>
            <p className="text-lg text-orange-800 leading-relaxed mb-8">
              EarlyJobs is India's leading tech-enabled recruitment franchise, and our Rampur chapter is dedicated to
              bridging the gap between local talent and exceptional career opportunities. We understand Rampur's unique
              ecosystem—from the growing manufacturing sector to established banking institutions, from prestigious
              educational institutions to emerging retail ventures.
            </p>
            <p className="text-lg text-orange-800 leading-relaxed">
              Our mission is simple: <strong className="text-orange-600">Connect. Develop. Succeed.</strong>{" "}
              We're not just a job portal; we're your career partners, helping students and professionals in Rampur
              discover their potential and build meaningful careers right here in our vibrant city.
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
              Benefits for Everyone in the Rampur Ecosystem
            </h2>
            <p className="text-lg text-orange-800 max-w-3xl mx-auto">
              Whether you're a student seeking opportunities, a college looking to improve placements, or a company
              searching for talent, EarlyJobs Rampur has solutions tailored for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-l-4 border-orange-500 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-2">For Students</h3>
                <p className="text-orange-800">Kickstart your career journey in Rampur</p>
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

            <Card className="border-l-4 border-orange-400 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
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

            <Card className="border-l-4 border-orange-500 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
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
            <div className="bg-orange-100 rounded-2xl p-8 md:p-12 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4">
                Ready to Transform Your Career Journey?
              </h3>
              <p className="text-lg text-orange-800 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful professionals who started their journey with EarlyJobs Rampur. Your dream
                career is just a registration away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Schedule a Callback</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
              How EarlyJobs Rampur Works
            </h2>
            <p className="text-lg text-orange-800 max-w-3xl mx-auto">
              Getting started with your career journey in Rampur is simple. Follow these three easy steps to unlock
              opportunities in your city.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="hover:bg-orange-100 transition-all">
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>

                    <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mb-6`}>
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
                  Welcome to the EarlyJobs Rampur network! Our team will contact you within 24 hours to discuss your
                  career goals and upcoming opportunities.
                </p>
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-orange-700 mb-3">
                    What's Next?
                  </h3>
                  <ul className="text-left space-y-2 text-orange-800">
                    <li>✓ Profile verification & skills assessment</li>
                    <li>✓ Job matching based on your preferences</li>
                    <li>✓ Interview preparation support</li>
                    <li>✓ Regular updates on opportunities in Rampur</li>
                  </ul>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-orange-700 mb-4">
                    Join EarlyJobs Rampur Network
                  </h2>
                  <p className="text-lg text-orange-800">
                    Start your career journey with Rampur's most trusted recruitment partner
                  </p>
                </div>

                {error && !showPopup && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
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
                        className="w-full p-3 border border-orange-300 rounded-lg bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2"
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
                        className="w-full p-3 border border-orange-300 rounded-lg bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2"
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
                      className="w-full p-3 border border-orange-300 rounded-lg bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2"
                    >
                      <option value="">Select preferred industry</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="banking">Banking & Finance</option>
                      <option value="retail">Retail & Consumer Goods</option>
                      <option value="education">Education & Training</option>
                      <option value="it">Information Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="government">Government & Public Sector</option>
                      <option value="agriculture">Agriculture & Allied</option>
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
                      className="w-full p-3 border border-orange-300 rounded-lg bg-white text-orange-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all mt-2 resize-none"
                      placeholder="List your key skills, technologies, or areas of expertise..."
                    />
                  </div>

                  <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center text-orange-700">
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
                    className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg ${loading ? "opacity-70 pointer-events-none" : ""}`}
                  >
                    {loading ? "Registering..." : "Join EarlyJobs Rampur Network"}
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
              Upcoming Events in Rampur
            </h2>
            <p className="text-lg text-orange-800 max-w-3xl mx-auto">
              Stay updated with the latest job fairs, campus recruitment drives, workshops, and walk-in interview
              opportunities happening in Rampur. Mark your calendar!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all ${event.featured ? "border-2 border-orange-500" : ""}`}
              >
                {event.featured && (
                  <div className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Featured Event
                  </div>
                )}

                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${getCategoryColor(event.category)}`}>
                  {event.category}
                </div>

                <h3 className="text-xl font-bold text-orange-700 mb-3">{event.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-orange-700">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">{event.companies}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-orange-700">
                    <ChevronRight className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{event.positions}</span>
                  </div>
                </div>

                <p className="text-orange-800 text-sm leading-relaxed mb-6">
                  {event.description}
                </p>

                <Button
                  className={`w-full ${event.featured ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-500 hover:bg-orange-600"} text-white`}
                >
                  {event.category === "Workshop" ? "Register for Workshop" : "Register for Event"}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-orange-100 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4">
                Never Miss an Opportunity
              </h3>
              <p className="text-lg text-orange-800 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to get notified about upcoming events, job opportunities, and career
                development programs in Rampur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button className="bg-orange-600 hover:bg-orange-700">Subscribe</Button>
              </div>
              <p className="text-sm text-orange-700 mt-4">
                Join 500+ professionals already subscribed to our updates
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-orange-800">
                Got questions? We've got answers. Here are the most common questions about EarlyJobs Rampur.
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

            <div className="mt-16 bg-orange-100 rounded-2xl p-8 text-center shadow-lg">
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
                  <p className="text-orange-800">+91 8439423438</p>
                </div>

                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 text-orange-600 mb-2" />
                  <p className="font-semibold text-orange-700">Email Us</p>
                  <p className="text-orange-800">rampur@earlyjobs.in</p>
                </div>

                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-orange-600 mb-2" />
                  <p className="font-semibold text-orange-700">Visit Us</p>
                  <p className="text-orange-800">
                    Shyam Hari Complex, Near UP Gramin Bank, Jwala Nagar, Rampur, Uttar Pradesh, 244901
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Rampur
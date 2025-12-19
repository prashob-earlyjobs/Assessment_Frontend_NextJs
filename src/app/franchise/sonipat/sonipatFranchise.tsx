"use client"
import Header from "../../components/pages/header"
import Footer from "../../components/pages/footer"
import Navbar from "../../components/pages/navbar"
import { useState } from "react"
import {
  MapPin,
  Users,
  Building2,
  GraduationCap,
  CheckCircle,
  Phone,
  Calendar,
  ArrowRight,
  Target,
  ChevronDown,
  Mail,
  Briefcase,
  TrendingUp,
  Shield,
  Clock,
  Award,
  Star,
  Quote,
} from "lucide-react"

const SonipatFranchise = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "student",
  })

  const [expandedFaq, setExpandedFaq] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format phone number
      const cleanPhone = formData.phone.replace(/\D/g, "")
      const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : formData.phone

      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.earlyjobs.ai"
      const response = await fetch(`${apiUrl}/api/enquiry/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: formattedPhone,
          email: formData.email,
          expectations: [`I am a ${formData.type}`, "Interested in EarlyJobs Sonipat"],
          remarks: `User type: ${formData.type}, Location: SCO 31, First Floor, Connaught Street
sector 16, outside Rangoli Greens
Sonipat- 131001 (Haryana)`,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("Success:", data)
      setModalMessage("Successfully registered! Our team will contact you soon.")
      setIsSuccess(true)
      setShowModal(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "student",
      })
    } catch (error) {
      console.error("Error:", error)
      setModalMessage("Error registering. Please try again or contact us directly.")
      setIsSuccess(false)
      setShowModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScrollToContact = () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
  }

  const benefits = [
    {
      icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
      title: "For Students & Job Seekers",
      description: "Your gateway to verified opportunities and career growth",
      points: [
        "Verified jobs & internships",
        "Walk-in interview support",
        "AI-based skill assessments",
        "Resume & interview guidance",
        "Access to national employers from Sonipat",
      ],
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      title: "For Colleges",
      description: "Comprehensive placement coordination and student readiness programs",
      points: [
        "Placement coordination & MoU partnerships",
        "Internship & job drive support",
        "Student readiness programs",
        "Reporting & placement tracking",
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "For Employers",
      description: "Access to pre-screened, job-ready talent from Sonipat and NCR",
      points: [
        "Local hiring support in Sonipat & NCR belt",
        "Pre-screened, job-ready candidates",
        "Faster closures with recruiter assistance",
        "Centralized CRM & hiring dashboard",
      ],
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Register with EarlyJobs Sonipat",
      description: "Sign up with your details and tell us what you're looking for",
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Our AI matches you with relevant jobs, candidates, or partners",
    },
    {
      number: "03",
      title: "Attend Interviews, Hire, or Get Placed",
      description: "Take the next step in your career journey or hiring process",
    },
  ]

  const testimonials = [
    {
      quote: "EarlyJobs Sonipat helped me land my first job right after graduation. The team was supportive throughout, from resume building to interview preparation. I'm now working with a leading company in Gurgaon!",
      name: "Rahul Kumar",
      role: "Software Developer",
      college: "Deenbandhu Chhotu Ram University of Science & Technology",
      rating: 5,
    },
    {
      quote: "As a placement officer, partnering with EarlyJobs has been a game-changer. They've organized multiple successful placement drives and our students have received excellent opportunities across India.",
      name: "Priya Sharma",
      role: "Placement Officer",
      college: "Sonipat College of Engineering",
      rating: 5,
    },
    {
      quote: "We've been hiring from Sonipat through EarlyJobs for the past year. The candidates are well-screened and job-ready. It's saved us significant time in our recruitment process.",
      name: "Amit Verma",
      role: "HR Manager",
      college: "Tech Solutions Pvt. Ltd.",
      rating: 5,
    },
  ]

  const events = [
    {
      date: "Coming Soon",
      title: "Sonipat Job Fair 2024",
      location: "Sonipat City",
      companies: "30+ Companies",
    },
    {
      date: "Monthly",
      title: "Walk-in Interview Drive",
      location: "EarlyJobs Sonipat Office",
      companies: "Multiple Positions",
    },
  ]

  const faqs = [
    {
      question: "Where is the EarlyJobs Sonipat office located?",
      answer:
        "Our Sonipat franchise office is located in the heart of the city, easily accessible to students and employers. Please contact us for the exact address and directions. We also offer virtual support for those who prefer remote assistance.",
    },
    {
      question: "Who can register with EarlyJobs Sonipat?",
      answer:
        "We welcome students (freshers and experienced), colleges looking for placement support, and employers seeking to hire talent. Whether you're a recent graduate, a college placement officer, or an HR manager, EarlyJobs Sonipat is here to help.",
    },
    {
      question: "Are jobs limited to Sonipat or pan-India?",
      answer:
        "While we focus on connecting Sonipat talent with opportunities, our network spans across India. Students from Sonipat can access jobs in Delhi NCR, Gurgaon, Noida, and other major cities. We also help local employers in Sonipat and nearby regions find the right talent.",
    },
    {
      question: "Do you support walk-ins?",
      answer:
        "Yes! We encourage walk-ins at our Sonipat office. Our team is available to assist with job applications, resume reviews, interview preparation, and career guidance. Please check our office hours or call ahead to confirm availability.",
    },
    {
      question: "What are office support hours?",
      answer:
        "Our Sonipat office is open Monday to Saturday, 9:00 AM to 6:00 PM. We also offer virtual support and can schedule appointments outside these hours if needed. Contact us to find a time that works for you.",
    },
    {
      question: "How does EarlyJobs help colleges with placements?",
      answer:
        "We partner with colleges through MoU agreements to organize placement drives, internship programs, and student readiness workshops. Our team coordinates with employers, manages the entire placement process, and provides detailed reporting on placement outcomes.",
    },
  ]

  return (
    <>
      <Navbar />
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/HeroImg3.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-blue-800/60 backdrop-blur-sm" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Unlock Your Career in <span className="text-yellow-400">Sonipat</span>
                <br />
                <span className="text-lg sm:text-xl md:text-2xl font-normal text-white/90 mt-2 block">
                  Verified Jobs • Local Hiring • Placement Support
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                EarlyJobs Sonipat: Your trusted, AI-powered recruitment partner supporting students, colleges, and employers across Sonipat, Haryana, and the NCR region
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleScrollToContact}
                  className="px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center"
                >
                  Register for Job Support
                  <ArrowRight className="ml-2 w-5 h-5 inline" />
                </button>
                <button
                  onClick={handleScrollToContact}
                  className="px-8 py-4 bg-white/10 text-white text-lg font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 ease-in-out backdrop-blur-sm flex items-center"
                >
                  <Phone className="mr-2 w-5 h-5 inline" />
                  Hire or Partner with Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-orange-500">EarlyJobs Sonipat</span>
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
                  EarlyJobs expanded to Sonipat to serve the growing student population and meet the rising demand for structured placement support. With Sonipat's proximity to the NCR hiring ecosystem and its thriving educational institutions, we recognized the need for a trusted recruitment partner that bridges local talent with verified job opportunities across India.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  Our Sonipat franchise office brings personalized, on-ground support to students, colleges, and employers. We're not just another job portal—we're your career partners, committed to helping you succeed in Sonipat's dynamic employment landscape.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
                  <div className="text-center bg-orange-500/10 rounded-lg p-6 shadow-lg">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">2000+</h3>
                    <p className="text-gray-600">Jobs Placed</p>
                  </div>
                  <div className="text-center bg-orange-500/10 rounded-lg p-6 shadow-lg">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">150+</h3>
                    <p className="text-gray-600">Partner Companies</p>
                  </div>
                  <div className="text-center bg-orange-500/10 rounded-lg p-6 shadow-lg">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
                    <p className="text-gray-600">College Partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 sm:py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Who We <span className="text-orange-500">Help</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored solutions for students, colleges, and companies in Sonipat's growing job market
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-600 group"
                >
                  <div className="w-16 h-16 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6">{benefit.description}</p>
                  <ul className="space-y-3">
                    {benefit.points.map((point, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How It <span className="text-orange-500">Works</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Your journey to success in Sonipat's job market starts here—simple, fast, and confidence-building
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-orange-500 text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-all duration-300">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-orange-500/20" />
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Success <span className="text-orange-500">Stories</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from students, colleges, and employers who found success through EarlyJobs Sonipat
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-orange-500/30 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{testimonial.college}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="contact" className="py-16 sm:py-20 bg-orange-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Join the <span className="text-orange-500">EarlyJobs Sonipat Network</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Ready to transform your career journey or hiring process? Join thousands who trust EarlyJobs.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "")
                        let formatted = "+91 "
                        if (raw.length > 0) {
                          if (raw.length <= 4) {
                            formatted += raw
                          } else {
                            formatted += raw.slice(0, 4) + " " + raw.slice(4, 10)
                          }
                        }
                        setFormData({ ...formData, phone: formatted })
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email ID *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">I am a *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
                    >
                      <option value="student">Student</option>
                      <option value="college">College</option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Your details are safe.</strong> We use your information only for career or hiring support and never share it with third parties without your consent.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join the EarlyJobs Sonipat Network
                      <ArrowRight className="ml-2 w-5 h-5 inline" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Local Events & Updates */}
        {/* <section id="events" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Upcoming <span className="text-orange-500">Events</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Don't miss these exciting opportunities to connect with top employers and advance your career
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-orange-500/10 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-500/40 rounded-lg px-3 py-1">
                      <span className="text-orange-600 font-semibold text-sm">{event.date}</span>
                    </div>
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-all duration-300">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.companies}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleScrollToContact}
                    className="mt-4 w-full py-2 bg-orange-500/50 text-white rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked <span className="text-orange-500">Questions</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Everything you need to know about EarlyJobs Sonipat
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg border overflow-hidden">
                  <button
                    className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-orange-500/10 transition-all duration-300"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${expandedFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 sm:px-6 py-4 bg-orange-500/10">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        {/* <section id="contact-us" className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Contact <span className="text-orange-500">EarlyJobs Sonipat</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Reach out to our Sonipat franchise team for any queries or support. We're here to help you succeed!
              </p>
            </div>
            <div className="flex flex-col md:flex-row bg-orange-500/10 rounded-lg shadow-lg">
              <div className="p-6 sm:p-8 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1" />
                    <p>
                    SCO 31, First Floor, Connaught Street
sector 16, outside Rangoli Greens
Sonipat- 131001 (Haryana)
                      <br />
                      <span className="text-sm text-gray-500">Contact us for exact office address</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-orange-500 mr-3" />
                    <p>+91 9729542855</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-orange-500 mr-3" />
                    <p>sonipat@earlyjobs.ai</p>
                  </div>
                </div>
                <button
                  onClick={handleScrollToContact}
                  className="mt-6 w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Register Now
                </button>
              </div>
              <div className="hidden md:block p-6 sm:p-8 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Office Hours</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <span className="font-semibold">Monday - Saturday:</span> 9:00 AM - 6:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Sunday:</span> Closed
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-600 mb-4">
                    Have a question? Drop by our office or give us a call! We also support walk-ins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Popup Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-xl">
              <h3
                className={`text-xl sm:text-2xl font-bold mb-4 ${isSuccess ? "text-orange-500" : "text-red-600"}`}
              >
                {isSuccess ? "Success!" : "Error"}
              </h3>
              <p className="text-gray-600 mb-6">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default SonipatFranchise


"use client"

import { motion } from "framer-motion"

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
    Headphones,
    User,
} from "lucide-react"

const Card = ({ className = "", children, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`bg-white rounded-lg shadow-lg p-6 border border-orange-200 hover:border-orange-600 transition-colors duration-300 ${className}`}
        {...props}
    >
        {children}
    </motion.div>
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
        className={`w-full p-4 border-2 border-transparent bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 ${className}`}
        {...props}
    />
)

const Label = ({ className = "", children, ...props }) => (
    <label className={`block text-sm font-bold text-gray-700 mb-2 ml-1 ${className}`} {...props}>
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

const Lucknow = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        city: "",
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
                        YourExpectations: formData.YourExpectations,
                        City: formData.city,
                    },
                ]),
            })

            const result = await response.json()
            if (response.ok && result.created === 1) {
                setSubmitted(true)
                setShowPopup({
                    type: "success",
                    message:
                        "Welcome to the EarlyJobs Lucknow network! Our team will contact you within 24 hours to discuss your career goals and upcoming opportunities.",
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
                YourExpectations: "",
                industry: "",
                city: "Lucknow",
                resume: null,
            })
        }
    }

    const steps = [
        {
            icon: UserPlus,
            title: "Register on EarlyJobs Lucknow Portal",
            description:
                "Create your profile in minutes. Upload your resume, add your skills, and tell us about your career aspirations. Our platform is designed specifically for Lucknow's job market.",
            color: "bg-orange-500",
        },
        {
            icon: Search,
            title: "Get Matched with Local Opportunities",
            description:
                "Our smart algorithm connects you with relevant jobs, internships, and skill-building programs in Lucknow. From IT companies to manufacturing units, retail chains to educational institutions.",
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

    const studentBenefits = [
        "Verified local jobs & internship opportunities in Lucknow",
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
        "Access to pre-vetted local talent pool in Lucknow",
        "Quick hiring process & reduced recruitment time",
        "Cost-effective recruitment solutions",
        "Campus recruitment support & coordination",
        "Skill assessment & candidate screening",
        "Local market insights & hiring trends",
    ]

    const faqs = [
        {
            question: "What services does EarlyJobs Lucknow offer?",
            answer:
                "We provide comprehensive recruitment solutions including job placements, internships, skill development programs, campus recruitment drives, and career counseling specifically for the Lucknow region. Our services connect local talent with opportunities across IT, manufacturing, retail, education, and emerging sectors in Lucknow.",
        },
        {
            question: "Is there any registration fee to join EarlyJobs Lucknow?",
            answer:
                "No, registration is completely free for job seekers and students. We believe in accessible career opportunities for everyone in Lucknow. Our revenue comes from our employer partners, not from candidates.",
        },
        {
            question: "Which companies hire through EarlyJobs in Lucknow?",
            answer:
                "We partner with numerous companies ranging from IT firms, manufacturing units, retail chains, educational institutions, and government organizations. Our partners include both established corporates and growing businesses in the Lucknow ecosystem.",
        },
        {
            question: "Do you provide training and skill development programs?",
            answer:
                "Yes! We conduct regular workshops on communication skills, technical training, interview preparation, resume building, and industry-specific certification programs. All training is designed considering the local job market requirements in Lucknow.",
        },
        {
            question: "How often do you conduct walk-in interviews in Lucknow?",
            answer:
                "We organize walk-in interview drives at least twice a month at various locations across Lucknow including convenient venues in the city. We also conduct special campus drives at local colleges and institutions.",
        },
        {
            question: "Can final year students register for placements?",
            answer:
                "We encourage final year students to register early. This gives us time to understand your career goals, provide relevant training, and connect you with suitable opportunities before graduation. Early registration often leads to pre-placement offers.",
        },
    ]

    return (
        <div className="min-h-screen bg-white text-orange-900">
            {showPopup && <Popup message={showPopup.message} type={showPopup.type} onClose={closePopup} />}

            <section className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/lucknow.jpg"
                        alt="Lucknow skyline"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-orange-800/50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 pt-20">
                    <div className="text-center">
                        <div className="text-white space-y-8">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                                <MapPin className="w-4 h-4" />
                                Lucknow, Uttar Pradesh
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-bold">
                                    Building Lucknow’s Future
                                    <span className="block text-orange-200">Career Champions</span>
                                </h1>
                                <p className="text-xl md:text-2xl font-medium opacity-90">
                                    Where Your Career Journey Takes Off in Lucknow
                                </p>
                            </div>

                            <div className="text-center">
                                <p className="text-lg md:text-xl">
                                    Connecting Lucknow's brightest talent with top employers across IT, Manufacturing, Retail &
                                    Education sectors. Build skills, find opportunities, and grow your career with EarlyJobs Lucknow.
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
                                    <span className="text-sm">2500+ Successful Placements</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="text-sm">200+ Partner Companies</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="text-sm">200+ Local Colleges</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-orange-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        {/* Left: text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-orange-100 text-orange-700 mb-6 shadow-sm border border-orange-200">
                                <MapPin className="w-3 h-3 mr-2" /> Lucknow · Uttar Pradesh
                            </p>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-6 leading-tight">
                                About <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">EarlyJobs Lucknow</span>
                            </h2>
                            <p className="text-lg text-orange-800 leading-relaxed mb-6">
                                <span className="font-bold text-orange-900">EarlyJobs</span> is India's leading tech-enabled recruitment franchise, and the Lucknow chapter plays a key role in linking local talent to meaningful, high-impact career opportunities
                            </p>

                            <div className="bg-white/80 backdrop-blur-sm border-l-4 border-orange-500 p-6 rounded-r-xl mb-8 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-orange-500 fill-current" />
                                    <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">Our Mission</span>
                                </div>
                                <p className="text-2xl font-bold text-orange-900 mb-2">Connect. Develop. Succeed.</p>
                                <p className="text-orange-700/80 font-medium">
                                    We help students and professionals in Lucknow build meaningful careers right here in our vibrant city.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 rounded-full bg-white text-orange-800 text-sm shadow-sm">Lucknow-focused hiring</span>
                                <span className="px-3 py-1 rounded-full bg-white text-orange-800 text-sm shadow-sm">Campus to corporate</span>
                                <span className="px-3 py-1 rounded-full bg-white text-orange-800 text-sm shadow-sm">AI-driven matching</span>
                                <span className="px-3 py-1 rounded-full bg-white text-orange-800 text-sm shadow-sm">Local support team</span>
                            </div>
                        </motion.div>

                        {/* Right: visual stats card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-xl border border-orange-100 bg-white/80 backdrop-blur">
                                <img
                                    src="/images/lucknow.jpg"
                                    alt="Lucknow city"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6 grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-700">2500+</p>
                                        <p className="text-xs text-orange-800/80">Placements</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-700">200+</p>
                                        <p className="text-xs text-orange-800/80">Partner Companies</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-700">200+</p>
                                        <p className="text-xs text-orange-800/80">Colleges</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
                            Benefits for Everyone in the Lucknow Ecosystem
                        </h2>
                        <p className="text-lg text-orange-800 max-w-3xl mx-auto">
                            Whether you're a student seeking opportunities, a college looking to improve placements, or a company
                            searching for talent, EarlyJobs Lucknow has solutions tailored for you.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "For Students",
                                subtitle: "Kickstart your career journey",
                                icon: GraduationCap,
                                benefits: studentBenefits,
                                color: "from-blue-500 to-indigo-600",
                                iconColor: "text-blue-50",
                                shadow: "shadow-blue-200",
                                borderColor: "border-blue-100",
                                hoverBorderColor: "border-blue-500",
                            },
                            {
                                title: "For Colleges",
                                subtitle: "Boost placement success",
                                icon: Building2,
                                benefits: collegeBenefits,
                                color: "from-orange-500 to-red-600",
                                iconColor: "text-orange-50",
                                shadow: "shadow-orange-200",
                                borderColor: "border-orange-100",
                                hoverBorderColor: "border-orange-500",
                            },
                            {
                                title: "For Companies",
                                subtitle: "Find the right talent",
                                icon: Users,
                                benefits: companyBenefits,
                                color: "from-purple-500 to-pink-600",
                                iconColor: "text-purple-50",
                                shadow: "shadow-purple-200",
                                borderColor: "border-purple-100",
                                hoverBorderColor: "border-purple-500",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
                                <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 font-medium">{item.subtitle}</p>

                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {item.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors`}>
                                                    <CheckCircle className={`w-3 h-3 text-orange-600`} />
                                                </div>
                                                <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`w-full py-3 rounded-xl border-2 font-bold text-sm transition-all duration-300 
                                        ${index === 0 ? 'border-blue-100 text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-200' :
                                            index === 1 ? 'border-orange-100 text-orange-600 group-hover:bg-orange-50 group-hover:border-orange-200' :
                                                'border-purple-100 text-purple-600 group-hover:bg-purple-50 group-hover:border-purple-200'}`}>
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <div className="bg-orange-100 rounded-2xl p-8 md:p-12 shadow-lg">
                            <h3 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4">
                                Ready to Transform Your Career Journey?
                            </h3>
                            <p className="text-lg text-orange-800 mb-8 max-w-2xl mx-auto">
                                Join hundreds of successful professionals who started their journey with EarlyJobs Lucknow. Your dream
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
                            How EarlyJobs Lucknow Works
                        </h2>
                        <p className="text-lg text-orange-800 max-w-3xl mx-auto">
                            Getting started with your career journey in Lucknow is simple. Follow these three easy steps to unlock
                            opportunities in your city.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="md:flex md:justify-between relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 z-0 opacity-30" />

                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.3 }}
                                    className="relative z-10 flex-1 px-4 text-center group"
                                >
                                    {/* Floating Icon */}
                                    <div className="relative inline-block mb-[-2.5rem] z-20">
                                        <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${index === 0 ? 'from-orange-400 to-red-500' : index === 1 ? 'from-orange-500 to-amber-500' : 'from-red-500 to-orange-600'} shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 border-4 border-white ring-1 ring-orange-50`}>
                                            <step.icon className="w-9 h-9 text-white" />
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white pt-14 pb-8 px-6 rounded-2xl shadow-lg border border-orange-100/50 group-hover:shadow-2xl group-hover:border-orange-500 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-center">
                                        {/* Gradient Top Line */}
                                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${index === 0 ? 'from-orange-400 to-red-500' : index === 1 ? 'from-orange-500 to-amber-500' : 'from-red-500 to-orange-600'}`} />

                                        {/* Watermark Number */}
                                        <div className="absolute top-4 right-4 text-8xl font-black text-orange-900 opacity-[0.03] select-none pointer-events-none leading-none">
                                            {index + 1}
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10 group-hover:text-orange-700 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="register" className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-50/50 skew-y-3 transform origin-bottom-left z-0"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {submitted && !showPopup ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl shadow-xl border border-orange-100 p-12 text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                                    <CheckCircle className="w-12 h-12 text-green-500" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                    Registration Successful!
                                </h2>
                                <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
                                    Welcome to the EarlyJobs Lucknow network! We've received your details and will get back to you shortly.
                                </p>
                                <div className="bg-orange-50 rounded-xl p-6 text-left max-w-lg mx-auto border border-orange-100">
                                    <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-orange-500 fill-current" />
                                        Next Steps
                                    </h3>
                                    <ul className="space-y-3">
                                        {["Profile verification", "Skill assessment", "Job matching", "Interview scheduling"].map((step, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700">
                                                <div className="w-6 h-6 rounded-full bg-white border border-orange-200 flex items-center justify-center text-orange-600 font-bold text-xs shadow-sm">
                                                    {i + 1}
                                                </div>
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="grid lg:grid-cols-5 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
                                {/* Left Side - Form Info */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-orange-600 to-red-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-bold mb-2">Join EarlyJobs Lucknow</h3>
                                        <p className="text-orange-100 mb-8">Launch your career with the region's fastest growing recruitment network.</p>

                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                                    <Users className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg">Massive Network</h4>
                                                    <p className="text-sm text-orange-100 opacity-80">Connect with 200+ partner companies in Lucknow.</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                                    <Award className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg">Quality Hiring</h4>
                                                    <p className="text-sm text-orange-100 opacity-80">Verified jobs and verified candidates only.</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                                    <Headphones className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg">Support</h4>
                                                    <p className="text-sm text-orange-100 opacity-80">Dedicated career counselors to guide you.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 relative z-10 pt-8 border-t border-white/20">
                                        <p className="text-sm text-orange-100 opacity-70 mb-2">Have questions?</p>
                                        <p className="font-bold text-xl flex items-center gap-2">
                                            <Phone className="w-5 h-5" /> +91 8217527926
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side - Form */}
                                <div className="lg:col-span-3 p-10 bg-white">
                                    {error && !showPopup && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm"
                                        >
                                            <X className="w-4 h-4" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <Label htmlFor="role" className="text-gray-600 font-medium">I am a... <span className="text-red-500">*</span></Label>
                                            <div className="relative group">
                                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none z-10" />
                                                <select
                                                    id="role"
                                                    name="role"
                                                    required
                                                    value={formData.role}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select your role</option>
                                                    <option value="student">Job Seeker</option>
                                                    <option value="graduate">Employer/HR</option>
                                                    <option value="college">College Representative</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="name" className="text-gray-600 font-medium">Full Name <span className="text-red-500">*</span></Label>
                                                <div className="relative group">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none z-10 flex items-center justify-center">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="John Doe"
                                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="phone" className="text-gray-600 font-medium">Phone <span className="text-red-500">*</span></Label>
                                                <div className="relative group">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none z-10" />
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        required
                                                        maxLength={10}
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="9876543210"
                                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="email" className="text-gray-600 font-medium">Email <span className="text-red-500">*</span></Label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none z-10" />
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="john@example.com"
                                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="city" className="text-gray-600 font-medium">City <span className="text-red-500">*</span></Label>
                                                <div className="relative group">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none z-10" />
                                                    <input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        required
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 font-medium outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="YourExpectations" className="text-gray-600 font-medium">Your Expectations <span className="text-red-500">*</span></Label>
                                            <div className="relative group">
                                                <textarea
                                                    id="YourExpectations"
                                                    name="YourExpectations"
                                                    value={formData.YourExpectations}
                                                    required
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                                                    placeholder="Tell us about the role, industry, or skills you're interested in..."
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                    Processing...
                                                </span>
                                            ) : (
                                                "Join Network"
                                            )}
                                        </Button>

                                        <p className="text-xs text-center text-gray-400 mt-4">
                                            By submitting, you agree to our <a href="#" className="underline hover:text-orange-600">Privacy Policy</a>.
                                        </p>
                                    </form>
                                </div>
                            </div>
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
                                Got questions? We've got answers. Here are the most common questions about EarlyJobs Lucknow.
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
                                        <p className="text-orange-800 mt-3 pl-0 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    )}
                                </Card>
                            ))}
                        </div>

                        <div className="mt-20 relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-purple-600/20 opacity-50"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                            <div className="relative z-10 py-8 px-6 text-center">
                                <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent inline-block">
                                    Still Have Questions?
                                </h3>
                                <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-lg">
                                    Our team is here to help you succeed. Whether you're a student, college, or company, we're just a message away.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Phone className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <p className="font-bold text-lg mb-1">Call Us</p>
                                        <p className="text-slate-400 group-hover:text-orange-300 transition-colors">+91 8217527926</p>
                                    </div>

                                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Mail className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <p className="font-bold text-lg mb-1">Email Us</p>
                                        <a href="mailto:franchise@earlyjobs.in" className="text-slate-400 group-hover:text-blue-300 transition-colors no-underline">franchise@earlyjobs.in</a>
                                    </div>

                                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <MapPin className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <p className="font-bold text-lg mb-1">Visit Us</p>
                                        <p className="text-slate-400">Lucknow, Uttar Pradesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Lucknow

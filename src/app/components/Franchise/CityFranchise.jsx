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

const CityFranchise = ({ data }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        city: data.name,
        resume: null,
        YourExpectations: ""
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showPopup, setShowPopup] = useState(null)
    const [openIndex, setOpenIndex] = useState(0)

    const defaultHeroImage = "https://res.cloudinary.com/ddsy9p8fg/image/upload/v1776657676/defaultheroImage_ewfnj4.jpg"

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
                        `Welcome to the EarlyJobs ${data.name} network! Our team will contact you within 24 hours to discuss your career goals and upcoming opportunities.`,
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
                city: data.name,
                resume: null,
            })
        }
    }

    const steps = data.steps || [
        {
            icon: UserPlus,
            title: `Register on EarlyJobs ${data.name} Portal`,
            description:
                `Create your profile in minutes. Upload your resume, add your skills, and tell us about your career aspirations. Our platform is designed specifically for ${data.name}'s job market.`,
            color: "bg-orange-500",
        },
        {
            icon: Search,
            title: "Get Matched with Local Opportunities",
            description:
                `Our smart algorithm connects you with relevant jobs, internships, and skill-building programs in ${data.name}. From IT companies to manufacturing units, retail chains to educational institutions.`,
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

    const faqs = data.faqs || [
        {
            question: `What services does EarlyJobs ${data.name} offer?`,
            answer:
                `We provide comprehensive recruitment solutions including job placements, internships, skill development programs, campus recruitment drives, and career counseling specifically for the ${data.name} region.`,
        },
        {
            question: `Is there any registration fee to join EarlyJobs ${data.name}?`,
            answer:
                `No, registration is completely free for job seekers and students. We believe in accessible career opportunities for everyone in ${data.name}.`,
        },
        {
            question: `Which companies hire through EarlyJobs in ${data.name}?`,
            answer:
                `We partner with 100+ companies ranging from IT firms, manufacturing units, retail chains, educational institutions, and government organizations. Our partners include both established corporates and growing businesses in the ${data.name}.`,
        },
        {
            question: `Do you provide training and skill development programs?`,
            answer:
                `Yes! We conduct regular workshops on communication skills, technical training, interview preparation, resume building, and industry-specific certification programs. All training is designed considering the local job market requirements in ${data.name}.`,
        },
    ]

    const studentBenefits = data.studentBenefits || [
        `Verified local jobs & internship opportunities in ${data.name}`,
        "Skill-building workshops & certification programs",
        "Regular walk-in interview drives in the city",
        "Career guidance & resume building support",
        "Direct connection with hiring managers",
        "Industry-specific training programs",
    ]

    const collegeBenefits = data.collegeBenefits || [
        "Enhanced placement statistics & outcomes",
        "Industry partnerships & guest lecture programs",
        "Customized recruitment drives for your students",
        "Faculty development & industry connect programs",
        "Alumni network building & engagement",
        "Campus-to-corporate transition support",
    ]

    const companyBenefits = data.companyBenefits || [
        `Access to pre-vetted local talent pool in ${data.name}`,
        "Quick hiring process & reduced recruitment time",
        "Cost-effective recruitment solutions",
        "Campus recruitment support & coordination",
        "Skill assessment & candidate screening",
        "Local market insights & hiring trends",
    ]

    return (
        <div className="min-h-screen bg-white">
            {showPopup && <Popup message={showPopup.message} type={showPopup.type} onClose={closePopup} />}

            <section className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={data.heroImage || defaultHeroImage}
                        alt={`${data.name} skyline`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = defaultHeroImage
                        }}
                    />
                    <div className={`absolute inset-0 bg-${data.theme.primary}-800/70`}></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 pt-20">
                    <div className="text-center text-white space-y-8">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                            <MapPin className="w-4 h-4" />
                            {data.name}, {data.state}
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold">
                                {data.heroTitle.split(' ').slice(0, -2).join(' ')}
                                <span className={`block text-${data.theme.primary}-200`}>
                                    {data.heroTitle.split(' ').slice(-2).join(' ')}
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl font-medium opacity-90">
                                {data.heroSubtitle}
                            </p>
                        </div>

                        <p className="text-lg md:text-xl max-w-3xl mx-auto">
                            {data.heroDescription}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                className={`bg-${data.theme.primary}-600 hover:bg-${data.theme.primary}-700 rounded-lg shadow-lg`}
                                onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                Register Now
                            </Button>
                            <Button className={`hover:bg-${data.theme.primary}-100 text-${data.theme.primary}-900 border border-${data.theme.primary}-500 flex justify-center bg-orange`}
                                onClick={() => document.getElementById("still-have-questions")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                Call Us Today
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-orange-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-orange-100 text-orange-700 mb-6 shadow-sm border border-orange-200">
                                <MapPin className="w-3 h-3 mr-2" /> {data.name} · {data.hub}
                            </p>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-6 leading-tight">
                                About <span className={`bg-gradient-to-r ${data.theme.gradient} bg-clip-text text-transparent`}>EarlyJobs {data.name}</span>
                            </h2>
                            <p className="text-lg text-orange-800 leading-relaxed mb-6">
                                {data.aboutText || (
                                    <>
                                        <span className="font-bold text-orange-900">EarlyJobs</span> is India's leading tech-enabled recruitment franchise. The {data.name} chapter plays a key role in linking local talent to meaningful career opportunities.
                                    </>
                                )}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-xl border border-orange-100 bg-white/80 backdrop-blur">
                                <img
                                    src={data.heroImage || defaultHeroImage}
                                    alt={data.name}
                                    className="w-full h-56 object-cover"
                                    onError={(e) => {
                                        e.target.src = defaultHeroImage
                                    }}
                                />
                                <div className="p-6 grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-700">1500+</p>
                                        <p className="text-xs text-orange-800/80">Placements</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-700">100+</p>
                                        <p className="text-xs text-orange-800/80">Partner Companies</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-700">150+</p>
                                        <p className="text-xs text-orange-800/80">Colleges</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
                            Benefits for Everyone in the {data.name} Ecosystem
                        </h2>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            { title: "For Students", icon: GraduationCap, benefits: studentBenefits, color: "from-blue-500 to-indigo-600" },
                            { title: "For Colleges", icon: Building2, benefits: collegeBenefits, color: "from-orange-500 to-red-600" },
                            { title: "For Companies", icon: Users, benefits: companyBenefits, color: "from-purple-500 to-pink-600" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                                <ul className="space-y-3">
                                    {item.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Registration Form */}
            <section id="register" className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className={`bg-gradient-to-r ${data.theme.gradient} p-8 text-center text-white`}>
                            <h2 className="text-3xl font-bold mb-2">Join EarlyJobs {data.name}</h2>
                            <p>Connect with the best opportunities in your city</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <Label>Full Name*</Label>
                                    <Input name="name" required value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label>Phone Number*</Label>
                                    <Input name="phone" required value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label>Email Address*</Label>
                                <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <Label>I am a...*</Label>
                                <select
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border-2 border-transparent bg-gray-50 rounded-xl outline-none focus:border-orange-500 transition-all"
                                >
                                    <option value="">Select your role</option>
                                    <option value="Job Seeker">Job Seeker</option>
                                    <option value="Employer">Employer</option>
                                    <option value="College">College</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Your Expectations*</Label>
                                <textarea
                                    name="YourExpectations"
                                    required
                                    rows={3}
                                    value={formData.YourExpectations}
                                    onChange={handleInputChange}
                                    className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:border-orange-500 transition-all"
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full py-4 text-lg">
                                {loading ? "Processing..." : `Join EarlyJobs ${data.name} Network`}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-orange-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-700 mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full p-6 text-left flex justify-between items-center"
                                >
                                    <span className="font-semibold text-gray-800">{faq.question}</span>
                                    {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                                </button>
                                {openIndex === index && (
                                    <div className="p-6 pt-0 text-gray-600 border-t border-gray-50">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-orange-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div id="still-have-questions" className="bg-orange-100 rounded-3xl p-8 md:p-12 text-center shadow-lg border border-orange-200">
                        <h3 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4">
                            Still Have Questions?
                        </h3>
                        <p className="text-lg text-orange-800 mb-8 max-w-2xl mx-auto">
                            Our team is here to help you succeed. Reach out to us anytime!
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                                    <Phone className="w-6 h-6 text-orange-600" />
                                </div>
                                <p className="font-bold text-orange-900 mb-1">Call Us</p>
                                <p className="text-orange-800 font-medium">{data.contactInfo?.phone || "+91 8217527926"}</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                                    <Mail className="w-6 h-6 text-orange-600" />
                                </div>
                                <p className="font-bold text-orange-900 mb-1">Email Us</p>
                                <p className="text-orange-800 font-medium">{data.contactInfo?.email || "info@earlyjobs.in"}</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                                    <MapPin className="w-6 h-6 text-orange-600" />
                                </div>
                                <p className="font-bold text-orange-900 mb-1">Visit Us</p>
                                <p className="text-orange-800 font-medium">
                                    {data.contactInfo?.address || `${data.name}, India`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CityFranchise

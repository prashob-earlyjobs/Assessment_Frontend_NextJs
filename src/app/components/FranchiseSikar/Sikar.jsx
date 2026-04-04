"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Toaster, toast } from "react-hot-toast"
import {
    MapPin,
    ArrowUpRight,
    Building2,
    GraduationCap,
    ClipboardCheck,
    Briefcase,
    ShieldCheck,
    Cpu,
    MessageCircle,
    ArrowDown
} from "lucide-react"

// --- Components ---
const Button = ({ className = "", children, ...props }) => (
    <button
        className={`px-6 py-3 rounded-full font-semibold text-white bg-[#F05A28] hover:bg-[#d94f20] transition-all flex items-center gap-2 ${className}`}
        {...props}
    >
        {children}
    </button>
)

const FloatingChat = () => (
    <a
        href="https://wa.me/918217527926"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#00D166] hover:bg-[#00b85a] text-white px-5 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
    >
        <MessageCircle className="w-5 h-5 fill-current" />
        Chat with us
    </a>
)

// --- Page Sections ---
const Sikar = () => {
    const [activeTab, setActiveTab] = useState("candidate")
    // activeTab could be 'candidate' or 'employer'
    const [selectedFile, setSelectedFile] = useState(null)

    const scrollToForm = () => {
        const formElement = document.getElementById('contact-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // Typically handled by a backend
        toast.success('Thanks for your response! Our team will connect you shortly.')
        setSelectedFile(null)
        e.target.reset()
    }

    return (
        <div className="font-serif text-slate-800">
            <Toaster position="top-right" />
            {/* Hero Section */}
            <section className="relative min-h-screen pt-20 pb-16 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="/images/Sikar.jpg"
                        alt="Office workspace with computers"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay similar to screenshot */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-orange-950/60 mix-blend-multiply"></div>
                </div>

                {/* Navbar/Header area over hero image */}
                <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center py-6 px-8 md:px-16 lg:px-24">
                    <a href="https://www.earlyjobs.ai/" className="flex items-center gap-2">
                        <span className="text-white font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">Early<span className="text-[#F05A28]">Jobs</span></span>
                    </a>
                    <div className="flex items-center gap-6">
                        <div className="font-bold text-white/90">
                            <span className="text-base">+91 8217527926</span>
                        </div>
                        <Button onClick={scrollToForm} className="px-5 py-2 text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">Get Started</Button>
                    </div>
                </div>

                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between pt-16 pb-12 lg:px-24">
                    {/* Top Content: Headline & Button */}
                    <div>
                        {/* Pill Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 border border-white/20 w-max mb-8 tracking-wider"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#F05A28]" />
                            SIKAR, RAJASTHAN
                        </motion.div>

                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="max-w-2xl text-white"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.08] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                                Your Local
                                <br />
                                <span className="text-[#F05A28]">Hiring</span> Partner
                            </h1>

                            <p className="text-lg md:text-xl text-white/80 font-sans font-light leading-relaxed mb-6 max-w-xl">
                                AI-powered recruitment connecting companies with qualified candidates and helping graduates find real opportunities — right here in Sikar.
                            </p>

                            <div className="mt-8 md:mt-12">
                                <Button onClick={scrollToForm} className="w-max text-sm px-8 py-3 bg-[#F05A28] border-0 hover:bg-[#d94f20] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 rounded-md">
                                    Get Started <ArrowDown className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Stats & Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-full mt-16 relative"
                    >
                        <div className="w-[90%] md:w-[45%] h-px bg-white/30 mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans md:max-w-2xl">
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1 font-serif tracking-tight">2000</h4>
                                <p className="text-[10px] text-white/60 font-semibold tracking-widest uppercase">Candidates Placed</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1 font-serif tracking-tight">200+</h4>
                                <p className="text-[10px] text-white/60 font-semibold tracking-widest uppercase">Partner Companies</p>
                            </div>
                            <div className="text-left md:text-left flex flex-col justify-between">
                                <div>
                                    <h4 className="text-3xl font-bold text-white mb-1 font-serif tracking-tight">50+</h4>
                                    <p className="text-[10px] text-white/60 font-semibold tracking-widest uppercase">Campus Drives</p>
                                </div>
                            </div>
                        </div>

                        {/* Scroll Indicator positioned slightly absolute */}
                        {/* <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
                            <span className="text-[10px] text-white font-sans uppercase tracking-[0.2em]">Scroll</span>
                            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
                        </div> */}
                    </motion.div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-24 bg-[#FFFaf7] border-y border-orange-50/50 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-orange-100/40 to-transparent mix-blend-multiply opacity-50 pointer-events-none"></div>

                <div className="container mx-auto px-6 lg:px-24 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50/80 mb-6 group cursor-default shadow-sm shadow-orange-100/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
                                <span className="text-[10px] font-bold tracking-widest text-[#F05A28] uppercase font-sans">About Us</span>
                            </div>

                            <h2 className="text-5xl lg:text-[64px] font-bold leading-[1.1] text-slate-900 mb-8 tracking-tight">
                                Bridging talent
                                <br />
                                with <span className="text-[#F05A28]">opportunity</span>
                                <br />
                                in Sikar
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#F05A28] to-orange-300 rounded-full" />
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="font-sans pt-4 lg:pt-0"
                        >
                            <p className="text-lg text-slate-600 leading-relaxed mb-12">
                                EarlyJobs is a recruitment platform that connects companies, colleges, and job seekers through structured hiring systems and AI-supported candidate matching. Our district-level offices help local businesses find talent while supporting graduates with real job opportunities.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0 shadow-sm">
                                        <Building2 className="w-5 h-5 text-[#F05A28]" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 leading-snug">Local hiring support for<br />companies</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0 shadow-sm">
                                        <Briefcase className="w-5 h-5 text-[#F05A28]" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 leading-snug">Candidate screening & job<br />matching</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0 shadow-sm">
                                        <GraduationCap className="w-5 h-5 text-[#F05A28]" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 leading-snug">Campus placement assistance</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0 shadow-sm">
                                        <Cpu className="w-5 h-5 text-[#F05A28]" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 leading-snug">AI-powered recruitment<br />technology</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Offer Section */}
            <section className="py-24 bg-[#212B4C]">
                <div className="container mx-auto px-6 lg:px-24 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
                                <span className="text-[10px] font-bold tracking-widest text-[#F05A28] uppercase font-sans">Services</span>
                            </div>
                            <h2 className="text-5xl font-bold text-white tracking-tight">What We Offer</h2>
                        </div>
                        <p className="text-white/60 text-lg font-sans max-w-md">
                            End-to-end recruitment solutions designed for Sikar's growing business ecosystem.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 relative z-10 font-sans">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#2D3962]/60 hover:bg-[#2D3962] border border-white/5 rounded-2xl p-10 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-8 right-8 text-white/20 group-hover:text-white/40 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                                <Briefcase className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-serif">Recruitment Support for Companies</h3>
                            <p className="text-white/60 leading-relaxed text-[15px]">
                                Local companies can find screened candidates for roles across sales, operations, IT support, accounts, and other entry to mid-level positions.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-[#2D3962]/60 hover:bg-[#2D3962] border border-white/5 rounded-2xl p-10 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-8 right-8 text-white/20 group-hover:text-white/40 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                                <GraduationCap className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-serif">Job Opportunities for Graduates</h3>
                            <p className="text-white/60 leading-relaxed text-[15px]">
                                Fresh graduates and job seekers can register their profiles to get access to job openings from verified employers.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-[#2D3962]/60 hover:bg-[#2D3962] border border-white/5 rounded-2xl p-10 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-8 right-8 text-white/20 group-hover:text-white/40 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                                <Building2 className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-serif">Campus Placement Assistance</h3>
                            <p className="text-white/60 leading-relaxed text-[15px]">
                                Colleges in Sikar can partner with EarlyJobs to provide placement drives and training modules designed for students.
                            </p>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-[#2D3962]/60 hover:bg-[#2D3962] border border-white/5 rounded-2xl p-10 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-8 right-8 text-white/20 group-hover:text-white/40 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                                <ClipboardCheck className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-serif">Skill Assessment & Verification</h3>
                            <p className="text-white/60 leading-relaxed text-[15px]">
                                Ensure role fitness through platform-based skill quizzes mapping exactly to the employer's operational requirements.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Why Work With Us Section */}
            <section className="py-24 bg-[#FAFAFA]">
                <div className="container mx-auto px-6 lg:px-24 max-w-7xl">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 mb-6 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
                            <span className="text-[10px] font-bold tracking-widest text-[#F05A28] uppercase font-sans">Why Choose Us</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            Why Work With <span className="text-[#F05A28]">EarlyJobs</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
                        {/* Item 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F05A28] to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-6 right-6 text-slate-200 font-bold text-lg pointer-events-none">01</div>
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-8 border border-orange-100 group-hover:scale-110 transition-transform">
                                <ClipboardCheck className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-[19px] font-bold text-slate-900 mb-3 font-serif mt-12">Structured Process</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Systematic recruitment from sourcing to placement with clear milestones and timelines.
                            </p>
                        </motion.div>

                        {/* Item 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F05A28] to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-6 right-6 text-slate-200 font-bold text-lg pointer-events-none">02</div>
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-8 border border-orange-100 group-hover:scale-110 transition-transform">
                                <MapPin className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-[19px] font-bold text-slate-900 mb-3 font-serif mt-12">Local Network</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Deep connections with Sikar's business community and educational institutions.
                            </p>
                        </motion.div>

                        {/* Item 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F05A28] to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-6 right-6 text-slate-200 font-bold text-lg pointer-events-none">03</div>
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-8 border border-orange-100 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-[19px] font-bold text-slate-900 mb-3 font-serif mt-12">Candidate Screening</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Rigorous assessment ensuring only qualified candidates reach employers.
                            </p>
                        </motion.div>

                        {/* Item 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F05A28] to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-6 right-6 text-slate-200 font-bold text-lg pointer-events-none">04</div>
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-8 border border-orange-100 group-hover:scale-110 transition-transform">
                                <Cpu className="w-5 h-5 text-[#F05A28]" />
                            </div>
                            <h3 className="text-[19px] font-bold text-slate-900 mb-3 font-serif mt-12">Technology-Driven</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                AI-powered matching algorithms for faster, more accurate hiring outcomes.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Get In Touch Section */}
            <section id="contact-form" className="py-24 bg-[#FAEDEB] relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-24 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Left Column - Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-100/50 mb-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
                                <span className="text-[10px] font-bold tracking-widest text-[#F05A28] uppercase font-sans">Get In Touch</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight font-serif">
                                Let's <span className="text-[#F05A28]">Connect</span>
                            </h2>

                            <p className="text-lg text-slate-600 leading-relaxed mb-12 font-sans max-w-md">
                                Whether you're looking for your next opportunity or searching for the right candidate — we're here to help. Choose your path and we'll take it from there.
                            </p>

                            <div className="space-y-8 font-sans">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-[#F05A28]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Office</h4>
                                        <p className="text-slate-700 font-medium">
                                            First Floor, Sanskar G Heights, Opp Pride City, Sikar<br />
                                            332001
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-5 h-5 text-[#F05A28]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</h4>
                                        <p className="text-slate-700 font-medium">+91 94621 62272</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5 text-[#F05A28]"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</h4>
                                        <p className="text-slate-700 font-medium">sikar@earlyjobs.ai</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-[2rem] shadow-2xl relative overflow-hidden"
                        >
                            {/* Top border decoration */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#F05A28] to-[#2D3962]" />

                            <div className="p-8 md:p-10 font-sans">
                                {/* Form Tabs */}
                                <div className="flex justify-center mb-10">
                                    <div className="bg-slate-100 p-1 rounded-full inline-flex w-full max-w-sm">
                                        <button
                                            onClick={() => setActiveTab('candidate')}
                                            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'candidate' ? 'bg-[#F05A28] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-4 h-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            I'm Seeking a Job
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('employer')}
                                            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'employer' ? 'bg-[#F05A28] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            <Briefcase className="w-4 h-4" />
                                            I'm Hiring
                                        </button>
                                    </div>
                                </div>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    {activeTab === 'candidate' ? (
                                        <>
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Your full name"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        placeholder="+91 XXXXX XXXXX"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Email <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="your@email.com"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Highest Qualification <span className="text-red-500">*</span></label>
                                                    <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-500 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all appearance-none outline-none">
                                                        <option value="" disabled selected hidden>Select qualification</option>
                                                        <option>10th Pass</option>
                                                        <option>12th Pass</option>
                                                        <option>Graduate</option>
                                                        <option>Post Graduate</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">City <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. Sikar"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2 pb-2">
                                                <label className="text-sm font-bold text-slate-700">Upload Resume (PDF only) <span className="text-red-500">*</span></label>
                                                <label className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#F05A28] hover:bg-orange-50/50 transition-all text-center">
                                                    <input
                                                        type="file"
                                                        required
                                                        accept=".pdf"
                                                        className="hidden"
                                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-6 h-6 text-[#F05A28] mb-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                                    <span className="text-sm font-medium text-slate-500">
                                                        {selectedFile ? selectedFile.name : "Click to select a file"}
                                                    </span>
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Company Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Your company"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                />
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Contact Person <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Full name"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        placeholder="+91"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Email <span className="text-red-500">*</span></label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="yourcompany@email.com"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Hiring Requirement <span className="text-red-500">*</span></label>
                                                <textarea
                                                    rows="3"
                                                    required
                                                    placeholder="Describe roles you're hiring for..."
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all resize-none"
                                                ></textarea>
                                            </div>

                                            <div className="space-y-2 pb-2">
                                                <label className="text-sm font-bold text-slate-700">Number of Positions <span className="text-red-500">*</span></label>
                                                <input
                                                    type="number"
                                                    required
                                                    placeholder="e.g. 5"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-all"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full py-4 mt-4 bg-[#F05A28] text-white rounded-xl font-bold hover:bg-[#d94f20] transition-colors shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                                    >
                                        {activeTab === 'candidate' ? 'Submit Application' : 'Submit Hiring Request'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Visit Us Section */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6 lg:px-24 max-w-7xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
                            <span className="text-[10px] font-bold tracking-widest text-[#F05A28] uppercase font-sans">Visit Us</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-serif">
                            EarlyJobs <span className="text-[#F05A28]">Sikar</span> Office
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full h-[500px] rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-sm relative group"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113460.67270278772!2d75.05609384631247!3d27.618648834601633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca418aa342cad%3A0xe13c6e91f16d1fa7!2sSikar%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div>

                        {/* Contact Cards */}
                        <div className="space-y-4 font-sans">
                            {/* Card 1: Address */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-default"
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#F05A28]" />
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Address</h4>
                                    <p className="text-slate-600 font-medium leading-relaxed">
                                        First Floor, Sanskar G Heights,<br />
                                        Opp Pride City, Sikar,<br />
                                        Rajasthan – 332001
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 2: Contact */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-default"
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-5 h-5 text-[#F05A28]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contact</h4>
                                    <p className="text-slate-600 font-medium">+91 94621 62272<br />+91 90248 98885</p>
                                </div>
                            </motion.div>

                            {/* Card 3: Email */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-default"
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5 text-[#F05A28]"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</h4>
                                    <p className="text-slate-600 font-medium">sikar@earlyjobs.ai</p>
                                </div>
                            </motion.div>

                            {/* Card 4: Operated By */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-default"
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase w-5 h-5 text-[#F05A28]"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Operated By</h4>
                                    <p className="text-slate-600 font-medium">SSV Consultancy</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="pt-2"
                            >
                                <a
                                    href="https://share.google/PxonQRT2OZxxXyVcZ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#F05A28] hover:bg-[#d94f20] transition-colors py-4 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation w-4 h-4"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                                    Get Direction
                                </a>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>

            <FloatingChat />
        </div>
    )
}

export default Sikar

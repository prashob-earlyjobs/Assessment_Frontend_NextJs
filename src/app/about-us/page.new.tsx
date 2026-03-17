
"use client";
import React, { useState, useRef } from 'react'
import { FaLinkedin } from "react-icons/fa";
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';
import NavbarV2 from '../components/v2/navbar/navbar.v2';
import { User, Upload, Briefcase, Send, Plus, X, Play, Pause, Crown, FileText, Shield, Check, Star } from 'lucide-react';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import NewsBlogV2 from '../components/v2/newsBlog/newsBlog.v2';
import { PRIMARY_COLOR, PRIMARY_COLOR_LIGHT } from '../../constants/theme';
import HeaderV2 from '../components/v2/headerBlack/header.v2';
const AboutUs = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showTitleInNavbar, setShowTitleInNavbar] = useState(false);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsVideoPlaying(!isVideoPlaying);
        }
    };

    const faqData = [
        {
            id: "item-1",
            number: "01",
            question: "Can I upload a CV?",
            answer: "Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc."
        },
        {
            id: "item-2",
            number: "02",
            question: "How long will the recruitment process take?",
            answer: "The recruitment process typically takes 2-4 weeks depending on the position and number of applicants. We aim to keep candidates informed throughout the process."
        },
        {
            id: "item-3",
            number: "03",
            question: "What does the recruitment and selection process involve?",
            answer: "Our recruitment process includes application review, initial screening, interviews, and final selection. Each step is designed to ensure we find the best match for both candidates and employers."
        },
        {
            id: "item-4",
            number: "04",
            question: "Do you recruit for Graduates, Apprentices and Students?",
            answer: "Yes, we recruit for all levels including graduates, apprentices, and students. We have various opportunities suitable for different experience levels and career stages."
        },
        {
            id: "item-5",
            number: "05",
            question: "Can I receive notifications for any future jobs that may interest me?",
            answer: "Absolutely! You can set up job alerts based on your preferences. We'll notify you via email when new positions matching your criteria become available."
        }
    ];



    return (
        <div className="min-h-screen bg-white">
            <NavbarV2 pageTitle="About Us" showPageTitle={showTitleInNavbar} />

            <HeaderV2 title="About Us" onScrollStateChange={(isScrolled) => setShowTitleInNavbar(isScrolled)} />


            <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20'>
                {/* Top Section: Heading and Paragraph */}
                <div className='flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16'>
                    {/* Left: Main Heading */}
                    <div className='flex-1'>
                        <h2 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight'>
                            Et nunc ut tempus duis nisl sed massa
                        </h2>
                    </div>

                    {/* Right: Paragraph in Bordered Box */}
                    <div className='flex-1'>
                        <div className='border-2 border-blue-400 rounded-lg p-6 md:p-8'>
                            <p className='text-base md:text-lg text-black leading-relaxed'>
                                Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Large Image Placeholder */}
                <div className='w-full'>
                    <div className='border-2 border-blue-400 rounded-2xl overflow-hidden aspect-video bg-gradient-to-r from-amber-100 via-gray-300 to-gray-400 relative'>
                        {/* Placeholder gradient background - replace with actual image */}
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <span className='text-gray-500 text-lg md:text-xl font-medium'>Image Placeholder</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works Section */}
            <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 bg-white'>
                {/* Heading and Description */}
                <div className='text-center mb-12 md:mb-16'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6'>
                        How it works
                    </h2>
                    <p className='text-base md:text-lg text-black max-w-3xl mx-auto leading-relaxed'>
                        At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque rhoncus. Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique.
                    </p>
                </div>

                {/* Process Steps Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                    {/* Card 1: Create Account */}
                    <div className='bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4'>
                             <div
                                 className='w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 flex items-center justify-center mx-auto'
                                 style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                             >
                                 <User className='w-6 h-6 md:w-7 md:h-7' style={{ color: PRIMARY_COLOR }} />
                            </div>
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold text-black mb-3 text-center'>
                            Create Account
                        </h3>
                        <p className='text-sm md:text-base text-black leading-relaxed text-center'>
                            Nunc sed a nisl purus. Nibh dis faucibus proin lacus
                        </p>
                    </div>

                    {/* Card 2: Upload Resume */}
                    <div className='bg-white  rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4'>
                             <div
                                 className='w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 flex items-center justify-center mx-auto'
                                 style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                             >
                                 <Upload className='w-6 h-6 md:w-7 md:h-7' style={{ color: PRIMARY_COLOR }} />
                            </div>
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold text-black mb-3 text-center'>
                            Upload Resume
                        </h3>
                        <div className='space-y-1'>
                            <p className='text-sm md:text-base underline leading-relaxed'>
                                Felis eu ultrices a sed massa
                            </p>
                            <p className='text-sm md:text-base  underline leading-relaxed'>
                                Commodo fringilla sed tempor
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Find Jobs */}
                    <div className='bg-white  rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4'>
                             <div
                                 className='w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 flex items-center justify-center mx-auto'
                                 style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                             >
                                 <Briefcase className='w-6 h-6 md:w-7 md:h-7 text-center' style={{ color: PRIMARY_COLOR }} />
                            </div>
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold text-black mb-3 text-center'>
                            Find Jobs
                        </h3>
                        <p className='text-sm md:text-base text-black leading-relaxed text-center'>
                            Commodo fringilla sed tempor risus laoreet ultricies ipsum
                        </p>
                    </div>

                    {/* Card 4: Apply */}
                    <div className='bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4'>
                             <div
                                 className='w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 flex items-center justify-center mx-auto'
                                 style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                             >
                                 <Send className='w-6 h-6 md:w-7 md:h-7' style={{ color: PRIMARY_COLOR }} />
                            </div>
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold text-black mb-3 text-center'>
                            Apply
                        </h3>
                        <p className='text-sm md:text-base text-black leading-relaxed text-center'>
                            Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc
                        </p>
                    </div>
                </div>
            </section>

            {/* Video Hero Section with Features */}
            <section className='w-full bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='relative overflow-hidden rounded-2xl border-2 border-blue-400'>
                        {/* Video Player Area */}
                        <div className='relative aspect-video overflow-hidden'>
                            {/* Video Background */}
                            <video
                                ref={videoRef}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className='absolute inset-0 w-full h-full object-cover'
                                onLoadedData={() => {
                                    if (videoRef.current) {
                                        videoRef.current.play().catch(() => {
                                            // Handle autoplay restrictions
                                        });
                                    }
                                }}
                            >
                                <source src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' type='video/mp4' />
                                <source src='https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' type='video/mp4' />
                                {/* Fallback background if video doesn't exist */}
                            </video>
                            
                            {/* Fallback Background (if video doesn't load) */}
                            <div className='absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900'></div>
                            
                            {/* Dark Overlay */}
                            <div className='absolute inset-0 bg-black/50'></div>

                            {/* Content Overlay */}
                            <div className='relative z-10 h-full flex flex-col items-center justify-center px-4 pb-32 sm:pb-28 md:pb-24'>
                                {/* Play/Pause Button */}
                                <button 
                                    onClick={toggleVideo}
                                    className='mb-6 md:mb-8 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-30 hover:opacity-90'
                                    aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                >
                                    {isVideoPlaying ? (
                                        <Pause className='w-8 h-8 md:w-10 md:h-10 text-white' fill='white' />
                                    ) : (
                                        <Play className='w-8 h-8 md:w-10 md:h-10 text-white ml-1' fill='white' />
                                    )}
                                </button>

                                {/* Title */}
                                <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center leading-tight max-w-4xl'>
                                    Good Life Begins With A Good Company
                                </h2>
                            </div>

                            {/* Feature strip OVER the video */}
                            <div className='absolute inset-x-0 bottom-0 bg-black/90 backdrop-blur-md z-20'>
                                <div className='max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8'>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
                                    {/* Feature 1 */}
                                    <div className='flex items-start gap-4'>
                                        <div className='w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center flex-shrink-0' style={{ backgroundColor: PRIMARY_COLOR }}>
                                            <span className='text-white font-bold text-lg md:text-xl'>1</span>
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-white text-sm md:text-base mb-2 leading-relaxed'>
                                                Elit gravida lorem amet porta risus vitae at
                                            </p>
                                            <a href='#' className='text-sm font-medium transition-colors hover:opacity-90' style={{ color: PRIMARY_COLOR }}>
                                                Learn more
                                            </a>
                                        </div>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className='flex items-start gap-4'>
                                        <div className='w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center flex-shrink-0' style={{ backgroundColor: PRIMARY_COLOR }}>
                                            <span className='text-white font-bold text-lg md:text-xl'>2</span>
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-white text-sm md:text-base mb-2 leading-relaxed'>
                                                Volutpat dui lacus mattis urna platea
                                            </p>
                                            <a href='#' className='text-sm font-medium transition-colors hover:opacity-90' style={{ color: PRIMARY_COLOR }}>
                                                Learn more
                                            </a>
                                        </div>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className='flex items-start gap-4'>
                                        <div className='w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center flex-shrink-0' style={{ backgroundColor: PRIMARY_COLOR }}>
                                            <span className='text-white font-bold text-lg md:text-xl'>3</span>
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-white text-sm md:text-base mb-2 leading-relaxed'>
                                                Elementum faucibus netus gravida lacus lorem
                                            </p>
                                            <a href='#' className='text-sm font-medium transition-colors hover:opacity-90' style={{ color: PRIMARY_COLOR }}>
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 bg-white'>
                {/* Heading and Description */}
                <div className='text-center mb-12 md:mb-16'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6'>
                        Frequently Asked Questions
                    </h2>
                    <p className='text-base md:text-lg text-black max-w-2xl mx-auto leading-relaxed'>
                        At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
                    </p>
                </div>

                {/* FAQ List */}
                <Accordion 
                    allowMultiple={false}
                    transition
                    transitionTimeout={300}
                    className="w-full"
                >
                    {faqData.map((faq, index) => (
                        <AccordionItem 
                            key={faq.id} 
                            initialEntered={index === 0}
                            className="border-b last:border-b-0"
                            style={{ borderColor: PRIMARY_COLOR }}
                            header={({ state }) => (
                                <div className={`py-4 md:py-6 transition-all duration-300 flex items-start justify-between w-full ${
                                    state.isEnter ? 'bg-teal-50 rounded-lg px-6 md:px-8 mb-4' : ''
                                }`}>
                                    <div className="flex items-start gap-4 flex-1 text-left">
                                        <span className="font-bold text-lg md:text-xl flex-shrink-0" style={{ color: PRIMARY_COLOR }}>
                                            {faq.number}
                                        </span>
                                        <h3 className="text-lg md:text-xl font-bold text-black flex-1">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    {/* Custom Plus/X icon button */}
                                    <div
                                        className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center bg-white transition-colors ml-4 hover:opacity-90"
                                        style={{ borderColor: PRIMARY_COLOR, backgroundColor: state.isEnter ? PRIMARY_COLOR_LIGHT : '#ffffff' }}
                                    >
                                        {state.isEnter ? (
                                            <X className="w-4 h-4 md:w-5 md:h-5" style={{ color: PRIMARY_COLOR }} />
                                        ) : (
                                            <Plus className="w-4 h-4 md:w-5 md:h-5" style={{ color: PRIMARY_COLOR }} />
                                        )}
                                    </div>
                                </div>
                            )}
                            buttonProps={{
                                className: "w-full text-left"
                            }}
                            panelProps={{
                                className: "px-6 md:px-8 pb-4 md:pb-6"
                            }}
                        >
                            {({ state }) => (
                                <div className="pl-12 md:pl-14">
                                    <p className="text-base md:text-lg text-black leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* We're Only Working With The Best Section */}
            <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 bg-white'>
                <div className='flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start'>
                    {/* Left Side - Image Placeholders */}
                    <div className='w-full lg:w-1/2 space-y-3 md:space-y-4'>
                        {/* Large vertical rectangle */}
                        <div className='w-full h-48 md:h-56 lg:h-64 rounded-xl bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 backdrop-blur-md opacity-80'></div>
                        
                        {/* Bottom row with two rectangles */}
                        <div className='flex gap-3 md:gap-4'>
                            {/* Small horizontal rectangle */}
                            <div className='flex-1 h-24 md:h-28 lg:h-32 rounded-xl bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 backdrop-blur-md opacity-80'></div>
                            
                            {/* Square rectangle */}
                            <div className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl bg-gradient-to-br from-teal-200 via-teal-300 to-teal-400 backdrop-blur-md opacity-80'></div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className='w-full lg:w-1/2 flex flex-col justify-center'>
                        {/* Heading */}
                        <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 md:mb-8 leading-tight'>
                            We're Only Working<br />With The Best
                        </h2>

                        {/* Paragraph */}
                        <p className='text-base md:text-lg text-black mb-8 md:mb-12 leading-relaxed'>
                            Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit.
                        </p>

                        {/* Features Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8'>
                            {/* Feature 1: Quality Job */}
                            <div className='flex items-start gap-3'>
                                <div
                                    className='w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0 relative'
                                    style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                                >
                                    <Crown className='w-5 h-5 md:w-6 md:h-6' style={{ color: PRIMARY_COLOR }} />
                                    <Check
                                        className='w-3 h-3 md:w-4 md:h-4 absolute -bottom-0.5 -right-0.5 bg-white rounded-full border'
                                        style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
                                    />
                                </div>
                                <div>
                                    <h3 className='text-base md:text-lg font-semibold text-black'>
                                        Quality Job
                                    </h3>
                                </div>
                            </div>

                            {/* Feature 2: Resume builder */}
                            <div className='flex items-start gap-3'>
                                <div
                                    className='w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0'
                                    style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                                >
                                    <FileText className='w-5 h-5 md:w-6 md:h-6' style={{ color: PRIMARY_COLOR }} />
                                </div>
                                <div>
                                    <h3 className='text-base md:text-lg font-semibold text-black'>
                                        Resume builder
                                    </h3>
                                </div>
                            </div>

                            {/* Feature 3: Top Companies */}
                            <div className='flex items-start gap-3'>
                                <div
                                    className='w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0 relative'
                                    style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                                >
                                    <Shield className='w-5 h-5 md:w-6 md:h-6' style={{ color: PRIMARY_COLOR }} />
                                    <Star className='w-3 h-3 md:w-4 md:h-4 absolute -bottom-0.5 -right-0.5' style={{ color: PRIMARY_COLOR }} fill='currentColor' />
                                </div>
                                <div>
                                    <h3 className='text-base md:text-lg font-semibold text-black'>
                                        Top Companies
                                    </h3>
                                </div>
                            </div>

                            {/* Feature 4: Top Talents */}
                            <div className='flex items-start gap-3'>
                                <div
                                    className='w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0 relative'
                                    style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR_LIGHT }}
                                >
                                    <Shield className='w-5 h-5 md:w-6 md:h-6' style={{ color: PRIMARY_COLOR }} />
                                    <Star className='w-3 h-3 md:w-4 md:h-4 absolute -bottom-0.5 -right-0.5' style={{ color: PRIMARY_COLOR }} fill='currentColor' />
                                </div>
                                <div>
                                    <h3 className='text-base md:text-lg font-semibold text-black'>
                                        Top Talents
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dotted Line Separator */}
                <div className='mt-12 md:mt-16 lg:mt-20 w-full border-t-2 border-dashed' style={{ borderColor: PRIMARY_COLOR }}></div>
            </section>

            <NewsBlogV2/>
            <Footer />
        </div>
    )
}

export default AboutUs
"use client"
import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush, FaStopwatch, FaUserNurse } from "react-icons/fa";
import React from 'react';
//import ConsultationForm from '../../ConsultationForm';
// import ClientCarousel from "../../components/ClientCarousal";
import HeroSection from "../../Servicesfooter/HeroSection";
import RecruitingProcess from "../../Servicesfooter/RecruitingProcess";
import HowWeHelpSection from "../../Servicesfooter/HowWeHelpSection";
import Highlights from "../../Servicesfooter/Highlights";
import Faqs from "../../Servicesfooter/Faqs";
import './style.css';
import { useEffect } from "react";
import { metaConstants } from "../../../utils/metaConstants";

const heroSectionData = {
    subheading: 'FINANCE AND ACCOUNTING RECRUITMENT',
    heading: 'Finance & Accounting Recruitment That Fits Your Business',
    list: [
        {
            text: 'Recruitment support for finance and accounting roles'
        },
        {
            text: 'Role-based screening for accounts and finance hiring'
        },
        {
            text: 'Hiring support for accounts and finance teams'
        },
    ]
}

const section2Data = {
    heading: 'Our Hiring Experience, Turning Vision Into Reality.',
    text: 'EarlyJobs helps employers hire finance and accounting professionals for roles such as accounting, audit, taxation, financial planning and analysis, and related functions. Scope, timelines, and commercial terms are agreed for each hiring requirement.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Expertise',
        text: 'EarlyJobs has specialised knowledge of finance and accounting roles. The team reviews qualifications, skills, and experience against the requirements you share.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-saving',
        text: 'Hiring for accounts and finance positions can be a time-consuming process, involving screening resumes, conducting interviews, and performing reference checks. By outsourcing this task to a recruitment consultancy, you can save time and focus on other important business activities.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Access to a wider pool of candidates',
        text: 'EarlyJobs can search a wider set of finance and accounting candidates, including people who are not actively applying but are open to a relevant role.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Reduced hiring costs',
        text: 'Commercial terms are agreed with the employer for the hiring requirement. EarlyJobs does not publish a standard fee on this page.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Faster hiring process',
        text: 'Recruiters work from the role requirements you share. Timelines depend on the role, location, and candidate availability.',
        icon: <FaStopwatch className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Expert advice and support',
        text: 'EarlyJobs can discuss market context and the hiring requirement with you. Salary figures and assessments are used only when they are part of the agreed process.',
        icon: <FaUserNurse className='service-page-s3-item-icon'/>
    },
]

const section4HighlightData = [
    {
        heading: 'Expertise in Accounts & Finance',
        text: 'Experts in recruiting accounting and finance professionals. Extensive industry knowledge, compliance with financial regulations, and ability to find skilled candidates for diverse roles.'
    },
    {
        heading: 'Industry Insights',
        text: 'We provide informed insights on accounting and finance industry trends, regulations, and advancements, guiding your recruitment process with expertise in emerging areas and industry-specific challenges.'
    },
    {
        heading: 'Client Satisfaction',
        text: 'Client satisfaction is key. Success measured by placements and positive impact on finance functions. Dedicated to exceptional service, seamless recruitment, and meeting needs.'
    },
    {
        heading: 'Ongoing Support',
        text: 'We provide continuous support for successful integration. Assistance available for any post-placement concerns, ensuring a smooth transition for hired professional'
    },
]

const servicePageAccordianData = [
    {
        label: 'How does EarlyJobs match candidates with job opportunities?',
        content: 'EarlyJobs uses a combination of advanced algorithms and personalized assessments to match candidates with job opportunities that align with their skills, experience, and career goals. Our team also conducts thorough interviews to ensure a good fit.'
    },
    {
        label: 'What industries does EarlyJobs specialize in?',
        content: 'EarlyJobs specializes in a wide range of industries including technology, BPO, finance, marketing, engineering, and more. Our diverse network allows us to cater to various sectors and provide specialized recruitment services.'
    },
    {
        label: 'What is the process for employers to start working with EarlyJobs?',
        content: 'Employers can start working with EarlyJobs by contacting our team through our website or directly reaching out to our sales department. We will discuss your hiring needs, provide a customized recruitment plan, and begin sourcing and screening candidates.'
    },
    {
        label: 'How does EarlyJobs ensure the quality of candidates?',
        content: 'Candidate review focuses on the role requirements shared by the employer. Specific checks or assessments are used only when they are part of the agreed process.'
    },
    {
        label: 'Is there a fee for candidates to use EarlyJobs services?',
        content: 'Recruitment fees are agreed with the employer under the applicable commercial terms.'
    },
];

const FinanceAccountingServicePage = () => {

  

    return (
        <div className="service-page-container">
            <HeroSection heroSectionData={heroSectionData} />
            <HowWeHelpSection section2Data={section2Data} />
            <section className='service-page-s3-con'>
                <RecruitingProcess section3Data={section3Data} />
            </section>
            <section className='service-page-s4-con'>
                <div className='service-page-s4-content'>
                    <h2 className="service-page-s4-heading">WELCOME TO OUR ACCOUNTS & FINANCE RECRUITMENT SERVICES</h2>
                    <p className="service-page-s4-text">
                        EarlyJobs helps employers hire finance and accounting professionals. Recruitment support covers the role requirements you share, including accounting, audit, taxation, and financial planning and analysis.
                        <br />
                        <br />
                        The team reviews candidates against those requirements. Scope, timelines, and commercial terms are agreed for each hiring requirement.
                    </p>
                    <h2 className="service-page-s4-heading">YOUR PATH TO BUILDING A HIGH-PERFORMING FINANCE TEAM</h2>
                    <p className="service-page-s4-text">
                        Is your organization struggling to find skilled accounting and finance professionals who can meet your financial objectives? Our recruitment services provide a strategic solution to bridge the talent gap, ensuring your team is equipped to drive financial excellence and profitability.
                        <br />
                        <br />
                        Through our comprehensive screening process and rigorous evaluations, we identify candidates who possess not only the required technical skills but also the ability to adapt to dynamic financial environments. We connect you with professionals who align with your goals, understand industry trends, and can provide valuable insights to support informed financial decision-making.
                    </p>
                    <h2 className="service-page-s4-heading">WHY CHOOSE OUR ACCOUNTS & FINANCE RECRUITMENT SERVICES</h2>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <h2 className="service-page-s4-subheading">Ready to Transform Your Accounts and Finance Department?</h2>
                    <p className="service-page-s4-text">EarlyJobs supports accounts and finance hiring for the roles you need to fill. Share the role, location, and timeline, and the team will review the requirement. This page covers finance and accounting recruitment. It does not describe executive search.</p>
                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/Finance-Recruitment-Services.png" draggable={false} alt="Finance and accounting recruitment" className="service-page-s4-image"/>
                    <div className='service-page-s4-consultancy-content'>
                        {/* <div className='service-page-s4-consultancy-heading-con'>
                            <ConsultationForm />
                        </div> */}
                    </div>
                </div>
            </section>
            <Faqs servicePageAccordianData={servicePageAccordianData} />
            {/* <section className='service-page-s6-con'>
                <ClientCarousel />
            </section> */}
        </div>
    )
}

export default FinanceAccountingServicePage;
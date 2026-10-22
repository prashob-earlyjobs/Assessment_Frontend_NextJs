"use client"
import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush } from "react-icons/fa";
import React from 'react';


import HeroSection from "../../Servicesfooter/HeroSection";
import RecruitingProcess from "../../Servicesfooter/RecruitingProcess";
import HowWeHelpSection from "../../Servicesfooter/HowWeHelpSection";
import Highlights from "../../Servicesfooter/Highlights";
import Faqs from "../../Servicesfooter/Faqs";
import './style.css';

const heroSectionData = {
    subheading: 'IT recruitment',
    plainSubheading: true,
    heading: 'IT Recruitment Services for Growing Technology Teams',
    list: [
        {
            text: 'Recruitment support for technology roles you define'
        },
        {
            text: 'Technical assessments are used only when agreed'
        },
        {
            text: 'Hiring outcomes are not guaranteed'
        },
    ]
}

const section2Data = {
    heading: 'Technology hiring for the roles you define',
    text: 'EarlyJobs helps employers define technology hiring requirements and connect them with recruiter-led sourcing. Technical assessments are used only when they are part of the agreed process.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Domain Specific Talent',
        text: 'Recruiters can work on technology roles across the industries you hire for. Results depend on the role.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-saving',
        text: 'Recruiters work from the role you share. EarlyJobs does not publish a time saving on this page.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Employee Stability',
        text: 'Tenure depends on the role, the employer, and the candidate. EarlyJobs does not promise longer tenure.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Replacement terms',
        text: 'Replacement or guarantee terms apply only when they are written into the applicable agreement. EarlyJobs does not promise a replacement on this page.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
]

const section4HighlightData = [
    {
        heading: 'Access to specialized expertise and guidance',
        text: 'EarlyJobs can discuss the technology hiring requirement with you. Salary figures and technical assessments are used only when they are part of the agreed process.'
    },
    {
        heading: 'Time and cost savings',
        text: 'Recruiters work from the role requirements you share. EarlyJobs does not publish a standard fee or a time saving on this page.'
    },
    {
        heading: 'Extensive network and database',
        text: 'Recruiters source candidates for the technology role you share. EarlyJobs does not publish a candidate-database size on this page.'
    },
    {
        heading: 'Reduced risk of hiring mistakes',
        text: 'Candidate review focuses on the requirements you share. EarlyJobs does not promise that a shortlist removes hiring risk.'
    },
    {
        heading: 'Support during the on-boarding process',
        text: 'EarlyJobs can support coordination after an offer when that support is part of the agreed process. Background checks are used only when they are part of that process.'
    },
    {
        heading: "Understanding the company's needs and requirements",
        text: 'EarlyJobs starts from the skills, qualifications, and role requirements you share.'
    },
    {
        heading: 'Sourcing the right candidates',
        text: 'Sourcing follows the role you share. Screening and interviews are used only when they are part of the agreed process.'
    },
    {
        heading: 'Assessing candidates skills and qualifications',
        text: "Candidate review focuses on the technology requirements you share. Technical assessments are used only when they are part of the agreed process."
    },
]

const servicePageAccordianData = [
    {
        label: 'How does EarlyJobs match candidates with job opportunities?',
        content: 'Candidate review focuses on the technology requirements you share. Specific checks are used only when they are part of the agreed process.'
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
        content: 'Candidate review focuses on the role requirements shared by the employer. Background checks are used only when they are part of the agreed process.'
    },
    {
        label: 'Is there a fee for candidates to use EarlyJobs services?',
        content: 'Recruitment fees are agreed with the employer under the applicable commercial terms.'
    },
];

const ITRecruitmentServicePage = () => {

  
    return (
        <div className="service-page-container">
            <HeroSection heroSectionData={heroSectionData} />
            <HowWeHelpSection section2Data={section2Data} />
            <section className='service-page-s3-con'>
                <RecruitingProcess section3Data={section3Data} />
            </section>
            <section className='service-page-s4-con'>
                <div className='service-page-s4-content'>
                    <h2 className="service-page-s4-heading service-page-heading-plain">IT recruitment with EarlyJobs</h2>
                    <p className="service-page-s4-text">EarlyJobs helps employers hire for information technology roles. Share the role, and recruiters work from those requirements.</p>
                    <h2 className="service-page-s4-subheading">Our expertise</h2>
                    <p className="service-page-s4-text">Recruiters source for the technology roles you define. Those roles can include developers, engineers, project managers, or IT support staff. Hiring outcomes are not guaranteed.</p>
                    <h2 className="service-page-s4-subheading">Tailored IT recruitment solutions</h2>
                    <p className="service-page-s4-text">The approach follows the role, locations, and process you agree. Technical assessments are used only when they are part of that process.</p>
                    <h2 className="service-page-s4-heading service-page-heading-plain">Key Highlights of Our IT Recruitment Services</h2>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <h2 className="service-page-s4-subheading">Let's Work Together</h2>
                    <p className="service-page-s4-text">Contact EarlyJobs to discuss the technology roles you need to hire. The next step is a conversation about the role, location, and timeline.</p>
                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/it-recruitment-services.webp" draggable={false} alt="it-recruitment-service" className="service-page-s4-image"/>
                    <div className='service-page-s4-consultancy-content'>
                        {/* <div className='service-page-s4-consultancy-heading-con'>
                            <ConsultationForm />
                        </div> */}
                    </div>
                </div>
            </section>
            <Faqs servicePageAccordianData={servicePageAccordianData} />
           
        </div>
    )
}

export default ITRecruitmentServicePage;
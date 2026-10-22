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
    subheading: 'IT RECRUITMENT',
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
    heading: 'IT Talents Recruitment Made Easier',
    text: 'EarlyJobs helps employers define technology hiring requirements and connect them with recruiter-led sourcing. Technical assessments are used only when they are part of the agreed process.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Domain Specific Talent',
        text: 'We specialize in impactful IT recruitment, matching businesses with candidates who create lasting results across diverse industries.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-saving',
        text: 'Recruitment agencies save time and find ideal candidates, making "time is money" more relevant than ever for businesses.',
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
        text: 'IT job consultancies have access to a wide network of qualified IT professionals. They have a database of potential candidates and can tap into their network to find suitable candidates for specific IT roles. This saves companies the effort of searching for qualified candidates on their own.'
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
        text: 'A job consultancy specializes in understanding the specific needs and requirements of IT companies when it comes to hiring IT professionals. They work closely with companies to identify the skills and qualifications necessary for different IT roles within the organization.'
    },
    {
        heading: 'Sourcing the right candidates',
        text: 'Job consultancies have extensive networks and databases of qualified IT professionals. They use their resources to source the right candidates for IT positions in companies. This includes reaching out to their network, advertising job openings, and conducting thorough screening and interviews to shortlist the most suitable candidates.'
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
                    <h2 className="service-page-s4-heading">WELCOME TO EARLYJOBS CONSULTANCY - YOUR IT RECRUITMENT PARTNER</h2>
                    <p className="service-page-s4-text">Are you searching for top talent in the world of Information Technology? Look no further than Earlyjobs, your trusted partner for IT recruitment solutions.</p>
                    <h2 className="service-page-s4-subheading">Our Expertise</h2>
                    <p className="service-page-s4-text">At Earlyjobs, we specialize in identifying and connecting your business with the best IT professionals available. With years of experience in the IT recruitment industry, our team of experts possesses a deep understanding of the evolving tech landscape. We are well-equipped to find the right candidates for your organization, whether you’re seeking developers, engineers, project managers, or IT support staff.</p>
                    <h2 className="service-page-s4-subheading">Tailored IT Recruitment Solutions</h2>
                    <p className="service-page-s4-text">We understand that every organization is unique, and your IT recruitment services needs are no exception. That’s why we offer tailored recruitment solutions to match your company’s culture, values, and objectives. Our consultants work closely with you to create customized recruitment strategies that ensure a perfect fit between your business and the candidates we present.</p>
                    <h2 className="service-page-s4-heading">KEY HIGHLIGHTS OF CHOOSE OUR IT RECRUITMENT SERVICES.</h2>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <h2 className="service-page-s4-subheading">Let's Work Together</h2>
                    <p className="service-page-s4-text">Partner with EarlyJobs for your IT recruitment services needs, and let us help you build a dynamic and high-performing IT team that drives your business forward. Contact us today to discuss your requirements and take the first step towards a brighter IT future.</p>
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
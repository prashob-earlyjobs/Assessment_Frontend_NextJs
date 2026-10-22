"use client"
import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush, FaStar } from "react-icons/fa";
import React from 'react';
// import ConsultationForm from '../../components/ConsultationForm';
// import ClientCarousel from "../../components/ClientCarousal";
import HeroSection from "../../Servicesfooter/HeroSection";
import RecruitingProcess from "../../Servicesfooter/RecruitingProcess";
import HowWeHelpSection from "../../Servicesfooter/HowWeHelpSection";
import Highlights from "../../Servicesfooter/Highlights";
import Faqs from "../../Servicesfooter/Faqs";
import './style.css';

const heroSectionData = {
    subheading: 'HR EXECUTIVE RECRUITMENT',
    heading: 'HR Executive Recruitment for People-Centred Businesses',
    list: [
        {
            text: 'Recruitment support for HR and people-operations roles'
        },
        {
            text: 'Role requirements are agreed before sourcing starts'
        },
        {
            text: 'Outcomes are not guaranteed'
        },
    ]
}

const section2Data = {
    heading: "Finding the right HR executive recruitment talent to drive your organization's success is crucial in today's competitive business landscape.",
    text: 'EarlyJobs helps employers connect HR hiring requirements with recruiter-led sourcing. Scope, timelines, and commercial terms are agreed for each requirement.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Executive Search',
        text: 'We understand that executive-level positions demand exceptional candidates. Our executive search services are tailored to identify, engage, and attract top-tier executives who will make a strategic impact on your organization.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'HR Talent Acquisition',
        text: "Your HR team is the backbone of your organization's people management. We assist you in recruiting HR professionals who not only have the right skills but also align with your company culture and values.",
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Candidate Screening and Assessment',
        text: 'Candidate review focuses on the role requirements you share. Assessments are used only when they are part of the agreed process.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Diversity and Inclusion Hiring',
        text: 'We are committed to helping you build a diverse and inclusive workforce. Our recruitment strategies promote diversity and ensure equal opportunities for all candidates.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Customized Recruitment Solutions',
        text: 'We understand that every organization is unique. Our team works closely with you to develop customized recruitment strategies that align with your specific goals and requirements.',
        icon: <FaStar className='service-page-s3-item-icon'/>
    }
]

const section4HighlightData = [
    {
        heading: 'Talent Mapping and Market Intelligence',
        text: 'HR consultancies leverage their vast networks and market knowledge to provide valuable insights. They can help organizations understand the competitive talent landscape, including compensation trends, skill shortages, and emerging industry benchmarks. This data-driven approach allows companies to make informed hiring decisions and develop effective talent strategies.'
    },
    {
        heading: 'Executive Search and Leadership Development',
        text: 'For executive-level positions, consultancies excel in executive search. They employ a rigorous process to identify and attract high-caliber candidates who possess the leadership qualities and industry expertise required for top roles. Furthermore, they often provide leadership development services to groom internal talent and ensure a seamless transition into leadership positions.'
    },
    {
        heading: 'Tailored Recruitment Strategies',
        text: 'One-size-fits-all recruitment doesn’t cut it anymore. HR consultancies work closely with their clients to develop customized recruitment strategies. These strategies take into account the unique culture, values, and goals of the organization, ensuring that candidates not only have the required skills but also align with the company’s vision.'
    },
    {
        heading: 'Diversity and Inclusion',
        text: 'Promoting diversity and inclusion is a top priority for many organizations today. HR consultancies can play a crucial role in helping companies diversify their workforce. They employ inclusive recruitment practices and have access to a wide and diverse talent pool, ensuring that organizations can build teams that reflect the diverse world we live in.'
    },
    {
        heading: 'Time and Cost Efficiency',
        text: 'Timelines and commercial terms are agreed for the requirement. EarlyJobs does not promise a shorter time to fill or a lower hiring cost.'
    },
    {
        heading: 'Confidentiality and Compliance',
        text: 'Confidentiality follows the process agreed for the role. EarlyJobs does not provide legal advice on this page.'
    },
]

const servicePageAccordianData = [
    {
        label: 'How does EarlyJobs match candidates with job opportunities?',
        content: 'Candidate review focuses on the role requirements shared by the employer. Specific checks or assessments are used only when they are part of the agreed process.'
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

const HrExecutiveServicePage = () => {

   

    return (
        <div className="service-page-container">
            <HeroSection heroSectionData={heroSectionData} />
            <HowWeHelpSection section2Data={section2Data} />
            <section className='service-page-s3-con'>
                <RecruitingProcess section3Data={section3Data} />
            </section>
            <section className='service-page-s4-con'>
                <div className='service-page-s4-content'>
                    <h2 className="service-page-s4-subheading">HR & Executive Recruitment Experts</h2>
                    <p className="service-page-s4-text">
                        EarlyJobs takes a strategic approach to attracting, developing and managing a global workforce. The aim is to enable all people to create the career they want by being trusted partners in their professional and personal growth. We provide expertise and resources designed to help colleagues thrive at the firm and in their life outside it.
                        <br />
                        <br />
                        Our placement consultancy and services specializes in sourcing and placing highly skilled HR & executives, including EA, Customer Support, D2C, Executive Head etc.
                    </p>
                    <h2 className="service-page-s4-heading service-page-heading-plain">The strategic role of HR and executive recruitment by EarlyJobs</h2>
                    <p className="service-page-s4-text">In today’s highly competitive business landscape, organizations recognize that their most valuable assets are their people. To thrive and stay ahead of the competition, it’s essential to attract, retain, and develop top talent. This is where HR and executive recruitment consultancies play a pivotal role.</p>
                    
                    <h3 className="service-page-s4-small-heading">Understanding HR and Executive Recruitment Consultancies</h3>
                    <p className="service-page-s4-text">HR and executive recruitment consultancies are specialized firms that help organizations identify, attract, and hire top-tier talent for various roles within the company. Their expertise extends from entry-level positions to executive leadership roles, making them a valuable partner for businesses of all sizes and industries.</p>
                    <h3 className="service-page-s4-small-heading">The Evolving HR Landscape</h3>
                    <p className="service-page-s4-text">Over the years, the HR landscape has transformed significantly. It’s no longer just about posting job ads and conducting interviews. HR consultancies have adapted to the changing needs of organizations, offering a wide range of services that go beyond basic recruitment. Here are some key aspects of their strategic role:</p>

                    <Highlights section4HighlightData={section4HighlightData} />
                    <p className="service-page-s4-text">In today’s dynamic business environment, HR and executive recruitment consultancies have evolved into strategic partners for organizations. Their deep industry knowledge, tailored recruitment strategies, and commitment to diversity and inclusion make them indispensable in the quest for top talent. By leveraging their expertise, businesses can not only attract the best candidates but also build a workforce that drives innovation and sustainable growth. The strategic role of HR and executive recruitment consultancies is clear: they are the catalysts that help organizations shape their future through exceptional talent acquisition and development.</p>
                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/HR-Exective.webp" draggable={false} alt="it-recruitment-service" className="service-page-s4-image"/>
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

export default HrExecutiveServicePage;
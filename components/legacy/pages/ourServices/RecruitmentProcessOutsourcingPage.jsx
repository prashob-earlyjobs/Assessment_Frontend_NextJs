"use client"
import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush, FaStopwatch, FaUserNurse } from "react-icons/fa";
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
    subheading: 'Recruitment process outsourcing',
    plainSubheading: true,
    heading: 'Recruitment process outsourcing for the hiring plan you share.',
    list: [
        {
            text: 'The work follows the roles, locations, and process you agree'
        },
        {
            text: 'Sourcing and screening use the qualifications you specify'
        },
        {
            text: 'Hiring outcomes are not guaranteed'
        },
    ]
}

const section2Data = {
    heading: 'Recruitment support shaped around your hiring plan',
    text: 'EarlyJobs can manage the recruitment activities that are part of an agreed recruitment process outsourcing engagement. Scope and commercial terms are confirmed in the applicable agreement.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Expertise',
        text: 'Recruiters work from the hiring requirements you share. A shortlist is not guaranteed.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-saving',
        text: 'EarlyJobs can take on the recruitment activities included in the agreement. EarlyJobs does not publish a time saving on this page.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Access to a wider pool of candidates',
        text: 'Sourcing follows the roles you share. EarlyJobs does not publish a candidate-database size on this page.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Reduced hiring costs',
        text: 'Commercial terms are confirmed in the applicable agreement. EarlyJobs does not publish a fee or a cost saving on this page.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Faster hiring process',
        text: 'Recruiters begin from the hiring plan you share. EarlyJobs does not promise a faster hiring cycle on this page.',
        icon: <FaStopwatch className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Expert advice and support',
        text: 'Market or salary discussion happens only when it is part of the agreed process.',
        icon: <FaUserNurse className='service-page-s3-item-icon'/>
    },
]


const section4HighlightData = [
    {
        heading: 'E2E',
        text: 'End-to-end recruitment support applies only when that scope is written into the agreement.'
    },
    {
        heading: 'Focused RPO',
        text: 'EarlyJobs works from the hiring requirement you share. Outcomes depend on the role and the process you agree.'
    },
    {
        heading: 'Limited RPO',
        text: 'A shorter engagement follows the roles and timeline you agree. Hiring outcomes are not guaranteed.'
    },
    {
        heading: 'Components',
        text: 'Recruiters, reporting, and systems are included only when they are part of the agreed engagement.'
    },
]

const servicePageAccordianData = [
    {
        label: 'How does EarlyJobs match candidates with job opportunities?',
        content: 'Candidate review focuses on the requirements you share. Specific checks are used only when they are part of the agreed process.'
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

const RecruitmentProcessOutsourcingPage = () => {

   

    return (    
        <div className="service-page-container">
            <HeroSection heroSectionData={heroSectionData} />
            <HowWeHelpSection section2Data={section2Data} />
            <section className='service-page-s3-con'>
                <RecruitingProcess section3Data={section3Data} />
            </section>  
            <section className='service-page-s4-con'>
                <div className='service-page-s4-content'>
                    <h2 className="service-page-s4-heading service-page-heading-plain">How EarlyJobs supports recruitment process outsourcing</h2>
                    <p className="service-page-s4-text">
                    EarlyJobs can manage the recruitment activities that are part of an agreed recruitment process outsourcing engagement. The work follows the hiring plan, roles, and process you share.
                        <br />
                        <br />
                        Sourcing and screening use the qualifications you specify. EarlyJobs does not promise a particular shortlist size or hiring outcome.
                        <br />
                        <br />
                        Where onboarding support is part of the agreement, the team can coordinate that step with you. Commercial terms are confirmed in the applicable agreement.
                    </p>
                    <h2 className="service-page-s4-heading service-page-heading-plain">EarlyJobs HR advantages</h2>
                    <p className="service-page-s4-text">
                        The engagement follows the hiring plan you share. Compliance support, reporting, and applicant communication are included only when they are written into the agreement.
                    </p>
                    <h2 className="service-page-s4-heading service-page-heading-plain">Scope of work</h2>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <h2 className="service-page-s4-subheading">Discuss your hiring plan</h2>
                    <p className="service-page-s4-text">Contact EarlyJobs to discuss a recruitment process outsourcing engagement. Scope and commercial terms are confirmed in the applicable agreement.</p>

                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/Finance-Recruitment-Services.png" draggable={false} alt="Recruitment process outsourcing" className="service-page-s4-image"/>
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

export default RecruitmentProcessOutsourcingPage;
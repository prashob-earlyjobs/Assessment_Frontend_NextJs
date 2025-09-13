"use client"
import React, { useEffect, useState } from 'react';
import { FaLinkedin } from "react-icons/fa";
import { MutatingDots } from 'react-loader-spinner';
import { metaConstants } from '../utils/metaConstants';
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';
import Navbar from '../components/pages/navbar';
const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
} as const;

type TeamMember = {
    id: string;
    name: string;
    designation: string;
    category: string;
    position: string;
    imageUrl: string;
    linkedInUrl: string;
    experience: number;
    certifiedBy: string;
};

const TeamPage: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [apiStatus, setApiStatus] = useState<keyof typeof apiStatusConstants>('initial');

    useEffect(() => {
        fetchMemberCards();
        window.scrollTo(0, 0);
        document.title = metaConstants.team.title;

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.team.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.team.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.team.description);
        }

        return () => {
            document.title = metaConstants.title;
            if (metaDescription) {
                metaDescription.setAttribute('content', metaConstants.description);
            }
            if (metaKeywords) {
                metaKeywords.setAttribute('content', metaConstants.keywords);
            }
            if (metaSubject) {
                metaSubject.setAttribute('content', metaConstants.description);
            }
        };
    }, []);

    const fetchMemberCards = async () => {
        try {
            const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL_IN.slice(0, -4);

            const response = await fetch(`${backendURL}/admin/teams`);
            const data = await response.json();
            if (response.ok) {
                const formattedData = data.map((member: any) => ({
                    id: member.id,
                    name: member.name,
                    designation: member.designation,
                    category: member.category,
                    position: member.position,
                    imageUrl: member.image_url,
                    linkedInUrl: member.linkedIn_url,
                    experience: member.experience_in_years,
                    certifiedBy: member.certified_by
                }));
                setTeamMembers(formattedData);
                setApiStatus('success');
            } else {
                console.error('Error fetching member cards:', data);
                setApiStatus('failure');
            }
        } catch (error) {
            setApiStatus('failure');
            console.error('Error fetching member cards:', error);
        }
    };

    const renderTeamCards = () => {
        const seniorRecruiters = teamMembers.filter(member => member.category === 'Senior Recruiter');
        const leadRecruiters = teamMembers.filter(member => member.category === 'Lead Recruiter');
        const freelanceRecruiters = teamMembers.filter(member => member.category === 'Freelance Recruiter');
        const agency = teamMembers.filter(member => member.category === 'Agency');
        const operatingTeam = teamMembers.filter(member => member.category === 'Operating Team');
        
        return (
            
            <div className="px-8 py-16 sm:px-6 sm:py-12 max-w-7xl mx-auto">
                {seniorRecruiters.length > 0 && (
                    <>
                        {/* <h1 className="text-center text-4xl sm:text-3xl font-semibold text-[#EB6A4D] mb-10">Senior Recruiters</h1> */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none p-0">
                            {seniorRecruiters.map(member => (
                                <li
                                    key={member.id}
                                    className="border border-[#EB6A4D] rounded-lg w-full max-w-[280px] mx-auto text-center hover:shadow-[0_0_15px_0_#EB6A4D] transition-shadow duration-300"
                                >
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        draggable="false"
                                        className="w-full h-[270px] sm:h-[290px] object-cover rounded-t-lg select-none"
                                    />
                                    <div className="p-6 flex flex-col items-start gap-3">
                                        <h3 className="text-xl font-semibold text-[#EB6A4D]">{member.name}</h3>
                                        <p className="text-base font-normal text-gray-600">{member.designation}</p>
                                        <a
                                            href={member.linkedInUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#EB6A4D] hover:text-[#d35a3f] transition-colors"
                                        >
                                            <FaLinkedin className="text-2xl" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-12 sm:my-8 border-gray-300" />
                    </>
                )}

                {leadRecruiters.length > 0 && (
                    <>
                        <h1 className="text-center text-4xl sm:text-3xl font-semibold text-[#EB6A4D] mb-10">Lead Recruiters</h1>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none p-0">
                            {leadRecruiters.map(member => (
                                <li
                                    key={member.id}
                                    className="border border-[#EB6A4D] rounded-lg w-full max-w-[280px] mx-auto text-center hover:shadow-[0_0_15px_0_#EB6A4D] transition-shadow duration-300"
                                >
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        draggable="false"
                                        className="w-full h-[270px] sm:h-[290px] object-cover rounded-t-lg select-none"
                                    />
                                    <div className="p-6 flex flex-col items-start gap-3">
                                        <h3 className="text-xl font-semibold text-[#EB6A4D]">{member.name}</h3>
                                        <p className="text-base font-normal text-gray-600">{member.designation}</p>
                                        <p className="text-sm font-normal text-gray-600">{member.experience}+ years of experience</p>
                                        <hr className="w-[60%] border-[#EB6A4D]" />
                                        <p className="text-sm font-normal text-gray-600">
                                            Certified By - <span className="font-semibold text-[#EB6A4D]">{member.certifiedBy}</span>
                                        </p>
                                        <a
                                            href={member.linkedInUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#EB6A4D] hover:text-[#d35a3f] transition-colors"
                                        >
                                            <FaLinkedin className="text-2xl" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-12 sm:my-8 border-gray-300" />
                    </>
                )}

                {freelanceRecruiters.length > 0 && (
                    <>
                        <h1 className="text-center text-4xl sm:text-3xl font-semibold text-[#EB6A4D] mb-10">Freelance Recruiters</h1>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none p-0">
                            {freelanceRecruiters.map(member => (
                                <li
                                    key={member.id}
                                    className="border border-[#EB6A4D] rounded-lg w-full max-w-[280px] mx-auto text-center hover:shadow-[0_0_15px_0_#EB6A4D] transition-shadow duration-300"
                                >
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        draggable="false"
                                        className="w-full h-[270px] sm:h-[290px] object-cover rounded-t-lg select-none"
                                    />
                                    <div className="p-6 flex flex-col items-start gap-3">
                                        <h3 className="text-xl font-semibold text-[#EB6A4D]">{member.name}</h3>
                                        <p className="text-base font-normal text-gray-600">{member.designation}</p>
                                        <p className="text-sm font-normal text-gray-600">{member.experience}+ years of experience</p>
                                        <hr className="w-[60%] border-[#EB6A4D]" />
                                        <p className="text-sm font-normal text-gray-600">
                                            Certified By - <span className="font-semibold text-[#EB6A4D]">{member.certifiedBy}</span>
                                        </p>
                                        <a
                                            href={member.linkedInUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#EB6A4D] hover:text-[#d35a3f] transition-colors"
                                        >
                                            <FaLinkedin className="text-2xl" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-12 sm:my-8 border-gray-300" />
                    </>
                )}

                {agency.length > 0 && (
                    <>
                        <h1 className="text-center text-4xl sm:text-3xl font-semibold text-[#EB6A4D] mb-10">Agency</h1>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none p-0">
                            {agency.map(member => (
                                <li
                                    key={member.id}
                                    className="border border-[#EB6A4D] rounded-lg w-full max-w-[280px] mx-auto text-center hover:shadow-[0_0_15px_0_#EB6A4D] transition-shadow duration-300"
                                >
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        draggable="false"
                                        className="w-full h-[270px] sm:h-[290px] object-cover rounded-t-lg select-none"
                                    />
                                    <div className="p-6 flex flex-col items-start gap-3">
                                        <h3 className="text-xl font-semibold text-[#EB6A4D]">{member.name}</h3>
                                        <p className="text-base font-normal text-gray-600">{member.designation}</p>
                                        <p className="text-sm font-normal text-gray-600">{member.experience}+ years of experience</p>
                                        <hr className="w-[60%] border-[#EB6A4D]" />
                                        <p className="text-sm font-normal text-gray-600">
                                            Certified By - <span className="font-semibold text-[#EB6A4D]">{member.certifiedBy}</span>
                                        </p>
                                        <a
                                            href={member.linkedInUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#EB6A4D] hover:text-[#d35a3f] transition-colors"
                                        >
                                            <FaLinkedin className="text-2xl" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-12 sm:my-8 border-gray-300" />
                    </>
                )}

                {operatingTeam.length > 0 && (
                    <>
                        <h1 className="text-center text-4xl sm:text-3xl font-semibold text-[#EB6A4D] mb-10">Operating Team</h1>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 list-none p-0">
                            {operatingTeam.map(member => (
                                <li
                                    key={member.id}
                                    className="border border-[#EB6A4D] rounded-lg w-full max-w-[280px] mx-auto text-center hover:shadow-[0_0_15px_0_#EB6A4D] transition-shadow duration-300"
                                >
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        draggable="false"
                                        className="w-full h-[270px] sm:h-[290px] object-cover rounded-t-lg select-none"
                                    />
                                    <div className="p-6 flex flex-col items-start gap-3">
                                        <h3 className="text-xl font-semibold text-[#EB6A4D]">{member.name}</h3>
                                        <p className="text-base font-normal text-gray-600">{member.designation}</p>
                                        <p className="text-sm font-normal text-gray-600">{member.experience}+ years of experience</p>
                                        <hr className="w-[60%] border-[#EB6A4D]" />
                                        <p className="text-sm font-normal text-gray-600">
                                            Certified By - <span className="font-semibold text-[#EB6A4D]">{member.certifiedBy}</span>
                                        </p>
                                        <a
                                            href={member.linkedInUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#EB6A4D] hover:text-[#d35a3f] transition-colors"
                                        >
                                            <FaLinkedin className="text-2xl" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    };

    const renderNoMembers = () => (
        <div className="flex justify-center items-center py-16">
            <p className="text-lg text-gray-600">No team members available</p>
        </div>
    );

    const renderLoading = () => (
        <div className="flex justify-center items-center py-16">
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#EB6A4D"
                secondaryColor="#EB6A4D"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );

    const renderFailure = () => (
        <div className="flex flex-col justify-center items-center py-16">
            <p className="text-lg text-gray-600 mb-6">Failed to load the page. Please try again later.</p>
            <button
                className="bg-[#EB6A4D] text-white px-6 py-3 rounded-lg hover:bg-[#d35a3f] transition-colors"
                onClick={fetchMemberCards}
            >
                Try Again
            </button>
        </div>
    );

    const renderSwitch = () => {
        switch (apiStatus) {
            case 'loading':
                return renderLoading();
            case 'success':
                return teamMembers.length > 0 ? renderTeamCards() : renderNoMembers();
            case 'failure':
                return renderFailure();
            default:
                return null;
        }
    };

    return (
        <>
        <Navbar />
        <Header/>
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#EB6A4D] py-4">
                <h1 className="text-center text-5xl sm:text-4xl font-bold text-white">Meet Our Team</h1>
            </div>
            {renderSwitch()}
        </div>
        <Footer />
        </>
    );
};

export default TeamPage;
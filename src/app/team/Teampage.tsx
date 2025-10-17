"use client";
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
    }, []);

    const fetchMemberCards = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/team/team-members`);
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
        const groupedByPosition = teamMembers.reduce((acc, member) => {
            const pos = member.position;
            if (!acc[pos]) {
                acc[pos] = [];
            }
            acc[pos].push(member);
            return acc;
        }, {} as Record<string, TeamMember[]>);

        const sortedPositions = Object.keys(groupedByPosition).sort((a, b) => Number(a) - Number(b));

        return (
            <div className="px-4 py-12 sm:px-6 sm:py-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
                {sortedPositions.map((position) => (
                    <ul key={position} className="w-full">
                        {groupedByPosition[position].map((member) => (
                            <li
                                key={member.id}
                                className="border border-[#EB6A4D] rounded-lg w-full max-w-[280px] mx-auto h-auto flex-shrink-0 text-center hover:shadow-[0_0_15px_0_#EB6A4D] transition-shadow duration-300"
                            >
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    draggable="false"
                                    className="w-full h-[270px] sm:h-[270px] object-cover rounded-t-lg select-none"
                                />
                                <div className="p-4 flex flex-col items-start gap-2">
                                    <h3 className="text-xl sm:text-lg font-semibold text-[#EB6A4D]">{member.name}</h3>
                                    <p className="text-base sm:text-sm font-normal text-gray-600">{member.designation}</p>
                                    <a
                                        href={member.linkedInUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#EB6A4D] hover:text-[#d35a3f] transition-colors"
                                    >
                                        <FaLinkedin className="text-2xl sm:text-xl" />
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        );
    };

    const renderNoMembers = () => (
        <div className="flex justify-center items-center py-12 sm:py-16">
            <p className="text-lg sm:text-base text-gray-600">No team members available</p>
        </div>
    );

    const renderLoading = () => (
        <div className="flex justify-center items-center py-12 sm:py-16">
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
        <div className="flex flex-col justify-center items-center py-12 sm:py-16">
            <p className="text-lg sm:text-base text-gray-600 mb-6">Failed to load the page. Please try again later.</p>
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
            <Header />
            <div className="min-h-screen bg-gray-50">
                <div className="bg-[#EB6A4D] py-4 sm:py-3">
                    <h1 className="text-center text-5xl sm:text-3xl font-bold text-white">Meet Our Team</h1>
                </div>
                {renderSwitch()}
            </div>
            <Footer />
        </>
    );
};

export default TeamPage;
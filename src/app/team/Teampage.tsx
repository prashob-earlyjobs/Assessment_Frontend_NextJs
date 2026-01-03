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
    biography?: string;
    type?: string;
};

const TeamPage: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [apiStatus, setApiStatus] = useState<keyof typeof apiStatusConstants>('initial');
    const [selectedCategory, setSelectedCategory] = useState<string>('Core team');
    const [expandedBiographies, setExpandedBiographies] = useState<Set<string>>(new Set());

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
                    certifiedBy: member.certified_by,
                    biography: member.biography || member.description || '',
                    type: member.type
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

    const getTabOptions = () => {
        // Fixed tabs as per requirements
        const tabs = [
            
            'Core team',
            // 'Franchise team',
            'Advisor team',
            'Freelance recruiters'
        ];
        
        // Ensure selectedCategory is valid, reset to 'All' if not
        if (!tabs.includes(selectedCategory)) {
            setSelectedCategory('Core team');
        }
        
        return tabs;
    };

    const getFilteredMembers = () => {
        console.log(selectedCategory);
        if (selectedCategory === 'Core team') {
            return teamMembers.filter(member => member.type === 'core');
        }else if (selectedCategory === 'Franchise team') {
            return teamMembers.filter(member => member.type === 'franchise');
        }else if (selectedCategory === 'Advisor team') {
            return teamMembers.filter(member => member.type === 'advisor');
        }else if (selectedCategory === 'Freelance recruiters') {
            return teamMembers.filter(member => member.type === 'freelance');
        }
       
    };

    const renderTabs = () => {
        const tabs = getTabOptions();
        const activeIndex = tabs.indexOf(selectedCategory);
        
        if (activeIndex === -1 || tabs.length === 0) {
            return null;
        }
        
        return (
            <div className="px-3 sm:px-6 max-w-7xl mx-auto mb-6 sm:mb-10">
                <div className="flex justify-center w-full">
                    <div className="w-full overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <div className="flex justify-start sm:justify-center gap-2 sm:gap-4 border-b border-gray-200 pb-2 sm:pb-1 min-w-max sm:min-w-0">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedCategory(tab)}
                                    className={`relative px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                                        selectedCategory === tab
                                            ? 'text-[#EB6A4D]'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {tab}
                                    {selectedCategory === tab && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EB6A4D] rounded-full"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <style dangerouslySetInnerHTML={{__html: `
                    .overflow-x-auto::-webkit-scrollbar {
                        display: none;
                    }
                `}} />
            </div>
        );
    };

    const renderTeamCards = () => {
        const filteredMembers = getFilteredMembers();
        
        if (filteredMembers.length === 0) {
            return (
                <div className="flex justify-center items-center py-12 sm:py-16">
                    <p className="text-lg sm:text-base text-gray-600">No team members found in this category</p>
                </div>
            );
        }

        const groupedByPosition = filteredMembers.reduce((acc, member) => {
            const pos = member.position;
            if (!acc[pos]) {
                acc[pos] = [];
            }
            acc[pos].push(member);
            return acc;
        }, {} as Record<string, TeamMember[]>);

        const sortedPositions = Object.keys(groupedByPosition).sort((a, b) => Number(a) - Number(b));

        return (
            <div className="px-3 sm:px-6 py-6 sm:py-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {sortedPositions.map((position) => (
                        groupedByPosition[position].map((member) => (
                            <div
                                key={member.id}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start"
                            >
                                <div className="flex-shrink-0 w-full sm:w-[180px] md:w-[220px] aspect-square max-w-[160px] sm:max-w-[180px] md:max-w-[220px] mx-auto sm:mx-0">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        draggable="false"
                                        className="w-full h-full object-cover rounded-xl select-none"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col w-full min-w-0">
                                    <div className="flex items-start gap-2 sm:gap-3 mb-1 sm:mb-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 leading-tight break-words">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm sm:text-base md:text-lg font-normal text-gray-600 mb-2 sm:mb-3 break-words">
                                                {member.designation}
                                            </p>
                                        </div>
                                        {member.linkedInUrl && (
                                            <a
                                                href={member.linkedInUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[#0077b5] hover:text-[#005885] transition-colors flex-shrink-0 mt-0.5 sm:mt-1"
                                                aria-label={`${member.name}'s LinkedIn profile`}
                                            >
                                                <FaLinkedin className="text-lg sm:text-xl md:text-2xl" />
                                            </a>
                                        )}
                                    </div>
                                    {member.biography && (() => {
                                        const biographyLength = member.biography.length;
                                        const maxLength = 200; // Character limit before truncation
                                        const isLong = biographyLength > maxLength;
                                        const isExpanded = expandedBiographies.has(member.id);
                                        const displayText = isLong && !isExpanded 
                                            ? member.biography.substring(0, maxLength) + '...'
                                            : member.biography;

                                        return (
                                            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                <p className="text-gray-700 leading-relaxed break-words">{displayText}</p>
                                                {isLong && (
                                                    <button
                                                        onClick={() => {
                                                            const newExpanded = new Set(expandedBiographies);
                                                            if (isExpanded) {
                                                                newExpanded.delete(member.id);
                                                            } else {
                                                                newExpanded.add(member.id);
                                                            }
                                                            setExpandedBiographies(newExpanded);
                                                        }}
                                                        className="text-[#EB6A4D] hover:text-[#d35a3f] font-medium mt-2 text-xs sm:text-sm transition-colors"
                                                    >
                                                        {isExpanded ? 'Read less' : 'Read more'}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        ))
                    ))}
                </div>
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
                {/* <div className="py-6 sm:py-8">
                    <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 px-4">Meet our lean team</h1>
                </div> */}
                {apiStatus === 'success' && teamMembers.length > 0 && renderTabs()}
                <div 
                    className="pt-3 sm:pt-4 md:pt-6 transition-opacity duration-300 ease-in-out" 
                    key={selectedCategory}
                    style={{
                        animation: 'fadeIn 0.4s ease-out'
                    }}
                >
                    {renderSwitch()}
                </div>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}} />
            </div>
            <Footer />
        </>
    );
};

export default TeamPage;
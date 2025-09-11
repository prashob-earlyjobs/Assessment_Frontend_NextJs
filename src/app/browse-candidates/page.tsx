"use client"
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation';
import Footer from '../components/pages/footer';
import Header from '../components/pages/header';
import Navbar from '../components/pages/navbar';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Mock data
  const mockCandidates = [
    {
      _id: "6871e8c991f7f8a2e1874f6b",
      name: "Chris Reynolds",
      email: "chris@meetxo.ai",
      role: "candidate",
      mobile: "9611329404",
      avatar: "",
      profile: {
        professionalInformation: { workMode: "Full Time" },
        bio: "Proven software engineer excelling in automation, Python, and mentoring with 16 years of experience in delivering robust solutions.",
        preferredJobRole: "Senior Software Engineer"
      },
      skills: ["Python", "JavaScript", "Bash", "Docker", "AWS", "React", "Node.js", "MongoDB", "PostgreSQL", "Redis", "Git"],
      experience: [{ title: "Senior Software Engineer", company: "TechCorp Inc", duration: "2020-Present" }],
      createdAt: "2025-07-12T04:47:05.281+00:00"
    },
    {
      _id: "6871e8c991f7f8a2e1874f6c",
      name: "Amanda Chen",
      email: "amanda@meetxo.ai",
      role: "candidate",
      mobile: "9611329405",
      avatar: "",
      profile: {
        professionalInformation: { workMode: "Part Time" },
        bio: "AI and Math Expert, Educator, Trainer, Innovator, and Leader with 8 years of experience in machine learning and data science.",
        preferredJobRole: "AI Research Scientist"
      },
      skills: ["Mathematics", "AI & LLM Training", "Python", "TensorFlow", "PyTorch", "Data Science"],
      experience: [{ title: "AI Research Scientist", company: "AI Labs", duration: "2021-Present" }],
      createdAt: "2025-06-15T10:30:15.281+00:00"
    },
    {
      _id: "6871e8c991f7f8a2e1874f6d",
      name: "Alex Thompson",
      email: "alex@meetxo.ai",
      role: "candidate",
      mobile: "9611329406",
      avatar: "",
      profile: {
        professionalInformation: { workMode: "Full Time" },
        bio: "Python Developer specializing in Django, experienced in robust backend development with 3 years of hands-on experience.",
        preferredJobRole: "Backend Developer"
      },
      skills: ["Python", "Django", "Django Rest Framework", "PostgreSQL", "Docker", "Redis", "Celery", "AWS", "Git"],
      experience: [{ title: "Python Developer", company: "WebDev Solutions", duration: "2022-Present" }],
      createdAt: "2025-05-20T14:22:33.281+00:00"
    },
    {
      _id: "6871e8c991f7f8a2e1874f6e",
      name: "Aisha Kumar",
      email: "aisha@meetxo.ai",
      role: "candidate",
      mobile: "9611329407",
      avatar: "",
      profile: {
        professionalInformation: { workMode: "Contract" },
        bio: "Java Backend Developer with extensive Spring Boot expertise and leadership experience in building scalable enterprise applications.",
        preferredJobRole: "Senior Java Developer"
      },
      skills: ["Core Java", "Spring Boot", "Microservices", "MySQL", "MongoDB", "Kafka", "Docker", "Kubernetes"],
      experience: [{ title: "Senior Java Developer", company: "Enterprise Solutions Ltd", duration: "2020-Present" }],
      createdAt: "2025-04-18T09:15:22.281+00:00"
    },
    {
      _id: "6871e8c991f7f8a2e1874f6f",
      name: "Sophia Park",
      email: "sophia@meetxo.ai",
      role: "candidate",
      mobile: "9611329408",
      avatar: "",
      profile: {
        professionalInformation: { workMode: "Full Time" },
        bio: "Versatile digital marketing strategist enhancing ROI through innovative campaigns and data-driven approaches with proven results.",
        preferredJobRole: "Digital Marketing Manager"
      },
      skills: ["SEO", "SMM", "SEM", "Google Analytics", "Facebook Ads", "Content Strategy", "Email Marketing"],
      experience: [{ title: "Digital Marketing Manager", company: "Marketing Pro Agency", duration: "2022-Present" }],
      createdAt: "2025-03-10T16:45:11.281+00:00"
    },
    {
      _id: "6871e8c991f7f8a2e1874f70",
      name: "Samuel Singh",
      email: "samuel@meetxo.ai",
      role: "candidate",
      mobile: "9611329409",
      avatar: "",
      profile: {
        professionalInformation: { workMode: "Full Time" },
        bio: "Creative Java developer, excels in scalable web applications, AWS proficient with strong problem-solving and team collaboration skills.",
        preferredJobRole: "Full Stack Developer"
      },
      skills: ["Java 8/11/17", "Spring Boot", "React", "AWS", "Docker", "Microservices", "PostgreSQL", "Redis"],
      experience: [{ title: "Full Stack Developer", company: "Innovation Tech", duration: "2021-Present" }],
      createdAt: "2025-02-28T12:33:44.281+00:00"
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const calculateExperience = (candidate: any) => {
    if (candidate.experience?.length > 0) {
      return `${candidate.experience.length} years`;
    }
    const accountAge = new Date().getFullYear() - new Date(candidate.createdAt).getFullYear();
    return `${Math.max(1, accountAge)} years`;
  };

  const getSkillsDisplay = (candidate: any) => {
    if (candidate.skills?.length > 0) {
      return candidate.skills.slice(0, 3);
    }
    return ['Professional', 'Reliable', 'Dedicated'];
  };

  const getCommitmentBadges = (candidate: any) => {
    const workMode = candidate.profile?.professionalInformation?.workMode || 'Full Time';
    const badges = [workMode];
    if (workMode !== 'Contract') {
      badges.push('Contract');
    }
    return badges;
  };

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsDialogOpen(true);
    setIsSubmitted(false);
    setFormData({ name: '', companyName: '', email: '' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filter candidates based on search term in skills
  const filteredCandidates = mockCandidates.filter(candidate => {
    if (!searchTerm) return true;
    return candidate.skills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
     <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <Header />
        <div className="max-w-7xl mx-auto py-15 ">
          <div className='flex flex-col items-center justify-between lg:flex-row '>
          <div className="mb-8 ">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
              Candidate Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Discover talented professionals ready to join your team
            </p>
          </div>
          
          <div className="mb-8">
            <div className='w-[35rem]'>
              <input
                type="text"
                placeholder="Search by skills (e.g.,Sales, Management, React, Data Science...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div 
                key={candidate._id}
                className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-orange-100">
                        {candidate.avatar ? (
                          <img src={candidate.avatar} alt={candidate.name} className="h-full w-full rounded-full object-cover" />
                        ) : (
                          getInitials(candidate.name)
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 truncate">
                          {candidate.name}
                        </h3>
                        <span className="text-gray-500 text-sm font-medium">
                          | Exp: {calculateExperience(candidate)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {candidate.profile?.bio ? 
                          candidate.profile.bio.substring(0, 120) + (candidate.profile.bio.length > 120 ? '...' : '') :
                          `${candidate.role.charAt(0).toUpperCase() + candidate.role.slice(1)} with experience in various projects and technologies.`
                        }
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Expert in</h4>
                          <div className="flex flex-wrap gap-2">
                            {getSkillsDisplay(candidate).map((skill: string, index: number) => (
                              <span 
                                key={index} 
                                className="bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-200 text-xs px-2 py-1 rounded-md font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.skills?.length > 3 && (
                              <span className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                                +{candidate.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Commitment</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {getCommitmentBadges(candidate).map((commitment: string, index: number) => (
                              <span 
                                key={index}
                                className={index === 0 ? 
                                  "bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm font-medium" : 
                                  "border border-orange-200 text-orange-700 hover:bg-orange-50 px-3 py-1 rounded-md text-sm font-medium"
                                }
                              >
                                {commitment}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleViewProfile(candidate)}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        View profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog for Profile Form */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/20  flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Request {selectedCandidate?.name}'s Profile
                </h2>
                <p className="text-gray-600 mb-6">
                  Please fill out the form below to request {selectedCandidate?.name}'s profile details. After verification, the candidate's details will be sent to you.
                </p>
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                        className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFormSubmit}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you, {formData.name}, for your interest in {selectedCandidate?.name}'s profile. 
                  After verification, the candidate's details will be sent to you.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Index;
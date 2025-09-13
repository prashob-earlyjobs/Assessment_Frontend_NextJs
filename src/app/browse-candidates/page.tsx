
"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "../context";
import { toast } from "sonner";
import { userLogout } from "../components/services/servicesapis";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import Footer from "../components/pages/footer";
import Navbar from "../components/pages/navbar";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { userCredentials, setUserCredentials } = useUser();

  // Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/browseCandidates/candidates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch candidates');
        }

        const data = await response.json();
        if (data.success) {
          setCandidates(data.data);
        } else {
          throw new Error(data.message || 'Error fetching candidates');
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load candidates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (!response.success) {
        throw new Error("Logout failed");
      }
      toast.success("Logged out successfully!");
      setUserCredentials(null);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuItemClick = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
const calculateExperience = (candidate) => {
  if (candidate.experience?.length > 0) {
    const totalExperience = candidate.experience.reduce((acc, exp) => {
      const from = new Date(exp.from);
      const to = exp.to ? new Date(exp.to) : new Date();
      const years = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return acc + Math.round(years);
    }, 0);
    return `${totalExperience} years`;
  }
  const accountAge = new Date().getFullYear() - new Date(candidate.createdAt).getFullYear();
  return `${Math.max(1, accountAge)} years`;
};

  const getSkillsDisplay = (candidate) => {
    if (candidate.skills?.length > 0) {
      return candidate.skills.slice(0, 3);
    }
    return ["Professional", "Reliable", "Dedicated"];
  };

  const getCommitmentBadges = (candidate) => {
    const workMode = candidate.profile?.professionalInformation?.workMode || "Full Time";
    const badges = [workMode];
    if (workMode !== "Contract") {
      badges.push("Contract");
    }
    return badges;
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDialogOpen(true);
    setIsSubmitted(false);
    setFormData({ name: "", companyName: "", email: "" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const filteredCandidates = candidates.filter((candidate) => {
  if (!searchTerm) return true;
  return (candidate.skills || []).some((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );
});

  return (
    <>
      <Navbar />
      <header className="bg-white shadow-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-1 lg:py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                onClick={() => router.push("/")}
                alt="EarlyJobs.ai"
                className="h-12 lg:h-14 cursor-pointer"
              />
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              {userCredentials ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:bg-red-50 rounded-xl py-2 px-4 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                  </Button>
                  <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userCredentials.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        {userCredentials?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          ?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">{userCredentials.name}</span>
                  </div>
                </div>
              ) : (
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition-colors duration-200 font-semibold"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              )}
            </nav>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-orange-600 focus:outline-none p-3"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100">
              <div className="flex flex-col space-y-2">
                {userCredentials !== null && (
                  <div
                    className="flex items-center space-x-3 cursor-pointer px-4 py-3"
                    onClick={handleProfileClick}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userCredentials.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        {userCredentials?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          ?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userCredentials.name}</p>
                      <p className="text-xs text-gray-500">{userCredentials.profile?.preferredJobRole}</p>
                    </div>
                  </div>
                )}
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/browse-candidates")}
                >
                  Browse Candidates
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/college-partnerships")}
                >
                  Colleges
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/talent-pool")}
                >
                  Talent Pool
                </Button>
                {userCredentials !== null ? (
                  <Button
                    variant="ghost"
                    className="w-full text-left justify-start text-red-600 hover:bg-red-50 rounded-xl py-3 px-4 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="w-full text-left justify-start bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      router.push("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign Up
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto py-15 px-6">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                Candidate Dashboard
              </h1>
              <p className="text-lg text-gray-600">Discover talented professionals ready to join your team</p>
            </div>
            <div className="mb-8">
              <div className="lg:w-[35rem]">
                <input
                  type="text"
                  placeholder="Search by skills (e.g., Sales, Management, React, Data Science...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">Loading candidates...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-lg text-red-600">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-orange-100">
                            {candidate.avatar ? (
                              <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              getInitials(candidate.name)
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg text-gray-900 truncate">{candidate.name}</h3>
                            <span className="text-gray-500 text-sm font-medium">
                              | Exp: {calculateExperience(candidate)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                            {candidate.profile?.bio
                              ? candidate.profile.bio.substring(0, 120) +
                                (candidate.profile.bio.length > 120 ? "..." : "")
                              : `${candidate.role.charAt(0).toUpperCase() + candidate.role.slice(1)} with experience in various projects and technologies.`}
                          </p>
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Expert in</h4>
                              <div className="flex flex-wrap gap-2">
                                {getSkillsDisplay(candidate).map((skill, index) => (
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
                                {getCommitmentBadges(candidate).map((commitment, index) => (
                                  <span
                                    key={index}
                                    className={
                                      index === 0
                                        ? "bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                                        : "border border-orange-200 text-orange-700 hover:bg-orange-50 px-3 py-1 rounded-md text-sm font-medium"
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
                ))
              ) : (
                <div className="text-center col-span-full py-10">
                  <p className="text-lg text-gray-600">No candidates match your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Request {selectedCandidate?.name}'s Profile
                </h2>
                <p className="text-gray-600 mb-6">
                  Please fill out the form below to request {selectedCandidate?.name}'s profile details. After
                  verification, the candidate's details will be sent to you.
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
                  Thank you, {formData.name}, for your interest in {selectedCandidate?.name}'s profile. After
                  verification, the candidate's details will be sent to you.
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

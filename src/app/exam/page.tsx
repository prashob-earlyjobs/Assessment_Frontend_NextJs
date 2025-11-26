"use client";
import { useRouter } from "next/navigation";
import {
  PlayCircle,
  User,
  Mail,
  Phone,
  Clock,
  FileText,
  Shield,
  Cpu,
  ArrowRight,
  Wifi,
  Database,
  Lock,
  Building2,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";
 import { motion, Variants, easeOut } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";


interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
}

export default function AssessmentStart() {
  const router = useRouter();
  const [scanComplete, setScanComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showDetails) {
      const scanTimer = setTimeout(() => setScanComplete(true), 2000);
      return () => clearTimeout(scanTimer);
    }
  }, [showDetails]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (userDetails.fullName && userDetails.email && userDetails.phone && userDetails.college && userDetails.department) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exam/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // Store candidateId in localStorage for later use (e.g., in examui)
        localStorage.setItem('candidateId', data.examId);
        setCandidateId(data.examId);
        setShowDetails(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null); // Clear error on input
  };

  const isFormValid =
    userDetails.fullName && userDetails.email && userDetails.phone && userDetails.college && userDetails.department;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };


const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slideVariants = {
    form: { x: "0%" },
    details: { x: isMobile ? "-100%" : "-50%" },
  };

  const handleProceed = () => {
    if (candidateId) {
      router.push(`/examui/${candidateId}`);
    }
  };

  return (
    <motion.div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 relative overflow-x-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="circuit"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20,20 L80,20 L80,80 M40,20 L40,60 L60,60 L60,80"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-cyan-400"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="2"
                  fill="currentColor"
                  className="text-cyan-400"
                />
                <circle
                  cx="80"
                  cy="20"
                  r="2"
                  fill="currentColor"
                  className="text-cyan-400"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="2"
                  fill="currentColor"
                  className="text-cyan-400"
                />
                <circle
                  cx="40"
                  cy="60"
                  r="2"
                  fill="currentColor"
                  className="text-cyan-400"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        <div className="relative z-10 flex items-start sm:items-center justify-center min-h-screen p-3 sm:p-4 md:p-6">
          <div className="max-w-4xl w-full relative overflow-x-hidden md:overflow-hidden overflow-y-visible">
            {/* Sliding container */}
            <motion.div
              animate={showDetails ? "details" : "form"}
              variants={slideVariants}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex w-[200%]"
            >
              {/* --- FORM SECTION --- */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full md:w-1/2 flex-shrink-0 px-2 sm:px-4 pb-8 md:pb-0"
              >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 bg-white rounded-xl mb-3 sm:mb-4 shadow-lg shadow-cyan-500/25">
                <img src='/images/logo.png' alt="EarlyJobs Logo" className="w-full h-full object-contain" />
                   
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    EarlyJobs Assessment                  </h1>
                 
                  <div className="text-xs sm:text-sm text-gray-400 mt-2">
                    {currentTime.toLocaleDateString()} •{" "}
                    {currentTime.toLocaleTimeString()}
                  </div>
                </motion.div>

                {/* Form */}
                <motion.div
                  variants={itemVariants}
                  className="bg-black/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 max-w-2xl mx-auto w-full"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center mb-4 sm:mb-6">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-cyan-400" />
                    Candidate Registration
                  </h2>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-sm sm:text-base"
                    >
                      {error}
                    </motion.div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                    <InputField
                      label="Full Name"
                      icon={<User className="w-5 h-5 text-cyan-400" />}
                      value={userDetails.fullName}
                      onChange={(val) => handleInputChange("fullName", val)}
                      placeholder="Enter your full name"
                      type="text"
                    />
                    <InputField
                      label="Email Address"
                      icon={<Mail className="w-5 h-5 text-orange-400" />}
                      value={userDetails.email}
                      onChange={(val) => handleInputChange("email", val)}
                      placeholder="Enter your email"
                      type="email"
                    />
                    <InputField
                      label="Phone Number"
                      icon={<Phone className="w-5 h-5 text-green-400" />}
                      value={userDetails.phone}
                      onChange={(val) => handleInputChange("phone", val)}
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                    <InputField
                      label="College"
                      icon={<Building2 className="w-5 h-5 text-yellow-400" />}
                      value={userDetails.college}
                      onChange={(val) => handleInputChange("college", val)}
                      placeholder="Enter your College"
                      type="text"
                    />
                    <div>
                      <label className="block text-gray-300 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wider">
                        Department
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        </div>
                        <Select
                          value={userDetails.department}
                          onValueChange={(val) => handleInputChange("department", val)}
                        >
                          <SelectTrigger className="w-full h-auto bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all">
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700 text-white">
                            <SelectItem value="IT & Computer Engineering" className="text-white hover:bg-gray-800 focus:bg-gray-800">IT & Computer Engineering</SelectItem>
                            <SelectItem value="Electrical Engineering" className="text-white hover:bg-gray-800 focus:bg-gray-800">Electrical Engineering</SelectItem>
                            <SelectItem value="Mechanical Engineering" className="text-white hover:bg-gray-800 focus:bg-gray-800">Mechanical Engineering</SelectItem>
                            <SelectItem value="Human Resources" className="text-white hover:bg-gray-800 focus:bg-gray-800">Human Resources</SelectItem>
                            <SelectItem value="Civil Engineering" className="text-white hover:bg-gray-800 focus:bg-gray-800">Civil Engineering</SelectItem>
                            <SelectItem value="Business Administration" className="text-white hover:bg-gray-800 focus:bg-gray-800">Business Administration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!isFormValid || isLoading}
                      className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 sm:gap-3 ${
                        (isFormValid && !isLoading)
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40"
                          : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="text-sm sm:text-base">Registering...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base">Proceed to Assessment</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>

              {/* --- DETAILS SECTION --- */}
              <motion.div
                initial="hidden"
                animate={showDetails ? "visible" : "hidden"}
                variants={containerVariants}
                className="w-full md:w-1/2 flex-shrink-0 px-2 sm:px-4 pb-8 md:pb-0"
              >
                {/* Candidate Info */}
                <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg shadow-cyan-500/25">
                    <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    EarlyJobs Assessment                  </h1>
                 
                  <div className="text-xs sm:text-sm text-gray-400 mt-2">
                    {currentTime.toLocaleDateString()} •{" "}
                    {currentTime.toLocaleTimeString()}
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-0">
                  {/* Profile */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-black/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 w-full"
                  >
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-cyan-400" />
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl">Candidate Profile</span>
                      </h2>
                      <div
                        className={`px-2 py-1 sm:px-3 rounded-full text-xs font-semibold ${
                          scanComplete
                            ? "bg-green-500/20 text-green-400 border border-green-400/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                        }`}
                      >
                        {scanComplete ? "Verified" : "Scanning..."}
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                      <DetailCard
                        icon={<User className="w-5 h-5 text-cyan-400" />}
                        label="Full Name"
                        value={userDetails.fullName}
                      />
                      <DetailCard
                        icon={<Mail className="w-5 h-5 text-orange-400" />}
                        label="Email Address"
                        value={userDetails.email}
                      />
                      <DetailCard
                        icon={<Phone className="w-5 h-5 text-green-400" />}
                        label="Phone Number"
                        value={userDetails.phone}
                      />
                      <DetailCard
                        icon={<Building2 className="w-5 h-5 text-yellow-400" />}
                        label="College Name"
                        value={userDetails.college}
                      />
                      <DetailCard
                        icon={<GraduationCap className="w-5 h-5 text-purple-400" />}
                        label="Department"
                        value={userDetails.department}
                      />
                    </div>
                  </motion.div>

                  {/* Assessment Info */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-black/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 w-full"
                  >
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center mb-4 sm:mb-6">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-orange-400" />
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl">Assessment Details</span>
                    </h2>
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                      <DetailCard
                        icon={<FileText className="w-5 h-5 text-blue-400" />}
                        label="Assessment Name"
                        value="Advanced Cognitive Evaluation"
                      />
                      <DetailCard
                        icon={<Clock className="w-5 h-5 text-orange-400" />}
                        label="Duration"
                        value="30 minutes"
                      />
                      <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <span className="text-gray-300 text-xs sm:text-sm">
                            System Status
                          </span>
                          <span className="text-cyan-400 text-xs sm:text-sm font-semibold">
                            Operational
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          <StatusIndicator label="Network" status="optimal" />
                          <StatusIndicator label="Security" status="secure" />
                          <StatusIndicator label="Database" status="active" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action */}
                <motion.div variants={itemVariants} className="mt-4 sm:mt-6 md:mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleProceed}
                    disabled={!scanComplete}
                    className={`group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                      scanComplete
                        ? "bg-gradient-to-r from-orange-300 to-orange-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm md:text-base">
                    {scanComplete
                      ? "Initialize Assessment"
                      : "Preparing System..."}
                    </span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.div>
  );
}

/* --- Small Components --- */
function InputField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label className="block text-gray-300 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

function DetailCard({ 
  icon, 
  label, 
  value, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        <div className="p-1.5 sm:p-2 bg-black/30 rounded-lg sm:rounded-xl">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider truncate">{label}</div>
          <div className="text-white font-semibold text-sm sm:text-base md:text-lg truncate">{value}</div>
        </div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"></div>
      </div>
    </motion.div>
  );
}

function StatusIndicator({ 
  label, 
  status 
}: { 
  label: string; 
  status: 'optimal' | 'secure' | 'active';
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400 bg-green-400/20';
      case 'secure': return 'text-blue-400 bg-blue-400/20';
      case 'active': return 'text-cyan-400 bg-cyan-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="text-center">
      <div className={`w-3 h-3 rounded-full mx-auto mb-1 animate-pulse ${getStatusColor(status)}`}></div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}
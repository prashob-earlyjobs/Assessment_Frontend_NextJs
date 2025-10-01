// "use client";
// import { useRouter } from "next/navigation";
// import {
//   PlayCircle,
//   User,
//   Mail,
//   Phone,
//   Clock,
//   FileText,
//   Shield,
//   Cpu,
//   ArrowRight,
//   Wifi,
//   Database,
//   Lock,
//   Building2,
// } from "lucide-react";
// import { useState, useEffect } from "react";
//  import { motion, Variants, easeOut } from "framer-motion";


// interface UserDetails {
//   fullName: string;
//   email: string;
//   phone: string;
//   college: string;
// }

// export default function AssessmentStart() {
//   const router = useRouter();
//   const [scanComplete, setScanComplete] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [showDetails, setShowDetails] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [candidateId, setCandidateId] = useState<string | null>(null);
//   const [userDetails, setUserDetails] = useState<UserDetails>({
//     fullName: "",
//     email: "",
//     phone: "",
//     college: "",
//   });

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (showDetails) {
//       const scanTimer = setTimeout(() => setScanComplete(true), 2000);
//       return () => clearTimeout(scanTimer);
//     }
//   }, [showDetails]);

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     if (userDetails.fullName && userDetails.email && userDetails.phone && userDetails.college) {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exam/register`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userDetails),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || 'Registration failed');
//         }

//         // Store candidateId in localStorage for later use (e.g., in examui)
//         localStorage.setItem('candidateId', data.examId);
//         setCandidateId(data.examId);
//         setShowDetails(true);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unexpected error occurred');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleInputChange = (field: keyof UserDetails, value: string) => {
//     setUserDetails((prev) => ({ ...prev, [field]: value }));
//     if (error) setError(null); // Clear error on input
//   };

//   const isFormValid =
//     userDetails.fullName && userDetails.email && userDetails.phone && userDetails.college;

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };


// const itemVariants: Variants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.6, ease: easeOut },
//   },
// };

//   const slideVariants = {
//     form: { x: "0%" },
//     details: { x: "-50%" },
//   };

//   const handleProceed = () => {
//     if (candidateId) {
//       router.push(`/examui/${candidateId}`);
//     }
//   };

//   return (
//     <motion.div>
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 relative overflow-hidden">
//         {/* Animated background elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
//         </div>

//         {/* Circuit pattern overlay */}
//         <div className="absolute inset-0 opacity-10">
//           <svg width="100%" height="100%" className="absolute inset-0">
//             <defs>
//               <pattern
//                 id="circuit"
//                 x="0"
//                 y="0"
//                 width="100"
//                 height="100"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M20,20 L80,20 L80,80 M40,20 L40,60 L60,60 L60,80"
//                   stroke="currentColor"
//                   strokeWidth="1"
//                   fill="none"
//                   className="text-cyan-400"
//                 />
//                 <circle
//                   cx="20"
//                   cy="20"
//                   r="2"
//                   fill="currentColor"
//                   className="text-cyan-400"
//                 />
//                 <circle
//                   cx="80"
//                   cy="20"
//                   r="2"
//                   fill="currentColor"
//                   className="text-cyan-400"
//                 />
//                 <circle
//                   cx="80"
//                   cy="80"
//                   r="2"
//                   fill="currentColor"
//                   className="text-cyan-400"
//                 />
//                 <circle
//                   cx="40"
//                   cy="60"
//                   r="2"
//                   fill="currentColor"
//                   className="text-cyan-400"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#circuit)" />
//           </svg>
//         </div>

//         <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
//           <div className="max-w-4xl w-full relative overflow-hidden">
//             {/* Sliding container */}
//             <motion.div
//               animate={showDetails ? "details" : "form"}
//               variants={slideVariants}
//               transition={{ duration: 0.8, ease: "easeInOut" }}
//               className="flex w-[200%]"
//             >
//               {/* --- FORM SECTION --- */}
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={containerVariants}
//                 className="w-1/2 flex-shrink-0"
//               >
//                 {/* Header */}
//                 <motion.div variants={itemVariants} className="text-center mb-8">
//                   <div className="inline-flex items-center justify-center w-24 h-12 bg-white rounded-xl mb-4 shadow-lg shadow-cyan-500/25">
//                 <img src='/images/logo.png' alt="EarlyJobs Logo" className="w-full h-full object-contain" />
                   
//                   </div>
//                   <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                     EarlyJobs Assessment                  </h1>
                 
//                   <div className="text-sm text-gray-400 mt-2">
//                     {currentTime.toLocaleDateString()} •{" "}
//                     {currentTime.toLocaleTimeString()}
//                   </div>
//                 </motion.div>

//                 {/* Form */}
//                 <motion.div
//                   variants={itemVariants}
//                   className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-2xl mx-auto"
//                 >
//                   <h2 className="text-2xl font-bold text-white flex items-center mb-6">
//                     <User className="w-6 h-6 mr-3 text-cyan-400" />
//                     Candidate Registration
//                   </h2>

//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-2xl mb-6"
//                     >
//                       {error}
//                     </motion.div>
//                   )}

//                   <form onSubmit={handleFormSubmit} className="space-y-6">
//                     <InputField
//                       label="Full Name"
//                       icon={<User className="w-5 h-5 text-cyan-400" />}
//                       value={userDetails.fullName}
//                       onChange={(val) => handleInputChange("fullName", val)}
//                       placeholder="Enter your full name"
//                       type="text"
//                     />
//                     <InputField
//                       label="Email Address"
//                       icon={<Mail className="w-5 h-5 text-orange-400" />}
//                       value={userDetails.email}
//                       onChange={(val) => handleInputChange("email", val)}
//                       placeholder="Enter your email"
//                       type="email"
//                     />
//                     <InputField
//                       label="Phone Number"
//                       icon={<Phone className="w-5 h-5 text-green-400" />}
//                       value={userDetails.phone}
//                       onChange={(val) => handleInputChange("phone", val)}
//                       placeholder="Enter your phone number"
//                       type="tel"
//                     />
//                     <InputField
//                       label="College"
//                       icon={<Building2 className="w-5 h-5 text-yellow-400" />}
//                       value={userDetails.college}
//                       onChange={(val) => handleInputChange("college", val)}
//                       placeholder="Enter your College"
//                       type="text"
//                     />

//                     <motion.button
//                       type="submit"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       disabled={!isFormValid || isLoading}
//                       className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
//                         (isFormValid && !isLoading)
//                           ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40"
//                           : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       {isLoading ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                           Registering...
//                         </>
//                       ) : (
//                         <>
//                           Proceed to Assessment
//                           <ArrowRight className="w-5 h-5" />
//                         </>
//                       )}
//                     </motion.button>
//                   </form>
//                 </motion.div>
//               </motion.div>

//               {/* --- DETAILS SECTION --- */}
//               <motion.div
//                 initial="hidden"
//                 animate={showDetails ? "visible" : "hidden"}
//                 variants={containerVariants}
//                 className="w-1/2 flex-shrink-0"
//               >
//                 {/* Candidate Info */}
//                 <motion.div variants={itemVariants} className="text-center mb-8">
//                   <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mb-4 shadow-lg shadow-cyan-500/25">
//                     <Cpu className="w-10 h-10 text-white" />
//                   </div>
//                   <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                     EarlyJobs Assessment                  </h1>
                 
//                   <div className="text-sm text-gray-400 mt-2">
//                     {currentTime.toLocaleDateString()} •{" "}
//                     {currentTime.toLocaleTimeString()}
//                   </div>
//                 </motion.div>

//                 <div className="grid lg:grid-cols-2 gap-8">
//                   {/* Profile */}
//                   <motion.div
//                     variants={itemVariants}
//                     className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8"
//                   >
//                     <div className="flex items-center justify-between mb-6">
//                       <h2 className="text-2xl font-bold text-white flex items-center">
//                         <Shield className="w-6 h-6 mr-3 text-cyan-400" />
//                         Candidate Profile
//                       </h2>
//                       <div
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           scanComplete
//                             ? "bg-green-500/20 text-green-400 border border-green-400/30"
//                             : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
//                         }`}
//                       >
//                         {scanComplete ? "Verified" : "Scanning..."}
//                       </div>
//                     </div>

//                     <div className="space-y-6">
//                       <DetailCard
//                         icon={<User className="w-5 h-5 text-cyan-400" />}
//                         label="Full Name"
//                         value={userDetails.fullName}
//                       />
//                       <DetailCard
//                         icon={<Mail className="w-5 h-5 text-orange-400" />}
//                         label="Email Address"
//                         value={userDetails.email}
//                       />
//                       <DetailCard
//                         icon={<Phone className="w-5 h-5 text-green-400" />}
//                         label="Phone Number"
//                         value={userDetails.phone}
//                       />
//                       <DetailCard
//                         icon={<Building2 className="w-5 h-5 text-green-400" />}
//                         label="College Name"
//                         value={userDetails.college}
//                       />
//                     </div>
//                   </motion.div>

//                   {/* Assessment Info */}
//                   <motion.div
//                     variants={itemVariants}
//                     className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8"
//                   >
//                     <h2 className="text-2xl font-bold text-white flex items-center mb-6">
//                       <FileText className="w-6 h-6 mr-3 text-orange-400" />
//                       Assessment Details
//                     </h2>
//                     <div className="space-y-6">
//                       <DetailCard
//                         icon={<FileText className="w-5 h-5 text-blue-400" />}
//                         label="Assessment Name"
//                         value="Advanced Cognitive Evaluation"
//                       />
//                       <DetailCard
//                         icon={<Clock className="w-5 h-5 text-orange-400" />}
//                         label="Duration"
//                         value="30 minutes"
//                       />
//                       <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
//                         <div className="flex justify-between items-center mb-3">
//                           <span className="text-gray-300 text-sm">
//                             System Status
//                           </span>
//                           <span className="text-cyan-400 text-sm font-semibold">
//                             Operational
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-3 gap-3">
//                           <StatusIndicator label="Network" status="optimal" />
//                           <StatusIndicator label="Security" status="secure" />
//                           <StatusIndicator label="Database" status="active" />
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Action */}
//                 <motion.div variants={itemVariants} className="mt-8 text-center">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleProceed}
//                     disabled={!scanComplete}
//                     className={`group relative inline-flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
//                       scanComplete
//                         ? "bg-gradient-to-r from-orange-300 to-orange-600 text-white shadow-lg hover:shadow-xl"
//                         : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     <PlayCircle className="w-6 h-6" />
//                     {scanComplete
//                       ? "Initialize Assessment"
//                       : "Preparing System..."}
//                   </motion.button>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .animate-spin-slow {
//           animation: spin 20s linear infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </motion.div>
//   );
// }

// /* --- Small Components --- */
// function InputField({
//   label,
//   icon,
//   value,
//   onChange,
//   placeholder,
//   type,
// }: {
//   label: string;
//   icon: React.ReactNode;
//   value: string;
//   onChange: (val: string) => void;
//   placeholder: string;
//   type: string;
// }) {
//   return (
//     <div>
//       <label className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wider">
//         {label}
//       </label>
//       <div className="relative">
//         <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//           {icon}
//         </div>
//         <input
//           type={type}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full bg-white/5 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
//           placeholder={placeholder}
//           required
//         />
//       </div>
//     </div>
//   );
// }

// function DetailCard({ 
//   icon, 
//   label, 
//   value, 
//   delay = 0 
// }: { 
//   icon: React.ReactNode; 
//   label: string; 
//   value: string; 
//   delay?: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6, delay }}
//       className="group bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
//     >
//       <div className="flex items-center space-x-4">
//         <div className="p-2 bg-black/30 rounded-xl">
//           {icon}
//         </div>
//         <div className="flex-1">
//           <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
//           <div className="text-white font-semibold text-lg">{value}</div>
//         </div>
//         <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//       </div>
//     </motion.div>
//   );
// }

// function StatusIndicator({ 
//   label, 
//   status 
// }: { 
//   label: string; 
//   status: 'optimal' | 'secure' | 'active';
// }) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'optimal': return 'text-green-400 bg-green-400/20';
//       case 'secure': return 'text-blue-400 bg-blue-400/20';
//       case 'active': return 'text-cyan-400 bg-cyan-400/20';
//       default: return 'text-gray-400 bg-gray-400/20';
//     }
//   };

//   return (
//     <div className="text-center">
//       <div className={`w-3 h-3 rounded-full mx-auto mb-1 animate-pulse ${getStatusColor(status)}`}></div>
//       <div className="text-xs text-gray-400">{label}</div>
//     </div>
//   );
// }